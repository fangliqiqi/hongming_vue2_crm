<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6" :xs="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>个人信息</span>
          </div>
          <div>
            <div class="text-center">
              <userAvatar :user="user" />
            </div>
            <ul class="list-group list-group-striped">
              <li class="list-group-item">
                <svg-icon icon-class="user" />用户名称
                <div class="pull-right">{{ user.shortName }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="phone" />手机号码
                <div class="pull-right">{{ user.mobilePhone }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="email" />用户邮箱
                <div class="pull-right">{{ user.email }}</div>
              </li>
              <!-- <li class="list-group-item">
                <svg-icon icon-class="tree" />所属部门
                <div class="pull-right" v-if="user.deptId">{{ user.dept.deptName }} / {{ postGroup }}</div>
              </li> -->
              <li class="list-group-item">
                <svg-icon icon-class="tree" />所属部门
                <el-tooltip placement="top-end">
                  <div
                    class="pull-right"
                    style="width: 150px;
                           text-align: right;
                           overflow: hidden;
                           text-overflow: ellipsis;
                           white-space: nowrap;
                           cursor:pointer;"
                    v-for="(item, index) in user.deptList"
                    :key="index"
                  >
                    {{ item.deptName }}
                  </div>
                  <div
                    slot="content"
                    v-for="(item, index) in user.deptList"
                    :key="index"
                  >
                    {{ item.deptName }}
                  </div>
                </el-tooltip>
              </li>

              <li class="list-group-item">
                <svg-icon icon-class="peoples" />所属角色
                <div
                  class="pull-right"
                  v-for="(item, index) in user.userRoleList"
                  :key="index"
                >
                  {{ item }}
                </div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="date" />创建日期
                <div class="pull-right">{{ user.createTime }}</div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :span="18" :xs="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>基本资料</span>
          </div>
          <el-tabs v-model="activeTab">
            <el-tab-pane label="基本资料" name="userinfo">
              <userInfo :user="user" />
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="resetPwd">
              <resetPwd :user="user" />
            </el-tab-pane>
            <el-tab-pane label="一键绑定云帐房" name="bindingYZF">
              <bindingYZF :user="user" />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import userAvatar from "./userAvatar";
import userInfo from "./userInfo";
import resetPwd from "./resetPwd";
import bindingYZF from "./bindingYZF";
import { getUserProfile } from "@/api/system/user";
import { queryDetailByUid } from "@/api/system/bindingYZF"; //一键登录云帐房
import { encrypt, decrypt } from "@/utils/jsencrypt";
export default {
  name: "Profile",
  components: { userAvatar, userInfo, resetPwd, bindingYZF },
  data() {
    return {
      bindingYZF11: {},
      byValueYZF:{},
      user: {
        sex: 0
      },
      departmentList: [],
      roleGroup: "",
      postGroup: "",
      activeTab: "userinfo"
    };
  },
  created() {
    this.getUser();
    // this.details()
  },
  methods: {
    getUser() {
      console.info('qingqiu')
       console.info(this.bindingYZF11)
      getUserProfile().then(response => {
        console.log(response);
        if (response.code == 200) {
          this.user = response.data;
          // this.bindingYZF11.userId=response.data.userId
          // this.byValueYZF.userId=response.data.userId
          response.data.deptList.forEach(item => {
            this.departmentList.push(item.deptName);
          });
          //
          //  this.bindingYZF11={}
         
          // this.roleGroup = response.data.roleNames.join("/");
          // this.postGroup = response.postGroup;
        }
      });
   }
  }
};
</script>
