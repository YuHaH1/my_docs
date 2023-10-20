import {watch,ref,computed  } from 'vue'
interface lastReadInfo{
    currentPath:string
    isChildrenDir:boolean
    title:string
}
interface Res{
    storageInfo:lastReadInfo[]
    gotoLastRead:()=>void
    hightLight:()=>boolean
}
export default function useLastRead(router):Res{
   
    const lastReadInfo = ref<lastReadInfo>({
        currentPath:'',
        isChildrenDir:false,
        childrenDir:'',
        title:''
    })
    const storageInfo = ref(null)
    
    function gotoLastRead(item){
        item.currentPath && router.push(item.currentPath)
    }
    const hightLight = item => {
        return computed(() => (item.currentPath === router.currentRoute.value.fullPath ? 'high-light' : '')).value;
    };

        watch(()=>router.currentRoute.value,(newV)=>{
        const childData = newV.fullPath.split('#')
        lastReadInfo.value.isChildrenDir = childData.length>1
        lastReadInfo.value.currentPath = newV.fullPath
        lastReadInfo.value.title = newV?.meta?.title || '';
        setLastReadInfo(lastReadInfo)
        storageInfo.value = getStorage()
        },{
            immediate: true
        })

    return {
        storageInfo,
        gotoLastRead,
        hightLight
    }
}
function setLastReadInfo(lastReadInfo:lastReadInfo){
    if(lastReadInfo.value.currentPath=='/') return 
    const readInfo = getStorage()
    if(readInfo?.length===6){
        readInfo.pop()
    }
    if (typeof window == "undefined") {
        return
    }
    if(!readInfo){
        localStorage.setItem('lastReadInfo',JSON.stringify([{...lastReadInfo.value}]))
    }else{
        const noRepeat = readInfo.every(v=>v.currentPath !==lastReadInfo.value.currentPath)
        if(noRepeat){
            readInfo.unshift({...lastReadInfo.value})
            localStorage.setItem('lastReadInfo',JSON.stringify(readInfo))
        }
    }
}
function getStorage():lastReadInfo[]{
    if (typeof window == "undefined") {
        return
    }
    const value = localStorage.getItem('lastReadInfo')
    const lastReadInfo = value && JSON.parse(localStorage.getItem('lastReadInfo'))
    return lastReadInfo
}