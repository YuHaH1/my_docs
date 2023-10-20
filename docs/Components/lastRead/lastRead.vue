<template>
    <div class="container">
        最近浏览记录<span class="arrow down"></span>
        <div class="rencent-content-container">
            <div class="rencent-content" v-for="item in storageInfo">
                <div :class="['content', hightLight(item)]" @click="gotoLastRead(item)">
                    {{ item.title }}
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
export default {
    name: 'lastRead'
};
</script>
<script setup lang="ts">
import {useRouteLocale} from '@vuepress/client';
import {computed, defineComponent, h, ref, toRefs} from 'vue';
import {useRouter} from 'vue-router';
import useLastRead from './composables/useLRU';
const router = useRouter();
const routeLocale = useRouteLocale();

const {storageInfo, gotoLastRead} = useLastRead(router, routeLocale);
const hightLight = item => {
    return computed(() => (item.currentPath === router.currentRoute.value.fullPath ? 'high-light' : '')).value;
};
</script>

<style lang="scss" scoped>
.container {
    --container-width: 8rem;
    --container-height: 3rem;
    position: fixed;
    z-index: 100;
    left: 17%;
    color: #2c3e50;
    top: 0.3rem;
    font-weight: 800;
    background-color: #fdf3b3;
    width: var(--container-width);
    height: var(--container-height);
    line-height: var(--container-height);
    border-radius: 0.5rem;
    text-align: center;
    transition: all 0.5s linear;
    .arrow {
        display: inline-block;
        width: 0;
        height: 0;
        vertical-align: middle;
        margin-top: -1px;
        margin-left: 0.4rem;
        .down {
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
            border-top: 6px solid var(--c-bg-arrow);
        }
    }
    &:hover .rencent-content-container {
        opacity: 1;
    }
    .rencent-content-container {
        transition: all 0.3s linear;
        opacity: 0;
        height: 20rem;
        overflow-y: auto;
        .rencent-content {
            width: 100%;

            overflow: hidden;
            .content {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            flex-direction: column;
            background-color: #f2f2f2;
            border-bottom: 1px solid #6fcf97;
            &:hover {
                background-color: #d9d9d9;
            }
        }
    }
    .high-light {
        background-color: #3e4c59;
        color: #fff;
    }
}
</style>
