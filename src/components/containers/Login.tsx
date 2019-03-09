import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import isEmpty from 'lodash.isempty'
import { ERROR_COLOR } from '../css/common';
import Layout from '../containers/AuthFromLayout';

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
    }
  }

  handleSubmit = (e:any) => {
    e.preventDefault()
    const { account, password } = this.state
    const errors:any = {}
    errors.account = !account ? '不能为空' : ''
    errors.password = !password ? '密码错误' : ''
    if (!isEmpty(errors)) {
      console.log(1)
      this.setState({ errors: { ...errors } })
      return 
    }
  }

  handleChange = (field:any, e:any) => {
    const value = e.target.value.trim()
    console.log(value)
    this.setState({ [field]: value })
  }

  render() {
    const { account, password, errors } = this.state
    console.log(errors)
    const { classes: s } = this.props
    return (
      <Layout title="登陆">
        <div>
          <TextField
            style={{ width: '100%' }}
            value={account}
            onChange={this.handleChange.bind(this, 'account')}
            margin="dense"
            label="手机号"
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
            onClick={this.handleSubmit}
          >
            登录
          </Button>
        </div>
        </Layout>
    )
  }
}

export default withStyles(styles)(Login)
