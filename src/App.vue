<script setup lang="ts">
import {ref} from "vue";
import OrgTree from "./components/OrgTree/index";
import UserTable from "./components/UserTable/index";

const selectOrg = ref(0)

const onOrgTreeSelect = (data: any) => {
  selectOrg.value = data.id;
};

</script>

<template>
  <div>
    <el-row :gutter="20">
      <!-- 左侧部门树 -->
      <el-col :span="4" :xs="24">
        <OrgTree @node-click="onOrgTreeSelect"/>
      </el-col>
      <!-- 右侧用户表格 -->
      <el-col :span="20" :xs="24">
        <UserTable :selectOrg="selectOrg"/>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped></style>
