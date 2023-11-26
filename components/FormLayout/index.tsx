/**
 * @file 详细页面布局
 * @todo  点击状态获取历史
 * @desciption 注意：如果有defaultValue 的，一定要有key
 * @description 2.25 增加了表单直接审批的功能
 */

import './index.less';
import {
    Button,
    Card,
    Col,
    Form,
    Input,
    InputNumber,
    Radio,
    Row,
    Select,
    Switch,
    TreeSelect,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import type { FormColumns, FormColumnsBlock, FormLayoutAction, IFormLayoutProps } from './type';
// import WInput from '@/commonv3/components/w_input';
// import WTextArea from '@/commonv3/components/w_textarea';
import { useEffect, useImperativeHandle, useMemo } from 'react';
import React from 'react';
import { FooterToolbar, ProForm } from '@ant-design/pro-components';
import FileUpload from '@/components/FileUpload';
import styles from './index.less';
import type { Rule, RuleObject } from 'antd/lib/form';
import type { columnsConfigType } from '@/common/type/common';
import WDatePicker from '../wDatePicker';
import { pick, isEqual, isFunction, mapValues } from 'lodash';
type FormItemCOL = {
    // 私有属性
    range?: { max: number; min: number; precision?: number };
    //单位
    unit?: string;
    // 输入框宽度
    width?: string | number;
} & FormColumns;


const BaseLayout = <T extends any = any>(
    props: IFormLayoutProps<T>,
    ref: React.ForwardedRef<FormLayoutAction<T>>,
) => {
    const {
        columnsBlocks,
        // service,
        onFinish,
        formConfigData=[],
        onValuesChange,
        onRest,
        layout,
        submitText,
        // flow,
    } = props;
    const [form] = useForm();

    // 对外提供的接口
    useImperativeHandle(ref, () => ({
        // 重载数据
        getFormInstance: () => form,
    }));

    useEffect(() => {
        // 在渲染时候会更新initialValue
        updateInitial();
    }, []);

    useEffect(() => {
        // 在渲染时候会更新initialValue
        updateInitial();
    }, [columnsBlocks]);

    function updateInitial() {
        let iv = {};
        for (let block of columnsBlocks) {
            if (block?.columns) {
                iv = getInitalValue(block.columns, iv);
            }
        }
        if (JSON.stringify(iv) !== '{}') {
            form.setFieldsValue(iv);
        }
    }

    /**
     * 解析formConfigData 为formColumns数组
     */
    const customColmuns = useMemo(() => {
        if (!formConfigData) {
            return null;
        }
        // if (!service) {
        //     return;
        // }
        // const { category, tableName } = service;
        let tc: FormItemCOL[] = [];
        let configData = [...formConfigData];
        for (let data of configData) {
            const { formProps } = data;
            // 表格不显示的跳过
            if ((data.showInForm as unknown as number) === 1) {
                continue;
            }
            let rules: Rule[] = [];

            if (formProps.must) {
                rules = [{ required: formProps.must }];
            }

            // 新增长度校验
            if (formProps.length) {
                rules.push({ max: data.length, message: `最多输入${data.length}位` });
            }
            if (formProps.validate) {
                // @ts-ignore
                rules.push({
                    validator: (rule, value, callback) => validateFeild(rule, value, callback, data),
                });
            }

            let column: FormItemCOL = {
                title: data.title,
                dataIndex: ['customizedData', (data.dataIndex as string) ?? data.key],
                key: data.key,
            };
            if (rules && rules.length > 0) {
                column.formItemProps = { rules };
            }

            if (formProps.props) {
                column.comProps = formProps.props[0];
            }
            if (formProps.component) {
                column.component = data.component;
            }

            if (formProps.inputWidth) {
                column.width = formProps.inputWidth;
            }
            if (data.enumerate && data.enumerate.length > 0) {
                column.valueType = 'select';
                column.valueEnum = {};
                data.enumerate.forEach((item) => {
                    column.valueEnum = { ...column.valueEnum, [item.key]: item.value };
                    if (item.isDefaultValue) {
                        column.defaultValue = item.key;
                    }
                });
            }
            if (formProps.unit) {
                column.unit = data.unit;
            }
            if (
                formProps.min !== undefined ||
                formProps.max !== undefined ||
                formProps.precision !== undefined
            ) {
                column.range = { min: data.min, max: data.max, precision: data.precision };
            }
            if (formProps.blockName) {
                column.blockName = data.blockName;
            }

            if (formProps.sorts) {
                column.order = data.sorts;
            } else {
                // 默认排序值 10000
                column.order = 10000;
            }
            // 只读采用disabled 保持样式统一
            if ((formProps.readOnly as unknown as number) === 1) {
                column.comProps = {
                    disabled: true,
                };
            }
            tc.push(column);
        }
        tc = tc.sort((a, b) => (a.order ?? 0) - (b?.order ?? 0));
        return tc;
    }, [formConfigData]);

    /**
     * 通过各个column 提取初始值，放入全局initialValue中
     * @param columns  属性列
     */
    function getInitalValue(columns: FormItemCOL[], value: Partial<T>) {
        let nv = { ...value };
        for (let col of columns) {
            if (col.defaultValue && col.key) {
                nv[col.key] = col.defaultValue;
            }
        }
        return nv;
    }

    /**
     * 校验字段
     * @param rule
     * @param value
     * @param callback
     * @param data
     * @returns
     */
    const validateFeild = (
        rule: RuleObject,
        value: T,
        callback: (error?: string) => void,
        data: columnsConfigType,
    ) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formData = form.getFieldsValue()
        if (!data.must && !value) {
            return Promise.resolve();
        } else {
            // todo ??  需要确定校验数据的数据类型
            if (eval(data.formProps.validate)) {
                // callback(data.title + '字段校验错误');
                return Promise.resolve();
            } else {
                // callback();
                return Promise.reject(data.title + '字段校验错误');
            }
        }
    };

    /**
     * 渲染所有的输入组件
     * @param data
     * @returns
     */
    const renderInputComponent = (column: FormItemCOL) => {
        if (column.valueType === 'select' && column.valueEnum) {
            // 如果有枚举，直接用选择器  defaultValue={find?.value}
            return (
                <Select {...column.comProps} style={{ width: '100%' }}>
                    {Object.keys(column.valueEnum).map((key) => {
                        // 兼容antd proselect格式,value为{text:xxx}
                        if (column.valueEnum![key] instanceof Object) {
                            return (
                                <Select.Option key={key} value={key}>
                                    {column.valueEnum![key].text}
                                </Select.Option>
                            );
                        } else {
                            return (
                                <Select.Option key={key} value={key}>
                                    {column.valueEnum![key]}
                                </Select.Option>
                            );
                        }
                    })}
                </Select>
            );
        }

        if (column.component) {
            // todo ------组件注入
        }

        switch (column.valueType) {
            case 'textArea':
                return <Input.TextArea style={{ width: column.width ?? '100%' }} {...column.comProps} />;
            case 'digit':
                return (
                    <InputNumber
                        addonAfter={column.unit}
                        style={{ width: column.width ?? '100%' }}
                        {...column.range}
                        {...column.comProps}
                    />
                );
            case "date":
            return <WDatePicker type='DatePicker' style={{ width: column.width ?? "100%" }} {...column.comProps} />
            case 'switch':
                return <Switch /* defaultChecked */ {...column.comProps} />;
            case 'treeSelect':
                return <TreeSelect {...column.comProps} />;
            case 'radio':
                return <Radio.Group {...column.comProps} />;
            case 'text':
            default:
                return (
                    <Input
                        placeholder={`请输入${column.title}`}
                        addonAfter={column.unit}
                        style={{ width: column.width ?? '100%' }}
                        {...column.comProps}
                    />
                );
        }
    };

    /**
     * 根据获取渲染表项，包括自定义
     *
     * @returns
     */
    const renderFormItem = (block: FormColumnsBlock) => {
        let doms = [];
        let rows = [];
        let col = 0;
        let row = 1;
        if (!block.columns) {
            return null;
        }
        // 只过滤隶属自己的
        let columns = block.columns;
        if (block.hasCustomizedData && customColmuns) {
            if (block.name) {
                let cs = customColmuns.filter((item) => item.blockName === block.name);
                columns = [...columns, ...cs];
            } else {
                let cs = customColmuns.filter((item) => !item.blockName);
                columns = [...columns, ...cs];
            }
            columns = columns.sort((a, b) => (a.order ?? 0) - (b?.order ?? 0));
        }
        // 提取初始值
        // getInitalValue(columns);

        // let colNumber = block.span || 4;
        let colNumber;
        if (layout === 'horizontal') {
            colNumber = block.span || 4;
        } else {
            colNumber = block.span || 5;
        }

        // let basic = Math.ceil(24 / colNumber)
        // console.log(columns)
        for (let column of columns) {
            let ocp = 1;
            // 如果有多个占位或者占多列，需要计算位置，行列和col占的列数
            let span = 1; //占的span数量
            if (column.span) {
                span = column.span.self;
                if (column.span.occupy) {
                    ocp = column.span.occupy;
                } else {
                    ocp = column.span.self;
                }
            }
            col += ocp;
            //  console.log(col,span,column.title)
            if (col > colNumber) {
                // 超出的，新组件新起一行,先补充原先的
                rows.push(
                    <Col key={`row-${row}-col-${col}`} flex={colNumber - (col - ocp)} style={{ width: 0 }} />,
                );
                doms.push(
                    <Row justify="start" key={'row-' + row} gutter={[16, 0]}>
                        {rows}
                    </Row>,
                );
                rows = [];
                row++;
                col = ocp;
            }

            if (column.renderItem) {
                rows.push(
                    <Col key={`row-${row}-col-${col}`} flex={span} style={{ width: 0 }}>
                        <Form.Item
                            name={column.dataIndex}
                            label={column.title}
                            {...column.formItemProps}
                            rules={[]}
                        >
                            {column.renderItem()}
                        </Form.Item>
                    </Col>,
                );
            } else {
                rows.push(
                    <Col key={`row-${row}-col-${col}`} flex={span} style={{ width: 0 }}>
                        <Form.Item name={column.dataIndex} label={column.title} {...column.formItemProps}>
                            {renderInputComponent(column)}
                        </Form.Item>
                    </Col>,
                );
            }
            if (column.span && column.span.occupy && column.span.occupy - column.span.self > 0) {
                // 需要补充一个空格的
                rows.push(
                    <Col
                        key={`row-${row}-col-${col + 1}`}
                        flex={column.span.occupy - column.span.self}
                        style={{ width: 0 }}
                    />,
                );
            }
            if (col === colNumber) {
                // 刚好换行
                doms.push(
                    <Row justify="start" key={'row-' + row} gutter={[16, 0]}>
                        {rows}
                    </Row>,
                );
                rows = [];
                row++;
                col = 0;
            }
        }
        if (rows.length > 0) {
            // 由于采用flex，需要将剩余的写入
            rows.push(
                <Col key={`row-${row}-col-${col + 1}`} flex={colNumber - col} style={{ width: 0 }} />,
            );
            // 剩余部分
            doms.push(
                <Row key={'row-' + row + 1} gutter={[16, 0]}>
                    {rows}
                </Row>,
            );
        }
        return doms;
    };

    const renderMemoBlock = () => {
        return (
            <>
                <Row justify="start">
                    <Col span={24}>
                        <ProForm.Item name="memo" label="备注">
                            <Input.TextArea placeholder="请输入备注" />
                        </ProForm.Item>
                    </Col>
                </Row>

                <Row justify="start">
                    <Form.Item name="attach" label="附件">
                        <FileUpload tips="请上传10M以内大小文件" />
                    </Form.Item>
                </Row>
            </>
        );
    };

    /**
     * 渲染每一块
     * @param block
     * @returns
     */
    const renderBlock = (block: FormColumnsBlock, index: number) => {
        console.log('========================');
        console.log('render');        
        if (!block) {
            return null;
        }
        if (block.render) {
            // 如果自定义
            return block.render();
        }
        // 备注block
        if (block.isMemoBlock) {
            return (
                <Card
                    key={'memo' + index}
                    title={block.title}
                    type="inner"
                    className={styles.blockCard}
                    style={{ marginBottom: 16 }}
                    headStyle={{
                        minHeight: 30,
                    }}
                >
                    {renderMemoBlock()}
                </Card>
            );
        } else {
            return (
                <Card
                    key={'content' + index}
                    title={block.title}
                    type="inner"
                    className={styles.blockCard}
                    style={{ marginBottom: 16 }}
                    headStyle={{
                        minHeight: 30,
                    }}
                >
                    {renderFormItem(block)}
                </Card>
            );
        }
    };

    /**
     * 重置表单
     * @returns
     */
    const restEvent = () => {
        if (!!onRest) {
            onRest?.(form);
            return;
        }
        form.resetFields();
    };

    const renderFoot = (_: any, dom: JSX.Element[]) => {
        // 只保留submit  rest自定义
        const newDom = dom.filter((item) => item.key === 'submit');
        return [
            <FooterToolbar key="footer">
                {<Button onClick={restEvent}>重置</Button>}
                {newDom}
            </FooterToolbar>,
        ];
    };


    //起始开始
    if (!columnsBlocks || !formConfigData) {
        return <></>;
    }
    const formItemLayout =
        layout === 'horizontal'
            ? {
                labelCol: { span: 6 },
                wrapperCol: { span: 24 },
            }
            : null;
    return (
        <>
            <div className="WrapperPage">
                <ProForm<T>
                    layout={layout ?? 'vertical'}
                    {...formItemLayout}
                    form={form}
                    onFinish={onFinish}
                    onValuesChange={onValuesChange}
                    submitter={{
                        searchConfig: {
                            submitText: submitText,
                        },
                        render: renderFoot,
                    }}
                >
                    {columnsBlocks.map((block, index) => renderBlock(block, index))}
                </ProForm>
            </div>
        </>
    );
};

const FormLayout = React.memo(React.forwardRef(BaseLayout));

const MemoizedBaseLayout = React.memo(
  React.forwardRef<FormLayoutAction<any>, IFormLayoutProps<any>>(BaseLayout),
  (prevProps, nextProps) => {
    const keysToCompare = [
      'columnsBlocks',
      'formConfigData',
      'layout',
      'submitText',
      'dataPermission',
    ];
    // 需要比较的参数
    const prevSubset = pick(prevProps, keysToCompare);
    const nextSubset = pick(nextProps, keysToCompare);
    // 过滤比较的参数中的函数属性  因为当函数作为对象的属性进行比较时，由于函数在JavaScript中是对象，
    // 它们在内存中的地址每次都会不同。这就是为什么每次比较都会得到不同结果的原因。
    type FilteredObject<T> = {
        [K in keyof T]: T[K] extends (...args: any[]) => any ? null :
                        T[K] extends object ? FilteredObject<T[K]> :
                        T[K];
      };
      
    const filterFunctions = (obj: Record<any,any>): FilteredObject<typeof obj> => {
        return mapValues(obj, (value) => {
          if (Array.isArray(value)) {
            return value.map((item) => filterFunctions(item));
          } else if (typeof value === 'object' && value !== null) {
            return filterFunctions(value);
          } else if (isFunction(value)) {
            return null; // Or any value you'd like to represent functions
          }
          return value;
        });
      };
    
    
    return isEqual( filterFunctions(prevSubset), filterFunctions(nextSubset));
  },
);
// const FormLayout = <T,>(props: IFormLayoutProps<T>) => {
//     return <MemoizedBaseLayout {...props} />;
// };
export default FormLayout;

