# 编码规范

1. 命名

    a. 文件夹命名采用大写驼峰 如：SaleMangment

    b. 文件命名采用小写加上*，命名建议实体*动作\_组件 如：product_list_card.tsx

    c. 函数组件命名采用大写驼峰，命名建议与文件名一致， 如 ProductLIstCard

    d. 函数命名采用小写驼峰，命名建议采用动词+名词方式，如 getProductListFromServer

    e. 组件级变量命名采用小写驼峰方式，以名词为主， 如 productModalVisible

    f. 函数级变量命名采用小写驼峰方式，以达意为主，不做要求

    g. 除了常用的没有歧义的简写单词外，所有单词都不能简写

    h. 函数命名规范

        - 在return 中的渲染函数 用renderXXX   如renderProductSelectOptions

        - 在组件中响应事件的 用onXXXXX     如 onClickResetButton

        -  在组件用作为子组件的回调函数的  用handleXXXX   如 handleSubmitPersonForm

2. 注释
    a. 文件头部必须写注释，需要包括如下内容

    i. @description 文件描述，讲述文件的的主要功能
    ii. @author 作者
    iii. @todo 文件后续需要继续完成的内容
    iv. @interface 文件对外提供调用接口的 interface 名称（如果有）
    v. @memo 其它额外需要的注释
    b. 每个函数必须有注释

    i. @function 描述函数的功能
    ii. @params 函数调用参数说明
    iii. @return 函数返回参数说明
    iv. @todo 函数后续需要完成的内容

    c. 关键变量必须有注释

    i. XXX.D.TS 中的类型定义
    ii. 每个组件 props 的接口定义
    iii. 组件内部 useState 和全局变量

3. 长度

    a. 每个函数组件不超过 500 行

    b. 每个函数不能超过 300 行

    c. 在 DOM 中或者在对象中的嵌入函数不超过 5 行

4. 变量使用
    a. 变量必须有显示定义，不建议用系统推断定义

    b. 变量不能用 any 定义，如果的确需要使用，需要在变量定义后或者函数说明增加说明原因

    c. 不允许使用 //@ts_igorn，如果必须使用，请在注释后增加原因说明

    d. 使用 usestate 的变量必须和 DOM 刷新相关，否则如果需要组件保存建议使用 useRef，避免过多 state 影响组件性能

    e. 不能使用组件外的全局变量，如必须使用，请写明原因

5. 组件
    a. 页面组件主要处理数据和大组件布局

    b. 单功能组件建议不保存状态变量

    c. 组件数据超过 3 层的，建议使用 CONTEXT 或 PROVIDER 实现组件内共享，

    d. 共享的数据在子组件内不允许更新，必须采用回调函数在数据定义的组件内操作

6. 表格组件使用规范

    a. 表格的宽度需要根据字段长度进行调整，不允许全部定义等宽

    b. 必填字段要进入搜索列表

    c. 名字，备注等描述性字段，必须增加缩略功能

    d. 如果是状态等枚举字段，必须采用选择器

    e. 分页符必须实现，如果全屏表格，默认 20，单屏表格默认 10

    f. 表格默认采用隔行隔色，UI 明确规定取消的除外

7. 表单使用规范

    a. 输入组件需要根据字段长度来定义长度，不允许全部等宽，UI 设定除外

    b. 数字输入组件必须定义最大值和最小值，考虑合适的步长

    d. 字符串输入组件必须定义输入的最大字符个数

    e. 所有输入和选择框建议增加 autoclear 字段，UI 定义的除外

    f. 选择组件，如果选择项目在 3 个以内的，建议采用 RADIO 或者 RADIO BUTTON

    g. 选择器必须增加默认值

    h. 数据库必填字段的，必须判断

    i. 电话、邮件等常见的必须增加格式判断，建议采用公共组件

    j. 所有时间日期选择器，form 交互采用 timestamp 格式，通过自定义组件实现

    k. 文件格式，上传时候需要带 name，存储采用 JSON 格式，包括{id:number,name:string；fileUrl：string}格式

8. 调试告警使用规范

    a. 所有的 ERROR 告警必须清除，不允许存在

    b. 所有的 warning 告警必须清除，如果有版本兼容告警请备案处理

    c. 所有的调试告警 info 打印，在使用后必须注释掉，不允许在正常流程中出现调试告警