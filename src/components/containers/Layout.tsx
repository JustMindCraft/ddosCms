import React from 'react';
import './Layout.css';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Snackbar } from '@material-ui/core';
import Message from '../withData/Message';
const styles = (theme:any) => createStyles({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
    appBar: {
      position: 'fixed',
      width: "100%",
      height: 40,
      justifyContent: 'center'
    },
    toolbarTitle: {
      flex: 1,
    },

    toolBar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyItems: 'stretch',
        justifyContent: 'space-evenly',
        fontSize: "1.2rem",
    },
    toolBarButton: {
        fontSize: "1.2rem",
    },
    
    heroContent: {
      maxWidth: 600,
      margin: '0 auto',
      padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    },
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
    },
  });

interface ILayoutProps {
    classes: any
}
interface ILayoutState{
    top: number
}
class Layout extends React.Component<ILayoutProps, ILayoutState> {

    constructor(props:any){
        super(props);
        this.state ={
            top: 0,
        }
    }

    componentWillMount(){
        document.onscroll =  (e:any) => {
            const top = document.documentElement.scrollTop;
            this.setState({
                top
            })
        }
    }
    render(){
        const { classes } = this.props;
       
        const { top } = this.state;
        
        return (
            <React.Fragment>
                 <AppBar style={
                     {
                         top: top<=50? 100: 0,
                     }
                 } position="fixed" color="default" className={classes.appBar}>
                    <Toolbar className={classes.toolBar}>
                        <Button className={classes.toolBarButton}>视频</Button>
                        <Button className={classes.toolBarButton}>文章</Button>
                        <Button className={classes.toolBarButton}>图片</Button>
                        <Button className={classes.toolBarButton}>资源</Button>
                        <Button className={classes.toolBarButton}>科技</Button>
                        <Button className={classes.toolBarButton}>商业</Button>
                        <Button className={classes.toolBarButton}>人生</Button>
                        <Button className={classes.toolBarButton}>趣闻</Button>
                    </Toolbar>
                </AppBar>
                <Grid>
                    
                </Grid>
                {this.props.children}
                <Message />
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(Layout)