import React, { Component } from 'react';
import SelectA from '../commont/tk/selection'
import { Table, Button, Modal, message, Tag, Select } from 'antd';
import { get_version_by_subject_id, subjectList, get_course_by_course_id, get_course_section, tree, submit_knowledge_section,get_knowledge_by_section_id } from '../axios/http'
import Tree from './zhangjieTree'
import store from '../store/index'
import { XueKeActionCreators } from '../actions/XueKeList'
const { confirm } = Modal;
const { Option } = Select

class bk extends Component {
    constructor(props) {
        super(props)
        this.state = {
            params: {
                subject_id: '',
                section_id: '',
                course_id: '',
                knowledge_ids: ''
            },
            banben: [],
            jiaocai: [],
            options: store.getState().XueKeList,
            unsubscribe: store.subscribe(() => {
                this.setState({
                    options: store.getState().XueKeList
                })
            }),
            banbenValue: [],
            jiaocaiValue: [],
            zhangjie: [],
            zhangjieChildren: [],
            tree: [],
            ques_knowledge_idList: []
        }
    }
    componentDidMount() {
        //获取科目的数据
        subjectList().then(res => {
            store.dispatch(XueKeActionCreators.SaveXueKeActionCreator(res.data.subject_list))
        })

    }
    selectonChange = (value) => {
        const params = { ...this.state.params }
        params.subject_id = value[1]
        get_version_by_subject_id({ subject_id: value[1] }).then(res => {
            const banben = res.data.list.map(res => {
                return <Option value={res.aitifen_id} key={res.aitifen_id}>{res.name}</Option>
            })
            params.section_id = ''
            params.course_id = ''
            params.knowledge_ids = ''
            this.setState({
                banben,
                params,
                selectValue: value
            })
        }).then(() => {
            tree({ subject_id: params.subject_id }).then(res => {
                this.setState({
                    tree: res.data.list
                })
            })
        })
    }
    showModal = () => {
        if (this.state.banben.length === 0) {
            message.warning('请先选择学科')
            return
        }
        this.setState({
            visible: true
        })
    }
    handleOk = () => {
        const params = { ...this.state.params }
        submit_knowledge_section(params).then((res) => {
            if (res.code === 0) {
                message.success(res.message)
                this.setState({
                    visible: false,
                    ques_knowledge_idList: [],
                    banbenValue: [],
                    jiaocaiValue: [],
                    zhangjie: [],
                    zhangjieValue: [],
                    zhangjieChildrenValue: [],
                    zhangjieChildren: [],
                    jiaocai: [],
                })
            } else {
                message.error(res.message)
            }
        })

    }
    handleCancel = () => {
        this.setState({
            visible: false
        })
    }
    selsectbanben = e => {
        const params = { ...this.state.params }
        get_course_by_course_id({
            subject_id: params.subject_id,
            version_id: e
        }).then(res => {
            const jiaocai = res.data.list.map(res => {
                return <Option value={res.course_id} key={res.course_id}>{res.name}</Option>
            })
            params.section_id = ''
            params.course_id = ''
            params.knowledge_ids = ''
            this.setState({
                jiaocai,
                banbenValue: e,
                jiaocaiValue: [],
                params
            })
        })

    }
    selsectjiaocai = e => {
        const params = { ...this.state.params }
        get_course_section({
            course_id: e
        }).then(res => {
            const zhangjie = res.data.list.map(res => {
                return <Option value={res.section_id} key={res.section_id}>{res.section_name}</Option>
            })
            params.course_id = e
            this.setState({
                zhangjie,
                zhangjieList: res.data.list,
                jiaocaiValue: e,
                params
            })
        })
    }
    selsectzhangjie = e => {
        const zhangjieList = this.state.zhangjieList
        zhangjieList.map(res => {
            if (res.section_id === e) {
                const zhangjieChildren = res.children.map(l1 => {
                    return <Option value={l1.section_id} key={l1.section_id}>{l1.section_name}</Option>
                })
                this.setState({
                    zhangjieChildren,
                    zhangjieValue: e
                })
            }
        })
        get_knowledge_by_section_id({section_id:e}).then(res=>{
            console.log(res)
        })
    }
    selsectzhangjieChildren = e => {
        const params = { ...this.state.params }
        params.section_id = e
        this.setState({
            zhangjieChildrenValue: e,
            params,
        })
    }
    know_lagechangeList = e => {
        const params = { ...this.state.params }
        const knowledge_ids = e.reduce((item, res) => {
            item += res + ','
            return item
        }, '')
        params.knowledge_ids = knowledge_ids
        this.setState({
            ques_knowledge_idList: e,
            params
        })
    }
    render() {
        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                align: 'center',
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
                align: 'center',
                render: (text) => (
                    <span>
                        {text ? text : 'null'}
                    </span>
                ),
            },
        ];
        return (
            <div>
                <div className="m-flex">
                    <SelectA selectonChange={this.selectonChange} data={this.state.options} value={this.state.selectValue}></SelectA>
                    <div className="m-left">
                        <Button type="primary" onClick={this.showModal}>章节知识点关联</Button>
                    </div>
                </div>
                <Modal
                    title="添加章节知识点"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText='确认'
                    cancelText='取消'
                >
                    <div className="m-flex m-bottom" style={{ flexWrap: 'nowrap' }}>
                        <span className="m-row" style={{ textAlign: 'right' }}>版本选择：</span>
                        <Select style={{ width: '100%' }} showSearch optionFilterProp="children" onChange={this.selsectbanben} value={this.state.banbenValue} placeholder="点击选择版本">
                            {this.state.banben}
                        </Select>
                    </div>
                    <div className="m-flex m-bottom" style={{ flexWrap: 'nowrap' }}>
                        <span className="m-row" style={{ textAlign: 'right' }}>教材选择：</span>
                        <Select style={{ width: '100%' }} showSearch optionFilterProp="children" onChange={this.selsectjiaocai} value={this.state.jiaocaiValue} placeholder="点击选择教材">
                            {this.state.jiaocai}
                        </Select>
                    </div>
                    <div className="m-flex m-bottom" style={{ flexWrap: 'nowrap' }}>
                        <span className="m-row" style={{ textAlign: 'right' }}>章节：</span>
                        <Select style={{ width: '100%' }} showSearch optionFilterProp="children" onChange={this.selsectzhangjie} value={this.state.zhangjieValue} placeholder="点击选择章节">
                            {this.state.zhangjie}
                        </Select>
                    </div>
                    <div className="m-flex m-bottom" style={{ flexWrap: 'nowrap' }}>
                        <span className="m-row" style={{ textAlign: 'right' }}>子章节：</span>
                        <Select style={{ width: '100%' }} showSearch optionFilterProp="children" onChange={this.selsectzhangjieChildren} value={this.state.zhangjieChildrenValue} placeholder="点击选择子章节">
                            {this.state.zhangjieChildren}
                        </Select>
                    </div>
                    <div>
                        <Tree data={this.state.tree} know_lagechangeList={this.know_lagechangeList} ques_knowledge_idList={this.state.ques_knowledge_idList} ></Tree>
                    </div>
                </Modal>
                {/* <Table rowKey={record => record.key} columns={columns} dataSource={this.state.data} pagination={false} scroll={{ y: 500 }} /> */}
                {/* <Pagination className="m-Pleft" current={this.state.parmas.page} onChange={this.changePage} total={this.state.totalCount} /> */}
            </div >
        );
    }
}
export default bk;