<template>
  <el-dialog
    :title="titleName"
    width="704px"
    :visible.sync="expendVisible"
    custom-class="order_dialog"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="beforeClose"
  >
    <div class="step_vi">
      <steper
        :step-list="[{ name: '提交申请' }, { name: '出纳确认' }]"
        :active="
          form.specialApprovalsType == 10
            ? 1
            : form.specialApprovalsType == 20 || form.specialApprovalsType == 30
            ? 2
            : 0
        "
      ></steper>
    </div>
    <div class="maxh mt20">
      <div class="bgfff  expend_vi">
        <el-form class="mag0" ref="expendForm" :rules="rules" :model="form">
          <el-row :gutter="24">
            <el-col :span="12" v-if="!!form.id">
              <el-form-item label="支出编号">
                <el-input
                  v-model="form.expendNumber"
                  type="text"
                  placeholder="请输入支出编号"
                ></el-input>
              </el-form-item>
            </el-col>
            <!--            <el-col :span="12">-->
            <!--              <el-form-item label="支出状态">-->
            <!--                <el-date-picker-->
            <!--                  v-model="form.advanceTime"-->
            <!--                  type="datetime"-->
            <!--                  placeholder="请选择支付时间">-->
            <!--                </el-date-picker>-->
            <!--              </el-form-item>-->
            <!--            </el-col>-->
            <el-col :span="12">
              <el-form-item label="支出类型">
                <el-select v-model="form.expendName" @change="expendChange(form.expendName)">
                  <el-option
                    v-for="item in expenditureList"
                    :label="item.accountName"
                    :value="item.accountName"
                    :key="item.sort"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="支出时间">
                <el-date-picker
                  v-model="form.paymentTime"
                  type="date"
                  placeholder="请选择支出时间"
                   value-format="yyyy-MM-dd"
                >
                </el-date-picker>
                <!-- <el-input type="text" placeholder="请输入支出时间" v-model="form.paymentTime"></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="付款人户名">
                <el-input
                  type="text"
                  placeholder="请输入付款人姓名"
                  v-model="form.payee"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="付款账号">
                <el-input
                  type="text"
                  placeholder="请输入付款账户"
                  v-model="form.payeeAccount"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="开户银行">
                <el-input
                  type="text"
                  placeholder="请输入收款账户"
                  v-model="form.bank"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注">
                <el-input
                  type="textarea"
                  placeholder="请输入备注信息"
                  class="minh98"
                  v-model="form.remarks"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="上传附件">
            <el-upload
              class="upload-file"
              ref="fileUpload"
              :action="fileUrl"
              :headers="headers"
              :data="{
                uploadType: '',
                companyId: order.companyId,
                busirecordId: orderId
              }"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :on-success="
                (res, file, files) =>
                  handleFileSuccess(res, file, files, { id: form.id })
              "
              :before-upload="file => beforeFileUpload(file, '')"
              :on-change="fileChange"
              :file-list="fileList"
              list-type="picture"
            >
              <el-button size="small" icon="el-icon-upload2"
                >上传附件</el-button
              >
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <div class="bgfff mt20 flex-col">
        <div class="title_vi">
          <div>
            <i class="el-icon-tickets fs-18"></i>
            <span class="title">{{ form.orderNo }}</span>
          </div>
          <el-button type="primary" plain @click="orderServeShow = true"
            >更换关联项目</el-button
          >
        </div>
        <el-table :data="tabledata" class="mb24">
          <el-table-column label="服务项" prop="serpriceName"></el-table-column>
          <el-table-column label="金额" prop="moneyReceived"></el-table-column>
          <el-table-column
            label="已支出 (元)"
            prop="expendTotalMoney"
          ></el-table-column>
          <el-table-column label="本次支出 (元)">
            <template slot-scope="scope">
              <el-input v-model="form.expendMoney"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="dialog-footer">
      <el-button @click="expendVisible = false">取消</el-button>
      <el-button
        type="primary"
        @click="approvalSubmit"
        v-if="!(form.orderType == 10 || form.orderType == 20)"
        >确认发起
      </el-button>
    </div>
    <el-dialog
      title="订单项目"
      width="704px"
      :visible.sync="orderServeShow"
      custom-class="order_dialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      append-to-body
    >
      <el-row class="bgfff">
        <el-col>
          <el-table :data="serveList" @current-change="clickChange">
            <el-table-column align="center" width="48">
              <template slot-scope="scope">
                <el-radio v-model="tableRadio" :label="scope.row"
                  ><i></i
                ></el-radio>
              </template>
            </el-table-column>
            <el-table-column label="项目编号" prop="id"></el-table-column>
            <el-table-column
              label="服务项目"
              prop="serpriceName"
            ></el-table-column>
            <el-table-column label="赠送">
              <template slot-scope="scope">
                {{ scope.row.isPresented == 10 ? "赠送项目" : "--" }}
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div class="dialog-footer">
        <el-button @click="orderServeShow = false">取消</el-button>
        <el-button
          type="primary"
          @click="serveSubmit"
          v-if="!(form.orderType == 10 || form.orderType == 20)"
          >确认发起
        </el-button>
      </div>
    </el-dialog>
    <!-- 图片放大 -->
    <el-image-viewer
      style="z-index:2033;"
      v-if="dialogVisible"
      :on-close="closeViewer"
      :url-list="ImageUrlList"
    />
  </el-dialog>
</template>

<script>
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
import {
  getExpenditure,
  expenditureAdd,
  expenditureUpdate,
  getSerpriceExpendByOrderId,
  getByOrderId
} from "@/api/crm/order";
import { _getSessionStore } from "@/utils/storage";
import { tokenKey } from "@/settings";
import { throttle } from "@/utils/hmt";

export default {
  components: {
    ElImageViewer
  },
  name: "EditExpend",
  props: {
    orderId: {
      type: String,
      required: true,
      default: ""
    },
    visible: {
      type: Boolean,
      default: false
    },
    expendId: {
      type: String,
      default: ""
    },
    order: {
      type: Object
    }
  },
  computed: {
    titleName() {
      return this.form.controlNo || "创建支出";
    },
    expendVisible: {
      get() {
        if (this.visible) {
          this.getData();
        }
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      }
    }
  },
  data() {
    return {
      ImageUrlList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      headers: { Authorization: _getSessionStore(tokenKey) },
      filePath: process.env.VUE_APP_FILE_API,
      fileUrl:
        process.env.VUE_APP_CRM_API + "/hmkj-crm/marketCompbusiImgfile/upload", //附件上传
      feesList: [],
      uploadUrl: process.env.VUE_APP_CRM_API + "/hmkj-crm/crmRecordImg/upload",
      fileList: [],
      rules: {},
      form: {},
      serveList: [],
      ids: [],
      tableRadio: {},
      expenditureList: [],
      tabledata: [],
      orderServeShow: false
    };
  },
  created() {

  },
  methods: {
    closeViewer() {
      this.dialogVisible = false;
    },
    //上传图片放大
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    getData() {
      let id = this.orderId;
      let eid = this.expendId;
      if (id) {
        this.tabledata = [];
        getSerpriceExpendByOrderId({ id: id }).then(resp => {
          this.serveList = resp.data || [];
          if (eid) {
            getByOrderId({ id: eid }).then(res => {
              // console.info(res);
              let data = res.data;
              try {
                this.fileList = data.marketCompbusiImgfileResults.map(item => {
                  return {
                    url: this.filePath + item.url,
                    name: item.name + "." + item.type,
                    id: item.id
                  };
                });
                let serveIds = data.marketBusirSerprices.map(item => {
                  return item.id;
                });
                // console.info(serveIds);
                // console.info(this.serveList);
                this.serveList.forEach(item => {
                  // console.info(item);
                  if (serveIds.indexOf(item.id) != -1) {
                    this.$refs.multipleTable.toggleRowSelection(item);
                  }
                });
                this.form = data;
              } catch (e) {
                this.reset();
              }
            });
          } else {
            this.reset();
          }
        });
      }
      getExpenditure({}).then(res => {
      this.expenditureList = res.data;
    });
    },
    beforeClose(done) {
      this.reset();
      done();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        busirId: this.orderId,
        bank: "", //开户行
        companyId: this.order.companyId || "",
        expendName: "", //支出的类型(支出产品的名称)
        expendNumber: "", //支出编号
        fileId: "", //附件id 可以使用逗号拼接(1,2,3,4)
        payee: "", //付款人名称
        payeeAccount: "", //付款账号
        remarks: "", //备注
        busirSerpriceId: "", //服务项
        serpriceName: "", //服务产品名称
        serpricePrice: "", //服务产品的价格
        expendMoney: "" //支出金额
      };
      this.resetForm("expendForm");
      try {
        this.$refs.fileUpload.clearFiles();
      } catch (e) {
        // console.log(e);
      }
    },
    handleFileSuccess(res, file, files, data) {
      this.ImageUrlList = files.map(ite => {
        return ite.url;
      });
      //附件上传成功
      // console.info(res, file, files);
      this.form.fileId = files
        .map(item => {
          if (item.id) {
            return item.id;
          } else if (item.response && item.response.code == 200) {
            return item.response.data.id;
          } else {
            return undefined;
          }
        })
        .filter(item => {
          return item != undefined;
        })
        .join(",");
    },
    fileChange(file, fileList) {
      // console.info(file, fileList);
    },
    fileUpload() {
      // console.info(arguments);
      // console.info("fileUpload");
    },
    beforeFileUpload(file) {
      // console.info(file.type);
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG、PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //图片删除
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      delImgfile({ id: file.id }).then(res => {
        this.msgSuccess("图片删除成功");
      });
    },
    //图片预览
    handlePreview(file) {
      // console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      // console.log(file, fileList);
      if (!file.id) {
        return true;
      } else {
        return this.$confirm(`确定移除 ${file.name}？`, "提示");
      }
    },
    expendChange(val){
       this.expenditureList.forEach(item=>{
        if(item.accountName  == val){
          this.form.accountCode = item.sort
        }
      })
    },
    approvalSubmit: throttle(function() {
      let form = JSON.parse(JSON.stringify(this.form));
      this.$refs["expendForm"].validate(valid => {
        if (valid) {
          if (form.busirSerpriceId) {
            if (form.id) {
              expenditureUpdate(form)
                .then(res => {
                  this.expendVisible = false;
                  this.msgSuccess("提交成功");
                })
                .catch(err => {
                  this.msgError("提交失败");
                });
            } else {
              expenditureAdd(form)
                .then(res => {
                  this.expendVisible = false;
                  this.msgSuccess("修改成功");
                })
                .catch(err => {
                  this.msgError("修改失败");
                });
            }
          } else {
            this.msgError("请选择关联项目");
          }
        }
      });
    }),
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    clickChange(item) {
      this.tableRadio = item;
    },
    serveSubmit: throttle(function() {
      let tableRadio = this.tableRadio;
      let temp = [];
      if (tableRadio) {
        this.form.busirSerpriceId = tableRadio.id;
        this.form.serpricePrice = tableRadio.moneyReceived;
        this.form.serpriceName = tableRadio.serpriceName;
        temp.push(tableRadio);
      } else {
        this.form.busirSerpriceId = "";
        this.form.serpricePrice = "";
        this.form.serpriceName = "";
      }
      this.tabledata = temp;
      this.orderServeShow = false;
    })
  }
};
</script>

<style scoped>
.expend_vi {
  padding: 24px 32px 12px 32px;
}
</style>
