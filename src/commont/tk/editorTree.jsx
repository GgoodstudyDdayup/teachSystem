import React from 'react';
import { Tree, Icon } from 'antd';
const { TreeNode } = Tree;
const TreeMain = (props) => {
    return (
        <div>
            <TreeList tree={props.data} funt={props.funt} know_lageId={props.know_lageId}></TreeList>
        </div>
    )
}

const TreeList = (props) => {
    const onCheck = (checkedKeys, info) => {
        // console.log('onCheck', checkedKeys, info);
        new Promise((resolve, reject) => {
            const result = checkedKeys.reduce((item, res, index) => {
                item.push({
                    ques_knowledge_id: res,
                    ques_knowledge_first_id: "",
                    ques_knowledge_second_id: "",
                    ques_knowledge_three_id: ""
                })
                return item
            }, [])
            resolve(result)
        }).then(res => {
            const result = res
            result.forEach((l1, index) => {
                props.tree.forEach((res2) => {
                    if (res2.children !== null) {
                        res2.children.forEach((res3) => {
                            if (res3.children !== null) {
                                res3.children.forEach((res4) => {
                                    if (res4.children !== null) {
                                        res4.children.forEach(res5 => {
                                            if (res5.aitifen_id === result[index].ques_knowledge_id) {
                                                result[index].ques_knowledge_three_id = res4.aitifen_id
                                                result[index].ques_knowledge_second_id = res3.aitifen_id
                                                result[index].ques_knowledge_first_id = res2.aitifen_id
                                            }
                                        })
                                    } else {
                                        if (res4.aitifen_id === result[index].ques_knowledge_id) {
                                            result[index].ques_knowledge_second_id = res3.aitifen_id
                                            result[index].ques_knowledge_first_id = res2.aitifen_id
                                        }
                                    }
                                })
                            } else {
                                if (res3.aitifen_id === result[index].ques_knowledge_id) {
                                    result[index].ques_knowledge_first_id = res2.aitifen_id
                                }
                            }
                        })
                    }
                })
            })
            return result
        }).then(res => {
            props.know_lageId(res)
        })
    };
    const l1 = props.tree.map((res) =>
        <TreeNode icon={<Icon type="carry-out" />} title={res.title} key={res.aitifen_id} checkable={false}>
            {res.children ? res.children.map((item) =>
                <TreeNode icon={<Icon type="carry-out" />} title={item.title} key={item.aitifen_id} checkable={item.children ? false : true}>
                    {item.children ? item.children.map((item2) =>
                        <TreeNode icon={<Icon type="carry-out" />} title={item2.title} key={item2.aitifen_id} checkable={item2.children ? false : true}>
                            {item2.children ? item2.children.map((item3) =>
                                <TreeNode icon={<Icon type="carry-out" />} title={item3.title} key={item3.aitifen_id} >
                                </TreeNode>
                            ) : ''}
                        </TreeNode>
                    ) : ''}
                </TreeNode>
            ) : ''}

        </TreeNode>
    )
    return (
        <Tree
            checkable
            onCheck={onCheck}
            autoExpandParent={false}
        >
            {l1}
        </Tree>
    )
}
export default TreeMain