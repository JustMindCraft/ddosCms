import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Message from '../withData/Message';
import chashao from '../../images/f25af2fe5058dac470d3d628c54b8373.png';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const styles = (theme: any) => createStyles({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    headerButton: {
        display: 'flex',
        flexDirection: 'column',
    },
    button: {
        margin: theme.spacing.unit,
        marginTop: 6,
    },
    headerRight: {
        marginLeft: 20,
    },
    logo: {
        marginTop: -30,
        marginBottom: 20,
        width: 200,
    },
    appBar: {
        position: 'fixed',
        width: "100%",
        height: 40,
        justifyContent: 'flex-start',
        overflowX: 'auto',
        overflowY: 'hidden',
    },
    toolbarTitle: {
        flex: 1,
    },

    toolBar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyItems: 'center',
        justifyContent: 'space-between',
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
interface ILayoutState {
    top: number
}
class Layout extends React.Component<ILayoutProps, ILayoutState> {

    constructor(props: any) {
        super(props);
        this.state = {
            top: 0,
        }
    }

    componentWillMount() {
        document.onscroll = (e: any) => {
            const top = document.documentElement.scrollTop;
            this.setState({
                top
            })
        }
    }
    render() {
        const { classes } = this.props;

        const { top } = this.state;

        return (
            <React.Fragment>
                <div className={classes.header}>
                    <Link to="/">
                        <img src={chashao} className={classes.logo} />
                    </Link>
                    <div className={classes.headerButton}>
                        <Button variant="contained" className={classNames(classes.button,classes.headerRight)}>
                            Sign In
                        </Button>
                        <Button variant="contained" className={classNames(classes.button,classes.headerRight)}>
                            Sign In
                        </Button>
                    </div>
                </div>
                <AppBar style={
                    {
                        top: top <= 50 ? 100 : 0,
                    }
                } position="fixed" color="default" className={classes.appBar}>
                    <Toolbar className={classes.toolBar}>
                        <Button className={classes.toolBarButton}>视频</Button>
                        <Button className={classes.toolBarButton}>文章</Button>
                        <Button className={classes.toolBarButton}>热点</Button>
                        <Button className={classes.toolBarButton}>推荐</Button>
                        <Button className={classes.toolBarButton}>标签云</Button>
                        <Button className={classes.toolBarButton}>经济</Button>
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