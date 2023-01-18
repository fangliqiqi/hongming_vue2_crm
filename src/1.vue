<template>
  <a-modal
    title="发放出账"
    :width="1200"
    placement="right"
    :closable="true"
    @cancel="handleCancel"
    cancelText="取消"
    okText="审核"
    :visible="visible"
    :maskClosable="false"
  >
    <template slot="footer">
      <a-button
        key="back"
        @click="handleCancel"
      >取消</a-button>
      <a-button
        type="primary"
        @click="handleOutSubmit"
      >确定出账</a-button>
      <a-button
        type="primary"
        @click="handlePrint"
      >表单打印</a-button>
      <a-button
        type="primary"
        @click="handleBackSubmit"
      >退回</a-button>
      <a-button
        type="primary"
        @click="handleDownload"
        :loading="downloadLoading"
      >导出</a-button>
    </template>
    <a-card
      :bordered="false"
      style="background:#f5f5f5"
    >
      <a-tabs
        :activeKey="activeKey"
        @change="changeTab"
      >
        <a-tab-pane
          tab="工资明细"
          key="1"
        >
          <a-table
            ref="table"
            size="middle"
            bordered
            rowKey="id"
            :columns="columns"
            :dataSource="dataSourceList"
            :loading="loading"
            :scroll="{ x: 1 }"
          >
            <template
              slot="operation"
              slot-scope="text, record"
            >
              <a @click="detail(record.id)">详情</a>
            </template>
          </a-table>
        </a-tab-pane>
        <a-tab-pane
          tab="结算表"
          key="2"
          :forceRender="true"
        >
          <billing-settle-account-modal
            ref="settleAccountModal"
            :salaryStandardInfo="salaryStandardInfo"
            :settlementhFormInfo="settlementhFormInfo"
            :pauseDiyInfoList="pauseDiyInfoList"
            :poorBalanceInfoList="poorBalanceInfoList"
            :salaryAccountOne="salaryAccountOne"
          ></billing-settle-account-modal>
        </a-tab-pane>
        <a-tab-pane
          tab="封面"
          key="3"
          :forceRender="true"
        >
          <billing-page-modal
            ref="billingPageModal"
            :salaryStandardInfo="salaryStandardInfo"
            :coverList="coverList"
            :employData="employData"
          >
          </billing-page-modal>
        </a-tab-pane>
        <a-tab-pane
          key="4"
          tab="匹配明细"
          :forceRender="true"
        >
          <a-table
            ref="table"
            size="middle"
            bordered
            rowKey="id"
            :scroll="{ x: 1 }"
            :columns="matchDetailColumns"
            :dataSource="matchDetailData"
            :loading="loading"
          >
          </a-table>
        </a-tab-pane>
      </a-tabs>
    </a-card>
    <!-- 查看认领 -->
    <finish-receive-detail-modal ref="finishReceiveDetailModal"></finish-receive-detail-modal>
    <!-- 工资明细详情 -->
    <statement-detail-modal ref="statementDetailModal"></statement-detail-modal>
    <!-- 确认出账 -->
    <a-modal
      title="出账"
      :width="600"
      placement="right"
      :closable="true"
      @cancel="handleOutCancel"
      @ok="handleOutOk"
      cancelText="关闭"
      :visible="outVisible"
      :confirmLoading="outLoading"
      :maskClosable="false"
    >
      <form>
        <a-form-item
          label="理由"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-textarea v-model="remark"></a-textarea>
        </a-form-item>
      </form>
    </a-modal>
    <!-- 退回 -->
    <a-modal
      title="退回理由"
      :width="600"
      placement="right"
      :closable="true"
      @cancel="handleBackCancel"
      @ok="handleBackOk"
      cancelText="关闭"
      :visible="backVisible"
      :confirmLoading="backLoading"
      :maskClosable="false"
    >
      <a-form :form="form">
        <a-form-item
          label="理由"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-textarea v-decorator="['remark',validatorRules.remark]"></a-textarea>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-modal>
</template>
<script>
import DetailList from '@/components/tools/DetailList'
import BillingSettleAccountModal from './BillingSettleAccountModal'
import BillingPageModal from './BillingPageModal'
import { httpAction } from '@/api/manage'
import { initDictOptions, filterDictText } from '@/components/dict/JDictSelectUtil'
import FinishReceiveDetailModal from './FinishReceiveDetailModal'
import { filterOrgan } from '@/utils/customDict'
import { mapGetters } from 'vuex'
import moment from 'moment'
import { getItemName } from '@/utils/common'
import StatementDetailModal from '../../searchsalary/modules/StatementDetailModal'

const DetailListItem = DetailList.Item

export default {
  name: 'BillingSalaryModal',
  components: {
    BillingSettleAccountModal,
    BillingPageModal,
    DetailListItem,
    DetailList,
    FinishReceiveDetailModal,
    StatementDetailModal
  },
  data() {
    return {
      visible:false,
      loading:false,
      outVisible:false,
      downVisible:false,
      backVisible:false,
      backLoading:false,
      outLoading:false,
      downloadLoading:false,
      form:this.$form.createForm(this),
      bankOptions:[],
      isFlag:{'0':'否','1':'是'},
      salaryStyleOption:{'0':'现金','1':'转账'},
      socialPriorityOption:{'0':'生成','1':'缴纳'},
      fundPriorityOption:{'0':'生成','1':'缴纳'},
      annualBonusTypeOption:{'0':'合并','1':'单独'},
      salaryGiveTimeOption:{'0':'立即发','1':'暂停发'},
      distributionFlagOption:{'0':'未发放','1':'发放成功','2':'发放失败'},
      reciveUseOptions: {'0': '款项认领', '1': '垫付还款', '2': '商险预估还款'}, // 款项用途
      reciveTypeOptions: {'1': '薪资及其他', '2': '纯收入', '3': '事务性外包','4':'预估结算单'}, // 款项类型
      statusOutOptions: {
        '0': {'option': '未出账', 'color': 'blue'},
        '1': {'option': '部分出账', 'color': 'pink'},
        '2': {'option': '全部出账', 'color': 'green'}
      }, // 出账状态
      statusIncomeOptions: {
        '0': {'option': '未收入', 'color': 'blue'},
        '1': {'option': '部分收入', 'color': 'pink'},
        '2': {'option': '全部收入', 'color': 'green'}
      }, // 收入状态
      statusOptions: {
        '0': {'option': '正常', 'color': 'green'},
        '1': {'option': '撤销', 'color': 'red'}
      }, // 认领状态
      matchDetailData:[], // 匹配明细数据
      remark:'',
      labelCol: {
        xs: {span: 24},
        sm: {span: 5},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
      },
      validatorRules: {
        remark: { rules: [{ required: true, message: '请填写理由!' }] },
      },
      activeKey:'1',
      salaryStandardInfo:'',
      activityKey:'1',
      dataSourceList:[],
      detailData:{},
      coverList:[], // 封面数据
      employData:[],
      customerTypeDicts:[],
      advanceTypeDicts:[],
      organs: [],
      settlementhFormInfo:{},
      pauseDiyInfoList:[],
      poorBalanceInfoList:[],
      salaryAccountOne:{},
      article: '',
      fullscreenLoading: true,
      settlementList:[],
      columns:[
        {
          width: 120,
          ellipsis: true,
          title: '姓名',
          dataIndex: 'empName',
          fixed: 'left',
          key: 'empName',
          align: 'center',
          customRender: text => {
            const resultText = text || '-'
            return <a-tooltip title={resultText}>{resultText}</a-tooltip>
          }
        },
        {
          width: 120,
          ellipsis: true,
          title: '工资发放方式',
          fixed: 'left',
          dataIndex: 'salaryStyle',
          key: 'salaryStyle',
          align: 'center',
          customRender:(text) => {
            return this.salaryStyleOption[text] || '-'
          }
        },
        {
          width: 200,
          ellipsis: true,
          title: '身份证号',
          dataIndex: 'empIdcard',
          key: 'empIdcard',
          align: 'center',
          customRender: text => {
            const resultText = text || '-'
            return <a-tooltip title={resultText}>{resultText}</a-tooltip>
          }
        },
        {
          width: 150,
          ellipsis: true,
          title: '手机号码',
          dataIndex: 'empPhone',
          key: 'empPhone',
          align: 'center',
          customRender: text => {
            const resultText = text || '-'
            return <a-tooltip title={resultText}>{resultText}</a-tooltip>
          }
        },
        {
          width: 180,
          ellipsis: true,
          title: '银行卡号',
          dataIndex: 'bankNo',
          key: 'bankNo',
          align: 'center',
          customRender: text => {
            const resultText = text || '-'
            return <a-tooltip title={resultText}>{resultText}</a-tooltip>
          }
        },
        {
          width: 180,
          ellipsis: true,
          title: '开户行',
          dataIndex: 'bankName',
          key: 'bankName',
          align: 'center',
          customRender: (text) => {
            let bankName = filterDictText(this.bankOptions, text)
            if(bankName == '-' && text){
              return text;
            }
            return bankName
          },
        },
        {
          width: 150,
          ellipsis: true,
          title: '工资发放时间',
          dataIndex: 'salaryGiveTime',
          key: 'salaryGiveTime',
          align: 'center',
          customRender:(text) => {
            return this.salaryGiveTimeOption[text]
          }
        },
        {
          width: 150,
          ellipsis: true,
          title: '社保扣缴月份',
          dataIndex:'deduSocialMonth',
          key:'deduSocialMonth',
          align: 'center',
          customRender: text => {
            const resultText = text || '-'
            return <a-tooltip title={resultText}>{resultText}</a-tooltip>
          }
        },
        {
          width: 150,
          ellipsis: true,
          title: '公积金扣缴月份',
          dataIndex:'deduProvidentMonth',
          align: 'center',
          key:'deduProvidentMonth',
          customRender: text => {
            const resultText = text || '-'
            return <a-tooltip title={resultText}>{resultText}</a-tooltip>
          }
        },
        {
          width: 120,
          ellipsis: true,
          title: '是否薪资扣税',
          dataIndex:'salaryTaxFlag',
          align: 'center',
          key:'salaryTaxFlag',
          customRender:(text) => {
            return this.isFlag[text]
          }
        },
        {
          width: 120,
          ellipsis: true,
          title: '社保优先级',
          dataIndex:'socialPriority',
          align: 'center',
          key:'socialPriority',
          customRender:(text) => {
            return this.socialPriorityOption[text]
          }
        },
        {
          width: 120,
          ellipsis: true,
          title: '公积金优先级',
          dataIndex:'fundPriority',
          align: 'center',
          key:'fundPriority',
          customRender:(text) => {
            return this.fundPriorityOption[text]
          }
        },
        {
          width: 120,
          ellipsis: true,
          title: '年终奖扣税方案',
          dataIndex:'annualBonusType',
          align: 'center',
          key:'annualBonusType',
          customRender:(text) => {
            return this.annualBonusTypeOption[text]
          }
        },
        {
          width: 120,
          ellipsis: true,
          title: '是否扣除社保',
          dataIndex:'isDeductSocial',
          align: 'center',
          key:'isDeductSocial',
          customRender:(text) => {
            return this.isFlag[text]
          }
        },
        {
          width: 120,
          ellipsis: true,
          title: '是否扣除公积金',
          dataIndex:'isDeductFund',
          align: 'center',
          key:'isDeductFund',
          customRender:(text) => {
            return this.isFlag[text]
          }
        },
        {
          width: 120,
          ellipsis: true,
          title: '工资月份',
          dataIndex: 'salaryDate',
          align: 'center',
          key: 'salaryDate',
          customRender: text => {
            const resultText = text || '-'
            return <a-tooltip title={resultText}>{resultText}</a-tooltip>
          }
        },
        {
          width: 120,
          ellipsis: true,
          title: '结算月份',
          dataIndex: 'settlementMonth',
          align: 'center',
          key: 'settlementMonth',
          customRender: text => {
            const resultText = text || '-'
            return <a-tooltip title={resultText}>{resultText}</a-tooltip>
          }
        },
        {
          width: 160,
          ellipsis: true,
          title: '结算主体',
          dataIndex: 'settleDepartName',
          align: 'center',
          key: 'settleDepartName',
          customRender: text => {
            const resultText = text || '-'
            return <a-tooltip title={resultText}>{resultText}</a-tooltip>
          }
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 120,
          align: 'center',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      matchDetailColumns: [
          {
            width: 180,
            ellipsis: true,
            align: 'center',
            title: '认领时间',
            dataIndex: 'reciveDate',
            customRender: text => {
              const resultText = text || '-'
              return <a-tooltip title={resultText}>{resultText}</a-tooltip>
            }
          },
          {
            width: 140,
            ellipsis: true,
            align: 'center',
            title: '认领金额',
            dataIndex: 'reciveFee',
            customRender: text => {
              const resultText = text || (String(text) === '0'?'0':'-')
              return <a-tooltip title={resultText}>{resultText}</a-tooltip>
            }
          },
          {
            width: 140,
            ellipsis: true,
            title: '可匹配金额',
            align: 'center',
            dataIndex: 'reciveFeeBalance',
            customRender: text => {
              const resultText = text || (String(text) === '0'?'0':'-')
              return <a-tooltip title={resultText}>{resultText}</a-tooltip>
            }
          },
          {
            width: 130,
            ellipsis: true,
            align: 'center',
            title: '款项用途',
            dataIndex: 'reciveUse',
            customRender: text => {
              const resultText = this.reciveUseOptions[text] || '-'
              return <a-tooltip title={resultText}>{resultText}</a-tooltip>
            }
          },
          {
            width: 140,
            ellipsis: true,
            title: '款项类型',
            align: 'center',
            dataIndex: 'reciveType',
            customRender: (text,record) => {
              const resultText = String(record.reciveUse) === '0' ? this.reciveTypeOptions[text] : '-'
              return <a-tooltip title={resultText}>{resultText}</a-tooltip>
            }
          },
          {
            width: 220,
            ellipsis: true,
            align: 'center',
            title: '结算主体',
            dataIndex: 'departName',
            customRender: text => {
              const resultText = text || '-'
              return <a-tooltip title={resultText}>{resultText}</a-tooltip>
            }
          },
          {
            width: 140,
            ellipsis: true,
            title: '认领人',
            align: 'center',
            dataIndex: 'reciveUser',
            customRender: text => {
              const resultText = this.employData.hasOwnProperty(text) ? this.employData[text] : '-'
              return <a-tooltip title={resultText}>{resultText}</a-tooltip>
            }
          },
          {
            width: 140,
            ellipsis: true,
            align: 'center',
            title: '认领状态',
            dataIndex: 'status',
            customRender: text => {
              const optionItem = this.statusOptions[String(text)] || '-'
              return <a-tag color={optionItem.color}>{optionItem.option}</a-tag>
            }
          },
          {
            width: 140,
            ellipsis: true,
            align: 'center',
            title: '出账状态',
            dataIndex: 'statusOut',
            customRender: text => {
              const optionItem = this.statusOutOptions[String(text)] || '-'
              return <a-tag color={optionItem.color}>{optionItem.option}</a-tag>
            }
          },
          {
            width: 150,
            ellipsis: true,
            align: 'center',
            title: '收入状态',
            dataIndex: 'statusIncome',
            customRender: text => {
              const optionItem = this.statusIncomeOptions[String(text)] || '-'
              return <a-tag color={optionItem.color}>{optionItem.option}</a-tag>
            }
          },
      ],
      url:{
        doExportUrl:'/salary/salary/doExportSalary',
        doBillingUrl:'/salary/tsalarystandard/doBilling',
        getPrintCount:"/salary/tprintrecord/getPrintCount",
        getAdvance: "/hrApproval/tadvancepayment/getByFormId",
        getOrgan: '/admin/organizationinfo/getUserAllOrgan',
        getContract:'/hrBase/tcustomercontract/',
        getSalaryFrom:'busiInsurance/forecastbuypayform/salaryFrom/',
        mathDetailUrl:'/salary/treciverecord/getReciveRecordsByRecordId', // 匹配明细列表
      },
      isBackedType:['新表','退表重传']
    }
  },
  props:{
    formTypeOptions:{
      type:Array,
      required:true
    }
  },
  methods: {
    ...mapGetters(["nickname", "avatar","userInfo"]),
    filterOrgan,
    // 工资详情展示以及数据组装
    show(record,detailInfo) {
      this.initDictConfig()
      this.getOrgans()
      this.loadMatchDetailInfo(record.id)
      this.salaryStandardInfo = record
      this.detailData = detailInfo
      this.coverList = detailInfo.coverList // 封面数据
      this.settlementhFormInfo = detailInfo.settlementhForm // 结算单数据
      this.pauseDiyInfoList = detailInfo.settlementhFormSubList != null ? detailInfo.settlementhFormSubList : [] // 结算单自定义项数据
      this.poorBalanceInfoList = detailInfo.poorBalanceInfoList != null ? detailInfo.poorBalanceInfoList : [] // 银行明细数据
      this.dataSourceList = this.detailData.salaryAccountList // 工资明细列表数据
      this.salaryAccountOne = detailInfo.salaryAccountList.length > 0 ? detailInfo.salaryAccountList[0] : {}
      this.visible = true
    },
    // 切换tab事件
    changeTab(key){
      this.activeKey = key
      // 切换结算单tab
      if(Number(key) === 2){
        this.$refs.settleAccountModal.show()
      }
      // 切换封面tab
      if(Number(key) === 3){
        this.$refs.billingPageModal.show()
      }
    },
    // 关闭摊款
    handleCancel() {
      this.close()
    },
    close() {
      this.$emit('close')
      this.remark = ''
      this.activeKey = '1'
      this.form.resetFields()
      this.visible = false
    },
    // 获取匹配明细
    loadMatchDetailInfo(recordId){
      // 出账类型type：0普通工资1工程工资2商险3社保核准表4公积金核准表5纯收入6社保预估单
      const detailUrl = `${this.url.mathDetailUrl}?matchId=${recordId}&type=0`
      httpAction(detailUrl,{},'GET').then((res) => {
        if(Number(res.code) === 200){
          this.matchDetailData = res.data || []
        }else {
          this.$message.warn(res.msg || '匹配明细获取失败')
        }
      })
    },
    getOrgans() {
      httpAction(this.url.getOrgan,'','GET').then((res) => {
        if(res.code === 200 && res.data.length > 0) {
          this.organs = res.data
        }
      });
    },
    handleOk() {

    },
    // 展示单个工资明细详情明细
    detail(id){
      let salaryList = []
      for(const item of this.dataSourceList){
        if(String(item.id) === String(id)){
          salaryList = item.saiList
          break
        }
      }
      this.$refs.statementDetailModal.title = '报表详情'
      this.$refs.statementDetailModal.saiList = salaryList
      this.$refs.statementDetailModal.show()
    },
    // 确认出账弹框
    handleOutSubmit() {
      this.outVisible = true
      this.remark = ''
    },
    // 数据字典
    initDictConfig() {
      // 开户行
      initDictOptions('bank').then((res) => {
        if (res.code === 200) {
          this.bankOptions = res.data
        }
      });
      initDictOptions('ADVANCE_CUSTOMER_TYPE').then((res) => {
        if (res.code === 200) {
          this.customerTypeDicts = res.data;
        }
      });
      initDictOptions('ADVANCE_ADVANCE_TYPE').then((res) => {
        if (res.code === 200) {
          this.advanceTypeDicts = res.data;
        }
      });
    },
    // 提交出账理由
    handleOutOk() {
      //this.downVisible = true
      var that = this
      this.outLoading = true
      const url = `${this.url.doBillingUrl}?tSettlementhFormId=${this.settlementhFormInfo.id}`
      httpAction(url,{'id':this.salaryStandardInfo.id,'status':4,'remark':this.remark},'POST').then((res) => {
        if(Number(res.code) === 200){
          that.$emit('ok')
          that.outLoading = false
          this.outVisible = false
          this.$message.success("出账成功")
          this.close()
        } else {
          that.outLoading = false
          that.$message.error(res.msg)
        }
      })
    },
    handleOutCancel(){
      this.outVisible = false
    },
    // 退回弹框
    handleBackSubmit() {
      this.backVisible = true
    },
    // 提交退回理由
    handleBackOk() {
      var that = this
      this.form.validateFields((err,values) => {
        if(!err){
          this.backLoading = true
          const url = `${this.url.doBillingUrl}?tSettlementhFormId=${this.settlementhFormInfo.id}`
          httpAction(url,{'id':this.salaryStandardInfo.id,'status':7,'remark':values.remark},'POST').then((res) => {
            if(Number(res.code) === 200){
              that.$emit('ok')
              that.backLoading = false
              this.backVisible = false
              this.$message.success("退回成功")
              this.close()
            }
          })
        }
      })
    },
    handleBackCancel() {
      this.backVisible = false
      this.form.resetFields()
    },
    //查看认领
    handleDetail: function() {
      this.$refs.finishReceiveDetailModal.title = '认领详情'
      this.$refs.finishReceiveDetailModal.settleDomainBelongs = this.settlementList
      this.$refs.finishReceiveDetailModal.edit(this.settlementhFormInfo.id)
      this.$refs.finishReceiveDetailModal.loadData()
    },
    //打印
    handlePrint(){
      const that = this
      httpAction(this.url.getPrintCount,{'fromId':this.settlementhFormInfo.id,'fromType':0},"POST").then((res) => {
        if(Number(res.code) === 200){
          // 打印超过一次
          if(res.data >= 1){
            this.$confirm({
              title: '是否再次打印',
              content: '该表单已打印,需要继续吗',
              onOk() {
                let routeData = that.$router.resolve({
                  path: "/pdf/billingpdf",
                  query: {id:that.salaryStandardInfo.id,count:res.data},
                });
                window.open(routeData.href, '_blank')
              },
              onCancel() {},
            });
          }else{ // 第一次打印
            let routeData = that.$router.resolve({
              path: "/pdf/billingpdf",
              query: {id:that.salaryStandardInfo.id,count:res.data},
            });
            window.open(routeData.href, '_blank')
          }
        }
      })

    },
    // 导出
    async handleDownload() {
      this.downloadLoading = true
      const url = `${this.url.doExportUrl}?salaryFormId=${this.salaryStandardInfo.id}`
      const res = await this.exportUrl(url)
      if(res && res.code === 200){
        let auditName = ''
        let createName = ''
        let revenueName = ''
        if(res.data.salary.createUser){
          for(const c in this.employData){
            if(String(c) === String(res.data.salary.auditUser)){
              // 获取审核人姓名
              auditName = this.employData[c]
            }
            if(String(c) === String(res.data.salary.createUser)){
              // 获取创建人姓名
              createName = this.employData[c]
            }
            if(String(c) === String(res.data.salary.revenueUser)){
              // 获取发放人姓名
              revenueName = this.employData[c]
            }
          }
        }
        let settleForm = res.data.settlementhForm
        // 结算单数据
        let settelData = [
          {'index':settleForm.settleMonth + '结算单','data':'','project':'','money':'','tax':'','account':''},
          {'index':'结算名称:','data':settleForm.settleDepartName,'project':'','money':'','tax':'皖信盖章:','account':''},
          {'index':'结算编码:','data':settleForm.settleDepartNo,'project':'','money':'','tax':'','account':''},
          {'index':'结算时间:','data':settleForm.settleMonth,'project':'','money':'','tax':'','account':''},
          {'index':'序号','data':'费用项目','project':'','money':'金额','tax':'税费','account':'开票额小计'},
          {'index':1,'data':res.data.salary.salaryMonth,'project':'应发工资','money':settleForm.salarySum,'tax':settleForm.salaryTax,'account':settleForm.salaryTicket},
          {'index':'','data':'','project':'实发工资(银付)','money':settleForm.cardPay,'tax':'','account':''},
          {'index':'','data':'','project':'实发工资(现金)','money':settleForm.moneyPay,'tax':'','account':''},
          {'index':'','data':'','project':'暂停发金额','money':settleForm.pausePay,'tax':'','account':''},
          {'index':2,'data':res.data.salaryAccountList[0].deduSocialMonth,'project':'应缴单位社保','money':settleForm.unitSocial,'tax':settleForm.unitSocialTax,'account':settleForm.unitSocialTicket},
          {'index':'','data':'','project':'应缴个人社保','money':settleForm.personalSocial,'tax':'','account':''},
          {'index':'','data':'','project':'没工资员工单位社保','money':settleForm.noSalaryUnitSocial,'tax':settleForm.noSalaryUnitSocialTax,'account':settleForm.noSalaryUnitSocialTicket},
          {'index':'','data':'','project':'没工资员工个人社保','money':settleForm.noSalaryPersonSocial,'tax':settleForm.noSalaryPersonSocialTax,'account':settleForm.noSalaryPersonSocialTicket},
          {'index':3,'data':res.data.salaryAccountList[0].deduProvidentMonth,'project':'应缴单位公积金','money':settleForm.unitFund,'tax':settleForm.unitFundTax,'account':settleForm.unitFundTicket},
          {'index':'','data':'','project':'应缴个人公积金','money':settleForm.personalFund,'tax':'','account':''},
          {'index':'','data':'','project':'没工资员工单位公积金','money':settleForm.noSalaryUnitFund,'tax':settleForm.noSalaryUnitFundTax,'account':settleForm.noSalaryUnitFundTicket},
          {'index':'','data':'','project':'没工资员工个人公积金','money':settleForm.noSalaryPersonalFund,'tax':settleForm.noSalaryPersonalFundTax,'account':settleForm.noSalaryPersonalFundTicket},
          {'index':4,'data':'代扣当月个人税','project':'','money':settleForm.personalCurmonthTax,'tax':'','account':''},
        ];
        let num = 5
        let isPersonYear = 0
        let settlementhFormSubListLength = res.data.settlementhFormSubList.length
        // 结算单的动态显示数据
        if(settleForm.personalYearTax > 0){
          settelData.push({'index':num,'data':'代扣个人年终奖税','project':'','money':settleForm.personalYearTax,'tax':'','account':''})
          num++
          isPersonYear = 1
        }
        if(settleForm.withholidingPersonSocial != 0){
          settelData.push({'index':num,'data':'代扣个人社保','project':'','money':settleForm.withholidingPersonSocial,'tax':'','account':''})
          num++
          settlementhFormSubListLength = settlementhFormSubListLength + 1
        }
        if(settleForm.withholidingPersonFund != 0){
          settelData.push({'index':num,'data':'代扣个人公积金','project':'','money':settleForm.withholidingPersonFund,'tax':'','account':''})
          num++
          settlementhFormSubListLength = settlementhFormSubListLength + 1
        }
        if(settleForm.withholidingUnitSocial != 0){
          settelData.push({'index':num,'data':'代扣单位社保','project':'','money':settleForm.withholidingUnitSocial,'tax':settleForm.withholidingUnitSocialTax,'account':settleForm.withholidingUnitSocialTicket})
          num++
          settlementhFormSubListLength = settlementhFormSubListLength + 1
        }
        if(settleForm.withholidingUnitFund != 0){
          settelData.push({'index':num,'data':'代扣单位公积金','project':'','money':settleForm.withholidingUnitFund,'tax':settleForm.withholidingUnitFundTax,'account':settleForm.withholidingUnitFundTicket})
          num++
          settlementhFormSubListLength = settlementhFormSubListLength + 1
        }
        if(settleForm.takingRisks != 0){
          settelData.push({'index':num,'data':'商险金额','project':'','money':settleForm.takingRisks,'tax':settleForm.takingRisksTax,'account':settleForm.takingRisksTicket})
          num++
          settlementhFormSubListLength = settlementhFormSubListLength + 1
        }
        if(settleForm.takingBalance != 0){
          settelData.push({'index':num,'data':'商险差额','project':'','money':settleForm.takingBalance,'tax':settleForm.takingBalanceTax,'account':settleForm.takingBalanceTicket})
          num++
          settlementhFormSubListLength = settlementhFormSubListLength + 1
        }
        if(settleForm.riskFundDy != 0){
          settelData.push({'index':num,'data':'风险抵押金','project':'','money':settleForm.riskFundDy,'tax':'','account':''})
          num++
          settlementhFormSubListLength = settlementhFormSubListLength + 1
        }
        if(settleForm.deductPersonal){
          settelData.push({'index':num,'data':'代扣个人费用','project':'','money':settleForm.deductPersonal,'tax':'','account':''})
          num++
          settlementhFormSubListLength = settlementhFormSubListLength + 1
        }

        if(settleForm.deductUnit){
          settelData.push({'index':num,'data':'代扣单位费用','project':'','money':settleForm.deductUnit,'tax':settleForm.deductUnitTax,'account':settleForm.deductUnitTicket})
          num++
          settlementhFormSubListLength = settlementhFormSubListLength + 1
        }
        if(settleForm.otherDbMoney){
          settelData.push({'index':num,'data':'其他代办费2','project':'','money':settleForm.otherDbMoney,'tax':'','account':''})
          num++
          settlementhFormSubListLength = settlementhFormSubListLength + 1
        }
        if(settleForm.unitSupplement){
          settelData.push({'index':num,'data':'单位待补足','project':'','money':settleForm.unitSupplement,'tax':settleForm.unitSupplementTax,'account':settleForm.unitSupplementTicket})
          num++
          settlementhFormSubListLength = settlementhFormSubListLength + 1
        }
        if(settleForm.persoanSupplement){
          settelData.push({'index':num,'data':'个人待补足','project':'','money':settleForm.persoanSupplement,'tax':'','account':''})
          num++
          settlementhFormSubListLength = settlementhFormSubListLength + 1
        }
        if(settleForm.personalDebt){
          settelData.push({'index':num,'data':'个人社保、公积金欠款','project':'','money':settleForm.personalDebt,'tax':'','account':''})
          num++
          settlementhFormSubListLength = settlementhFormSubListLength + 1
        }
        if(settleForm.personalOtherMoney){
          settelData.push({'index':num,'data':'个人其他费用','project':'','money':settleForm.personalOtherMoney,'tax':'','account':''})
          num++
          settlementhFormSubListLength = settlementhFormSubListLength + 1
        }
        if(settleForm.prevPersoanSupplement){
          settelData.push({'index':num,'data':'前次个人待补足','project':'','money':settleForm.prevPersoanSupplement,'tax':'','account':''})
          num++
          settlementhFormSubListLength = settlementhFormSubListLength + 1
        }
        if(settleForm.unitBack){
          settelData.push({'index':num,'data':'单位返还','project':'','money':settleForm.unitBack,'tax':settleForm.unitBackTax,'account':settleForm.unitBackTicket})
          num++
          settlementhFormSubListLength = settlementhFormSubListLength + 1
        }
        if(settleForm.unitSocialCard){
          settelData.push({'index':num,'data':'单位社保卡费','project':'','money':settleForm.unitSocialCard,'tax':'','account':''})
          num++
          settlementhFormSubListLength = settlementhFormSubListLength + 1
        }
        if(settleForm.exemptionPersionTax){
          settelData.push({'index':num,'data':'免个税个人代扣','project':'','money':settleForm.exemptionPersionTax,'tax':'','account':''})
          num++
          settlementhFormSubListLength = settlementhFormSubListLength + 1
        }
        if(settleForm.enterpriseAnnuity){
          settelData.push({'index':num,'data':'企业（职业）年金','project':'','money':settleForm.enterpriseAnnuity,'tax':'','account':''})
          num++
          settlementhFormSubListLength = settlementhFormSubListLength + 1
        }
        if(settleForm.onlyChild){
          settelData.push({'index':num,'data':'独生子女费','project':'','money':settleForm.onlyChild,'tax':'','account':''})
          num++
          settlementhFormSubListLength = settlementhFormSubListLength + 1
        }
        for(var c of res.data.settlementhFormSubList){
          settelData.push({'index':num,'data':getItemName(c.itemTypeName,c.subName),'project':'','money':c.money,'tax':c.tax,'account':c.ticket})
          num++
        }
        settleForm.remark = settleForm.remark ? settleForm.remark : ''
        settelData.push({'index':num++,'data':'风险金','project':'','money':settleForm.riskFund,'tax':settleForm.riskFundTax,'account':settleForm.riskFundTicket})
        settelData.push({'index':num++,'data':'人数','project':'','money':settleForm.personNum,'tax':'','account':''})
        settelData.push({'index':num++,'data':'人次','project':'','money':settleForm.personTime,'tax':'','account':''})
        settelData.push({'index':num++,'data':'管理费','project':'','money':settleForm.managementMoney,'tax':settleForm.managementMoneyTax,'account':settleForm.managementMoneyTicket})
        settelData.push({'index':num++,'data':'管理费2','project':'','money':settleForm.managementMoneyTwo,'tax':settleForm.managementMoneyTwoTax,'account':settleForm.managementMoneyTwoTicket})
        settelData.push({'index':num++,'data':'结算金额合计','project':'','money':'','tax':settleForm.countTax,'account':settleForm.accountMoneySum})
        settelData.push({'index':num++,'data':'开票金额合计','project':'','money':'','tax':'','account':settleForm.ticketMoneySum})
        settelData.push({'index':num++,'data':'上次差余额','project':'','money':'','tax':'','account':settleForm.prevPoorBalance})
        settelData.push({'index':num++,'data':'本次差余额','project':'','money':'','tax':'','account':settleForm.curPoorBalance})
        settelData.push({'index':num++,'data':'备注:' + settleForm.remark,'project':'','money':'','tax':'','account':''})
        settelData.push({'index':num++,'data':'发票类型','project':'扣除金额','money':'不含税金额','tax':'税额','account':'发票合计金额'})
        settelData.push({'index':num++,'data':settleForm.ticketType,'project':settleForm.deductionAmount,'money':settleForm.noTaxAmount,'tax':settleForm.taxAmount,'account':settleForm.ticketSumAmount})
        // settelData.push({'index':num++,'data':'','project':'','money':'1814','tax':'123.6','account':'1928.2'})
        settelData.push({'index':'审核人:','data':auditName,'project':'','money':'','tax':'制表人:','account':createName})
        settelData.push({'index':'','data':'','project':'','money':'','tax':'','account':''})
        settelData.push({'index':'','data':'','project':'','money':'','tax':'','account':''})
        settelData.push({'index':'月份','data':'姓名','project':'项目','money':'金额','tax':'原因','account':''})
        for(let c of res.data.poorBalanceInfoList){
          c.name = c.name ? c.name : ''
          c.project = c.project ? c.project : ''
          settelData.push({'index':c.month,'data':c.name,'project':c.project,'money':c.money,'tax':c.cause,'account':''})
        }
        settelData.push({'index':settlementhFormSubListLength,'data':res.data.poorBalanceInfoList.length,'project':isPersonYear,'money':'','tax':'','account':''})
        let salaryAccountList = res.data.salaryAccountList
        let accountTitle = res.data.accountTitle
        let salaryAccountListHeader = ["发放状态","结算主体","结算月份","工资月份","姓名","银行卡号","身份证号","手机号码","开户行","工资发放方式","社保扣缴月份",
            "公积金扣缴月份","是否薪资扣税","社保优先级","公积金优先级","年终奖扣税方案","是否扣除社保","是否扣除公积金"]
        let salaryAccountListValue = ["distributionFlag","settleDepartName","settlementMonth","salaryDate","empName","bankNo","empIdcard","empPhone","bankName","salaryStyle",
        "deduSocialMonth","deduProvidentMonth","salaryTaxFlag","socialPriority","fundPriority","annualBonusType",
            "isDeductSocial","isDeductFund"]
        //工资明细详情字段组装
        if(accountTitle){
          for(let c in accountTitle){
            salaryAccountListHeader.push(c)
            salaryAccountListValue.push(accountTitle[c])
          }
        }
        // 组装工资明细数据
        for(let d in salaryAccountList){
          // 发放状态
          salaryAccountList[d].distributionFlag = this.distributionFlagOption[salaryAccountList[d].distributionFlag]
          // 工资发放方式
          salaryAccountList[d].salaryStyle = this.salaryStyleOption[salaryAccountList[d].salaryStyle]
          salaryAccountList[d].salaryGiveTime = this.salaryGiveTimeOption[salaryAccountList[d].salaryGiveTime]
          salaryAccountList[d].salaryTaxFlag = this.isFlag[salaryAccountList[d].salaryTaxFlag]
          salaryAccountList[d].socialPriority = this.socialPriorityOption[salaryAccountList[d].socialPriority]
          salaryAccountList[d].fundPriority = this.fundPriorityOption[salaryAccountList[d].fundPriority]
          salaryAccountList[d].annualBonusType = this.annualBonusTypeOption[salaryAccountList[d].annualBonusType]
          salaryAccountList[d].isDeductSocial = this.isFlag[salaryAccountList[d].isDeductSocial]
          salaryAccountList[d].isDeductFund = this.isFlag[salaryAccountList[d].isDeductFund]
          let bankName = filterDictText(this.bankOptions,salaryAccountList[d].bankName)
          if(bankName == '-' && this.bankOptions,salaryAccountList[d].bankName){
            1 == 1
          }else{
            salaryAccountList[d].bankName = bankName
          }
          if(accountTitle){
            for(const c in accountTitle){
              salaryAccountList[d][accountTitle[c]] = ''
              let saiList = salaryAccountList[d].saiList
              let i = 0
              for(const m in saiList){
                if(saiList[m].javaFiedName == accountTitle[c]){
                  i = 1
                  const item = saiList[m]
                  const name = (item.salaryMoney === '' || item.salaryMoney === null)?item.textValue:item.salaryMoney
                  salaryAccountList[d][accountTitle[c]] = name
                }
              }
              if(i == 0){
                salaryAccountList[d][accountTitle[c]] = 0
              }
            }
          }
        }
        //银行
        let salaryBankVoList = res.data.salaryBankVoList
        let bankMoney = 0
        for(let m in salaryBankVoList){
          let bankName = filterDictText(this.bankOptions,salaryBankVoList[m].bankName)
          bankMoney += salaryBankVoList[m].money * 1
          //salaryBankVoList[m].bankName = filterDictText(this.bankOptions,salaryBankVoList[m].bankName)
          if(bankName == '-' && this.bankOptions,salaryBankVoList[m].bankName){
            1 == 1
          }else{
            salaryBankVoList[m].bankName = bankName
          }
        }
        salaryBankVoList.push({
          'name':'',
          'idNumber':'',
          'bankNo':'',
          'money':bankMoney,
          'bankName':'',
          'subBranch':''
        })
        //现金
        let salaryCashVoList = res.data.salaryCashVoList
        let cashMoney = 0
        for(let m in salaryCashVoList){
          cashMoney += salaryCashVoList[m].money * 1
        }
        salaryCashVoList.push({
          'name':'',
          'idNumber':'',
          'money': cashMoney
        })
        //社保明细
        for(let y in res.data.forecastList){
          res.data.forecastList[y].personalProvidentSum = res.data.forecastList[y].personalProvidentSum ? res.data.forecastList[y].personalProvidentSum : ''
          res.data.forecastList[y].providentCreateMonth = res.data.forecastList[y].providentCreateMonth ? res.data.forecastList[y].providentCreateMonth : ''
          res.data.forecastList[y].unitProvidentSum = res.data.forecastList[y].unitProvidentSum ? res.data.forecastList[y].unitProvidentSum : ''
          res.data.forecastList[y].providentPayMonth = res.data.forecastList[y].providentPayMonth ? res.data.forecastList[y].providentPayMonth : ''
        }
        // 封面数据
        var excelDatas = [
          {
            tHeader: salaryAccountListHeader, // 表一的数据字段
            filterVal: salaryAccountListValue, // sheet表一头部
            tableDatas: salaryAccountList, // 表一的整体json数据
            sheetName: "工资明细"// 表一的sheet名字
          },
          {
            tHeader: ["序号",null,"费用项目", "金额", "增值税", "开票额小计"],
            filterVal: ['index','data',"project", "money", "tax", "account"],
            tableDatas: settelData,
            sheetName: "结算单"
          },
          {
            tHeader: ["姓名","身份证号", "银行账号", "实发工资合计", "银行","支行"],
            filterVal: ['name','idNumber',"bankNo", "money", "bankName","subBranch"],
            tableDatas: salaryBankVoList,
            sheetName: "银行"
          },
          {
            tHeader: ["姓名","身份证号", "实发工资合计"],
            filterVal: ['name','idNumber', "money"],
            tableDatas: salaryCashVoList,
            sheetName: "现金"
          },
          {
            tHeader: ["员工姓名", "身份证号","个人大病费用","个人失业","个人公积金合计","个人医疗费用","个人养老费用","个人社保合计"
            ,"公积金生成月份","公积金缴纳月份","社保生成月份","社保缴纳月份","单位生育费用","单位大病救助","单位公积金合计",
            "单位医疗费用","单位养老费用","单位社保合计","单位失业费用","单位工伤费用"],
            filterVal: ["empName","empIdcard","personalBigmailmentMoney","personalUnemploymentMoney","personalProvidentSum","personalMedicalMoney","personalPensionMoney","socialSecurityPersonalSum"
            ,"providentCreateMonth","providentPayMonth","socialCreateMonth","socialPayMonth","unitBirthMoney","unitBigmailmentMoney","unitProvidentSum",
            "unitMedicalMoney","unitPensionMoney","unitSocialSum","unitUnemploymentMoney","unitInjuryMoney"],
            tableDatas: res.data.forecastList,
            sheetName: "社保明细"
          },
          {
            tHeader: ["员工姓名", "员工身份证号","结算部门","保险公司","险种","保单开始时间","保单结束时间","实际保费","预估金额",
            "保单号","医保","身故或残疾","商险购买地","购买标准","结算月份","备注"],
            filterVal: ['empName','empIdcardNo', "settlementDepart", "insuranceCompanyName","insuranceTypeName","policyStart","policyEnd","buyPay","forecastBuyPay",
            "policyNo","medicalMoney","deathDisabilityMoney","businessInsuranceAddr","buyStandard","settleMonth","remark"],
            tableDatas: res.data.businessInsuranceList ? res.data.businessInsuranceList : [],
            sheetName: "商险明细"
          },
        ]
        let i = 1
        let sign = 'Y'
        if(res.data.salary.moneyFrom == 1){
          sign = "DF"
        }
        for(var d of res.data.coverList){
          let receiptUnitName = d.receiptUnitName ? d.receiptUnitName : ''
          let bankNo = d.bankNo ? d.bankNo : ''
          let bankName = d.bankName ? d.bankName : ''
          let remark = d.remark ? d.remark : " "
          d.createDate = moment().format("YYYY/MM/DD")
          let lastTwo = d.itemName.substr(d.itemName.length - 2,2)
          if(lastTwo == "其他"){
            d.itemName = d.itemName.substr(0,d.itemName.length - 2) + "工资"
          }
          if(d.payType == 1){
            let coverData = [
              {'company':d.invoiceTitle,'project':'','payType':'','money':'','no':''},
              {'company':"银行转账审批单",'project':'','payType':'','money':'','no':''},
              {'company':sign+'-'+this.isBackedType[this.salaryStandardInfo.isBacked],'project':d.createDate,'payType':'结算主体编码','money':d.settleNo,'no':''},
              {'company':"单位",'project':'项目','payType':'付款方式','money':'金额','no':'附件张'},
              {'company':"",'project':'','payType':'','money':'','no':''},
              {'company':d.unitName,'project':d.itemName,'payType':'银行转账','money':'¥' + d.money,'no':''},
              {'company':d.settleName,'project':'','payType':'','money':'','no':''},
              {'company':"",'project':'','payType':'','money':'','no':''},
              {'company':"",'project':'','payType':'','money':'','no':''},
              {'company':"",'project':'','payType':'','money':'','no':''},
              {'company':"",'project':'','payType':'','money':'','no':''},
              {'company':"",'project':'','payType':'','money':'','no':''},
              {'company':"合计人民币:",'project':d.chmoney,'payType':'','money':'¥' + d.money,'no':''},
              {'company':"    收款单位名称:" + receiptUnitName + "          账号:" + bankNo + "          开户行:" + bankName,'project':'','payType':'','money':'','no':''},
              {'company':"备注:" + remark,'project':'','payType':'','money':'','no':''},
              {'company':"",'project':'','payType':'','money':'','no':''},
              {'company':"公司领导：              财务负责人:" + revenueName + '                网银审核授权人：              网银转账提交人：' + this.nickname() + '              数据审核人：' + auditName + '           制表人:' + createName,'project':'' ,'payType': '','money':'','no':''},
            ]
            excelDatas.push({
              tHeader: ["序号", "名字", "描述", "金钱", "地位"],
              filterVal: ["company", "project", "payType", "money",'no'],
              tableDatas:coverData,
              sheetName:'转账封面' + i
            })
          }else{
            let coverData = [
              {'company':d.invoiceTitle,'project':'','payType':'','money':'','no':''},
              {'company':"现金付款审批单",'project':'','payType':'','money':'','no':''},
              {'company':sign,'project':d.createDate,'payType':'结算主体编码','money':d.settleNo,'no':''},
              {'company':"单位",'project':'项目','payType':'付款方式','money':'金额','no':'附件张'},
              {'company':"",'project':'','payType':'','money':'','no':''},
              {'company':d.unitName,'project':d.itemName,'payType':'现金转账','money':'¥' + d.money,'no':''},
              {'company':d.settleName,'project':'','payType':'','money':'','no':''},
              {'company':"",'project':'','payType':'','money':'','no':''},
              {'company':"",'project':'','payType':'','money':'','no':''},
              {'company':"",'project':'','payType':'','money':'','no':''},
              {'company':"",'project':'','payType':'','money':'','no':''},
              {'company':"",'project':'','payType':'','money':'','no':''},
              {'company':"合计人民币:",'project':d.chmoney,'payType':'','money':'¥' + d.money,'no':''},
              {'company':"备注:" + remark,'project':'','payType':'','money':'','no':''},
              {'company':"",'project':'','payType':'','money':'','no':''},
              {'company':"公司领导：                    财务负责人：" + revenueName + '                 出纳会计: ' + '                         数据审核人：' + auditName + '                     制表人: ' + createName,'project': '' ,'payType':'','money':'','no':''},
            ]
            excelDatas.push({
              tHeader: ["序号", "名字", "描述", "金钱", "地位"],
              filterVal: ["company", "project", "payType", "money",'no'],
              tableDatas:coverData,
              sheetName:'转账封面' + i
            })
          }
          i++
        }
        // 获取垫付单数据
        if(res.data.salary.advanceMoney > 0){
          let j = 1
          const advanceUrl = this.url.getAdvance + '?formId=' + settleForm.id +'&type=0'
          let status = ['提交审核','审核通过','审核不通过','待审核']
          const advanceRes = await this.exportAdvanceUrl(advanceUrl)
          if(advanceRes.code == 200){
            let advanceData = advanceRes.data
            for(let y of advanceData){
              let contractName = ''
              if(y.advancePayment.contractId){
                const contractRes =  await this.getContractName(y.advancePayment.contractId)
                if(contractRes && contractRes.code === 200){
                  contractName = contractRes.data.contractName
                }
              }
              let advanceDataOne = [
                {'company':'客户单位','project':y.advancePayment.customerName,'payType':'客户合同','money':contractName},
                {'company':'结算主体','project':y.advancePayment.departName,'payType':'垫付客户类型','money':filterDictText(this.customerTypeDicts, y.advancePayment.customerType)},
                {'company':'垫付类型	','project':filterDictText(this.advanceTypeDicts, y.advancePayment.advanceType),'payType':'申请单位','money':filterOrgan(this.organs,y.advancePayment.applyUnit)},
                {'company':'申请垫付时间','project':y.advancePayment.applyAdvanceDate,'payType':'本次已垫付未回款金额','money':y.advancePayment.advanceNotPayback},
                {'company':'结算金额','project':y.advancePayment.settleMoney,'payType':'开票金额','money':y.advancePayment.ticketMoney},
                {'company':'垫付金额','project':y.advancePayment.advanceMoney,'payType':'预计回款日期','money':y.advancePayment.paybackDate},
                {'company':'申请人	','project':y.advancePayment.createUser,'payType':'垫付原因','money':y.advancePayment.advanceReason},
              ]
              for(let w of y.approveAuditInfoList){
                let auditRemark = w.auditRemark ? w.auditRemark : ''
                advanceDataOne.push({
                  'company':w.nodeName,'project':w.auditUser + '->' + status[w.auditStatus] + '(' + auditRemark + ')','payType':'','money':''
                })
              }
              excelDatas.push({
                  tHeader: ["序号", "名字", "描述", "金钱"],
                  filterVal: ["company", "project", "payType", "money"],
                  tableDatas:advanceDataOne,
                  sheetName:'垫付申请单' + j
              })
              if(j == advanceData.length){
                let coverLength = res.data.coverList.length
                let insLength = 0
                if(settleForm.takingBalanceIds){
                  httpAction(this.url.getSalaryFrom + settleForm.id,{},'get').then((result) => {
                    if(res.code == 200){
                      let insData = []
                      insLength = 1
                      for(let y of result.data){
                        for(let w of y.businessInsuranceList){
                          insData.push(w)
                        }
                      }
                      excelDatas.push({
                        tHeader: ["员工姓名", "员工身份证号","结算主体编码","结算主体","客户单位","保险公司","险种","保单开始时间","保单结束时间","实际保费","预估金额","差额",
                        "保单号","医保","身故或残疾","商险购买地","购买标准","结算月份","备注"],
                        filterVal: ['empName','empIdcardNo',"settlementOrganNo", "settlementOrganName","customerName", "insuranceCompanyName","insuranceTypeName","policyStart","policyEnd",
                        "buyPay","forecastBuyPay","balance","policyNo","medicalMoney","deathDisabilityMoney","area","buyStandard","settleMonth","remark"],
                        tableDatas: insData,
                        sheetName: "商险差额明细"
                      })
                    }
                    let excelName = settleForm.settleMonth + settleForm.settleDepartName + "普通薪资" + '(' + filterDictText(this.formTypeOptions, res.data.salary.formType) + ')' + settleForm.settleDepartNo + '(' + settleForm.accountMoneySum + ')'
                    this.json2excel(excelDatas, excelName, true, "xlsx",coverLength,insLength)
                    this.downloadLoading = false
                  })
                }else{
                  let excelName = settleForm.settleMonth + settleForm.settleDepartName + "普通薪资" + '(' + filterDictText(this.formTypeOptions, res.data.salary.formType) + ')' + settleForm.settleDepartNo + '(' + settleForm.accountMoneySum + ')'
                  this.json2excel(excelDatas, excelName, true, "xlsx",coverLength,insLength)
                  this.downloadLoading = false
                }
              }
              j++
            }
          }else{
            this.$message.warning(advanceRes.msg)
          }
        }else{
          let coverLength = res.data.coverList.length
          let insLength = 0
          if(settleForm.takingBalanceIds){
            const result = await this.exportSalaryFrom(this.url.getSalaryFrom + settleForm.id)
            if(result && result.code == 200){
              let insData = []
              insLength = 1
              for(let y of result.data){
                for(let w of y.businessInsuranceList){
                  insData.push(w)
                }
              }
              excelDatas.push({
                tHeader: ["员工姓名", "员工身份证号","结算主体编码","结算主体","客户单位","保险公司","险种","保单开始时间","保单结束时间","实际保费","预估金额","差额",
                "保单号","医保","身故或残疾","商险购买地","购买标准","结算月份","备注"],
                filterVal: ['empName','empIdcardNo',"settlementOrganNo", "settlementOrganName","customerName", "insuranceCompanyName","insuranceTypeName","policyStart","policyEnd",
                "buyPay","forecastBuyPay","balance","policyNo","medicalMoney","deathDisabilityMoney","area","buyStandard","settleMonth","remark"],
                tableDatas: insData,
                sheetName: "商险差额明细"
              })
              let excelName = settleForm.settleMonth + settleForm.settleDepartName + "普通薪资" + '(' + filterDictText(this.formTypeOptions, res.data.salary.formType) + ')' + settleForm.settleDepartNo + '(' + settleForm.accountMoneySum + ')'
              this.json2excel(excelDatas, excelName, true, "xlsx",coverLength,insLength)
              this.downloadLoading = false
            }else{
              this.$message.warning(result.msg||'')
            }

          }else{
            let excelName = settleForm.settleMonth + settleForm.settleDepartName + "普通薪资" + '(' + filterDictText(this.formTypeOptions, res.data.salary.formType) + ')' + settleForm.settleDepartNo + '(' + settleForm.accountMoneySum + ')'
            this.json2excel(excelDatas, excelName, true, "xlsx",coverLength,insLength)
            this.downloadLoading = false
          }
        }
        this.downVisible = false
      }else{
        this.$message.warning(res.msg)
      }
    },
    async exportSalaryFrom(url){
      return httpAction(url,{},'get')
    },
    async exportAdvanceUrl(url){
      return httpAction(url,{},'POST')
    },
    async exportUrl(url){
      return httpAction(url,{},'POST',120000)
    },
    async getContractName(contractId){
      return httpAction(this.url.getContract + contractId,{},'GET')
    },
    json2excel(tableJson, filenames, autowidth, bookTypes,coverLength,insLength){
      var that = this
      //这个是引用插件
      import("@/vendor/BillingExportExcel").then(excel => {
        var tHeader = []
        var dataArr = []
        var sheetnames = []
        for (var i in tableJson) {
          tHeader.push(tableJson[i].tHeader)
          dataArr.push(that.formatJson(tableJson[i].filterVal, tableJson[i].tableDatas))
          sheetnames.push(tableJson[i].sheetName)
        }
        excel.export_json_to_excel_more_sheet({
          header: tHeader,
          data: dataArr,
          sheetname: sheetnames,
          filename: filenames,
          autoWidth: autowidth,
          bookType: bookTypes,
          coverLength:coverLength,
          insLength:insLength
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    }
  }
}
</script>
<style lang="scss">
@mixin clearfix {
  &:before {
    display: table;
    content: '';
    clear: both;
  }
  &:after {
    display: table;
    content: '';
    clear: both;
  }
}
.main-article {
  padding: 20px;
  margin: 0 auto;
  display: block;
  width: 740px;
  background: #fff;
}
.article__heading {
  position: relative;
  padding: 0 0 20px;
  overflow: hidden;
}
.article__heading__title {
  display: block;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  word-wrap: break-word;
  overflow-wrap: break-word;
  font-size: 32px;
  line-height: 48px;
  font-weight: 600;
  color: #333;
  overflow: hidden;
}
.node-article-content {
  margin: 20px 0 0;
  @include clearfix;
  font-size: 16px;
  color: #333;
  letter-spacing: 0.5px;
  line-height: 28px;
  margin-bottom: 30px;
  font-family: medium-content-serif-font, Georgia, Cambria, 'Times New Roman', Times, serif;
  & > :last-child {
    margin-bottom: 0;
  }
  b,
  strong {
    font-weight: inherit;
    font-weight: bolder;
  }
  img {
    max-width: 100%;
    display: block;
    margin: 0 auto;
  }
  p {
    font-weight: 400;
    font-style: normal;
    font-size: 21px;
    line-height: 1.58;
    letter-spacing: -0.003em;
  }
  ul {
    margin-bottom: 30px;
  }
  li {
    --x-height-multiplier: 0.375;
    --baseline-multiplier: 0.17;
    font-weight: 400;
    font-style: normal;
    font-size: 21px;
    line-height: 1.58;
    letter-spacing: -0.003em;
    margin-left: 30px;
    margin-bottom: 14px;
  }
  a {
    text-decoration: none;
    background-repeat: repeat-x;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0.84) 100%, rgba(0, 0, 0, 0) 0);
    background-size: 1px 1px;
    background-position: 0 calc(1em + 1px);
    padding: 0 6px;
  }
  code {
    background: rgba(0, 0, 0, 0.05);
    padding: 3px 4px;
    margin: 0 2px;
    font-size: 16px;
    display: inline-block;
  }
  img {
    border: 0;
  }
  /* 解决 IE6-7 图片缩放锯齿问题 */
  img {
    -ms-interpolation-mode: bicubic;
  }
  blockquote {
    --x-height-multiplier: 0.375;
    --baseline-multiplier: 0.17;
    font-family: medium-content-serif-font, Georgia, Cambria, 'Times New Roman', Times, serif;
    letter-spacing: 0.01rem;
    font-weight: 400;
    font-style: italic;
    font-size: 21px;
    line-height: 1.58;
    border-left: 3px solid rgba(0, 0, 0, 0.84);
    padding-left: 20px;
    margin-left: -23px;
    padding-bottom: 2px;
  }
  a {
    text-decoration: none;
  }
  h2,
  h3,
  h4 {
    font-size: 34px;
    line-height: 1.15;
    letter-spacing: -0.015em;
    margin: 53px 0 0;
  }
  h4 {
    font-size: 26px;
  }
}
</style>
