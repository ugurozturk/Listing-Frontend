<template>
    <div>
        <Modal
            :title="L('CreateNewList')"
            :value="value"
            @on-ok="save"
            @on-visible-change="visibleChange"
        >
            <Form
                ref="userCreatedListForm"
                label-position="top"
                :model="userCreatedList"
            >
                <Tabs value="detail">
                    <TabPane :label="L('UserCreatedListDetail')" name="detail">
                        <FormItem :label="L('Name')" prop="name">
                            <Input v-model="userCreatedList.name" :maxlength="32"></Input>
                        </FormItem>
                    </TabPane>
                    <TabPane :label="L('ListTypes')" name="listtypes">
                        <RadioGroup v-model="userCreatedList.listTypeId">
                            <Radio :label="listType.id" v-for="listType in listTypes" :key="listType.id"><span>{{listType.name}}</span></Radio>
                        </RadioGroup >
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
import {CreateUserCreatedList} from "../../store/entities/user-created-list";
@Component
export default class CreateUserList extends AbpBase {
    @Prop({ type: Boolean, default: false }) value: boolean;
    userCreatedList: CreateUserCreatedList = new CreateUserCreatedList();
    get listTypes(){
        return this.$store.state.listType.list;
    }
    save() {
        (this.$refs.userCreatedListForm as any).validate(
            async (valid: boolean) => {
                if (valid) {
                    await this.$store.dispatch({
                        type: "userCreatedList/create",
                        data: this.userCreatedList
                    });
                    (this.$refs.userCreatedListForm as any).resetFields();
                    this.$emit("save-success");
                    this.$emit("input", false);
                }
            }
        );
    }
    cancel() {
        (this.$refs.userCreatedListForm as any).resetFields();
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

