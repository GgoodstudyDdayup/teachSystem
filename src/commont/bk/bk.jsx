import React, { Component } from 'react';
import { Table, Button } from 'antd';
import { paike } from '../../axios/http'


class bk extends Component {
    constructor(props) {
        super(props)
        this.state = {
            parmas: {
                starttime: '2020-02-01',
                endtime: '',
                isfinished: 1,
                page: 1,
                page_size: '',
            },
            data: [
                {
                    key: '11',
                    time: 32,
                    endtime: 'New York No. 1 Lake Park',
                },
                {
                    key: '2',
                    time: 42,
                    endtime: 'London No. 1 Lake Park',
                },
                {
                    key: '3',
                    time: 32,
                    endtime: 'Sidney No. 1 Lake Park',
                },
            ]
        }
    }
    componentDidMount() {
        paike(this.state.parmas).then(res => {
            console.log(res)
            this.setState({
                data: res.data.list
            })
        })
    }
    model = (e)=>{
        console.log(e)
    }
    render() {
        const columns = [
            {
                title: '上课时间',
                dataIndex: 'starttime',
                key: 'starttime',
            },
            {
                title: '下课时间',
                dataIndex: 'endtime',
                key: 'endtime',
            },
            {
                title: '操作',
                key: 'action',
                render: (text) => (
                    <span>
                        <Button type="primary" onClick={()=>this.model(text.course_id)}>上传讲义{console.log(text)}</Button>
                    </span>
                ),
            },
        ];
        return (
            <div>
                <Table columns={columns} dataSource={this.state.data} />
            </div>
        );
    }
}

export default bk;