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
import { subjectList, tkList, tree,add_question } from '../../axios/http'
import { Select, Divider, Radio, Input } from 'antd'
const { Option } = Select
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
            tree: [],
            disabled: true,
            value: '',
            panduanState: '',
            chooseState: '',
            params: {
                course_type_id: '',
                ques_type_id: '',//问题类型id
                ques_knowledge_id: '',//知识点id
                ques_source: '',//试卷来源 
                ques_grade_id: '',//年级id
                ques_subject_id: '',//科目id
                ques_difficulty: '',//难易程度id
                ques_answer: '',//答案
                ques_content: '',//内容
                ques_analysis: '',//解析
                ques_options: ''
            }
        }
    }
    componentDidMount() {
        //获取科目的数据
        subjectList().then(res => {
            store.dispatch(XueKeActionCreators.SaveXueKeActionCreator(res.data.subject_list))
        })
    }
    selectonChange = e => {
        const params = {
            course_type_id: '',
            ques_type_id: '',//问题类型id
            ques_knowledge_id: '',//知识点id
            ques_source: '',//试卷来源 
            ques_grade_id: '',//年级id
            ques_subject_id: '',//科目id
            ques_difficulty: '',//难易程度id
            ques_answer: '',//答案
            ques_content: '',//内容
            ques_analysis: '',//解析
            ques_options: ''
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
            params.ques_subject_id = e[1]
            tree({ subject_id: params.ques_subject_id }).then(res => {
                this.setState({
                    tixingOptions,
                    grandOptions,
                    difficultyOptions,
                    params,
                    tree: res.data.list,
                    disabled: false
                })
            })

        })
    }
    handleChange = e => {
        const params = { ...this.state.params }
        params.ques_type_id = e
        this.setState({
            params
        })
    }
    grandhandleChange = e => {
        const params = { ...this.state.params }
        params.ques_grade_id = e
        this.setState({
            params
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
        params.ques_answer = e
        this.setState({
            params
        })
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
    }
    quesAnswer = e => {
        const params = { ...this.state.params }
        params.ques_answer = e
        this.setState({
            params
        })
    }
    render() {
        return (
            <div style={{ maxHeight: 700, overflowY: 'scroll' }}>
                <div className="m-flex m-bottom">
                    <SelectA selectonChange={this.selectonChange} data={this.state.options}></SelectA>
                    <div className="m-left">
                        <Select style={{ width: 178 }} className='m-left' onChange={this.handleChange} placeholder="选择题型" disabled={this.state.disabled}>
                            {this.state.tixingOptions}
                        </Select>
                    </div>
                    <div className="m-left">
                        <Select style={{ width: 178 }} className='m-left' onChange={this.grandhandleChange} placeholder="选择年级" disabled={this.state.disabled}>
                            {this.state.grandOptions}
                        </Select>
                    </div>
                </div>
                <div className="m-flex m-bottom" style={{ alignItems: 'center' }}>
                    <span style={{ padding: '8px 0', fontSize: 16, fontWeight: 'bold' }}>选择模板</span>
                    <div className="m-left">
                        <Radio.Group onChange={this.onchangetemplate} value={this.state.ownState} disabled={this.state.disabled}>
                            <Radio value={1}>填空题</Radio>
                            <Radio value={2}>解答题</Radio>
                            <Radio value={3}>选择题</Radio>
                            <Radio value={4}>判断题</Radio>
                        </Radio.Group>
                    </div>
                </div>
                <Divider dashed />
                {this.switchState(this.state.ownState)}
                <Divider dashed />
                <div className="m-flex m-bottom" style={{ alignItems: 'center' }}>
                    <span style={{ padding: '8px 0', fontSize: 16, fontWeight: 'bold' }}>难易程度</span>
                    <div className="m-left">
                        <Radio.Group onChange={this.onchangedifficultyRadio} value={this.state.params.ques_difficulty}>
                            {this.state.difficultyOptions}
                        </Radio.Group>
                    </div>
                </div>
                <Divider dashed />
                <div className="m-flex m-bottom">
                    <span style={{ padding: '8px 0', fontSize: 16, fontWeight: 'bold' }}>选择知识点(请先选择学科)</span>
                    <Tree data={this.state.tree} funt={this.changeaitifen_id}></Tree>
                </div>
                <Divider dashed />
                <div className="m-flex m-bottom" style={{ alignItems: 'center' }}>
                    <span style={{ padding: '8px 0', fontSize: 16, fontWeight: 'bold' }}>试卷来源(选填)</span>
                    <div className="m-left">
                        <Input value={this.state.params.ques_source} onChange={this.changeQues_source} placeholder="填写试卷的来源"></Input>
                    </div>
                </div>
                <Divider dashed />
            </div>
        )
    }
}