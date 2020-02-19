//这个文件默认为我添加题目时判断的模板是属于英语语文数学物理
import React from 'react'
import English from '../english/index'
import Math from '../math/index'
import Chinese from '../chinese/index'
import Physical from '../physical/index'
const switchState = (value) => {
    switch (value) {
        case 1:
            return <English></English>
        case 2:
            return <Math></Math>
        case 3:
            return <Chinese></Chinese>
        default:
            return <Physical></Physical>
    }
}
export default class EditorDemo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ownState: 1
        }
    }
    componentDidMount() {
    }
    render() {
        return (
            <div>
                {switchState(this.state.ownState)}
            </div>

        )

    }

}