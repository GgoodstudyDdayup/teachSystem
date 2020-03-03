import React, { Component } from 'react';
import { Table, Button, Modal, Radio, Pagination, message, Input } from 'antd';
import { jiangyishenghe, quanxianList, loginUserList } from '../../axios/http'
class bk extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //这个是查询条件
            parmas: {
                name: '',
                username: '',
                permission: '',
                page: 1,
                page_size: 10,
            },
            textArea: '',
            title: '',
            value2: -1,
            value3: -1,
            //这个是评价自定义课件
            upParmas: {
                id: '',
                status: null,
                comment: '',
                course_id: ''
            },
            totalCount: 100,
            obj: {
                has_zhishijingjiang: '知识精讲',
                has_sandianpouxi: '三点剖析',
                has_liti: '例题',
                has_suilian: '随练',
                has_kuozhan: '扩展',
            },
            time: new Date(),
            fileList: [],
            checkList: [],
            visible: false,
            permission: [],
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
        let myDate = new Date();
        let time = myDate.toLocaleDateString().split("/").join("-");
        const parmas = this.state.parmas
        parmas['starttime'] = time
        quanxianList().then(res => {
            console.log(res)

            this.setState({
                permission: res.data.list
            })
            // store.dispatch(XueKeActionCreators.SaveXueKeActionCreator(res.data.subject_list))
        })
        loginUserList(parmas).then(res => {
            console.log(res)
            const list = res.data.list.map((res, index) => {
                res.key = `${index}`
                return res
            })
            this.setState({
                data: list
            })
        })

    }
    quanxianList = (list) => {
        const result = list.map((res, index) => {
            return <Radio value={res.id} key={index}>{res.name}</Radio>
        })
        return result
    }
    //日期改变
    onchange = (value, dateString) => {
        console.log(value, dateString)
        const parmas = this.state.parmas
        parmas['starttime'] = dateString[0]
        parmas['endtime'] = dateString[1]
        this.setState({
            parmas
        })
    }

    showModal = () => {
        this.setState({
            visible: true
        });
    };
    handleOk = () => {
        const upParmas = { ...this.state.upParmas }
        const parmas = { ...this.state.parmas }
        jiangyishenghe(upParmas).then(res => {
            console.log(res)
            if (res.code === 0) {
                message.success(res.message)
                loginUserList(parmas).then(res => {
                    const list = res.data.list.map((res, index) => {
                        res.key = `${index}`
                        return res
                    })
                    this.setState({
                        data: list,
                        totalCount: Number(res.data.total_count),
                    })
                })
                this.handleCancel()
            } else {
                message.success(res.message)
                this.handleCancel()
            }
        })

    };
    handleCancel = e => {
        this.setState({
            visible: false,
            fileList: [],
            title: '',
            checkList: [],
            textArea: '',
            value: '',
            upParmas: {
                id: '',
                status: null,
                comment: ''
            },
        });
    };
    handleChange = info => {
        let fileList = [...info.fileList];
        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-2);
        // 2. Read from response and show file link
        fileList = fileList.map(file => {
            if (file.response) {
                if (file.response.data.code !== 106) {
                    file.url = file.response.data.full_path;
                } else {
                    return false
                }
            }
            // Component will show file.url as link
            return file
        })
        this.setState({ fileList });
    };
    changeTitle = (e) => {
        console.log(e)
        const upParmas = { ...this.state.upParmas }
        upParmas.title = e.target.value
        this.setState({
            title: e.target.value,
            upParmas
        })
    }
    changePage = page => {
        const parmas = { ...this.state.parmas }
        parmas.page = page
        loginUserList(parmas).then(res => {
            const list = res.data.list.map((res, index) => {
                res.key = `${index}`
                return res
            })
            this.setState({
                data: list,
                totalCount: Number(res.data.total_count),
                parmas
            })
        })
    };
    search = () => {
        const parmas = this.state.parmas
        loginUserList(parmas).then(res => {
            console.log(res)
            if (res.code === 0) {
                const list = res.data.list.map((res, index) => {
                    res.key = `${index}`
                    return res
                })
                message.success(res.message)
                parmas.name = ''
                parmas.username = ''
                this.setState({
                    data: list,
                    totalCount: Number(res.data.total_count),
                    parmas,
                    name: '',
                    username: ''
                })
            } else {
                message.error(res.message)
            }

        })
    }
    selectonChange = (value) => {
        console.log(value);
        const parmas = this.state.parmas
        parmas.subject_id = value[1]
        this.setState({
            parmas
        })
    }
    onChangecheckbox = (e) => {
        const upParmas = this.state.upParmas
        upParmas.status = e.target.value
        this.setState({
            value: e.target.value,
            upParmas
        });
        console.log(upParmas)
    }
    onchangeTuanduiRadio = (e) => {
        const parmas = this.state.parmas
        parmas.permission = e.target.value
        this.setState({
            value2: e.target.value,
            parmas
        })
        console.log(parmas)
    }
    onchangeStateRadio = (e) => {
        const parmas = this.state.parmas
        parmas.check_status = e.target.value
        this.setState({
            value3: e.target.value,
            parmas
        })
        console.log(parmas)
    }
    changName = (e) => {
        const parmas = this.state.parmas
        parmas.name = e.target.value
        this.setState({
            name: e.target.value,
            parmas
        })
        console.log(parmas)
    }
    changUserName = (e) => {
        const parmas = this.state.parmas
        parmas.username = e.target.value
        this.setState({
            username: e.target.value,
            parmas
        })
        console.log(parmas)
    }
    tabLinkFilePath = (url) => {
        window.open(url)
    }
    render() {
        const columns = [
            {
                title: '老师姓名',
                dataIndex: 'name',
                key: 'name',
                render: (text) => (
                    <span>
                        {text ? text : 'null'}
                    </span>
                ),
            },
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
                render: (text) => (
                    <span>
                        {text ? text : 'null'}
                    </span>
                ),
            },
            {
                title: '操作',
                key: 'action',
                render: (text) => (
                    <span>
                        <Button type="primary" onClick={() => this.showModal(text.id, text.file, text.course_id)}>分配权限</Button>
                    </span>
                ),
            },
        ];
        return (
            <div>
                <Modal
                    title="权限设置"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText='确认'
                    cancelText='取消'
                >
                    <div className="m-flex m-bottom">
                        <span className="m-row">权限设置：</span>
                        <Radio.Group onChange={this.onChangecheckbox} value={this.state.value}>
                            {this.quanxianList(this.state.permission)}
                        </Radio.Group>
                    </div>

                </Modal>
                <div className="m-bottom m-flex" style={{ alignItems: 'center' }}>
                    <div className="m-left">
                        <Input value={this.state.name} onChange={this.changName} placeholder="请输入要查询的老师"></Input>
                    </div>
                    <div className="m-left">
                        <Input value={this.state.username} onChange={this.changUserName} placeholder="请输入要查询的用户名"></Input>
                    </div>
                    <Button type="primary" style={{ marginLeft: 10 }} onClick={this.search}>
                        查询
                    </Button>
                    <div className="m-left">
                        <span>权限查询: </span>
                        <Radio.Group onChange={this.onchangeTuanduiRadio} value={this.state.value2}>
                            {this.quanxianList(this.state.permission)}
                            {/* <Radio value={-1}>未审核</Radio>
                            <Radio value={1}>审核通过</Radio>
                            <Radio value={2}>审核未通过</Radio> */}
                        </Radio.Group>
                    </div>

                </div>
                <Table rowKey={record => record.key} columns={columns} dataSource={this.state.data} pagination={false} scroll={{ y: 500 }} />
                <Pagination className="m-Pleft" current={this.state.parmas.page} onChange={this.changePage} total={this.state.totalCount} />
            </div>
        );
    }

}
export default bk;