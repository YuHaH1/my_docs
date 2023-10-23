import { watch, ref, Ref, computed, ComputedRef } from 'vue'
interface lastReadInfo {
    currentPath: string
    hash: string
    title: string

}
interface Res {
    storageInfo: Ref<lastReadInfo[] | null>
    gotoLastRead: (item: lastReadInfo) => void
    hasData: ComputedRef<boolean>
    hightLight: (item: lastReadInfo) => string
}
export default function useLastRead(router): Res {
    const lastReadInfo = ref<lastReadInfo>({
        currentPath: '',
        hash: '',
        title: ''
    })
    const storageInfo = ref<lastReadInfo[] | null>(null)
    watch(() => router.currentRoute.value, (newV) => {
        lastReadInfo.value.hash = newV.hash
        lastReadInfo.value.currentPath = newV.path
        lastReadInfo.value.title = newV?.meta?.title || '';
        setLastReadInfo(lastReadInfo)
        storageInfo.value = getStorage()
    }, {
        immediate: true
    })
    function gotoLastRead(item: lastReadInfo) {
        item.currentPath && router.push(item.currentPath + item.hash)
    }
    const hasData = computed(() => storageInfo.value!.length >= 1)
    const hightLight = item => {
        const cur_path = router.currentRoute.value.path
        return computed(() => (item.currentPath === cur_path ? 'high-light' : '')).value;
    };
    return {
        storageInfo,
        gotoLastRead,
        hasData,
        hightLight
    }
}
function setLastReadInfo(lastReadInfo: Ref<lastReadInfo>) {
    if (typeof window === 'undefined') return
    if (lastReadInfo.value.currentPath == '/') return
    const readInfo = getStorage()
    if (!readInfo) {
        localStorage.setItem('lastReadInfo', JSON.stringify([{ ...lastReadInfo.value }]))
    } else {
        if (readInfo?.length > 6) {
            console.log(readInfo?.length)
            readInfo.pop()
        }
        const index = readInfo.findIndex(v => v.currentPath == lastReadInfo.value.currentPath)
        index !== -1 && readInfo.splice(index, 1)
        readInfo.unshift({ ...lastReadInfo.value })
        localStorage.setItem('lastReadInfo', JSON.stringify(readInfo))
    }
}
function getStorage(): lastReadInfo[] {
    if (typeof window === 'undefined') return []
    const value = localStorage.getItem('lastReadInfo')
    const lastReadInfo = value && JSON.parse(localStorage.getItem('lastReadInfo') as string)
    return lastReadInfo
}