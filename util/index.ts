/**
 * @Author: QIANMINGLIANG
 * @Date: 2023-08-10 10:09:19
 * @Description: 请填写简介
 * @memo: 
 * @todo: 
 */
 export function debounceAsync_old(
    this: any,
    method: Function | any,
    wait: number,
    immediate?: boolean,
) {
    // todo 无法复用   多个异步同时使用 指向同一个timeout引用地址  待解决
    let timeout: NodeJS.Timeout | null, result: any;
    let debounced = (...args: any[]) => {
        // 返回一个Promise，以便可以使用then或者Async/Await语法拿到原函数返回值
        return new Promise((resolve) => {
            // 将method执行时this的指向设为debounce返回的函数被调用时的this指向
            // let context = this;
            if (timeout) {
                clearTimeout(timeout);
            }
            if (immediate) {
                let callNow = !timeout;
                timeout = setTimeout(() => {
                    timeout = null;
                }, wait);
                if (callNow) {
                    result = method.apply(this, args);
                    // 将原函数的返回值传给resolve
                    resolve(result);
                }
            } else {
                timeout = setTimeout(() => {
                    // args是一个数组，所以使用fn.apply
                    // 也可写作method.call(context, ...args)
                    result = method.apply(this, args);
                    // 将原函数的返回值传给resolve
                    resolve(result);
                }, wait);
            }
        });
    };
    return debounced;
}


/**
 * debounceAsync - 创建防抖函数，并确保每次调用都有其独立的timeout，防止变量竞争。
 *
 * @param method - 需要被防抖的异步方法。
 * @param wait - 防抖等待时间。
 * @return 一个新的防抖函数。
 */
 export function debounceAsync<R = any>(
    this: any,
    method: (...args: any[]) => Promise<R>,
    wait: number,
  ): (...args: any[]) => Promise<R> {
    // 使用Map存储每次调用的timeout
    const timeouts = new Map<string, NodeJS.Timeout>();
  
    // const fnMap = new WeakMap<() => void, string>();
    // // 内存管理：WeakMap 的关键特性是其键是弱引用的。这意味着，当这个键对象没有其他引用时，JavaScript 垃圾收集器将会自动回收这个键对象占用的内存，并从 WeakMap 中移除对应的键-值对。因此，如果 method（函数）不再被其他地方引用并被回收，它对应的 entry 在 WeakMap 里也会被回收。
    // // 不枚举的键：WeakMap 的键是不可枚举的，所以你不能遍历所有的键-值对。这在某些情况下是一个安全特性，因为它避免了外部代码获取和更改存储的数据。
    // // 唯一性：由于函数对象在 JavaScript 中是唯一的（除非是同一个函数的引用），我们可以利用这个特性加上 WeakMap 来确保每个函数关联一个唯一的 ID。
    // // 避免修改原始函数：使用 WeakMap，我们可以为函数关联额外的数据，而不必直接修改这个函数或使用全局的变量来跟踪这些数据。
    // // 综上所述，使用 WeakMap 为函数创建唯一ID时，我们可以充分利用其为函数关联额外信息的能力，同时确保这些信息在函数不再被使用时自动被清理，避免了内存泄漏。
    // let counter = 0;
  
    // // 如果method没有相关的ID，为它创建一个
    // if (!fnMap.has(method)) {
    //   fnMap.set(method, (++counter).toString());
    // }
    //?? 为每次调用生成一个唯一ID
    // const fnId = fnMap.get(method)!;
    // 或者
    const callId = Date.now().toString() + Math.random();
  
    return (...args: any[]) => {
      return new Promise<R>((resolve, reject) => {
        // 如果此次调用已经有关联的timeout，则清除它
        console.log(callId);
        console.log(timeouts);
  
        if (timeouts.has(callId)) {
          console.log('重复');
          clearTimeout(timeouts.get(callId)!);
        }
  
        // 设置新的timeout，并与此次调用关联
        const timeout = setTimeout(() => {
          // 清除和此次调用关联的timeout，并执行方法
          timeouts.delete(callId);
          method.apply(this, args).then(resolve).catch(reject);
        }, wait);
        timeouts.set(callId, timeout);
      });
    };
  }
  