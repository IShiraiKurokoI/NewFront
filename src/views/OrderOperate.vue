<template>
<div>
  <el-card>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/orderOperate' }">科室选择</el-breadcrumb-item>
  <el-breadcrumb-item>日期选择</el-breadcrumb-item>
  <el-breadcrumb-item>挂号</el-breadcrumb-item>
</el-breadcrumb>
    <!-- <span>科室门诊</span> -->
    <el-divider></el-divider>
    <span>内科</span>
    <ul>
      <li v-for="inter in inters" :key="inter">
        <el-link type="primary" @click="sectionClick(inter)">{{ inter }}</el-link>
      </li>
    </ul>
    <el-divider></el-divider>
    <span>外科</span>
    <ul>
      <li v-for="out in outs" :key="out">
        <el-link type="primary" @click="sectionClick(out)">{{ out }}</el-link>
      </li>
    </ul>
    <el-divider></el-divider>
    <span>妇产科</span>
    <ul>
      <li v-for="woman in women" :key="woman">
        <el-link type="primary" @click="sectionClick(woman)">{{ woman }}</el-link>
      </li>
    </ul>
    <el-divider></el-divider>
    <span>儿科</span>
    <ul>
      <li v-for="kid in kids" :key="kid">
        <el-link type="primary" @click="sectionClick(kid)">{{ kid }}</el-link>
      </li>
    </ul>
    <el-divider></el-divider>
    <span>五官科</span>
    <ul>
      <li v-for="five in fives" :key="five">
        <el-link type="primary" @click="sectionClick(five)">{{ five }}</el-link>
      </li>
    </ul>
    <el-divider></el-divider>
    <span>中医科</span>
    <ul>
      <li v-for="chinese in chineses" :key="chinese">
        <el-link type="primary" @click="sectionClick(chinese)">{{ chinese }}</el-link>
      </li>
    </ul>
    <el-divider></el-divider>
    <span>其他</span>
    <ul>
      <li v-for="orther in orthers" :key="orther">
        <el-link type="primary" @click="sectionClick(orther)">{{ orther }}</el-link>
      </li>
    </ul>
    <el-divider></el-divider>
  </el-card>
  </div>
</template>
<script>
export default {
  name: "orderOperate",
  data() {
    return {
      inters: [
        "神经内科",
        "呼吸与危重症医学科",
        "内分泌科",
        "消化内科",
        "心血管内科",
        "肾内科",
        "发热门诊",
      ],
      outs: [
        "手足外科",
        "普通外科",
        "肛肠外科",
        "神经外科",
        "泌尿外科",
        "骨科",
        "烧伤整形外科",
      ],
      women: ["妇科", "产科"],
      kids: ["儿科", "儿童保健科"],
      fives: ["耳鼻咽喉科", "眼科", "口腔科"],
      chineses: ["中医科"],
      orthers: ["康复医学科", "急诊科", "皮肤性病科", "功能科"],
    };
  },
  methods: {
    //点击科室
    sectionClick(sectionOpt){
      this.$router.push({path: '/sectionMessage?sectionOpt=' + sectionOpt});

    }
  },
};
</script>
<style scoped lang="scss">
ul li {
  display: inline;
  padding: 60px;
};
.el-breadcrumb{
  margin:8px;
}
</style>