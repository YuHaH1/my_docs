function longestConsecutive(nums: number[]): number {
    // 做一个哈希表来   然后遍历数组并计算value+1是否存在如果存在将哈希表对应key的值++
    const map: Record<number, {index:number,value:number}> = {}
    if(!nums.length ) return 0
    nums.forEach((v, i) => {
        map[v] = {
            index: i,
            value:0
        }
    })
    let result = 0
    for (let i = 0; i < nums.length;) { 
        const currentValue = nums[i]
        const consecutiveValue = currentValue + 1
        if (map[consecutiveValue]!==undefined) {
            result++
            i = map[consecutiveValue].index
            map[consecutiveValue].value = result 
        } else {
            result = 0
        }
    }
    const values = Object.values(map).map(v=>v.value)
    return Math.max(...values)
};


console.log(longestConsecutive([100,4,200,1,3,2]))