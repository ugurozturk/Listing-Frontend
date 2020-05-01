<template>
    <div>
        <Card dis-hover>
            <div class="page-body">
                <Form ref="queryForm" :label-width="80" label-position="left" inline>
                    <Row :gutter="16">
                        <Col span="6">
                            <FormItem :label="L('Keyword')+':'" style="width:100%">
                                <Input v-model="pagerequest.keyword" :placeholder="L('UserName')+'/'+L('Name')"></Input>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem :label="L('IsActive')+':'" style="width:100%">
                                <!--Select should not set :value="'All'" it may not trigger on-change when first select 'NoActive'(or 'Actived') then select 'All'-->
                                <Select :placeholder="L('Select')" @on-change="isActiveChange">
                                    <Option value="All">{{L('All')}}</Option>
                                    <Option value="Actived">{{L('Actived')}}</Option>
                                    <Option value="NoActive">{{L('NoActive')}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Button @click="create" icon="android-add" type="primary" size="large">{{L('Add')}}</Button>
                        <Button icon="ios-search" type="primary" size="large" @click="getpage" class="toolbar-btn">{{L('Find')}}</Button>
                    </Row>
                </Form>
                <div class="margin-top-10">
                    <Table :loading="loading" :columns="columns" :no-data-text="L('NoDatas')" border :data="list">
                    </Table>
                    <Page  show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page>
                </div>
            </div>
        </Card>
        <create-user-list-item v-model="createUserListItemShown" :listid="listid"></create-user-list-item>
    </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Inject,
  Prop,
  Watch
} from 'vue-property-decorator';
import Util from '@/lib/util'
import AbpBase from '@/lib/abpbase'
import PageRequest from '@/store/entities/page-request'
// import CreateUserList from  './create-user-list.vue'
// import EditUserList from  './edit-user-list.vue'
import CreateUserListItem from '../../components/user-list/create-user-list-item.vue'

class PageUserListViewRequest extends PageRequest {
  keyword: string;
  isActive: boolean = null; //nullable
  from: Date;
  to: Date;
  userCreatedListId: number;
}

@Component({
 components:{CreateUserListItem}
})
export default class UserListView extends AbpBase {
  pagerequest: PageUserListViewRequest = new PageUserListViewRequest();
  createUserListItemShown: boolean = false;

  //filters
  //creationTime: Date;
  
  get list() {
    return this.$store.state.userCreatedListItem.list;
  };
  get loading() {
    return this.$store.state.userCreatedListItem.loading;
  }
  @Watch('$route') reloadPage(to:any){ this.getpage(); }
  create() {
    this.createUserListItemShown = true;
  }
  doNothing(){
    console.log('Hiç bir şey yapılmadı.');
  }
  isActiveChange(val: string) {
    console.log(val);
    if (val === 'Actived') {
      this.pagerequest.isActive = true;
    } else if (val === 'NoActive') {
      this.pagerequest.isActive = false;
    } else {
      this.pagerequest.isActive = null;
    }
  }
  pageChange(page: number) {
    this.$store.commit('user/setCurrentPage', page);
    this.getpage();
  }
  pagesizeChange(pagesize: number) {
    this.$store.commit('user/setPageSize', pagesize);
    this.getpage();
  }
  async getpage() {

    this.pagerequest.maxResultCount = this.pageSize;
    this.pagerequest.skipCount = (this.currentPage - 1) * this.pageSize;
    
    this.pagerequest.userCreatedListId = this.listid;

    await this.$store.dispatch({
      type: 'userCreatedListItem/getAll',
      data: this.pagerequest
    })
  }
  get listid(){
    return Number(this.$route.params.id);
  }
  get pageSize() {
    return this.$store.state.userCreatedList.pageSize;
  }
  get totalCount() {
    return this.$store.state.userCreatedList.totalCount;
  }
  get currentPage() {
    return this.$store.state.userCreatedList.currentPage;
  }
  columns = [{
    title: this.L('ID'),
    key: 'id'
  }, {
    title: this.L('Name'),
    key: 'name'
  }, {
    title: this.L('SystemCreatedListItem'),
    key: 'systemCreatedListItem',
    render: (h: any, params: any) => {
      return h('span', params.row.systemCreatedListItem?.name);
    }
  }, {
    title: this.L('UserCreatedListType'),
    key: 'userCreatedListType',
    render: (h: any, params: any) => {
      return h('span', params.row.userCreatedList.listType.name);
    }
  },
  
  // {
  //   title: this.L('IsActive'),
  //   render: (h: any, params: any) => {
  //     return h('span', params.row.isActive ? this.L('Yes') : this.L('No'))
  //   }
  // }, {
  //   title: this.L('CreationTime'),
  //   key: 'creationTime',
  //   render: (h: any, params: any) => {
  //     return h('span', new Date(params.row.creationTime).toLocaleDateString())
  //   }
  // }, {
  //   title: this.L('LastLoginTime'),
  //   render: (h: any, params: any) => {
  //     return h('span', new Date(params.row.lastLoginTime).toLocaleString())
  //   }
  // }, 
  {
    title: this.L('Actions'),
    key: 'Actions',
    width: 150,
    render: (h: any, params: any) => {
      return h('div', [
        h('Button', {
          props: {
            type: 'primary',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              this.$store.commit('userCreatedList/edit', params.row);
              // this.edit();
            }
          }
        }, this.L('Edit')),
        h('Button', {
          props: {
            type: 'error',
            size: 'small'
          },
          on: {
            click: async () => {
              this.$Modal.confirm({
                title: this.L('Tips'),
                content: this.L('DeleteListConfirm'),
                okText: this.L('Yes'),
                cancelText: this.L('No'),
                onOk: async () => {
                  await this.$store.dispatch({
                    type: 'userCreatedListItem/delete',
                    data: params.row
                  })
                  await this.getpage();
                }
              })
            }
          }
        }, this.L('Delete'))
      ])
    }
  }]
  async created() {
    this.getpage();
  }
}
</script>
