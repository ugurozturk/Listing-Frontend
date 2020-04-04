

<template>
    <div>
        <Modal
            :title="L('CreateNewList')"
            :value="value"
            @on-ok="save"
            @on-visible-change="visibleChange"
        >
            <Form
                ref="userCreatedListItemForm"
                label-position="top"
                :model="userCreatedListItem"
            >
                <Tabs value="detail">
                    <TabPane :label="L('UserCreatedListDetail')" name="detail">
                        <FormItem :label="L('Name')" prop="name">
                            <Input v-model="userCreatedListItem.name" :maxlength="32"></Input>
                        </FormItem>
                        <FormItem :label="L('Score')" prop="score">
                            <Input v-model="userCreatedListItem.score" :maxlength="32"></Input>
                        </FormItem>
                        <FormItem :label="L('Tags')" prop="userCreatedListItemTags">
                            <Select v-model="userCreatedListItem.userCreatedListItemTags" placeholder="Tag arayın yada ekleyin" allow-create @on-create="userItemTagEkle" filterable multiple transfer>
                                <Option v-for="item in currentListTags" :value="item.id" :key="item.id">{{ item.name }}</Option>
                            </Select>
                            <!-- <multiselect v-model="userCreatedListItem.userCreatedListItemTags" tag-placeholder="tag gibi ekle" placeholder="Ara yada yeni tag ekle" label="name" track-by="code" :options="userCreatedListItem.userCreatedListItemTags" :multiple="true" :taggable="true" @tag="addTag"></multiselect> -->
                        </FormItem>
                    </TabPane>
                </Tabs>
            </Form>
            <div slot="footer">
                <Button @click="cancel">{{L('Cancel')}}</Button>
                <Button @click="save" type="primary">{{L('OK')}}</Button>
            </div>
        </Modal>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Inject, Prop, Watch } from "vue-property-decorator";
import Util from "../../lib/util";
import * as _ from "lodash";
import AbpBase from "../../lib/abpbase";
import PageRequest from '@/store/entities/page-request';
import UserCreatedListItem from "../../store/entities/user-created-list-item";

class PageUserCreatedListItemTagRequest extends PageRequest {
  keyword: string;
  isActive: boolean = null; //nullable
  from: Date;
  to: Date;
  Name: string;
  UserCreatedListId: Number;
  UserCreatedListItemId: Number;
}

class CreateUserCreatedListItemTag {
  Name: String;
  UserCreatedListItemId: Number
}

@Component
export default class CreateUserListItem extends AbpBase {
    @Prop({ type: Boolean, default: false }) value: boolean;
    @Prop({type: Number, default: 0}) listid: Number;
    userCreatedListItem: UserCreatedListItem = new UserCreatedListItem();
    pagerequest: PageUserCreatedListItemTagRequest = new PageUserCreatedListItemTagRequest();
    yeniEklenecekTaglar = [];

    get listTypes(){
        return this.$store.state.listType.list;
    }
    get currentListTags() {
        let res = _.concat(this.yeniEklenecekTaglar, this.$store.state.userCreatedListItemTag.list);
        return res;
    }

    userItemTagEkle (newTag) {
        const tag = {
            name: newTag,
            id: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
        }

        this.yeniEklenecekTaglar.push(tag);
    }

    save() {
        (this.$refs.userCreatedListItemForm as any).validate(
            async (valid: boolean) => {
                if (valid) {
                    await this.$store.dispatch({
                        type: "userCreatedListItem/create",
                        data: this.userCreatedListItem
                    });
                    (this.$refs.userCreatedListItemForm as any).resetFields();
                    this.$emit("save-success");
                    this.$emit("input", false);
                }
            }
        );
    }
    cancel() {
        (this.$refs.userCreatedListItemForm as any).resetFields();
        this.$emit("input", false);
    }
    visibleChange(value: boolean) {
        if (!value) {
            this.$emit("input", value);
        }
    }

    LoadTagList(){
        this.$store.dispatch({
            type: 'userCreatedListItemTag/getAll',
            data: this.pagerequest
        })
    }

    async getpage(){
        this.pagerequest.maxResultCount = 3;
        this.LoadTagList();
    }

    @Watch('listid') reloadTags(newValue, oldValue)
    { 
        this.pagerequest.UserCreatedListId = this.listid;
        this.LoadTagList();
    }
    async created() {
        this.getpage();
    }
    // validatePassCheck = (rule:any, value:any, callback:any) => {
    //     if (!value) {
    //         callback(new Error(this.L('ConfirmPasswordMsg')));
    //     } else if (value !== this.user.password) {
    //         callback(new Error(this.L('ConfirmPasswordNotMatch')));
    //     } else {
    //         callback();
    //     }
    // };
    // userRule={
    //     userName:[{required: true,message:this.L('FieldIsRequired',undefined,this.L('UserName')),trigger: 'blur'}],
    //     name:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('Name')),trigger: 'blur'}],
    //     surname:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('Surname')),trigger: 'blur'}],
    //     emailAddress:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('Email')),trigger: 'blur'},{type: 'email'}],
    //     password:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('Password')),trigger: 'blur'}],
    //     confirmPassword:{validator:this.validatePassCheck,trigger: 'blur'}
    // }
}
</script>