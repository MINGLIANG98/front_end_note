/**
 * @Author: QIANMINGLIANG
 * @Date: 2023-11-13 15:35:29
 * @Description: 请填写简介
 * @memo: 
 * @todo: 
 */
import { EventEmitter } from 'events';
import { useEffect } from 'react';
const eventBus = new EventEmitter();
// 订阅
const useSubscribe =(tip: string, callback: (...params: any) => void) => {
  useEffect(() => {
    eventBus.addListener(tip, (...e) => {
      callback?.(...e);
    });
    return () => {
      eventBus.removeListener(tip, callback);
    };
  }, []);
};
// 发布
const sendMessage = (tip: string, ...data: any) => {
  eventBus.emit(tip, ...data);
};
export  { useSubscribe, sendMessage };
