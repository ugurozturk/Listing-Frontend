import { Store, Module, ActionContext } from 'vuex'
import ListModule from './list-module'
import ListState from './list-state'
import Ajax from '../../lib/ajax'
import PageResult from '@/store/entities/page-result';
import ListMutations from './list-mutations'
import UserCreatedListItemTag from '../entities/user-created-list-item-tag'

interface UserCreatedListItemTagState extends ListState<UserCreatedListItemTag> {
    editUserCreatedListItemTag: UserCreatedListItemTag;
}
class UserCreatedListItemTagMutations extends ListMutations<UserCreatedListItemTag>{

}
class UserCreatedListItemTagModule extends ListModule<UserCreatedListItemTagState, any, UserCreatedListItemTag>{
    state = {
        totalCount: 0,
        currentPage: 1,
        pageSize: 25,
        list: new Array<UserCreatedListItemTag>(),
        loading: false,
        editUserCreatedListItemTag: new UserCreatedListItemTag(),
    }
    actions = {
        async getAll(context: ActionContext<UserCreatedListItemTagState, any>, payload: any) {
            context.state.loading = true;
            let reponse = await Ajax.get('/api/services/app/UserCreatedListItemTag/GetAll', { params: payload.data });
            let page = reponse.data.result as PageResult<UserCreatedListItemTag>;
            context.state.list = page.items;
            context.state.totalCount = page.totalCount;
            context.state.loading = false;
        },
        async create(context: ActionContext<UserCreatedListItemTagState, any>, payload: any) {
            await Ajax.post('/api/services/app/UserCreatedListItemTag/Create', payload.data);
        },
        async update(context: ActionContext<UserCreatedListItemTagState, any>, payload: any) {
            //TODO:UĞUR url düzenle
            await Ajax.put('/api/services/app/UserCreatedListItemTag/Update', payload.data);
        },
        async delete(context: ActionContext<UserCreatedListItemTagState, any>, payload: any) {
            await Ajax.delete('/api/services/app/UserCreatedListItemTag/Delete?Id=' + payload.data.id);
        },
        async get(context: ActionContext<UserCreatedListItemTagState, any>, payload: any) {
            //TODO:UĞUR url düzenle
            let reponse = await Ajax.get('/api/services/app/UserCreatedListItemTag/Get?Id=' + payload.id);
            return reponse.data.result as UserCreatedListItemTag;
        }
    };
    mutations = {
        setCurrentPage(state: UserCreatedListItemTagState, page: number) {
            state.currentPage = page;
        },
        setPageSize(state: UserCreatedListItemTagState, pagesize: number) {
            state.pageSize = pagesize;
        },
        edit(state: UserCreatedListItemTagState, userCreatedListItemTag: UserCreatedListItemTag) {
            state.editUserCreatedListItemTag = userCreatedListItemTag;
        }
    }
}
const userCreatedListItemTagModule = new UserCreatedListItemTagModule();
export default userCreatedListItemTagModule;