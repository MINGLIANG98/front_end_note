<!--
 * @Author: QIANMINGLIANG
 * @Date: 2022-04-22 13:14:33
 * @Description: 开发笔记
-->

# 开发笔记

## Typescript

**ts 逻辑运算符 & | ?? ?. !**

& 合并类型
在 TypeScript 中交叉类型是将多个类型合并为一个类型。通过 & 运算符可以将现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。
| 联合类型
在 TypeScript 中联合类型（Union Types）表示取值可以为多种类型中的一种，联合类型使用 | 分隔每个类型

?? 空值合并操作符 只有左侧为 undefined 和 null 时才会返回后者 代替|| （应为||判断时会将左侧转成布尔值再判断无法规避 false 0 NaN 等情况,||运算符完美替代者）
?. 可选链操作符 访问属性或者方法时 null 和 undefined 的情况下不会报错 返回值为 undefined
变量！
a! ==>非空断言操作符 断言变量 a 为非 null 和 undefined，躲过类型检查器
!a 变量取反，转为 boolean 注意 a 为 0 的情况 0 的布尔值为 false
!!a 变量取反再取反 === 变量转为 boolean 值
**js 逻辑运算符**
`if(a > 10) { doSomething(a) } === a > 10 && doSomething(a)`

<!-- const sayHello = (name: string | undefined) => { /_ ... _/ }; -->

[15 种 TypeScript 最常用的实用程序类型](https://mp.weixin.qq.com/s/D9VSdIDs3j67t7CzdxvLuw)

**Omit Partial Readonly**
Omit<type/interface,key > 干掉类型中个别 key;

```ts
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

- Partial<type/interface>将类型所有属性变为可选
- Readonly<type/interface>将类型所有属性变为只读状态

**ts 中箭头函数用泛型表示,5 种方法**
todo
<https://www.codeleading.com/article/14625764044/>

**TS interface 类型子属性**
类似于对象变量取值 inteface_name['key_name']

**interface AND type**
常规用法

### 什么时候推荐用 type 什么时候用 interface ？

推荐任何时候都是用 type， type 使用起来更像一个变量，与 interface 相比，type 的特点如下：

表达功能更强大，不局限于 object/class/function
要扩展已有 type 需要创建新 type，不可以重名
支持更复杂的类型操作
基本上所有用 interface 表达的类型都有其等价的 type 表达。在实践的过程中，我们也发现了一种类型只能用 interface 表达，无法用 type 表达，那就是往函数上挂载属性。

```ts
interface FuncWithAttachment {
  (param: string): boolean;
  someProperty: number;
}

const testFunc: FuncWithAttachment = {};
const result = testFunc("mike"); // 有类型提醒
testFunc.someProperty = 3; // 有类型提醒
```

- type 用于定义数据结构
- interface 用于定义组件接口

```ts
interface Type {
  name: string;
  age: number;
}
type ChildType = Type["name"];
```

[typescript 类型联动](https://www.banyudu.com/posts/typescript-related-type.c1623b)

```ts
// 先定义一个类型映射关系
type TvalueMap = {
    multiple: {
        mode: 'combobox' | 'multiple';
        value?: string[];
        onChange?: (value: string[]) => void;
    };
    single: {
        mode?: 'single'| undefined;
        value?: string;
        onChange?: (value: string) => void;
    };
};

type Compoents = {
    [T in keyof TvalueMap]: TvalueMap[T];
}[keyof TvalueMap];
// ===================== 等价
type Compoents = {
    mode: 'combobox' | 'multiple';
    value?: string[] | undefined;
    onChange?: ((value: string[]) => void) | undefined;
} | {
    mode?: 'single';
    value?: string | undefined;
    onChange?: ((value: string) => void) | undefined;
}

```

**typescript 装饰器**
[typescript 5.0新特性](https://mp.weixin.qq.com/s/oPK10hMHvLGltsVk4hudZg)

## animation

<!-- 2022_4_24 -->

CSS animation 属性是 animation-name，animation-duration, animation-timing-function，animation-delay，animation-iteration-count，animation-direction，animation-fill-mode 和 animation-play-state 属性的一个简写属性形式。

<!-- /* @keyframes duration | timing-function | delay |
   iteration-count | direction | fill-mode | play-state | name */ -->

animation: 3s ease-in 1s 2 reverse both paused slidein;

<!-- /* @keyframes duration | timing-function | delay | name */ -->

animation: 3s linear 1s slidein;

<!-- /* @keyframes duration | name */ -->

animation: 3s slidein;

## Promise

**EventLoop 和 微任务 宏任务**
同步执行->微任务->宏任务
按照函数层级执行，每一个层级宏任务，微任务互相对应 按照层级执行
<https://juejin.cn/post/7073099307510923295>
<https://juejin.cn/post/6920239138893627406>

<!-- 2022_4_27 -->

**Promise.resolve()与 new Promise(r => r(v))**
Promise.all([]).then().catch() all 仅接受 promise 数组 数组所有 promise 执行成功或者某一个执行失败 promise.all 本身作为一个 promise 则会触发,promise 数组没有先后执行顺序

<!-- Promise.all 实际上是一个 promise，它将一组 promise 作为输入（可迭代）。然后，当所有 promise 都执行或其中任何一个执行失败时，它就会执行。 -->

Promise.race([]).then().catch() race()接受参数与 all 相同 返回最先执行完毕返回结果的 promise 不管成功或者失败
非空断言符
非空断言操作符会从变量中移除 undefined 和 null。只需在变量后面添加一个 ! 即可。忽略变量的 undefined | null;类似可选链操作
**async await**
async 函数是 Generator 函数的语法糖。使用 关键字 async 来表示，在函数内部使用 await 来表示异步。
接受一个 promise 函数 只有成功 resolve 的结果在会被 await 接受到
<https://juejin.cn/post/6844903621360943118>

**手写 promise**
<https://blog.csdn.net/m0_52409770/article/details/123446776>
<https://juejin.cn/post/6994594642280857630>
<https://juejin.cn/post/6886360224308035598>

### 如何优雅的中断 promise 请求===如何终端一个 fetch 请求

xhr 终端一个请求 xhr 可使用其内置方法 abort 进行终止操作，但是 abort（中止）方法的执行过程不可控
fetch 如何中止

- AbortController 包含 signal 状态和 abort 方法的构造函数

```js
// 方法1--------
// 实例对象 有两个属性  abort 方法中可传递中止的原因（任意js变量）
const ac = new AbortController();
const { signal } = ac;

const resourceUrl = "https://jsonplaceholder.typicode.com/todos/1";
fetch(resourceUrl, { signal })
  .then((response) => response.json())
  .then((json) => console.log(json))
  .catch((err) => {
    // 不同浏览器的返回结果不同
    console.log(err);
  });

// 可以立即终止请求，或者设置一个定时器
// ac.abort();
setTimeout(() => {
  ac.abort();
}, 10);
```

- AbortSignal 有静态方法 abort 和 timeout 这两个方法是 AbortSignal 类上的静态方法，用来创造 AbortSignal 实例。其中 abort 用来创造一个已经被终止的信号对象。我们来看下面的例子

```js
// 方法2--------
// ... 省略 todoRequest 函数的定义
// Safari 暂时不支持， Firefox 和 Chrome 支持
// abort 可以传递终止的原因
// ...
// const abortedAS = AbortSignal.abort({
// type: 'USER_ABORT_ACTION',
// msg: '用户终止了操作'
// });
// ...
const abortedAS = AbortSignal.abort();
// 再发送之前信号终止，请求不会被发送
todoRequest(1, { signal: abortedAS });
console.warn(abortedAS);
```

tip:dom 机制规范 nodejs 环境下均可使用该方法

<https://mp.weixin.qq.com/s/uiWdL3qrCC9cxVBI87wKhA>

<!-- !   函数柯里化？？？ -->

css 全局作用域(:global)和局部作用域（:local） css 默认局部作用域(:local) 全局作用域可跳过 webpack 打包 css_module 化 作用于其他组件

## class 类

### 概念

class 本质上是一个构造函数的语法糖，其底层实际上是通过 构造函数 去创建的。所以它的绝大部分功能，ES5 都可以做到。新的 class 写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已

- this 关键字 代表实例对象
- 类的所有方法都定义在类的 prototype 属性上面。
- 静态方法：在方法前加 static，表示该方法不会被实例继承，而是直接通过类来调用。
- 静态属性：在属性前加 static，指的是 Class 本身的属性，而不是定义在实例对象（this）上的属性。
- constructor 代表构造方法 接受实例化时的传参  
  `tip：constructor 方法是类的默认方法，通过 new 命令生成对象实例时，自动调用该方法。一个类必须有 constructor 方法，如果没有显式定义，一个空的 constructor 方法会被默认添加。`

- 类的 type 为 function，类本身指向构造函数
- static 静态方法
  `tip:类相当于实例的原型，所有在类中定义的方法，都会被实例继承。 如果在一个方法前，加上 static 关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为"静态方法"。`

- `操作符instanceof正是通过探测obj.__proto__.__proto__... === Constructor.prototype来验证obj是否是Constructor的实例`
  [详解 es6 中的 class](https://juejin.cn/post/6844904086089760775)

## unit32Array 获取随机 key

<!-- 2022_4_29  -->

获取随机 key tip:diff 算法框架中不可随意使用 random 等随机数防止组件重新渲染的时候进行不必要的页面重绘（页面抖动等）

```js
function getUuid() {
  var arr = new Uint32Array(1);
  window.crypto.getRandomValues(arr);
  return arr[0];
}
```

## 事件行为 stopImmediatePropagation()

<!-- 2022_5_5 -->
<!-- event.stopImmediatePropagation -->

如果多个事件监听器被附加到相同元素的相同事件类型上，当此事件触发时，它们会按其被添加的顺序被调用。如果在其中一个事件监听器中执行 stopImmediatePropagation() ，那么剩下的事件监听器都不会被调用。

## 字符串操作方法

<!-- todo 字符串常用方法 -->

1.charAt() 返回指定索引位置处的字符。类似于数组用中括号获取相应下标位置的数据。

```js
var str = "abcdefg";
console.log(str.charAt(2)); // 输出 'c'
console.log(str[2]); // 输出 'c'
```

2.indexOf()、lastIndexOf() indexOf,返回一个字符在字符串中首次出现的位置,lastIndexOf 返回一个字符在字符串中最后一次出现的位置。找不到返回-1

````js
const str = "abcdcefcg";
console.log(str.indexOf("c")); // 输出 '2'
console.log(str.lastIndexOf("c")); // 输出 '7'```
````

3.slice() 提取字符串的片断，并把提取的字符串作为新的字符串返回出来。原字符串不变。

```js
const str = "abcdefg";
console.log(str.slice()); // 输出 'abcdefg', 不传递参数默认复制整个字符串
console.log(str.slice(1)); // 输出 'bcdefg',传递一个，则为提取的起点，然后到字符串结尾
console.log(str.slice(2, str.length - 1)); // 输出'cdef',传递两个，为提取的起始点和结束点
```

4.split() 使用指定的分隔符将一个字符串拆分为多个子字符串数组并返回，原字符串不变。

```js
const str = "A*B*C*D*E*F*G";    
console.log(str.split("*")); // 输出 ["A", "B", "C", "D", "E", "F", "G"]
```

5.substr(index,length), substring(index,lastindex)
**不改变原字符串**
这两个方法的功能都是截取一个字符串的片段，并返回截取的字符串。
substr 和 substring 这两个方法不同的地方就在于参数二，substr 的参数二是截取返回出来的这个字符串指定的长度，substring 的参数二是截取返回这个字符串的结束点，并且不包含这个结束点。而它们的参数一，都是一样的功能，截取的起始位置。

<!--! 注意事项：substr的参数二如果为0或者负数，则返回一个空字符串，如果未填入，则会截取到字符串的结尾去。substring的参数一和参数二为NAN或者负数，那么它将被替换为0。 -->

```js
const str = "ABCDEFGHIJKLMN";
console.log(str.substr(2)); // 输出 'CDEFGHIJKLMN'
console.log(str.substring(2)); // 输出 'CDEFGHIJKLMN'
console.log(str.substr(2, 9)); // 输出 'CDEFGHIJK'
console.log(str.substring(2, 9)); // 输出 'CDEFGHI'
```

6.match() match()方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配，并返回一个包含该搜索结果的数组。

```js
const str = '2018年结束了，2019年开始了，2020年就也不远了'
const reg = /\d+/g  // 这里是定义匹配规则，匹配字符串里的1到多个数字
console.log(str.match(reg))  // 输出符合匹配规则的内容，以数组形式返回 ['2018', '2019', '2020']
console.log(str.match('20'))  // 不使用正则 ['20', index: 0, input: '2018年结束了，2019年开始了，2020年就也不远了', groups: undefined]
<!--! 注意事项:如果match方法没有找到匹配，将返回null。如果找到匹配，则 match方法会把匹配到以数组形式返回，如果正则规则未设置全局修饰符g，则 match方法返回的数组有两个特性：input和index。input属性包含整个被搜索的字符串。index属性包含了在整个被搜索字符串中匹配的子字符串的位置。 -->
```

7.replace()
replace 接收两个参数，参数一是需要替换掉的字符或者一个正则的匹配规则，参数二，需要替换进去的字符，在实际的原理当中，参数二，你可以换成一个回调函数。

```js
const str = '2018年结束了，2019年开始了，2020年就也不远了'
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
console.log(str2) // 输出：贰零壹捌年结束了，贰零壹玖年开始了,贰零贰零年也不远了
```

8.search() 在目标字符串中搜索与正则规则相匹配的字符，搜索到，则返回第一个匹配项在目标字符串当中的位置，没有搜索到则返回一个-1。

```js
const str = "2018年结束了，2019年开始了，2020年就也不远了";
const reg = /\d+/i; // 这里是定义匹配规则,匹配字符串里的1到多个数字
console.log(str.search(reg)); // 输出 0  这里搜索到的第一项是从位置0开始的
```

9.toLowerCase(),toUpperCase()
toLowerCase 把字母转换成小写，toUpperCase()则是把字母转换成大写。

10.includes(), startsWith(), endsWith()
includes、startsWith、endsWith，es6 的新增方法，includes 用来检测目标字符串对象是否包含某个字符，返回一个布尔值，startsWith 用来检测当前字符是否是目标字符串的起始部分，相对的 endwith 是用来检测是否是目标字符串的结尾部分。

## 对象操作方法

- **hasOwnProperty** hasOwnProperty() 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）。

```js
const object1 = {};
object1.property1 = 42;

console.log(object1.hasOwnProperty("property1"));
// expected output: true
```

**enteries/keys/values** 指定对象的迭代器 tip：如何遍历对象

## 数组操作方法

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

```js
const arr = [1, 2, 3];
const arr2 = arr.concat([7, 8, 9]);
console.log(arr); // [1, 2, 3]
console.log(arr2); // [1, 2, 3, 7, 8, 9]
```

**indexOf()** 在数组中寻找该值，找到则返回其下标，找不到则返回-1。

```js
const arr = [1, 2, 3];
console.log(arr.indexOf(2)); // 1
console.log(arr.indexOf(0)); // -1
```

**includes()** 在数组中寻找该值，找到则返回 true，找不到则返回 false。

```js
const arr = [1, 2, 3];
console.log(arr.includes(2)); // true
console.log(arr.includes(4)); // false
```

**join()** 将数组转化成字符串，并返回该字符串，不传值则默认逗号隔开，**_原数组不变。_**

```js
const arr = [1, 2, 3];
console.log(arr.join()); // ‘1, 2, 3’
console.log(arr); // [1, 2, 3]
```

**reverse()** 翻转原数组，并返回已完成翻转的数组，原数组改变。

```js
const arr = [1, 2, 3];
console.log(arr.reverse()); // [3, 2, 1]
console.log(arr); // [3, 2, 1]
```

**slice(start，end)** 从 start 开始截取到 end，但是不包括 end,**_原数组不变_**

```js
const arr = [1, 2, 3, 4, 5];
console.log(arr.slice(1, 4)); // [2, 3, 4]
console.log(arr); // [1, 2, 3, 4, 5]
```

**splice(start, deleteCount, item1, item2……)**
start 参数 开始的位置——索引值位置 包括索引值
deleteCount 要截取(删除)的个数
后面的 items 为要添加的元素
如果 deleteCount 为 0，则表示不删除元素，从 start 位置开始添加后面的几个元素到原始的数组里面。
返回值为由被删除的元素组成的一个数组。如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组。
这个方法会改变原始数组，数组的长度会发生变化

**sort()**
对数组的元素进行排序，并返回数组。
默认排序顺序是在将元素转换为字符串，然后比较它们的 UTF-16 代码单元值序列时构建的。
由于它取决于具体实现，因此无法保证排序的时间和空间复杂性。回调函数返回值为 true 则交换 a,b 位置

```js
const arr = [1, 2, 3];
arr.sort((a, b) => b - a);
console.log(arr); // [3, 2, 1]
```

**toString()** 将数组转化成字符串，并返回该字符串，逗号隔开，原数组不变。

```js
const arr = [1, 2, 3, 4, 5];
console.log(arr.toString()); // ‘1, 2, 3, 4, 5’
console.log(arr); // [1, 2, 3, 4, 5]
```

**fill**
todo

```js
const array = Array(6).fill(""); // ['', '', '', '', '', '']
Array(6).fill(); //[undefined, undefined, undefined, undefined, undefined, undefined]
```

## 数组循环方法

**break,continue,return**
continue -> 在循环体中跳出本次迭代 进行下一轮迭代
break -> 跳出循环体 函数继续执行
return —> 返回函数结果 跳出函数体
<https://blog.csdn.net/XXJ19950917/article/details/78310346>

```js
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
const arr = [5,1,3,7,4]
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
 [5, 1, 3, 7, 4, 0]
```

for...in for...in 是 ES5 标准，

 <!-- ! 此方法遍历数组效率低，主要是用来循环遍历对象的属性。 -->

遍历数组的缺点：数组的下标 index 值是数字，for-in 遍历的 index 值"0","1","2"等是字符串。
Object.defineProperty 建立的属性，默认不可枚举。

```js
 const foo = {
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
 age属性：18
```

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

```js
 const foo = [5,1,3,7,4].every((item, index) => {
    console.log(`索引：${index}，数值：${item}`)
    return item > 2
})
console.log(foo)
 every 打印：
 索引：0，数值：5
 索引：1，数值：1
 false
```

**some**
todo

```js
const foo = [5,1,3,7,4].some((item, index) => {
    console.log(`索引：${index}，数值：${item}`)
    return item > 2
})
console.log(foo)
 some 打印：
 索引：0，数值：5
 true
```

 <!-- -->

**filter()**
可接受三个参数 item,index,oldarr
filter 方法用于过滤数组成员，满足条件的成员组成一个新数组返回。
它的参数是一个函数，所有数组成员依次执行该函数，返回结果为 true 的成员组成一个新数组返回。

  <!-- !该方法不会改变原数组。 -->

```js
const foo = [5,1,3,7,4].filter((item,index) => {
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
    [5, 3, 7, 4]
```

map()
map 即是 “映射”的意思 ，原数组被“映射”成对应新数组。 ==>拷贝\_映射
map：支持 return，相当与原数组克隆了一份，把克隆的每项改变了，也不影响原数组。

```js
const foo = [5,1,3,7,4].map((item,index) => {
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
  [7, 3, 5, 9, 6]
```

reduce() / reduceRight() 累加器
reduce 从左到右将数组元素做“叠加”处理，返回一个值。reduceRight 从右到左。 不会改变原数组

```js
    /**
     * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
     * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
     * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
     */
const foo = [5,1,3,7,4].reduce((total, cur) => {
    console.log(`叠加：${total}，当前：${cur}`)
    return total + cur
})
console.log(foo)
  打印结果：
  叠加：5，当前：1
  叠加：6，当前：3
  叠加：9，当前：7
  叠加：16，当前：4
  20
```

Object,keys 遍历对象的属性
Object.keys 方法的参数是一个对象，返回一个数组。该数组的成员都是该对象自身的（而不是继承的）所有属性名，且只返回可枚举的属性。
<https://titangene.github.io/article/javascript-object-keys-values-entries.html>
<https://zh.javascript.info/keys-values-entries>

```js
const obj = {
  p1: 123,
  p2: 456,
};
Object.keys(obj)[("p1", "p2")];
```

Object.values(obj)
Object.entries(obj)

Object.getOwnPropertyNames() 遍历对象的属性
Object.getOwnPropertyNames 方法与 Object.keys 类似，也是接受一个对象作为参数，返回一个数组，包含了该对象自身的所有属性名。但它能返回不可枚举的属性。

```js
const arr = ["Hello", "World"];
Object.keys(arr); // ["0", "1"]
Object.getOwnPropertyNames(arr); // ["0", "1", "length"]
```

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

## 算法注解

<!-- 刷算法题必备的数学考点汇总 -->

<https://zhuanlan.zhihu.com/p/301338035>

<!-- 前端算法题解 -->

<https://leetcode-solution-leetcode-pp.gitbook.io/leetcode-solution/thinkings/linked-list>

<https://juejin.cn/post/7146975493278367752>

<!-- 补充： -->

uselayoutefft and useeffect
<https://zhuanlan.zhihu.com/p/348701319>

## 树形结构解析

```js
(function (window, undefined) {
  var treeNodes = [
    {
      id: 1,
      name: "1",
      children: [
        {
          id: 11,
          name: "11",
          children: [
            {
              id: 111,
              name: "111",
              children: [],
            },
            {
              id: 112,
              name: "112",
            },
          ],
        },
        {
          id: 12,
          name: "12",
          children: [],
        },
      ],
      users: [],
    },
    {
      id: 2,
      name: "2",
      children: [
        {
          id: 22,
          name: "22",
          children: [],
        },
      ],
    },
  ];
});
```

```js
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
```

链接：<https://juejin.cn/post/6844903986823200776>

## 防抖和节流 throttle（节流）与 debounce（防抖）

<https://www.cnblogs.com/dreamsqin/p/11305028.html>
**异步校验 防抖 debounce 返回 promise 符合 antd validator 校验要求返回格式**
<https://www.jianshu.com/p/9573703dfe78>

## CSS

**grid 布局**
calc 计算

```less
height: calc(100vh - 150px);
```

CSS_grid 布局

<!-- 号称最强大的css布局 -->

<https://juejin.cn/post/6854573220306255880>

**css 重绘优化**
**fix 绝对定位使用 transform: translateZ(0);开启 gpu 优化避免多次渲染卡顿**
<https://segmentfault.com/a/1190000000490328>

**:(伪类)vs::(伪元素)**
1、前者是伪类，后者是伪元素。伪即假，伪类和伪元素都是假的，不存在于 HTML 或 DOM 元素的，他们是由 CSS 创建的。

2、伪类用于表示 DOM 元素的一种状态，比如 :hover、:visited、:checked 等，CSS 中差不多有 30+ 种伪类。伪元素用于选择 DOM 元素的一部分，比如 ::first-letter、::first-line、::before、::after 等，CSS 中目前有 17 个伪元素。
**css 伪类**

```css
- :active
- ::after/:after
- ::backdrop (experimental)
- ::before/:before
- :checked
- :default
- :dir (experimental)
- :disabled
- :empty
- :enabled
- :first-child
- ::first-letter/:first-letter
- ::first-line/:first-line
- :first-of-type
- :focus
- :fullscreen (experimental)
- :hover
- :in-range
- :indeterminate
- :invalid
- :lang
- :last-child
- :last-of-type
- :link
- :not
- :nth-child
- :nth-last-child
- :nth-last-of-type
- :nth-of-type
- :only-child
- :only-of-type
- :optional
- :out-of-range
- ::placeholder (experimental)
- :read-only
- :read-write
- :required
- :root
- ::selection
- :scope (experimental)
- :target
- :valid
- :visited
- Bonus content: A Sass mixin for links
```

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
<https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties>
声明一个 css 变量，属性名需要以两个减号（--）开始，属性值则可以是任何有效的 CSS 值。和其他属性一样，自定义属性也是写在规则集之内的，如下：

```css
/* :root 根伪类  */
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
color: var(--my-var, red); /_Red if --my-var is not defined_/
}
```

**获取一个 Dom 节点上的 CSS 变量**
element.style.getPropertyValue("--my-var");

**获取任意 Dom 节点上的 CSS 变量**
getComputedStyle(element).getPropertyValue("--my-var");

**修改一个 Dom 节点上的 CSS 变量**
element.style.setProperty("--my-var", jsVar + 4);

**css 瀑布流**
<https://juejin.cn/post/7014650146000470053>

## REACT HOOKS 总结

- 状态 usestate
- 复杂逻辑状态 useReducer usestate 的替代方案 处理复杂 state 逻辑时 useReducer 更可取
- 副作用 useEffect-->uselayoutEffect ->react 函数式组件的函数体中，网络请求，模块订阅以及 DOM 操作都属与 _副作用_
- 上下文 useContext 将状态和修改状态的方法在组件树顶部透传 在其子组件中 直接调用 避免多次嵌套组件层层传递
- 记忆 useMemo-->useCallback
- 引用 useRef-->useImperativeHandle
- 自定义 hook
- 过度任务 useTransition ( React 18 新增 ) 用于处理优先级低 非立即刷新的逻辑 like：异步请求 下载 上传 loading

```jsx
const [isPending, startTransition] = useTransition();

const handleChangeTab = (activeItem) => {
  setActive(activeItem); // 立即更新
  startTransition(() => {
    // startTransition 里面的任务优先级低
    //  async ...
    setRenderData(asyncData);
  });
};

return isPending && <div> loading... </div>;
```

[简易 redux =usecontext+useReducer](https://juejin.cn/post/6995105000523317278)

### cloneElement

React.cloneElement()接收三个参数。第一个参数接收一个 ReactElement，可以是 真实的 dom 结构 也可以是 自定义的。
。第二个参数为 props、key、refs，可以注入 props，第三个是 props.children
**相关文章** (<https://juejin.cn/post/7037363057839833124>)

```jsx
function CloneDemo(props) {
  return React.cloneElement(<div />, props, <p>这是参数传入的元素</p>);
}
function ContainerBox() {
  return (
    <CloneDemo>
      <h1>这是在父组件添加的元素</h1>
    </CloneDemo>
  );
}
export default ContainerBox;
```

### flushSync

- 立即强制刷新组件树
  <https://stackoverflow.com/questions/62725935/what-does-flushsync-do-in-react>
  <https://juejin.cn/post/7117512204059934733>

```tsx
flushSync(() => {
  setMessages((m) => [...m, message]);
});
```

<!--? 新增 useEvent -->

### useEffect 和 useState

<https://juejin.cn/post/6906007507531038727>

```jsx
useEffect(() => {
  return destory;
}, [dep]);
// useEffect 第一个参数 callback, 返回的 destory ， destory 作为下一次callback执行之前调用，用于清除上一次 callback 产生的副作用。
```

**usestate 默认值在组件创建时生效 慎用这种写法**
a

```jsx
const [datalist, setdatalist] = useState([...(dataSource ?? [])]);
```

**2022_5_11**
react 18 Automatic batching 使用 setState 来进行 dispatch 组件 State 变化，当 setState 在组件被调用后，并不会立即触发重新渲染。React 会执行全部事件处理函数，然后触发一个单独的 re-render，合并所有更新。

`ReactDOM.flushSync(() => { setCount((c) => c + 1); // 立刻重渲染 setFlag((f) => !f); // 立刻重渲染 });`

组件每次渲染时传入的引用类型都会重新开辟一个全新的引用地址
浅层比较数据变化 对于对象和数组类的引用类型数据，数据一样但地址不同都会触发重复渲染
**useRef**
['useRef 使用详解'](https://segmentfault.com/a/1190000024536290)
深层次比较 是跨渲染周期缓存数据。缓存上一次渲染的数据，并调用深比较方法判断，如果两个对象相等则返回上一次的数据，地址自然也没有变化。
**useImperativeHandle 和 forwardRef**
建议 useImperativeHandle 和 forwardRef 同时使用，减少暴露给父组件的属性

forwardref 与泛型组件搭配使用-->

```tsx
useImperativeHandle(ref, createHandle, [deps]);
// ref：定义 current 对象的 ref；

// createHandle：一个函数，返回值是一个对象，即这个 ref 的 current 对象；

// deps：即依赖列表，当监听的依赖发生变化，useImperativeHandle 才会重新将子组件的实例属性输出到父组件 ref 的 current 属性上，如果为空数组，则不会重新输出。
```

['react.forwardRef 高阶组件包裹的组件无法传递泛型参数']<https://juejin.cn/post/7081460215085793310>

<https://fettblog.eu/typescript-react-generic-forward-refs/>
**useEffect 和 useLayoutEffect**
useEffect 是异步执行的，而 useLayoutEffect 是同步执行的。
**useEvent**
缓存相同函数引用，同时不会产生闭包，依然可以取到最新的 state
<https://juejin.cn/post/7094186419500875812>

`useLayoutEffect:是在所有DOM变更之后浏览器渲染之前调用，既同步调用 副作用会阻塞代码阻塞页面加载 useEffect:是在组件渲染到屏幕之后执行，既异步调用`

useEffect 的执行时机是浏览器完成渲染之后，而 useLayoutEffect 的执行时机是浏览器把内容真正渲染到界面之前，和 componentDidMount 等价。
**useMemo 和 useCallback**
<https://www.joshwcomeau.com/react/usememo-and-usecallback/>

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
原文链接：<https://blog.csdn.net/qq_43291759/article/details/121834809>

<!-- 返回一个函数，只有在依赖项发生变化的时候才会更新（返回一个新的函数）。 -->
<!--todo 简单理解呢 useCallback 与 useMemo 一个缓存的是函数，一个缓存的是函数的返回值。useCallback 是来优化子组件的，防止子组件的重复渲染。useMemo 可以优化当前组件也可以优化子组件，优化当前组件主要是通过 memoize 来将一些复杂的计算逻辑进行缓存。-->

- usememo 缓存某个变量 需要由大量计算得出的变量
- usecallback 缓存某个函数 缓存函数
**tip: useCallback 是根据依赖(deps)缓存第一个入参的(callback)。useMemo 是根据依赖(deps)缓存第一个入参(callback)执行后的值。**
<!-- useCallback和useMemo的参数跟useEffect一致，他们之间最大的区别有是useEffect会用于处理副作用，而前两个hooks不能。
useMemo和useCallback都会在组件第一次渲染的时候执行，之后会在其依赖的变量发生改变时再次执行；并且这两个hooks都返回缓存的值，useMemo返回缓存的变量，useCallback返回缓存的函数。 -->

1. useCallback(fn, deps)相当于 useMemo( () => fn, deps)。
2. 可以把 useMemo 当作性能优化的手段，但不要把他当成语义上的保证。
3. React.memo 仅作为性能优化的方式存在，不要依赖它来阻止重新渲染，这会产生 bug。
4. useMemo 缓存变量，useCallback 缓存函数。 使用场景: 组件缓存
   <https://juejin.cn/post/7039216773710741535>

**useContext**
todo
useContext createContext 创建数据变量，子组件通过 useContext 导入

<!-- createContext 能够创建一个 React 的 上下文（context），然后订阅了这个上下文的组件中，可以拿到上下文中提供的数据或者其他信息。 使用 useContext 获取上下文 -->

<https://segmentfault.com/a/1190000039200472>

### React Filber 时间切片详解

<https://juejin.cn/post/6844903975112671239>

**react 自定义 hooks**
todo
<https://juejin.cn/post/6844904074433789959#heading-5>

## React Hook 重复渲染问题处理：useMemo, memo, useCallback

[React18 + Vite + TypeScript 完成公司项目经验总结](https://juejin.cn/post/7205842390842458149)

[vite实现一个小的npm库](https://juejin.cn/post/7216182763237916729#heading-0)

### 为什么会存在重复渲染？

这是因为 react hook 使用的是函数组件，父组件的任何一次修改，都会导致子组件的函数执行，从而重新进行渲染

### 什么时候需要使用 memo callback 做性能优化？

- 复杂的计算值用 useMemo 缓存
- 当值作为别的 hooks 的依赖时
- 需要作为被 memo 的子组件的 props 时

### 优化使用建议 <https://juejin.cn/post/7056227726570553375>

### React 性能优化的方向<https://juejin.cn/post/6844903865926549511>

- 不使用 useCallback 会造成每次渲染时函数的重建
- 不使用 useMemo 和 useCallback 会造成 React.memo 失效
- 不使用 useCallback 则 useEffect 无法依赖 回调函数
- React.memo 类似 PureComponent 能用就用
- useMemo 做复杂推导时必用，简单计算用了也不会错。

1. props context 父组件向子组件传递数据  子组件应视其为正常组件数据传递，子组件会自动重新渲染， **不应该视为副作用，使用useeffect去处理**,
   读取reduex,localstorage，fetch等状态都是副作用操作，因为它们涉及到组件外部的状态(可能会在某个时间点被修改)，
   可能会影响组件的状态、生命周期方法、渲染结果等。 **使用useeffect去处理是好的解决办法**

2. 父组件没有 props 传入子组件 props --- 使用 React.memo 即可
   先简单介绍一下这个方法：
   React.memo 为高阶组件。它与 React.PureComponent 非常相似。默认只会对复杂类型对象做浅层比较，如果需要控制对比过程我们可以将比较函数作为第二个参数传入。
   React.memo(MyComp, areEqual)
   areEqual（第二个比较回调函数）返回值为 true 则使用缓存 false 则重复渲染;
   function areEqual(prevProps, nextProps) { /_如果把 nextProps 传入 render 方法的返回结果与 将 prevProps 传入 render 方法的返回结果一致则返回 true， 否则返回 false_/ }

3. 父组件传入子组件的 props 都是简单数据类型 --- 使用 React.memo 即可
   由于上面说的 React.memo 会默认进行浅层比较，使用 React.memo 包裹的子组件，会浅层比对传入的 props 是否有变化。简单数值类型，浅层对比即可判断是否发生了变化。如果传入的 props 没有变化，则使用缓存的子组件，如果传入的 props 发生变化，则组件会重新渲染。问题解决～;
4. 父组件传入子组件的 props 存在复杂数据类型 --- 使用 memo, useMemo, useCallback
   我们通过 props 向子组件传值时，可能需要传入复杂类型如 object，以及 function 类型的值。而 memo 子组件进行渲染比对时进行的是浅比较，即使我们传入相同的 object 或 function，子组件也会认为传入参数存在修改，从而子组件重新进行渲染。这个时候仅仅使用 memo 包裹子组件应该没办法解决问题了，是时候用上我们的 useCallback 以及 useMemo 了。

## React 鼠标事件合集

- 触摸事件：onTouchCancel\onTouchEnd\onTouchMove\onTouchStart (只会在移动设备上接受)

- 键盘事件：onKeyDown\onKeyPress\onKeyUp

- 剪切事件：onCopy\onCut\onPaste

- 焦点事件：onFocus\onBlur

- UI 元素：onScroll (移动设备是手指滚动和 PC 的鼠标滑动)

- 滚动事件：onWheel (鼠标滚轮)

- 鼠标类型:onClick\onContextMenu (右键)\onDoubleClick\onMouseDown\onMouseEnter\

  onMouseLeave\onMouseMove\onMouseOut\onMouseOver\onMouseUp
  **drag拖拽事件**
  onDrag\onDrop\onDragEnd\onDragEnter\onDragExit\onDragLeave\onDragOver\onDragStart

## File、Blob、ArrayBuffer 等文件类的对象有什么区别和联系

Blob 是一种二进制对象(包括字符，文件等等)，es6 对其进行了补充
File 是基于 Blob 的一种二进制文件对象,扩展了 Blob，es6 同样进行了补充
ArrayBuffer 是 ES6 新引入的二进制缓冲区
Buffer 是 Nodejs 内置的二进制缓冲区，Buffer 相当于 ES6 中 Uint8Array(属于 TypedArray)的一种扩展

除非您需要编写/编辑的能力（使用 ArrayBuffer），否则 Blob 格式可能是最好的。
<https://nibes.cn/blog/21263>

## 正则表达式使用指南

<https://mp.weixin.qq.com/s/gTSdWDew1-JPsssFd_gkug>

## react 开发工具类

### 组件跳转

click-to-component

### 页面切换动画效果

react-page-transition
<https://mp.weixin.qq.com/s/9NFB1uNqNWiARbmUdWrBWQ>

### react-jsx-parser jsx 解析插件

<https://github.com/TroyAlford/react-jsx-parser#readme>

```jsx
import React from "react";
import JsxParser from "react-jsx-parser";
import Library from "some-library-of-components";

class InjectableComponent extends Component {
  static defaultProps = {
    eventHandler: () => {},
  };
  // ... inner workings of InjectableComponent
}

/**
 * @bindings  注入变量  任何可赋值为变量的参数//可传函数
 * @components  注入jsx组件
 * @jsx   解析目标主体内容   可写简单的箭头函数  有一些限制 不可写函数体，具名函数等
 */
const MyComponent = () => (
  <JsxParser
    bindings={{
      foo: "bar",
      myEventHandler: () => {
        /* ... do stuff ... */
      },
    }}
    components={{ InjectableComponent, Library }}
    jsx={`
      <h1>Header</h1>
      <InjectableComponent eventHandler={myEventHandler} truthyProp />
      <Library.SomeComponent someProp={foo} calc={1 + 1} stringProp="foo" />
      <Library.DataFetcher>((data) => <div>{data.name}</div>)</Library.DataFetcher>
    `}
  />
);
```

## webpack

- Entry：指定 webpack 开始构建的入口模块，从该模块开始构建并计算出直接或间接依赖的模块或者库
- Output：告诉 webpack 如何命名输出的文件以及输出的目录
- Loaders：由于 webpack 只能处理 javascript，所以我们需要对一些非 js 文件处理成 webpack 能够处理的模块，比如 sass 文件
- Plugins：Loaders 将各类型的文件处理成 webpack 能够处理的模块，plugins 有着很强的能力。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。但也是最复杂的一个。比如对 js 文件进行压缩优化的 UglifyJsPlugin 插件
- Chunk：coding split 的产物，我们可以对一些代码打包成一个单独的 chunk，比如某些公共模块，去重，更好的利用缓存。或者按需加载某些功能模块，优化加载时间。在 webpack3 及以前我们都利用 CommonsChunkPlugin 将一些公共代码分割成一个 chunk，实现单独加载。在 webpack4 中 CommonsChunkPlugin 被废弃，使用 SplitChunksPlugin

['webpack 详解-腾讯'](https://juejin.cn/post/6844903573675835400)

['从零实现一个 webpack'](https://juejin.cn/post/7170852747749621791)

[前端构建工具发展历程](https://mp.weixin.qq.com/s/o8B8HAczZtIZM8V_HHwNqg)

## 打包工具 vite esbuild

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

## Jenkins 部署

<https://juejin.cn/post/7102360505313918983>

## Set Map WeakSet WeakMap

_ES6 新增_
**set**
类似与数组 只有值没有建名，所有的值都是唯一的，没有重复（类似对象 key 不可以重复）
set 本身是一个构造函数，用来生成 set 数据结构
可用作数组去重 [... new set(array)]

## 枚举和迭代

**可枚举的属性**
可枚举对象的一个定义特征是，当我们通过赋值运算符将属性赋值给对象时，js 将内部可枚举标志（enumerable）设置为 true。这是默认值。但是，我们可以通过将其设置为 false 来更改此行为。

```js
const users = {};
users.languages = "JavaScript";

Object.getOwnPropertyDescriptor(users, "languages");
// output -> { value: 'JavaScript', writable: true, enumerable: true, configurable: true }

// 在循环中对我们使用的属性进行更多的控制
Object.defineProperty(users, "role", {
  value: "Admin",
  writable: true,
  enumerable: false,
});

for (const item in users) {
  console.log(item); // languages 没有输出 users 的 role 属性，因为它是不可枚举属性 enumerable:false
}
```

**基本上，在 JavaScript 中，所有可迭代对象都是可枚举对象，但并非所有可枚举对象都是可迭代对象。**
**_?如果一个对象定义了它的迭代行为，那么它是可迭代的。_**

<!--! 所有可迭代对象都是可枚举对象 -->

for in -->遍历 数据的可枚举属性(key)
for of -->遍历 数据的可迭代属性(value)

<!-- for...in 查找数据中的对象，而 for...of 查找重复序列r -->

**可迭代的内置类型包括 Array、String、Set 和 Map ,对象不可迭代，因为它没有指定 @iterator 迭代方法。**

- 可以用 Object.entries/keys/values 指定迭代器方法
- exp：for (const [key, value] of Object.entries(record)) {}

<!-- 可迭代对象 Iterable  -->

<https://zh.javascript.info/iterable>

```js
const languages = ["JavaScript", "Python", "Go"];

// 与 for...in 循环一起使用
for (const language in languages) {
  console.log(language);
}
// output
// 0
// 1
// 2

// 与 for...of 循环一起使用
for (const language of languages) {
  console.log(language);
}
// output -> JavaScript Python Go
```

## lodash 源码解析

**假值:例如 false, null,0, "", undefined, 和 NaN 都是被认为是“假值==false”。**
if(value) 可以判断是否为假值 value 会被隐式性转换为 true 或 false

## Git

**submodule**
git submodule update 更新子模块 默认 submodule 的 HEAD 处于游离分支
初始化子模块 git submodule init
更新子模块分支 git submodule update --remote
**clone**
git clone -b 想要拉取的分支名(branch) xxx(URL) 文件名(省略为原名)
-b 为 --branch 缩写

## 服务端渲染 SSR-客户端渲染 CSR-静态站点生成 SSG

<https://juejin.cn/post/7128369638794231839>
**客户端渲染 CSR**
常规开发框架单页面应用 js 动态渲染 dom 树结构==动态渲染==客户端渲染
**服务端渲染 SSR**
通过 http 请求返回整个 html 文本页面直接给浏览器解析 不需要 js 脚本解析
服务端组装 HTML 并返回给前端的过程==服务端 SSR
**静态网站生成 SSG**
html 页面内容在 build 的时候就定型了，相对于 SSR 不需要后端二次请求查询组装，直接返回 build 源代码
缺陷：静态页面，不适合展示内容灵活的 web 页面
优势：适合个人博客，使用文档等充满静态页面的网站
**预加载**

- preload 告诉浏览器该请求资源需要预先加载 提高优先级
- preconnect 告诉浏览器需要该域名的资源
- dns-prefetch dns 预获取 告诉浏览器预先解析域名
- prefetch 告诉浏览器需要优先获取或者缓存该资源

## NPM scripts 脚本指南

<https://www.ruanyifeng.com/blog/2016/10/npm_scripts.html>
"scripts": {
"build": "node build.js"
}
$ npm run build === $ node build.js

## js eval 函数解析

<https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval>
eval() 的参数是一个字符串。如果字符串表示的是表达式，eval() 会对表达式进行求值。如果参数表示一个或多个 JavaScript 语句，那么 eval() 就会执行这些语句。
如果 eval() 的参数不是字符串， eval() 会将参数原封不动地返回
eval 内的代码在当前词法环境（lexical environment）中执行，因此它能访问外部变量
<https://blog.csdn.net/aaahuahua/article/details/122201318>

## 单元测试

jest.js
适合工具类函数进行单元测试
<https://juejin.cn/post/7039108357554176037>

## 发布订阅模式详解

[手动实现一个发布订阅模式](https://juejin.cn/post/6985156199192723487)
**概念**
发布-订阅模式其实是一种对象间一对多的依赖关系，当一个对象的状态发送改变时，所有依赖于它的对象都将得到状态改变的通知。
订阅者（Subscriber）把自己想订阅的事件注册（Subscribe）到调度中心（Event Channel），当发布者（Publisher）发布该事件（Publish Event）到调度中心，也就是该事件触发时，由调度中心统一调度（Fire Event）订阅者注册到调度中心的处理代码。

## js 内存机制执行机制

[js 内存机制](https://mp.weixin.qq.com/s/yWoZTlnhWsG3Gj0CsKEb0A)

## less

- less 样式封装
  <https://www.361shipin.com/blog/1554227874750267392>

## vscode 代码模板

<https://zhuanlan.zhihu.com/p/100504877>

## 闭包

- 高阶函数 函数作为一个函数的参数或者返回值 都叫闭包
  <https://www.liaoxuefeng.com/wiki/1022910821149312/1023021250770016>
  <https://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html>
- this this 指向作用域的所有者 函数中只想函数作用域的所有者（父级对象）
  <https://www.quirksmode.org/js/this.html>
  react 闭包 和 addEventListner 闭包
  <https://zhuanlan.zhihu.com/p/514151293>

## antd ui 库源码分析

<https://juejin.cn/post/7066420918708338702>

## form 组件封装

formItem 默认向下传递两个缺省值参数:onChange(组件响应方式/可修改为失焦等)|value:组件受控值

- 受控组件
  由 react 组件接管组件的值存储 存在 usestate 或者 form 中 通过 value 进行写入
- 非受控组件
  由 Input 等组件底层控制 通过 使用 ref 从 DOM 获取表单值
  <https://juejin.cn/post/7075673541751865357>
  <https://zh-hans.reactjs.org/docs/uncontrolled-components.html#gatsby-focus-wrapper>

## Electron

- 基于 umi 搭建 electron
  <https://zhuanlan.zhihu.com/p/376082990>
- Electron + React + Antd
  <https://blog.csdn.net/weixin_44043810/article/details/118554069>
- [Electron+Antd 创建并打包本地应用程序](https://blog.csdn.net/warpten2525/article/details/111556193)
- electron remote 详解 组件通信
  Electron 中的两种进程通信方式，分别为：

1. 使用 ipcMain 和 ipcRenderer 两个模块
2. 使用 remote 模块 // 渲染进程（web 页面）和主进程通信（IPC）提供了一种简单方法。
   <https://cloud.tencent.com/developer/article/2034372>

- [electron 开发经验](https://juejin.cn/post/6844904029231775758)

## Chrome Devtools

<https://mp.weixin.qq.com/s/3wjFs--CuIBkXsnyKRkAJQ>

## UMI Plugins 插件开发

<https://github.com/frontend9/fe9-library/issues/50>

## react.lazy suspense 懒加载

代码分割，首屏速度，懒加载
[react.lazy+suspense 实现懒加载](https://juejin.cn/post/6844903876219371534)

## koa 洋葱圈 express

[koa 洋葱模型解析](https://segmentfault.com/a/1190000013981513)

## AST 树

[AST 树在线可视化](https://astexplorer.net/)

## VUE

[VUE3 快速入门](https://juejin.cn/post/6887359442354962445)

## web本地数存储 离线存储

- localStorage，虽然比cookie多，但是同样有上限（5M）左右，备选
- websql 使用简单，存储量大，兼容性差，备选
- indexDB api多且繁琐，存储量大、高版本浏览器兼容性较好，备选

[前端本地存储方案](https://juejin.cn/post/7199826518569779256)

## 请求缓存

[处理组件重复调用请求](https://juejin.cn/post/7222096611635003451)