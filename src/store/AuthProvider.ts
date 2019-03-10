import { observable } from 'mobx';
export class AuthProvider {
    @observable logining = false;
    @observable regisetering = false;

    @observable username = "";
    @observable password = "";

}


const authProvider = new AuthProvider();