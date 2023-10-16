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