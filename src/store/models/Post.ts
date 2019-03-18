import { PostNode, RootNode, now } from './../../gunDB/index';
import { observable, action, computed } from "mobx";

export  class Post {

    @observable title = "";
    @observable content = "";
    @observable cloudName = ""
    @observable saving = false;
    @observable status = "draft";
    @observable id = "";
    @observable description = ""


    //valid
    @observable validing = false;
    @observable validText = "未知错误";

    @action reset = () => {
        this.title = '';
        this.cloudName = "";
        this.saving = false;
        this.status = "draft";
        this.id = "";

    }

    @computed get valid(){
        return true;
    }

    @action setDescription(html:string){
        this.description = html;
    }


    @action setId = (id:string) => {
        this.id = id;
    }
    
    @action beginSave(){
        this.saving = true;
    }

    @action finishSave(){
        this.saving = false;
    }

    @action setTitle = (title: string)=>{
        if(this.id ===''){
            const uuid = require('uuid/v4')();
            this.setId(uuid);
        }
        this.title = title;
    }

    @action setValiding = (valid:boolean)=>{
        this.validing = valid
    }
   
    @action publish(){
        this.saving = true;
        this.validing = true;
        // if(!this.valid){
        //     this.saving = false;
        //     return false;
        // }
        const post = RootNode.get('posts/'+this.id).put({
            title: this.title,
            content: this.content,
            cloudName: this.cloudName,
            status: "pubish",
            id: this.id,
            createdAt: now(),
        },(ack:any)=>{
            if(!ack.err){
                RootNode.get('posts_count').once((data:any, key:string)=>{
                    RootNode.get('posts_count').put({
                        count: data? data.count+1: 1,
                    });
                })
            }
            
        })
        PostNode.set(post, (ack:any)=>{
            this.saving = false;
            
        });
    }
    @action saveDraft(){
        this.saving = true;
        this.validing = true;
        // if(!this.valid){
        //     this.saving = false;
        //     return false;
        // }
        const post = RootNode.get('posts/'+this.id).put({
            title: this.title,
            content: this.content,
            cloudName: this.cloudName,
            status: "draft",
            id: this.id,
            createdAt: now(),
        },(ack:any)=>{
            if(!ack.err){
                RootNode.get('posts_count').once((data:any, key:string)=>{
                    RootNode.get('posts_count').put({
                        count: data? data.count+1: 1,
                    });
                })
            }
            console.log(ack);
            
        })
        PostNode.set(post, (ack:any)=>{
            this.saving = false;
            
        });
    }

    @action update(){
        
    }

}

const post = new Post();

export default  post;