import React, { Component } from 'react';
import { Tabs, Spin, Badge, Icon, Button, Divider } from 'antd';
import Select from './selection'
import Searchbtn from './searchbtn'
import Empty2 from './mysiku'
import store from '../../store/index'
import { XueKeActionCreators } from '../../actions/XueKeList'
import { tkList, subjectList, get_question_cart } from '../../axios/http'

const { TabPane } = Tabs;
class tikuguanli4 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [

            ],
            searchList: [{
                name: '题型',
                h: 13,
                list: [{ id: 13, title: '不限' }, { id: 1, title: '解答' }, { id: 2, title: '判断' }, { id: 3, title: '填空' }]
            }, {
                name: '年份',
                h: 14,
                list: [{ id: 14, title: '不限' }, { id: 4, title: '171' }, { id: 5, title: '4171' }, { id: 6, title: '4141' }]
            }, {
                name: '来源',
                h: 15,
                list: [{ id: 15, title: '不限' }, { id: 7, title: '888' }, { id: 8, title: '888' }, { id: 9, title: '888' }]
            }, {
                name: '难度',
                h: 16,
                list: [{ id: 16, title: '不限' }, { id: 10, title: '999' }, { id: 11, title: '999' }, { id: 12, title: '999' }]
            }],
            params: {
                subject_id: 38,
                province_id: '',
                ques_type_id: '',
                year: '',
                source_id: '',
                grade_id: '',
                difficulty_id: '',
                key_words: '',
                page: 1,
                page_size: 10
            },
            options: store.getState().XueKeList,
            unsubscribe: store.subscribe(() => {
                this.setState({
                    options: store.getState().XueKeList
                })
            }),
            spin: false,
            clear: 'none',
            question_cart: [],
            cardTotal: 10
        }
    }
    //更改筛选id
    changeSearchId = (e, index) => {
        console.log(e, index)
        const that = this
        let searchList = that.state.searchList
        searchList[index].h = e
        that.setState({
            searchList
        })
    }
    //查看答案的伸缩
    add = (e) => {
        const list = this.state.list
        list[e].appear = !list[e].appear
        this.setState({
            list
        })
    }
    //放入答题栏的变化
    btnChange = (e) => {
        const list = this.state.list
        list[e].btnc = !list[e].btnc
        this.setState({
            list
        })
    }
    //spin加载效果
    // spin = () => {
    //     this.setState({
    //         spin: true
    //     })
    //     setTimeout(() => {
    //         this.setState({
    //             spin: false
    //         })
    //     }, 1500);
    // }
    mouse = (e) => {
        if (e) {
            this.setState({
                clear: 'block'
            })
        } else {
            this.setState({
                clear: 'none'
            })
        }
    }
    componentDidMount() {
        const params = { ...this.state.params }
        //获取科目的数据
        subjectList().then(res => {
            store.dispatch(XueKeActionCreators.SaveXueKeActionCreator(res.data.subject_list))
        })
        tkList({ subject_id: params.subject_id }).then(res => {
            this.shaixuanName(res.data)
        })
        get_question_cart().then(res => {
            let cardTotal = null
            res.data.list.forEach(res => {
                cardTotal += Number(res.count)
            })
            this.setState({
                question_cart: res.data.list,
                cardTotal
            })
        })
    }
    componentWillUnmount() {
        // 移除监听事件
        this.state.unsubscribe()//移除监听
        window.removeEventListener('resize', this.handleSize);
        this.setState = (state, callback) => {
            return
        }
    }
    shaixuanName = (...e) => {
        const name = []
        Object.keys(e[0]).forEach(function (key, index) {
            switch (key) {
                case 'province_rela_list':
                    e[0][key].unshift({ province_id: '', name: '不限' })
                    name.push({ name: '地区', h: 'province_id', list: e[0][key] })
                    break
                case 'difficulty_rela_list':
                    e[0][key].unshift({ difficulty_id: '', name: '不限' })
                    name.push({ name: '难度', h: 'difficulty_id', list: e[0][key] })
                    break
                case 'year_rela_list':
                    e[0][key].unshift({ year: '', name: '不限' })
                    name.push({ name: '年份', h: 'year', list: e[0][key] })
                    break
                case 'ques_type_rela_list':
                    e[0][key].unshift({ ques_type_id: '', name: '不限' })
                    name.push({ name: '题型', h: 'ques_type_id', list: e[0][key] })
                    break
                case 'source_rela_list':
                    e[0][key].unshift({ source_id: '', name: '不限' })
                    name.push({ name: '来源', h: 'source_id', list: e[0][key] })
                    break
                default:
                    e[0][key].unshift({ grade_id: '', name: '不限' })
                    name.push({ name: '年级', h: 'grade_id', list: e[0][key] })
                    break
            }
        });
        this.setState({
            searchList: name
        })
        return name
    }
    selectonChange = (e) => {
        const params = { ...this.state.params }
        params.subject_id = Number(e[1])
        this.setState({
            params
        })
    }
    onTabClick = (e) => {
        switch (e) {
            case '1':
                this.props.history.push("/main")
                break
            case '2':
                this.props.history.push("/main/tk/system")
                break
            case '3':
                this.props.history.push("/main/tk/own")
                break
            default:
                this.props.history.push("/main/tk/mine")
        }
    }
    creatT = () => {
        this.props.history.push('/main/question')
    }
    render() {
        return (
            <div>
                <Spin tip="加载中..." size="large" className={this.state.spin ? 'm-spin' : 'm-spin-dis'} />
                <Select selectonChange={this.selectonChange} data={this.state.options}></Select>
                <div className="m-shopcar" onMouseEnter={() => this.mouse('enter')} onMouseLeave={() => this.mouse()}>
                    <Icon type="container" style={{ margin: `0 15px 0 0` }} />
                    我的试题篮
                    <Badge count={this.state.cardTotal} className="m-shopicon">
                    </Badge>
                </div>
                <div className="topic-panel" style={{ display: this.state.clear, zIndex: 9999 }} onMouseEnter={() => this.mouse('enter')} onMouseLeave={() => this.mouse()}>
                    <div className="topic-row header">
                        <div className="topic-col">已选题型</div>
                        <div className="topic-col">数量</div>
                        <div className="topic-col">删除</div>
                    </div>
                    {this.state.question_cart.map(res =>
                        <div className="topic-bd" key={res.ques_type_id}>
                            <div className="topic-row">
                                <div className="topic-col">
                                    {res.ques_type_name}
                                </div>
                                <div className="topic-col">
                                    {res.count}
                                </div>
                                <div className="topic-col">
                                    <Icon type="close" onClick={() => this.deleteLei(res.ques_type_id)} />
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="topic-ctrls">
                        <div className="clear-btn" >清空全部</div>
                        <div className="see-btn">查看试卷</div>
                    </div>
                </div>

                <Tabs defaultActiveKey="4" size="Default" onTabClick={this.spin} onChange={this.onTabClick}>
                    <TabPane tab="知识点" key="1" className="m-tk" >

                    </TabPane>
                    <TabPane tab="真题试卷" key="2" >

                    </TabPane>
                    <TabPane tab="机构私库" key="3" >

                    </TabPane>
                    <TabPane tab="我的题目" key="4">
                        {this.state.list.length > 0 ?
                            <div>
                                <Button type="primary" onClick={this.creatT}>创建试题</Button>
                                <Divider dashed />
                            </div>
                            : ''}
                        <Searchbtn params={this.state.params} list={this.state.searchList} funt={this.changeSearchId}></Searchbtn>
                        {this.state.list.length > 0 ? '' : <Empty2 funt={this.creatT}></Empty2>}
                    </TabPane>
                </Tabs>
            </div >
        );
    }
}
export default tikuguanli4;