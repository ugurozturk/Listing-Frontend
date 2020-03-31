import { Store, Module, ActionContext } from 'vuex'
import ListModule from './list-module'
import ListState from './list-state'
import Ajax from '../../lib/ajax'
import PageResult from '@/store/entities/page-result';
import ListMutations from './list-mutations'
import UserCreatedListItem from '../entities/user-created-list-item'

interface UserCreatedListItemState extends ListState<UserCreatedListItem> {
    editUserCreatedListItem: UserCreatedListItem;
}
class UserCreatedListItemMutations extends ListMutations<UserCreatedListItem>{

}
class UserCreatedListItemModule extends ListModule<UserCreatedListItemState, any, UserCreatedListItem>{
    state = {
        totalCount: 0,
        currentPage: 1,
        pageSize: 25,
        list: new Array<UserCreatedListItem>(),
        loading: false,
        editUserCreatedListItem: new UserCreatedListItem(),
    }
    actions = {
        async getAll(context: ActionContext<UserCreatedListItemState, any>, payload: any) {
            context.state.loading = true;
            let reponse = await Ajax.get('/api/services/app/UserCreatedListItem/GetAll', { params: payload.data });
            let page = reponse.data.result as PageResult<UserCreatedListItem>;
            context.state.list = page.items;
            context.state.totalCount = page.totalCount;
            context.state.loading = false;
        },
        async create(context: ActionContext<UserCreatedListItemState, any>, payload: any) {
            await Ajax.post('/api/services/app/UserCreatedListItem/Create', payload.data);
        },
        async update(context: ActionContext<UserCreatedListItemState, any>, payload: any) {
            //TODO:UĞUR url düzenle
            await Ajax.put('/api/services/app/UserCreatedListItem/Update', payload.data);
        },
        async delete(context: ActionContext<UserCreatedListItemState, any>, payload: any) {
            await Ajax.delete('/api/services/app/UserCreatedListItem/Delete?Id=' + payload.data.id);
        },
        async get(context: ActionContext<UserCreatedListItemState, any>, payload: any) {
            //TODO:UĞUR url düzenle
            let reponse = await Ajax.get('/api/services/app/UserCreatedListItem/Get?Id=' + payload.id);
            return reponse.data.result as UserCreatedListItem;
        }
    };
    mutations = {
        setCurrentPage(state: UserCreatedListItemState, page: number) {
            state.currentPage = page;
        },
        setPageSize(state: UserCreatedListItemState, pagesize: number) {
            state.pageSize = pagesize;
        },
        edit(state: UserCreatedListItemState, userCreatedListItem: UserCreatedListItem) {
            state.editUserCreatedListItem = userCreatedListItem;
        }
    }
}
const userCreatedListItemModule = new UserCreatedListItemModule();
export default userCreatedListItemModule;