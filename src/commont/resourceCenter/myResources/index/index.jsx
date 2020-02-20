


import React, { Component } from 'react';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
class Myresources extends Component {
    onTabClick = (e) => {
        switch (e) {
            case '1':
                this.props.history.push("/main/resourceCenter/myresources")
                break
            default:
                this.props.history.push("/main/resourceCenter/myresources/wenjianjia")
        }
    }
    render() {
        return (
            <div>
                <Tabs defaultActiveKey="1" size="Default" onChange={this.onTabClick}>
                    <TabPane tab="我的题目" key="1" className="m-tk" >

                    </TabPane>
                    <TabPane tab="文件库" key="2" >

                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
export default Myresources;