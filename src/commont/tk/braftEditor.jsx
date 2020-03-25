//这个文件默认为我添加题目时判断的模板是属于英语语文数学物理
import React from 'react'
import TianK from '../tiankong/index'
import JieD from '../jieda/index'
import Choose from '../choose/index'
import PanD from '../panduan/index'
import SelectA from './selection'
import store from '../../store/index'
import Tree from './editorTree'
import { XueKeActionCreators } from '../../actions/XueKeList'
import { subjectList, tkList, tree, add_question } from '../../axios/http'
import { Select, Divider, Radio, Input, Modal, Button, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { Option } = Select
const { confirm } = Modal;
//通过不用改的题型渲染不同的模板

export default class EditorDemo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ownState: '',
            options: store.getState().XueKeList,
            unsubscribe: store.subscribe(() => {
                this.setState({
                    options: store.getState().XueKeList
                })
            }),
            tixingOptions: [],
            difficultyOptions: [],
            grandOptions: [],
            sourceOptions: [],
            yearOptions: [],
            tree: [],
            disabled: true,
            visible: false,
            value: '',
            panduanState: '',
            chooseState: '',
            sourceName: '',
            yearName: '',
            subjectName: '',
            typeName: '',
            gradeName: '',
            know_lageNameList: [],
            params: {
                course_type_id: 1,
                ques_type_id: '',//问题类型id
                ques_knowledge_ids: '',//知识点id
                ques_source: '',//试卷来源 
                ques_grade_id: '',//年级id
                ques_subject_id: '',//科目id
                ques_difficulty: '',//难易程度id
                ques_answer: '',//答案
                ques_content: '',//内容
                ques_analysis: '',//解析
                ques_school: '',
                ques_options: '',
                ques_source_type_id: '',
                ques_year: ''
            }
        }
    }
    componentDidMount() {
        //获取科目的数据
        subjectList().then(res => {
            store.dispatch(XueKeActionCreators.SaveXueKeActionCreator(res.data.subject_list))
            this.setState({
                subject_list: res.data.subject_list
            })
        })
    }
    selectonChange = e => {
        const params = {
            course_type_id: 1,
            ques_type_id: '',//问题类型id
            ques_knowledge_ids: '',//知识点id
            ques_source: '',//试卷来源 
            ques_grade_id: '',//年级id
            ques_subject_id: '',//科目id
            ques_difficulty: '',//难易程度id
            ques_answer: '',//答案
            ques_content: '',//内容
            ques_analysis: '',//解析
            ques_options: '',
            ques_school: '',
            ques_source_type_id: '',
            ques_year: ''
        }
        tkList({ subject_id: e[1] }).then(res => {
            const tixingOptions = res.data.ques_type_rela_list.map((res, index) => {
                return <Option key={index} value={res.ques_type_id} >{res.name}</Option>
            })
            const grandOptions = res.data.grade_rela_list.map((res, index) => {
                return <Option key={index} value={res.grade_id} >{res.name}</Option>
            })
            const difficultyOptions = res.data.difficulty_rela_list.map((res, index) => {
                return <Radio key={index} value={res.difficulty_id}>{res.name}</Radio>
            })
            const sourceOptions = res.data.source_rela_list.map((res, index) => {
                return <Option key={index} value={res.source_id} >{res.name}</Option>
            })
            const yearOptions = res.data.year_rela_list.map((res, index) => {
                return <Option key={index} value={res.year}>{res.name}</Option>
            })
            const string = this.state.subject_list.reduce((item, res) => {
                if (e[1] === res.subject_id) {
                    item = res.name
                }
                return item
            }, '')
            params.ques_subject_id = e[1]
            tree({ subject_id: params.ques_subject_id }).then(tree => {
                this.setState({
                    tixingOptions,
                    grandOptions,
                    difficultyOptions,
                    sourceOptions,
                    yearOptions,
                    params,
                    tree: tree.data.list,
                    disabled: false,
                    subjectName: string,
                    year_rela_list: res.data.year_rela_list,
                    grade_rela_list: res.data.grade_rela_list,
                    ques_type_rela_list: res.data.ques_type_rela_list,
                    source_rela_list: res.data.source_rela_list
                })
            })

        })
    }
    handleChange = e => {
        const params = { ...this.state.params }
        const ques_type_rela_list = this.state.ques_type_rela_list
        params.ques_type_id = e
        const string = ques_type_rela_list.reduce((item, res) => {
            if (e === res.ques_type_id) {
                item = res.name
            }
            return item
        }, '')
        this.setState({
            params,
            typeName: string
        })
    }
    grandhandleChange = e => {
        console.log(e)
        const params = { ...this.state.params }
        const grade_rela_list = this.state.grade_rela_list
        console.log(grade_rela_list)
        params.ques_grade_id = e
        const string = grade_rela_list.reduce((item, res) => {
            if (e === res.grade_id) {
                item = res.name
            }
            return item
        }, '')
        this.setState({
            params,
            gradeName: string
        })
    }
    yearhandleChange = e => {
        const params = { ...this.state.params }
        const year_rela_list = this.state.year_rela_list
        params.ques_year = e
        const string = year_rela_list.reduce((item, res) => {
            if (e === res.year) {
                item = res.name
            }
            return item
        }, '')
        this.setState({
            params,
            yearName: string
        })
    }
    sourcehandleChange = e => {
        const params = { ...this.state.params }
        const source_rela_list = this.state.source_rela_list
        params.ques_source_type_id = e
        const string = source_rela_list.reduce((item, res) => {
            if (e === res.source_id) {
                item = res.name
            }
            return item
        }, '')
        this.setState({
            params,
            sourceName: string
        })
    }
    changeaitifen_id = (e) => {
        const params = this.state.params
        params.ques_knowledge_id = e[0]
        this.setState({
            params
        })
    }
    onchangedifficultyRadio = e => {
        const params = this.state.params
        params.ques_difficulty = e.target.value
        this.setState({
            params
        })
    }
    changeQues_source = e => {
        const params = this.state.params
        params.ques_source = e.target.value
        this.setState({
            params
        })
    }
    onchangetemplate = e => {
        const params = { ...this.state.params }
        params.ques_answer = ''
        params.ques_analysis = ''
        params.ques_content = ''
        this.setState({
            ownState: e.target.value,
            params
        })
    }




    switchState = (value) => {
        switch (value) {
            case 1:
                return <TianK ques_content={this.quesContent} ques_analysis={this.quesAnalysis} ques_answer={this.quesAnswer}></TianK>
            case 2:
                return <JieD ques_content={this.quesContent} ques_analysis={this.quesAnalysis} ques_answer={this.quesAnswer}></JieD>
            case 3:
                return <Choose ques_content={this.quesContent} ques_analysis={this.quesAnalysis} choose={this.choose} panduanState={this.state.chooseState}></Choose>
            case 4:
                return <PanD ques_content={this.quesContent} ques_analysis={this.quesAnalysis} panduan={this.panduan} panduanState={this.state.panduanState}></PanD>
            default:
                return ''
        }
    }
    panduan = e => {
        const params = { ...this.state.params }
        params.ques_answer = e
        this.setState({
            params
        })
    }
    choose = e => {
        const params = { ...this.state.params }
        if (typeof (e) === 'object') {
            const result = e.reduce((item, res) => {
                item += res + ''
                return item
            })
            params.ques_answer = result
            this.setState({
                params
            })
            console.log(params)
        } else {
            params.ques_answer = e
            this.setState({
                params
            })
        }

    }
    quesAnalysis = e => {
        const params = { ...this.state.params }
        params.ques_analysis = e
        this.setState({
            params
        })
    }
    quesContent = e => {
        const params = { ...this.state.params }
        params.ques_content = e
        this.setState({
            params
        })
        console.log(params)
    }
    quesAnswer = e => {
        console.log(e)
        const params = { ...this.state.params }
        params.ques_answer = e
        this.setState({
            params
        })
    }


    showModal = () => {
        if (this.state.tree.length > 0) {
            this.setState({
                visible: true,
            });
        } else {
            message.warning('请先选择学科')
        }
    };
    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    handleCancel = e => {
        const params = { ...this.state.params }
        params.ques_knowledge_ids = ''
        this.setState({
            visible: false,
            params
        });
    };
    know_lageId = e => {
        const params = { ...this.state.params }
        params.ques_knowledge_ids = JSON.stringify(e)
        this.setState({
            params
        })
    }
    know_lageName = e => {
        this.setState({
            know_lageNameList: e
        })
    }
    tijiaoshiti = () => {
        const params = { ...this.state.params }
        console.log(params)
        const that = this
        if (params.ques_type_id === '' || params.ques_knowledge_ids === '' || params.ques_grade_id === '' || params.ques_subject_id === '' || params.ques_difficulty === '' || params.ques_answer === '' || params.ques_content === '' || params.ques_analysis === '' || params.ques_source_type_id === '' || params.ques_year === '') {
            message.warning('请填写必填项')
        } else {
            confirm({
                title: '是否要提交试题？',
                icon: <ExclamationCircleOutlined />,
                content: '提交之后的试题请在我的题库中查看',
                okText: '确认',
                cancelText: '取消',
                onOk() {
                    add_question(params).then(res => {
                        console.log(res)
                        if (res.code === 0) {
                            message.success(res.message)
                            that.props.history.push("/main/tk/mine")
                        } else {
                            message.error(res.message)
                        }
                    })
                },
                onCancel() {
                    console.log('Cancel');
                },
            });
        }
    }
    render() {
        return (
            <div style={{ position: 'relative' }}>
                <div style={{ maxHeight: 600, overflowY: 'scroll' }}>
                    <div className="m-flex">
                        <p style={{ fontSize: 14, fontWeight: 'bold' }}>基本信息</p>
                        <p style={{ marginLeft: 50, fontSize: 14, fontWeight: 'bold' }}>学科:{this.state.subjectName}</p>
                        <p style={{ marginLeft: 50, fontSize: 14, fontWeight: 'bold' }}>年级:{this.state.gradeName}</p>
                        <p style={{ marginLeft: 50, fontSize: 14, fontWeight: 'bold' }}>题型:{this.state.typeName}</p>
                        <p style={{ marginLeft: 50, fontSize: 14, fontWeight: 'bold' }}>年份:{this.state.yearName}</p>
                        <p style={{ marginLeft: 50, fontSize: 14, fontWeight: 'bold' }}>来源类型:{this.state.sourceName}</p>
                    </div>
                    <Divider dashed />
                    <div className="m-flex m-bottom">
                        <div className=" m-bottom">
                            <SelectA selectonChange={this.selectonChange} data={this.state.options}></SelectA>
                        </div>
                        <div className="m-left m-bottom">
                            <Select style={{ width: 150 }} className='m-left' onChange={this.handleChange} placeholder="选择题型" disabled={this.state.disabled}>
                                {this.state.tixingOptions}
                            </Select>
                        </div>
                        <div className="m-left m-bottom">
                            <Select style={{ width: 150 }} className='m-left' onChange={this.grandhandleChange} placeholder="选择年级" disabled={this.state.disabled}>
                                {this.state.grandOptions}
                            </Select>
                        </div>
                        <div className="m-left m-bottom">
                            <Select style={{ width: 150 }} className='m-left' onChange={this.yearhandleChange} placeholder="年份" disabled={this.state.disabled}>
                                {this.state.yearOptions}
                            </Select>
                        </div>
                        <div className="m-left m-bottom">
                            <Select style={{ width: 150 }} className='m-left' onChange={this.sourcehandleChange} placeholder="来源类型" disabled={this.state.disabled}>
                                {this.state.sourceOptions}
                            </Select>
                        </div>
                        <div className="m-flex m-bottom m-left" style={{ alignItems: 'center' }}>
                            <span>试卷来源(选填):</span>
                            <div className="m-left">
                                <Input value={this.state.params.ques_source} onChange={this.changeQues_source} placeholder="填写试卷的来源"></Input>
                            </div>
                        </div>
                    </div>
                    <Divider dashed />
                    <div className="m-flex m-bottom" style={{ alignItems: 'center' }}>
                        <span style={{ padding: '8px 0', fontSize: 14, fontWeight: 'bold' }} className="m-row">选择模板</span>
                        <div className="m-left">
                            <Radio.Group onChange={this.onchangetemplate} value={this.state.ownState} disabled={this.state.disabled}>
                                <Radio value={1}>填空题模板</Radio>
                                <Radio value={2}>解答题模板</Radio>
                                <Radio value={3}>选择题模板</Radio>
                                <Radio value={4}>判断题模板</Radio>
                            </Radio.Group>
                        </div>
                    </div>
                    {this.switchState(this.state.ownState)}
                    <Divider dashed />
                    <div className="m-flex m-bottom" style={{ alignItems: 'center' }}>
                        <span style={{ padding: '8px 0', fontSize: 14, fontWeight: 'bold' }} className="m-row">关联知识点</span>
                        <Modal
                            title="关联知识点选择"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            okText="确认"
                            cancelText="取消"
                        >
                            <div style={{ maxHeight: 400, overflowY: 'scroll' }}>
                                <Tree data={this.state.tree} know_lageId={this.know_lageId} know_lageName={this.know_lageName} funt={this.changeaitifen_id}></Tree>
                            </div>
                        </Modal>
                        <Button onClick={this.showModal}>选择知识点</Button>
                        {
                            this.state.know_lageNameList.map((res, index) =>
                                <div className="m-left" style={{ padding: '8px 0', fontSize: 14, fontWeight: 'bold' }} key={index}>
                                    {res}
                                </div>
                            )
                        }
                    </div>
                    <Divider dashed />
                    <div className="m-flex" style={{ alignItems: 'center' }}>
                        <span style={{ padding: '8px 0', fontSize: 14, fontWeight: 'bold' }} className="m-row">标签</span>
                    </div>
                    <div className="m-flex m-bottom" style={{ alignItems: 'center' }}>
                        <span style={{ padding: '8px 0', fontSize: 14, fontWeight: 'bold' }}>难易程度</span>
                        <div className="m-left">
                            <Radio.Group onChange={this.onchangedifficultyRadio} value={this.state.params.ques_difficulty}>
                                {this.state.difficultyOptions}
                            </Radio.Group>
                        </div>
                    </div>
                </div>
                <div style={{ position: 'absolute', right: 0, bottom: "-60px" }}>
                    <Button type="primary" onClick={this.tijiaoshiti}>提交试题</Button>
                </div>
            </div>

        )
    }
}