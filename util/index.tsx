/**
 * @Author QIANMINGLIANG
 * @Date 2023-08-10 10:09:14
 * @Description 请填写简介
 * @memo 
 * @todo 
 */
import { useEffect, useRef, React } from "react";


function useInterval(callback: Function, delay: number) {
    const savedCallback = useRef<Function>();

    // 记录callback
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // 设置和清理定时器
    useEffect(() => {
        function tick() {
            savedCallback.current?.();
        }
        tick()
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

// https://github.com/chenshuai2144/merge-value-hooks
//此 hooks 可以轻松的实现一个受控组件。
// 使用方式类似于 useState ，支持通过第二个参数传入 { value, onChange} 来覆盖掉默认的 value 与 setValue。
function useControlledState<T, R = T>(
    defaultStateValue: T | (() => T),
    option?: {
        defaultValue?: T | (() => T);
        value?: T;
        onChange?: (value: T, prevValue: T) => void;
        postState?: (value: T) => T;
    },
): [R, (value: T) => void] {
    const { defaultValue, value, onChange, postState } = option || {};
    const [innerValue, setInnerValue] = React.useState<T>(() => {
        if (value !== undefined) {
            return value;
        }
        if (defaultValue !== undefined) {
            return typeof defaultValue === 'function' ? (defaultValue as any)() : defaultValue;
        }
        return typeof defaultStateValue === 'function'
            ? (defaultStateValue as any)()
            : defaultStateValue;
    });

    let mergedValue = value !== undefined ? value : innerValue;
    if (postState) {
        mergedValue = postState(mergedValue);
    }

    function triggerChange(newValue: T) {
        setInnerValue(newValue);
        if (mergedValue !== newValue && onChange) {
            onChange(newValue, mergedValue);
        }
    }

    return [mergedValue as unknown as R, triggerChange];
}
