import Entity from './entity'
import PageResult from './page-result';
import SystemCreatedListItem from './system-created-list-item';
export default class SystemCreatedList extends Entity<number>{
    name:string;
    listType:string;
    systemCreatedListItemCollection:PageResult<SystemCreatedListItem>;
}