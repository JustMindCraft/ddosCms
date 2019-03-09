import React from 'react'
import { withStyles ,createStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = (theme:any) => createStyles({
  container: {
    width: 340,
    margin: '30px auto',
    display: 'flex',
    flexDirection: 'column',
    padding: 32
  },
  titleWrap: {
    // backgroundColor: theme.palette.background.paper,
    textAlign: 'center',
    marginBottom: 8
  },
  title: {
    // color: theme.palette.primary.main
  },
  items: {}
})


interface IAuthFormLayoutProps {
    classes: any;
    children: any;
    title: string;
}

class AuthFormLayout extends React.Component<IAuthFormLayoutProps>{
  render() {
    const { children, classes: s, title } = this.props
    return (
      <Paper className={s.container}>
        <div className={s.titleWrap}>
          <Typography className={s.title} variant="h6">
            {title}
          </Typography>
        </div>
        <div className={s.items}>{children}</div>
      </Paper>
    )
  }
}


export default withStyles(styles)(AuthFormLayout)