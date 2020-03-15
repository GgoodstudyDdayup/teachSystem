import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Input, Button } from 'antd';
import SetMain from './tixinSet'
import MathJax from 'react-mathjax3'
import { get_next_cart } from '../../axios/http'
import List from './zujuanList'


// 重新记录数组顺序
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};
const grid = 8;
// 设置样式
const getItemStyle = (isDragging, draggableStyle) => {
    const style = {
        userSelect: "none",
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,

        // 拖拽的时候背景变化
        background: isDragging ? "lightgreen" : "#fff",
        border: '1px solid #eee',
        // styles we need to apply on draggables
        ...draggableStyle,
        textAlign: 'start',
        justifyContent: 'space-between',
        display: 'flex'
    }
    return (
        style
    )
}
const getListStyle = () => ({
    background: 'white',
    padding: grid,
    width: '100%'
});
//填写分数
const changeValue = (e, index) => {
    console.log(e.target.value, index)
}
export default class ReactBeautifulDnd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            paixuIndex: 0,
            list: [
            ],
            setIndex: 1,
            tixinSet: 1,
            biaotiTitle: '点击修改试卷标题',
            datiTime: '',
            appear: ''
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }
    //拖拽过后的钩子
    onDragEnd(result) {
        const list = this.state.list
        if (!result.destination) {
            return;
        }
        //告诉钩子是哪一个类里面的列表拖拽
        let newList = ''
        list.forEach(res => {
            if (res.id === result.destination.droppableId) {
                newList = res.ques_list
            }
        })
        const items = reorder(
            newList,
            result.source.index,
            result.destination.index
        )
        //告诉list你需要改变那个ques_list
        list.forEach(res => {
            if (res.id === result.destination.droppableId) {
                res.ques_list = items
            }
        })
        this.setState({
            list
        });
    }
    paixuIndex = (e) => {
        this.setState({
            paixuIndex: e
        })
    }
    add = (e) => {
        if (this.state.appear === e) {
            this.setState({
                appear: ''
            })
        } else {
            this.setState({
                appear: e
            })
        }
    }
    // deleteQuestoin = (e, id) => {
    //     e.stopPropagation()
    //     remove_question_cart({ ques_id: id }).then(res => {
    //         if (res.code === 0) {
    //             message.success(res.message)
    //             get_ques_ids_cart().then(res => {
    //                 this.setState({
    //                     cart_ques_ids: res.data.cart_ques_ids
    //                 })
    //             })
    //             get_question_cart().then(res => {
    //                 let cardTotal = null
    //                 res.data.list.forEach(res => {
    //                     cardTotal += Number(res.count)
    //                 })
    //                 this.setState({
    //                     question_cart: res.data.list,
    //                     cardTotal
    //                 })
    //             })
    //         } else {
    //             message.error(res.message)
    //         }
    //     })
    // }
    componentDidMount() {
        get_next_cart().then(res => {
            console.log(res.data.list)
            this.setState({
                list: res.data.list
            })
        })
    }
    changeSetIndex(e) {
        this.setState({
            setIndex: e
        })
    }
    biaotiTitle = (e) => {
        this.setState({
            biaotiTitle: e.target.value
        })
    }
    datiTime = (e) => {
        this.setState({
            datiTime: e.target.value
        })
    }
    mouseEnter = (e) => {
        this.setState({
            appearPaixu: e
        })
    }
    mouseOut = () => {
        this.setState({
            appearPaixu: ''
        })
    }
    tixinSet = () => {
        this.setState({
            tixinSet: 1
        })
    }
    changeInputDefault = (e, id) => {
        const list = this.state.list
        list.forEach(element => {
            if (element.id === id) {
                element.show_type_name = e.target.value
            }
        });
        this.setState({
            list
        })
    }
    //确认的时候修改的名字后我要发送一个请求
    sureInputDefault = (id) => {
        console.log(id)
    }
    //删除一个类
    deleteTlei = (id) => {
        console.log(id)
    }
    render() {
        return (
            <div id="m-zujuan" style={{ background: '#F5F5F5', display: 'flex', justifyContent: 'space-between', position: 'relative' }}>

                <div style={{ width: '80%', marginRight: 20 }}>
                    <div className="paper-hd-ctrl">
                        <Button type="dashed" onClick={this.tixinSet}>题型设置</Button>
                        <Button className="m-left" >添加试题</Button>
                        <Button className="m-left" type="primary">下一步</Button>
                    </div>

                    <div className={this.state.setIndex === 3 ? "paper-hd-title paper-hd-title-active " : 'paper-hd-title active'} style={{ background: '#fff', flex: 1 }} onClick={() => this.changeSetIndex(3)}>
                        <h3>{this.state.biaotiTitle}</h3>
                    </div>
                    <div className={this.state.setIndex === 2 ? "paper-hd-title paper-hd-title-active " : 'paper-hd-title active'} style={{ width: '100%', textAlign: 'start', background: '#fff', flex: 1, display: 'flex', justifyContent: 'center' }} onClick={() => this.changeSetIndex(2)}>
                        <div className="set-item" >总分：<span>1分</span></div>
                        <div className="set-item">答题时间：<span>{this.state.datiTime}</span>分钟</div>
                        <div className="set-item" >日期：<span className="line"></span></div>
                        <div className="set-item">班级：<span className="line"></span></div>
                        <div className="set-item">姓名：<span className="line"></span></div>
                    </div>
                    {this.state.tixinSet ? <SetMain data={this.state.list} setItem={this.setItem} sureInputDefault={this.sureInputDefault} deleteTlei={this.deleteTlei} changeInputDefault={this.changeInputDefault}></SetMain> : <div>
                        {this.state.list.map((res, index) =>
                            <div className="m-zijuan-flex" key={index}>
                                {this.state.paixuIndex === res.ques_type_id ? <DragDropContext onDragEnd={this.onDragEnd}>
                                    <center style={{ width: '100%', textAlign: 'start' }}>
                                        <Droppable droppableId={res.id}>
                                            {(provided, snapshot) => (
                                                <div
                                                    //provided.droppableProps应用的相同元素.
                                                    {...provided.droppableProps}
                                                    // 为了使 droppable 能够正常工作必须 绑定到最高可能的DOM节点中provided.innerRef.
                                                    ref={provided.innerRef}
                                                    style={getListStyle(snapshot)}
                                                >
                                                    <div className="leixing-title">
                                                        {res.show_type_name}
                                                        <div className='m-shoudongpaixu' onClick={() => this.paixuIndex(0)}>确认</div>
                                                    </div>
                                                    {res.ques_list.map((item, index) => (
                                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                                            {(provided, snapshot) => (
                                                                <div
                                                                    ref={provided.innerRef}

                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    style={getItemStyle(
                                                                        snapshot.isDragging,
                                                                        provided.draggableProps.style
                                                                    )}
                                                                >

                                                                    <div className="know-name-m">
                                                                        <span className="know-ques">
                                                                            <MathJax.Context
                                                                                key={index}
                                                                                input='tex'
                                                                                onError={(MathJax, error) => {
                                                                                    console.warn(error);
                                                                                    console.log("Encountered a MathJax error, re-attempting a typeset!");
                                                                                    MathJax.Hub.Queue(
                                                                                        MathJax.Hub.Typeset()
                                                                                    );
                                                                                }}
                                                                                script="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js"
                                                                                options={{
                                                                                    messageStyle: 'none',
                                                                                    extensions: ['tex2jax.js'],
                                                                                    jax: ['input/TeX', 'output/HTML-CSS'],
                                                                                    tex2jax: {
                                                                                        inlineMath: [['$', '$'], ['\\(', '\\)']],
                                                                                        displayMath: [['$$', '$$'], ['\\[', '\\]']],
                                                                                        processEscapes: true,
                                                                                    },
                                                                                    TeX: {
                                                                                        extensions: ['AMSmath.js', 'AMSsymbols.js', 'noErrors.js', 'noUndefined.js']
                                                                                    }
                                                                                }}>
                                                                                <MathJax.Html html={item.ques_content} />
                                                                            </MathJax.Context>
                                                                        </span>
                                                                    </div>
                                                                    <div className="zujuan-m">
                                                                        <span style={{ width: 100, display: 'inline-block' }}>分值：</span>
                                                                        <Input className="zujuan-m-item-input" defaultValue="0571" onChange={(e, index) => changeValue(e, index)} />
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>
                                    </center>
                                </DragDropContext> :
                                    <div style={{ width: '100%', background: '#fff', padding: 8 }}>
                                        <div className="leixing-title" onMouseEnter={() => this.mouseEnter(res.ques_type_id)} onMouseLeave={() => this.mouseOut()}>
                                            {res.show_type_name}
                                            <div className={this.state.appearPaixu === res.ques_type_id ? 'm-shoudongpaixu' : 'm-none'} onClick={() => this.paixuIndex(res.ques_type_id)}>手动排序</div>
                                        </div>
                                        <List data={res.ques_list} fun={this.add} deleteQuestoin={this.deleteQuestoin} appear={this.state.appear} key={index}>
                                        </List>
                                    </div>
                                }
                            </div>
                        )}
                    </div>}
                </div>




                <div className="m-right-action">
                    <div className="m-zujuanAction">
                        <div className="m-zujuanAction-content" style={{ marginBottom: 20 }}>
                            <div>
                                <div className="hd" style={{ cursor: 'pointer' }} onClick={() => this.changeSetIndex(1)}>
                                    <i className="hd-icon iconfont icon-atf-ykt-yincangtixingfenbu"></i>
                                    <span className="hd-title">试卷结构</span>
                                </div>
                                {this.state.setIndex === 1 ? <div className="bd">
                                    <div className="structure-header">
                                        <div>总分：1分</div>
                                    </div>
                                    {this.state.list.map((res, index) =>
                                        <div className="structure-panel" key={index}>
                                            <div className="structure-hd">
                                                <span>{res.ques_type_name}</span>
                                            </div>
                                            <div className="structure-bd">
                                                {res.ques_list.map((res, index) =>
                                                    <span className="active" key={index}>{index + 1}</span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div> : ''}
                            </div>
                        </div>
                        {this.state.setIndex === 2 ? <div className="m-zujuanAction-content" style={{ marginBottom: 20 }}>
                            <div >
                                <div className="hd" style={{ cursor: 'pointer' }}>
                                    <i className="hd-icon iconfont icon-atf-ykt-yincangtixingfenbu"></i>
                                    <span className="hd-title">卷头设置</span>
                                </div>
                                <div className="bd">
                                    <div className="m-flex">
                                        <span>答题时间：</span>
                                        <Input style={{ width: 120 }} size='small' value={this.state.datiTime} onChange={this.datiTime}></Input>
                                        <span>分钟</span>
                                    </div>
                                </div>
                            </div>
                        </div> : ''}
                        {this.state.setIndex === 3 ? <div className="m-zujuanAction-content" style={{ marginBottom: 20 }}>
                            <div>
                                <div className="hd" style={{ cursor: 'pointer' }}>
                                    <i className="hd-icon iconfont icon-atf-ykt-yincangtixingfenbu"></i>
                                    <span className="hd-title">试卷标题修改</span>
                                </div>
                                <div className="bd " >
                                    <Input value={this.state.biaotiTitle} onChange={this.biaotiTitle}></Input>
                                </div>
                            </div>
                        </div> : ''}
                    </div>

                </div>

            </div>
        );
    }
}

