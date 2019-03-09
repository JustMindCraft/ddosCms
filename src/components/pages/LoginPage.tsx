import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import Login from '../containers/Login'

const styles = (theme: any) => createStyles({
  
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing.unit * 2,
  },
  cardActions: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing.unit * 2,
    },
  },
  footer: {
    marginTop: theme.spacing.unit * 8,
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit * 6}px 0`,
    textAlign: "center",
  },
  container: {
    width: '96%',
    margin: '0 auto',
  }
});





interface ILoginPageProps {
  classes: any
}

class LoginPage extends React.Component<ILoginPageProps> {

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.container}>
            <Login />
        </main>
        {/* Footer */}
        <footer className={classNames(classes.footer, classes.layout)}>
          CopyRight@JustMindCraft.co
        </footer>
        {/* End footer */}
      </React.Fragment>
    )
  }

}

export default withStyles(styles)(LoginPage);