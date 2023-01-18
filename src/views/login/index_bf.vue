<template>
  <div class="login">
<!--    <div class="bg">-->
<!--      <video autoplay="autoplay" muted="muted" volume="0" loop="loop"-->
<!--             style="width: 100%;height: 100%;object-fit:cover;object-position:center center;z-index: 1;">-->
<!--        <source type="video/mp4" :src="require('@/assets/media/bg.mp4')"/>-->
<!--      </video>-->
<!--    </div>-->
    <div class="title-vi">
      <img :src="require('@/assets/image/logo.png')" style="width: 72px;height: 72px;"/>
      <img class="lh" :src="require('@/assets/image/lh.png')"/>
      <img :src="require('@/assets/image/hmtext.png')" style="height: 60px;">
    </div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
      <!--      <h3 class="title">后台管理系统</h3>-->
      <el-tabs v-model="appId" @tab-click="handleClick">
        <el-tab-pane label="积分商城管理" name="10"></el-tab-pane>
        <el-tab-pane label="CRM后台管理" name="20"></el-tab-pane>
        <el-tab-pane label="商城管理" name="30"></el-tab-pane>
      </el-tabs>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号"
                  prefix-icon="el-icon-s-custom">
          <!--          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />-->
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
          prefix-icon="el-icon-lock"
          @keyup.enter.native="handleLogin"
        >
          <!--          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />-->
        </el-input>
      </el-form-item>
      <el-form-item prop="piccode">
        <el-input
          v-model="loginForm.piccode"
          auto-complete="off"
          placeholder="验证码"
          style="width: 63%"
          @blur="toUp"
          @keyup.enter.native="handleLogin"
        >
          <!--          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />-->
        </el-input>
        <div class="login-code">
          <img :src="picUrl ? picUrl : errorImg" @click="getCode" class="login-code-img"/>
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Copyright © 2018-2020 www.modewenti.com 安徽泓铭网络科技有限公司</span>
      
    </div>
  </div>
</template>

<script>
  import { getCodeImg, getAuthCode } from '@/api/login'
  import { encrypt, decrypt } from '@/utils/jsencrypt'
  import { _getSessionStore, _setSessionStore, _setCookie, _getCookie, _removeCookie } from '@/utils/storage'
  import { appIdKey, appId } from '@/settings'
  import store from '../../store'

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
      return {
        appId: appId + '',
        picUrl: '',
        picCode: '',
        upCode: '',
        errorImg: require('../../assets/image/error.png'),
        cookiePassword: '',
        loginForm: {
          username: '',
          password: '',
          rememberMe: false,
          code: '',
          piccode: '',
          upCode: ''
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

        loading: false,
        redirect: undefined
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
    created() {
      this.getCode()
      this.getCookie()
      _setSessionStore(appIdKey, appId)
    },
    methods: {
      handleClick: function(act) {
        _setSessionStore(appIdKey, act.name)
        console.info(arguments)
      },
      getCode() {
        getCodeImg().then(res => {
          // this.codeUrl = "data:image/gif;base64," + res.img;
          // this.loginForm.uuid = res.uuid;
          if (res.code === 200) {
            this.picUrl = res.data.base64Image
            this.picCode = res.data.verifyCode
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
        console.info(document.cookie)
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
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
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
                  // this.goType(appIds[0], response.data.code)
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
          }
        })
      },
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
  .login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-image: url("../../assets/image/login-background.jpg");
    background-size: cover;

    .title-vi {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-bottom: 52px;

      .lh {
        margin-left: 24px;
        margin-right: 24px;
        height: 52px;
      }

      z-index: 10;
    }

    .bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  .title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #fff;
  }

  .login-form {
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.08);
    width: 400px;
    padding: 25px 25px 5px 25px;
    z-index: 10;

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

    .el-button {
      background: #003dbf;
      border-color: #003dbf;
    }

    .el-checkbox__input.is-checked + .el-checkbox__label, .el-checkbox__label {
      color: #ffffff;
    }
  }

  .login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
  }

  .login-code {
    width: 33%;
    height: 38px;
    float: right;

    img {
      cursor: pointer;
      vertical-align: middle;
    }
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

  .login-code-img {
    height: 38px;
  }

</style>
<style rel="stylesheet/scss" lang="scss">
  .login {
    .el-tabs__nav {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      background: rgba(255, 255, 255, 0.3);

      .el-tabs__item {
        flex: 1;
        text-align: center;
        padding-right: 0;

        &:hover {
          color: #003dbf
        }

        &.is-active {
          color: #003dbf;

        }
      }

    }

  }
</style>
