import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Fab, CircularProgress, Typography, Button, AppBar, Tabs, Tab, LinearProgress} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AdminIcon from '@material-ui/icons/Dashboard';
import { withRouter } from 'react-router-dom';
import ConfirmDialog from '../public/ConfirmDialog';
import { observer, inject } from 'mobx-react';
import SearchInput from '../public/SearchInput';
import queryString from 'query-string'
import message from '../../store/Message';
import  WebTorrent from 'webtorrent';
import { RootNode, now } from '../../gunDB';
import SourceListShow from '../containers/SouceListShow';
import ListStyles from '../public/ListStyles';

interface IListAdminProps{
    classes: any;
    dataProvider: any;
    location: any,
    history: any,
    match:any,
    message:any,
}


@inject('dataProvider')
@inject('message')
@observer
class ListAdmin extends React.Component<IListAdminProps, any> {
    constructor(props: any){
        super(props);
        this.state = {
            tabVal: 0,
            videoLoading: false,
            magnetURI: "",//种子地址
            blobURI: '',//播放地址
            torrentFileBlobURL: "",//种子文件下载地址
            torrentName: '',//种子文件名
            loading: false,
            sourceName: ""
        }
    }
    
    componentWillMount(){
        //准备数据阶段
        const { dataProvider, location, match } = this.props;

        const query = queryString.parse(location.search);
        dataProvider.setTimeEndCondition(now());
        dataProvider.setCondition({...query})
        dataProvider.setAction("list");
        

    }

    componentDidMount(){
        const { dataProvider,location, match } = this.props;
        const { setTimeEndCondition } = dataProvider;
        const source = match.params.source;
        setTimeEndCondition(now());
        if(match.params.source === "videos"){
            this.setState({
                sourceName: "视频"
            })
        }
        if(match.params.source === "posts"){
            this.setState({
                sourceName: "文章"
            })
        }

        const query = queryString.parse(location.search);
        if(query.status==='draft'){
            this.setState({
                tabVal: 1,
            })
        }
        if(query.status==='published'){
            this.setState({
                tabVal: 2,
            })
        }
        dataProvider.doAction(source);
        
    }
    changeTab = (event:any, value:number) =>{
        const { history, dataProvider, match } = this.props;
        const { doAction, setAction, setSourceIndexes, setCondition, setTimeEndCondition} = dataProvider;
        const source = match.params.source;
        
        if(value===0){
            setCondition({});
            setAction('list');
            setSourceIndexes(['title', 'description']);
            setTimeEndCondition(now());
            history.push('/admin/'+source);
            doAction(source);
        }

        if(value===1){
            setCondition({status: 'draft'});
            setAction('list');
            setTimeEndCondition(now());
            history.push('/admin/'+source+'?status=draft');
            doAction(source);
        }

        if(value===2){
            setCondition({status: 'published'});
            setAction('list');
            setTimeEndCondition(now());
            history.push('/admin/'+source+'?status=published');
            doAction(source);

        }
        
        this.setState({
            tabVal: value,
        })
        

    }

    onSearchChange = (text:string) => {

        
        const { dataProvider, match } = this.props;
        const { setSearchString, setAction, doAction } = dataProvider;
        setSearchString(text);
        setAction('list');
        doAction(match.params.source);
        
    }

    onDelete = (e:any,id:string) => {
        e.stopPropagation();
        e.cancelBubble = true;
        const { dataProvider } = this.props;
        const { setOperateId, setAction, setConfirmOpen, setConfirmTitle,setShowDialogOpen, setConfirmContent } = dataProvider;

        setOperateId(id);
        setAction('delete');
        setConfirmOpen(true);
        setConfirmTitle("是否删除此条记录");
        setConfirmContent("区块链系统不能够真正删除数据，但是此数据将会被冷处理，删除效果体验正常");

    }

    onView = (id:string) => {
        const { history, match } = this.props;
        const source = match.params.source;
        console.log(source);
        
        history.push(`/admin/${source}/${id}/preview`);
        
    }

    dialogBack = (back:boolean) => {
        const { dataProvider, match } = this.props;
        const { setConfirmOpen, doAction, operateId } = dataProvider;
        setConfirmOpen(false);
        if(back===true){
            doAction(match.params.source, operateId, (m:any)=>{
                message.show(m);
            });
        }else{
            return false;
        }
        
    }

    onRecommend = (e:any, item:any) => {
        e.stopPropagation();
        e.cancelBubble = true;
        console.log({...item});
        const { message, dataProvider, match, location } = this.props;
        const { doAction, setOperateId, setAction, setTimeEndCondition } = dataProvider;
        const source = match.params.source;
        setOperateId(item.id)
        setAction('update');
            doAction(source,{
                // ...item,
                tags: item.tags,
                updatedAt: now(),
                isRecommend: e.target.checked
            },(m:any)=>{
                const query = queryString.parse(location.search);
                dataProvider.setTimeEndCondition(now());
                dataProvider.setCondition({...query})
                dataProvider.setAction("list");
                doAction(source);
                return message.show(m);

        });
        
    }
    onPublish = (e:any, item:any) => {
        e.stopPropagation();
        e.cancelBubble = true;
        console.log({...item});
        const { message, dataProvider, match, location } = this.props;
        const { doAction, setOperateId, setAction, setTimeEndCondition } = dataProvider;
        const source = match.params.source;
        setOperateId(item.id)
        setAction('update');
            doAction(source,{
                // ...item,
                tags: item.tags,
                updatedAt: now(),
                status: e.target.checked? "published": "draft",
            },(m:any)=>{
                const query = queryString.parse(location.search);
                dataProvider.setTimeEndCondition(now());
                dataProvider.setCondition({...query})
                dataProvider.setAction("list");
                doAction(source);
                return message.show(m);

        });
        
    }

   
    componentWillUnmount(){
        // client.remove(this.state.magnetURI);
        RootNode.get('status').bye().put("offline");
        
    }

    handleNavToNewSource = () => {
        this.setState({
            loading: true
        })
        const { history, match } = this.props;
        setTimeout(()=>{
            history.push('/admin/'+match.params.source+'/new')
        }, 500)
        
    }
    onEdit = (e:any, id:string) => {
        const { history, match } = this.props;
        const source = match.params.source;
        
        e.stopPropagation();
        e.cancelBubble = true;
        setTimeout(()=>{
            history.push('/admin/'+source+'/'+id+'/edit')
        }, 500)
    }

    backAdmin = () => {
        this.setState({
            loading: true
        })
        const { history } = this.props;
        setTimeout(()=>{
            history.push('/admin')
        }, 500)
    }
  
    render() {
        const { loading, sourceName } = this.state;
        const { classes, dataProvider, match } = this.props;

        const { confirmTitle, confirmContent, confirmOpen, listLoading, getList, getTagList } = dataProvider;
        

        if(loading){
            //如果新的，页面比较重，加入加载过程
            return (
                <Paper className={classes.root}>
                    <LinearProgress />
                    <br />
                    <div className={classes.loadingText}>跳转中</div>
                </Paper>
            )
        }
       
        const list = getList(match.params.source);

        return (
        <Paper className={classes.paper}>
         <br/>
          <Typography className={classes.typography} variant="h4">{sourceName}管理</Typography>
          <br/>
        <SearchInput onChange={this.onSearchChange}/><br/>
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
            <SourceListShow source={match.params.source}
                list={list} 
                onView={this.onView} 
                onDelete={this.onDelete}
                onEdit={this.onEdit}
                getTagList={getTagList}
                onRecommend={this.onRecommend} 
                onPublish={this.onPublish}
              />
            }
        
        
            <Fab  onClick={this.handleNavToNewSource}  color="primary" aria-label="Add" className={classes.fab}>
                <AddIcon />
            </Fab>
            <Fab  onClick={this.backAdmin}  color="primary" aria-label="Add" className={classes.adminFab}>
                <AdminIcon />
            </Fab>
            <ConfirmDialog dialogBack={this.dialogBack} title={confirmTitle} content={confirmContent} open={confirmOpen} />
           
            {
                !listLoading && 
            <Button disabled={listLoading}  variant="outlined" color="secondary" fullWidth>加载前一天的</Button>

            }

        </Paper>
        );
    }
}

export default withRouter(withStyles(ListStyles)(ListAdmin) as any) as any;