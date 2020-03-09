import React, { useState, useEffect } from 'react';
import { Input, List, Avatar, Pagination } from 'antd';
import { ztshijuan } from '../../axios/http'
const { Search } = Input;
const Knowlage = (props) => {
    const [total_count, setTotal_count] = useState(0)
    const [count, setCount] = useState(1)
    const [shijuanList, setShijuanList] = useState('')
    const onChangePage = (e) => {
        props.params.page = e
        setCount(e)
        ztshijuan(props.params).then(res => {
            setTotal_count(Number(res.data.total_count))
            setShijuanList(res.data.list)
        })
    }
    useEffect(() => {
        props.params.page = 1
        ztshijuan(props.params).then(res => {
            setTotal_count(Number(res.data.total_count))
            setShijuanList(res.data.list)
            setCount(1)
        })
    }, [props.params])
    return (
        <div>
            <Search
                placeholder="搜索真题试卷"
                onSearch={value => console.log(value)}
                style={{ width: 200 }}>
            </Search>
            <div className='m-know-list'>
                <List
                    className="list-hover"
                    itemLayout="vertical"
                    dataSource={shijuanList}
                    size='small'
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={require('../../img/shijuan.png')} />}
                                description={item.show_name}
                            />
                        </List.Item>
                    )}
                />
            </div>
            <div className="m-pageination">
                <Pagination onChange={onChangePage} total={total_count} current={count} simple />
            </div>
        </div>
    )
}
export default Knowlage