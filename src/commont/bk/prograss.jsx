import React, { Component } from 'react';
import { Table, DatePicker, Tag, Pagination } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN'
import { jindu } from '../../axios/http'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn')
const { RangePicker } = DatePicker;
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <span>{text}</span>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
            <span>
                {tags.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </span>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <span>
                <span style={{ marginRight: 16 }}>Invite {record.name}</span>
                <span>Delete</span>
            </span>
        ),
    },
];
const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];
class prograss extends Component {
    constructor(props) {
        super(props)
        this.state = {
            parmas: {
                subject_id: 38,
                starttime: '2020-2-27',
                endtime: '',
                check_status: '',
                name: '',
                is_team: '',
                page: 1,
                page_size: 10
            }
        }
    }
    componentDidMount() {
        const parmas = { ...this.state.parmas }
        jindu(parmas).then(res => {
            console.log(res)
        })
    }
    changePage = page => {
        console.log(page)
        const parmas = { ...this.state.parmas }
        parmas.page = page
        this.setState({
            parmas
        });
    };
    render() {
        return (
            <div>
                <RangePicker locale={locale} onChange={this.onchange} />
                <Table columns={columns} dataSource={data} pagination={false} scroll={{ y: 500 }}/>
                <Pagination current={this.state.parmas.page} onChange={this.changePage} total={50} />
            </div>
        );
    }
}

export default prograss;