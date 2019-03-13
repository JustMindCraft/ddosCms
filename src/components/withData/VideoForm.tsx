import React from 'react';
import { TextField, Paper, Button, withStyles, createStyles, CircularProgress, Divider, Switch } from '@material-ui/core';
import ImageUploader from './ImageUploader';
import VideoUploader from './VideoUploader';
import { observer, inject } from 'mobx-react';
import TextEditor from './TextEditor';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { RootNode, now } from '../../gunDB';
import { withRouter } from 'react-router';
import TorrentVideoPlayer from './TorrentVideoPlayer';
import TagForm from '../public/TagForm';





const styles = createStyles({
    paper: {
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 100,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 800,
        alignItems: 'center',
        alignCentent: 'center',
        justifyContent: 'space-around',
    },
    form: {
        display: "flex",
        flexDirection: 'column',
        minHeight: 500,
        alignItems: 'center',
        alignCentent: 'center',
        justifyContent: 'space-around',
        width: "80%"
    },
    action: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "80%",
        marginBottom: 100,
        marginTop: 100
    }
})


@inject('message')
@inject('dataProvider')
@observer
class VideoForm extends React.Component<any, any> {


    constructor(props: any){
        super(props);
        this.state = {
            videoUploading: false,
            magnetURI: "",
            imageUploading: false,
            coverUrl: "http://res.cloudinary.com/ddycd5xyn/image/upload/a_0,c_fill,w_300/default.jpg",
            publicId: "",
            cloudName: "",
            description: "",
            title: "",
            isRecommend: false,
            tags: ["视频"],
        };

    }

    componentWillMount(){
        RootNode.get('status').put("online");
        const { dataProvider,match } = this.props;
        console.log(match.params.id);
        const { setSource, setAction, setOperateId }  = dataProvider;
        setAction('create');
        setOperateId("");
        console.log("prepare");
    }

    componentWillUnmount(){
        // client.remove(this.state.magnetURI);
        RootNode.get('status').bye().put("offline");
    }

    componentWillReact(){
        
    }

    
    handleVideoUploaderChange = (params:any) => {
        console.log(params);
        
       this.setState({
           magnetURI: params.magnetURI,
           videoUploading: params.loading,
       })
        
    }
    getDescription =  (html:string) => {
        this.setState({
            description: html,
        })
    }

    handleImageUploaderChange = (params:any) => {
        
        this.setState({
            coverUrl: params.coverUrl,
            imageUploading: params.loading,
            publicId: params.publicId,
            cloudName: params.cloudName,
        })
    }
    
    get videoData(){
        const { magnetURI, 
            coverUrl, 
            cloudName, 
            publicId, 
            description,
            title,
            isRecommend
        } = this.state; 
        return  { magnetURI, 
            coverUrl, 
            cloudName, 
            publicId, 
            description,
            title,
            isRecommend
        }
    }
    getTags = (tags:any) => {
        this.setState({
            tags
        })
        
    }

    saveDraft= (e:any) => {

        e.preventDefault();
        const data = this.videoData;
        const { message, dataProvider, history } = this.props;
        if(data.title===""){
            return message.show("视频标题不得为空");
        }
        if(data.coverUrl===""){
            return message.show("请务必上传图片封面")
        }
        if(data.magnetURI===""){
            return message.show('请务必上传视频，并且在本地做种');
        }

        const { doAction, operateId, setAction, setTimeEndCondition } = dataProvider;
        console.log(operateId);
        if(operateId===""){
            doAction("videos", {
                ...data,
                createdAt: now(),
                status: "draft"
            }, (m:any)=>{
                setTimeEndCondition(now());
                history.push("/admin/videos")
                return message.show(m);
            });
        }else{
            setAction('update');
            doAction('videos',{
                ...data,
                createdAt: now(),
                status: "draft"
            },(m:any)=>{
                message.show(m);
                history.push('/admin/videos');

            });
        }
        
        
    }

    onChange = (e:any) =>{
        this.setState({
            title: e.target.value,
        })
    }
    changeRecommend = (e:any) => {
        this.setState({
            isRecommend: e.target.checked,
        })
    }
   
    render(){
        const { classes } = this.props;
        const { magnetURI, videoUploading, imageUploading, coverUrl, title, isRecommend } = this.state;
        

        const locked = videoUploading || imageUploading;
        
        
        return (
            <Paper className={classes.paper}>
                <div className={classes.form} onSubmit={this.saveDraft}>
                   
                    <TextField disabled={locked} style={{
                        minWidth: 310,
                        width: "50%",
                        marginBottom:70,
                    }} label="视频标题" value={title}  placeholder="标题" onChange={this.onChange}  />
                    <Divider variant="middle"/>
                     <h2 style={{
                                textAlign: 'center',
                            }}>为视频添加标签</h2>
                    <TagForm  tags={["视频"]} onTagsChange={this.getTags}/> 
                    <hr/>
                    <h2 style={{
                                textAlign: 'center',
                            }}>是否推荐</h2>
                    <Switch
                        value="recommand"
                        checked={isRecommend}
                        onChange={this.changeRecommend}
                    />({isRecommend? "推荐": "不推荐"})
                    <hr/>

                    <ImageUploader disabled={locked} onChange={this.handleImageUploaderChange} />
                    {
                        imageUploading ? <CircularProgress  color="secondary" /> :
                        <div>
                            <img style={{
                            minWidth: 310,
                            width: "50%",
                        }} src={coverUrl} alt=""/>
                        </div>
                    }
                    <hr/>

                    <VideoUploader disabled={locked} onChange={this.handleVideoUploaderChange}  />
                   
                    
                    {
                        !locked &&
                        <div>
                            <h2 style={{
                                textAlign: 'center',
                            }}>视频介绍或描述</h2>
                            <TextEditor getRawHtml={this.getDescription} />
                        
                        </div>

                    }
                    
                    <hr/>
                    
                    <div className={classes.action}>
                        <Button disabled={locked } type="submit" onClick={this.saveDraft}  variant="contained" color="secondary">保存草稿</Button>
                        <Button disabled={locked } variant="contained"  color="secondary">直接发布</Button>
                    </div>
                </div>

            </Paper>
        )
    }
}


export default withRouter(withStyles(styles)(VideoForm) as any);