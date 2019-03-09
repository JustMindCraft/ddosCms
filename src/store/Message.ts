import { observable, action } from "mobx";

export class Message {
    @observable showable = false;
    @observable content = "";

    @action show = (content: string) => {
        this.content = content;
        this.showable = true;
        setTimeout(()=>{
            this.showable = false;
        },2345)
    }
}

const message  = new Message();

export default message;