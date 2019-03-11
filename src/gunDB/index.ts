import Gun from 'gun/gun'
import config from './config';
require('gun/sea');
require('gun/nts');
require('gun/lib/bye.js');

export const gun = Gun(config.hosts);
export const RootNode = gun.get(config.rootId);
export const VideoNode = gun.get(config.rootId).get('videos');
export const PostNode = gun.get(config.rootId).get('posts');
export const now = () => {
    return new Date((Gun).state()).getTime()
    ;
}

