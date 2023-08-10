/**
 * @Author QIANMINGLIANG
 * @Date 2023-08-09 13:31:21
 * @Description 请填写简介
 * @memo 
 * @todo 
 */

import { Button, Modal, ModalProps, Space, Tooltip } from 'antd';
import React, { useEffect } from 'react';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import useMergeValue from '@/pages/EnergyQuota/hooks/useMergeValue';
import styles from './index.less'
interface ListSelectModalProps extends ModalProps {
    // visible可受控
    visible?: boolean;
    // visible 回调
    onVisibleChange?: (visible: boolean) => void;
    // [ReactNode 和 ReactElement 的关系]<https://juejin.cn/post/6991488685787054116>
    children?: React.ReactElement;
    // 发货申请用
    dataSource?: any[];
    columns: ProColumns<any>[]
    title: string
}

export default (props: ListSelectModalProps) => {
    const { visible, onVisibleChange, children: childrenDom, dataSource = [], columns,title,...restProps} = props;
    const [selfVisible, setselfVisible] = useMergeValue<boolean>(false, {
        value: visible,
        onChange: onVisibleChange,
    });
    // 取消
    const onCloseModal = () => {
        setselfVisible(false);
    };
    const childProps = {
        onClick: () => {
            setselfVisible(true);
        },
        style: {
            cursor: 'pointer'
        }
    };
    const renderChildren = () => {
        if (!childrenDom) {
            return null;
        }
        return React.cloneElement(childrenDom, childProps);
    };
    return (
        <>
            {renderChildren()}
            <Modal
                className={styles.modal}
                title={<div className={styles.modalTitle}>{title}</div>}
                open={selfVisible}
                onCancel={onCloseModal}
                footer={false}
                width={'914px'}
                forceRender
                destroyOnClose
                mask={false}
                bodyStyle={{
                    padding: '0'
                }}
                {...restProps}
            >
                <ProTable
                    className={styles.table}
                    search={false}
                    options={false}
                    columns={columns}
                    dataSource={dataSource}
                />
            </Modal>
        </>
    );
};
