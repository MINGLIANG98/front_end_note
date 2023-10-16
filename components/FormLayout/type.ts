import type { ReactNode } from 'react';
import type { FormInstance } from 'antd/es/form';
import type { FormLayout } from 'antd/lib/form/Form';
import type { columnsConfigType } from '@/common/type/common';
import type { FormItemProps } from '@ant-design/pro-components';

type valueType =
  | 'select'
  | 'textArea'
  | 'text'
  | 'digit'
  | 'switch'
  | 'treeSelect'
  | 'radio'
  | 'date';

export type FormColumns = {
  /**
   * @name 注入 formitem.label字段
   */
  title?: string | ReactNode;
  /**
   * @name 注入 formitem.name字段
   */
  dataIndex: string | string[];
  /**
   * @name 注入formItem.KEY字段
   */
  key?: string;

  /**
   * @name 输入组件类型 默认为text
   */
  valueType?: valueType;
  /**
   * @name
   * @todo -------
   */
  component?: string; //自定义组件
  /**
   * @name formItem自定义属性
   */
  formItemProps?: Record<string, any> & FormItemProps;
  /**
   * @name 组件自定义props属性
   */
  comProps?: Record<string, any>;
  /** 
     * @name 枚举值 搭配 FormColumns['valueType']使用
     * @example:             
            valueType: 'select',
            valueEnum: {
                1: '待审核',
                2: '已审核',
            },
     */
  valueEnum?: Record<string | number, any>;
  /**
   * @name 默认值 设置默认值必须要有key
   * @memo ??好像有一点问题
   */
  defaultValue?: string | number;
  /**
   * @name 排序关键字 默认值10000
   */
  order?: number; //排序使用
  /**
   * @name 自定义渲染formItem内容
   * @example    renderItem: () => <Input .... />
   */
  renderItem?: () => ReactNode; //自定义渲染ITEM
  /**
   * @name FormItem占位符
   * 默认一行五个
   * self:输入框大小
   * occupy:实际占据表单大小
   * @example  span={{self:1,occupy:2}} //输入框一格实际占据两格区域
   */
  span?: { self: number; occupy?: number };
  /**
   * @name 模块名 用于归类 与 FormColumnsBlock['name']搭配使用
   */
  blockName?: string; //隶属的BLOCK 名称
};

export type FormColumnsBlock = {
  /**
   * @name block块 card模块名称
   */
  title?: string;
  /**
   * @name 模块名 用于归类 与 FormColumns['name']搭配使用
   */
  name?: string;
  /**
   * @name block块行数
   *  每一行显示的个数，默认五个
   */
  span?: number;
  /**
   * @name formItem数组
   */
  columns?: FormColumns[];
  /**
   * @name 是否显示自定义数据，默认false
   */
  hasCustomizedData?: boolean;
  /**
   * @name 是否为备注
   */
  isMemoBlock?: boolean;
  /**
   * @name 自定义block块内容
   */
  render?: () => ReactNode;
};

export interface IFormLayoutProps<T = any> {
  /**
   * @name 主体block内容数组
   */
  columnsBlocks: FormColumnsBlock[];
  /**
   * @name 业务字段数据
   * 根据分类,表名 筛选自己的业务表数据
   */
  readonly formConfigData?: columnsConfigType[];
  /**
   * @name 表单结束后调用
   * @description 支持异步操作，更加方便
   * @example onFinish={async (values) => { await save(values); return true }}
   */
  onFinish?: (formData: T) => Promise<boolean | void>;
  /**
   * @name 表单onchange回调事件
   */
  onValuesChange?: (changedValues: Record<keyof T, T[keyof T]>, allValues: T) => void;
  /**
   * @name 自定义回调事件
   */
  onRest?: (form: FormInstance<T>) => void;
  /**
   * @name 布局方式，默认垂直
   */
  layout?: FormLayout;
  submitText?: string; //提交按钮名称
  dataPermission?: string[];
}
// 对外current 操作定义
export type FormLayoutAction<T> = {
  getFormInstance: () => FormInstance<T>;
};
