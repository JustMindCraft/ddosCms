interface IConfig{
    hosts: string[];
    rootId: string;
}
const config: IConfig ={
    hosts: [
        'http://localhost:3002/gun'
    ],
    rootId: 'site1'
}

export default  config;