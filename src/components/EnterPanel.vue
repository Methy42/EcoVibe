<template>
    <el-card class="enter-panel" v-loading="props.characterModelLoading">
        <el-divider>
            <el-text>选择一个角色形象</el-text>
        </el-divider>
        <el-radio-group v-model="character" class="content-center" @change="onCharacterChange">
            <el-radio value="Boy" :border="true">Boy</el-radio>
            <el-radio value="Girl" :border="true">Girl</el-radio>
        </el-radio-group>
        <el-divider>
            <el-text>给自己起个名字吧</el-text>
        </el-divider>
        <el-input v-model="name" placeholder="输入你的名称" />
        <el-button type="primary" style="width: 100%;margin-top: 15px;" @click="onLoginClient">登录</el-button>
    </el-card>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { onMounted, ref, defineEmits } from 'vue';

const props = defineProps<{
    characterModelLoaded?: number;
    characterModelLoadTotal?: number;
    characterModelLoading?: boolean;
}>();

const character = ref<'Boy' | 'Girl'>();
const name = ref<string>('');

const emit = defineEmits<{
    'character-change': [value: string];
    'login': [character: "Boy" | "Girl", name: string]
}>();

const onCharacterChange = (value: string) => {
    emit('character-change', value);
}

const onLoginClient = () => {
    if (!character.value) {
        ElMessage.warning('请选择一个角色形象');
        return;
    }
    if (!name.value) {
        ElMessage.warning("请给自己起一个名字");
        return;
    }
    emit('login', character.value, name.value);
};

onMounted(() => { });
</script>
<style scoped>
.enter-panel {
    width: 360px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 20px;
}

.content-center {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>