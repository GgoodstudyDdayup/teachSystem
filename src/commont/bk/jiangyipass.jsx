import React, { Component } from 'react';
import { Upload, message, Checkbox, Button } from 'antd';
const { Dragger } = Upload;
const CheckboxGroup = Checkbox.Group;
const plainOptions = ['Apple', 'Pear', 'Orange'];

const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};
class jiangyipass extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <CheckboxGroup style={{marginBottom:10}}
                    options={plainOptions}
                    onChange={this.onChange}
                />
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        {/* <InboxOutlined /> */}
                    </p>
                    <p className="ant-upload-text">这是一个可以点击也可以拖拽进行上传的框</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                        band files
    </p>
                </Dragger>
                <Button type="primary" style={{marginTop:10}}>上传</Button>
            </div>
        );
    }
}

export default jiangyipass;