import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Input, Button } from 'antd';
import { get_next_cart } from '../../axios/http'
import List from './zujuanList'
//初始化数据
const getItems = count =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + 1}`,
        content: `this is content ${k + 1}`
    }));

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
            items: getItems(11),
            paixuIndex: 0,
            list: [
            ],
            setIndex: 1,
            appear: ''
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }
    //拖拽过后的钩子
    onDragEnd(result) {
        if (!result.destination) {
            return;
        }
        const items = reorder(
            this.state.items,
            result.source.index,
            result.destination.index
        );
        this.setState({
            items
        });
    }
    paixuIndex = (e) => {
        console.log(e)
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
            console.log(res)
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
    render() {
        return (
            <div style={{ background: '#F5F5F5', display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                <div style={{ width: '80%', marginRight: 20 }}>
                    <div className="paper-hd-ctrl">
                        <Button type="dashed">题型设置</Button>
                        <Button className="m-left" >添加试题</Button>
                        <Button className="m-left" type="primary">下一步</Button>
                    </div>

                    <div className={this.state.setIndex === 3 ? "paper-hd-title paper-hd-title-active " : 'paper-hd-title active'} style={{ background: '#fff', flex: 1 }} onClick={() => this.changeSetIndex(3)}>
                        <h3>2020年02月14日初中历史试卷</h3>
                    </div>
                    <div className={this.state.setIndex === 2 ? "paper-hd-title paper-hd-title-active " : 'paper-hd-title active'} style={{ width: '100%', textAlign: 'start', background: '#fff', flex: 1, display: 'flex',justifyContent:'center' }} onClick={() => this.changeSetIndex(2)}>
                        <div className="set-item" >总分：<span>1分</span></div>
                        <div className="set-item">答题时间：<span>120</span>分钟</div>
                        <div className="set-item" >日期：<span className="line"></span></div>
                        <div className="set-item">班级：<span className="line"></span></div>
                        <div className="set-item">姓名：<span className="line"></span></div>
                    </div>
                    {this.state.list.map((res, index) =>
                        <div className="m-zijuan-flex" key={index}>
                            {this.state.paixuIndex === res.ques_type_id ? <DragDropContext onDragEnd={this.onDragEnd}>
                                <center style={{ width: '100%', textAlign: 'start' }}>
                                    <Droppable droppableId="droppable">
                                        {(provided, snapshot) => (
                                            <div
                                                //provided.droppableProps应用的相同元素.
                                                {...provided.droppableProps}
                                                // 为了使 droppable 能够正常工作必须 绑定到最高可能的DOM节点中provided.innerRef.
                                                ref={provided.innerRef}
                                                style={getListStyle(snapshot)}
                                            >
                                                <div className="leixing-title">
                                                    {res.ques_type_name}
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
                                                                    <span className="know-name">{index + 1}(2019天津市期末测试卷)</span>
                                                                    <span className="know-ques">{index + 1 + item.ques_content}</span>
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
                                    <div className="leixing-title">
                                        {res.ques_type_name}
                                        <div className='m-shoudongpaixu' onClick={() => this.paixuIndex(res.ques_type_id)}>手动排序</div>
                                    </div>
                                    <List data={res.ques_list} fun={this.add} deleteQuestoin={this.deleteQuestoin} appear={this.state.appear} key={index}>
                                    </List>
                                </div>
                            }

                        </div>
                    )}
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
                                    <div className="structure-panel">
                                        <div className="structure-hd">
                                            <span>一、选择题</span>
                                        </div>
                                        <div className="structure-bd">
                                            <span className="active">1</span><span className="">2</span><span className="">3</span><span className="">4</span><span className="">5</span>
                                        </div>
                                    </div>
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
                                    <div className="structure-header">
                                        <div>总分：1分</div>
                                    </div>
                                    <div className="structure-panel">
                                        <div className="structure-hd">
                                            <span>一、选择题</span>
                                        </div>
                                        <div className="structure-bd">
                                            <span className="active">1</span><span className="">2</span><span className="">3</span><span className="">4</span><span className="">5</span>
                                        </div>
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
                                <div className="bd">
                                    <Input>
                                    </Input>
                                </div>
                            </div>
                        </div> : ''}
                    </div>
                </div>
            </div>
        );
    }
}

