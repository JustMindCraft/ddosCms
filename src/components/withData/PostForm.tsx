import React from 'react';
import { TextField, Paper, Button, withStyles, createStyles, CircularProgress, Divider, Switch } from '@material-ui/core';
import ImageUploader from './ImageUploader';
import VideoUploader from './VideoUploader';
import { observer, inject } from 'mobx-react';
import TextEditor from './TextEditor';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { RootNode, now } from '../../gunDB';
import { withRouter } from 'react-router';
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
        color: 'black'
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
        marginTop: 100,
        zIndex:9999
    }
})


@inject('message')
@inject('dataProvider')
@observer
class PostForm extends React.Component<any, any> {


    constructor(props: any){
        super(props);
        this.state = {
            imageUploading: false,
            coverUrl: "http://res.cloudinary.com/ddycd5xyn/image/upload/a_0,c_fill,w_300/default.jpg",
            publicId: "",
            cloudName: "",
            body: "",
            title: "",
            isRecommend: false,
            tags: [],
            isEditLoading: false,
            tagLoaded: false,

        };

    }

    componentWillMount(){
        RootNode.get('status').put("online");
       
    }
    componentDidMount(){
        const { dataProvider,match } = this.props;
        const { setAction, setOperateId, doAction }  = dataProvider;
        
        if(match.params.id){
            setAction("view");
            setOperateId(match.params.id);
            doAction(match.params.source);
            this.setState({
                isEdit: true,
            });
            setAction('update');
            
        }else{
            setOperateId(null);
            setAction('create');
        }
    }

    componentWillUnmount(){
        // client.remove(this.state.magnetURI);
        RootNode.get('status').bye().put("offline");
    }

    componentWillReact(){
        const { dataProvider,match } = this.props;
        const { singleData }  = dataProvider;
        const { tags, tagLoaded, isEditLoading } = this.state;
        let tagsLength = tags.length;
        
        if(match.params.id === singleData.id && !isEditLoading){
                if(tagLoaded === false){
                    RootNode.get(match.params.source+"/"+singleData.id+"/tags").map().once((tag:any, key:string)=>{
                        
                        if(tag){
                            tags.push(tag);
                        }
                        this.setState({
                            tags,
                            tagLoaded: true,
                        })
                       
                    })
                }
                this.setState({
                    ...singleData,
                    isEditLoading: true,
                })

        }
        
        
    }

    
    handleVideoUploaderChange = (params:any) => {
        
       this.setState({
           magnetURI: params.magnetURI,
           videoUploading: params.loading,
       })
        
    }
    getBody =  (html:string) => {
        this.setState({
            body: html,
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
    
    get postData(){
        const { 
            coverUrl, 
            cloudName, 
            publicId, 
            body,
            title,
            isRecommend, tags
        } = this.state; 
        return  {  
            coverUrl, 
            cloudName, 
            publicId, 
            body,
            title,
            isRecommend, tags: {...tags}
        }
    }
    getTags = (tags:any) => {
        let tagsObj:any = {}
        for (let index = 0; index < tags.length; index++) {
            const tag = tags[index];
            tagsObj[index] = tag;
        }
        
        this.setState({
            tags: tagsObj
        })
        
    }

    saveDraft= (e:any) => {

        e.preventDefault();
        const data = this.postData;
        const { message, dataProvider, history } = this.props;
        if(data.title===""){
            return message.show("文章标题不得为空");
        }
        if(data.coverUrl===""){
            return message.show("请务必上传图片封面")
        }
        

        const { doAction, operateId, setAction, setTimeEndCondition } = dataProvider;
        
        if(operateId==="" || !operateId){
            doAction("posts", {
                ...data,
                createdAt: now(),
                status: "draft"
            }, (m:any)=>{
                setTimeEndCondition(now());
                history.push("/admin/posts")
                return message.show(m);
            });
        }else{
            setAction('update');
            doAction('posts',{
                ...data,
                updatedAt: now(),
                status: "draft"
            },(m:any)=>{
                setTimeEndCondition(now());
                history.push('/admin/posts');
                return message.show(m);

            });
        }
        
        
    }

    publish = (e:any) => {
        e.preventDefault();
        const data = this.postData;
        const { message, dataProvider, history } = this.props;
        if(data.title===""){
            return message.show("文章标题不得为空");
        }
        if(data.coverUrl===""){
            return message.show("请务必上传图片封面")
        }
        

        const { doAction, operateId, setAction, setTimeEndCondition } = dataProvider;
        if(operateId==="" || !operateId){
            doAction("posts", {
                ...data,
                createdAt: now(),
                status: "published"
            }, (m:any)=>{
                setTimeEndCondition(now());
                history.push("/admin/posts")
                return message.show(m);
            });
        }else{
            setAction('update');
            doAction('posts',{
                ...data,
                updatedAt: now(),
                status: "published"
            },(m:any)=>{
                setTimeEndCondition(now());
                history.push('/admin/posts');
                return message.show(m);

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
        const { imageUploading, coverUrl, title, isRecommend, tags, body } = this.state;
        
        
        return (
            <Paper className={classes.paper}>
                <div className={classes.form} onSubmit={this.saveDraft}>
                   
                    <TextField disabled={imageUploading} style={{
                        minWidth: 310,
                        width: "50%",
                        marginBottom:70,
                    }} label="文章标题" value={title}  placeholder="标题" onChange={this.onChange}  />
                    <Divider variant="middle"/>
                     <h2 style={{
                                textAlign: 'center',
                            }}>为文章添加标签</h2>
                    <TagForm  tags={tags} onTagsChange={this.getTags}/> 
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

                    <ImageUploader disabled={imageUploading} onChange={this.handleImageUploaderChange} />
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

                   
                    
                    {
                        !imageUploading &&
                        <div style={{
                            width: "100%",
                            maxWidth: "1280px",
                            padding: 20,
                        }}>
                            <h2 style={{
                                textAlign: 'center',
                            }}>文章正文</h2>
                            <TextEditor getRawHtml={this.getBody} value={body} />
                        
                        </div>

                    }
                    
                    <hr/>
                    
                    <div className={classes.action}>
                        <Button disabled={imageUploading } type="submit" onClick={this.saveDraft}  variant="contained" color="secondary">保存草稿</Button>
                        <Button disabled={imageUploading } variant="contained" onClick={this.publish}  color="secondary">直接发布</Button>
                    </div>
                </div>

            </Paper>
        )
    }
}


export default withRouter(withStyles(styles)(PostForm) as any);