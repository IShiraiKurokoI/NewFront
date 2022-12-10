<template>
  <div>
    <!-- 卡片 -->
    <el-card>
      <!-- 搜索栏及增加疾病 -->
      <el-row type="flex">
        <el-col :span="6">
          <el-input v-model="query" placeholder="请输入名称查询">
            <el-button
                slot="append"
                icon="el-icon-search"
                @click="requestDisease"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="6"></el-col>
        <el-col :span="6">
          <el-button type="primary" @click="addFormVisible = true"
          >增加疾病</el-button
          >
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="diseaseData" stripe style="width: 100%" border>
        <el-table-column label="编号" prop="disId"></el-table-column>
        <el-table-column label="名称" prop="disName"></el-table-column>
        <el-table-column label="描述" prop="disDescription"></el-table-column>
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <el-button size="mini" type="success" icon="el-icon-edit" @click="modifyDialog(scope.row.disId)"></el-button>
            <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="deleteDialog(scope.row.disId)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :current-page="pageNumber"
          :page-size="size"
          :page-sizes="[1, 2, 4, 8, 16]"
          :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 增加疾病对话框 -->
    <el-dialog title="增加疾病" :visible.sync="addFormVisible">
      <el-form :model="addForm" :rules="rules" ref="ruleForm">
        <el-form-item label="编号" prop="disId" label-width="80px">
          <el-input v-model.number="addForm.disId"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="disName" label-width="80px">
          <el-input v-model="addForm.disName"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="disDescription" label-width="80px">
          <el-input v-model="addForm.disDescription"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDisease('ruleForm')"
        >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 修改疾病对话框 -->
    <el-dialog title="修改疾病" :visible.sync="modifyFormVisible">
      <el-form :model="modifyForm" :rules="rules" ref="ruleForm">
        <el-form-item label="编号" prop="disId" label-width="80px">
          <el-input v-model.number="modifyForm.disId" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="disName" label-width="80px">
          <el-input v-model="modifyForm.disName"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="disDescription" label-width="80px">
          <el-input v-model="modifyForm.disDescription"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modifyFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifyDisease('ruleForm')"
        >确 定</el-button
        >
      </div>
    </el-dialog>



  </div>
</template>
<script>
import request from "@/utils/request.js";
export default {
  name: "Disease",
  data() {
    return {
      pageNumber: 1,
      size: 8,
      query: "",
      disData: [],
      total: 3,
      addFormVisible: false,
      addForm:{},
      rules:{
        disId: [
          { required: true, message: "请输入编号", trigger: "blur" },
          { type:"number", message: "账号必须数字类型", trigger:"blur" },
        ],
        disName: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min:1,max:50, message: "账号必须是1到50个字符", trigger:"blur" },
        ],
        disDescription: [
          { required: true, message: "请输入描述", trigger: "blur" },
          { min:1,max:50, message: "账号必须是1到50个字符", trigger:"blur" },
        ],

      },
      modifyFormVisible: false,
      modifyForm:{},
    };
  },
  methods: {
    //点击修改疾病信息
    modifyDisease(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          request
              .get("disease/modifyDisease", {
                params: {
                  disId: this.modifyForm.disId,
                  disName: this.modifyForm.disName,
                  disNumber: this.modifyForm.disNumber,
                  disPrice: this.modifyForm.disPrice,
                  disUnit: this.modifyForm.disUnit,
                  disPublisher: this.modifyForm.disPublisher,

                },
              })
              .then((res) => {
                if(res.data.status !== 200)
                  return this.$message.error("修改信息失败！");
                this.modifyFormVisible = false;
                this.requestDisease();
                this.$message.success("修改疾病信息成功！");
                console.log(res);
              });
        } else {
          console.log("error submit!!");
          return false;
        }
      });

    },
    //打开修改对话框
    modifyDialog(id){
      request.get("disease/findDisease", {
        params: {
          disId: id
        }
      })
          .then(res => {
            if(res.data.status !== 200)
              return this.$message.error("请求数据失败");
            this.modifyForm = res.data.data;
            this.modifyFormVisible = true;
            console.log(res);
          })
    },
    //删除药物操作
    deleteDisease(id){
      request.get("disease/deleteDisease", {
        params: {
          disId: id
        }
      })
          .then(res => {
            this.requestDisease();
            console.log(res);
          })
    },
    //删除对话框
    deleteDialog(id){
      this.$confirm('此操作将删除该药物信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteDisease(id);
        this.$message({

          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    //点击增加确认按钮
    addDisease(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          request
              .get("disease/addDisease", {
                params: {
                  disId: this.addForm.disId,
                  disName: this.addForm.disName,
                  disNumber: this.addForm.disNumber,
                  disPrice: this.addForm.disPrice,
                  disUnit: this.addForm.disUnit,
                  disPublisher: this.addForm.disPublisher,

                },
              })
              .then((res) => {
                if(res.data.status !== 200)
                  return this.$message.error("编号不合法或已被占用！");
                this.addFormVisible = false;
                this.requestDisease();
                this.$message.success("增加医生成功！");
                console.log(res);
              });
        } else {
          console.log("error submit!!");
          return false;
        }
      });

    },
    //页面大小改变时触发
    handleSizeChange(size) {
      this.size = size;
      this.requestDisease();
    },
    //   页码改变时触发
    handleCurrentChange(num) {
      console.log(num);
      this.pageNumber = num;
      this.requestDisease();
    },
    // 加载医生列表
    findAllDisease() {
      request
          .get("disease/findAllDisease", {
            params: {
              pageNumber: this.pageNumber,
              size: this.size,
              query: this.query,
            },
          })
          .then((res) => {
            this.diseaseData = res.data.data.disease;
            this.total = res.data.data.total;
            console.log(res.data.data);
          });
    },
  },
  created() {
    this.requestDisease();
  },
};
</script>
<style scoped lang="scss">
.el-table {
  margin-top: 20px;
  margin-bottom: 20px;
}
.el-form {
  margin-top: 0;
}
</style>