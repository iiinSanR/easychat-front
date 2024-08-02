<template>
  <div class="login-panel">
    <div class="title drag">TempestChat</div>
    <div class="login-form">
      <div class="error-msg">{{ errorMsg }}</div>

      <el-form
        :model="formData"
        :rules="rules"
        ref="formDataRef"
        label-width="0px"
        @submit.prevent
      >
      <!--input输入-->
        <el-form-item prop="email">
          <el-input size="large" clearable placeholder="请输入邮箱" v-model.trim="formData.email">
            <template #prefix>
              <span class="iconfont icon-email"></span>
            </template>
          </el-input>
        </el-form-item>


         <el-form-item prop="nickName" v-if="!isLogin">
          <el-input size="large" clearable placeholder="请输入昵称" v-model.trim="formData.nickName">
            <template #prefix>
              <span class="iconfont icon-user-nick"></span>
            </template>
          </el-input>
        </el-form-item>




         <el-form-item prop="password">
          <el-input size="large" show-password clearable placeholder="请输入密码" v-model.trim="formData.password">
            <template #prefix>
              <span class="iconfont icon-password"></span>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="rePpassword" v-if="!isLogin">
          <el-input size="large" show-password clearable placeholder="请再次输入密码" v-model.trim="formData.rePpassword">
            <template #prefix>
              <span class="iconfont icon-wpassword"></span>
            </template>
          </el-input>
        </el-form-item>





         <el-form-item prop="checkCode">
          <el-input size="large" clearable placeholder="请输入验证码" v-model.trim="formData.checkCode">
            <template #prefix>
              <span class="iconfont icon-checkcode"></span>
            </template>
          </el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="submit">{{isLogin ? '登录' : '注册'}}</el-button>
        </el-form-item>

        <div class="button-link">
          <span class="a-link" @click="changeOpType">{{isLogin?'没有账号?':'已有账号?'}}</span>
        </div>

      </el-form>
    </div>
  </div>
  
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick } from "vue"
const { proxy } = getCurrentInstance();

const formData = ref({});
const formDataRef = ref();



const errorMsg = ref(null);
const isLogin = ref(true);

const changeOpType =()=> {
  window.ipcRenderer.send('loginOrRegister', !isLogin.value)
  isLogin.value = !isLogin.value
}


const submit = ()=> {
  clearVerify();

  if(!checkValue('checkEmail', formData.value.email,'请输入正确邮箱')) {
    return;
  }
  if(!checkValue('checkPassword', formData.value.password,'密码由数字、字母、特殊字符组成')) {
    return;
  }
  if(!checkValue('null', formData.value.checkCode,'请输入正确验证码')) {
    return;
  }
}

const checkValue = (type,value,msg) => {
  if(proxy.Utils.isEmpty(value)) {
    errorMsg.value = msg;
    return false;
  }
  if(type&&!proxy.Verify[type](value)) {
    errorMsg.value = msg;
    return false;

  }
  return true;
}
const clearVerify = () => {
  errorMsg.value = null;
}



</script>

<style lang="scss" scoped>

.email-select {
  width: 250px;
}

.loading-panel {
  height: calc(100vh - 32px);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  img {
    width: 300px;
  }
}

.login-panel {
  background: #fff;
  border-radius: 3px;
  border: 1px solid #ddd;
  .title {
    height: 30px;
    padding: 5px 0px 0px 10px;
  }


.login-form {
  padding: 0px 15px 29px 15px;
  :deep(.el-input__wrapper) {
      box-shadow: none;
      border-radius: none;
  }
  .el-form-item {
    border-bottom: 1px solid #ddd;
  }


  .email-panel {
    align-items: center;
    width: 100%;
    display: flex;
    .input {
      flex: 1;
    }
    .icon-down {
      margin-left: 3px;
      width: 16px;
      cursor: pointer;
      border: none;
    }
  }

  .error-msg {
    line-height: 30px;
    height: 30px;
    color: #fb7373;
  }
  .check-code-panel {
    display: flex;
    .check-code {
      cursor: pointer;
      width: 120px;
      margin-left: 5px;
    }
  }

  .login-btn {
    margin-top: 20px;
    width: 100%;
    background: #07c160;
    height: 36px;
    font-size: 16px;
  }

  .bottom-link {
    text-align: right;
    }

  }
}

</style>
