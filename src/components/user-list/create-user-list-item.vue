

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
                        <FormItem :label="L('Score')" prop="name">
                            <Input v-model="userCreatedListItem.score" :maxlength="32"></Input>
                        </FormItem>
                        <FormItem :label="L('Tags')" prop="name">
                            <Select v-model="userCreatedListItem.userCreatedListItemTags" placeholder="Tag arayın yada ekleyin" allow-create @on-create="userItemTagEkle" filterable multiple>
                                <Option v-for="item in testMultiSelectTags" :value="item.code" :key="item.code">{{ item.name }}</Option>
                            </Select>
                            <!-- <multiselect v-model="userCreatedListItem.userCreatedListItemTags" tag-placeholder="tag gibi ekle" placeholder="Ara yada yeni tag ekle" label="name" track-by="code" :options="userCreatedListItem.userCreatedListItemTags" :multiple="true" :taggable="true" @tag="addTag"></multiselect> -->
                        </FormItem>
                        <FormItem :label="L('Score')" prop="name">
                            <Input :maxlength="32"></Input>
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
import AbpBase from "../../lib/abpbase";
import UserCreatedListItem from "../../store/entities/user-created-list-item";
import Multiselect from 'vue-multiselect';
@Component({
components:{Multiselect}
})
export default class CreateUserListItem extends AbpBase {
    @Prop({ type: Boolean, default: false }) value: boolean;
    userCreatedListItem: UserCreatedListItem = new UserCreatedListItem();
    testMultiSelectTags = [
        { name: 'Vue.js', code: 'vu' },
        { name: 'Javascript', code: 'js' },
        { name: 'Open Source', code: 'os' }
        ];
    get listTypes(){
        return this.$store.state.listType.list;
    }

    userItemTagEkle (newTag) {
        console.log(newTag);
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.userCreatedListItem.userCreatedListItemTags.push(tag)
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