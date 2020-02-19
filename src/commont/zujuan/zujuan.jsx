import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Input } from 'antd';
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
        textAlign:'start',
        justifyContent:'space-between',
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
            items: getItems(11)
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    //拖拽过后的钩子
    onDragEnd(result) {
        console.log(result)
        if (!result.destination) {
            return;
        }
        const items = reorder(
            this.state.items,
            result.source.index,
            result.destination.index
        );
        console.log(items)
        this.setState({
            items
        });
    }


    render() {
        return (
            <div className="m-zijuan-flex">
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <center>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                                <div
                                    //provided.droppableProps应用的相同元素.
                                    {...provided.droppableProps}
                                    // 为了使 droppable 能够正常工作必须 绑定到最高可能的DOM节点中provided.innerRef.
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot)}
                                >
                                    {this.state.items.map((item, index) => (
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
                                                        <span className="know-name">(2019天津市期末测试卷)</span>
                                                        <span className="know-ques">{item.content}列方程解甲、乙两辆汽车同时从A地驶往B地．经过4.5小时后，甲车落后乙车31.5千米．甲车每小时行74千米，乙车每小时行多少千米？</span>
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
                </DragDropContext>
            </div>

        );
    }
}

