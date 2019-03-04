import { observable } from 'mobx';
export class AuthProvider {
    @observable logining = false;
    @observable regisetering = false;
}


const authProvider = new AuthProvider();