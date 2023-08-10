/**
 * @Author QIANMINGLIANG
 * @Date 2023-08-05 10:50:25
 * @Description 请填写简介
 * @memo 
 * @todo 
 */

import { Row, Col, Carousel, Spin } from "antd";
import { DotPosition } from "antd/lib/carousel";
import styles from './index.less'
import React from "react";
import { chunk } from "lodash";
import './index.less'
const headerStyle: React.CSSProperties = {
    height: '32px',
    // backgroundColor: '#F0F8FD',
    lineHeight: '32px',
    color: '#fff',
};
const rowStyle: React.CSSProperties = {
    padding: '5px 10px',
    // borderBottom: '1px dashed #E6E6E6',
};
type Tdata = Record<string, any>
interface Iprops {
    dataSource?: Tdata[]
    // title key关键字名称映射
    columns: {
        title: string,
        dataIndex: string,
        span?: number
    }[],
    // 一页展示几条 默认一条
    chunk?: number,
}
export default (props: Iprops) => {
    const { dataSource: propsDataSource = [], columns = [], chunk: num = 1 } = props
    if (propsDataSource.length === 0) {
        return (
            <>
                <Spin />
            </>
        );
    }
    const dataSource = React.useMemo(() => {
        return chunk(propsDataSource, num)
    }, [propsDataSource, num])

    const CarouselProps = {
        dots: false,
        cssEase: 'linear',
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 5000,
        dotPosition: 'left' as DotPosition,
    };
    return <>
        <div style={{ textAlign: 'center', height: '100%' }} className={styles.container}>
            <div style={headerStyle}>
                <Row justify="space-around" wrap={false}>
                    {columns.map(item => <Col style={{ flex: item.span }} key={item.dataIndex} >{item.title}</Col>)}
                </Row>
            </div>
            <Carousel {...CarouselProps}>
                {dataSource.map((page, idx) => {
                    return (
                        <div key={idx} style={{ width: '100%' }}>
                            {page.map((item, idxs: number) => {
                                return (
                                    <div key={idxs} className="table-row-carousel">
                                        <Row justify="space-around" wrap={false} style={rowStyle}>
                                            {columns.map(record => {
                                                return <Col key={record.dataIndex} className="table-col-carousel" style={{ flex: record.span }} >
                                                    {item[record.dataIndex]}
                                                </Col>
                                            })}
                                        </Row>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </Carousel>
        </div>
    </>
}