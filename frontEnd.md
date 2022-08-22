<!--
 * @Author: QIANMINGLIANG
 * @Date: 2022-04-22 13:14:33
 * @Description: 开发笔记
-->
   <!-- ! 红色的高亮注释 -->
   <!-- ? 蓝色的高亮注释 -->
   <!-- * 绿色的高亮注释 -->
   <!-- todo 橙色的高亮注释 -->
 <!-- // 灰色带删除线的注释 -->

# ts 逻辑运算符 & | ?? ?. !

& 合并类型
在 TypeScript 中交叉类型是将多个类型合并为一个类型。通过 & 运算符可以将现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。
| 联合类型
在 TypeScript 中联合类型（Union Types）表示取值可以为多种类型中的一种，联合类型使用 | 分隔每个类型

?? 空值合并操作符 只有左侧为 undefined 和 null 时才会返回后者 代替|| （应为||判断时会将左侧转成布尔值再判断无法规避 false 0 NaN 等情况,||运算符完美替代者）
?. 可选链操作符 访问属性或者方法时 null 和 undefined 的情况下不会报错 返回值为 undefined
变量！
a! ==>非空断言操作符 断言变量 a 为非 null 和 undefined，躲过类型检查器
!a 变量取反，转为 boolean
!!a 变量取反再取反 === 变量转为 boolean 值
**js 逻辑运算符**
`if(a > 10) { doSomething(a) } === a > 10 && doSomething(a)`

<!-- const sayHello = (name: string | undefined) => { /_ ... _/ }; -->

# Omit Partial Readonly

<!-- 2022_4_22 -->

**Omit<type/interface,key > 干掉类型中个别 key ==> type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>**
Partial<type/interface>将类型所有属性变为可选
Readonly<type/interface>将类型所有属性变为只读状态

# animation

<!-- 2022_4_24 -->

CSS animation 属性是 animation-name，animation-duration, animation-timing-function，animation-delay，animation-iteration-count，animation-direction，animation-fill-mode 和 animation-play-state 属性的一个简写属性形式。

<!-- /* @keyframes duration | timing-function | delay |
   iteration-count | direction | fill-mode | play-state | name */ -->

animation: 3s ease-in 1s 2 reverse both paused slidein;

<!-- /* @keyframes duration | timing-function | delay | name */ -->

animation: 3s linear 1s slidein;

<!-- /* @keyframes duration | name */ -->

animation: 3s slidein;

# Promise

<!-- 2022_4_27 -->

**Promise.resolve()与 new Promise(r => r(v))**
Promise.all([]).then().catch() all 仅接受 promise 数组 数组所有 promise 执行成功或者某一个执行失败 promise.all 本身作为一个 promise 则会触发,promise 数组没有先后执行顺序

<!-- Promise.all 实际上是一个 promise，它将一组 promise 作为输入（可迭代）。然后，当所有 promise 都执行或其中任何一个执行失败时，它就会执行。 -->

Promise.race([]).then().catch() race()接受参数与 all 相同 返回最先执行完毕返回结果的 promise 不管成功或者失败
非空断言符
非空断言操作符会从变量中移除 undefined 和 null。只需在变量后面添加一个 ! 即可。忽略变量的 undefined | null;类似可选链操作
**手写 promise**
https://blog.csdn.net/m0_52409770/article/details/123446776

<!-- !   函数柯里化？？？ -->

css 全局作用域(:global)和局部作用域（:local） css 默认局部作用域(:local) 全局作用域可跳过 webpack 打包 css_module 化 作用于其他组件

# unit32Array 获取随机 key

<!-- 2022_4_29  -->
<!-- 获取随机key -->

    function getUuid() {
      var arr = new Uint32Array(1);
      window.crypto.getRandomValues(arr);
      return arr[0];
    }

# 事件行为 stopImmediatePropagation()

<!-- 2022_5_5 -->
<!-- event.stopImmediatePropagation -->

如果多个事件监听器被附加到相同元素的相同事件类型上，当此事件触发时，它们会按其被添加的顺序被调用。如果在其中一个事件监听器中执行 stopImmediatePropagation() ，那么剩下的事件监听器都不会被调用。

# 字符串操作方法

<!-- todo 字符串常用方法 -->

1.charAt() 返回指定索引位置处的字符。类似于数组用中括号获取相应下标位置的数据。

<!-- var str = 'abcdefg'
console.log(str.charAt(2)) // 输出 'c'
console.log(str[2]) // 输出 'c' -->

2.indexOf()、lastIndexOf() indexOf,返回一个字符在字符串中首次出现的位置,lastIndexOf 返回一个字符在字符串中最后一次出现的位置。找不到返回-1

<!-- const str = 'abcdcefcg'
console.log(str.indexOf('c')) // 输出 '2'
console.log(str.lastIndexOf('c')) // 输出 '7' -->

3.slice() 提取字符串的片断，并把提取的字符串作为新的字符串返回出来。原字符串不变。

<!-- const str = 'abcdefg'
console.log(str.slice()) // 输出 'abcdefg', 不传递参数默认复制整个字符串
console.log(str.slice(1)) // 输出 'bcdefg',传递一个，则为提取的起点，然后到字符串结尾
console.log(str.slice(2, str.length-1)) // 输出'cdef',传递两个，为提取的起始点和结束点 -->

4.split() 使用指定的分隔符将一个字符串拆分为多个子字符串数组并返回，原字符串不变。

<!-- const str = 'A*B*C*D*E*F*G'
console.log(str.split('*')) // 输出 ["A", "B", "C", "D", "E", "F", "G"] -->

5.substr(index,length), substring(index,lastindex)

<!-- 这两个方法的功能都是截取一个字符串的片段，并返回截取的字符串。
substr和substring这两个方法不同的地方就在于参数二，substr的参数二是截取返回出来的这个字符串指定的长度，substring的参数二是截取返回这个字符串的结束点，并且不包含这个结束点。而它们的参数一，都是一样的功能，截取的起始位置。 -->
<!--! 注意事项：substr的参数二如果为0或者负数，则返回一个空字符串，如果未填入，则会截取到字符串的结尾去。substring的参数一和参数二为NAN或者负数，那么它将被替换为0。 -->
<!-- const str = 'ABCDEFGHIJKLMN'
console.log(str.substr(2))  // 输出 'CDEFGHIJKLMN'
console.log(str.substring(2)) // 输出 'CDEFGHIJKLMN'
console.log(str.substr(2, 9))  // 输出 'CDEFGHIJK'
console.log(str.substring(2, 9))  // 输出 'CDEFGHI' -->

6.match() match()方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配，并返回一个包含该搜索结果的数组。

<!-- const str = '2018年结束了，2019年开始了，2020年就也不远了'
const reg = /\d+/g  // 这里是定义匹配规则，匹配字符串里的1到多个数字
console.log(str.match(reg))  // 输出符合匹配规则的内容，以数组形式返回 ['2018', '2019', '2020']
console.log(str.match('20'))  // 不使用正则 ['20', index: 0, input: '2018年结束了，2019年开始了，2020年就也不远了', groups: undefined] -->
<!--! 注意事项:如果match方法没有找到匹配，将返回null。如果找到匹配，则 match方法会把匹配到以数组形式返回，如果正则规则未设置全局修饰符g，则 match方法返回的数组有两个特性：input和index。input属性包含整个被搜索的字符串。index属性包含了在整个被搜索字符串中匹配的子字符串的位置。 -->

7.replace()
replace 接收两个参数，参数一是需要替换掉的字符或者一个正则的匹配规则，参数二，需要替换进去的字符，在实际的原理当中，参数二，你可以换成一个回调函数。

<!-- const str = '2018年结束了，2019年开始了，2020年就也不远了'
const rex = /\d+/g  // 这里是定义匹配规则，匹配字符串里的1到多个数字
const str1 = str.replace(rex, '****')
console.log(str1) // 输出："****年结束了，****年开始了,****年也不远了"
const str2 = str.replace(rex, function(item){
    console.log(arguments)  可拿到匹配到的内容和索引值
    const arr = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
    let newStr = ''
    item.split('').map(function(i){
            newStr += arr[i]
    })
    return newStr
})
console.log(str2) // 输出：贰零壹捌年结束了，贰零壹玖年开始了,贰零贰零年也不远了 -->

8.search() 在目标字符串中搜索与正则规则相匹配的字符，搜索到，则返回第一个匹配项在目标字符串当中的位置，没有搜索到则返回一个-1。

<!-- const str = '2018年结束了，2019年开始了，2020年就也不远了'
const reg = /\d+/i  // 这里是定义匹配规则,匹配字符串里的1到多个数字
console.log(str.search(reg)) // 输出 0  这里搜索到的第一项是从位置0开始的 -->

9.toLowerCase(),toUpperCase()

<!-- toLowerCase把字母转换成小写，toUpperCase()则是把字母转换成大写。 -->

10.includes(), startsWith(), endsWith()

<!-- includes、startsWith、endsWith，es6的新增方法，includes 用来检测目标字符串对象是否包含某个字符，返回一个布尔值，startsWith用来检测当前字符是否是目标字符串的起始部分，相对的endwith是用来检测是否是目标字符串的结尾部分。 -->

# 数组操作方法

**2022_5_9**

<!-- todo 数组常用方法 -->

**push** 在尾部追加，类似于压栈，原数组会变。
**pop** 在尾部弹出，类似于出栈，原数组会变。数组的 push & pop 可以模拟常见数据结构之一：栈。
**unshift** 在头部压入数据，类似于入队，原数组会变。
**shift** 在头部弹出数据，原数组会变。数组的 push（入队） & shift（出队） 可以模拟常见数据结构之一：队列。
**find()**
该方法根据检索条件，找到数组中第一个满足条件的元素，若找不到则返回 undefined
const arr = [1,5,3,22,6]
arr.find(item=>item>5) //22
**findIndex()**
该方法与 find() 类似根据检索条件，不同的是该方法返回的是索引
**concat()**  
方法在一个数组后面拼接新的元素，可接收 n 个参数，参数可以是任意数据类型，如果是数组，则将数组跟原数组拼接，如果是其他数据类型，则将该元素添加到原数组后面
该方法**不改变原数组**，会返回拼接好的新数组，因此可以 执行 链式操作

<!-- const arr = [1, 2, 3]
const arr2 = arr.concat([7, 8, 9])
console.log(arr) // [1, 2, 3]
console.log(arr2) // [1, 2, 3, 7, 8, 9] -->

**indexOf()** 在数组中寻找该值，找到则返回其下标，找不到则返回-1。

<!-- const arr = [1, 2, 3]
console.log(arr.indexOf(2)) // 1
console.log(arr.indexOf(0)) // -1 -->

**includes()** 在数组中寻找该值，找到则返回 true，找不到则返回 false。

<!-- const arr = [1, 2, 3]
console.log(arr.includes(2)) // true
console.log(arr.includes(4)) // false -->

**join()** 将数组转化成字符串，并返回该字符串，不传值则默认逗号隔开，**_原数组不变。_**

<!-- const arr = [1, 2, 3]
console.log(arr.join()) // ‘1, 2, 3’
console.log(arr) // [1, 2, 3] -->

**reverse()** 翻转原数组，并返回已完成翻转的数组，原数组改变。

<!-- const arr = [1, 2, 3]
console.log(arr.reverse()) // [3, 2, 1]
console.log(arr) // [3, 2, 1] -->

**slice(start，end)** 从 start 开始截取到 end，但是不包括 end,**_原数组不变_**

<!-- const arr = [1, 2, 3, 4, 5]
console.log(arr.slice(1, 4)) // [2, 3, 4]
console.log(arr) // [1, 2, 3, 4, 5] -->

**splice(start, deleteCount, item1, item2……)**

<!-- start参数 开始的位置——索引值位置 包括索引值
deleteCount要截取(删除)的个数
后面的items为要添加的元素
如果deleteCount为0，则表示不删除元素，从start位置开始添加后面的几个元素到原始的数组里面。
返回值为由被删除的元素组成的一个数组。如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组。
这个方法会改变原始数组，数组的长度会发生变化 -->

**sort()**

<!-- 对数组的元素进行排序，并返回数组。
默认排序顺序是在将元素转换为字符串，然后比较它们的UTF-16代码单元值序列时构建的。
由于它取决于具体实现，因此无法保证排序的时间和空间复杂性。 -->

回调函数返回值为 true 则交换 a,b 位置

<!-- const arr = [1, 2, 3]
arr.sort((a, b) => b - a)
console.log(arr) // [3, 2, 1] -->

**toString()** 将数组转化成字符串，并返回该字符串，逗号隔开，原数组不变。

<!-- const arr = [1, 2, 3, 4, 5]
console.log(arr.toString()) // ‘1, 2, 3, 4, 5’
console.log(arr) // [1, 2, 3, 4, 5] -->

**fill**

`const array = Array(6).fill(''); // ['', '', '', '', '', ''] `
`Array(6).fill() //[undefined, undefined, undefined, undefined, undefined, undefined]`

# 数组循环方法

**break,continue,return**
continue -> 在循环体中跳出本次迭代 进行下一轮迭代
break -> 跳出循环体 函数继续执行
return —> 返回函数结果 跳出函数体
https://blog.csdn.net/XXJ19950917/article/details/78310346

while() / do while()
while(条件){
执行...
}

---

do{
执行...
}
while(条件)
forEach() 拷贝一份遍历原数组。操作会修改原数组
return 无法终止循环。不过可以起到 continue 效果。
本身是不支持的 continue 与 break 语句的我们可以通过 some 和 every 来实现。

<!-- const arr = [5,1,3,7,4]
arr.forEach((item, index) => {
    if (item < 2) return
    console.log(`索引：${index}，数值：${item}`)
    arr[5] = 0
})
console.log(arr)
 打印结果：
 索引：0，数值：5
 索引：2，数值：3
 索引：3，数值：7
 索引：4，数值：4
 [5, 1, 3, 7, 4, 0] -->

for...in for...in 是 ES5 标准，

 <!-- ! 此方法遍历数组效率低，主要是用来循环遍历对象的属性。 -->

遍历数组的缺点：数组的下标 index 值是数字，for-in 遍历的 index 值"0","1","2"等是字符串。
Object.defineProperty 建立的属性，默认不可枚举。

<!-- const foo = {
    name: 'bar',
    sex: 'male'
}
Object.defineProperty(foo, "age", { value : 18 })
for(const key in foo){
    console.log(`可枚举属性：${key}`)
}
console.log(`age属性：${foo.age}`)
 打印结果：
 可枚举属性：name
 可枚举属性：sex
 age属性：18 -->

for...of for…of 是 ES6 新增的方法，但是 for…of 不能去遍历普通的对象，**for…of 的好处是可以使用 break 跳出循环。**

 <!-- 与forEach()不同的是，它可以正确响应break、continue和return语句 -->
 <!-- for-of循环不仅支持数组，还支持大多数类数组对象，例如DOM NodeList对象。 -->
 <!-- ! for...in 和 for...of 区别？ -->

**1 for…in 用于可枚举数据，如对象、数组、字符串**
**2 for…of 用于可迭代数据，如数组、字符串、Map、Set**

<!--! 对象不可迭代 -->

==>迭代\_枚举
数组、字符串、Map、Set 都属于可迭代数据格式
[枚举和迭代概念](#枚举和迭代)

every / some
返回一个布尔值。当我们需要判定数组中的元素是否满足某些条件时，可以使用 every / some。这两个的区别是，every 会去判断判断数组中的每一项，而 some 则是当某一项满足条件时返回。 不会改变原数组
**every**

<!-- const foo = [5,1,3,7,4].every((item, index) => {
    console.log(`索引：${index}，数值：${item}`)
    return item > 2
})
console.log(foo)
 every 打印：
 索引：0，数值：5
 索引：1，数值：1
 false -->

**some**

 <!-- const foo = [5,1,3,7,4].some((item, index) => {
    console.log(`索引：${index}，数值：${item}`)
    return item > 2
})
console.log(foo)
 some 打印：
 索引：0，数值：5
 true -->

**filter()**
可接受三个参数 item,index,oldarr
filter 方法用于过滤数组成员，满足条件的成员组成一个新数组返回。
它的参数是一个函数，所有数组成员依次执行该函数，返回结果为 true 的成员组成一个新数组返回。

  <!-- !该方法不会改变原数组。 -->
  <!-- const foo = [5,1,3,7,4].filter((item,index) => {
    console.log(`索引：${index}，数值：${item}`)
    return item > 2
  })
  console.log(foo)
    打印结果：
    索引：0，数值：5
    索引：1，数值：1
    索引：2，数值：3
    索引：3，数值：7
    索引：4，数值：4
    [5, 3, 7, 4] -->

map()
map 即是 “映射”的意思 ，原数组被“映射”成对应新数组。 ==>拷贝\_映射
map：支持 return，相当与原数组克隆了一份，把克隆的每项改变了，也不影响原数组。

<!-- const foo = [5,1,3,7,4].map((item,index) => {
    console.log(`索引：${index}，数值：${item}`)
    return item + 2
})
console.log(foo)
  打印结果：
  索引：0，数值：5
  索引：1，数值：1
  索引：2，数值：3
  索引：3，数值：7
  索引：4，数值：4
  [7, 3, 5, 9, 6] -->

reduce() / reduceRight() 累加器
reduce 从左到右将数组元素做“叠加”处理，返回一个值。reduceRight 从右到左。 不会改变原数组

  <!-- const foo = [5,1,3,7,4].reduce((total, cur) => {
    console.log(`叠加：${total}，当前：${cur}`)
    return total + cur
})
console.log(foo)
  打印结果：
  叠加：5，当前：1
  叠加：6，当前：3
  叠加：9，当前：7
  叠加：16，当前：4
  20 -->

Object,keys 遍历对象的属性
Object.keys 方法的参数是一个对象，返回一个数组。该数组的成员都是该对象自身的（而不是继承的）所有属性名，且只返回可枚举的属性。
https://titangene.github.io/article/javascript-object-keys-values-entries.html
https://zh.javascript.info/keys-values-entries

  <!-- const obj = {
  p1: 123,
  p2: 456
};
Object.keys(obj) ["p1", "p2"] -->

Object.values(obj)
Object.entries(obj)

Object.getOwnPropertyNames() 遍历对象的属性
Object.getOwnPropertyNames 方法与 Object.keys 类似，也是接受一个对象作为参数，返回一个数组，包含了该对象自身的所有属性名。但它能返回不可枚举的属性。

<!-- const arr = ['Hello', 'World'];
Object.keys(arr) // ["0", "1"]
Object.getOwnPropertyNames(arr) // ["0", "1", "length"] -->

一：map()，forEach()，filter()循环的共同之处：
1.forEach，map，filter 循环中途是无法停止的，总是会将所有成员遍历完。 2.他们都可以接受第二个参数，用来绑定回调函数内部的 this 变量，将回调函数内部的 this 对象，指向第二个参数，间接操作这个参数（一般是数组）。

二：map()、filter()循环和 forEach()循环的不同：
forEach 循环没有返回值；map，filter 循环有返回值。

三：map()和 filter()都会跳过空位，for 和 while 不会

四：some()和 every():
some()只要有一个是 true，便返回 true；而 every()只要有一个是 false，便返回 false.

五：reduce()，reduceRight()：
reduce 是从左到右处理（从第一个成员到最后一个成员），reduceRight 则是从右到左（从最后一个成员到第一个成员）。

六：Object 对象的两个遍历 Object.keys 与 Object.getOwnPropertyNames：
他们都是遍历对象的属性，也是接受一个对象作为参数，返回一个数组，包含了该对象自身的所有属性名。但 Object.keys 不能返回不可枚举的属性；Object.getOwnPropertyNames 能返回不可枚举的属性。
复制代码

# 算法注解

<!-- 刷算法题必备的数学考点汇总 -->

https://zhuanlan.zhihu.com/p/301338035

<!-- 前端算法题解 -->

https://leetcode-solution-leetcode-pp.gitbook.io/leetcode-solution/thinkings/linked-list

<!-- 补充： -->

uselayoutefft and useeffect
https://zhuanlan.zhihu.com/p/348701319

# 树形结构解析

(function (window, undefined) {
var treeNodes = [
{
id: 1,
name: '1',
children: [
{
id: 11,
name: '11',
children: [
{
id: 111,
name: '111',
children: []
},
{
id: 112,
name: '112'
}
]
},
{
id: 12,
name: '12',
children: []
}
],
users: []
},
{
id: 2,
name: '2',
children: [
{
id: 22,
name: '22',
children: []
}
]
}
];

    //递归实现
    var parseTreeJson = function (treeNodes) {
        if (!treeNodes || !treeNodes.length) return;

        for (var i = 0, len = treeNodes.length; i < len; i++) {

            var childs = treeNodes[i].children;

            console.log(treeNodes[i].id);

            if (childs && childs.length > 0) {
                parseTreeJson(childs);
            }
        }
    };

    console.log('------------- 递归实现 ------------------');
    parseTreeJson(treeNodes);

    //非递归广度优先实现
    var iterator1 = function (treeNodes) {
        if (!treeNodes || !treeNodes.length) return;

        var stack = [];

        //先将第一层节点放入栈
        for (var i = 0, len = treeNodes.length; i < len; i++) {
            stack.push(treeNodes[i]);
        }

        var item;

        while (stack.length) {
            item = stack.shift();

            console.log(item.id);

            //如果该节点有子节点，继续添加进入栈底
            if (item.children && item.children.length) {
                //len = item.children.length;

                // for (i = 0; i < len; i++) {
                //  stack.push(item.children[i]);
                // }

                stack = stack.concat(item.children);
            }
        }
    };

    console.log('------------- 非递归广度优先实现 ------------------');
    iterator1(treeNodes);

    //非递归深度优先实现
    var iterator2 = function (treeNodes) {
        if (!treeNodes || !treeNodes.length) return;

        var stack = [];

        //先将第一层节点放入栈
        for (var i = 0, len = treeNodes.length; i < len; i++) {
            stack.push(treeNodes[i]);
        }

        var item;

        while (stack.length) {
            item = stack.shift();

            console.log(item.id);

            //如果该节点有子节点，继续添加进入栈顶
            if (item.children && item.children.length) {
                // len = item.children.length;

                // for (; len; len--) {
                //  stack.unshift(item.children[len - 1]);
                // }
                stack = item.children.concat(stack);
            }
        }
    };

    console.log('------------- 非递归深度优先实现 ------------------');
    iterator2(treeNodes);

})(window);

链接：https://juejin.cn/post/6844903986823200776

# 防抖和节流 throttle（节流）与 debounce（防抖）

https://www.cnblogs.com/dreamsqin/p/11305028.html

# CSS

**grid 布局**

height: calc(100vh - 150px);

CSS_grid 布局

<!-- 号称最强大的css布局 -->

https://juejin.cn/post/6854573220306255880

**css 重绘优化**
**fix 绝对定位使用 transform: translateZ(0);开启 gpu 优化避免多次渲染卡顿**
https://segmentfault.com/a/1190000000490328

**css 伪类**

:active
::after/:after
::backdrop (experimental)
::before/:before
:checked
:default
:dir (experimental)
:disabled
:empty
:enabled
:first-child
::first-letter/:first-letter
::first-line/:first-line
:first-of-type
:focus
:fullscreen (experimental)
:hover
:in-range
:indeterminate
:invalid
:lang
:last-child
:last-of-type
:link
:not
:nth-child
:nth-last-child
:nth-last-of-type
:nth-of-type
:only-child
:only-of-type
:optional
:out-of-range
::placeholder (experimental)
:read-only
:read-write
:required
:root
::selection
:scope (experimental)
:target
:valid
:visited
Bonus content: A Sass mixin for links

1. :link
   :link 伪类表示链接的正常状态，选择那些尚未被点过的链接。建议在其他链接相关的伪类之前声明:link，它们的顺序为：:link、:visited、:hover、:active。
2. :visited
   :visited 伪类选择点过的链接，应该声明在第二位（在:link 之后）。
3. :hover
   :hover 伪类在用户指针悬停时生效。而且它不只可以用于链接。
4. :active
   :active 伪类选择被鼠标指针或触摸操作“激活的” 元素，也可以通过键盘来激活，就像:focus 伪类一样。
   与:focus 类似，但区别在于:active 只发生在鼠标被按下到被释放的这段时间里。
5. :focus
   :focus 用于选择已经通过指针设备、触摸或键盘获得焦点的元素，在表单里使用得非常多。

_结构化伪类_
:first-child 伪类选择父元素的第一个子元素。
:last-child 伪类选择父元素的最后一个子元素。
:not 伪类也叫取反伪类，它通过括号接受一个参数，一个“选择符”。实际上，这个参数也可以是另一个伪类。

_验证伪类_
:checked
:checked 伪类选择被勾选或选中的单选按钮、多选按钮及列表选项。
:disabled 伪类选择禁用状态的表单元素。处于禁用状态的元素，不能被选中、勾选，不能获得焦点。
:invalid 伪类选择输入格式不符合要求的表单元素。
input[type=email]:invalid {
background: orange;
}

**css 变量**

https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties
声明一个 css 变量，属性名需要以两个减号（--）开始，属性值则可以是任何有效的 CSS 值。和其他属性一样，自定义属性也是写在规则集之内的，如下：

<!-- :root 根伪类 -->

:root {
--main-bg-color: brown;
}

.one {
color: white;
background-color: var(--main-bg-color);
margin: 10px;
width: 50px;
height: 50px;
display: inline-block;
}
.two {
color: var(--my-var, red); /_ Red if --my-var is not defined _/
}
**获取一个 Dom 节点上的 CSS 变量**
element.style.getPropertyValue("--my-var");

**获取任意 Dom 节点上的 CSS 变量**
getComputedStyle(element).getPropertyValue("--my-var");

**修改一个 Dom 节点上的 CSS 变量**
element.style.setProperty("--my-var", jsVar + 4);

**css 瀑布流**
https://juejin.cn/post/7014650146000470053

# react_hooks 总结

**2022_5_12**
状态 usestate
redux useReducer
副作用 useEffect-->uselayoutEffect ->react 函数式组件的函数体中，网络请求，模块订阅以及 DOM 操作都属与 _副作用_
上下文 useContext
记忆 useMemo-->useCallback
引用 useRef-->useImperativeHandle
自定义 hook

<!--? 新增 useEvent -->

**useEffect 和 useState**

 <!-- usestate 默认值在组件创建时生效
 const [datalist, setdatalist] = useState([...(dataSource ?? [])]); -->

**2022_5_11**
react 18 Automatic batching 使用 setState 来进行 dispatch 组件 State 变化，当 setState 在组件被调用后，并不会立即触发重新渲染。React 会执行全部事件处理函数，然后触发一个单独的 re-render，合并所有更新。

`ReactDOM.flushSync(() => { setCount((c) => c + 1); // 立刻重渲染 setFlag((f) => !f); // 立刻重渲染 });`

组件每次渲染时传入的引用类型都会重新开辟一个全新的引用地址
浅层比较数据变化 对于对象和数组类的引用类型数据，数据一样但地址不同都会触发重复渲染
**useRef**
深层次比较 是跨渲染周期缓存数据。缓存上一次渲染的数据，并调用深比较方法判断，如果两个对象相等则返回上一次的数据，地址自然也没有变化。
**useImperativeHandle 和 forwardRef**
建议 useImperativeHandle 和 forwardRef 同时使用，减少暴露给父组件的属性
forwardref 与泛型组件搭配使用-->

<!-- react.forwardRef 高阶组件包裹的组件无法传递泛型参数 -->

https://juejin.cn/post/7081460215085793310

https://fettblog.eu/typescript-react-generic-forward-refs/
**useEffect 和 useLayoutEffect**
useEffect 是异步执行的，而 useLayoutEffect 是同步执行的。
**useEvent**
缓存相同函数引用，同时不会产生闭包，依然可以取到最新的 state
https://juejin.cn/post/7094186419500875812

`useLayoutEffect:是在所有DOM变更之后浏览器渲染之前调用，既同步调用 副作用会阻塞代码阻塞页面加载 useEffect:是在组件渲染到屏幕之后执行，既异步调用`

useEffect 的执行时机是浏览器完成渲染之后，而 useLayoutEffect 的执行时机是浏览器把内容真正渲染到界面之前，和 componentDidMount 等价。
**useMemo 和 useCallback**

<!-- 2022_4_26 -->

useMemo
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
当 a 和 b 不变时，computeExpensiveValue(a, b)的返回值不会重新计算。

<!-- 把“创建”函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。 -->

useCallback
useCallback(() => {
setCount2(count2 + 1);
}, [count2]);
其实第二个参数和 useEffect 的效果一样；
当我们不传入第二个参数的时候，所有的状态改变都会触发 useCallback 重新返回一个新的缓存函数；
当我们你传入一个空数组的时候，所有状态的改变都不会触发 useCallback 重新返回一个新的缓存函数；
当我们传入一个数组，并且数组中有变量的时候，只有这个变量状态改变才会触发 useCallback 重新返回一个新的缓存函数；
————————————————
原文链接：https://blog.csdn.net/qq_43291759/article/details/121834809

<!-- 返回一个函数，只有在依赖项发生变化的时候才会更新（返回一个新的函数）。 -->
<!--todo 简单理解呢 useCallback 与 useMemo 一个缓存的是函数，一个缓存的是函数的返回值。useCallback 是来优化子组件的，防止子组件的重复渲染。useMemo 可以优化当前组件也可以优化子组件，优化当前组件主要是通过 memoize 来将一些复杂的计算逻辑进行缓存。-->
<!-- useCallback和useMemo的参数跟useEffect一致，他们之间最大的区别有是useEffect会用于处理副作用，而前两个hooks不能。
useMemo和useCallback都会在组件第一次渲染的时候执行，之后会在其依赖的变量发生改变时再次执行；并且这两个hooks都返回缓存的值，useMemo返回缓存的变量，useCallback返回缓存的函数。 -->

1. useCallback(fn, deps)相当于 useMemo( () => fn, deps)。
2. 可以把 useMemo 当作性能优化的手段，但不要把他当成语义上的保证。
3. React.memo 仅作为性能优化的方式存在，不要依赖它来阻止重新渲染，这会产生 bug。
4. useMemo 缓存变量，useCallback 缓存函数。 使用场景: 组件缓存
   https://juejin.cn/post/7039216773710741535

**useContext**

<!-- 2022_4_25 -->

useContext createContext 创建数据变量，子组件通过 useContext 导入

<!-- createContext 能够创建一个 React 的 上下文（context），然后订阅了这个上下文的组件中，可以拿到上下文中提供的数据或者其他信息。 使用 useContext 获取上下文 -->

https://segmentfault.com/a/1190000039200472

# File、Blob、ArrayBuffer 等文件类的对象有什么区别和联系

Blob 是一种二进制对象(包括字符，文件等等)，es6 对其进行了补充
File 是基于 Blob 的一种二进制文件对象,扩展了 Blob，es6 同样进行了补充
ArrayBuffer 是 ES6 新引入的二进制缓冲区
Buffer 是 Nodejs 内置的二进制缓冲区，Buffer 相当于 ES6 中 Uint8Array(属于 TypedArray)的一种扩展

除非您需要编写/编辑的能力（使用 ArrayBuffer），否则 Blob 格式可能是最好的。
https://nibes.cn/blog/21263

# 正则表达式使用指南

https://mp.weixin.qq.com/s/gTSdWDew1-JPsssFd_gkug

# react 开发工具类

<!-- 组件跳转 -->

click-to-component

<!-- 页面切换动画效果 -->

react-page-transition
https://mp.weixin.qq.com/s/9NFB1uNqNWiARbmUdWrBWQ

# React Hook 重复渲染问题处理：useMemo, memo, useCallback

`2022.5.24`
为什么会存在重复渲染？
**这是因为 react hook 使用的是函数组件，父组件的任何一次修改，都会导致子组件的函数执行，从而重新进行渲染**

1. 父组件没有 props 传入子组件 props --- 使用 React.memo 即可
   先简单介绍一下这个方法：
   React.memo 为高阶组件。它与 React.PureComponent 非常相似。默认只会对复杂类型对象做浅层比较，如果需要控制对比过程我们可以将比较函数作为第二个参数传入。React.memo(MyComp, areEqual)
   areEqual（第二个比较回调函数）返回值为 true 则使用缓存 false 则重复渲染

` function areEqual(prevProps, nextProps) { /* 如果把 nextProps 传入 render 方法的返回结果与 将 prevProps 传入 render 方法的返回结果一致则返回 true， 否则返回 false */ }`

2. 父组件传入子组件的 props 都是简单数据类型 --- 使用 React.memo 即可
   由于上面说的 React.memo 会默认进行浅层比较，使用 React.memo 包裹的子组件，会浅层比对传入的 props 是否有变化。简单数值类型，浅层对比即可判断是否发生了变化。如果传入的 props 没有变化，则使用缓存的子组件，如果传入的 props 发生变化，则组件会重新渲染。问题解决～
3. 父组件传入子组件的 props 存在复杂数据类型 --- 使用 memo, useMemo, useCallback
   我们通过 props 向子组件传值时，可能需要传入复杂类型如 object，以及 function 类型的值。而 memo 子组件进行渲染比对时进行的是浅比较，即使我们传入相同的 object 或 function，子组件也会认为传入参数存在修改，从而子组件重新进行渲染。这个时候仅仅使用 memo 包裹子组件应该没办法解决问题了，是时候用上我们的 useCallback 以及 useMemo 了。

# 打包工具 vite esbuild

**esbuild**
基于 go 开发 作用：
加载器
压缩
打包
Tree shaking
Source map 生成
将 JSX 和较新的 JS 语法移植到 ES6
虽然打包工具用的各不相同，有 vite、webpack、Rollup，但最终都用到了 esbuild 打包。
**vite**
构建工具 使用 esbuild 构建
Vite，一个基于浏览器原生 ES imports 的开发服务器。利用浏览器去解析 imports，在服务器端按需编译返回，完全跳过了打包这个概念
快速冷启动服务器
即时热模块更换（HMR）
真正的按需编译

# Jenkins 部署

https://juejin.cn/post/7102360505313918983

# Set Map WeakSet WeakMap

_ES6 新增_
**set**
类似与数组 只有值没有建名，所有的值都是唯一的，没有重复（类似对象 key 不可以重复）
set 本身是一个构造函数，用来生成 set 数据结构
可用作数组去重 [... new set(array)]

# 枚举和迭代

**可枚举的属性**
可枚举对象的一个定义特征是，当我们通过赋值运算符将属性赋值给对象时，js 将内部可枚举标志（enumerable）设置为 true。这是默认值。但是，我们可以通过将其设置为 false 来更改此行为。

```

const users = {}
users.languages = 'JavaScript'

Object.getOwnPropertyDescriptor(users, 'languages')
// output -> { value: 'JavaScript', writable: true, enumerable: true, configurable: true }

// 在循环中对我们使用的属性进行更多的控制
Object.defineProperty(users, 'role', { value: 'Admin', writable: true, enumerable: false })

for (const item in users) {
console.log(item) // languages 没有输出 users 的 role 属性，因为它是不可迭代属性 enumerable:false
}

```

**基本上，在 JavaScript 中，所有可迭代对象都是可枚举对象，但并非所有可枚举对象都是可迭代对象。**
**_?如果一个对象定义了它的迭代行为，那么它是可迭代的。_**

<!--! 所有可迭代对象都是可枚举对象 -->

for in -->遍历 数据的可枚举属性(key)
for of -->遍历 数据的可迭代属性(value)

<!-- for...in 查找数据中的对象，而 for...of 查找重复序列r -->

**可迭代的内置类型包括 Array、String、Set 和 Map ,对象不可迭代，因为它没有指定 @iterator 迭代方法。**

<!-- 可迭代对象 Iterable  -->

https://zh.javascript.info/iterable

```

const languages = ['JavaScript', 'Python', 'Go']

// 与 for...in 循环一起使用
for (const language in languages) {
console.log(language)
}
// output
// 0
// 1
// 2

// 与 for...of 循环一起使用
for (const language of languages) {
console.log(language)
}
// output -> JavaScript Python Go

```

# react 自定义 hooks

https://juejin.cn/post/6844904074433789959#heading-5

```

```

# ts 中箭头函数用泛型表示,5 种方法

https://www.codeleading.com/article/14625764044/

# lodash 源码解析

**假值:例如 false, null,0, "", undefined, 和 NaN 都是被认为是“假值==false”。**
if(value) 可以判断是否为假值 value 会被隐式性转换为 true 或 false

# Git

**submodule**
git submodule update 更新子模块 默认 submodule 的 HEAD 处于游离分支
**clone**
git clone -b 想要拉取的分支名(branch) xxx(URL) 文件名(省略为原名)
-b 为 --branch 缩写