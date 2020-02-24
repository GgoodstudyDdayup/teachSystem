import React, { Component } from 'react';
import { Tabs, Spin, Badge, Icon, Input } from 'antd';
import Select from './selection'
import Know from './knowlist'
import List from './list'
import Searchbtn from './searchbtn'
const { Search } = Input
const options = [
    {
        code: '小学',
        name: '小学',
        items: [
            {
                code: '数学',
                name: '数学',
            },
            {
                code: '语文',
                name: '语文',
            },
            {
                code: '英语',
                name: '英语',
            },

        ],
    },
    {
        code: '初中',
        name: '初中',
        items: [
            {
                code: '生物',
                name: '生物',
            },
            {
                code: '地理',
                name: '地理',
            },
            {
                code: '历史',
                name: '历史',
            },
        ],
    },
    {
        code: '高中',
        name: '高中',
        items: [
            {
                code: '物理',
                name: '物理',
            },
            {
                code: '化学',
                name: '化学',
            },
            {
                code: '政治',
                name: '政治',
            },
        ],
    }
];
const { TabPane } = Tabs;
class tikuguanli2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [
                { appear: false, btnc: true },
                { appear: true, btnc: true }
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
            spin: false,
            clear: 'none',
            count: 10
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
    componentDidMount() {
        window.addEventListener('resize', this.handleSize);
        this.handleSize()
    }
    componentWillUnmount() {
        // 移除监听事件
        window.removeEventListener('resize', this.handleSize);
    }
    // 自适应浏览器的高度
    handleSize = () => {
        console.log(document.body.clientHeight)
        this.setState({
            height: document.body.clientHeight,
        });
    }
    render() {
        return (
            <div>
                <Spin tip="加载中..." size="large" className={this.state.spin ? 'm-spin' : 'm-spin-dis'} />
                <Select data={options}></Select>
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
                        <div className="see-btn">查看试卷</div>
                    </div>
                </div>

                <Tabs defaultActiveKey="2" size="Default" onTabClick={this.spin} onChange={this.onTabClick}>
                    <TabPane tab="知识点" key="1" className="m-tk" >

                    </TabPane>
                    <TabPane tab="真题试卷" key="2" >
                        <div className="knowlage">
                            <div className="tree">
                                <Know></Know>
                            </div>
                            <div className="list" style={this.state.height > 638 ? { height: 660 } : { height: 400 }}>
                                <Searchbtn list={this.state.searchList} funt={this.changeSearchId}></Searchbtn>
                                <Search className="m-bottom" placeholder="试题内容搜索" onSearch={value => console.log(value)} enterButton />
                                {/* <div className="m-scroll-list"> */}
                                <List addfun={this.state.list} fun={this.add} btn={this.btnChange}></List>
                                {/* </div> */}
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="机构私库" key="3" >

                    </TabPane>
                    <TabPane tab="我的题目" key="4">

                    </TabPane>
                </Tabs>
            </div >
        );
    }
}
export default tikuguanli2;