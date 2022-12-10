<template>
<div>
       <div class="indexPeople">
          <div class="userImage">
              <i class="el-icon-user"></i>
          </div>

          <div class="userFont">
      <div class="spanCure">
          <span >就诊概况</span>
      </div>
    <div class="spanPeople">
          <span>今天我的预约人数：{{orderPeople}}</span>
      </div>
</div>
      </div>
 </div>
</template>
<script>
import request from "@/utils/request.js";
import jwtDecode from "jwt-decode";
import { getToken } from "@/utils/storage.js";
export default {
    name: "DoctorLayout",
    data() {
        return {
            userId:1,
            orderPeople:1
        }
    },
    methods: {
            //token解码
    tokenDecode(token) {
      if (token !== null) return jwtDecode(token);
    },
        requestPeople(){
            request.get("order/orderPeopleByDid", {
                params: {
                    dId: this.userId
                }
            })
            .then(res => {
                 if(res.data.status !== 200)
                return this.$message.error("数据请求失败");
                this.orderPeople = res.data.data;
            })
       
        }
    },
    created(){
         this.userId = this.tokenDecode(getToken()).dId;
        this.requestPeople();
    }
}
</script>
<style lang="scss" scoped>
.userFont{
    height: 150px;
    width: 250px;
    color: white;
    float: right;
    .spanCure{
        font-size: 15px;
        margin-top: 60px;
        margin-bottom: 15px;

    }
    .spanPeople{
        font-size: 18px;

    }

}

.userImage{
    height: 150px;
    width: 150px;
    font-size: 130px;
    color: white;
    float: left;
    position: relative;
    left: 40px;
    top: 10px;
}
.indexPeople{
    height: 200px;
    width: 500px;
    background: #58B9AE;
    margin-top: 50px;
    margin-left: 350px;

}
</style>