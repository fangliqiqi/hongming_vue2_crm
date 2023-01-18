<template>
  <div class="edit_contract">
    <el-dialog
      :title="titleName"
      :visible.sync="contractVisible"
      width="704px"
      append-to-body
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :before-close="beforeClose"
    >
      <el-form ref="form" :model="form" :rules="formRules">
        <el-row :gutter="24">
          <el-col :span="12" v-if="!!form.id">
            <el-form-item prop="controlNo" label="合同编号">
              <el-input v-model="form.controlNo" placeholder="请输入合同编号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="签约时间" prop="signingDate">
              <el-date-picker
                v-model="form.signingDate"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择签约时间"
              >
              </el-date-picker>
              <!-- <el-time-picker
                :picker-options="{
                  selectableRange: '18:30:00 - 20:30:00'
                }"
                placeholder="请选择时间"
              >
              </el-time-picker> -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同生效期" prop="validity">
              <el-date-picker
                type="date"
                v-model="form.validity"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择合同生效期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同开始时间" prop="servicePeriodStart">
              <el-date-picker
                type="date"
                v-model="form.servicePeriodStart"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择合同开始时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同停止时间" prop="servicePeriodEnd">
              <el-date-picker
                type="date"
                v-model="form.servicePeriodEnd"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择合同停止时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同金额" prop="money">
              <el-input
                class="yuan"
                v-model="form.money"
                placeholder="请输入合同金额"
              />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="合同编号" prop="controlNo">
              <el-input v-model="form.controlNo" placeholder="请输入合同编号" />
            </el-form-item>
          </el-col> -->
          <!-- <el-col :span="12">
            <el-form-item label="凭证交接" prop="evidenceAssociate">
              <el-select
                v-model="form.evidenceAssociate"
                placeholder="请选择凭证交接"
              >
                <el-option
                  label="请选择凭证交接"
                  v-for="item in handoverMode"
                  :label="item.dictLabel"
                  :value="item.dictCode"
                />
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :span="24">
            <el-form-item label="添加合同附件" prop="imgfileIds">
              <el-upload
                :disabled="xufei"
                class="upload-file"
                ref="contractFile"
                :action="fileUrl"
                :headers="headers"
                :data="{
                  uploadType: '',
                  companyId: order.companyId,
                  busirecordId: orderId,
                }"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :on-success="
                  (res, file, files) =>
                    handleFileSuccess(res, file, files, { id: form.id })
                "
                :before-upload="(file) => beforeFileUpload(file, '')"
                :on-change="fileChange"
                :file-list="fileList"
                list-type="picture"
              >
                <el-button type="primary" plain>点击上传</el-button>
                <!--                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="关联服务项">
              <el-table
                :row-style="{ height: '50px' }"
                :header-cell-style="{ height: '42px' }"
                ref="multipleTable"
                :data="serveList"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
              >
                <!-- <el-table-column
                  type="selection"
                  align="center"
                  :selectable="
                    (row, index) => {
                      return row.contractFlag != 10;
                    }
                  "
                  contractFlag
                  width="48"
                >
                </el-table-column> -->
                <el-table-column
                  type="selection"
                  align="center"
                  :selectable="
                    (row, index) => {
                      return !xufei && row.contractFlag != 10;
                    }
                  "
                  contractFlag
                  width="48"
                >
                </el-table-column>
                <el-table-column label="服务项" width="100" prop="serpriceName">
                </el-table-column>
                <el-table-column
                  label="收费周期"
                  width="90"
                  prop="cycleType"
                  :formatter="
                    (row) => selectDictLabel(feesCycleList, row.cycleType)
                  "
                >
                </el-table-column>
                <el-table-column label="服务时间">
                  <template slot-scope="scope">
                    <div class="flex-row mw100 aic">
                      <el-date-picker
                        type="date"
                        v-model="scope.row.startTime"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择日期"
                        style="max-width: 154px"
                        :clearable="false"
                        :readonly="true"
                        @change="
                          updateDate({
                            id: scope.row.id,
                            startTime: $event,
                            endTime: scope.row.endTime,
                            accountType: scope.row.accountType,
                            isPresented: scope.row.isPresented,
                          })
                        "
                      >
                      </el-date-picker>
                      <span class="spacing ml10 mr10">-</span>
                      <el-date-picker
                        type="date"
                        v-model="scope.row.endTime"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择日期"
                        style="max-width: 154px"
                        :clearable="false"
                        :readonly="true"
                        @change="
                          updateDate({
                            id: scope.row.id,
                            startTime: scope.row.startTime,
                            endTime: $event,
                            accountType: scope.row.accountType,
                            isPresented: scope.row.isPresented,
                          })
                        "
                      >
                      </el-date-picker>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button :disabled="xufei" type="primary" @click="contractSubmit"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 图片放大 -->
    <!-- <el-image-viewer
      style="z-index: 2033"
      v-if="dialogVisible"
      :on-close="closeViewer"
      :url-list="ImageUrlList"
    /> -->
    <!-- 图片放大 -->
    <el-image-viewer
      style="z-index: 2033"
      v-if="dialogVisibles"
      :on-close="closeViewers"
      :url-list="ImageUrlLists"
    />
  </div>
</template>

<script>
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
import { _getSessionStore } from "@/utils/storage";
import { tokenKey } from "@/settings";
import {
  getContract,
  addContract,
  updateContract,
  updateContractAndSerprice,
  getServeList,
  selectContractAndSerpriceByOrderId,
} from "@/api/crm/order";
import { delImgfile } from "@/api/crm/companyImgfile";
export default {
  components: {
    ElImageViewer,
  },
  name: "EditContract",
  props: {
    orderId: {
      type: [String, Number],
      required: true,
      default: null,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    contractId: {
      type: String,
      default: "",
    },
    order: {
      type: Object,
    },
  },
  computed: {
    titleName() {
      if (this.xufei == true) {
        return "预览合同";
      } else {
        return "创建合同";
      }
    },
    contractVisible: {
      get() {
        if (this.visible) {
          this.getData();
        }
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      },
    },
  },
  watch: {
    order: {
      handler(newValue, oldValue) {
        if (newValue.xufei == true) {
          this.xufei = true;
        }
      },
    },
  },
  data() {
    return {
      ImageUrlList: [],
      ImageUrlLists: [],
      xufei: false,
      dialogImageUrl: "",
      dialogVisible: false,
      dialogVisibles: false,
      headers: { Authorization: _getSessionStore(tokenKey) },
      filePath: process.env.VUE_APP_FILE_API,
      fileUrl:
        process.env.VUE_APP_CRM_API + "/hmkj-crm/marketCompbusiImgfile/upload", //附件上传
      feesList: [],
      uploadUrl: process.env.VUE_APP_CRM_API + "/hmkj-crm/crmRecordImg/upload",
      fileList: [],
      feesCycleList: [], //收费周期
      handoverMode: [], //交接方式
      formRules: {
        signingDate: [
          {
            required: true,
            message: "签约时间不能为空",
            trigger: "blur",
          },
        ],
        validity: [
          {
            required: true,
            message: "合同生效期不能为空",
            trigger: "blur",
          },
        ],
        servicePeriodEnd: [
          {
            required: true,
            message: "合同停止时间不能为空",
            trigger: "blur",
          },
        ],
        money: [
          {
            required: true,
            message: "合同金额不能为空",
            trigger: "blur",
          },
        ],
        controlNo: [
          {
            required: true,
            message: "合同编号不能为空",
            trigger: "blur",
          },
        ],
        evidenceAssociate: [
          {
            required: true,
            message: "凭证交接不能为空",
            trigger: "blur",
          },
        ],
      },
      form: {},
      serveList: [],
      ids: [],
    };
  },
  created() {
    this.getDicts("fees_cycle").then((res) => {
      this.feesCycleList = res.data;
    });
    this.getDicts("handover_mode").then((res) => {
      this.handoverMode = res.data;
    });
  },
  methods: {
    closeViewer() {
      this.dialogVisible = false;
    },
    closeViewers() {
      this.dialogVisibles = false;
    },
    //上传图片放大
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      console.log(this.dialogImageUrl);
      this.ImageUrlLists = [this.dialogImageUrl];
      this.dialogVisibles = true;
    },
    getData() {
      let id = this.orderId;
      let cid = this.contractId;
      if (this.xufei) {
        if (cid) {
          getContract({ id: cid }).then((res) => {
            let data = res.data;
            try {
              this.fileList = data.marketCompbusiImgfileResults.map((item) => {
                return {
                  url: this.filePath + item.url,
                  name: item.name + "." + item.type,
                  id: item.id,
                };
              });
              let serveIds = data.marketBusirSerprices.map((item) => {
                return item.id;
              });
              this.serveList = data.marketBusirSerprices || [];
              this.serveList.forEach((item) => {
                if (serveIds.indexOf(item.id) != -1) {
                  this.$refs.multipleTable.toggleRowSelection(item);
                }
              });
              this.form = data;
            } catch (e) {
              this.reset();
            }
          });
        }
      } else {
        selectContractAndSerpriceByOrderId({ id: id }).then((resp) => {
          this.serveList = resp.data || [];
          console.log(this.serveList);
          var data = {
            startTime: "",
            endTime: "",
          };
          this.serveList.map((item) => {
            if (item.accountType == "20" && item.isPresented == "20") {
              data.startTime = item.startTime;
              data.endTime = item.endTime;
            }
          });
          if (cid) {
            getContract({ id: cid }).then((res) => {
              let data = res.data;
              try {
                this.fileList = data.marketCompbusiImgfileResults.map(
                  (item) => {
                    return {
                      url: this.filePath + item.url,
                      name: item.name + "." + item.type,
                      id: item.id,
                    };
                  }
                );

                let serveIds = data.marketBusirSerprices.map((item) => {
                  return item.id;
                });

                this.serveList.forEach((item) => {
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
          if (data.startTime && data.endTime) {
            this.form.servicePeriodStart = data.startTime;
            this.form.servicePeriodEnd = data.endTime;
          }
        });
      }
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        compayBusirId: this.orderId,
        controlNo: null, //合同编号
        busirSerpriceIds: null, //服务项目的id (多个)
        companyId: this.order.companyId, //公司id
        money: null, //合同金额
        signingDate: null, //签约时间
        validity: null, //合同生效期
        evidenceAssociate: null, //凭证交接: (10 邮寄, 20自取)
        imgfileIds: "",
      };
      this.resetForm("form");
      try {
        this.$refs.contractFile.clearFiles();
      } catch (e) {}
    },
    cancel() {
      this.reset();
      this.contractVisible = false;
    },
    beforeClose(done) {
      done();
    },
    // 新增合同提交按钮
    contractSubmit() {
      this.form.busirSerpriceIds = this.ids.join(",");
      this.$refs["form"].validate((valid) => {
        if (valid && this.ids.length > 0) {
          if (this.form.id) {
            let data = {
              id: this.contractId,
              compayBusirId: this.orderId,
              controlNo: this.form.controlNo, //合同编号
              busirSerpriceIds: this.form.busirSerpriceIds, //服务项目的id (多个)
              companyId: this.order.companyId, //公司id
              money: this.form.money, //合同金额
              signingDate: this.form.signingDate, //签约时间
              validity: this.form.validity, //合同生效期
              evidenceAssociate: this.form.evidenceAssociate, //凭证交接: (10 邮寄, 20自取)
              imgfileIds: this.form.imgfileIds,
              controlNo: this.form.controlNo, //合同编号
            };
            updateContract(data).then((response) => {
              if (response.code === 200) {
                this.msgSuccess("修改合同成功");
                this.contractVisible = false;
                // this.contractId =
              }
            });
          } else {
            if (this.ids.length == 0) {
              this.msgError("请选择服务项目");
            } else if (!this.form.imgfileIds) {
              this.msgError("请添加合同附件");
            } else {
              addContract(this.form).then((response) => {
                if (response.code === 200) {
                  this.msgSuccess("新增合同成功");
                  this.contractVisible = false;
                }
              });
            }
          }
        }
      });
    },
    handleFileSuccess(res, file, files, data) {
      this.ImageUrlList = files.map((ite) => {
        return ite.url;
      });
      console.log(this.ImageUrlList);
      //附件上传成功
      this.form.imgfileIds = files
        .map((item) => {
          if (item.id) {
            return item.id;
          } else if (item.response && item.response.code == 200) {
            return item.response.data.id;
          } else {
            return undefined;
          }
        })
        .filter((item) => {
          return item != undefined;
        })
        .join(",");
    },
    fileChange(file, fileList) {},
    beforeFileUpload(file) {
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
    handleRemove(file, files) {
      this.form.imgfileIds = files
        .map((item) => {
          if (item.id) {
            return item.id;
          } else if (item.response && item.response.code == 200) {
            return item.response.data.id;
          } else {
            return undefined;
          }
        })
        .filter((item) => {
          return item != undefined;
        })
        .join(",");
      delImgfile({ id: file.id }).then((res) => {
        this.msgSuccess("图片删除成功");
      });
    },

    //图片预览
    handlePreview(file) {},

    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },

    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`, "提示");
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    updateDate(data) {
      updateContractAndSerprice(data).then((res) => {});
    },
  },
};
</script>
<style lang="scss" scoped>
.bfh::after {
  content: "%";
  position: absolute;
  right: 12px;
  top: 3px;
}
.yuanc::after {
  content: "元/次";
  position: absolute;
  right: 12px;
  top: 2px;
}
.detail_vi {
  .title_vi {
    & > span {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #303133;
    }
  }
}

.step-vi {
  display: flex;
  height: 70px;
  align-items: center;
  border-bottom: 1px solid #e6e7eb;
  margin-top: -14px;
  margin-bottom: 20px;
  & > * {
    width: 100%;
  }
}
</style>
