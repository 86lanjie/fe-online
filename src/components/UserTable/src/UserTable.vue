<script setup lang="ts">
import { ref, watch } from "vue";
import userApi from "../../../api/user";
import { debounce } from "lodash-es";

interface User {
  id: string;
  name: string;
}

const props = withDefaults(
  defineProps<{
    selectOrg: string | number;
  }>(),
  {
    selectOrg: "",
  }
);
// 表格数据
const tableData = ref<User[]>([]);
// 搜索框数据
const tableFilter = ref({
  name: "",
});

// 监听部门id变化
watch(
  () => props.selectOrg,
  async () => {
    try {
      const UserRes = await userApi.query({
        orgId: String(props.selectOrg),
        ...tableFilter.value,
      });

      tableData.value = UserRes;
    } catch (e: any) {
      console.log(e.message || "请求失败");
    }
  },
  {
    immediate: true,
  }
);

// 搜索框输入防抖
const handleFilterChange = debounce(async () => {
  try {
    const UserRes = await userApi.query({
      orgId: String(props.selectOrg),
      ...tableFilter.value,
    });

    tableData.value = UserRes;
  } catch (e: any) {
    console.log(e.message || "请求失败");
  }
}, 500);

// 监听搜索框变化
watch(
  () => tableFilter.value.name,
  () => {
    handleFilterChange();
  }
);
</script>

<template>
  <div>
    <el-input v-model="tableFilter.name" placeholder="请输入用户名称" />

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="Id" width="180" />
      <el-table-column prop="name" label="用户名" />
    </el-table>
  </div>
</template>

<style scoped></style>
