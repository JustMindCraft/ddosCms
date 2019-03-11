import React from 'react';
import { TextField, Paper, Button } from '@material-ui/core';
import { observer, inject } from 'mobx-react';
import TextEditor from './TextEditor';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { PostNode } from '../../gunDB';
import { withRouter } from 'react-router';



@inject('message')
@observer
class PostForm extends React.Component<any, any> {


    constructor(props: any){
        super(props);
        this.state = {
            editorState: ""
        }

    }
    componentWillMount(){
        const { post } = this.props;
        post.reset();
    }

    componentWillReact(){
        const { post, message, history } = this.props;
        const { id, saving, validing, validText, setValiding } = post;
        if(saving){
            message.show("正在保存......");
        }
        if(validing){
            message.show(validText);
            setValiding(false);
        }
        PostNode.map((item:any)=> item? (item.id===id? item: undefined): undefined).once((data:any, key:string)=>{
            
            if(data.id===id ){
                if(data.status === 'draft'){
                    message.show("保存草稿成功!");
                    history.push('/posts?status=draft');
                    
                }
                if(data.status === "published"){
                    message.show("视频发布成功!");
                    history.push('/posts?status=published');

                }
            }
        })
    }

    handleTitleInput = (e:any) => {
        const { post } = this.props;
        post.setTitle(e.target.value);
    }

    saveDraft = () => {
        const {post} = this.props;
        post.saveDraft();
        
    }
    publish = () => {
        const { post } = this.props;
        console.log(post);
        
    }

    getRawHtml = (html:string) => {
        const { post } = this.props;
        post.setDescription(html);
    }
   
    render(){
        const { post } = this.props;
        const { title, saving, locked } = post;
        
        
        return (
            <Paper style={{
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
                
            }}>
                <form style={{
                    display: "flex",
                    flexDirection: 'column',
                    minHeight: 500,
                    alignItems: 'center',
                    alignCentent: 'center',
                    justifyContent: 'space-around',
                    width: "80%"
                }}>
                    <div style={{
                        margin: 20,
                    }}>
                        <TextField disabled={locked} style={{
                            width: "100%",
                            minWidth: 310
                        }} label="视频标题" value={title} placeholder="标题" onChange={this.handleTitleInput} />

                    </div>
                    
                    
                   
                    <br/>
                    
                    {
                        !locked &&
                        <div>
                            <h2 style={{
                                textAlign: 'center',
                            }}>视频介绍或描述</h2>
                            <TextEditor getRawHtml={this.getRawHtml} />
                        
                        </div>

                    }
                    
                    <br/>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: "80%",
                        marginBottom: 100,
                        marginTop: 100
                    }}>
                        <Button disabled={saving} onClick={this.saveDraft} variant="contained" color="secondary">保存草稿</Button>
                        <Button disabled={saving} onClick={this.publish} variant="contained"  color="secondary">直接发布</Button>
                    </div>
                </form>

            </Paper>
        )
    }
}


export default withRouter(PostForm);