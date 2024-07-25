onmessage = function (e) {
  console.log('Worker: Message received from main script');
  const result = e.data[0] * e.data[1];
  if (isNaN(result)) {
    postMessage('Please write two numbers');
  } else {
    const workerResult = 'Result: ' + result;
    console.log('Worker: Posting message back to main script');
    postMessage(workerResult);
  }
}

// !! webworker线程中不能使用一些es6新特性 如可选链等
/** https://www.cnblogs.com/xiaonian8/p/15149666.html
 * import RequestWorker from '@/utils/request.worker.js?v=1'  //??可使用连接参数的方式 刷新编译缓存
 *         rules: [
          {
            test: /\.worker\.js$/,
            use: {
              loader: 'worker-loader',
              options: {
                inline: true,
                // loader 2 api使用方式
                // name: '[name]:[hash:8].js', // 打包后的chunk的名称
                // inline: true, // 开启内联模式，将chunk的内容转换为Blob对象内嵌到代码中
              },
            },
          },
        ],
 * 
 * 1.全局实例化：
    适用于需要在整个应用中共享的长时间运行的 Worker。
    实例化后可以复用，不必频繁创建和销毁。

    2.组件内实例化：
    适用于需要独立管理的页面或组件。
    在组件的 mounted 钩子中创建，在 beforeDestroy 钩子中销毁。

    3.事件触发实例化：
    适用于短时间任务，任务完成后立即销毁 Worker。
    避免频繁创建和销毁 Worker 以节省资源。
 */

