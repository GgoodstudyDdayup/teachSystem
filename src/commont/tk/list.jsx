import React from 'react';
import { Divider, Button } from 'antd';
const ListT = (props) => {
    const total = props.data.map((res, index) =>
        <div className="listT" onClick={() => { props.fun(res.question_id) }} key={index}>
            <KnowlageName paper_name={res.paper_name} ques_content={res.ques_content} index={index} key={res.paper_id}></KnowlageName>
            <Divider dashed />
            <Knowlage moveOrAdd={props.moveOrAdd} id={res.ques_id} ques_number={res.ques_number} ques_difficulty_text={res.ques_difficulty_text} color={res.btnc} index={index} ques_knowledge_name={res.ques_knowledge_name} btn={props.addQuestoin} btn2={props.deleteQuestoin}></Knowlage>
            <div className={props.appear === res.question_id ? '' : 'question-active'} >
                <Divider dashed />
                <div>
                    <p className="line-shu">答案</p>
                    <p dangerouslySetInnerHTML={{
                        __html: res.ques_answer
                    }}></p>
                </div>
                <div>
                    <p className="line-shu">解析</p>
                    <p dangerouslySetInnerHTML={{
                        __html: res.ques_analysis
                    }}></p>
                </div>
            </div>
        </div>
    )
    return (
        <div>
            {total ? total : ''}
        </div>
    )
}
const KnowlageName = (props) => {
    return (
        <div className="know-name-m">
            <span className="know-name">{props.index + 1 + '、' + props.paper_name}</span>
            <span className="know-ques" dangerouslySetInnerHTML={{
                __html: props.ques_content
            }}></span>

        </div>
    )
}
const Knowlage = (props) => {

    return (
        <div className="shop-btn">
            <div className="know-title-div">
                <p className="know-title">
                    知识点:
                <span>{props.ques_knowledge_name}</span>
                </p>
                <p className="know-title">
                    难度:
                <span>{props.ques_difficulty_text}</span>
                </p>
                <p className="know-title">
                    组卷:
                <span>{props.ques_number}次</span>
                </p>
            </div>
            <div>
                <Button className="z-index" type={props.moveOrAdd(props.id) ? 'danger' : 'primary'} onClick={props.moveOrAdd(props.id)?(e) => props.btn2(e, props.id):(e) => props.btn(e, props.id)}>{props.moveOrAdd(props.id) ? '移除试题篮' : '加入试题篮'}</Button>
            </div>
        </div>
    )
}
export default ListT