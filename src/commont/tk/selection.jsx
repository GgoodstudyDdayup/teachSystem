import React from 'react';
import { Cascader } from 'antd';
function onChange(value) {
    console.log(value);
}
const Select = (props) => {
    return (<div>
        <Btn data={props.data}></Btn>
    </div>)
}

const Btn = props => {
    return (
        <div>
            <Cascader
                fieldNames={{ label: 'name', value: 'code', children: 'items' }}
                options={props.data}
                expandTrigger="hover"
                allowClear={false}
                onChange={onChange}
                placeholder="选择年级学科"
            />
        </div>)
}

export default Select