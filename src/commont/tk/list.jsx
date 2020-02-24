import React from 'react';
import { Divider, Button } from 'antd';

const ListT = (props) => {
    const funt = (e) => {
        props.fun(e)
    }
    const total = props.addfun.map((res, index) =>
        <div className="listT" onClick={() => { funt(index) }} key={index}>
            <KnowlageName></KnowlageName>
            <Divider dashed />
            <Knowlage color={res.btnc} index={index} btn={props.btn}></Knowlage>
            <Question appear={res.appear}></Question>
        </div>
    )
    return (
        <div>
            {total}
        </div>
    )
}
const KnowlageName = () => {
    return (
        <div className="know-name-m">
            <span className="know-name">1. (2019天津市期末测试卷)</span>
            <span className="know-ques">列方程解甲、乙两辆汽车同时从A地驶往B地．经过4.5小时后，甲车落后乙车31.5千米．甲车每小时行74千米，乙车每小时行多少千米？</span>
        </div>
    )
}

const Knowlage = (props) => {
    const btn1 = (e, index) => {
        // 阻止合成事件的冒泡
        e.stopPropagation();
        // 阻止与原生事件的冒泡
        e.nativeEvent.stopImmediatePropagation();
        props.btn(index)
    }
    return (
        <div className="shop-btn">
            <div className="know-title-div">
                <p className="know-title">
                    知识点:
                <span>形如ax±b=c的方程解决实际问题</span>
                </p>
                <p className="know-title">
                    难度:
                <span>中等</span>
                </p>
                <p className="know-title">
                    组卷:
                <span>13次</span>
                </p>
            </div>
            <Button className="z-index" type={props.color ? 'primary' : 'danger'} onClick={(e) => btn1(e, props.index)}>{props.color ? '加入试题篮' : '移除试题篮'}</Button>
        </div>
    )
}
const Question = (res) => {
    if (res.appear) {
        return (
            <div>
                <Divider dashed />
                <div>
                    <p className="line-shu">答案</p>
                    <p>81千米</p>
                </div>
                <div>
                    <p className="line-shu">解析</p>
                    <p>设乙车每小时行x千米,</p>
                    <p>4.5x－74×4.5＝31.5</p>
                    <p>4.5x－333＝31.5</p>
                    <p>4.5x＝364.5</p>
                    <p>x＝81</p>
                    <p></p>
                    <p>答：乙车每小时行81千米</p>
                </div>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }

}
export default ListT