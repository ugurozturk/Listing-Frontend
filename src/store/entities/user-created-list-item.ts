import Entity from './entity';
import SystemCreatedListItem from './system-created-list-item';
import UserCreatedList from './user-created-list';

export default class UserCreatedListItem extends Entity<number>{
    name:string;
    score:number;
    userCreatedList:UserCreatedList;
    systemCreatedListItem:SystemCreatedListItem;
}