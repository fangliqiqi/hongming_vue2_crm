<template>
  <!-- :rules="rules" -->
  <el-form ref="form" :model="particularsYZF"  label-width="80px">
      <el-form-item v-if="judge">
      <el-alert
    title="已绑定"
    type="success"
    show-icon>
  </el-alert>
    </el-form-item>
    <el-form-item label="账号" prop="yzfAccount">
      <el-input v-model="particularsYZF.yzfAccount" />
    </el-form-item>
    <el-form-item label="密码" prop="yzfPassword">
       <!-- <el-input  type="password" v-if="judge" class="111"/> -->
      <el-input v-model="particularsYZF.yzfPassword" type="password"  class="222"/>
      
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="mini" @click="open">保存</el-button>
      <el-button type="danger" size="mini" @click="close">关闭</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { add, queryDetailByUid } from "@/api/system/bindingYZF";
import { encrypt, decrypt } from "@/utils/jsencrypt";

export default {
  props: {
    user: {
      type: Object
    }
    // bindingYZF:{
    //     type: Object
    // },
    // byValueYZF:{
    //     type: Object
    // }
  },
  data() {
    return {
judge:false,
inputValue:'',
      // 表单校验
      rules: {
        yzfAccount: [
          { required: true, message: "用户昵称不能为空", trigger: "blur" }
        ],
        yzfPassword: [
          { required: true, message: "用户密码不能为空", trigger: "blur" }
        ]

        // mobilePhone: [
        //   { required: true, message: "手机号码不能为空", trigger: "blur" },
        //   {
        //     pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
        //     message: "请输入正确的手机号码",
        //     trigger: "blur"
        //   }
        // ]
      },
      particularsYZF: {}
    };
  },

  methods: {
       open() {
        this.$confirm('是否执行此操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.submit()
        //   this.$message({
        //     type: 'success',
        //     message: '删除成功!'
        //   });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
      },
    submit() {
      var data = {
        yzfAccount: this.particularsYZF.yzfAccount,
        yzfPassword: this.particularsYZF.yzfPassword,
        userId: this.particularsYZF.userId
      };
      add(data).then(response => {
        if (response.code == 200) {
          this.msgSuccess("保存成功");
        }
      });
    },
    close() {
      this.$store.dispatch("tagsView/delView", this.$route);
      this.$router.push({ path: "/index" });
    },
    particulars() {
      console.info("请求详情");
      console.info(this.particularsYZF)
      console.info(this.user.userId);
      queryDetailByUid({ userId: this.user.userId }).then(resp => {
        if (resp.data) {
            console.info('请求---if')
            console.info(resp.data)
          // this.particularsYZF.yzfAccount = resp.data.yzfAccount;
          //  this.particularsYZF.yzfPassword=''
          this.particularsYZF={
              userId: resp.data.userId,
              yzfAccount:resp.data.yzfAccount,
              yzfPassword:'1' ,
          }
          this.judge=true
        } else {
          this.particularsYZF = {
            userId: this.user.userId,
            yzfAccount:'暂无' ,
            yzfPassword:'' ,
          };
        //   this.particularsYZF.userId=11111
        //   this.particularsYZF.yzfAccountName=''
        //   this.particularsYZF.yzfPasswordN=""
        //   this.delete(this.particularsYZF.yzfAccountName, "key")

    //    var data={
    //        id:3333
    //    }
        // this.particularsYZF=data

          console.info('详情---else')
          console.info(this.particularsYZF)
        }
        console.info('详情---结束')
          console.info(this.particularsYZF)
           console.info(this.judge)
           console.info(this.inputValue)
      });
    }
  },
  watch: {
    user: {
      handler(n, o) {
        console.info("改变了---");
        console.info(this.user);
        console.info(this.particularsYZF);
        console.info(this.byValueYZF);
        this.particulars();
      },
      deep: true
    },
    bindingYZF:{
           handler(n, o) {
        console.info("111111111111改变了---");
        console.info(n);

        console.info(this.particularsYZF);

      },
      deep: true
    }
  }
};
</script>
