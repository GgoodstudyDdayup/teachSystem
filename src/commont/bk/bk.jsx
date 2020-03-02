import React, { Component } from 'react';
import { Table, Button, DatePicker, Modal, Upload, Input, Checkbox, Pagination, message } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN'
import { paike, zidingyikejian } from '../../axios/http'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn')
const { RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;
const plainOptions = ['知识精讲', '三点剖析', '例题', '随练', '扩展'];
const dateFormat = 'YYYY-MM-DD'
class bk extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //这个是查询条件
            parmas: {
                starttime: '2020-02-01',
                endtime: '',
                isfinished: '',
                page: 1,
                page_size: 10,
            },
            title: '',
            //这个是自定义课件
            upParmas: {
                subject_id: '',
                grade_id: '',
                course_id: '',
                title: '',
                has_zhishijingjiang: -1,
                has_sandianpouxi: -1,
                has_liti: -1,
                has_suilian: -1,
                has_kuozhan: -1,
                file: ''
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

        paike(parmas).then(res => {
            const list = res.data.list.map((res, index) => {
                res.key = `${index}`
                return res
            })
            this.setState({
                data: list,
                totalCount: Number(res.data.total_count),
                time,
                parmas
            })
        })
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
    onChangecheckbox = (e) => {
        this.setState({
            checkList: e
        })
    }
    showModal = (e) => {
        const upParmas = this.state.upParmas
        upParmas['course_id'] = e
        this.setState({
            visible: true,
            upParmas,
            fileList: [],
        });
    };
    handleOk = () => {
        const fileList = this.state.fileList
        let path = ''
        fileList.forEach(file => {
            path += file.response.data.full_path + ',';
        })
        const checkList = this.state.checkList
        const obj = { ...this.state.obj }
        const upParmas = { ...this.state.upParmas }
        upParmas.file = path
        checkList.forEach(res => {
            Object.keys(obj).forEach(ele => {
                if (obj[ele] === res) {
                    upParmas[ele] = 1
                }
            })
        })
        zidingyikejian(upParmas).then(res => {
            console.log(res)
            if (res.code === 0) {
                message.success(res.message)
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
            fileList: [],
            checkList: [],
            upParmas: {
                subject_id: '',
                grade_id: '',
                course_id: '',
                title: '',
                has_zhishijingjiang: -1,
                has_sandianpouxi: -1,
                has_liti: -1,
                has_suilian: -1,
                has_kuozhan: -1,
                file: ''
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
        paike(parmas).then(res => {
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
        paike(parmas).then(res => {
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
                title: '班级',
                dataIndex: 'classname',
                key: 'classname',
            },

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
                title: '是否备课',
                dataIndex: 'is_beike',
                key: 'is_beike',
                render: (text) => (
                    <span>
                        {text === 1 ? '已备课' : '未备课'}
                    </span>
                ),
            },
            {
                title: '是否上课',
                dataIndex: 'isfinished',
                key: 'isfinished',
                render: (text) => (
                    <span>
                        {text === 1 ? '已完成' : '未完成'}
                    </span>
                ),
            },
            {
                title: '备课审核状态',
                dataIndex: 'beike_check_status',
                key: 'beike_check_status',
                render: (text) => (
                    <span>
                        {text === '-1' ? '暂无审核' : '审核未通过'}
                        
                    </span>
                ),
            },
            {
                title: '操作',
                key: 'action',
                render: (text) => (
                    <span>
                        {text.beike_check_status === '-1' ? <Button type="primary" onClick={() => this.showModal(text.course_id)}>我要备课</Button> : <Button type="danger" onClick={() => this.showModal(text.course_id)}>重新备课</Button>}

                    </span>
                ),
            },
        ];
        const props = {
            action: 'https://jiaoxueapi.yanuojiaoyu.com/api/upload/upload_file',
            onChange: this.handleChange,
            multiple: true,
            name: 'upload_control'
        };
        return (
            <div>
                <Modal
                    title="备课上传"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText='确认'
                    cancelText='取消'
                >
                    <div className="m-flex">
                        <span className="m-row">标题：</span>
                        <Input style={{ marginBottom: 20 }} placeholder="请输入标题" value={this.state.title} onChange={this.changeTitle}></Input>
                    </div>
                    <div className="m-flex">
                        <span className="m-row">包含内容：</span>
                        <CheckboxGroup style={{ marginBottom: 20 }}
                            options={plainOptions}
                            onChange={this.onChangecheckbox}
                            value={this.state.checkList}
                        />
                    </div>
                    <Upload {...props} fileList={this.state.fileList}>
                        <Button>
                            上传文件
                        </Button>
                    </Upload>
                </Modal>
                <div className="m-bottom" >
                    <RangePicker locale={locale} onChange={this.onchange} defaultValue={[moment(this.state.time, dateFormat)]} />
                    <Button type="primary" style={{ marginLeft: 10 }} onClick={this.search}>
                        查询
                    </Button>
                </div>
                <Table rowKey={record => record.key} columns={columns} dataSource={this.state.data} pagination={false} scroll={{ y: 500 }} />
                <Pagination className="m-Pleft" current={this.state.parmas.page} onChange={this.changePage} total={this.state.totalCount} />
            </div>
        );
    }
}
export default bk;