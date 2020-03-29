<template>
    <ButtonGroup>
        <router-link :to="'/mylist/' + l.name" v-for="l in list" :key="l.id">
            <Button>{{l.name}}</Button>
        </router-link>
    </ButtonGroup>
</template>
<script lang="ts">
import { Component, Vue, Inject, Prop, Watch } from "vue-property-decorator";
import Util from "../lib/util";
import AbpBase from "../lib/abpbase";
@Component
export default class UserListTop extends AbpBase {
    @Prop() list: Array<any>;
}
</script>