interface IConfig{
    hosts: string[];
    rootId: string;
}
const config: IConfig ={
    hosts: [
        'https://gun.10000cars.com/gun'
    ],
    rootId: 'site1'
}

export default  config;