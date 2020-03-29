<template>
    <ButtonGroup>
        <Button v-for="l in list" :key="l.id" @click="linkTo(l)">{{l.name}}</Button>
    </ButtonGroup>
</template>
<script lang="ts">
import { Component, Vue, Inject, Prop, Watch } from "vue-property-decorator";
import Util from "../lib/util";
import AbpBase from "../lib/abpbase";
@Component
export default class UserListTop extends AbpBase {
    @Prop() list: Array<any>;

    linkTo (item:any) {
        console.log(item);
        let routerObj:any = {};
        routerObj.name = 'mylist';
        if (item.argu) {
            routerObj.params = { listName : item.name };
        }
        if (item.query) {
            routerObj.query = item.query;
        }

        this.$router.push(routerObj);
    }
}
</script>