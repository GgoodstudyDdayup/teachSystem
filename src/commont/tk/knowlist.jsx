import React from 'react';
import { Input, List, Avatar, Pagination } from 'antd';
const { Search } = Input;
const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 3',
    },
];
const Knowlage = () => {
    return (
        <div>
            <Search
                placeholder="搜索真题试卷"
                onSearch={value => console.log(value)}
                style={{ width: 200 }}>
            </Search>
            <div className='m-know-list'>
                <List
                    itemLayout="vertical"
                    dataSource={data}
                    size='small'
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={require('../../img/shijuan.png')} />}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                        </List.Item>
                    )}
                />
            </div>
            <div className="m-pageination">
                <Pagination total={1000} defaultCurrent={1} simple />
            </div>
        </div>
    )
}
export default Knowlage