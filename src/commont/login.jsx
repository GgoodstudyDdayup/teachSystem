import React, { Component } from 'react';
import {login} from '../axios/http'
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
        console.log(filter)
    }
    login = () => {
        // const params = this.state.filter
        // login(params).then(res => {
        //     console.log(res)
        // }).catch(err => {
        //     console.log(err)
        // })
        this.props.history.push("/main")
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