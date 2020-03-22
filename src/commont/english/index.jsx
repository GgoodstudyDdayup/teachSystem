import React from 'react'
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
export default class EditorDemo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // 创建一个空的editorState作为初始值
            editorState: BraftEditor.createEditorState(null),
            editorState2: BraftEditor.createEditorState(null),
            editorState3: BraftEditor.createEditorState(null)
        }
    }
    componentDidMount() {
        // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat

    }
    // submitContent = async () => {
    //     // 在编辑器获得焦点时按下ctrl+s会执行此方法
    //     // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    //     const htmlContent = this.state.editorState.toHTML()
    //     const result = await saveEditorContent(htmlContent)
    // }
    handleEditorChange = (editorState) => {
        console.log(editorState.toHTML())
        this.setState({ editorState })
    }
    handleEditorChange2 = (editorState2) => {
        console.log(editorState2.toHTML())
        this.setState({ editorState2 })
    }
    handleEditorChange3 = (editorState3) => {
        console.log(editorState3.toHTML())
        this.setState({ editorState3 })
    }
    render() {
        const controls = ['bold', 'italic', 'font-size','underline', 'text-color', 'separator']
        const { editorState } = this.state.editorState
        const { editorState2 } = this.state.editorState2
        const { editorState3 } = this.state.editorState3
        return (
            <div>
                <div style={{ padding: '8px 0', fontSize: 16, fontWeight: 'bold' }}>填空题</div>
                <div className="my-component my-editor-component">
                    <BraftEditor
                        value={editorState}
                        onChange={this.handleEditorChange}
                        controls={controls}
                        onSave={this.submitContent}
                        contentStyle={{ height: 200 }}
                    />
                </div>
                <div style={{ padding: '8px 0', fontSize: 16, fontWeight: 'bold' }}>答案</div>
                <div className="my-component my-editor-component">
                    <BraftEditor
                        value={editorState2}
                        onChange={this.handleEditorChange2}
                        controls={controls}
                        onSave={this.submitContent}
                        contentStyle={{ height: 100 }}
                    />
                </div>
                <div style={{ padding: '8px 0', fontSize: 16, fontWeight: 'bold' }}>解析</div>
                <div className="my-component my-editor-component">
                    <BraftEditor
                        value={editorState3}
                        onChange={this.handleEditorChange3}
                        controls={controls}
                        onSave={this.submitContent}
                        contentStyle={{ height: 100 }}
                    />
                </div>
            </div>

        )

    }

}