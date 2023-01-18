<template>
  <div class="forgotPassword" style="height: 100%;" >
    <div class="steps">
      <el-steps :space="200" :active="active" process-status="wait" >
        <el-step title="验证身份"  ></el-step>
        <el-step title="设置密码" ></el-step>
        <el-step title="完成" ></el-step>
      </el-steps>
    </div>

    <el-form label-position="left" class="login_forgot" ref="form" :rules="rules">
      <el-form-item prop="phoneNumbers" v-if="active == 1">
        <el-input
          v-model="form.phoneNumbers"
          placeholder="请输入手机号码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="companyName" v-if="active == 1">
        <el-input
          v-model="form.companyName"
          placeholder="请输入验证码"
          class="father"
        ></el-input>
        <el-button type="text" class="VerificationCode">获取验证码</el-button>
      </el-form-item>
      <el-form-item prop="phoneNumbers" v-if="active == 2">
        <el-input
          v-model="form.phoneNumbers"
          placeholder="请输入新密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="phoneNumbers" v-if="active == 2">
        <el-input
          v-model="form.phoneNumbers"
          placeholder="请再次输入新密码"
        ></el-input>
      </el-form-item>
      <div class="tips" v-if="active == 1">
        <span>*短信验证码有效时间为5分钟</span>

        <span
          >收不到短信
          <el-popover
            placement="bottom-start"
            title="没有收到短信验证码？"
            width="375px"
            trigger="click"
            class="hah"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
          >
          <div class="text">1. 网络通讯异常可能会造成短信丢失，请重新获取再试；</div>
          <div class="text">2. 请核实手机是否已经欠费停机，或者屏蔽了系统信息；</div>
          <div class="text">3. 您也可以尝试将SIM卡移动至另一部手机，然后重试。</div>
            <span slot="reference">?</span>
          </el-popover>
        </span>
      </div>
      <div v-if="active == 3" class="setSuccessfully">
        <div>
          <img src="../../../assets/image/setSuccessfully.png" alt="" />
        </div>
        <div>
          <div>设置成功</div>
          <div>
            你好，密码修改成功！<el-button type="text">立即登录</el-button>
          </div>
        </div>
      </div>
      <el-button @click="next" class="apply" v-if="active == 1 || active == 2"
        >下一步</el-button
      >
    </el-form>
  </div>
</template>

<script>
/*获取省市区信息*/
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from "element-china-area-data";

export default {
  name: "forgotPassword",
  data() {
    return {
      active: 1,

      form: {
        phoneNumbers: null,
        companyName: "",
        username: "",
        district: ""
      },
      areaOptions: regionData, //区域数据
      rules: {
        phoneNumbers: [
          // { required: true, message: '手机号码不能为空', trigger: 'blur' },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ]
      }
    };
  },

  created() {
    this.resetForm();
  },
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    resetForm() {
      this.$nextTick(() => {
        this.$refs["form"].resetFields();
      });
    },

    //地区
    handleAreaChange(value) {
      this.form.district = value;
      let data = {
        district: value,
        province: CodeToText[value[0]],
        city: CodeToText[value[1]],
        county: CodeToText[value[2]]
      };
      this.form.province = data.province;
      this.form.city = data.city;
      this.form.county = data.county;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.forgotPassword{
body {
  border: 0px solid #fff;
}
.steps {
  padding-top: 100px;
  width: 510px;
  margin: auto;
.el-step__head.is-finish {
 .el-step__icon.is-text{
   background-color:#4977E0;
   color: #fff;
 }
}
.el-step__head.is-wait {
 .el-step__icon.is-text{
   background-color:#E6E7EB;
   color: #fff;
 }
}
  .el-steps {
    display: flex;
    :nth-child(1) {
      flex-basis: 0px !important;
      flex: 7;
    }
    :nth-child(2) {
      flex-basis: 0 !important;
      flex: 7;
    }
    :nth-child(3) {
      flex-basis: 0 !important;
      flex: 1;
    }
    .success {
      background: #4977e0;
      color: #fff;
    }
    .wait {
      background: #e6e7eb;
      color: #fff;
    }

    .el-step__icon.is-text {
      border-radius: 0px;
      border: 1px solid;
      //   background: #4977E0;
      //   color: #fff;
      transform: rotate3d(0, 0, 1, 45deg);
      .el-step__icon-inner {
        transform: rotate3d(0, 0, 1, -45deg);
      }
    }
    .el-step .is-horizontal {
      :nth-child(3) {
        flex-basis: 0px !important;
      }
    }
  }
}
.login_forgot {
  margin: auto;
  padding-top: 200px;
  width: 340px;
  height: 400px;

  .title {
    text-align: center;
    font-size: 20px;
    margin-bottom: 24px;
  }
  .el-form-item--small .el-form-item__label {
    width: 100px;
    height: 42px;
    line-height: 42px;
  }
  .el-input--small .el-input__inner {
    height: 42px;
  }
  .el-input {
    width: 340px;
  }
  .father {
    position: relative;
  }
  .VerificationCode {
    position: absolute;
    top: 10px;
    right: 0px;
    color: #3978e7;
    border-left: 1px solid #eeeeee;
    height: 22px;
    width: 104px;
    font-size: 14px;
    padding: 0px !important;
  }
  .apply {
    width: 340px;
    height: 42px;
    background: #3978e7;
    color: #fff;
    border-radius: 0px !important;
    border: 0px;
    font-size: 14px;
    margin-top: 36px;
  }
  .tips {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #a1a2a6;
padding-top:4px ;
padding-bottom: 4px;
    > :nth-child(2) {
      color: #565759;
      > span {
        display: inline-block;
        width: 14px;
        height: 14px;
        text-align: center;
        margin-left: 8px;
        cursor: pointer;
        border: 1px solid #a1a2a6;
        border-radius: 50%;
        color: #a1a2a6;
      }
    
    }
   
  }
  .setSuccessfully {
    width: 292px;
    display: flex;
    justify-content: space-between;
    > :nth-child(2) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      > :nth-child(1) {
        font-size: 20px;
        font-weight: bold;
        color: #3a3b3d;
      }
      > :nth-child(2) {
        height: 22px;
        font-size: 14px;
        color: #6e7073;
        .el-button {
          font-size: 14px;
        }
      }
    }
  }
}
.el-popover {
  .el-popover__title{
    color: #6E7073;
    font-size: 12px;
    font-weight: bold;
  }
  .text{
    font-size:12px ;
    color: #A1A2A6;
    line-height: 24px;
  }
}
}

</style>
