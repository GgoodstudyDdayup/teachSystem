import React, { Component } from 'react';
import { Route, Link, Switch} from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd';
import Tk from './tk/index'
import Tksystem from './tk/index2'
import Tkown from './tk/index3'
import Tkmine from './tk/index4'
import BK from './bk'
import CP from './cp'
import ZY from './zy'
import Tkquestion from './tk/braftEditor'
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
class main extends Component {
    constructor(opt) {
        super(opt)
        this.state = {
            height: '',
            collapsed: false
        }
    }
    componentDidMount() {
        this.setState({
            height: window.innerHeight
        })
        console.log(window.innerHeight)
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    handleClick = (e) => {
        console.log(e)
    }
    render() {
        return (
                <Layout style={{ height: this.state.height }}>

                    <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                        <div className="logoicon">
                            <img src={require('../img/lALPDgQ9rp-V0nMgzKg_168_32 (2).png')} alt="" />
                        </div>
                        <Menu onClick={this.handleClick} mode="vertical" theme="dark">
                            <SubMenu
                                key="sub1"
                                title={
                                    <span>
                                        <Icon type="mail" />
                                        <span>题库管理</span>
                                    </span>
                                }
                            >
                                <Menu.ItemGroup title="Item 1">
                                    <Menu.Item key="1">
                                        <Link to="/main">Option 1</Link>
                                    </Menu.Item>
                                    <Menu.Item key="2">Option 2</Menu.Item>
                                </Menu.ItemGroup>
                                <Menu.ItemGroup title="Iteom 2">
                                    <Menu.Item key="3">Option 3</Menu.Item>
                                    <Menu.Item key="4">Option 4</Menu.Item>
                                </Menu.ItemGroup>
                            </SubMenu>
                            <SubMenu
                                key="sub2"
                                title={
                                    <span>
                                        <Icon type="appstore" />
                                        <span>备课管理</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="5">Option 5</Menu.Item>
                                <Menu.Item key="6">Option 6</Menu.Item>
                                <SubMenu key="sub3" title="Submenu">
                                    <Menu.Item key="7">Option 7</Menu.Item>
                                    <Menu.Item key="8">Option 8</Menu.Item>
                                </SubMenu>
                            </SubMenu>
                            <SubMenu
                                key="sub4"
                                title={
                                    <span>
                                        <Icon type="setting" />
                                        <span>作业管理</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="9">Option 9</Menu.Item>
                                <Menu.Item key="10">Option 10</Menu.Item>
                                <Menu.Item key="11">Option 11</Menu.Item>
                                <Menu.Item key="12">Option 12</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub5"
                                title={
                                    <span>
                                        <Icon type="setting" />
                                        <span>测评管理</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="9">Option 9</Menu.Item>
                                <Menu.Item key="10">Option 10</Menu.Item>
                                <Menu.Item key="11">Option 11</Menu.Item>
                                <Menu.Item key="12">Option 12</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0 }}>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                            />
                        </Header>
                        <Content
                            style={{
                                margin: '24px 16px',
                                padding: 24,
                                background: '#fff',
                                minHeight: 280,
                            }}
                        >
                            <Switch>
                                <Route path='/main' exact component={Tk} />
                                <Route path="/main/tk/system" component={Tksystem} />
                                <Route path="/main/tk/own" component={Tkown} />
                                <Route path="/main/tk/mine" component={Tkmine} />
                                <Route path="/main/question" component={Tkquestion} />
                                <Route path="/main/bk" exact component={BK} />
                                <Route path="/main/zy" component={ZY} />
                                <Route path="/main/cp" component={CP} />
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
        );
    }
}
export default main;