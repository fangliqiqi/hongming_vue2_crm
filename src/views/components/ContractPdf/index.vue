<template>
  <div class="contract_pdf_vi">
    <el-dialog
      width="800pt"
      title="创建PDF合同"
      :visible.sync="contractVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :before-close="closeHt"
    >
      <div class="contract_pdf">
        <div class="bt_vi">
          <el-button
            v-if="isXuFei == '修改电子合同' || isXuFei == '新增电子合同'"
            @click="submit"
            >确认</el-button
          >
          <!-- <el-button v-if="isXuFei" @click="deleteHt">删除</el-button> -->
          <el-button v-else @click="downloadFun">保存</el-button>
          <!--              <el-button @click="signFun">签名</el-button>-->
          <!--              <el-button @click="clearSignFun">清空签名</el-button>-->
          <!--              <el-button @click="printFun">打印</el-button>-->
        </div>
        <div class="html2img_vi">
          <div ref="html_dom" id="html_dom" class="html2img">
            <contract001 ref="contractPdf1" @close="closePdf">
              <img
                v-if="signInfo"
                :src="signInfo"
                style="width: 160px"
                slot="jia"
              />
            </contract001>
          </div>
        </div>
      </div>
    </el-dialog>
    <autograph
      :visible.sync="signShow"
      @signInfo="signInfoFun"
      :signInfo.sync="signInfo"
    ></autograph>
  </div>
</template>

<script>
import html2Canvas from "html2canvas";
import JsPDF from "jspdf";
import Autograph from "@/components/Autograph";
import contract001 from "./contract/contract001";
import request from "@/utils/request";
import { throttle } from "@/utils/hmt";
export default {
  props: {
    orderId: {
      type: [String, Number],
      default: null,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    isXuFei: {
      type: String,
      default: "",
    },
    renewForm: {
      type: Object,
      default: () => {},
    },
  },
  name: "Html2Pdf",
  components: {
    Autograph,
    contract001,
  },
  data() {
    return {
      signShow: false,
      signInfo: "",
      posterSrc: null,
      checked: false,
      CheckQdsf: false,
      pdfForm: {},
    };
  },
  computed: {
    contractVisible: {
      get() {
        if (this.visible) {
          this.initData();
        }
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      },
    },
  },
  mounted() {
    var that = this;
    this.$nextTick(function () {
      that.html2ImgFun().then((pageData) => {
        that.posterSrc = pageData.data;
      });
    });
  },
  methods: {
    //删除合同
    deleteHt() {},
    //关闭电子合同
    closeHt() {
      console.log(111111111);
      this.contractVisible = false;
      sessionStorage.removeItem("needData");
      sessionStorage.removeItem("labels");
    },
    initData() {
      var that = this;
      console.log(that.isXuFei);
      this.$nextTick(function () {
        if (that.isXuFei == "新增电子合同") {
          that.$refs["contractPdf1"].getInfoXuFei(that.orderId, that.renewForm);
        } else if (that.isXuFei == "修改电子合同") {
          that.$refs["contractPdf1"].updateXuFei(that.orderId, that.renewForm);
        } else {
          that.$refs["contractPdf1"].getInfo(that.orderId);
        }
      });
    },
    // 后台包信息不全 关闭pdf
    closePdf(data) {
      let that = this;
      if (data == "10") {
        setTimeout(function () {
          that.contractVisible = false;
        }, 1000);
      }
    },
    signFun: function () {
      this.signShow = true;
    },
    signInfoFun(val) {
      var that = this;
      this.signInfo = val;
      this.$nextTick(function () {
        that.html2ImgFun().then((pageData) => {
          that.posterSrc = pageData.data;
        });
      });
    },
    clearSignFun() {
      var that = this;
      this.signInfo = "";
      this.$nextTick(function () {
        that.html2ImgFun().then((pageData) => {
          that.posterSrc = pageData.data;
        });
      });
    },
    html2ImgFun(title, selid) {
      return new Promise((resolve, reject) => {
        var title = title ? title : "合同";
        var sel = selid ? selid : "#html_dom";
        var cntElem = document.querySelector(sel);
        var shareContent = cntElem;
        var width = shareContent.offsetWidth; //获取dom 宽度
        var height = shareContent.offsetHeight; //获取dom 高度
        var canvas = document.createElement("canvas"); //创建一个canvas节点
        var scale = 2; //定义任意放大倍数 支持小数
        canvas.width = width * scale; //定义canvas 宽度 * 缩放，在此我是把canvas放大了2倍
        canvas.height = height * scale; //定义canvas高度 *缩放
        canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
        html2Canvas(document.querySelector(sel), {
          allowTaint: true,
          taintTest: true,
          canvas: canvas,
        })
          .then((res) => {
            var contentWidth = res.width;
            var contentHeight = res.height;
            var imgWidth = 595.28;
            var imgHeight = (592.28 / contentWidth) * contentHeight;
            var pageData = res.toDataURL("image/jpeg", 1.0);
            resolve({ data: pageData, width: imgWidth, height: imgHeight });
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    //确认
    submit: throttle(function () {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$refs["contractPdf1"].submintInfo(this.orderId).then((res) => {
        if (this.renewForm.projectParam.startTime) {
          res.servicePeriodStart = this.renewForm.projectParam.startTime;
        }
        console.log(res);
        var needData = {
          companyPhone: res.companyPhone,
          companyUserName: res.companyUserName,
          companyAdds: res.companyAdds,
          check: res.check,
        };
        sessionStorage.setItem("needData", JSON.stringify(needData));
        this.renewForm.legalPerson.mobile = res.companyPhone || "";
        this.renewForm.legalPerson.name = res.companyUserName || "";
        this.renewForm.address = res.companyAdds || "";
        this.renewForm.legalPerson.id = res.legalId || "";
        if (this.renewForm.projectParam.giftStartTime) {
          res.servicePeriodEnd = this.renewForm.projectParam.giftStartTime;
        }
        if (res.companyPhone == "") {
          this.$message.error("请输入联系方式");
          if (loading) {
            loading.close();
          }
        } else if (res.companyUserName == "") {
          this.$message.error("请输入法定代表人");
          if (loading) {
            loading.close();
          }
        } else if (res.lableId && !res.lableZiId) {
          this.$message.error("请选择企业性质");
          if (loading) {
            loading.close();
          }
        } else {
          this.downloadPdfHt({ data: res }, loading);
        }
      });
    }, 5000),
    downloadFun: throttle(function () {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$refs["contractPdf1"].submintInfo(this.orderId).then((res) => {
        // if (this.renewForm.projectParam.startTime) {
        //   res.servicePeriodStart = this.renewForm.projectParam.startTime;
        // }
        // if (this.renewForm.projectParam.giftStartTime) {
        //   res.servicePeriodEnd = this.renewForm.projectParam.giftStartTime;
        // }

        if (res.companyPhone == "") {
          this.$message.error("请输入联系方式");
          if (loading) {
            loading.close();
          }
        } else if (res.companyUserName == "") {
          this.$message.error("请输入法定代表人");
          if (loading) {
            loading.close();
          }
        } else if (res.lableId && !res.lableZiId) {
          this.$message.error("请选择企业性质");
          if (loading) {
            loading.close();
          }
        } else {
          this.downloadPdf({ data: res }, loading);
        }
      });
    }, 5000),

    downloadPdf({ title, selid, data }, loading) {
      // console.info("下载");
      this.html2ImgFun(title, selid)
        .then((opt) => {
          // console.log('hahahah')
          var pageHeight = (opt.width / 592.28) * 841.89;
          var leftHeight = opt.height;
          var position = 0;
          var PDF = new JsPDF("", "pt", "a4");
          if (leftHeight < pageHeight) {
            PDF.addImage(opt.data, "JPEG", 0, 0, opt.width, opt.height);
          } else {
            while (leftHeight > 0) {
              PDF.addImage(
                opt.data,
                "JPEG",
                0,
                position,
                opt.width,
                opt.height
              );
              leftHeight -= pageHeight;
              position -= 841.89;
              if (leftHeight > 0) {
                PDF.addPage();
              }
            }
          }
          if (true) {
            var buffer = PDF.output("datauristring");
            // console.info(this);
            var fm = new FormData();
            fm.append("file", this.dataURLtoFile(buffer, "合同.pdf"));
            // fm.append("data",data);
            Object.keys(data).forEach((key) => {
              fm.append(key, data[key]);
            });
            // console.log(fm)
            request({
              method: "post",
              type: "multipart/form-data",
              url: "/hmkj-crm/electronicContract/uploadHt",
              data: fm,
            })
              .then((res) => {
                // PDF.save(title + ".pdf");
                this.contractVisible = false;
                this.$emit("close", 10);
                this.$message.success("保存成功");
                this.signShow = false;
              })
              .catch((err) => {
                this.$message({
                  msg: err,
                });
              });
          } else {
            PDF.save(title + ".pdf");
          }
        })
        .catch((error) => {
          // console.info(error);
        })
        .finally(() => {
          if (loading) {
            loading.close();
          }
        });
    },
    downloadPdfHt({ title, selid, data }, loading) {
      // console.info("下载");
      this.html2ImgFun(title, selid)
        .then((opt) => {
          // console.log('hahahah')
          var pageHeight = (opt.width / 592.28) * 841.89;
          var leftHeight = opt.height;
          var position = 0;
          var PDF = new JsPDF("", "pt", "a4");
          if (leftHeight < pageHeight) {
            PDF.addImage(opt.data, "JPEG", 0, 0, opt.width, opt.height);
          } else {
            while (leftHeight > 0) {
              PDF.addImage(
                opt.data,
                "JPEG",
                0,
                position,
                opt.width,
                opt.height
              );
              leftHeight -= pageHeight;
              position -= 841.89;
              if (leftHeight > 0) {
                PDF.addPage();
              }
            }
          }
          if (true) {
            var buffer = PDF.output("datauristring");
            // console.info(this);
            var fm = new FormData();
            this.$emit("func", buffer);
            this.contractVisible = false;
            this.$emit("close", 10);
            this.signShow = false;
          } else {
            PDF.save(title + ".pdf");
          }
        })
        .catch((error) => {
          // console.info(error);
        })
        .finally(() => {
          if (loading) {
            loading.close();
          }
        });
    },
    printFun() {
      let obj = document.getElementById("html_dom");
      var docStr = obj.innerHTML;
      var newWindow = window.open("打印窗口", "_blank");
      newWindow.document.write(docStr);
      newWindow.document.close();
      newWindow.print();
      newWindow.close();
    },
  },
};
</script>

<style lang="scss" scoped>
@media print {
  body {
    font-size: 18px;
  }
  .nihao {
    color: red;
  }
}
.contract_pdf_vi {
  display: flex;
  flex-direction: column;
  align-items: center;
  .bt_vi {
    max-width: 100%;
    width: 100%;
    padding: 24px;
    display: flex;
    justify-content: flex-end;
  }
  .html2img {
    border: 1px #eee solid;
    .el-input {
      .el-input__inner {
        border: 0;
        border-bottom: 1px #000000 solid;
        height: 12pt;
      }
    }
  }
  .html2img_vi {
    max-width: 100%;
    width: 100%;
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .html2img {
      max-width: 100%;
    }
  }
}
</style>
