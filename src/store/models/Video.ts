import { VideoNode, RootNode, now } from './../../gunDB/index';
import { observable, action, computed } from "mobx";

export  class Video {

    @observable title = "";
    @observable coverPublicId = "";
    @observable coverUrl = "http://res.cloudinary.com/ddycd5xyn/image/upload/a_0,c_fill,w_300/default.jpg";
    @observable cloudName = ""
    @observable fileMagnetURI = "";
    @observable fileCaptionURI = "";
    @observable torrentDownloadURI = ""
    @observable saving = false;
    @observable uploading = false;
    @observable description = "";
    @observable status = "draft";
    @observable id = "";


    //valid
    @observable validing = false;
    @observable validText = "未知错误";
    @computed get valid(){
        if(this.coverUrl === "http://res.cloudinary.com/ddycd5xyn/image/upload/a_0,c_fill,w_300/default.jpg")
        {
            this.validText = "封面没有上传成功";
            return false;
        }
        if(this.coverUrl === "")
        {
            this.validText = "封面没有上传成功";
            return false;
        }
        if(this.title === ""){
            this.validText = "视频标题不得为空";
            return false;
        }
        if(this.fileMagnetURI === ""){
            this.validText = "视频没有上传成功";
            return false;
        }
        if(this.uploading){
            this.validText = "尚有上传任务没有完成！";
            return false;
        }
        return true;
    }

    @computed get locked(){
        //这个状态是用以解决在一个上传任务没有完成的时候，锁住另外一个上传任务,不然浏览器就会奔溃

        return  this.uploading;
    }

    @action setId = (id:string) => {
        this.id = id;
    }

    @action setDescription(html:string){
        this.description = html;
    }
    

    
    @action setUploading =(val: boolean)=>{
        this.uploading = val;
    }

    
    @action beginSave(){
        this.saving = true;
    }

    @action finishSave(){
        this.saving = false;
    }

    @action setCover(url:string, publicId:string, cloudName:string){
        this.coverUrl = url;
        this.coverPublicId = publicId;
        this.cloudName = cloudName;

    }
    @action setTitle = (title: string)=>{
        if(this.id ===''){
            const uuid = require('uuid/v4')();
            this.setId(uuid);
        }
        this.title = title;
    }

    @action setFileMagnetURI = (uri:string)=>{
        this.fileMagnetURI = uri;

    }
    @action setFileCaptionURI(){

    }
    @action setTorrentDownloadURI=(uri:string)=>{
        this.torrentDownloadURI = uri;
    }

    @action setValiding = (valid:boolean)=>{
        this.validing = valid
    }
    @action uploadFile(files:any){
        
    }
    @action seedFiles(){

    }

    @action publish(){

    }
    @action saveDraft(){
        this.saving = true;
        this.validing = true;
        if(!this.valid){
            this.saving = false;
            return false;
        }
        const video = RootNode.get('videos/'+this.id).put({
            title: this.title,
            coverPublicId: this.coverPublicId,
            coverUrl: this.coverUrl,
            cloudName: this.cloudName,
            fileMagnetURI: this.fileMagnetURI,
            fileCaptionURI: this.fileCaptionURI,
            torrentDownloadURI: this.torrentDownloadURI,
            description: this.description,
            status: "draft",
            id: this.id,
            createdAt: now(),
        },(ack:any)=>{
            if(!ack.err){
                RootNode.get('videos_count').once((data:any, key:string)=>{
                    RootNode.get('videos_count').put({
                        count: data? data.count+1: 1,
                    });
                })
            }
            console.log(ack);
            
        })
        VideoNode.set(video, (ack:any)=>{
            console.log("保存草稿", ack);
            this.saving = false;
            
        });
    }

    @action update(){
        
    }

}

const video = new Video();

export default  video;