---
lang: zh-CN
title: diff
description: 关键功能
collapsible: true
---
# diff

diff算法本质上是为了提升效率，用js计算为代价来减少对DOM的操作。通过比较新旧VNode来尽可能最小化DOM操作来实现最小化性能开销。

key的作用，如果没有key我们就无法知道新子节点和旧子节点的映射关系，就无法知道如何移动节点，有key节点才能知道新旧节点的位置。

源码位置`src/core/vdom/patch.ts`最重要的key和tag是否相同

~~~ts

function sameVnode(a, b) {
  return (
    a.key === b.key &&
    a.asyncFactory === b.asyncFactory &&
    ((a.tag === b.tag &&
      a.isComment === b.isComment &&
      isDef(a.data) === isDef(b.data) &&
      sameInputType(a, b)) ||
      (isTrue(a.isAsyncPlaceholder) && isUndef(b.asyncFactory.error)))
  )
}
~~~





## vue2diff

### 核心思路

DOM的核心就是patch，DOM操作执行速度远不如js的运算速度快。

1. 同级比较
2. 首次渲染不存在oldVnode直接使用vNode创建元素并渲染视图
3. 看两节点是否为同一节点，如果不是直接创建新节点替换旧节点

 * 只有元素、注释和文本节点会被创建并插入到DOM中（如果有tag属性就认为是元素节点，如果没有tag属性就看有没有isComment属性看是否是注释节点如果是注释节点则调用createComment，如果也没有就是文本节点直接通过createTextNode创建文本节点）

4. 如果是同一个节点则判断节点tag和key，比较两个节点属性是否相同（复用老的节点将有差异的属性进行更新 ）

5. 比较属性时例如比较style，如果新旧节点都存在的属性直接复用，新结点上不存在的就删掉

6. 然后比较子节点，看是否都存在子节点，

  * 如果老节点没子，新节点有直接插入

  * 如果老节点有子，新节点没子直接删除

  * ## **如果都存在子节点继续DIFF算法**

    * 为了提高性能，采用双指针方法，四种对比方式（1.新前与旧前 2.新后与旧后 3.新后与旧前 4.新前与旧后）首先准备四个变量oldStartIndex、oldEndIndex、newStartIndex和newEndIndex。在循环体内每处理一个节点就将下标朝一个方向移动一次，开始位置索引向后，结尾位置索引向前，**当开始位置元素索引大于等于结束位置的时候，说明所有节点都遍历过了，则结束循环，这样保证了循环体内的元素都是未处理元素**。

      * 循环条件

      * ~~~js
        while(oldStartIndex<=oldEndIndex && newStartIndex<=newEndIndex)
        ~~~

        * 当newChildren或oldChildren有一个循环完毕就结束循环，目的是为了提高性能找出差异即可，如果oldChildren先循环完，那么newChildren还有节点未处理，说明需要新增newChildren中剩余未处理节点
        * 如果newChildren先循环完，oldChildren还剩余未处理节点说明oldChildren中的节点是废弃节点需要删除，这样做的好处是避免了多次循环
        * 如何判断oldChildren先循环完还是newChildren先循环结束？ **当oldChildren的oldStartIndex<oldEndIndex说明新节点还有未处理的需要新增。当newStartIndex<newEndIndex说明oldChildren剩余未处理节点要删除**

    * 先新前与旧前指针进行比较

      * ![](/Vue/diff4.png)
      * 如果同一个节点则直接复用也不需要移动位置，然后两个指针都向后移动，
      * 如果不是则新后与旧后比较

    * 新后与旧后

      * ![](/Vue/diff3.png)
      * 如果是同一节点直接复用，执行更新操作不需要移动位置，然后指针向前移。
      * 如果不是则新后与旧前

    * 新后与旧前

      * ![](/Vue/diff2.png)
      * 如果是同一节点则需要移动节点，将旧前位置的节点移动到所有**未处理节点之前**（不能移动到已处理节点之后，因为顺序会错乱下一个如果也是新后旧前同一节点，插入到已处理的后面就会导致上一个节点成了最后面的了，**因此应该插入到未处理节点之后**）
      * 如果不是同一节点则新前与旧后

    * 新前与旧后

      * ![](/Vue/diff1.png)
      * 如果是同一节点，则需要将旧后移动到所有未处理节点之前。

    * 大部分通过前四部就可以找到相同节点去复用，因此可以节省很多次循环，如果一个节点经过前四部依然没找到，则再循环旧节点看有无能复用的。

~~~js

function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
            var oldStartIdx = 0;
            var newStartIdx = 0;
            var oldEndIdx = oldCh.length - 1;
            var oldStartVnode = oldCh[0];
            var oldEndVnode = oldCh[oldEndIdx];
            var newEndIdx = newCh.length - 1;
            var newStartVnode = newCh[0];
            var newEndVnode = newCh[newEndIdx];
            var oldKeyToIdx, idxInOld, vnodeToMove, refElm;
            // removeOnly is a special flag used only by <transition-group>
            // to ensure removed elements stay in correct relative positions
            // during leaving transitions
            var canMove = !removeOnly;
            {
                checkDuplicateKeys(newCh);
            }
            while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
                if (isUndef(oldStartVnode)) {//旧开始是否为空，空则取下一个旧开始
                    oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
                }
                else if (isUndef(oldEndVnode)) {//旧结束是否为空，空则取下一个旧结束
                    oldEndVnode = oldCh[--oldEndIdx];
                }
                else if (sameVnode(oldStartVnode, newStartVnode)) {//比对旧开始和新开始是否为同一节点，同一节点则patch
                    patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
                    oldStartVnode = oldCh[++oldStartIdx];
                    newStartVnode = newCh[++newStartIdx];
                }
                else if (sameVnode(oldEndVnode, newEndVnode)) {//对比旧后和新后
                    patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
                    oldEndVnode = oldCh[--oldEndIdx];
                    newEndVnode = newCh[--newEndIdx];
                }
                else if (sameVnode(oldStartVnode, newEndVnode)) {//对比旧前和新后
                    // Vnode moved right
                    patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
                    canMove &&
                        nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
                    oldStartVnode = oldCh[++oldStartIdx];
                    newEndVnode = newCh[--newEndIdx];
                }
                else if (sameVnode(oldEndVnode, newStartVnode)) {//旧后和新前
                    // Vnode moved left
                    patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
                    canMove &&
                        nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
                    oldEndVnode = oldCh[--oldEndIdx];
                    newStartVnode = newCh[++newStartIdx];
                }
                else {
                    if (isUndef(oldKeyToIdx))
                        oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
                    idxInOld = isDef(newStartVnode.key)
                        ? oldKeyToIdx[newStartVnode.key]
                        : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
                    if (isUndef(idxInOld)) {
                        // New element
                        createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
                    }
                    else {
                        vnodeToMove = oldCh[idxInOld];
                        if (sameVnode(vnodeToMove, newStartVnode)) {
                            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
                            oldCh[idxInOld] = undefined;
                            canMove &&
                                nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
                        }
                        else {
                            // same key but different element. treat as new element
                            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
                        }
                    }
                    newStartVnode = newCh[++newStartIdx];
                }
            }
            if (oldStartIdx > oldEndIdx) {//旧的遍历完说明，新的节点还没处理完则需要新增没处理完的
                refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
                addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
            }
            else if (newStartIdx > newEndIdx) {//新的遍历完，旧的还没处理完，则删除旧的
                removeVnodes(oldCh, oldStartIdx, oldEndIdx);
            }
        }

//比较是否是同一个节点
    function sameVnode(a, b) {
        return (a.key === b.key &&
            a.asyncFactory === b.asyncFactory &&
            ((a.tag === b.tag &&
                a.isComment === b.isComment &&
                isDef(a.data) === isDef(b.data) &&
                sameInputType(a, b)) ||
                (isTrue(a.isAsyncPlaceholder) && isUndef(b.asyncFactory.error))));
    }
~~~





## Vue3diff

Vue3快速diff借鉴了纯文本diff的思路，也就是前后缀比较

* **首尾比较：**先新前和旧前相比较，如果节点相同就patch，然后继续比较直到遇到不同的结束循环,然后开始新后和旧后相比，遇到不同的循环终止

  * ~~~js
    // 头比：新前和旧前
    let j = 0
    let oldVNode = oldChildren[j]
    let newVNode = newChildren[j]
    while(oldVNode.key === newVNode.key){
        patch(oldVNode,newVNode,container)
        j++
        oldVNode = oldChildren[j]
        newVNode = newChildren[j]
    }
    // 尾比：新后和旧后
    let oldEnd = oldChildren.length-1
    let newEnd = newChildren.length-1
    let oldVNode =  oldChildren[oldEnd]
    let newVNode =  oldChildren[newEnd]
    ~~~

* 遍历完成后，如果出现`j>oldEnd && j<=newEnd`也就是说旧节点处理完了，新节点还有未处理的，此时在`newEnd+1`位置新增。

* 遍历完成后，如果出现`j>newdEnd && j<=oldEnd`也就是说新节点处理完了，旧节点还有未处理的，此时删除`j-oldEnd`之间的旧节点。

* **乱序：**除上面以外的情况就是出现乱序情况了。

  * ~~~js
    if(j>oldEnd && j<=newEnd){}else if(j>newdEnd && j<=oldEnd){} else{
            // 处理非理想情况下的代码
    }
    ~~~

* 对于乱序情况，先初始化一个值全部为-1的数组，长度为新的子节点中的未处理节点数量,这个数组是为了后续求最长递增子序列。

  * ~~~js
    const source = new Array(newEnd - j + 1).fill(-1)
    ~~~

* 然后初始化后将<u>该数组存储新节点在结点中的索引位置，如果旧节点中不存在该节点意味着是新增节点值仍为-1</u>。**为了避免双重循环采用一个对象作为索引表**

  * ~~~js
    const oldStart = j
    const newStart = j
    const keyIndex = {}
    // 遍历新节点,将新节点的key作为keyIndex的键，新节点的索引位置作为keyIndex的值
    for(let i = newStart;i<=newEnd;i++){
        keyIndex[newChildren[i].key] = i
    }
    // 遍历旧节点，通过旧节点的key就能在keyIndex中找到映射
    for(let i = oldStart;i<oldEnd;i++){
        const oldVNode = oldChildren[i]
        const oldKey = oldVNode.key
        // 找到旧节点中 新节点的位置
        const k = keyIndex[oldKey]
        //
        if(typeof k !=='undefined'){
              
        }else{
          //新节点中不存在该节点 直接卸载  
             unmount(oldVnode)
        }
    }
    ~~~

  * ![](/Vue/diff.jpg)

* 新增`move` 和 `pos` 变量。前者初始化为`fasle`，后者代表需要移动节点的位置初始化为`0`。以及`patched`表示已经更新过节点的数量。（已经更新过的节点数量应该小于新的子节点中需要更新的数量，否则说明存在多余节点要卸载）

  * ~~~js
    const oldStart = j
    const newStart = j
    const keyIndex = {}
    // 遍历新节点,将新节点的key作为keyIndex的键，新节点的索引位置作为keyIndex的值
    let move = false
    let pos = 0
    for(let i = newStart;i<=newEnd;i++){
        keyIndex[newChildren[i].key] = i
    }
    let patched = 0 // 代表更新过节点数量
    // 遍历旧节点，通过旧节点的key就能在keyIndex中找到映射
    for(let i = oldStart;i<oldEnd;i++){
        if(patched <= count){
             const oldVNode = oldChildren[i]
        	const oldKey = oldVNode.key
        	// 找到旧节点中 新节点的位置
        	const k = keyIndex[oldKey]
        	//
        	if(typeof k !=='undefined'){
              	newVNode = newChildren[k]
            	patch(oldVNode,newVNode,container)
            	patched++
                // source中的-1 变成了 i也就是老节点中的位置
            	source[k - newStart] = i
                if(k<pos){
                    moved = true
                }else{
    				pos = k
                }
        	}else{
          		//新节点中不存在该节点 直接卸载  
            	unmount(oldVnode)
        	}	
        }
      
    }
    ~~~

  * source中的-1 变成了 i也就是老节点中的位置

* 当move为true就意味要移动元素开始最长递增子序列。这个子序列的元素意味着不需要移动位置。（该子序列存放的是source递增子序列元素的下标）

  * ~~~js
    if(move){
        // 求子序列
        const seq = lis(sources)
        // s指向最长递增子序列的最后一个元素
        let s = seq.length-1
        // i指向新子节点的最后一个元素
        let i =count -1
        for(i ;i>=0;i--){
             //说明不在递增子序列内部，需要移动
            if(i!==seq[s]){
               //查看节点在source中的值是否为-1，-1就说明是新增节点
                if(source[i]===-1){
                    // 对于p7节点，i = 3 + 1 = 4
                    const pos = i + newStart
                }else{
                    //当发现source[i]!=-1,也就是可复用
                }
            }else{
                //说明是不需要移动的元素
                s--
            }
        }
    }
    ~~~

  * ![](/Vue/diff2.jpg)

* 当需要移动时，查看节点在source中的值是否为-1，-1就说明是新增节点

  * ~~~js
    if(source[i]===-1){
          // 对于p7节点，i = 3 + 1 = 4
          const pos = i + newStart
          const newVNode = newChildren[pos]
          const nextPos = pos+1
          const anchor = nextPos<newChildren,length ? newChildren[nextPos].el : null
        	patch(null,newVNode,container,anchor)
    }else if(i !== seq[j]){
    }else{
        
    }
    ~~~

* 如果source[i]!==-1，-1就说明是可复用节点需要移动

  * ~~~js
    if(source[i]===-1){}else if(i !== seq[j]){
        const pos = i+newStart
        const newVNode = newChildren[pos]
        const nextPos = pos+1
        const anchor = nextPos<newChildren,length ? newChildren[nextPos].el : null
        patch(null,newVNode,container,anchor)
        insert(newVNode.el,container,anchor)
    }else{
        
    }
    ~~~

* 其他情况就是i ===  seq[j]也就是该节点在子序列里不需要移动只需要s-=1即可

  * ~~~js
    if(source[i]===-1){}else if(i !== seq[j]){}else{
        s--
    }
    ~~~
































<CommentService/>