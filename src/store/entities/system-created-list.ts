import Entity from './entity';
import PageResult from './page-result';
import SystemCreatedListItem from './system-created-list-item';
import ListType from './list-type';

export default class SystemCreatedList extends Entity<number>{
    name:string;
    listType:ListType;
    systemCreatedListItemCollection:PageResult<SystemCreatedListItem>;
}