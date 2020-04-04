import Entity from './entity';
import UserCreatedListItem from './user-created-list-item';

export default class UserCreatedListItemTag extends Entity<number>{
    name:string;
    UserCreatedListItemId: Number;
    userCreatedListItem:UserCreatedListItem;
}