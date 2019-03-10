import  React from 'react';
import { Button, CircularProgress, Typography, Divider } from '@material-ui/core';
import { observer, inject } from 'mobx-react';
const cloudName = 'ddycd5xyn';
const unsignedUploadPreset = 'rq6jvg1m';

interface IImageUploader {
    uploading: boolean,
    publicId: string,
    progress: number,
    coverUrl: string,
    cloudName: string,
}

@inject('message')
@observer
class ImageUploader extends React.Component<any, IImageUploader> {
    constructor(props: any){
        super(props);
        this.state = {
            uploading: false,
            publicId: 'default.jpg',
            progress: 0,
            coverUrl: "",
            cloudName: ""

        }
    }
    uploadFile = (file: any) => {
        const { message } = this.props;
        this.setState({
            uploading: true,
        })
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
        const xhr = new XMLHttpRequest();
        const fd = new FormData();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.upload.addEventListener("progress", (e) => {
            const progress = Math.round((e.loaded * 100.0) / e.total);
            // console.log(`fileuploadprogress data.loaded: ${e.loaded},
            //  data.total: ${e.total}`);
            //  console.log(progress);
            //  console.log(typeof progress);
        });
        xhr.onreadystatechange = (e) => {
            if(xhr.status != 200){
              message.show('图片上传失败，请稍后再试');
              this.props.onChange({
                    loading: false,
                })
              return this.setState({
                uploading: false,
               })
             
            }
            if (xhr.readyState == 4 && xhr.status == 200) {
  
              const response = JSON.parse(xhr.responseText);
              
              const { public_id, secure_url } = response;
              //上级组件获取图片地址
              this.setState({
                    uploading: false,
                    publicId: public_id,
                    coverUrl: secure_url,
                    cloudName,
                });
                this.props.onChange({
                    loading: false,
                    publicId: public_id,
                    coverUrl: secure_url,
                    cloudName,
                })

                message.show('图片上传上传成功');
              
            }
  
            
          };
        
        fd.append('upload_preset', unsignedUploadPreset);
        fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
        fd.append('file', file);
        xhr.send(fd);
    }
    handleFileChange=(e:any)=>{
        this.props.onChange({
            loading: true,
        })
        const extensionValid = /[.](jpg|gif|bmg|png)$/;
        const alertText = '格式不正确,支持jpg|gif|bmg|png';
        const files = e.target.files;
        
        const { message } = this.props;
        for (let index = 0; index < files.length; index++) {
            const file = files[index];
            if(!extensionValid.test(file.name)){
                this.props.onChange({
                    loading: false,
                })
                return message.show(alertText);
            }else{
                this.uploadFile(file);
            }
        }

    }
    render(){
        const { uploading } = this.state;
        const {  disabled } = this.props;
        console.log({disabled});
        
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
            }}>
               
                    <Typography variant="headline" >{uploading? '正在上传封面' : "上传封面"}</Typography> <br/>
                    <input disabled={uploading || disabled} type="file" onChange={this.handleFileChange}  accept="image/*"  capture='camera'  multiple={false} />
                    <Divider />
                <br/>
                <div style={{
                    width: "100%",
                    textAlign: 'center'
                }}>
                {
                    // uploading ? <CircularProgress color="secondary" />
                    // :
                    // <CloudinaryContext cloudName={cloudName}>
                    //     <Image publicId={coverPublicId}>
                    //         <Transformation width="300" crop="fill" angle="0"/>
                    //     </Image>
                    // </CloudinaryContext>

                }
                
                </div>
            </div>
        )
    }
}

export default ImageUploader;