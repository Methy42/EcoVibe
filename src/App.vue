<template>
    <div ref="containerDiv" class="container"></div>

    <EnterPanel v-if="isEnterPanelVisible" :character-model-loaded="characterModelLoaded"
        :character-model-load-total="characterModelTotal" :character-model-loading="enterPanelLoading"
        @character-change="onEnterPanelCharacterChange" @login="onEnterPanelLogin" />
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import EnterPanel from './components/EnterPanel.vue';
import { Scene } from './game/Scene';
import { EnterPanelCharacterChangeEvent, SceneControlCharacterModelLoadCompleteEvent, SceneControlCharacterModelLoadProgressEvent, SocketErrorEvent, SocketPlayerLoginEvent, store } from './store';
import { Socket } from './socket/Socket';
import { ElMessage } from 'element-plus';

const containerDiv = ref<HTMLDivElement>();

const isEnterPanelVisible = ref<boolean>(true);

const enterPanelLoading = ref<boolean>();
const characterModelLoaded = ref<number>();
const characterModelTotal = ref<number>();

const onEnterPanelCharacterChange = (value: string) => {
    enterPanelLoading.value = true;
    store.eventBus.dispatchEvent(new MessageEvent(EnterPanelCharacterChangeEvent, { data: value }));
};

const onEnterPanelLogin = (character: string, name: string) => {
    enterPanelLoading.value = true;
    store.socket = new Socket({ character, name });
}

store.eventBus.addEventListener(SceneControlCharacterModelLoadProgressEvent, (event) => {
    characterModelLoaded.value = (event as any).data.loaded;
    characterModelTotal.value = (event as any).data.total;
});

store.eventBus.addEventListener(SceneControlCharacterModelLoadCompleteEvent, () => {
    enterPanelLoading.value = false;
});

store.eventBus.addEventListener(SocketPlayerLoginEvent, () => {
    enterPanelLoading.value = false;
    isEnterPanelVisible.value = false;
});

store.eventBus.addEventListener(SocketErrorEvent, (event: any) => {
    ElMessage.error(event.data.message);

    if (event.data.type === 'login') {
        store.token = "";
        store.playerId = undefined;
        store.playerName = "";

        enterPanelLoading.value = false;
        isEnterPanelVisible.value = true;
    }
});

onMounted(() => {
    store.gameScene = new Scene({ cantainer: containerDiv.value! });

    if (store.token) {
        enterPanelLoading.value = true;

        store.socket = new Socket({ token: store.token });
    }
});
</script>
<style scoped>
.container {
    width: 100vw;
    height: 100vh;
}
</style>
