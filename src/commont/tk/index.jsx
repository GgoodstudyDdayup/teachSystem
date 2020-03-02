import React, { Component } from 'react';
import { Tabs, Spin, Badge, Icon, Input } from 'antd';
import Select from './selection'
import Tree from './tree'
import List from './list'
import Searchbtn from './searchbtn'
import { tree, subjectList, tkList, question } from '../../axios/http'
import store from '../../store/index'
import { XueKeActionCreators } from '../../actions/XueKeList'
const { Search } = Input
const { TabPane } = Tabs;
class tikuguanli extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [
                { appear: false, btnc: true },
                { appear: true, btnc: true }
            ],
            params: {
                subject_id: 38,
                knowledge_id: '',
                ques_type_id: '',
                province_id: '',
                year: '',
                difficulty_id: '',
                source_id: '',
                grade_id: '',
                key_words: '',
                page: '',
                page_size: ''
            },
            options: store.getState().XueKeList,
            unsubscribe: store.subscribe(() => {
                this.setState({
                    options: store.getState().XueKeList
                })
            }),
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
            tree: [{
                title: '1',
                aitifen_id: '1',
                children: [
                    {
                        title: '2', aitifen_id: '2', children: [
                            {
                                title: '3', aitifen_id: '3', children: [
                                    {
                                        title: '4', aitifen_id: '4', children: []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
            ],
            spin: false,
            clear: 'none',
            count: 10
        }
    }

    //更改筛选筛选条件查询更改params
    changeSearchId = (e, index) => {
        const params = this.state.params
        const searchList = this.state.searchList
        switch (searchList[index].name) {
            case '地区':
                searchList[index].list.forEach((res) => {
                    if (res.name === e) {
                        params['province_id'] = res.province_id
                        this.setState({
                            params
                        })
                    }
                })
                break
            case '难度':
                searchList[index].list.forEach((res) => {
                    if (res.name === e) {
                        params['difficulty_id'] = res.difficulty_id
                        this.setState({
                            params
                        })
                    }
                })
                break
            case '年份':
                searchList[index].list.forEach((res) => {
                    if (res.name === e) {
                        params['year'] = res.year
                        this.setState({
                            params
                        })
                    }
                })
                break
            case '题型':
                searchList[index].list.forEach((res) => {
                    if (res.name === e) {
                        params['ques_type_id'] = res.ques_type_id
                        this.setState({
                            params
                        })
                    }
                })
                break
            case '来源':
                searchList[index].list.forEach((res) => {
                    if (res.name === e) {
                        params['source_id'] = res.source_id
                        this.setState({
                            params
                        })
                    }
                })
                break
            default:
                searchList[index].list.forEach((res) => {
                    if (res.name === e) {
                        params['grade_id'] = res.grade_id
                        this.setState({
                            params
                        })
                    }
                })
                break
        }
        console.log(params)
    }
    //更改knowlage_id
    changeaitifen_id = (e) => {
        const params = this.state.params
        params.knowledge_id = e[0]
        this.setState({
            params
        })
    }
    //查看答案的伸缩
    add = (e) => {
        if (this.state.appear === e) {
            this.setState({
                appear:''
            })
        } else {
            this.setState({
                appear: e
            })
        }

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
        //请忽略这段代码有兴趣的可以看看主要用于一个函数触发多个函数的写法compose操作
        // const toUpperCase = function (x) {
        //     return x.toUpperCase()
        // }
        // const exclami = function (x) {
        //     return x + '!'
        // }
        // const compose = function (...funt) {
        // console.log(funt)
        //     return (...arg) => funt.reduce((preview, current) => [current(...preview)],arg)[0]
        // }
        // const shout = compose(exclami, toUpperCase)
        // shout('send in the clowns')
        // console.log(shout('send in the clowns'))
        window.addEventListener('resize', this.handleSize);
        this.handleSize()
        const params = this.state.params
        //获取科目的数据
        subjectList().then(res => {
            store.dispatch(XueKeActionCreators.SaveXueKeActionCreator(res.data.subject_list))
        })
        //获取默认tree的数据
        const subject_id = {
            subject_id:38
        }
        tree(subject_id).then(res => {
            console.log(res)
            this.setState({
                tree: res.data.list
            })
        })
        tkList({ subject_id: params.subject_id }).then(res => {
            this.shaixuanName(res.data)
        })
        question(this.state.params).then(res => {
            console.log(res)
            this.setState({
                list: res.data.list
            })
        })
    }
    shaixuanName = (...e) => {
        const name = []
        Object.keys(e[0]).forEach(function (key, index) {
            switch (key) {
                case 'province_rela_list':
                    name.push({ name: '地区', h: 'province_id', list: e[0][key] })
                    break
                case 'difficulty_rela_list':
                    name.push({ name: '难度', h: 'difficulty_id', list: e[0][key] })
                    break
                case 'year_rela_list':
                    name.push({ name: '年份', h: 'year', list: e[0][key] })
                    break
                case 'ques_type_rela_list':
                    name.push({ name: '题型', h: 'ques_type_id', list: e[0][key] })
                    break
                case 'source_rela_list':
                    name.push({ name: '来源', h: 'source_id', list: e[0][key] })
                    break
                default:
                    name.push({ name: '年级', h: 'grade_id', list: e[0][key] })
                    break
            }
        });
        this.setState({
            searchList: name
        })
        return name
    }
    componentWillUnmount() {
        // 移除监听事件
        this.state.unsubscribe()//移除监听
        window.removeEventListener('resize', this.handleSize);
    }
    // 自适应浏览器的高度
    handleSize = () => {
        console.log(document.body.clientHeight)
        this.setState({
            height: document.body.clientHeight,
        });
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
    zujuan = () => {
        this.props.history.push('/zujuan')
    }
    selectonChange = (value) => {
        console.log(value);
    }
    render() {
        return (
            <div>
                <Spin tip="加载中..." size="large" className={this.state.spin ? 'm-spin' : 'm-spin-dis'} />
                <Select selectonChange={this.selectonChange} data={this.state.options}></Select>
                <div className="m-shopcar" onMouseEnter={() => this.mouse('enter')} onMouseLeave={() => this.mouse()}>
                    <Icon type="container" style={{ margin: `0 15px 0 0` }} />
                    我的试题篮
                    <Badge count={this.state.count} className="m-shopicon">
                    </Badge>
                </div>
                <div className="topic-panel" style={{ display: this.state.clear }} onMouseEnter={() => this.mouse('enter')} onMouseLeave={() => this.mouse()}>
                    <div className="topic-row header">
                        <div className="topic-col">已选题型</div>
                        <div className="topic-col">数量</div>
                        <div className="topic-col">删除</div>
                    </div>
                    <div className="topic-bd" >
                        <div className="topic-row">
                            <div className="topic-col">
                                解答题
                                </div>
                            <div className="topic-col">
                                1
                                </div>
                            <div className="topic-col">
                                <Icon type="close" />
                            </div>
                        </div>
                    </div>
                    <div className="topic-ctrls">
                        <div className="clear-btn" >清空全部</div>
                        <div className="see-btn" onClick={this.zujuan}>查看试卷</div>
                    </div>
                </div>
                <Tabs defaultActiveKey="1" size="Default" onTabClick={this.spin} onChange={this.onTabClick}>
                    <TabPane tab="知识点" key="1" className="m-tk" >
                        <div className="knowlage">
                            <div className="tree">
                                <Tree data={this.state.tree} funt={this.changeaitifen_id}></Tree>
                            </div>

                            <div className="list" style={this.state.height > 638 ? { height: 660 } : { height: 400 }}>
                                <Searchbtn params={this.state.params} list={this.state.searchList} funt={this.changeSearchId}></Searchbtn>
                                <Search className="m-bottom" placeholder="试题内容搜索" onSearch={value => console.log(value)} enterButton />
                                {/* <div className="m-scroll-list"> */}
                                <List data={this.state.list} fun={this.add} appear={this.state.appear}></List>
                                {/* </div> */}
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="真题试卷" key="2" >
                    </TabPane>
                    <TabPane tab="机构私库" key="3" >
                    </TabPane>
                    <TabPane tab="我的题目" key="4" >
                    </TabPane>
                </Tabs>
            </div >
        );
    }
}
export default tikuguanli;