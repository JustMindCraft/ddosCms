import { RootNode, sea, now } from "../gunDB";

export function checkUserLogined(cb:(rlt:boolean)=>{}){
    const uuid = window.localStorage.get('gun_device_uuid');
    const token = window.localStorage.get('gun_token');
    if(!uuid){
        return cb(false);
    }
    if(!token){
        return cb(false);
    }

    return RootNode.get("auth").get(uuid).once((data:any, key:string)=>{
        if(data!==token){
            return cb(false);
        }

        return cb(true);
    })
}


export async function register(alias:string, pass:string, cb: (rlt:boolean, err:string)=>{}){
   RootNode.get("users/username").get(alias).once( async (data:string, key:string)=>{
       if(data){
           return cb(false, "用户名已经被占用");
       }

        const uuid = require('uuid/v4')();
        const  pair = await sea.pair(); // generate a new key pair
        console.log(pair);
        var salt = Math.random(); // random
        var proof = await sea.work(pass, salt); 
        var auth = await sea.encrypt(pair, proof);
        console.log(auth); // data saved in a cryptographically linked user graph
        const userOne = RootNode.get("users/"+uuid).put({
            pub: pair.pub,
            salt,
            username: alias,
            auth,
            id: uuid,
            createdAt: now(),
            isSuper: true,
        }, (ack:any)=>{
            console.log(ack);
            
            RootNode.get("users/username").get(alias).put(uuid);
        })
        return RootNode.get("users").set(userOne, (ack:any)=>{
            console.log("最终存储");
            
            return cb(ack.ok, ack.err);
        });
   })
    
  
}

export async function auth(alias:string, pass:string, cb: (rlt:boolean, err:any)=>{}){
    RootNode.get("users/username").get(alias).once( async (data:string, key:string)=>{
        if(!data){
            return cb(false, "用户名不存在");
        }
        return  RootNode.get("users/"+data).once( async (data:any, key:string)=>{
            // now on another machine...
            var login = await sea.work(pass, data.salt);
            var keys = await sea.decrypt(data.auth, login); // encrypted auth loaded from graph
            console.log(keys, data.pub); // equal to the original key pair
            if(keys.pub!==data.pub){
                return cb(false, "密码错误");
            }
            return cb(true, null);
        })
       
    })
   
}

