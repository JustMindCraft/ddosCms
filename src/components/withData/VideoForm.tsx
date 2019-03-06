import React from 'react';
import { TextField, Paper, Button } from '@material-ui/core';
import ImageUploader from './ImageUploader';
import VideoUploader from './VideoUploader';
import { observer, inject } from 'mobx-react';
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'



@inject('video')
@observer
class VideoForm extends React.Component<any, any> {


    constructor(props: any){
        super(props);
        this.state = {
            editorState: BraftEditor.createEditorState(null)
        }
    }

    handleTitleInput = (e:any) => {
        const { video } = this.props;
        video.setTitle(e.target.value);
    }

    saveDraft = () => {
        const {video} = this.props;
        console.log(video);
        
    }
    publish = () => {
        const { video } = this.props;
        console.log(video);
        
    }

    handleEditorChange = (editorState:any) => {
        const { video } = this.props;
        const htmlContent = this.state.editorState.toHTML();
        this.setState({ editorState })
        video.setDescription(htmlContent);
        
    }

    submitContent = async () => {
        const htmlContent = this.state.editorState.toHTML();
        console.log(htmlContent);
        
    }
   
    render(){

        const { editorState } = this.state;
        
        return (
            <Paper style={{
                paddingTop: 5,
                paddingLeft: 15,
                paddingRight: 15,
                paddingBottom: 15,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 500,
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
                        <TextField style={{
                            width: "100%",
                            minWidth: 310
                        }} label="视频标题" placeholder="标题" onChange={this.handleTitleInput} />

                    </div>
                    
                    <ImageUploader />
                    
                   
                    <br/>
                    
                    <VideoUploader />
                    <div>
                        <h2 style={{
                            textAlign: 'center',
                        }}>视频介绍或描述</h2>
                        <BraftEditor
                            value={editorState}
                            onChange={this.handleEditorChange}
                            onSave={this.submitContent}
                        />

                    </div>
                    <br/>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: "80%"
                    }}>
                        <Button onClick={this.saveDraft} variant="contained" color="secondary">保存草稿</Button>
                        <Button onClick={this.publish} variant="contained"  color="secondary">直接发布</Button>
                    </div>
                </form>

            </Paper>
        )
    }
}


export default VideoForm;