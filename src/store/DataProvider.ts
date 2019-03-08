import { now, RootNode } from './../gunDB/index';
import { observable, computed, action } from 'mobx';



export class DataProvider {
    //若是要条件查询需要把条件列出，判断与或

    @observable condition = new Map()

    @observable source = 'videos';
    @observable searchIndexes = ['title', 'body', 'description'];//需要被搜索的字段

    @observable loading = true;
    @observable dataSource = [];
    @observable checked=[];//选中的项目
    @observable timeCondition= now()-1000*60*60*24;//说明查询的时间段, 默认是一天
    @observable searchString = '';//模糊搜索的字符串
    @observable operateId=""; //当前操作的记录ID
    @observable action="list"; //交互类型，用于架构基于消息的页面逻辑


    //状态
    @observable onLoading = false; //单个文件加载状态
    @observable listLoading = false;//列表加载状态

    //确认对话框
    @observable confirmOpen = false;
    @observable confirmActionBack = false;//说明确认对话框的点击动作返回的状态，同意或者拒绝
    @observable confirmTitle = "";
    @observable confirmContent = "";
    

    @computed get list(){
        return this.dataSource.slice();
    }

    @computed get indexes(){
        return this.searchIndexes.slice();
    }

    @action setAction(action:string){
        this.action = action;
    }

    filterCondition = (item:any)=> {
        const conditionRegExp = new RegExp("/"+this.searchString+"/");
            
        if(!item || item === null){
          return undefined;
        }
        const timeCondition = item.createdAt >= this.timeCondition && item.createdAt <= now();

        for (let index = 0; index < this.indexes.length; index++) {
            const matchStr = this.indexes[index];
            if(item[matchStr].search(conditionRegExp) && timeCondition){
                return item;
              }
        }
        return undefined;
      }

    @action getList = () => {
        this.listLoading = true;
        
        RootNode.get(this.source).map(this.filterCondition).on((data:any, key:string)=>{
            if(data===null){
              return false;
            }
            this.dataSource.unshift(data as never);
            this.listLoading = false;
            
          })
    }

    @action delete = () => {
        
    }

    @action doAction = () => {
        switch (this.action) {
            case "list":
                return this.getList();
            
            case 'delete':
                return this.delete();
        
            default:
                break;
        }
    }
}

const dataProvider = new DataProvider();

export default dataProvider;