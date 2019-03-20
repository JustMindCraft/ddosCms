import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Message from '../withData/Message';
import chashao from '../../images/f25af2fe5058dac470d3d628c54b8373.png';
import { Link, withRouter } from 'react-router-dom';
import { RootNode } from '../../gunDB';
import { Typography } from '@material-ui/core';
import classNames from 'classnames';
import SearchInput from '../public/SearchInput';

const HomeLink = (props:any)=> <Link to='/' {...props} />;
const PostsLink = (props:any)=> <Link to='/posts' {...props} />;
const HotLink = (props:any)=> <Link to='/hot' {...props} />;
const TagsLink = (props:any)=> <Link to='/tags' {...props} />;
const RecommendLink = (props:any)=> <Link to='/recommend' {...props} />;
const VideosLink = (props:any)=> <Link to='/videos' {...props} />;


const styles = (theme: any) => createStyles({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    header: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        top: 90,
        position: 'relative',
        flexWrap: "wrap-reverse",
    },
    headerButton: {
        display: 'flex',
        flexDirection: 'column',
        marginRight: 2,
    },
    button: {
        margin: theme.spacing.unit,
        marginTop: 6,
    },
    headerRight: {
        marginLeft: 20,
    },
    logo: {
        width: 200,
        display: 'inline-block'
    },
    appBar: {
        position: 'fixed',
        width: "100%",
        height: "46",
        wordBreak: "keep-all",
        wordWrap: "normal",
        justifyContent: 'flex-start',
        overflowX: 'auto',
        overflowY: 'hidden',
    },
    toolbarTitle: {
        flex: 1,
        textDecoration: "none"
    },

    toolBar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyItems: 'center',
        justifyContent: 'space-between',
        fontSize: "1.2rem",
        textDecoration: "none"
    },
    toolBarButton: {
        fontSize: "1.2rem",
        textDecoration: "none"
    },
    footer: {
        marginTop: theme.spacing.unit * 8,
        borderTop: `1px solid ${theme.palette.divider}`,
        padding: `${theme.spacing.unit * 6}px 0`,
        textAlign: "center",
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
    
});

interface ILayoutProps {
    classes: any,
    history: any,
    match: any,
    location:any,
}
interface ILayoutState {
    tags: Array<any>,
}
class Layout extends React.Component<ILayoutProps, ILayoutState> {

    constructor(props: any) {
        super(props);
        this.state = {
            tags: [],
        }
    }

    
    componentDidMount(){
        RootNode.get("tags").map((tag:any) => (tag && tag.isTop) === true ? tag: undefined)
        .on((data:any, key:string)=>{
            const { tags } = this.state;
            if(data===null){
                return false;
            }
           
            if(tags.includes(data.name)){
                return false;
            }
            tags.unshift(data.name);
            return this.setState({
                tags,
            })
            
        })
    }

    onFocus = (e:any) => {
        const { history } = this.props;
        history.push("/search")
    }

    render() {
        const { classes, location } = this.props;
        const {  tags } = this.state;

        
        return (
            <React.Fragment>
                <div className={classes.header}>
                    <Link to="/">
                        <img src={chashao} className={classes.logo} />
                       
                    </Link>
                    <Typography style={{
                        flex: 1,
                    }} variant="caption">链上阅读</Typography>
                   <div>
                       {
                           location.pathname !== "/search"  &&
                            <SearchInput autoFocus={false} onFocus={this.onFocus} />
                       }
                       <br/>
                       <br/>
                       <br/>
                    
                   </div>
                   
                   
                </div>
                <AppBar position="fixed" color="default" className={classes.appBar}>
                    <Toolbar className={classes.toolBar}>
                        <Button component={HomeLink} className={classes.toolBarButton}>首页</Button>
                        <Button component={PostsLink} className={classes.toolBarButton}>文章</Button>
                        <Button component={HotLink} className={classes.toolBarButton}>热点</Button>
                        <Button component={RecommendLink} className={classes.toolBarButton}>推荐</Button>
                        <Button component={TagsLink} className={classes.toolBarButton}>标签云</Button>
                        <Button component={VideosLink} className={classes.toolBarButton}>视频</Button>

                        {
                            tags.map((tag:any, index:number)=>
                            <Link key={index} to={"/tags/"+tag} style={{
                                textDecoration: "none"
                            }}>
                            <Button className={classes.toolBarButton}>{tag}</Button>
                            </Link>
                            
                            )
                        }
                    </Toolbar>
                </AppBar>
                <Grid container style={{
                    justifyContent: "center",
                    marginTop: 50,
                }}>
                {this.props.children}
                </Grid>
                <Message />
                 {/* Footer */}
                <footer className={classNames(classes.footer, classes.layout)}>
                    CopyRight@JustMindCraft.co
                    <br/>
                    <Typography>本站内容来自网络，如有侵权，请通知我们删除。xsqfeather@gmail.com</Typography>
                    <Link to="/admin">管理中心</Link>
                </footer>
                {/* End footer */}
            </React.Fragment>
        )
    }
}

export default withRouter(withStyles(styles)(Layout) as any)