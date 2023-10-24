/**
 * @Author QIANMINGLIANG
 * @Date 2023-06-30 15:50:39
 * @Description 请填写简介
 * @memo 
 * @todo 
 */

import useMergeState from "@/common/hooks/useMergeState"
import { Select, SelectProps } from "antd"
import { DefaultOptionType } from "antd/lib/select"
import { toFinite } from "lodash"

interface IselectProps<T = any> extends Omit<SelectProps<T>, 'value' | 'onChange'> {
    onScrollEnd?: (e: any) => void
    value?: T
    onChange?: (value?: T, prevValue?: T) => void
    defaultValue?: T
    request?: () => {

    }
    formatValue?: (value: T, option: DefaultOptionType | DefaultOptionType[]) => T
}
const WSelect = <T extends DefaultOptionType = any>({ onScrollEnd, defaultValue, value: propsValue, onChange: PropsChange, formatValue, ...rest }: IselectProps<T>) => {
    const [value, setValue] = useMergeState<T | undefined>(defaultValue, {
        value: propsValue,
        onChange: PropsChange
    })
    const handleScroll = (e: any) => {
        const { scrollTop, scrollHeight, offsetHeight } = e.target ?? {};
        if (
            scrollTop + offsetHeight === scrollHeight
        ) {
            onScrollEnd?.(e)
        }
    }
    const hanldeChange = (value: T, options: any) => {
        setValue(formatValue ? formatValue(value, options) : value)
    }
    return <Select<T>
        {...rest}
        value={value}
        onChange={hanldeChange}
        onPopupScroll={handleScroll}
    />
}

export default WSelect



/**
 * @Author QIANMINGLIANG
 * @Date 2023-10-23 15:11:25
 * @Description 请填写简介
 * @memo
 * @todo
 */
 import { Select, SelectProps } from 'antd';
 import { DefaultOptionType } from 'antd/lib/select';
 import { useEffect, useState } from 'react';
 
 function filterArrayWithId<T extends { id: number }>(data: T[]): T[] {
   // 创建一个空对象用于存储唯一的对象
   const uniqueObjects: { [k: number]: any } = {};
   // 遍历数组并使用对象的 id 属性作为键来存储对象
   const deduplicatedArray = data.filter((obj) => {
     if (!uniqueObjects[obj.id]) {
       uniqueObjects[obj.id] = true;
       return true;
     }
     return false;
   });
   return deduplicatedArray;
 }
 type Tnode<T> = T & DefaultOptionType;
 interface IselectProps<T, Data>
   extends Omit<SelectProps<any>, 'value' | 'onChange' | 'options'> {
   value?: T;
   onChange: (
     value?: T,
     dataSource?: Tnode<Data>[],
     options?: Tnode<Data>[] | Tnode<Data>,
   ) => void;
   request: (params: {
     pageSize: number;
     current: number;
     [x: string]: any;
   }) => Promise<Tnode<Data>[]>;
   filterValue?: Record<string, any>;
   // 编辑回写的时候可通过这个字段 组装到数据源中
   mergeValue?: Tnode<Data> | Tnode<Data>[];
 }
 const BSelect = <T, Data extends { id: number }>({
   value,
   onChange,
   request,
   filterValue,
   mergeValue,
   ...rest
 }: IselectProps<T, Data>) => {
   const [pageNumber, setpageNumber] = useState(1);
   const [page1Reload, setpage1Reload] = useState(0);
   const [dataSource, setdataSource] = useState<Array<Tnode<Data>>>([]);
   const [loading, setloading] = useState(false);
 
   const handleScroll = (e: any) => {
     const { scrollTop, scrollHeight, offsetHeight } = e.target ?? {};
     if (scrollTop + offsetHeight === scrollHeight) {
       console.log('end');
       setpageNumber((page) => page + 1);
     }
   };
 
   useEffect(() => {
     // 初始化编辑回写时 塞入mergevalue
     // 只有第一页且数据源有值的时候才合入mergevalue
     if (!!mergeValue && dataSource.length > 0 && pageNumber === 1) {
       if (Array.isArray(mergeValue)) {
         setdataSource((data) => filterArrayWithId([...data, ...mergeValue]));
       } else {
         setdataSource((data) => filterArrayWithId([...data, mergeValue]));
       }
     }
     return () => {};
   }, [JSON.stringify(mergeValue), dataSource]);
 
   useEffect(() => {
     // 过滤值变化的时候
     // 分页置为1 通过分页来触发查询
     if (pageNumber !== 1) {
       setpageNumber(1);
     } else {
       // 当分页一直为1时候加一个状态值用于刷新接口
       setpage1Reload(Math.random());
     }
     return () => {};
   }, [JSON.stringify(filterValue)]);
 
   useEffect(() => {
     queryRecord();
     return () => {};
   }, [pageNumber, page1Reload]);
 
   /**
    * @name 请求数据
    * @example
    */
   const queryRecord = () => {
     setloading(true);
     request({ pageSize: 50, ...filterValue, current: pageNumber }).then(
       (res) => {
         // 当搜索等回到第一页的情况下需要重置数据源
         if (pageNumber === 1) {
           setdataSource(res);
         } else {
           setdataSource((old) => [...old, ...res]);
         }
         setloading(false);
       },
       () => {
         setloading(false);
       },
     );
   };
   return (
     <Select
       {...rest}
       options={dataSource}
       value={value}
       onChange={(e, option) => {
         onChange(e, dataSource, option);
       }}
       onPopupScroll={handleScroll}
       loading={loading}
     />
   );
 };
 
 export default BSelect;
 