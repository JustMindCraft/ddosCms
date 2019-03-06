import { observable, action } from "mobx";

export  class Video {
    @observable seeding = false;
    @observable title = "";
    @observable cover = "";
    @observable fileMagnetURI = "";
    @observable fileCaptionURI = "";
    @observable saving = false;

    @action beginSeed(){
        this.seeding = true;
    }

    @action finishSeed(){
        this.seeding = false;
    }

    @action beginSave(){
        this.saving = true;
    }

    @action finishSave(){
        this.saving = false;
    }

    @action setCover(){

    }
    @action setTitle(){

    }
    @action setFileMagnetURI(){

    }
    @action setFileCaptionURI(){

    }
    @action uploadFile(files:any){
        
    }
    @action seedFiles(){

    }

}

const video = new Video();

export default  video;