import { observable, action, computed } from "mobx";
import client from "./client";

class TorrentClient {
    //使用全局的环境变量，使得单页应用总是处于做随机做种的状态
    @observable adding = false;
    @observable seeding = false;

    @observable currentTorrent:any=null;
    @observable currentSourcesData:Array<string> = [];
    @observable currentErrMessage = "";
    @observable currentPlayingSource = null;

    @computed get currentSources(){

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
                this.currentPlayingSource = url;
                this.currentSourcesData.push(url);
                console.log(url);
                
            })

        })
    }

    

   
    @action getTorrent = (torrentId: string) => {
        return client.get(torrentId);
    }

    @action destroy = () => {
        return client.destroy();
    }
    
    @action addTorrent = (torrentId: string, cb?:(torrent: any)=>{}) => {
        
        if(torrentId==="" || typeof torrentId !== "string" || !torrentId ){
            console.log('种子不合法');
            
            return "setTorrentId first";
        }
        if(client.get(torrentId) === null){
            //当前没有torrent,则加入当前的torrenId进入客户端
            this.adding = true;
            client.add(torrentId, {
                announce: [
                    "wss://tracker.openwebtorrent.com",
                    "wss://trackerxx.lododor.com",
                    "wss://tracker.hanpeidou.life",
                ],  
            },  (torrent:any)=>{
                if(torrent){
                    
                    this.adding = false;
                    if(cb){
                        cb(torrent );
                    }
                }
            })
        }else{
            this.currentTorrent = client.get(torrentId);
            if(cb){
                cb(client.get(torrentId));
            }
        }

    };

    @action seedFile = (file:any, cb?:(m:any, torrent:any)=>{}) => {
        this.seeding = true;
        client.seed(file,{
            announce: [
                "wss://tracker.openwebtorrent.com",
                "wss://trackerxx.lododor.com",
                "wss://tracker.hanpeidou.life",
            ],  
        }, (torrent:any)=>{
            this.currentTorrent = torrent;
            this.seeding = false;
            if(cb){
                cb('做种成功!', torrent);
                
            }
        })
    }

    
}

const torrentClient = new TorrentClient();
// const seed = Math.random();
// let count = 1;
// RootNode.get('videos').map().on((data:any, key:string)=>{
//     if(data===null){
//       return false;
//     }
//     if(!data){
//       return false;
//     }
    
//     if(data.magnetURI && Math.floor(seed*100)>=count++){
//       torrentClient.addTorrent(data.magnetURI);
//     }
// })
export default torrentClient;
