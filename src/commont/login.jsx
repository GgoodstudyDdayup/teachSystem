import React, { Component } from 'react';
import { login } from '../axios/http'
import { message } from 'antd'
import store from '../store'
import { UserStateActionCreators } from '../actions/UserStateAction'
//定义组件内部私有的状态
class Login extends Component {
    constructor(opt) {
        super(opt)
        //只有在构造函数中可以直接给state进行赋值初始化
        this.state = {
            height: null,
            filter: {
                username: '',
                password: ''
            }
        }
    }
    componentDidMount() {
        window.addEventListener('resize', this.handleSize);
    }
    componentWillUnmount() {
        // 移除监听事件
        window.removeEventListener('resize', this.handleSize);
    }

    // 自适应浏览器的高度
    handleSize = () => {
        console.log(document.body.clientHeight)
        this.setState({
            height: document.body.clientHeight,
        });
    }
    loginChange = (e) => {
        const filter = this.state.filter
        filter[e.target.name] = e.target.value
        this.setState({
            filter
        })
    }
    login = () => {
        const params = this.state.filter
        login(params).then(res => {
            console.log(res)
            if (res.data.code === 0) {
                message.success({
                    content: `${res.data.message}`,
                    onClose: () => {
                        //将获取到的token放入redux中
                        store.dispatch(UserStateActionCreators.SaveUserStateActionCreator(res.data.data))
                        this.props.history.push("/main")
                    },
                    duration: 1
                })
            } else {
                message.error({
                    content: `${res.data.message}`,
                    duration: 1
                })
            }

        }).catch(err => {
            message.error({
                content: `${err.data.message}`,
                onClose: () => {
                    console.log('fail')
                },
                duration: 1
            })
            console.log(err)
        })
    }
    render() {
        return (
            <div className="login-page" style={{ height: `${this.state.height}px` }}>
                <div className="login-index">
                    <div className="login-index-left">
                        <img src={require('../img/3997c1ecc3ff10a23a307e4f23903ce.png')} alt="" />
                    </div>
                    <div className="login-index-right">
                        <p>欢迎登录教学管理平台</p>
                        <div className="input-div">
                            <input type="text" name="username" value={this.state.filter.username} onChange={this.loginChange} placeholder="请输入用户名" />
                            <input type="text" name="password" value={this.state.filter.password} onChange={this.loginChange} placeholder="请输入用密码" />
                        </div>
                        {/* <Link  to="/FirstPage">登录</Link> */}
                        <div className="login-btn" onClick={this.login}>登录</div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;