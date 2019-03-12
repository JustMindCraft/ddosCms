import { now, RootNode } from './../gunDB/index';
import { observable, computed, action, toJS } from 'mobx';



export class DataProvider {
    //若是要条件查询需要把条件列出，判断与或

    @observable condition = new Map()
    //之后会使用mongodb风格的条件查询语句，实现难度较大，暂时不实现, 这属性暂时实现基于gun key并集查询

    @observable source = 'videos';
    @observable searchIndexes = ['title', 'body', 'description', 'tags'];//需要被搜索的字段

    @observable loading = true;
    @observable dataSource:Array<any> = [];
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

    @observable sourceLocked = false;
    

    @computed get list(){
        return this.dataSource.slice();
    }

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

    @action setSource = (source:any) => {
        this.source = source

    }

    @action setSearchString = (searchString:string) => {
        this.dataSource = [];
        this.searchString = searchString;
        if(this.indexes.includes('tags')){
            //保证模糊搜索能够匹配tags;
            this.condition.set('tags', searchString);
        }
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
        this.dataSource = [];
           
            
        if(!item || item === null){
          return undefined;
        }
        //搜索用正则表达可以实现更强大的功能，暂时不实现
        // console.log(item['title']);
        // 
        // const searchRegExp = new RegExp("/%"+"案发"+"%/");
        // console.log("test", searchRegExp.test(item['title']));
        // console.log("search", item['title'].search(searchRegExp));
        // console.log("index", );
        const timeCondition = item.createdAt >= this.timeFromCondition && item.createdAt <= this.timeEndCondition;
       
        
        for (let index = 0; index < this.indexes.length; index++) {
            //搜索查询
            const searchKey = this.indexes[index];
            let conditionMatch = false;
            if(this.condition.size===0){
                conditionMatch = true;
            }
            this.condition.forEach((value:any, key:string)=>{
                //条件查询
                if(key==='tags'){
                    //对于标签查询,我们求交集
                    if(!item[key]){
                        return conditionMatch = false;
                    }
                    const intersection = item[key].filter((v:string) => value.includes(v))
                    if(intersection.length>0){
                        return conditionMatch = true;
                    }else{
                        return conditionMatch = false;
                    }
                }
                if(item[key] === value){
                    return conditionMatch = true;
                }

            })
            const searchCondition = item[searchKey] && item[searchKey].toString().indexOf(this.searchString)>=0 || 
            this.searchString==="";
            
            if(item[searchKey] && searchCondition  && timeCondition && conditionMatch){
                return item;
            }
        }
        return undefined;
      }

    @action getList = (cb?:(m:any)=>{}) => {
        RootNode.get('status').put("online");
        this.listLoading = true;
        this.dataSource = [];
        RootNode.get(this.source).map((item:any)=>this.filterCondition(item)).once((data:any, key:string)=>{
        if(data===null){    
            return false;
        }
        this.dataSource.unshift(data);
        
        this.listLoading = false;
        
        })
          //手工加载完毕
          let timeout:any = null;
          timeout =  setTimeout(()=>{
              if(this.list.length===0){
                this.listLoading = false;
              }
              clearTimeout(timeout);
          }, 5432)

    }

    @action delete = (cb?:(m:string)=>{}) => {
        this.setAction("list");
        RootNode.get(this.source)
        .map((item:any)=> item? (item.id===this.operateId? item: undefined): undefined )
        .once((data:any,key:string)=>{
            
            RootNode.get(this.source).get(key).put(null, (ack:any)=>{
                RootNode.get(this.source+'/'+this.operateId).put(null, (ack:any)=>{

                    if(!ack.err){
                        if(cb){
                            cb("删除数据成功");
                        }
                        this.setTimeEndCondition(now());
                        this.doAction();
                    }
                })
                
            })
        })
        
    }

    @action getSingleData = (cb?:(m:any)=>{}) => {
        this.oneLoading = true;
        RootNode.get(this.source+'/'+this.operateId).on((data:any, key:string)=>{
            this.singleData = data;
            this.oneLoading = false;
            if(cb){
                cb(data);
            }
        })
    }

    @action createOne = (cb:(m:any)=>{}, data:any) => {

        this.creating = true;

        const uuid = require('uuid/v4')();

        this.setOperateId(uuid);

        const one = RootNode.get(this.source+"/"+this.operateId).put({...data, id: this.operateId}, (ack:any)=>{
            if(!ack.err){
                RootNode.get(this.source+"_count").once((data:any, key:string)=>{
                    RootNode.get(this.source+"_count").put({
                        count: data? data.count+1: 1,
                    });
                });
            }
            console.log(ack);
            
        });
        RootNode.get(this.source).set(one, (ack:any)=>{
            console.log("保存", ack);
            this.creating = false;
            if(!ack.err){
                cb('保存草稿成功');
            }
        });
    }

    @action updateOne = (data:any) => {

        this.updating = true;

        const one = RootNode.get(this.source+"/"+this.operateId).put(data, (ack:any)=>{
            if(!ack.err){
                RootNode.get(this.source+"_count").once((data:any, key:string)=>{
                    RootNode.get(this.source+"_count").put({
                        count: data? data.count+1: 1,
                    });
                });
            }
            console.log(ack);
            
        });
        RootNode.get(this.source).set(one, (ack:any)=>{
            console.log("更新", ack);
            this.updating = false;
        });
    }

    @action doAction = (cb?:(m:any)=>{}, data?:any) => {
        
        switch (this.action) {
            case "list":
                if(cb){
                    return this.getList(cb);
                }else{
                    return this.getList();
                }
                
            
            case 'delete':
                if(cb){
                    return this.delete(cb);
                }
                return this.delete();

            case 'view':
                return this.getSingleData(cb);

            case "create":
                if(cb){
                    return this.createOne(cb, data);
                }else{
                    return "callback missing"

                }
               

            case "update":
                return this.updateOne(data);
        
            default:
                return this.getList();;
        }
    }
}

const dataProvider = new DataProvider();

export default dataProvider;