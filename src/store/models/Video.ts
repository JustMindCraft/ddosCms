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

    @computed get locked(){
        //这个状态是用以解决在一个上传任务没有完成的时候，锁住另外一个上传任务,不然浏览器就会奔溃

        return  this.uploading;
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
    @action setTitle(title: string){
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
    @action uploadFile(files:any){
        
    }
    @action seedFiles(){

    }

    @action save(){

    }

    @action update(){
        
    }

}

const video = new Video();

export default  video;