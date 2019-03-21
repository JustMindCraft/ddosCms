import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import isEmpty from 'lodash.isempty'
import { ERROR_COLOR } from '../css/common';
import Layout from '../containers/AuthFromLayout';
import { RootNode } from '../../gunDB';
import { register } from '../../auth';

const styles = (theme:any) => ({
  error: { color: ERROR_COLOR },
  notice: {
    fontSize: 14,
    lineHeight: 1.8,
    margin: '24px 0'
  }
})

interface ILoginProps {
  classes: any;
}

class Login extends Component<ILoginProps>{
  state = {
    account: '',
    password: '',
    errors: {
      account: '',
      password: '',
    },
    hasAccount: false,
    checkUserExist: false,
    checkLogined: true,
    Logined: false,

  }

  handleSubmit = (e:any) => {
    e.preventDefault()
    const { account, password } = this.state
    const errors:any = {}
    errors.account = !account ? '不能为空' : ''
    errors.password = !password ? '密码错误' : ''
    if (!isEmpty(errors)) {
      this.setState({ errors: { ...errors } })
      return 
    }
  }

  handleChange = (field:any, e:any) => {
    const value = e.target.value.trim()
    this.setState({ [field]: value })
  }

  async componentDidMount(){

    // await register("alice", 'password');

    this.setState({
      checkUserExist: true,
    });
    
    RootNode.get("superAdmin").once((data:any, key:string)=>{
      if(!data){
        console.log("系统暂时没有用户");
        this.setState({
          checkUserExist: false,
          hasAccount: false,
        })
      }else{
        this.setState({
          checkUserExist: false,
          hasAccount: true,
        })
      }
      
    })

    
    RootNode.get("users")
    .map((user:any)=>(user && user.isSuperAdmin===true))
    .once((data:any, key:string)=>{
      console.log(key, data);
      
    })
  }

  render() {
    const { account, password, errors, hasAccount, checkUserExist } = this.state
    
    const { classes: s } = this.props
    
    return (
      <Layout title={!checkUserExist? (hasAccount? "登录" : "系统尚未设置用户，请注册一个管理员"): "..."}>
        <form style={{
          maxWidth: 500,
          display: 'flex',
          flexDirection: 'column',
          alignItems: "center",
          width: "100%",
          
        }} onSubmit={this.handleSubmit}
        >
          <TextField
            style={{ width: '100%' }}
            value={account}
            onChange={this.handleChange.bind(this, 'account')}
            margin="dense"
            label="用户名"
            helperText={<span className={s.error}>{errors.account}</span>}
          />

          <TextField
            style={{ width: '100%' }}
            value={password}
            onChange={this.handleChange.bind(this, 'password')}
            margin="dense"
            label="密码"
            type="password"
            helperText={<span className={s.error}>{errors.password}</span>}
          />
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
          >
            登录
          </Button>
        </form>
        </Layout>
    )
  }
}

export default withStyles(styles)(Login)
