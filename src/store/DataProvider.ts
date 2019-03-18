import { now, RootNode } from './../gunDB/index';
import { observable, computed, action, toJS } from 'mobx';



export class DataProvider {
    //若是要条件查询需要把条件列出，判断与或

    @observable condition = new Map()
    //之后会使用mongodb风格的条件查询语句，实现难度较大，暂时不实现, 这属性暂时实现基于gun key并集查询

    @observable sources:string[] = [];
    @observable searchIndexes = ['title', 'body', 'description', 'tags'];//需要被搜索的字段

    @observable loading = true;
    @observable dataSource:Map<string, Array<any>> = new Map();
    @observable checked=[];//选中的项目
    @observable timeFromCondition= now()-1000*60*60*72;//说明查询的时间段, 默认是一天
    @observable timeEndCondition= now();//说明查询的时间段, 默认是一天
    @observable searchString = '';//模糊搜索的字符串
    @observable operateId=""; //当前操作的记录ID
    @observable action="list"; //交互类型，用于架构基于消息的页面逻辑,比如延迟执行，被动执行等


    //状态
    @observable oneLoading = false; //单个文件加载状态
    @observable listLoading = false;//列表加载状态
    @observable creating = false;
    @observable updating = false;

    //确认对话框
    @observable confirmOpen = false;
    @observable confirmActionBack = false;//说明确认对话框的点击动作返回的状态，同意或者拒绝
    @observable confirmTitle = "";
    @observable confirmContent = "";


    @observable showDialogOpen = false;
    @observable showDialogLoading = false;
    @observable showDialogTitle = false;//内容显示框只指定标题，其余内容在其他组件实现

    @observable singleData = new Map();

    @computed get oneShow(){
        return toJS(this.singleData);
    }

    @computed get indexes(){
        return this.searchIndexes.slice();
    }

    @action setShowDialogOpen = (open:boolean)=>{
       
        return this.showDialogOpen = open;
    }

    @action setConfirmOpen = (open:boolean) => {
        this.confirmOpen = open;
    }

    @action setConfirmTitle = (title:string) => {
        this.confirmTitle = title;
    }

    @action setConfirmContent = (content:string) => {
        this.confirmContent = content;
    }

    @action setOperateId = (id:string) => {
        this.operateId = id;
    }

    @action setAction = (action:string) =>{
        this.action = action;
    }

    @action setSearchString = (searchString:string) => {
        this.searchString = searchString;
    }

    @action setCondition = (condition:any) =>{
        let size = 0
        for (const key in condition) {
            if (condition.hasOwnProperty(key)) {
                const element = condition[key];
                this.condition.set(key, element);
                size++;
            }
        }
        if(size===0){
            //当传入空对象的时候，清空条件
            this.condition.clear();
        }
    }

    @action setSourceIndexes = (indexes: Array<string>) => {
        this.searchIndexes = indexes;
    }

    @action setTimeFromCondition = (time: number) => {
        return this.timeFromCondition = time;
    }

    @action setTimeEndCondition = (time: number) => {
        return this.timeEndCondition = time;
    }

    @action filterCondition = (item:any)=> {
            
        if(!item || item === null){
          return undefined;
        }

        const timeCondition = item.createdAt >= this.timeFromCondition && item.createdAt <= this.timeEndCondition;
        // console.log("时间范围", timeCondition);
        
        
        for (let index = 0; index < this.indexes.length; index++) {
            //搜索查询
            const searchKey = this.indexes[index];
            let conditionMatch = false;
            // console.log("status", this.condition.get("status"));
            
            if(this.condition.size===0){
                // 查询有结果
                // console.log("查询条件是空的");
                
                conditionMatch = true;
            }else{
                // console.log("条件有多少？", this.condition.size);
                
            }
            this.condition.forEach((value:any, key:string)=>{
                //条件查询
                
                if(item[key] === value){
                    return conditionMatch = true;
                }

            })
            let searchCondition = false;
            if(item[searchKey] && item[searchKey].toString().indexOf(this.searchString)>=0){
                // console.log("搜索有结果");
                
                searchCondition = true;
            }
            if(this.searchString === "" ){
                // console.log("搜索有结果");

                searchCondition = true;
            }
            if(item[searchKey] && searchCondition  && timeCondition && conditionMatch){
                return item;
            }
        }
        return undefined;
      }
    
    
    @action getList = (source:string) => {

        return this.dataSource.get(source);
    };

    @action getTagList = (sourceName:string, id:string) => {
       return this.dataSource.get(sourceName+"/tags/"+id);
    }

    @action getData = (sourceName:string, cb?:(m:any)=>void) => {
        RootNode.get('status').put("online");
        this.listLoading = true;
        this.dataSource.set(sourceName, []);
        RootNode.get(sourceName).map((item:any)=>this.filterCondition(item)).on((data:any, key:string)=>{
            if(data===null){    
                return false;
            }
            console.log(data);
            
            
            const list = this.dataSource.get(sourceName);
            if(list){
                list.unshift(data);
            }
            
           
            this.listLoading = false;

            
        })
        
          //手工加载完毕
        let timeout:any = null;
        timeout =  setTimeout(()=>{
            const list = this.dataSource.get(sourceName);
            if(list && list.length===0){
                this.listLoading = false;
            }
            clearTimeout(timeout);
        }, 5432)

    }

    @action delete = (sourceName:string, cb?:(m:string)=>void) => {
        
            RootNode.get(sourceName)
            .map((item:any)=> item? (item.id===this.operateId? item: undefined): undefined )
            .once((data:any,key:string)=>{
                RootNode.get(sourceName).get(key).put(null, (ack:any)=>{
                    RootNode.get(sourceName+'/'+this.operateId).put(null, (ack:any)=>{
    
                        if(!ack.err){
                            if(cb){
                                cb("删除数据成功");
                                this.setAction("list");
                            }
                            this.setTimeEndCondition(now());
                            this.doAction(sourceName);
                        }
                    })
                    
                })
            });
        
    }

    @action getSingleData = (sourceName:string, cb:(m:any)=>void) => {
        this.oneLoading = true;
        RootNode.get(sourceName+'/'+this.operateId).on((data:any, key:string)=>{
            this.singleData = data;
            this.oneLoading = false;
            if(cb){
                cb(data);
            }
        })
         //手工加载完毕
         let timeout:any = null;
         timeout =  setTimeout(()=>{
            this.oneLoading = false;
            clearTimeout(timeout);
         }, 5432)
           
       
    }

    @action createOne = (sourceName:string, data:any, cb:(m:any)=>void, ) => {

        this.creating = true;

        const tags = data.tags;
        const uuid = require('uuid/v4')();
        console.log({tags});
        
        RootNode.get(sourceName+"/"+uuid+"/tags").put(null).put({...tags});
        for (const key in tags) {
            if (tags.hasOwnProperty(key)) {
                const tag = tags[key];
                const tagOne = RootNode.get("tags/"+tag).put({name: tag, contentId: uuid})
                RootNode.get("tags").set(tagOne, (ack:any)=>{
                    console.log(ack);
                    
                });
                
            }
        }

        this.setOperateId(uuid);

        const one = RootNode.get(sourceName+"/"+this.operateId).put({...data, id: this.operateId}, (ack:any)=>{
            if(!ack.err){
                RootNode.get(sourceName+"_count").once((data:any, key:string)=>{
                    RootNode.get(sourceName+"_count").put({
                        count: data? data.count+1: 1,
                    });
                });
            }
            console.log(ack);
            
        });
        RootNode.get(sourceName).set(one, (ack:any)=>{
            console.log("保存", ack);
            this.creating = false;
            if(!ack.err){
                cb('保存成功');
            }
        });
    }

    @action updateOne = (sourceName:string, data:any, cb:(m:any)=>void) => {

        this.updating = true;
        const tags = data.tags;
        console.log({tags});
        
        RootNode.get(sourceName+"/"+this.operateId+"/tags").put(null).put({...tags});

        for (const key in tags) {
            if (tags.hasOwnProperty(key)) {
                const tag = tags[key];
                const tagOne = RootNode.get("tags/"+tag).put({name: tag, contentId: this.operateId})
                RootNode.get("tags").set(tagOne, (ack:any)=>{
                    console.log(ack);
                    
                });
                
            }
        }

        const one = RootNode.get(sourceName+"/"+this.operateId).put({...data, id: this.operateId}, (ack:any)=>{
            console.log(ack);
        });
        RootNode.get(sourceName).set(one, (ack:any)=>{
            console.log("保存", ack);
            this.updating = false;
            if(!ack.err){
                cb('更新成功');
            }
        });
    }

    @action doAction = (sourceName:string, data?:any, cb?:(m:any)=>void,) => {
        this.dataSource.set(sourceName, []);
        if(!sourceName || typeof sourceName !== "string"){
            throw "必须配给资源名";
            
        }

        switch (this.action) {
            case "list":
                if(cb){
                    return this.getData(sourceName, cb);
                }else{
                    return this.getData(sourceName);
                }
                
            
            case 'delete':
                if(cb){
                    return this.delete(sourceName, cb);
                }
                return this.delete(sourceName);

            case 'view':
                if(cb){
                    return this.getSingleData(sourceName, cb);
                }
                return this.getSingleData(sourceName, (m:any)=>{} );

            case "create":
                if(cb){
                    return this.createOne(sourceName, data, cb);
                }else{
                    throw "create, callback missing"

                }
               

            case "update":
                if(cb){
                    return this.updateOne(sourceName, data, cb);
                }else{
                    throw "update, callback missing"

                }
        
            default:
                return this.getData(sourceName);
        }
    }
}

const dataProvider = new DataProvider();

export default dataProvider;