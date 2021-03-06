import Entity from './entity';
import PageResult from './page-result';
import ListType from './list-type';
import User from './user';
import UserCreatedListItem from './user-created-list-item';

export default class UserCreatedList extends Entity<number>{
    name:string;
    user:User;
    listType:ListType;
    userCreatedListItemCollection:PageResult<UserCreatedListItem>;
}

export class CreateUserCreatedList extends UserCreatedList{
    listTypeId:number;
}

export class EditUserCreatedList extends UserCreatedList{
    listTypeId:number;
}