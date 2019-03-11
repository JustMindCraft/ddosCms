interface IConfig{
    hosts: string[];
    rootId: string;
}
const config: IConfig ={
    hosts: [
        'https://gun.10000cars.com/gun',
        'https://gun.lododor.com/gun',
        "https://simontaosim.herokuapp.com/gun"
    ],
    rootId: window.location.host
}

export default  config;