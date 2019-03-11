import React from 'react';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles, createStyles } from '@material-ui/core/styles';
import NewPage from '../containers/New';
import Popular from '../containers/Popular';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import HomeWithMobx from '../withData/HomeWithMobx';
import { Link } from 'react-router-dom';

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





interface IHomePageProps {
  classes: any,
}

class HomePage extends React.Component<IHomePageProps> {

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.container}>
         <HomeWithMobx /> 
          <Popular />
          <NewPage />
        </main>
        {/* Footer */}
        <footer className={classNames(classes.footer, classes.layout)}>
          CopyRight@JustMindCraft.co
          <br/>
          <Link to="/admin">管理中心</Link>
        </footer>
        {/* End footer */}
      </React.Fragment>
    )
  }

}

export default withStyles(styles)(HomePage);