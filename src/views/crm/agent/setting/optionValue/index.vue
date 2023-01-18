<template>
  <div class="app-container">
    <!--  搜索框  -->
    <div class="search-vi">
      <el-row :gutter="24">
        <el-col :span="24">
          <el-popover
            popper-class="search-popover-vi"
            placement="top-start"
            width="400"
            trigger="manual"
            v-model="showSearch"
          >
          <!-- 筛选 -->
            <div class="search-popover">
              <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="120px" label-position="left">
                <el-form-item label="录入时间">
                  <el-date-picker
                    v-model="queryParams.enteringTime"
                    size="small"
                    class="mw350"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>

                <el-form-item label="跟进时间">
                  <el-date-picker
                    v-model="queryParams.followTime"
                    size="small"
                    class="mw350"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>

                <el-form-item label="成交时间">
                  <el-date-picker
                    v-model="queryParams.accomplishTime"
                    size="small"
                    class="mw350"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>

                <el-form-item label="商机等级" prop="sourceTypeLv">
                  <el-radio-group v-model="queryParams.sourceTypeLv">
                    <el-radio v-for="item in sourceTypeLvList" :key="item.dictCode" :label="item.dictCode">
                      {{item.dictCode}}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="所在地区" prop="district">
                  <el-select v-model="bankList.delSwitch" placeholder="请选择删除开关标识 " clearable size="small" class="mw222">
                    <el-option v-for="item in delSwitch" :key="item.dictId" :label="item.dictLabel"
                               :value="item.dictCode"/>
                  </el-select>
                </el-form-item>
              </el-form>
              <div class="popover-footer">
                <el-button size="small" type="cyan" @click="resetQuery">重置</el-button>
                <el-button type="primary" size="small" @click="handleQuery">确认</el-button>
                <el-button size="small" @click="showSearch = false">取 消</el-button>
              </div>
            </div>
            <el-button slot="reference" size="small" icon="el-icon-search" @click="showSearch = !showSearch">筛选
            </el-button>
          </el-popover>
          <el-input
            class="ml8"
            v-model="queryParams.roleName"
            placeholder="请输入角色名称"
            clearable
            size="small"
            style="width: 240px"
            suffix-icon="el-icon-search"
            @keyup.enter.native="handleQuery"
          />
          <el-dropdown size="small" split-button type="primary" trigger="click" class="ml8" @click="handleAdd">
            <span>
              <i class="el-icon-plus"></i>
              新增商机
            </span>
            <el-dropdown-menu slot="dropdown" style="width: 124px">
              <el-dropdown-item style="width: 100%" @click.native="bulkImport"><span><i
                class="el-icon-upload2"></i>导入</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button
            class="ml8"
            icon="el-icon-download"
            size="small"
            @click="handleExport"
            v-hasPermi="['crm:log:export']"
          >导出
          </el-button>
        </el-col>
      </el-row>
      <div class="msgbox-vi">
        <label>公告</label>
        <div class="msg-vi">
          这里是一条消息，后面也是一条消息，消息轮播这里是...
        </div>
      </div>
    </div>

    <!-- 内容选项 头部 -->
    <div class="tabbar-vi">
      <el-tabs v-model="optionValue" >
        <el-tab-pane
          label="商机标签"
          value="10" name="10"></el-tab-pane>
          <el-tab-pane
            label="商机所属区域"
            value="20" name="20"></el-tab-pane>
        <el-tab-pane
          label="商机来源"
          value="30" name="30"></el-tab-pane>
      </el-tabs>
      <div class="top-right-btn">
      </div>
    </div>

    <div class="table-data">
      <div class="header_btn">
        <el-button
          icon="el-icon-plus"
          size="small"
          type="primary"
          @click='addOption'
        >添加选项
        </el-button>
      <el-button
        size="small"
        style="background: #FAEEF0;border: 1px solid #F7DEE0;color: #EF5465;"
      >删除</el-button>
     </div>
      <!-- 展示页面 -->
    <div>
      <!-- 商机标签 -->
      <div v-if="optionValue=='10'">
        <el-checkbox-group v-model="lableListcheck" class="checkboxlist" >
          <el-checkbox :label="item" v-for="item in lableList"></el-checkbox>
        </el-checkbox-group>
      </div>
      <!-- 商机所属区域 -->
      <div v-if="optionValue=='20'" style="margin-bottom: -24px;">
        <el-table v-loading="loading"  :data="regionList"  @selection-change="handleSelectionChange"
                   class="regionOption">
           <el-table-column type="selection" width="55" align="center"/>
           <el-table-column label="省" align="center" prop="provincial" width="120"/>
           <el-table-column label="市" align="center" prop="city" width="120"/>
           <el-table-column label="区" align="center" prop="county" width="120"/>
           <el-table-column label="" align="left" />
        </el-table>
      </div>
      <!-- 商机来源 -->
      <div v-if="optionValue=='30'">
        <el-checkbox-group v-model="sourceListcheck" class="checkboxlist" >
          <el-checkbox :label="item" v-for="item in sourceList"></el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
   </div>

    <!-- 新增商机对话框//转成交 -->
    <el-dialog :title="title" :visible.sync="open" width="704px" append-to-body class="businiss" :close-on-click-modal="false" :close-on-press-escape="false">
      <!-- <div class="step-vi" v-if="dialogVisible">
        <steper :step-list="[{name:'商机信息补全'},{name:'选择购买产品'},{name:'提交订单合同'}]" :active.sync="stepIndex"></steper>
      </div> -->
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        size="small" :inline="true"
      >
        <template >
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="商机名称" prop="clienteleName">
                <el-input
                  style="width: 182px"
                  v-model="form.clienteleName"
                  placeholder="请输入商机名称"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系方式" prop="customerPhone">
                <el-input
                  v-model="form.customerPhone"
                  placeholder="请输入联系人方式"
                  :maxlength="11"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="商机类型" prop="sourceType">
                <el-select v-model="form.sourceType" placeholder="请选择商机类型">
                  <el-option v-for="item in opportunityTypeList" :label="item.dictName" :value="item.dictCode"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="意向度" prop="sourceTypeLv">
                <el-select v-model="form.sourceTypeLv" placeholder="请选择意向度">
                  <el-option v-for="item in sourceTypeLvList" :label="item.dictName" :value="item.dictCode"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="增值税" prop="taxType">
                <el-select v-model="form.taxType" placeholder="请选择增值税类型">
                  <el-option v-for="item in vatTypeList" :label="item.dictName" :value="item.dictCode"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所在地区" prop="district">
                <el-cascader
                  placeholder="请选择信息所在地区"
                  style="width: 100%"
                  size="small"
                  :options="areaOptions"
                  v-model="form.district"
                  @change="handleRegionChange">
                </el-cascader>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="商机来源" prop="customerSource">
                <el-select v-model="form.customerSource" placeholder="请选择商机来源">
                  <el-option v-for="item in businessFromList" :label="item.dictName" :value="item.dictCode"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="行业分类" prop="industryClassifyId">
                <el-select v-model="form.industryClassifyId" placeholder="请选择行业分类">
                  <el-option label="请选择商机类型" value=""/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="在其他公司代账:" prop="isOtherFirmGeneration">
                <el-radio v-model="form.isOtherFirmGeneration" label="1">是</el-radio>
                <el-radio v-model="form.isOtherFirmGeneration" label="2">否</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="详细地址" prop="addressDetail">
                <el-input v-model="form.addressDetail" style="width: 592px;" placeholder="请选择详细地址"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="标签" prop="userLabel">
                <div class="tag-vi">
                  <el-tag
                    :key="tag"
                    v-for="tag in form.userLabel"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)"
                  >
                    {{ tag }}
                  </el-tag>
                  <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
                  >
                  </el-input>
                  <el-button v-else class="button-new-tag" size="small" @click="showInput" icon="el-icon-plus"
                  >添加标签
                  </el-button
                  >
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
        <!-- <el-row v-show="stepIndex==1" :gutter="20" style="margin-top: -10px">
          <el-col v-for="item in proTypeList" :span="8">
            <div class="type_item" @click="toOrderFun(item)">
              <span>
                 {{item.name}}
              </span>
              <el-button type="primary" size="mini">
                选择并创建合同订单
              </el-button>
            </div>
          </el-col>
        </el-row> -->
      </el-form>
      <!-- <div slot="footer" class="dialog-footer" v-if="dialogVisible&&stepIndex==0">
        <el-button type="primary" @click="toDealForm">下一步</el-button>
      </div>
      <div slot="footer" class="dialog-footer" v-else-if="dialogVisible&&stepIndex==1" >
        <el-button  @click="back">上一步</el-button>
      </div> -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
      <!-- 创建订单 -->
      <!-- <edit-order :visible.sync="orderTypeVisible" :companyId="companyId" :orderType="orderType"></edit-order> -->
    </el-dialog>

    <!-- 添加选项 弹窗 -->
    <el-dialog title="添加选项" :visible.sync="optionOpen" class="optionDialog"  width="422px" append-to-body>
      <el-form :model="optionForm">
        <el-form-item label="请输入选项名" >
          <el-input v-model="optionForm.optioName" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

  import {
    listOpportunity,
    getOpportunity,
    delOpportunity,
    addOpportunity,
    updateOpportunity,
    exportOpportunity,
    bulkImportOpportunity,
    ConversionDealOpportunity,
    getOpportunityFootprintList,
    getFollowRecordList,
    addFollowRecord,
    getContactsList,
    delContact,
    addContact,
    updateContact,
    toMareLiberum,
    delRecordImg
  } from '@/api/crm/agent/agent'
  import {getIntermSerpriceList} from '@/api/crm/intermSerprice'
  import { mapGetters } from 'vuex'
  import { _getSessionStore } from '@/utils/storage'
  import { tokenKey } from '@/settings'
  import EditOrder from '@/views/components/EditOrder'
  /*获取省市区信息*/
  import {
    provinceAndCityData,
    regionData,
    provinceAndCityDataPlus,
    regionDataPlus,
    CodeToText,
    TextToCode
  } from 'element-china-area-data'

  export default {
    components:{
      EditOrder
    },
    name: 'Agent',
    data() {
      return {
        // filePath: process.env.VUE_APP_FILE_API,
        // uploadUrl: process.env.VUE_APP_CRM_API + '/hmkj-crm/crmRecordImg/upload',
        // dynamicTags: [],
        // agentState: [],
        // returnState: [],
        // businessStatus: [],
        sourceTypeLvList: [],//意向度字典
        opportunityTypeList: [],//商机类型字典
        vatTypeList: [],//增值税类型字典
        businessFromList: [],//商机来源字典
        areaOptions: regionData,//区域数据
        customerRatingList: [],//客户等级字典
        followTypeList: [],//跟进方式字典
        fileList: [],//文件上传数据
        contactsList: [],//联系人数据
        proTypeList:[],//产品类型数据
        // headers: { Authorization: _getSessionStore(tokenKey) },
        inputVisible: false,
        inputValue: '',
        dialogVisible: false,
        dialogVisibleTwo: false,
        // addFollowShow: false,
        // transferVisible:false,//移交商机
        // 遮罩层
        loading: true,
        // 选中数组
        ids: [],
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 显示搜索条件
        showSearch: false,
        delSwitch: [],
        // 总条数
        total: 0,
        // 公司银行开户信息表格数据
        bankList: [],
        // 弹出层标题
        title: '',
        // 是否显示弹出层
        open: false,
        // 是否抽屉弹出层
        view: false,
        // 查询参数
        queryParams: {
          pageNo: 1,
          pageSize: 10,
          companyId: null,
          bankName: null,
          bankAccountNumber: null,
          bankAddress: null,
          createDate: null,
          updateDate: null,
          remarks: null,
          delSwitch: null,
          accomplishTime: null,
          followTime: null,
          enteringTime: null,
          sourceTypeLv: null
        },
        // 表单参数
        form: {},
        //跟进记录表单参数
        // followForm: {},
        // 表单校验
        rules: {
          clienteleName: [
            {
              required: true, message: '商机名称不能为空', trigger: 'blur'
            }
          ],
          sourceTypeLv: [
            {
              required: true, message: '意向度不能为空', trigger: 'blur'
            }
          ],
          customerSource: [{
            required: true, message: '商机来源不能为空', trigger: 'blur'
          }]
        },
        // settings: [{ icon: 'el-icon-delete', lable: '删除商机', value: '1' },
        //   {icon: 'el-icon-news',lable: '移交商机',value: '2'},
        //   { icon: 'el-icon-link', lable: '释放商机', value: '3' }],
        // followList: [],
        // footprintList: [],
        load: false,
        // stepIndex: 0,
        // activeName: 'first',
        // orderTypeVisible:false,
        // orderType:'',
        // orderForm:{},
        // orderRules:{},
        // companyId:'',
        // 选项显示
        optionValue:'10',
        // 商机标签
        lableList:['百度','抖音','转介绍'],
        // 商机标签选中
       lableListcheck:[],
       // 商机来源
       sourceList:['个人客户','企业客户','发票'],
       // 商机来源  选中
       sourceListcheck:[],
       // 商机区域
        regionList:[
          {provincial:'安徽省',city:'合肥市',county:'庐阳区'},
          {provincial:'安徽省',city:'合肥市',county:'蜀山区'},
        ],
        // 选项弹窗
        optionOpen:false,
        // 选项信息
        optionForm:{}
      }
    },
    computed: {
      ...mapGetters(['tableHeight'])
    },
    created() {
      this.getDicts('del_switch').then(res => {
        this.delSwitch = res.data
      })
      // this.getDicts('agent_state').then(res => {
      //   this.agentState = res.data
      // })
      // this.getDicts('return_state').then(res => {
      //   this.returnState = res.data
      // })
      // this.getDicts('business_status').then(res => {
      //   this.businessStatus = res.data
      // })
      this.getDicts('source_type_lv').then(res => {
        this.sourceTypeLvList = res.data
      })
      //商机类型
      this.getDicts('opportunity_type').then(res => {
        this.opportunityTypeList = res.data
      })
      //增值税类型
      this.getDicts('vat_type').then(res => {
        this.vatTypeList = res.data
      })
      this.getDicts('business_from').then(res => {
        this.businessFromList = res.data
      })
      //客户等级
      this.getDicts('customer_rating').then(res => {
        this.customerRatingList = res.data
      })
      //跟进方式
      this.getDicts('follow_type').then(res => {
        this.followTypeList = res.data
      })
      this.getList()
    },
    methods: {
      // next() {
      //   if (this.stepIndex++ > 1) this.stepIndex = 1
      // },
      // back() {
      //   if (this.stepIndex-- < 0) this.stepIndex = 0
      // },

      // 取消按钮
      cancel() {
        this.optionOpen = false;
        this.open = false
        this.reset()
      },
      // 表单重置
      reset() {
        this.form = {
          id: null,
          clienteleName: null,
          customerName: null,
          customerPhone: null,
          sourceType: '20',
          sourceTypeLv: 'C',
          taxType: '10',
          city: null,
          prov: null,
          county: null,
          customerSource: null,
          addressDetail: null,
          agentState: null,
          categoryText: null,
          customerWeixin: null,
          customerQq: null,
          district: null,
          isOtherFirmGeneration: '2',
          userLabel: [],
          industryClassifyId: null,
          customerRating: null
        }
        this.optionForm = {
          optioName:null
        }
        this.resetForm('form')
      },

      // followReset() {
      //   this.followForm = {
      //     imageIds: null,
      //     nextContent: null,
      //     nextDate: null,
      //     tempTime: null,
      //     tempDate: null,
      //     rboId: null,
      //     theContent: null,
      //     type: null
      //   }
      //   this.$refs.upload.clearFiles();
      //   this.resetForm('followForm')
      // },

      //转成交
      // ConversionDeal(row) {
      //   getOpportunity({ id: row.id }).then(response => {
      //     let data = response.data
      //     try {
      //       data.userLabel = data.userLabel ? JSON.parse(data.userLabel) : []
      //       data.district = data.district ? JSON.parse(data.district) : []
      //     } catch (e) {
      //       console.info(e)
      //     }
      //     this.form = data
      //     this.stepIndex= 0;
      //     this.dialogVisible = true
      //     this.open = true
      //     this.title = '转成交'
      //   })

      // },

      // toDealForm(){
      //   let data = JSON.parse(JSON.stringify(this.form));
      //   data.flag = 10 //商机信息转客户信息，生成客户信息数据
      //   ConversionDealOpportunity(data).then(response => {
      //     console.info(response)
      //     this.stepIndex = 1;
      //   })
      //   this.getProductTypeList();
      // },

      //选择产品
      // toOrderFun(row){
      //   //订单类型：10 代账 20 非代账
      //   this.orderType=row.type
      //   this.orderTypeVisible = true
      // },
      // 添加标签 信息
      showInput() {
        this.inputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },

      handleInputCallback() {
        this.handleInputConfirm((res) => {
          this.updateForm({ userLabel: res })
        })
      },
      // 标签
      handleInputConfirm(cb) {
        let inputValue = this.inputValue
        if (inputValue) {
          this.form.userLabel.push(inputValue)
          if (typeof cb == 'function') {
            cb(this.form.userLabel)
          }
        }
        this.inputVisible = false
        this.inputValue = ''
      },

      handleCloseCallback(tag) {
        this.handleClose(tag, (res) => {
          this.updateForm({ userLabel: res })
        })
      },
      // 删除标签
      handleClose(tag, cb) {
        this.form.userLabel.splice(this.form.userLabel.indexOf(tag), 1)
        if (typeof cb == 'function') {
          cb(this.form.userLabel)
        }
      },



      /** 查询商机信息列表 */
      getList() {
        this.loading = true
        let data = JSON.parse(JSON.stringify(this.queryParams))
        // data.sourceTypeLv = data.sourceTypeLv == '0' ? '' : data.sourceTypeLv
        listOpportunity(data).then(response => {
          this.bankList = response.data.rows
          this.total = response.data.totalRows
          this.loading = false
        })
      },
      //足迹列表
      // getFootprintList(id) {
      //   getOpportunityFootprintList(id).then(response => {
      //     this.footprintList = response.data
      //   })
      // },
      //跟进记录
      // getFollowList(id) {
      //   getFollowRecordList({ id: id }).then(response => {
      //     this.followList = response.data
      //   })
      // },
      //联系人
      // getContacts(id) {
      //   getContactsList({ opportunityId: id }).then(response => {
      //     this.contactsList = response.data
      //   })
      // },
      //获取产品类别列表
      // getProductTypeList(){
      //   getIntermSerpriceList({}).then(res=>{
      //     this.proTypeList = res.data
      //     console.info(res)
      //   })
      // },
      // addContactFun() {
      //   let item = {
      //     'email': '',
      //     'id': null,
      //     'name': '',
      //     'opportunityId': this.form.id,
      //     'phone': '',
      //     'positionName': '',
      //     'qq': '',
      //     'remark': '',
      //     'tel': '',
      //     'vx': ''
      //   }
      //   this.contactsList.push(item)
      // },
      // updateContactFun(data, row) {
      //   data.opportunityId = this.form.id
      //   if (!row.name) {
      //     this.msgError('联系人姓名不能为空')
      //   } else if (!row.id) {
      //     addContact(data).then(res => {
      //       this.msgSuccess('新增联系人成功')
      //       this.getContacts(this.form.id)
      //     })
      //   } else {
      //     data.id = row.id
      //     updateContact(data).then(res => {
      //       this.getContacts(this.form.id)
      //     })
      //   }
      // },
      // delContactFun(row) {
      //   if (row.id) {
      //     this.$confirm('是否确认删除该联系人?', '提示', {
      //       confirmButtonText: '确定',
      //       cancelButtonText: '取消',
      //       type: 'warning'
      //     }).then(function() {
      //       return delContact({ id: row.id })
      //     }).then(() => {
      //       this.getContacts(this.form.id)
      //       this.msgSuccess('删除成功')
      //     }).catch(function() {
      //     })
      //   } else {
      //     this.contactsList.splice(this.contactsList.indexOf(row), 1)
      //   }

      // },
      /** 搜索按钮操作 */
      handleQuery(e) {
        if (e.keyCode != 13) {
          this.showSearch = false
        }
        this.queryParams.pageNo = 1
        this.getList()
      },

      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm('queryForm')
        this.handleQuery()
      },

      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.id)
        // this.single = selection.length !== 1
        // this.multiple = !selection.length
      },

      // 添加选项
      addOption(){
        this.reset()
        this.optionOpen = true
      },

      /** 新增按钮操作 */
      handleAdd() {
        this.reset()
        this.open = true
        // this.dialogVisible = false
        // this.stepIndex = 0
        this.title = '新增商机'
      },

      // handleRowFun(row, column, event) {
      //   console.info(column.property)
      //   if(column.property&&column.property!=undefined&&column.property!='undefined'){
      //     this.reset()
      //     this.getFootprintList(row.id)
      //     this.getFollowList(row.id)
      //     this.getContacts(row.id)//获取联系人
      //     getOpportunity({ id: row.id }).then(response => {
      //       let data = response.data
      //       try {
      //         data.userLabel = data.userLabel ? JSON.parse(data.userLabel) : []
      //         data.district = data.district ? JSON.parse(data.district) : []
      //       } catch (e) {
      //         console.info(e)
      //       }
      //       // this.stepIndex= 0;
      //       this.form = data
      //       this.view = true
      //       this.title = '商机'
      //     });
      //   }
      // },

      /** 新增商机提交按钮 */
      submitForm() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            this.form.id = null
            addOpportunity(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess('新增商机成功')
                this.open = false
                this.getList()
              }
            })
          }
        })
      },
      //修改
      // updateForm(data) {
      //   console.info(arguments)
      //   data.id = this.form.id
      //   console.info(data)
      //   updateOpportunity(data).then(response => {
      //     console.info(response)
      //   })
      // },
      //修改
      // handleAreaChange(value) {
      //   this.form.district = value
      //   let data = {
      //     district: value,
      //     prov: CodeToText[value[0]],
      //     city: CodeToText[value[1]],
      //     county: CodeToText[value[2]]
      //   }
      //   this.form.prov = data.prov
      //   this.form.city = data.city
      //   this.form.county = data.county
      //   this.updateForm(data)
      // },
      // command: function(command) {
      //   //删除商机
      //   if (command == '1') {
      //     const ids = this.form.id
      //     this.$confirm('是否确认删除该商机信息?', '提示', {
      //       confirmButtonText: '确定',
      //       cancelButtonText: '取消',
      //       type: 'warning'
      //     }).then(function() {
      //       return delOpportunity({ id: ids })
      //     }).then(() => {
      //       this.getList()
      //       this.view = false;
      //       this.msgSuccess('删除成功')
      //     }).catch(function() {
      //     })
      //   } else if (command == '2') {
      //     this.transferVisible = true
      //     //移交商机
      //   } else if (command == '3') {
      //     //释放商机
      //     const ids = this.form.id
      //     this.$confirm('是否确定释放该条商机？', '提示', {
      //       confirmButtonText: '确定',
      //       cancelButtonText: '取消',
      //       type: 'warning'
      //     }).then(function() {
      //       return toMareLiberum({ id: ids })
      //     }).then(() => {
      //       this.getList()
      //       this.view = false
      //       this.msgSuccess('释放成功')
      //     }).catch(function() {
      //     })
      //   }
      // },
      //导入
      bulkImport() {
        bulkImportOpportunity().then(reponse => {
          // console.log(response)
        })
      },
      /** 导出按钮操作 */
      handleExport() {
        const queryParams = this.queryParams
        this.$confirm('是否确认导出此商机信息?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function() {
          window.location.href = process.env.VUE_APP_CRM_API + '/hmkj-crm/resoBusinessOpportunity/excelTemplate'
        }).catch(function() {
        })
      },
      // delSwitchFormat(row) {
      //   return this.selectDictLabel(this.delSwitch, row.delSwitch)
      // },
      // businessStatusFormat(row) {
      //   return this.selectDictLabel(this.businessStatus, row.status)
      // },
      // returnStateFormat(row) {
      //   return this.selectDictLabel(this.returnState, row.returnState)
      // },
      // agentStateFormat(row) {
      //   return this.selectDictLabel(this.agentState, row.agentState)
      // },
      // businessFromFormat(row) {
      //   return this.selectDictLabel(this.businessFromList, row.customerSource)
      // },
      // taxTypeFormat(row) {
      //   return this.selectDictLabel(this.vatTypeList, row.taxType)
      // },
      // followTypeFormat(row) {
      //   return this.selectDictLabel(this.followTypeList, row.type)
      // },
      handleRegionChange(value) {
        this.form.district = value
        this.form.prov = CodeToText[value[0]]
        this.form.city = CodeToText[value[1]]
        this.form.county = CodeToText[value[2]]
      },
      // handleClick() {

      // },
      // handleRemove(file, fileList) {
      //   console.log(file, fileList)
      //   delRecordImg({id:file.response.data.id}).then(res=>{
      //     this.followForm.imageIds = fileList.map(item => {
      //       let temp = item.response
      //       console.info(temp)
      //       if (temp.code == 200) {
      //         return temp.data.id
      //       } else {
      //         return undefined
      //       }
      //     }).filter(item => {
      //       return item != undefined
      //     }).join(',')
      //   })

      // },
      // handlePreview(file) {
      //   console.log(file)
      // },
      // previewImg(list) {
      //   return list.map(item => {
      //     return this.filePath + item.url
      //   })
      // },
      // handleExceed(files, fileList) {
      //   this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      // },
      // beforeRemove(file, fileList) {
      //   console.info(arguments)
      //   return this.$confirm(`确定移除 ${file.name}？`)
      // },
      // uploadSuccess(response, file, fileList) {
      //   console.info(arguments)
      //   this.followForm.imageIds = fileList.map(item => {
      //     let temp = item.response
      //     console.info(temp)
      //     if (temp.code == 200) {
      //       return temp.data.id
      //     } else {
      //       return undefined
      //     }
      //   }).filter(item => {
      //     return item != undefined
      //   }).join(',')
      // },
      // addFollow() {
      //   this.addFollowShow = !this.addFollowShow
      //   this.followReset()
      // },
      /** 新增商机提交按钮 */
      // followFormSubmit() {
      //   this.$refs['followForm'].validate(valid => {
      //     if (valid) {
      //       this.followForm.rboId = this.form.id
      //       this.followForm.nextDate = this.followForm.tempDate + ' ' + this.followForm.tempTime
      //       addFollowRecord(this.followForm).then(response => {
      //         if (response.code == 200) {
      //           this.msgSuccess('新增跟进成功')
      //           this.addFollowShow = false
      //           this.getFollowList(this.form.id)
      //           this.followReset()
      //         }
      //       })
      //     }
      //   })
      // }

    }
  }
</script>
<style lang="scss" scoped>
  // 选项卡头部
  .header_btn{
    padding-bottom: 24px;
    border-bottom: 1px solid #E6E7EB;
  }
  .checkboxlist{
    display: flex;
    flex-direction: column;
    .el-checkbox{
      margin-top: 20px;
    }
  }

  .step-vi{
    display: flex;
    height: 70px;
    align-items: center;
    border-bottom: 1px solid #E6E7EB;
    margin-top: -24px;
    margin-bottom: 20px;
    &>*{
      width: 100%;
    }
  }
</style>

<style lang="scss">
  // 去除table  头上的多选框
  .el-table__header-wrapper{
    .el-checkbox__inner{
        display: none;
    }
  }
  .type_item{
    width: 100%;
    height: 92px;
    border: 1px #E6E7EB solid;
    background-color: #F8F9FB;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    transition: all 0.4s;
    overflow: hidden;
    border-radius: 2px;
    cursor: pointer;
    &>span{
      margin: 24px 20px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #565759;
    }
    .el-button{
      transform: translateY(100%);
    }
    &:hover{
      border-color: #B5C8F1;
      background-color: #ECF2FC;
      &>span{
        color: #4977E0;
      }
      .el-button{
        transform: translateY(0);
      }
    }
  }

  .regionOption{
    font-size: 14px;
  }
  .regionOption .el-table__row:last-child td{
    border-bottom: 0px;
  }
  .optionDialog .el-dialog{
    margin-top: 30vh !important;
  }
  .optionDialog .el-dialog .el-dialog__body .el-form{
    margin: 0;
  }
</style>
