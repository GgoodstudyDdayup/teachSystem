import React, { Component } from 'react';
import { Table, Button, Modal, Radio, Pagination, message, Input, Checkbox, Tag } from 'antd';
import { add_user, quanxianList, loginUserList, grade_id_List, object_id_List, delete_user, get_user_detail, edit_user, change_password } from '../../axios/http'
const { confirm } = Modal;
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
            value: -1,
            value2: -1,
            value3: -1,
            //这个是评价自定义课件
            upParmas: {
                username: '',
                password: '',
                name: '',
                mobile: '',
                permission: '',
                teacher_type: '',
                grade_ids: '',
                own_subject_ids: ''
            },
            check: [],
            check2: [],
            grade_list: [],
            own_subject_list: [],
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
            visible3: false,
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
            let permission = res.data.list
            permission.unshift({
                id: '',
                name: '不限'
            })
            this.setState({
                permission
            })
            // store.dispatch(XueKeActionCreators.SaveXueKeActionCreator(res.data.subject_list))
        })
        loginUserList(parmas).then(res => {
            const list = res.data.list.map((res, index) => {
                res.key = `${index}`
                return res
            })
            this.setState({
                data: list,
                totalCount: Number(res.data.total_count)
            })
        })
        grade_id_List().then(res => {
            const grade_list2 = res.data.grade_list.map(res => {
                return res.name
            })
            this.setState({
                grade_list: res.data.grade_list,
                grade_list2
            })
        })
        object_id_List().then(res => {
            const own_subject_list2 = res.data.own_subject_list.map(res => {
                return res.name
            })
            this.setState({
                own_subject_list: res.data.own_subject_list,
                own_subject_list2
            })
        })


    }
    quanxianList = (list) => {
        const result = list.map((res, index) => {
            return <Radio value={Number(res.id)} key={index}>{res.name}</Radio>
        })
        return result
    }
    //添加账户input框
    setUsername = (e, type) => {
        const upParmas = this.state.upParmas
        upParmas[type] = e.target.value
        this.setState({
            upParmas
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
        const grade_list = this.state.grade_list
        const own_subject_list = this.state.own_subject_list
        const check = this.state.check
        const check2 = this.state.check2
        if (check.length < 0) {
            message.error('请填写必填项')
            return false
        } else {
            let grade = ''
            let object = ''
            check.forEach(res => {
                grade_list.forEach(res2 => {
                    if (res2.name === res) {
                        grade += res2.id + ','
                    }
                })
            })
            check2.forEach(res => {
                own_subject_list.forEach(res2 => {
                    if (res2.name === res) {
                        object += res2.id + ','
                    }
                })
            })
            upParmas.grade_ids = grade
            upParmas.own_subject_ids = object
            add_user(upParmas).then(res => {
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
        }
    };
    handleOk2 = () => {
        const upParmas = { ...this.state.upParmas }
        const parmas = { ...this.state.parmas }
        const grade_list = this.state.grade_list
        const own_subject_list = this.state.own_subject_list
        const check = this.state.check
        const check2 = this.state.check2
        if (check.length < 0) {
            message.error('请填写必填项')
            return false
        } else {
            let grade = ''
            let object = ''
            check.forEach(res => {
                grade_list.forEach(res2 => {
                    if (res2.name === res) {
                        grade += res2.id + ','
                    }
                })
            })
            check2.forEach(res => {
                own_subject_list.forEach(res2 => {
                    if (res2.name === res) {
                        object += res2.id + ','
                    }
                })
            })
            upParmas.grade_ids = grade
            upParmas.own_subject_ids = object
            console.log(upParmas)
            edit_user(upParmas).then(res => {
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
        }
    };
    handleOk3 = () => {
        const upParmas = this.state.upParmas
        const data = {
            user_id: this.state.user_id,
            password: upParmas.password
        }
        change_password(data).then(res => {
            if (res.code === 0) {
                message.success(res.message)
                this.handleCancel()
            } else {
                message.error(res.message)
                this.handleCancel()
            }
        })
    };
    handleCancel = e => {
        this.setState({
            visible: false,
            visible2: false,
            visible3: false,
            fileList: [],
            title: '',
            checkList: [],
            textArea: '',
            check: [],
            check2: [],
            value: '',
            value3: '',
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
        const parmas = this.state.parmas
        parmas.subject_id = value[1]
        this.setState({
            parmas
        })
    }
    onChangecheckbox = (e) => {
        const upParmas = { ...this.state.upParmas }
        let check = this.state.check
        upParmas.grade_ids = e
        check = e
        this.setState({
            check,
            upParmas
        });
    }
    onChangecheckbox2 = (e) => {
        console.log(e)
        const upParmas = { ...this.state.upParmas }
        let check2 = this.state.check2
        upParmas.own_subject_ids = e
        check2 = e
        this.setState({
            check2,
            upParmas
        });
    }
    onchangeTuanduiRadio = (e) => {
        const parmas = this.state.parmas
        parmas.permission = e.target.value
        this.setState({
            value2: e.target.value,
            parmas
        })
    }


    onchangeStateRadio = (e) => {
        const upParmas = this.state.upParmas
        upParmas.permission = e.target.value
        this.setState({
            value: e.target.value,
            upParmas
        })
    }
    onChangeteachType = e => {
        const upParmas = this.state.upParmas
        upParmas.teacher_type = e.target.value
        this.setState({
            value3: e.target.value,
            upParmas
        })
    }
    changName = (e) => {
        const parmas = this.state.parmas
        parmas.name = e.target.value
        this.setState({
            name: e.target.value,
            parmas
        })
    }
    changUserName = (e) => {
        const parmas = this.state.parmas
        parmas.username = e.target.value
        this.setState({
            username: e.target.value,
            parmas
        })
    }
    tagC = (e) => {
        if (e) {
            const tagList = e.split(',').map((res, index) => {
                return <Tag color='green' key={index}>{res}</Tag>
            })
            return tagList
        }
    }
    quanxianTag = (e) => {
        const permission = this.state.permission
        let name = ''
        permission.forEach(res => {
            if (res.id === e) {
                name = res.name
            }
        })
        return <Tag color='geekblue' >{name}</Tag>
    }
    teachTag = e => {
        let name = ''
        if (e === '1') {
            name = '校助'
        } else if (e === '2') {
            name = '教学主管'
        } else if (e === '3') {
            name = '教研组长'
        } else {
            name = '普通老师'
        }
        return <Tag color='geekblue' >{name}</Tag>
    }
    detail = e => {
        let user_id = { user_id: e.id }
        const grade_list = this.state.grade_list
        const own_subject_list = this.state.own_subject_list
        const upParmas = this.state.upParmas
        let value = this.state.value
        let value3 = this.state.value3
        get_user_detail(user_id).then(res => {
            upParmas.name = res.data.model.name
            upParmas.username = res.data.model.username
            upParmas.user_id = res.data.model.id
            upParmas.permission = res.data.model.permission
            upParmas.teacher_type = res.data.model.teacher_type
            value = Number(res.data.model.permission)
            value3 = Number(res.data.model.teacher_type)
            if (res.data.model.tags) {
                const tags = res.data.model.tags.split(',')
                const check = []
                const check2 = []
                tags.forEach(res => {
                    grade_list.forEach(l1 => {
                        if (res === l1.name) {
                            check.push(l1.name)
                        }
                    })

                })
                tags.forEach(res => {
                    own_subject_list.forEach(l1 => {
                        if (res === l1.name) {
                            check2.push(l1.name)
                        }
                    })
                })
                this.setState({
                    check,
                    check2,
                    upParmas,
                    value,
                    value3,
                    visible2: true,
                    user_id
                })
            } else {
                this.setState({
                    upParmas,
                    value,
                    value3,
                    visible2: true,
                    user_id
                })
            }

        })
    }
    delete = e => {
        const that = this
        let user_id = {
            user_id: e.id
        }
        const parmas = { ...this.state.parmas }
        confirm({
            title: `删除账号：${e.name}`,
            content: '你确定要删除吗',
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                delete_user(user_id).then(res => {
                    if (res.code === 0) {
                        loginUserList(parmas).then(res => {
                            const list = res.data.list.map((res, index) => {
                                res.key = `${index}`
                                return res
                            })
                            that.setState({
                                data: list,
                                totalCount: Number(res.data.total_count),
                            })
                        })
                        message.success(res.message)
                    } else {
                        message.error(res.message)
                    }

                })
            },
            onCancel() {
            },
        });
    }
    detailPassword = e => {
        this.setState({
            user_id: e.id,
            visible3: true,
        })
    }
    render() {
        const columns = [
            {
                title: '姓名',
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
                title: '拥有权限',
                dataIndex: 'permission',
                key: 'permission',
                render: (text) => (
                    <span>
                        {this.quanxianTag(text)}
                    </span>
                ),
            },
            {
                title: '老师类型',
                dataIndex: 'teacher_type',
                key: 'teacher_type',
                render: (text) => (
                    <span>
                        {this.teachTag(text)}
                    </span>
                ),
            },
            {
                title: '年级和学科',
                dataIndex: 'tags',
                key: 'tags',
                render: (text) => (
                    <span>
                        {this.tagC(text)}
                    </span>
                ),
            },
            {
                title: '操作',
                key: 'action',
                render: (text) => (
                    <span>
                        <Button type="primary" onClick={() => this.detailPassword(text)}>修改密码</Button>
                        <Button className="m-left" type="primary" onClick={() => this.detail(text)}>修改</Button>
                        {text.id === '1' ? '' : <Button className="m-left" type="danger" onClick={() => this.delete(text)}>删除</Button>}
                    </span>
                ),
            },
        ];
        return (
            <div>
                <Modal
                    title="添加账户"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText='确认'
                    cancelText='取消'
                >
                    <div className="m-flex m-bottom" style={{ flexWrap: 'nowrap' }}>
                        <span className="m-row" style={{ textAlign: 'right' }}>用户名：</span>
                        <Input value={this.state.upParmas.username} onChange={(e) => this.setUsername(e, 'username')} placeholder="请输入用户名"></Input>
                    </div>
                    <div className="m-flex m-bottom" style={{ flexWrap: 'nowrap' }}>
                        <span className="m-row" style={{ textAlign: 'right' }}>登录密码：</span>
                        <Input text='password' value={this.state.upParmas.password} onChange={(e) => this.setUsername(e, 'password')} placeholder="请输入登录密码"></Input>
                    </div>
                    <div className="m-flex m-bottom" style={{ flexWrap: 'nowrap' }}>
                        <span className="m-row" style={{ textAlign: 'right' }}>姓名：</span>
                        <Input text='password' value={this.state.upParmas.name} onChange={(e) => this.setUsername(e, 'name')} placeholder="请输入姓名"></Input>
                    </div>
                    <div className="m-flex m-bottom" style={{ flexWrap: 'nowrap' }}>
                        <span className="m-row" style={{ textAlign: 'right' }}>手机号码：</span>
                        <Input text='password' value={this.state.upParmas.mobile} onChange={(e) => this.setUsername(e, 'mobile')} placeholder="请输入手机号码"></Input>
                    </div>
                    <div className="m-flex m-bottom">
                        <span className="m-row">权限设置：</span>
                        <Radio.Group onChange={this.onchangeStateRadio} value={this.state.value}>
                            {this.quanxianList(this.state.permission)}
                        </Radio.Group>
                    </div>
                    <div className="m-flex m-bottom">

                        <span className="m-row">老师类型：</span>
                        <Radio.Group onChange={this.onChangeteachType} value={this.state.value3}>
                            <Radio value={1} >校助</Radio>
                            <Radio value={2} >教学主管</Radio>
                            <Radio value={3} >教研组长</Radio>
                            <Radio value={4} >普通老师</Radio>
                        </Radio.Group>
                    </div>
                    <div className="m-flex m-bottom">
                        <span className="m-row">年级(多选)：</span>
                        <Checkbox.Group
                            options={this.state.grade_list2}
                            value={this.state.check}
                            onChange={this.onChangecheckbox}
                        />

                    </div>
                    <div className="m-flex m-bottom">
                        <span className="m-row">学科(多选)：</span>
                        <Checkbox.Group
                            options={this.state.own_subject_list2}
                            value={this.state.check2}
                            onChange={this.onChangecheckbox2}
                        />
                    </div>
                </Modal>


                <Modal
                    title="修改账户"
                    visible={this.state.visible2}
                    onOk={this.handleOk2}
                    onCancel={this.handleCancel}
                    okText='确认'
                    cancelText='取消'
                >
                    <div className="m-flex m-bottom" style={{ flexWrap: 'nowrap' }}>
                        <span className="m-row" style={{ textAlign: 'right' }}>用户名：</span>
                        <Input value={this.state.upParmas.username} onChange={(e) => this.setUsername(e, 'username')} placeholder="请输入用户名"></Input>
                    </div>

                    <div className="m-flex m-bottom" style={{ flexWrap: 'nowrap' }}>
                        <span className="m-row" style={{ textAlign: 'right' }}>姓名：</span>
                        <Input text='password' value={this.state.upParmas.name} onChange={(e) => this.setUsername(e, 'name')} placeholder="请输入姓名"></Input>
                    </div>
                    <div className="m-flex m-bottom" style={{ flexWrap: 'nowrap' }}>
                        <span className="m-row" style={{ textAlign: 'right' }}>手机号码：</span>
                        <Input text='password' value={this.state.upParmas.mobile} onChange={(e) => this.setUsername(e, 'mobile')} placeholder="请输入手机号码"></Input>
                    </div>
                    <div className="m-flex m-bottom">
                        <span className="m-row">权限设置：</span>
                        <Radio.Group onChange={this.onchangeStateRadio} value={this.state.value}>
                            {this.quanxianList(this.state.permission)}
                        </Radio.Group>
                    </div>
                    <div className="m-flex m-bottom">

                        <span className="m-row">老师类型：</span>
                        <Radio.Group onChange={this.onChangeteachType} value={this.state.value3}>
                            <Radio value={1} >校助</Radio>
                            <Radio value={2} >教学主管</Radio>
                            <Radio value={3} >教研组长</Radio>
                            <Radio value={4} >普通老师</Radio>
                        </Radio.Group>
                    </div>
                    <div className="m-flex m-bottom">
                        <span className="m-row">年级(多选)：</span>
                        <Checkbox.Group
                            options={this.state.grade_list2}
                            value={this.state.check}
                            onChange={this.onChangecheckbox}
                        />

                    </div>
                    <div className="m-flex m-bottom">
                        <span className="m-row">学科(多选)：</span>
                        <Checkbox.Group
                            options={this.state.own_subject_list2}
                            value={this.state.check2}
                            onChange={this.onChangecheckbox2}
                        />
                    </div>
                </Modal>

                <Modal
                    title="修改密码"
                    visible={this.state.visible3}
                    onOk={this.handleOk3}
                    onCancel={this.handleCancel}
                    okText='确认'
                    cancelText='取消'
                >
                    <div className="m-flex m-bottom" style={{ flexWrap: 'nowrap' }}>
                        <span className="m-row" style={{ textAlign: 'right' }}>密码：</span>
                        <Input value={this.state.upParmas.password} onChange={(e) => this.setUsername(e, 'password')} placeholder="请输新密码"></Input>
                    </div>
                </Modal>

                <div className="m-bottom m-flex" style={{ alignItems: 'center' }}>
                    <div >
                        <Input value={this.state.name} onChange={this.changName} placeholder="请输入要查询的老师"></Input>
                    </div>
                    <div className="m-left">
                        <Input value={this.state.username} onChange={this.changUserName} placeholder="请输入要查询的用户名"></Input>
                    </div>
                    <div className="m-left">
                        <span>权限查询: </span>
                        <Radio.Group onChange={this.onchangeTuanduiRadio} value={this.state.value2}>
                            {this.quanxianList(this.state.permission)}
                        </Radio.Group>
                    </div>
                    <Button style={{ marginLeft: 10 }} onClick={this.search}>
                        查询
                    </Button>
                </div>
                <div className="m-bottom">
                    <Button type="primary" onClick={this.showModal}>添加账号</Button>
                </div>
                <Table rowKey={record => record.key} columns={columns} dataSource={this.state.data} pagination={false} scroll={{ y: 500 }} />
                <Pagination className="m-Pleft" current={this.state.parmas.page} onChange={this.changePage} total={this.state.totalCount} />
            </div>
        );
    }

}
export default bk;