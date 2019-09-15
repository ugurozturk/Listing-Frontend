import { Store, Module, ActionContext } from 'vuex'
import ListModule from './list-module'
import ListState from './list-state'
import Ajax from '../../lib/ajax'
import PageResult from '@/store/entities/page-result';
import ListMutations from './list-mutations'
import SystemCreatedList from '../entities/system-created-list'
import SystemCreatedListItem from '../entities/system-created-list-item'

interface SystemCreatedListState extends ListState<SystemCreatedList> {
    editSystemCreatedList: SystemCreatedList,
    systemCreatedListItems: SystemCreatedListItem[]
}
class SystemCreatedListMutations extends ListMutations<SystemCreatedList>{

}
class SystemCreatedListModule extends ListModule<SystemCreatedListState, any, SystemCreatedList>{
    state = {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
        list: new Array<SystemCreatedList>(),
        loading: false,
        editSystemCreatedList: new SystemCreatedList(),
        systemCreatedListItems: new Array<SystemCreatedListItem>()
    }
    actions = {
        async getAll(context: ActionContext<SystemCreatedListState, any>, payload: any) {
            context.state.loading = true;
            let reponse = await Ajax.get('/api/services/app/SystemCreatedList/GetAllWithItems', { params: payload.data });
            console.log(`GetAllWithItems : ${JSON.stringify(reponse)}`);
            context.state.loading = false;
            let page = reponse.data.result as PageResult<SystemCreatedList>;
            context.state.totalCount = page.totalCount;
            context.state.list = page.items;
        },
        async create(context: ActionContext<SystemCreatedListState, any>, payload: any) {
            //TODO:UĞUR url düzenle
            await Ajax.post('/api/services/app/SystemCreatedList/Create', payload.data);
        },
        async update(context: ActionContext<SystemCreatedListState, any>, payload: any) {
            //TODO:UĞUR url düzenle
            await Ajax.put('/api/services/app/SystemCreatedList/Update', payload.data);
        },
        async delete(context: ActionContext<SystemCreatedListState, any>, payload: any) {
            //TODO:UĞUR url düzenle
            await Ajax.delete('/api/services/app/SystemCreatedList/Delete?Id=' + payload.data.id);
        },
        async get(context: ActionContext<SystemCreatedListState, any>, payload: any) {
            //TODO:UĞUR url düzenle
            let reponse = await Ajax.get('/api/services/app/SystemCreatedList/Get?Id=' + payload.id);
            return reponse.data.result as SystemCreatedList;
        },
        async getSystemCreatedListItems(context: ActionContext<SystemCreatedListState, any>) {
            //TODO:UĞUR url düzenle
            let reponse = await Ajax.get('/api/services/app/SystemCreatedList/GetRoles');
            context.state.systemCreatedListItems = reponse.data.result.items as SystemCreatedListItem[];
        }
    };
    mutations = {
        setCurrentPage(state: SystemCreatedListState, page: number) {
            state.currentPage = page;
        },
        setPageSize(state: SystemCreatedListState, pagesize: number) {
            state.pageSize = pagesize;
        },
        edit(state: SystemCreatedListState, systemCreatedList: SystemCreatedList) {
            state.editSystemCreatedList = systemCreatedList;
        }
    }
}
const systemCreatedListModule = new SystemCreatedListModule();
export default systemCreatedListModule;