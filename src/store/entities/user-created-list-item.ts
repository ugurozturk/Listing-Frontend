import Entity from './entity';
import SystemCreatedListItem from './system-created-list-item';
import UserCreatedList from './user-created-list';
import UserCreatedListItemTag from './user-created-list-item-tag';

export default class UserCreatedListItem extends Entity<number>{
    name:string;
    score:number;
    userCreatedListId:number;
    userCreatedList:UserCreatedList;
    systemCreatedListItem:SystemCreatedListItem;
    userCreatedListItemTags = [];
}