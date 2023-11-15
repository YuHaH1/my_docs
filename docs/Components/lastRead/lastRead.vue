<template>
    <div class="container" ref="containerRef">
        <span class="des">
            {{ hasData ? '最近浏览' : '暂无记录' }}
            <span class="arrow down"></span>
        </span>

        <div class="rencent-content-container" ref="contentRef">
            <div class="rencent-content" v-for="item in storageInfo">
                <span class="min_screen_tip"
                    ><em>{{ item.title + item.hash }}</em>
                </span>
                <div :class="['content', hightLight(item)]" @click.self="gotoLastRead(item)">
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
import {ref} from 'vue';
import {useRouteLocale} from '@vuepress/client';
import {useRouter} from 'vue-router';
import useLastRead from './composables/useLRU';
import useDrag from './composables/useDrag';
const router = useRouter();
const routeLocale = useRouteLocale();
const {storageInfo, gotoLastRead, hasData, hightLight} = useLastRead(router);
const containerRef = ref<HTMLElement>();
const contentRef = ref<HTMLElement>();
const drag = useDrag(containerRef);
</script>

<style lang="scss" scoped>
.container {
    --container-width: 8rem;
    --container-height: 3rem;
    position: fixed;
    z-index: 100;
    left: var(--sidebar-width);
    color: #2c3e50;
    top: 0.3rem;
    font-weight: 800;
    background-color: #fdf3b3;
    width: var(--container-width);
    height: var(--container-height);
    line-height: var(--container-height);
    border-radius: 0.5rem;
    text-align: center;
    .arrow {
        display: inline-block;
        width: 0;
        height: 0;
        vertical-align: middle;
        margin-top: -1px;
        margin-left: 0.3rem;
        .down {
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
            border-top: 6px solid var(--c-bg-arrow);
        }
    }
    &:hover .rencent-content-container {
        opacity: 1;
        visibility: visible;
        height: 19rem;
    }
    .rencent-content-container {
        height: 0;
        transition: all 0.3s linear;
        opacity: 0;
        visibility: hidden;
        .rencent-content {
            width: 100%;
            .content {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .min_screen_tip {
                display: none;
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
@media only screen and (max-width: 760px) {
    .container {
        border-radius: 50%;
        width: 4rem;
        left: 8rem;
        font-size: 12px;

        .des {
            text-wrap: nowrap;
            text-overflow: clip;
            overflow: hidden;
            width: 100%;
            display: inline-block;
        }
        .content {
            padding: 0 0.5rem;
        }
        .rencent-content {
            position: relative;
            &:hover .min_screen_tip {
                display: block !important;
            }
            .min_screen_tip {
                em {
                    display: flex;
                    height: 100%;
                    justify-content: center;
                    align-items: center;
                }
                width: fit-content;
                height: 80%;
                left: 80%;
                right: -50rem;
                display: block;
                top: -50%;
                background-color: #b2b2b2;
                position: absolute;
                font-size: 12px;
                border-radius: 0.8rem;
                &::after {
                    position: absolute;
                    content: '';
                    border-left: 5px solid transparent;
                    border-right: 5px solid transparent;
                    border-top: 8px solid #b2b2b2;
                    left: -4px;
                    bottom: -2px;
                    transform: rotate(45deg);
                }
            }
        }
    }
}
</style>
