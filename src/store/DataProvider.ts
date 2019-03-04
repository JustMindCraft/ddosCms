import { observable } from 'mobx';
export class DataProvider {
    @observable loading = true;
    @observable dataSource = [];
}

const dataProvider = new DataProvider();

export default dataProvider;