import { type Ref, onMounted, onUnmounted, ref } from 'vue'
export default function useDrag(containerRef: Ref<HTMLElement>, contentRef?: Ref<HTMLElement | null>) {
    let move = false
    let x, y
    const containerHeight = ref(0), containerWidth = ref(0)



    function mouseDownHandle(e) {

        if (e.target.classList[0] === 'content') {
            return
        }
        e.stopPropagation();
        [x, y, containerHeight.value, containerWidth.value] = [e.offsetX, e.offsetY, containerRef.value?.offsetHeight, containerRef.value?.offsetWidth]
        move = true
        document.addEventListener('mousemove', mouseMoveHandle)
        document.addEventListener('mouseup', mouseUpHandle)
    }
    function mouseMoveHandle(e) {

        e.stopPropagation();
        // 剩余留白空间
        const restHeight = window.innerHeight - containerHeight.value
        const restWidth = window.innerWidth - containerWidth.value
        // 鼠标位置和盒子边界之间的距离
        let div_top = e.clientY - y
        let div_left = e.clientX - x
        // Math.max(0, div_top)取盒子在视口内的值，如果div_top为负数就取值0 Math.min(Math.max(0, div_top), restHeight)//最大边界不超过restHeight
        let containerTop = Math.min(Math.max(0, div_top), restHeight), containerLeft = Math.min(Math.max(0, div_left), restWidth)
        if (move) {
            containerRef.value!.style.left = containerLeft + 'px'
            containerRef.value!.style.top = containerTop + 'px'
        }
    }
    function mouseUpHandle(e) {

        move = false
    }
    onMounted(() => {
        containerRef.value?.addEventListener('mousedown', mouseDownHandle, true)
    })
    onUnmounted(() => {
        containerRef.value?.removeEventListener('mousedown', mouseDownHandle)
        document.removeEventListener('mousemove', mouseMoveHandle)
        document.removeEventListener('mouseup', mouseUpHandle)
    })


}

