<script setup lang="ts">
import { onMounted, ref } from "vue";
import orgApi from "../../../api/org";
import type Node from "element-plus/es/components/tree/src/model/node";
import { ElMessage } from "element-plus";

interface Tree {
  id: string;
  name: string;
  children?: Tree[];
}

const emits = defineEmits(['node-click']);

const data = ref<Tree[]>();

// 点击节点
const handleNodeClick = (data: Tree) => {
  emits("node-click", data);
};

// 加载节点
const loadNode = async (node: Node, resolve: (data: Tree[]) => void) => {
  try {
    const orgInfo = await orgApi.query(String(node.id));
    resolve(orgInfo);
  } catch (e: any) {
    ElMessage.error(e.message || "请求失败");
  }
};
// 默认属性
const defaultProps = {
  children: "children",
  label: "name",
};

onMounted(async () => {
  try {
    const orgInfo = await orgApi.query();
    data.value = orgInfo;
  } catch (e: any) {
    ElMessage.error(e.message || "请求失败");
  }
});

</script>

<template>
  <div>
    <el-tree
      style="max-width: 600px"
      :data="data"
      :props="defaultProps"
      :lazy="true"
      :load="loadNode"
      @node-click="handleNodeClick"
    />
  </div>
</template>

<style scoped></style>
