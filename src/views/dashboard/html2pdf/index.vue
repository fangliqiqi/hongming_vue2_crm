<template>
  <div class="html2pdf_vi">
    <div>
      <div class="bt_vi">
        <el-button @click="downloadFun">保存下载</el-button>
        <el-button @click="signFun">签名</el-button>
        <el-button @click="clearSignFun">清空签名</el-button>
        <!-- <el-button @click="printFun">打印</el-button> -->
      </div>
      <div class="html2img_vi">
        <!--          <el-image v-if="posterSrc" :src="posterSrc" class="html2img" ></el-image>-->
        <!-- <div class="html2img_vi"> -->
<!--          <el-image v-if="posterSrc" :src="posterSrc" class="html2img" ></el-image>-->
          <!-- <div ref="html_dom" id="html_dom" class="html2img" > -->
            <!-- <contract002>
              <img v-if="signInfo" :src="signInfo" style="width: 200px;" slot="jia"/>
            </contract002> -->
            <!--          <div style="display: flex;flex-direction:column;align-items: center;">-->
            <!--            <title>莫的问题·服务合同</title>-->
            <!--            <img v-if="signInfo" :src="signInfo" style="width: 100px;"/>-->
            <!--          </div>-->
          <!-- </div> -->
        <!-- </div> -->
        <iframe style="height:100vh;width: 100%;" src="https://www.hmtcrm.com/profile/crm/contract/2021-05-14/HM-CS202105140004/2021/05/14/141c8a04-6e6b-4b7c-bd94-009a6ef528ea.pdf"></iframe>
      </div>
    </div>
    <!--      <div style="position: relative;top: 100%;left: 100%;">-->
    <!--        <div ref="html_dom" id="html_dom" class="html_dom" style="width: 592.28pt;background: #FFFFFF;min-height: 841.89pt;">-->
    <!--          <contract001>-->
    <!--            <img v-if="signInfo" :src="signInfo" style="width: 200px;"/>-->
    <!--          </contract001>-->
    <!--        </div>-->
    <!--      </div>-->
    <autograph
      :visible.sync="signShow"
      @signInfo="signInfoFun"
      :signInfo.sync="signInfo"
    ></autograph>
  </div>
</template>

<script>
  import html2Canvas from 'html2canvas'
  import JsPDF from 'jspdf'
  import Autograph from '@/components/Autograph'
  import contract001 from '../contract/contract001'
  import contract002 from '../contract/contract002'
  export default {
    name: 'Html2Pdf',
    components:{
      Autograph,
      contract001,
      contract002
  },
  data() {
    return {
      signShow: false,
      signInfo: "",
      posterSrc: null,
      checked:false,
      CheckQdsf:false,
    };
  },
  computed: {},
  mounted() {
    var that = this;
    this.$nextTick(function () {
      that.html2ImgFun().then((pageData) => {
        that.posterSrc = pageData.data;
      });
    });
    $("img").load(function () {
      // 加载完成之后执行某方法
    });
  },
  methods: {

    

    signFun: function () {
      this.signShow = true;
    },
    signInfoFun(val) {
      var that = this;
      this.signInfo = val;
      this.$nextTick(function () {
        that.html2ImgFun().then((pageData) => {
          // console.info(pageData);
          that.posterSrc = pageData.data;
        });
      });
    },
    clearSignFun() {
      var that = this;
      this.signInfo = "";
      this.$nextTick(function () {
        that.html2ImgFun().then((pageData) => {
          // console.info(pageData);
          that.posterSrc = pageData.data;
        });
      });
    },
    html2ImgFun(title, selid) {
      return new Promise((resolve, reject) => {
        var title = title ? title : "合同";
        var sel = selid ? selid : "#html_dom";
        html2Canvas(document.querySelector(sel), {
          allowTaint: true,
        })
          .then((canvas) => {
            // console.info(canvas);

            var contentWidth = canvas.width;
            var contentHeight = canvas.height;

            var imgWidth = 595.28;
            var imgHeight = (592.28 / contentWidth) * contentHeight;
            var pageData = canvas.toDataURL("image/jpeg", 1.0);

            resolve({ data: pageData, width: imgWidth, height: imgHeight });
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    downloadFun(title="合同", selid) {
      // console.info("下载");
      this.html2ImgFun(title, selid)
        .then((opt) => {
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

          if (false) {
            var buffer = PDF.output("datauristring");
            // console.info(this);
            this.upload({
              url: "/hmkj-crm/marketCompbusiImgfile/fileUpload",
              file: this.dataURLtoFile(buffer, title+".pdf"),
            })
              .then((res) => {
                // console.info(res);
                PDF.save(title + ".pdf");
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
        });
    },
    printFun() {
      this.bindData();

      let obj = document.getElementById("html_dom");
      // window.print()

      var docStr = obj.innerHTML;
      // console.log(docStr);
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
.html2pdf_vi {
  display: flex;
  flex-direction: column;
  align-items: center;
  .bt_vi {
    max-width: 100%;
    width: 100%;
    padding: 24px;
    display: flex;
    justify-content: center;
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
    height: 100%;
    .html2img {
      max-width: 100%;
    }
  }
}
</style>
