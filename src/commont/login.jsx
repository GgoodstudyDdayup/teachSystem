import React, { Component } from 'react';
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
        this.setState({
            height: window.innerHeight
        })
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
        this.props.history.push("/main/tk")
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