<template>
<div>
  <Card dis-hover>
    <div class="page-body">
      <div class="margin-top-10">
       Toplam veri :  {{  totalCount }}
      </div>
      <div class="margin-top-10">
          <Table :loading="loading" :columns="columns" :no-data-text="L('NoDatas')" border :data="list">
          </Table>
          <Page show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page>
      </div>
    </div>
  </Card>
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
class PageSystemCreatedGenelListRequest extends PageRequest {
  keyword: string;
  isActive: boolean = null; //nullable
  from: Date;
  to: Date;
}

@Component({

})
export default class SystemCreatedGenelLists extends AbpBase {
  edit() {
    this.editModalShow = true;
  }
  //filters
  pagerequest: PageSystemCreatedGenelListRequest = new PageSystemCreatedGenelListRequest();
  creationTime: Date[] = [];

  createModalShow: boolean = false;
  editModalShow: boolean = false;
  get list() {
    let test = this.$store.state.systemCreatedList.list;
    console.log(test);
    return test;
    // let totalList = [];
    // this.$store.state.systemCreatedList.list.map(m=>  {
    //  totalList =  totalList.concat(m);
    // });
    // console.log(totalList);
    // return totalList;
  };
  get loading() {
    return this.$store.state.systemCreatedList.loading;
  }
  create() {
    this.createModalShow = true;
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

    await this.$store.dispatch({
      type: 'systemCreatedList/getAll',
      data: this.pagerequest
    })
  }
  get pageSize() {
    return this.$store.state.systemCreatedList.pageSize;
  }
  get totalCount() {
    return this.$store.state.systemCreatedList.totalCount;
  }
  get currentPage() {
    return this.$store.state.systemCreatedList.currentPage;
  }
  columns = [{
    title: this.L('ID'),
    key: 'id'
  }, {
    title: this.L('Type'),
    key: 'listTypeName',
    render: (h: any, params: any) => {
      return h('span', params.row.listType.name);
    }
  }, {
    title: this.L('Name'),
    key: 'name'
  },
  {
    title: this.L('ItemCount'),
    key: 'systemCreatedListItemCollectionTotalCount',
    render: (h: any, params: any) => {
      return h('span', params.row.systemCreatedListItemCollection.totalCount);
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
              this.$store.commit('user/edit', params.row);
              this.edit();
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
                content: this.L('DeleteUserConfirm'),
                okText: this.L('Yes'),
                cancelText: this.L('No'),
                onOk: async () => {
                  await this.$store.dispatch({
                    type: 'user/delete',
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
