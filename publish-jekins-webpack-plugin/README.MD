
## 通过 webpack 插件实现 npm build 打包至指定目录 然后通过 jekins restfult api 实现调用部署脚本

## 🔨 Usage

```js
{
plugins:[
// ...其他插件
// ...
new ArchiveDistPlugin({
  targetPath: "/custom/target/path/dist.zip",
  userName: "yourUsername",
  uerToken: "yourUserToken",
  url: "yourJenkinsURL",
});
// 或者
new ArchiveDistPlugin({
  targetPath: "/custom/target/path/dist.zip",
  sshRestful: "yourSSHRestfulString",
});
]
}
```
