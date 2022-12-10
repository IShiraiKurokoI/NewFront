<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <div class="words">
        <span @click="menuClick('doctorLayout')" class="title">大工医院欢迎您</span>
      </div>
      <div class="words">
        <span>尊敬的&nbsp;{{ userName }}&nbsp;医生</span><br />
        <span><el-link type="primary" @click="logout">退出登录</el-link></span>
      </div>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <!-- 导航菜单 -->
        <el-menu
          background-color="#353744"
          text-color="#fff"
          active-text-color="#ffd04b"
          :default-active="activePath"
        >
          
          <el-menu-item index="orderToday" @click="menuClick('orderToday')">
            <i class="el-icon-message-solid"></i>
            <span slot="title">当天挂号</span>
          </el-menu-item>
            <el-menu-item index="doctorOrder" @click="menuClick('doctorOrder')">
            <i class="el-icon-s-check"></i>
            <span slot="title">我的挂号</span>
          </el-menu-item>
            <el-menu-item index="inBed" @click="menuClick('inBed')">
            <i class="el-icon-office-building"></i>
            <span slot="title">申请当天入院</span>
          </el-menu-item>
           <el-menu-item index="doctorCard" @click="menuClick('doctorCard')">
            <i class="el-icon-s-custom"></i>
            <span slot="title">个人信息</span>
          </el-menu-item>
          
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 子路由入口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import jwtDecode from "jwt-decode";
import { getToken, clearToken, getActivePath, setActivePath} from "@/utils/storage.js";
export default {
  name: "Doctor",
  data() {
    return {
      userName: "",
      activePath:"",
    };
  },
  methods: {
    //token解码
    tokenDecode(token){
      if (token !== null)
      return jwtDecode(token);
    },
    //导航栏点击事件
    menuClick(path){
      this.activePath=path;
            setActivePath(path);
            if(this.$route.path !== "/"+path) this.$router.push(path);
            console.log(path)
    },
    //退出登录
    logout() {
      this.$confirm("此操作将退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          clearToken();
          this.$message({
            type: "success",
            message: "退出登录成功!",
          });
          this.$router.push("login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
  },
   created() {
    //  获取激活路径
            this.activePath=getActivePath();
            // 解码token
            this.userName = this.tokenDecode(getToken()).dName;

        }
};
</script>
<style scoped lang="scss">
.title{
  cursor: pointer;
}
.el-header {
  background-color: #121d28;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .words {
    text-align: center;
    span {
      color: white;
    }
  }
}
.el-container{
        height: 100%;
    }
.el-aside{
  background-color:#353744;
}
.el-menu{
  border: 0;
}
</style>