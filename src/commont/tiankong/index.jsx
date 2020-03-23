import React from 'react'
import { ContentUtils } from 'braft-utils'
import { Upload, Icon } from 'antd'
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
    //这个是内容
    handleEditorChange = (editorState) => {
        this.props.ques_content(editorState.toHTML())
        this.setState({ editorState })
    }
    //这个是答案
    handleEditorChange2 = (editorState2) => {
        this.props.ques_answer(editorState2.toHTML())
        this.setState({ editorState2 })
    }
    //这个是解析
    handleEditorChange3 = (editorState3) => {
        this.props.ques_analysis(editorState3.toHTML())
        this.setState({ editorState3 })
    }
    handleChange = info => {
        let fileList = [...info.fileList];
        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-2);
        // 2. Read from response and show file link
        fileList = fileList.map(file => {
            if (file.response) {
                if (file.response.data.code !== 106) {
                    file.url = file.response.data.full_path;
                } else {
                    return false
                }
            }
            // Component will show file.url as link
            return file
        })
        console.log(fileList)
        this.setState({
            editorState: ContentUtils.insertMedias(this.state.editorState, [{
                type: 'IMAGE',
                url: URL.createObjectURL
            }])
        });
    }
    render() {
        const props = {
            action: 'https://devjiaoxueapi.yanuojiaoyu.com/api/upload/upload_file',
            onChange: this.handleChange,
            showUploadList: false,
            headers: {
                username: sessionStorage.getItem('username'),
                token: sessionStorage.getItem('token'),
                companyid: sessionStorage.getItem('company_id'),
            },
            name: 'upload_control'
        };
        const controls = ['bold', 'italic', 'underline', 'text-color', 'separator']
        const extendControls = [
            {
                key: 'antd-uploader',
                type: 'component',
                component: (
                    <Upload
                        {...props}
                    >
                        {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
                        <button type="button" className="control-item button upload-button" data-title="插入图片">
                            <Icon type="picture" theme="filled" />
                        </button>
                    </Upload>
                )
            }
        ]
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
                        extendControls={extendControls}
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