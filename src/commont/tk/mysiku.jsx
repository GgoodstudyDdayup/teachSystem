import React from 'react';
import { Empty,Button } from 'antd';
const empty2 = (props) => {
    const creatT = ()=>{
        props.funt()
    }
    return (
        <div>
            <Empty description={`没有满足条件的试题！`}
                image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                imageStyle={{
                    height: 60,
                }}
            >
                <Button type="primary" onClick={creatT}>创建试题</Button>
            </Empty>
        </div >
    )
}
export default empty2