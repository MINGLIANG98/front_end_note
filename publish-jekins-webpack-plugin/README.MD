
## 通过 webpack 插件实现 npm build 打包至指定目录 然后通过 jekins restfult api 实现调用部署脚本

## 下载

Use one of the package managers for Node.js.

```bash
 yarn add publish-jekins-webpack-plugin -D
```

## 🔨 Usage

```js
const PublishJekinsPlugin = require('publish-jekins-webpack-plugin');
{
plugins:[
// ...其他插件
// ...
new PublishJekinsPlugin({
  // dist输出地址
  targetPath: "/custom/target/path/dist.zip",
  // jekins账户
  userName: "yourUsername",
  // 账户密钥
  uerToken: "yourUserToken",
  // jekins提供的restful api 在jekins项目工程里面配置
  url: "yourJenkinsURL",
});
// 或者
new PublishJekinsPlugin({
  targetPath: "/custom/target/path/dist.zip",
  // 自定义请求的url
  sshRestful: "yourSSHRestfulString",
});
]
}
```
