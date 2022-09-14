<template>
  <div class="wrap">
     <img :src="backgroundImg" class="backgroundImg"/>
     <div class="loginWrap">
        <div class="login">
          <h1>CCCBlog 账户登录</h1>
          <div class="inputWrap">
              <p v-show="pVisible">用户名</p>
              <input type="text" class="myInput" placeholder="用户名" @focus="showVisible"  v-model="user.blogUserAccount"/>
              <Tooltip content="一般使用个人电话号码作为登录用户名" placement="right-start">
                <div class="tipDiv">!</div>
              </Tooltip>
          </div>
          <div class="inputWrap">
              <p v-show="pVisible">密码</p>
              <input  type="password" class="myInput" placeholder="密码" v-model="user.blogUserPassword"/>
              <Tooltip content="密码由6位以上的字母、数字、下划线构成" placement="right-start">
                <div class="tipDiv">!</div>
              </Tooltip>
          </div>
          <Button type="success" class="loginButton" @click="handleLogin">登录</Button>
        </div>
        <div class="register">
          <h1>没有CCCBlog账户?</h1>
          <div class="registerWrap">
            <Button type="text" class="registerButton">创建用户</Button>
          </div>
          <div class="registerButtom">@Coder_CCC BLOG</div>
        </div>
     </div>
  </div>
</template>
<script>
import {valitLogin} from '../api/login'
export default {
  name: 'LoginIndex',
  data () {
    return {
      backgroundImg:require("../assets/background.jpg"),
      user:{
        blogUserAccount:'',
        blogUserPassword:''
      },
      pVisible:false
    }
  },
  methods: {
    showVisible(){
      this.pVisible = true
    },
    hideVisible(){
      this.pVisible = false
    },
    handleLogin(){
      if(this.user.blogUserAccount && this.user.blogUserPassword){
        valitLogin(this.user).then(res=>{
          if(res.data.msg==='登录成功'){
            this.$Message.success(res.data.msg)
            setTimeout(()=>{
              this.$router.push('/blogHome/blogManage')
            },1000)
          }else if(res.data.msg === '该账号未注册'){
            this.$Message.warning(res.data.msg)
          }else{
            this.$Message.error(res.data.msg)
          }
        })
      }else{
        this.$Message.error("请先输入用户名和密码!")
      }
    }
  },
  created () {
  },
  mounted () {
  },
}
</script>
<style  scoped>
    .backgroundImg{
      position: absolute;
      z-index: -1;
      width: 100%;
      height:100vh;
    }
    .loginWrap{
      position: absolute;
      width:450px;
      height:600px;
      left:50%;
      top:50%;
      transform: translate(-50%,-50%);
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .login{
      height:60%;
      background-color: #f9f7f3;
      margin-bottom: 30px;
      border-radius: 10px;
      color:10px 10px black;
    }
    .login:hover,.register:hover{
      box-shadow:0px 0px 30px 0 gray 
    }
    .register{
      height:30%;
      background-color: #f9f7f3;
      border-radius: 10px;
      color:#2b201c;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    h1{
      font-weight: bolder;
      text-align: center;
      margin-top: 20px;
    }
    .myInput{
      width:300px;
      font-weight: normal;
      border:1px solid #DEE4E7 ;
      box-sizing:border-box;
      color: #333333;
      margin-left: 30px;
      margin-top: 20px;
      margin-bottom: 15px;
      margin-right: 0.3em;
      overflow-x: hidden;
      overflow-y: auto;
      border: 0;
      border-radius: 0px !important;
      border-bottom: 2px solid #CBC5BF;
      background: transparent;
      padding: 8px 30px 8px 10px !important;
      font-family: "Oracle Sans";
      font-size: 15px!important;
      outline:none;
    }
    .myInput:hover{
      background-color: white;
      border-bottom:2px solid #6c9b64 ;
    }
    
    .tipDiv{
      width:25px;
      height:25px;
      margin-left:25px;
      border-radius: 25px;
      background-color: black;
      color:white;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
    }
    p{
      color:#6c9b64;
      font-size: 14px;
      font-weight: bold;
      margin-left: 30px;
      
    }
    .loginButton{
      width:350px;
      border:none;
      border-radius: 10px;
      margin-left: 36px;
      margin-top:20px;
      background-color:#6a9d67 ;
      font-weight: 20px;
      font-weight: bold;
    }
    .registerWrap{
      width:300px;
      height:40px;
      border:2px solid #CBC5BF;
      margin:0 auto;
      border-radius: 3px;
    }
    .registerButton{
      width:300px;
      height:40px;
      font-weight: bold;
    }
    .registerButton:hover{
      background-color:#6a9d67;
    }
    .registerButtom{
      font-size: 10px;
      color:#e5b56a;
      font-weight: bold;
      text-align: center;
      margin-bottom:5px;
    }
</style>
