import Gun from 'gun/gun'
import config from './config';
require('gun/sea');
require('gun/nts');

export const gun = Gun(config.hosts) as any;
export const RootNode = gun.get(config.rootId);
export const VideoNode = gun.get(config.rootId).get('videos');
export const UserNode = gun.get(config.rootId).get('users');
export const PostNode = gun.get(config.rootId).get('posts');
export const TagNode = gun.get(config.rootId).get('tags');
export const now = () => {
    return new Date((Gun as any).state()).getTime()
    ;
}

