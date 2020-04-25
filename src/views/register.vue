<template>
  <div class="container">
    <div class="content">
      <div class="top">
        <div class="header">
          <a>
            <img class="logo"/>
            <span class="title">{{L('AppName')}}</span>
          </a>
        </div>
        <div class="desc">
          {{L('WelcomeMessage')}}
        </div>
      </div>
      <div class="main">
        <Form ref="registerform" :rules="rules" :model="registerModel">
          <FormItem prop="name">
            <div class="ivu-input-wrapper ivu-input-wrapper-large ivu-input-type">
              <i class="ivu-icon ivu-icon-ios-person-outline ivu-input-icon ivu-input-icon-normal" style="left:0"></i>
              <input v-model="registerModel.name" autocomplete="off" spellcheck="false" type="text" :placeholder="L('Name')" class="ivu-input ivu-input-large" style="padding-left:32px;padding-right:0">
            </div>
          </FormItem>
          <FormItem prop="surname">
            <div class="ivu-input-wrapper ivu-input-wrapper-large ivu-input-type">
              <i class="ivu-icon ivu-icon-ios-person-outline ivu-input-icon ivu-input-icon-normal" style="left:0"></i>
              <input v-model="registerModel.surname" autocomplete="off" spellcheck="false" type="text" :placeholder="L('Surname')" class="ivu-input ivu-input-large" style="padding-left:32px;padding-right:0">
            </div>
          </FormItem>
          <FormItem prop="userName">
            <div class="ivu-input-wrapper ivu-input-wrapper-large ivu-input-type">
              <i class="ivu-icon ivu-icon-ios-person-outline ivu-input-icon ivu-input-icon-normal" style="left:0"></i>
              <input v-model="registerModel.userName" autocomplete="off" spellcheck="false" type="text" :placeholder="L('UserName')" class="ivu-input ivu-input-large" style="padding-left:32px;padding-right:0">
            </div>
          </FormItem>
          <FormItem prop="emailAddress">
            <div class="ivu-input-wrapper ivu-input-wrapper-large ivu-input-type">
              <i class="ivu-icon ivu-icon-ios-person-outline ivu-input-icon ivu-input-icon-normal" style="left:0"></i>
              <input v-model="registerModel.emailAddress" autocomplete="off" spellcheck="false" type="text" :placeholder="L('Email')" class="ivu-input ivu-input-large" style="padding-left:32px;padding-right:0">
            </div>
          </FormItem>
          <FormItem prop="password">
            <div class="ivu-input-wrapper ivu-input-wrapper-large ivu-input-type">
              <i class="ivu-icon ivu-icon-ios-locked-outline ivu-input-icon ivu-input-icon-normal" style="left:0"></i>
              <input v-model="registerModel.password" autocomplete="off" spellcheck="false" type="password" :placeholder="L('Password')" class="ivu-input ivu-input-large" style="padding-left:32px;padding-right:0">
            </div>
          </FormItem>
        </Form>
        <div>
            <a style="float:right;font-size: 14px;margin-top: 3px;" @click="gotoLoginPage">{{L('LogIn')}}</a>
        </div>
        <div style="margin-top:15px">
          <Button type="primary" @click="register" long size="large">{{L('Register')}}</Button>
        </div>
        <language-switch></language-switch>
      </div>
    </div>
    <Footer :copyright="L('CopyRight')"></Footer>
    <!-- <tenant-switch v-model="showChangeTenant"></tenant-switch> -->
  </div>
</template>
<script lang="ts">
import { Component, Vue,Inject } from 'vue-property-decorator';
import Footer from '../components/Footer.vue'
import TenantSwitch from '../components/tenant-switch.vue'
import LanguageSwitch from '../components/language-switch.vue'
import ViewUI from 'view-design';
import AbpBase from '../lib/abpbase'
import { router } from '../router';
@Component({
  components:{Footer,TenantSwitch,LanguageSwitch}
})
export default class Register extends AbpBase {
  registerModel={
    name:'',
    surname:'',
    userName:'',
    emailAddress:'',
    password:''
  }
  showChangeTenant:boolean=false
  async register(){
    (this.$refs.registerform as any).validate(async (valid:boolean)=>{
       if(valid){
          this.$Message.loading({
            content:this.L('RegisterPrompt'),
          })
          await this.$store.dispatch({
            type:'app/register',
            data:this.registerModel
          }).then(f => {
            if(f.canLogin){
              this.$Message.success({
                content: this.L('Success'),
                onClose: () => {
                  this.$router.push({
                    name: 'login'
                  });
                }
              })
            }
          });
       }
    });      
  }
  async gotoLoginPage() {
    this.$router.push({
                name: 'login'
            });
  }
  get tenant(){
    return this.$store.state.session.tenant;
  }
  rules={
    userNameOrEmailAddress: [
      { required: true, message: this.L('UserNameRequired'), trigger: 'blur' }
    ],
    password: [
      { required: true, message: this.L('PasswordRequired'), trigger: 'blur' }
    ]
  }
  created(){
  }
}
</script>
<style scoped>  
  .container{
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    min-height: 100%;
    background: #f0f2f5;
  }
  @media (min-width: 768px){.container{
    background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
    background-repeat: no-repeat;
    background-position: center 110px;
    background-size: 100%;
    font-size: 18px;
  }}
  .content{
    padding: 32px 0;
    -ms-flex: 1 1 0%;
    flex: 1 1 0%;
  }
  .main{
    width: 368px;
    margin: 0 auto;
  }
  @media (min-width:768px) {
    .content{
      padding: 112px 0 24px
    }
  }
  .top{
    text-align: center
  }
  .header{
    height: 44px;
    line-height: 44px;
  }
  .logo{
    height: 44px;
    vertical-align: top;
    margin-right: 16px;
  }
  .title{
    font-size: 33px;
    color: rgba(0,0,0,.85);
    font-family: "Myriad Pro","Helvetica Neue",Arial,Helvetica,sans-serif;
    font-weight: 600;
    position: relative;
    top: 2px;
  }
  .desc {
    font-size: 14px;
    color: rgba(0,0,0,.45);
    margin-top: 12px;
    margin-bottom: 40px;
  }
  .tenant-title{
    margin-bottom: 24px;
    text-align: center;
  }
  
</style>

