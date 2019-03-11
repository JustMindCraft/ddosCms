import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from "@material-ui/icons/Delete"
import EyeIcon from "@material-ui/icons/Visibility"
import { Paper, Fab, CircularProgress, Typography, ListItemAvatar, Avatar, Toolbar, Button, Divider, AppBar, Tabs, Tab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Link, withRouter } from 'react-router-dom';
import ConfirmDialog from '../public/ConfirmDialog';
import { observer, inject } from 'mobx-react';
import Switch from '@material-ui/core/Switch';
import SearchInput from '../public/SearchInput';
import queryString from 'query-string'
import moment from 'moment';
import 'moment/locale/zh-cn';
import message from '../../store/Message';
import VideoDialogShow from './VideoDialogShow';
import WebTorrent from 'webtorrent';
const client = new WebTorrent();


moment.locale('zh-cn');

const styles = (theme: any) => createStyles({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        minHeight: 500,

    },
    fab: {
        margin: theme.spacing.unit,
        left: "80%",
        top: 170,
        zIndex: 999,
        position: 'fixed'
    },
    paper: {
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 100,
        display: 'flex',
        height: 'inherit',
        flexDirection: 'column',
        minHeight: 800,
        alignItems: 'center',
        alignCentent: 'center',
        justifyContent: 'space-around',
    },
    itemTextSecondary: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-between",
        width: '100%',
        flexWrap: 'wrap'
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
    loading: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        minHeight: 500,
    },
    appbar: {
    }
});

interface IVideosProps {
    classes: any;
    dataProvider: any;
    location: any,
    history: any,
}

const NewPostButtonLink = (props: any) => <Link to='/posts/new' {...props} />

@inject('dataProvider')
@observer
class PostList extends React.Component<IVideosProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            tabVal: 0,
            postLoading: false,
        }
    }

    componentWillMount() {
        //准备数据阶段
        const { dataProvider, location } = this.props;

        const query = queryString.parse(location.search);

        const { setSource, setAction, setSourceIndexes, setCondition } = dataProvider;
        setSource('posts');
        setAction('list');
        setSourceIndexes(['title', 'description']);
        setCondition({ ...query });
    }

    componentDidMount() {
        const { dataProvider, location } = this.props;
        const { doAction, condition } = dataProvider;
        const query = queryString.parse(location.search);
        if (query.status === 'draft') {
            this.setState({
                tabVal: 1,
            })
        }
        if (query.status === 'published') {
            this.setState({
                tabVal: 2,
            })
        }
        doAction();
    }
    changeTab = (event: any, value: number) => {
        const { history, dataProvider } = this.props;
        const { setCondition, doAction } = dataProvider;

        if (value === 0) {
            setCondition({});
            history.push('/posts');
            doAction();
        }

        if (value === 1) {
            setCondition({ status: 'draft' });
            history.push('/posts?status=draft');
            doAction();
        }

        if (value === 2) {
            setCondition({ status: 'published' });
            history.push('/posts?status=published');
            doAction();

        }

        this.setState({
            tabVal: value,
        })


    }

    onSearchChange = (text: string) => {


        const { dataProvider } = this.props;
        const { setSearchString, setAction, doAction } = dataProvider;
        setSearchString(text);
        setAction('list');
        doAction();

    }

    handleDelete = (id: string) => {

        const { dataProvider } = this.props;
        const { setOperateId, setAction, setConfirmOpen, setConfirmTitle, setShowDialogOpen, setConfirmContent } = dataProvider;

        setOperateId(id);
        setAction('delete');
        setConfirmOpen(true);
        setConfirmTitle("是否删除此条记录");
        setConfirmContent("区块链系统不能够真正删除数据，但是此数据将会被冷处理，删除效果体验正常");

    }

    handleView = (id: string) => {
        const { dataProvider } = this.props;
        const { setOperateId, setAction, setShowDialogOpen, doAction } = dataProvider;
        setOperateId(id);
        setAction('post');
        setShowDialogOpen(true);
        this.setState({
            postLoading: true,
        })
        doAction((post: any) => {

        });


    }

    dialogBack = (back: boolean) => {
        const { dataProvider } = this.props;
        const { setConfirmOpen, doAction } = dataProvider;
        setConfirmOpen(false);
        if (back === true) {
            doAction((m: any) => {
                message.show(m);
            });
        } else {
            return false;
        }

    }

    ShowDialogBack = (back: boolean) => {
        const { dataProvider } = this.props;
        const { setOperateId, setAction, setShowDialogOpen } = dataProvider;
        setAction('list');
        setShowDialogOpen(back);
        const { magnetURI } = this.state;
        if (back === false && magnetURI !== "") {
            client.remove(this.state.magnetURI);
        }

    }
    componentWillUnmount() {
        // client.remove(this.state.magnetURI);
    }

    render() {
        const { classes, dataProvider } = this.props;
        const { list, confirmOpen, listLoading, confirmTitle, confirmContent, showDialogOpen, oneShow, operateId } = dataProvider;
        const { title, description, coverUrl } = oneShow;


        return (
            <Paper className={classes.paper}>
                <SearchInput onChange={this.onSearchChange} />
                <AppBar className={classes.appbar} position="static" color="default">
                    <Tabs
                        value={this.state.tabVal}
                        onChange={this.changeTab}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                    >
                        <Tab label="全部" />
                        <Tab label="草稿" />
                        <Tab label="已发布" />
                    </Tabs>
                </AppBar>
                {
                    listLoading ?
                        <div className={classes.loading}>
                            <CircularProgress />
                            <hr />
                            <Typography variant="subheading">正在努力同步新数据</Typography>
                        </div>
                        :
                        <List className={classes.root}>
                            {list.length === 0 ? "暂时没有数据" : list.filter((post: any) => post !== null).map((post: any, index: number) => (
                                <ListItem key={index} role={undefined} dense button >
                                    <ListItemText primary={post.title} secondaryTypographyProps={{ component: "div" }} secondary={
                                        <React.Fragment>
                                            <div className={classes.itemTextSecondary}>

                                                <div>
                                                    {moment(post.createdAt).fromNow()}
                                                </div>
                                                <div style={{
                                                    width: 300,
                                                }}>
                                                    {post.tags ?
                                                        post.tags.map((tag: string, index: number) =>
                                                            <span key={index}>{tag}</span>
                                                        ) :
                                                        "没有标签"
                                                    }
                                                </div>
                                                <div>
                                                    <Switch
                                                        checked={false}
                                                        value="draft"
                                                    />
                                                    (未发布)
                                    </div>
                                                <IconButton aria-label="view" onClick={(e: any) => this.handleView(post.id)}>
                                                    <EyeIcon />
                                                </IconButton>
                                                <IconButton aria-label="delete" onClick={(e: any) => this.handleDelete(post.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                                <IconButton aria-label="edit">
                                                    <EditIcon />
                                                </IconButton>

                                            </div>

                                        </React.Fragment>
                                    } />

                                </ListItem>
                            ))}
                        </List>
                }

                <Fab component={NewPostButtonLink} color="primary" aria-label="Add" className={classes.fab}>
                    <AddIcon />
                </Fab>
                <ConfirmDialog dialogBack={this.dialogBack} title={confirmTitle} content={confirmContent} open={confirmOpen} />
                {/* <VideoDialogShow
                    blobURI={this.state.blobURI}
                    coverUrl={coverUrl}
                    handleDelete={() => this.handleDelete(operateId)}
                    title={title} content={description}
                    open={showDialogOpen}
                    loading={this.state.videoLoading}
                    ShowDialogBack={this.ShowDialogBack}
                /> */}
                {
                    !listLoading &&
                    <Button disabled={listLoading} variant="outlined" color="secondary" fullWidth>加载前一天的</Button>

                }


            </Paper>
        );
    }
}

export default withRouter(withStyles(styles)(PostList) as any) as any;