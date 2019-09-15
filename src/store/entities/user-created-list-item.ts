import Entity from './entity';
import SystemCreatedListItem from './system-created-list-item';
import UserCreatedList from './user-created-list';
import UserCreatedListItemTag from './user-created-list-item-tag';
import PageResult from './page-result';

export default class UserCreatedListItem extends Entity<number>{
    name:string;
    score:number;
    userCreatedList:UserCreatedList;
    systemCreatedListItem:SystemCreatedListItem;
    userCreatedListItemTagCollection:PageResult<UserCreatedListItemTag>;
}