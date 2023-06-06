---
lang: zh-CN
title: js实现效果
description: 关键功能
collapsible: true
---
# js实现效果

## 取色器

::: tip

  `const ctx = canvas.getContext('2d',{willReadFrequently:true});`在大多数设备上，用户代理需要决定是将画布的输出位图存储在GPU(也称为“硬件加速”)上，还是存储在CPU(也称为“软件”)上。大多数渲染操作对于加速画布来说性能更高，主要的例外是使用`getImageData()、toDataURL()`或`toBlob()`进行回读。`CanvasRenderingContext2D`对象与`will read often = true`告诉用户代理，网页可能会执行许多回读操作，并且使用软件画布是有利的。

:::

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

    <input type="file" id="input">
    <div class="color_picker" style="width: 50px; height: 50px; border-radius: 50%; border: 1px solid gray;"></div>
    <canvas class="canvas"></canvas>
    <script>
        const canvas = document.querySelector('.canvas')
        // {willReadFrequently:true}添加后能优化性能 Canvas2D: Multiple readback operations using getImageData are faster with the willReadFrequently attribute set to true. See: https://html.spec.whatwg.org/multipage/canvas.html#concept-canvas-will-read-frequently
        const ctx = canvas.getContext('2d',{willReadFrequently:true});
        const img_ext = ['jpg','png','gif','webp']
        const color_picker = document.querySelector('.color_picker')
        input.addEventListener('change', inputChange)
        function inputChange(e){
            const file = e.target.files[0]
            if(!img_ext.some(v=>file.type.endsWith(v))){
                console.warn('请上传图片')
                return
            }
            const url = URL.createObjectURL(file)
            drawImg(url)
        }
        const drawImg = (imgUrl)=>{
            const img = new Image()
            img.src = imgUrl
            img.onload = ()=>{
                canvas.width = img.width
                canvas.height = img.height
                ctx.drawImage(img,0,0)
            }
        }
        let picking = false
        canvas.addEventListener('mousedown', mousedownHandler)
        canvas.addEventListener('mousemove', mousemoveHandler)
        window.addEventListener('mouseup', ()=>{picking = false})
        function mousedownHandler(){
            picking = true
        }
        function mousemoveHandler(e){
            if(picking){
                const {offsetX, offsetY} = e
                //sx将要被提取的图像数据矩形区域的左上角 x 坐标
                //。sy将要被提取的图像数据矩形区域的左上角 y 坐标。
                //sw将要被提取的图像数据矩形区域的宽度。
                //sh将要被提取的图像数据矩形区域的高度。
                console.log(  ctx.getContextAttributes() )
             
                const imgData = ctx.getImageData(offsetX,offsetY,1,1)
                const [r,g,b,a] = imgData.data
                color_picker.style.backgroundColor = `rgba(${r},${g},${b},${a})`
            }
        }
    </script>
</body>
</html>
~~~



## web视频会议

[RTCPeerConnection](https://developer.mozilla.org/zh-CN/docs/Web/API/RTCPeerConnection)

[Navigator.mediaDevices](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/mediaDevices)



~~~js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <button id="open_camera">开启摄像头</button>
    <button id="share_screen">开启屏幕共享</button>
    <button id="close_volume">关闭麦克风</button>
    <video id="open_video" autoplay></video>
    <video id="share_video" autoplay></video>
    <script>
        const open = document.getElementById("open_camera")
        const share = document.getElementById("share_screen")
        const open_video = document.getElementById("open_video")
        const share_video = document.getElementById("share_video")
        const close_volume = document.getElementById("close_volume")
        let cameraStream = null
        let shareStream = null
        let peerConnection = null 
        const openClickHandler = async (e)=>{
            if(!cameraStream){
                // 获取摄像头的媒体流
                try{
                    const stream = await navigator.mediaDevices.getUserMedia({video:true,audio:true})
                    cameraStream = stream
                    open_video.srcObject = stream
                    open_camera.textContent = '关闭摄像头'
                }catch(err){
                    console.warn(err)
                }
                
            }else{
                cameraStream.getTracks().forEach((track)=>track.stop())
                cameraStream = null
                open_video.srcObject = null
                open_camera.textContent = '开启摄像头'
            }
            console.log(cameraStream)
        }
        const shareClickHandler = async (e)=>{
            if(!shareStream){
                try {
                    peerConnection = new RTCPeerConnection()
                    const stream = await navigator.mediaDevices.getDisplayMedia({video:true})
                    shareStream = stream
                    // 监听停止事件
                    shareStream.getVideoTracks()[0].onended = ()=>{
                        console.log('关闭屏幕共享')
                    }
                    // 获取轨道
                    const screenTrack = shareStream.getVideoTracks()[0]
                    // 将轨道添加到RTCpeerConnect
                    peerConnection.addTrack(screenTrack)
                    console.log(shareStream.getVideoTracks().filter(v=>v.kind === 'audio'))
                    share_video.srcObject = shareStream
                    // 监听ICE候选事件
                    peerConnection.onicecandidate = e=>{
                        if(e.candidate){
                            // 这里一般通过websocker将e.candidate发送给服务端
                            // console.log(e.candidate)
                            // sendIceCandidate(e.candidate)
                        }
                    }
                    share.textContent = '关闭屏幕共享'
                    // 创建offer并设置本地描述
                    const offer = await peerConnection.createOffer()
                    peerConnection.setLocalDescription(offer)
                } catch (error) {
                    console.warn(error)
                }
            }else{
                shareStream = null
                peerConnection = null
                share_video.srcObject = null
                share.textContent = '开启屏幕共享'
            }
        }
        open.addEventListener("click", openClickHandler)
        share.addEventListener("click", shareClickHandler)
        
        close_volume.addEventListener("click", ()=>{
            if(cameraStream){
                const audioTrack = cameraStream.getAudioTracks()[0];
                audioTrack.enabled = !audioTrack.enabled;
                close_volume.textContent = audioTrack.enabled? '关闭麦克风':'开启麦克风'
            }
        })
    </script>
</body>
</html>
~~~























<CommentService/>