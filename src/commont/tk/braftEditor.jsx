//这个文件默认为我添加题目时判断的模板是属于英语语文数学物理
import React from 'react'
import English from '../english/index'
import Math from '../math/index'
import Chinese from '../chinese/index'
import Physical from '../physical/index'
import SelectA from './selection'
import store from '../../store/index'
import Tree from './editorTree'
import { XueKeActionCreators } from '../../actions/XueKeList'
import { subjectList, get_ques_type_list, tree } from '../../axios/http'
import { Select, Divider, Radio, Input } from 'antd'
const { Option } = Select
//通过不用改的题型渲染不同的模板
const switchState = (value) => {
    switch (value) {
        case 1:
            const a = (<English></English>)
            return a
        case 2:
            return <Math></Math>
        case 3:
            return <Chinese></Chinese>
        case 4:
            return <Physical></Physical>
        default:
            return ''
    }
}
export default class EditorDemo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ownState: 1,
            options: store.getState().XueKeList,
            unsubscribe: store.subscribe(() => {
                this.setState({
                    options: store.getState().XueKeList
                })
            }),
            tixingOptions: [],
            tree: [],
            disabled: true,
            value: '',
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
        const params = { ...this.state.params }
        get_ques_type_list({ subject_id: e[1] }).then(res => {
            const tixingOptions = res.data.type_list.map((res, index) => {
                return <Option key={index} value={res.ques_type_id} >{res.name}</Option>
            })
            params.ques_subject_id = e[1]
            tree({ subject_id: params.ques_subject_id }).then(res => {
                console.log(res.data.list)
                this.setState({
                    tixingOptions,
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
    changeaitifen_id = (e) => {
        const params = this.state.params
        params.knowledge_id = e[0]
        console.log(params)
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
    changeQues_source = e=>{
        const params = this.state.params
        params.ques_source = e.target.value
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
                </div>
                <Divider dashed />
                {switchState(this.state.ownState)}
                <Divider dashed />
                <div className="m-flex m-bottom" style={{ alignItems: 'center' }}>
                    <span style={{ padding: '8px 0', fontSize: 16, fontWeight: 'bold' }}>难易程度</span>
                    <div className="m-left">
                        <Radio.Group onChange={this.onchangedifficultyRadio} value={this.state.params.ques_difficulty}>
                            <Radio value={1}>简单</Radio>
                            <Radio value={2}>中等</Radio>
                            <Radio value={3}>困难</Radio>
                        </Radio.Group>
                    </div>
                </div>
                <Divider dashed />
                <div className="m-flex m-bottom">
                    <span style={{ padding: '8px 0', fontSize: 16, fontWeight: 'bold' }}>选择知识点(请先选择学科)</span>
                    <Tree data={this.state.tree} funt={this.changeaitifen_id}></Tree>
                </div>
                <Divider dashed />
                <div className="m-flex m-bottom"  style={{ alignItems: 'center' }}>
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