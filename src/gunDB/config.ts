interface IConfig{
    hosts: string[];
    rootId: string;
}
const config: IConfig ={
    hosts: [
        'https://gun.10000cars.com/gun',
        "https://simontaosim.herokuapp.com/gun",
        "https://gun.hanpeidou.life/gun"
    ],
    rootId: "lododor.com"
}

export default  config;