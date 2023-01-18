<template>
  <div  style="height: 100%;">
    <el-form label-position="left" class="login_apply" ref="form" :rules="rules">
        <div class="title">账号申请</div>
      <el-form-item label="手机号码" prop="phoneNumbers">
        <el-input v-model="form.phoneNumbers" placeholder="请输入手机号码"></el-input>
      </el-form-item>
      <el-form-item label="公司名称" prop="companyName">
        <el-input v-model="form.companyName"  placeholder="请输入公司名称"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="username">
        <el-input v-model="form.username" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="公司所在地" prop="district">
        <el-cascader
                        placeholder="请选择公司所在省市区"
                        class="mw222"
                        size="small"  
                        :options="areaOptions"
                        v-model="form.district"
                        @change="handleAreaChange"
                      >
                      </el-cascader>
      </el-form-item>
     <el-button :class="form.phoneNumbers== null || form.companyName =='' || form.username=='' || form.district==''?'applyStop':'apply'" >申请</el-button>
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
  name: "applyAccount",
  data() {
    return {
      form: {
        phoneNumbers:null,
        companyName:'' ,
        username:'', 
        district:'',
      },
      areaOptions: regionData,//区域数据
      rules:{
        phoneNumbers: [
            // { required: true, message: '手机号码不能为空', trigger: 'blur' },
            {
              pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
              message: '请输入正确的手机号码',
              trigger: 'blur'
            }
          ],
      },

    };
  },

  created() {
    this.resetForm()
  },
  methods: {
 
 resetForm(){
    this.$nextTick(()=>{
        this.$refs['form'].resetFields();
      })
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
    },
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
body{
  border: 0px solid #fff;
}

.login_apply{
  margin: auto;
  padding-top: 300px;
  width: 440px;
  height: 400px;
 
  .title{
    text-align: center;
    font-size: 20px;
    margin-bottom: 24px;
  }
  .el-form-item--small .el-form-item__label{
    width: 100px;
    height: 42px;
    line-height: 42px;
  }
  .el-input--small .el-input__inner{
 height: 42px;
  }
  .el-input{
    width: 340px;
   
  }
  .apply{
    width: 340px;
    height: 42px;
    background: #3978E7;
    color: #fff;
    border-radius:0px  !important;
    border: 0px;
    font-size: 14px;
    margin-left: 100px;
    margin-top: 34px;
  }
  .applyStop{
    width: 340px;
    height: 42px;
    background: #E4E4E5;
    color: #A1A2A6;
    border-radius:0px  !important;
    border: 0px;
    font-size: 14px;
    margin-left: 100px;
    margin-top: 34px;
  }

}
</style>
