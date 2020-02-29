import React, { Component } from 'react';
import { Table, Button, DatePicker, Modal, Upload, Input, Checkbox, Pagination } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/zh_CN'
import { paike } from '../../axios/http'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn')
const { RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;
const plainOptions = ['知识精讲', '三点剖析', '例题', '随练', '扩展'];

class bk extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //这个是查询条件
            parmas: {
                starttime: '2020-02-01',
                endtime: '',
                isfinished: 1,
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
            obj: {
                has_zhishijingjiang: '知识精讲',
                has_sandianpouxi: '三点剖析',
                has_liti: '例题',
                has_suilian: '随练',
                has_kuozhan: '扩展',
            },
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
        paike(this.state.parmas).then(res => {
            console.log(res)
            this.setState({
                data: res.data.list
            })
        })
    }
    //日期改变
    onchange = (value, dateString) => {
        console.log(value, dateString)
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
            Object.keys(obj).map(ele => {
                if (obj[ele] === res) {
                    upParmas[ele] = 1
                }
            })
        })
    };
    handleCancel = e => {
        this.setState({
            visible: false,
            fileList: [],
            title: '',
            checkList: [],
            fileList: [],
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
            return file;
        });
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
        console.log(page)
        const parmas = { ...this.state.parmas }
        parmas.page = page
        this.setState({
            parmas
        });
    };
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
                        <Button type="primary" onClick={() => this.showModal(text.course_id)}>我要备课</Button>
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
                <RangePicker locale={locale} onChange={this.onchange} />
                <Table columns={columns} dataSource={this.state.data} pagination={false} scroll={{ y: 500 }}/>
                <Pagination current={this.state.parmas.page} onChange={this.changePage} total={50} />
            </div>
        );
    }
}
export default bk;