import { Store, Module, ActionContext } from 'vuex'
import ListModule from './list-module'
import ListState from './list-state'
import Ajax from '../../lib/ajax'
import PageResult from '@/store/entities/page-result';
import ListMutations from './list-mutations'
import ListType from '../entities/list-type'

interface ListTypeState extends ListState<ListType> {
    editListType: ListType;
}
class ListTypeMutations extends ListMutations<ListType>{

}
class ListTypeModule extends ListModule<ListTypeState, any, ListType>{
    state = {
        totalCount: 0,
        currentPage: 1,
        pageSize: 25,
        list: new Array<ListType>(),
        loading: false,
        editListType: new ListType(),
    }
    actions = {
        async getAll(context: ActionContext<ListTypeState, any>, payload: any) {
            context.state.loading = true;
            let reponse = await Ajax.get('/api/services/app/ListType/GetAll', { params: payload.data });
            let page = reponse.data.result as PageResult<ListType>;
            context.state.list = page.items;
            context.state.totalCount = page.totalCount;
            context.state.loading = false;
        },
        // async create(context: ActionContext<ListTypeState, any>, payload: any) {
        //     //TODO:UĞUR url düzenle
        //     await Ajax.post('/api/services/app/ListType/Create', payload.data);
        // },
        // async update(context: ActionContext<ListTypeState, any>, payload: any) {
        //     //TODO:UĞUR url düzenle
        //     await Ajax.put('/api/services/app/ListType/Update', payload.data);
        // },
        // async delete(context: ActionContext<ListTypeState, any>, payload: any) {
        //     //TODO:UĞUR url düzenle
        //     await Ajax.delete('/api/services/app/ListType/Delete?Id=' + payload.data.id);
        // },
        async get(context: ActionContext<ListTypeState, any>, payload: any) {
            //TODO:UĞUR url düzenle
            let reponse = await Ajax.get('/api/services/app/ListType/Get?Id=' + payload.id);
            return reponse.data.result as ListType;
        }
    };
    mutations = {
        setCurrentPage(state: ListTypeState, page: number) {
            state.currentPage = page;
        },
        setPageSize(state: ListTypeState, pagesize: number) {
            state.pageSize = pagesize;
        },
        edit(state: ListTypeState, listType: ListType) {
            state.editListType = listType;
        }
    }
}
const listTypeModule = new ListTypeModule();
export default listTypeModule;