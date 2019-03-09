import { observable, action, computed } from "mobx";
import client from "./client";

class TorrentClient {
    //使用全局的环境变量，使得单页应用总是处于做随机做种的状态
    @observable adding = false;
    @observable seeding = false;

    @observable currentTorrent:any=null;
    @observable currentSourcesData:Array<string> = [];
    @observable currentErrMessage = ""

    @computed currentSources(){

        return this.currentSourcesData.slice();
    }
    //total static 
    @computed get totalDownloadSpeed(){
        return client.downloadSpeed;
    }
    @computed get totalUploadSeep(){
        return client.uploadSpeed;
    }

    @computed get totalProgress(){
        return client.progress;
    }

    @computed get totalRatio(){
        return client.ratio;
    }

    //current total static
    @computed get currentReceived(){
        return this.currentTorrent.received;
    }

    @computed get currentDownloaded(){
        return this.currentTorrent.downloaded;
    }

    @computed get currentUploaded(){
        return this.currentTorrent.uploaded;
    }
    

    @observable setCurrentSources = () => {
        this.currentTorrent.files.forEach((file:any)=>{
            file.getBlobURL((err:any, url:any)=>{
                if(err){
                    return this.currentErrMessage = err.message;
                }
                this.currentSourcesData.push(url);
            })

        })
    }

    

   
    @action getTorrent = (torrentId: string) => {
        return client.get(torrentId);
    }
    @action addTorrent = (torrentId: string) => {
        if(torrentId===""){
            return "setTorrentId first";
        }
        if(client.get(torrentId) === null){
            //当前没有torrent,则加入当前的torrenId进入客户端
            this.adding = true;
            client.add(torrentId, (torrent:any)=>{
                if(torrent){
                    this.currentTorrent = torrent;
                    this.adding = false;
                }
            })
        }else{
            this.currentTorrent = client.get(torrentId);
        }

    };

    @action seedFile = (file:any) => {
        this.seeding = true;
        client.seed(file, (torrent:any)=>{
            this.currentTorrent = torrent;
            this.seeding = false;
        })
    }

    
}

const torrentClient = new TorrentClient();
export default torrentClient;