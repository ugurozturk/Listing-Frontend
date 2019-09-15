import Entity from './entity';
import SystemCreatedList from './system-created-list';

export default class SystemCreatedListItem extends Entity<number>{
    name:string;
    link:string;
    releaseDate:Date;
    isPc:boolean;
    isXBox:boolean;
    isPs:boolean;
    isVideo:boolean;
    SystemCreatedList:SystemCreatedList;
}