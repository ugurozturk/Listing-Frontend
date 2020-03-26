import { Store, Module, ActionContext } from 'vuex'
import ListModule from './list-module'
import ListState from './list-state'
import Ajax from '../../lib/ajax'
import PageResult from '@/store/entities/page-result';
import ListMutations from './list-mutations'
import UserCreatedList from '../entities/user-created-list'

interface UserCreatedListState extends ListState<UserCreatedList> {
    editUserCreatedList: UserCreatedList;
}
class UserCreatedListMutations extends ListMutations<UserCreatedList>{

}
class UserCreatedListModule extends ListModule<UserCreatedListState, any, UserCreatedList>{
    state = {
        totalCount: 0,
        currentPage: 1,
        pageSize: 25,
        list: new Array<UserCreatedList>(),
        loading: false,
        editUserCreatedList: new UserCreatedList(),
    }
    actions = {
        async getAll(context: ActionContext<UserCreatedListState, any>, payload: any) {
            context.state.loading = true;
            let reponse = await Ajax.get('/api/services/app/UserCreatedList/GetAll', { params: payload.data });
            let page = reponse.data.result as PageResult<UserCreatedList>;
            context.state.list = page.items;
            context.state.totalCount = page.totalCount;
            context.state.loading = false;
        },
        async create(context: ActionContext<UserCreatedListState, any>, payload: any) {
            await Ajax.post('/api/services/app/UserCreatedList/Create', payload.data);
        },
        async update(context: ActionContext<UserCreatedListState, any>, payload: any) {
            //TODO:UĞUR url düzenle
            await Ajax.put('/api/services/app/UserCreatedList/Update', payload.data);
        },
        async delete(context: ActionContext<UserCreatedListState, any>, payload: any) {
            await Ajax.delete('/api/services/app/UserCreatedList/Delete?Id=' + payload.data.id);
        },
        async get(context: ActionContext<UserCreatedListState, any>, payload: any) {
            //TODO:UĞUR url düzenle
            let reponse = await Ajax.get('/api/services/app/UserCreatedList/Get?Id=' + payload.id);
            return reponse.data.result as UserCreatedList;
        }
    };
    mutations = {
        setCurrentPage(state: UserCreatedListState, page: number) {
            state.currentPage = page;
        },
        setPageSize(state: UserCreatedListState, pagesize: number) {
            state.pageSize = pagesize;
        },
        edit(state: UserCreatedListState, userCreatedList: UserCreatedList) {
            state.editUserCreatedList = userCreatedList;
        }
    }
}
const userCreatedListModule = new UserCreatedListModule();
export default userCreatedListModule;