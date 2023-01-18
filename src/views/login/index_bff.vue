<template>
  <div class="login_vi">
    <el-row type="flex">
      <el-col :span="11" :xs="24" class="login_left" >
        <img class="logo" :src="require('@/assets/image/login_logo.png')">
        <img class="img" :src="require('@/assets/image/login_img.png')">
      </el-col>
      <el-col :span="13" :xs="24" class="login_right">
        <div class="login-form">
          <el-tabs v-model="loginType" @tab-click="handleClick">
            <el-tab-pane label="密码登录" name="10">
              <el-form ref="loginForm" :model="loginForm" :rules="loginRules" >
                <el-form-item prop="username">
                  <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号"  size="default">
                    <!--          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />-->
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    v-model="loginForm.password"
                    type="password"
                    auto-complete="off"
                    placeholder="密码"
                    size="default"
                    @keyup.enter.native="handleLogin('loginForm')"
                  >
                    <!--          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />-->
                  </el-input>
                </el-form-item>
                <el-form-item prop="piccode">
                  <el-input
                    v-model="loginForm.piccode"
                    auto-complete="off"
                    placeholder="验证码"
                    style="width: 100%"
                    @blur="toUp" size="default"
                    @keyup.enter.native="handleLogin('loginForm')"
                  >
                    <!--          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />-->
                    <template slot="append" >
                      <img :src="picUrl ? picUrl : errorImg" @click="getCode" class="login-code" />
                    </template>
                  </el-input>

                </el-form-item>
                <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
                <el-form-item style="width:100%;">
                  <el-button
                    :loading="loading"
                    type="primary" size="default"
                    style="width:100%;margin-top: 12px"
                    @click.native.prevent="handleLogin('loginForm')"
                  >
                    <span v-if="!loading">登 录</span>
                    <span v-else>登 录 中...</span>
                  </el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="验证码登录" name="20">
              <el-form ref="msgLoginForm" :model="loginForm" :rules="msgLoginRules" >
                <el-form-item prop="phoneNumbers">
                  <el-input v-model.number="loginForm.phoneNumbers" type="text" auto-complete="off" placeholder="手机号码"
                            size="default">
                  </el-input>
                </el-form-item>
                <el-form-item prop="code">
                  <el-input
                    v-model="loginForm.code"
                    type="text"
                    auto-complete="off"
                    placeholder="验证码"
                    size="default"
                    maxlength="6"
                    @keyup.enter.native="handleLogin('msgLoginForm')"
                  >
                    <!--          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />-->
                    <el-button slot="append" type="text" :disabled="codeFlag" @click="getMsgCode">{{codeText}}</el-button>
                  </el-input>
                </el-form-item>
                <div class="code-tip">
                  <span class="fs-12 ">短信验证码有效时间为5分钟</span>
                </div>
                <el-form-item style="width:100%;">
                  <el-button
                    :loading="loading"
                    type="primary" size="default"
                    style="width:100%;margin-top: 12px"
                    @click.native.prevent="handleLogin('msgLoginForm')"
                  >
                    <span v-if="!loading">登 录</span>
                    <span v-else>登 录 中...</span>
                  </el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
          <div class="login-tip">
            <span>登录即代表同意用户服务协议和隐私政策</span>
          </div>
        </div>
        <!--  底部  -->
        <div class="el-login-footer">
          <span>Copyright © 2018-2020 www.modewenti.com 安徽泓铭网络科技有限公司</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getCodeImg, getAuthCode,getSmsCode,smslogin } from '@/api/login'
  import { encrypt, decrypt } from '@/utils/jsencrypt'
  import { _getSessionStore, _setSessionStore, _setCookie, _getCookie, _removeCookie } from '@/utils/storage'
  import { appIdKey, appId } from '@/settings'
  import store from '../../store'
  import { isPromise, throttle } from '@/utils/hmt'
  export default {
    name: 'Login',
    data() {
      const validatePic = (rule, value, callback) => {
        console.info(arguments)
        if (!this.loginForm.piccode) {
          callback(new Error('请输入图形验证码'))
        } else if (this.loginForm.piccode.length == this.upCode.length) {
          if (!this.toUp(this.loginForm.piccode, this.upCode)) {
            // this.getCode()
            callback(new Error('验证码输入错误'))
          } else {
            callback()
          }
        } else {
          callback(new Error('验证码输入错误'))
        }
      }
      const validateCode = (rule, value, callback) => {
        if (!this.codeRule) {
          callback()
        } else if (!this.loginForm.code) {
          callback(new Error('请输入短信验证码'))
        } else if(this.loginForm.code.length<6){
          callback(new Error('验证码输入错误'))
        }else{
          callback()
        }
      }
      return {
        appId: appId + '',
        picUrl: '',
        picCode: '',
        upCode: '',
        errorImg: require('../../assets/image/error.png'),
        cookiePassword: '',
        loginType:'10',//登录类型
        msgCount:61,
        codeRule:true,
        codeFlag:false,
        loginForm: {
          username: '',
          password: '',
          rememberMe: false,
          piccode: '',
          upCode: '',
          phoneNumbers:'',//手机号
          code: '',//验证码
          smsSendSource:'0',//来源 WEB(0),PC(1),OTHER(2);
          smsId:''//发短信时返回给你的ID
        },
        loginRules: {
          username: [
            { required: true, trigger: 'blur', message: '用户名不能为空' }
          ],
          password: [
            { required: true, trigger: 'blur', message: '密码不能为空' }
          ],
          piccode: [
            {
              required: true,
              message: '请输入验证码'
            },
            {
              validator: validatePic,
              trigger: ['blur', 'change']
            }
          ]
        },
        msgLoginRules:{
          phoneNumbers: [
            { required: true, message: '手机号码不能为空', trigger: 'blur' },
            {
              pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
              message: '请输入正确的手机号码',
              trigger: 'blur'
            }
          ],
          code:[{
            validator: validateCode,
            trigger: 'blur'
          }]
        },
        loading: false,
        redirect: undefined,
        timer:null,
      }

    },
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    computed:{
      codeText(){
        let text = '获取验证码'
        if(this.msgCount<0){
          this.msgCount=61;
          this.codeFlag = false;
          if(this.timer){
            clearInterval(this.timer)
          }
        }else if(this.msgCount<61){
          text = this.msgCount +'(s)';
          this.codeFlag = true
        }else{
          if(this.timer){
            clearInterval(this.timer)
          }
          this.msgCount=61;
          this.codeFlag = false;
        }
        return text
      }
    },
    created() {
      this.getCode()
      this.getCookie()
      _setSessionStore(appIdKey, appId)
    },
    methods: {
      handleClick: function(act) {
        _setSessionStore(appIdKey, act.name);
      },
      getCode() {
        getCodeImg().then(res => {
          // this.codeUrl = "data:image/gif;base64," + res.img;
          // this.loginForm.uuid = res.uuid;
          if (res.code === 200) {
            this.picUrl = res.data.base64Image
            this.picCode = res.data.verifyCode||'',
            this.upCode = this.picCode.toUpperCase()
            // console.log(this.upCode)
          } else {
            // this.$message.error('获取失败')
            console.log(res)
          }
        })
      },
      getCookie() {
        const username = _getCookie('username')
        const password = _getCookie('password')
        const rememberMe = _getCookie('rememberMe')
        this.loginForm = {
          username: username === undefined ? this.loginForm.username : username,
          password: password === undefined ? this.loginForm.password : decrypt(password),
          rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
        }
        let cookie = document.cookie
        if (cookie.length > 0) {
          const arr = cookie.split(';') // 这里显示的格式需要切割一下
          for (let i = 0; i < arr.length; i++) {
            // 判断查找相对应的值
            if (arr[i].indexOf(this.loginForm.username) !== -1) {
              const pwd00 = arr[i].trim()
              const account = `${this.loginForm.username}=`
              const pwd01 = pwd00.replace(account, ' ')
              // console.log('pwd', pwd01)
              // 拿到加密后的密码arr2[1]并解密
              const pwd1 = decrypt(pwd01)
              // console.log('pwd解密', pwd1)
              this.loginForm.password = pwd1
            }
          }
        }

      },
      handleLogin:throttle(function(form) {
        console.info(form)
        this.codeRule = true;
        console.info(this.$refs)
        this.$refs[form].validate(valid => {
          console.info(valid)
          if (valid) {
            this.loading = true
            if(this.loginType==10){
              if (this.loginForm.rememberMe) {
                _setCookie('username', this.loginForm.username, { expires: 30 })
                _setCookie('password', encrypt(this.loginForm.password), { expires: 30 })
                _setCookie('rememberMe', this.loginForm.rememberMe, { expires: 30 })
              } else {
                _removeCookie('username')
                _removeCookie('password')
                _removeCookie('rememberMe')
              }
              let data = {
                account: this.loginForm.username,
                password: encrypt(this.loginForm.password),
                isSave: this.loginForm.rememberMe
              }

              getAuthCode(data).then(response => {
                console.info(response)
                if (response.code == 200) {
                  let appIds = response.data.appIds || []
                  console.info(appIds)
                  if (appIds.length > 0) {
                    let data = {
                      code:response.data.code,
                    }
                    store.dispatch('Login', data).then((res) => {
                      console.info(res)
                      if(res.code==200&&res.data.ssoUrl){
                        window.location.href=res.data.ssoUrl
                      }else{
                        this.$router.replace('/')
                      }
                      console.info(res)
                    })
                  } else {
                    this.$comfirm('提示', '该账号已被注销', {
                      confirmButtonText: '确定',
                      type: 'warning'
                    })
                    this.getCode()
                  }
                  this.loading = false
                }
              }).catch(error => {
                console.info(error)
                this.loading = false
                this.getCode()
              })
            }else{
              let data = {
                phoneNumbers: this.loginForm.phoneNumbers,
                smsId:this.loginForm.smsId,
                smsSendSource: 0,
                code:this.loginForm.code
              }
              smslogin(data).then(response=>{
                if(response.success){
                  store.dispatch('Login', { data:response.data }).then((res) => {
                    console.info(res)
                    if(res.code==200&&res.data.ssoUrl){
                      window.location.href=res.data.ssoUrl
                    }else{
                      this.$router.replace('/')
                    }
                    console.info(res)
                  })
                }
                this.loading = false
              }).catch(error=>{
                this.loading = false
              })
            }

          }
        })
      },1500),

      getMsgCode:throttle(function(){
        this.codeRule = false;
        this.$refs.msgLoginForm.validate(valid => {
          let loginForm = this.loginForm;
          if (valid) {
            getSmsCode({phoneNumbers:loginForm.phoneNumbers,messageType:0,smsCodeType:0,smsSendSource:0}).then(res=>{
              this.loginForm.smsId = res.data;
              this.msgCount = 60;
              this.loginForm.code = '';
              this.timer = setInterval(()=>{
                this.msgCount--;
              },1000)
            })
          }
        })
      },1000),

      // 跳转方式
      goType(type, code) {
        const ssoHost = process.env.VUE_APP_SSO_HOST
        const appSsoId = process.env.VUE_APP_SSO_APP_ID
        const appId = this.appId

        // window.location.href = `${ssoHost}/api/sso/login?clientId=${appSsoId}&code=${code}&appId=${appId}`
        console.log('开始跳转')
      },

      toUp(value, upVal) {
        upVal = upVal || ''
        if (value) {
          let upCode = value.toUpperCase()
          if (upVal != upCode) {
            return false
          } else {
            return true
          }
        } else {
          return false
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .login_vi {
    height: 100%;

    .login_left{
      position: relative;
      height: 100vh;
      background-image: url('../../assets/image/login_left.jpg');
      background-size: cover;
      background-position: center;
      .logo{
        width: 220px;
        position: absolute;
        top: 9vh;
        left: 12.5%;
      }
      .img{
        width: 89%;
        position: absolute;
        bottom: 11vh;
        left: 5.5%;
      }
    }
    .login_right{
      height: 100vh;
      background-image: url('../../assets/image/login_right.jpg');
      background-size: cover;
      background-position: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .el-tabs{
        .el-tabs__header{
          margin-bottom: 32px;
        }
        .el-tabs__content{

        }
      }
      .el-tabs__nav {
        width: 100%;
        background: rgba(255, 255, 255, 0.3);
        .el-tabs__item {
          flex: 1;
          text-align: center;
          padding-right: 0;
          font-size: 20px;
          padding-right: 52px;
          height: 70px;
          box-shadow: none !important;
          line-height: 70px;
          &:hover {
            color: #3978E7 !important;
          }
          &.is-active {
            color: #3978E7 !important;
            font-weight: bold;
          }
        }
      }
      .login-form {
        max-width: 100%;
        margin-bottom: 30px;
        border-radius: 6px;
        background: rgba(255, 255, 255, 1);
        width: 436px;
        padding: 50px 48px 5px 48px;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        min-height: 560px;
        &>*{
          width: 100%;
          max-width: 100%;
        }
        .el-input {
          height: 38px;

          input {
            height: 38px;
          }
        }
        .input-icon {
          height: 39px;
          width: 14px;
          margin-left: 2px;
        }
        .el-button[type='primary'] {
          background: #3978E7;
          border-color: #3978E7;
          border-radius: 0 !important;
        }
        .el-checkbox__input.is-checked + .el-checkbox__label, .el-checkbox__label {
          color: #565759;
        }
        .el-input-group__append{
          background-color: #ffffff;
          border-radius: 0;
          .el-button{
            min-width: 100px;
            padding:0 12px ;
            &:not(.is-disabled){
              color: #3978E7;
            }
          }
        }
      }
    }
    .login-code {
      overflow: hidden;
      height: 36px;
      box-sizing: border-box;
      cursor: pointer;
      vertical-align: middle;
      max-height: 36px;
    }

    .el-login-footer {
      height: 40px;
      line-height: 40px;
      position: fixed;
      bottom: 0;
      width: 100%;
      text-align: center;
      color: #fff;
      font-family: Arial;
      font-size: 12px;
      letter-spacing: 1px;
    }
    .login-tip{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 60px;
      span{
        position: relative;
        color: #A1A2A6;
        font-size: 14px;
        &::before{
          position: absolute;
          content: '*';
          display: inline-block;
          left: -8px;
          top: 3px;
        }
        &::after{
          position: absolute;
          content: '*';
          display: inline-block;
          right: -8px;
          top: 3px;
        }
      }
    }
    .code-tip{
      display: flex;
      align-items: center;
      margin-bottom: 40px;
      span{
        position: relative;
        color: #D2D3D6;
        font-size: 12px;
        margin-left: 12px;
        &::before{
          position: absolute;
          content: '*';
          display: inline-block;
          left: -8px;
          top: 3px;
        }
      }
    }
  }
</style>
