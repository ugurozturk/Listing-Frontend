declare global {
    interface RouterMeta {
        title: string;
        ekdeger?: any;
    }
    interface Router {
        path: string;
        name: string;
        icon?: string;
        permission?: string;
        meta?: RouterMeta;
        component: any;
        children?: Array<Router>;
    }
    interface System {
        import(request: string): Promise<any>
    }
    var System: System
}
import login from '../views/login.vue'
import home from '../views/home/home.vue'
import main from '../views/main.vue'

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('../components/lockscreen/components/locking-page.vue')
};
export const loginRouter: Router = {
    path: '/',
    name: 'login',
    meta: {
        title: 'LogIn'
    },
    component: () => import('../views/login.vue')
};

export const otherRouters: Router = {
    path: '/main',
    name: 'main',
    permission: '',
    meta: { title: 'ManageMenu' },
    component: main,
    children: [
        { path: 'home', meta: { title: 'HomePage' }, name: 'home', component: () => import('../views/home/home.vue') },
        { path: '/myList', meta: { title: 'UserList' }, name: 'mylist',  component: () => import('../views/user-list/my-list.vue') }
    ]
};
export const appRouters: Array<Router> = [{
    path: '/setting',
    name: 'setting',
    permission: '',
    meta: { title: 'ManageMenu' },
    icon: '&#xe68a;',
    component: main,
    children: [
        { path: 'user', permission: 'Pages.Users', meta: { title: 'Users' }, name: 'user', component: () => import('../views/setting/user/user.vue') },
        { path: 'role', permission: 'Pages.Roles', meta: { title: 'Roles' }, name: 'role', component: () => import('../views/setting/role/role.vue') },
        { path: 'tenant', permission: 'Pages.Tenants', meta: { title: 'Tenants' }, name: 'tenant', component: () => import('../views/setting/tenant/tenant.vue') }        
    ]
}, {
    path: '/Listing',
    name: 'listing',
    permission: '',
    meta: { title: 'SystemCreatedLists' },
    icon: '&#xe68a;',
    component: main,
    children: [
        { path: 'genel', meta: { title: 'Genel' }, name: 'system-created-genel-list', component: () => import('../views/system-created-list/genel.vue') },
        { path: 'games', meta: { title: 'Games' }, name: 'system-created-game-list', component: () => import('../views/system-created-list/games.vue') },
        { path: 'animes', meta: { title: 'Animes' }, name: 'system-created-anime-list', component: () => import('../views/system-created-list/animes.vue') }
    ]
}, {
    path: '/userListing',
    name: 'userlisting',
    permission: '',
    meta: { title: 'UserCreatedLists' },
    icon: '&#xe68a;',
    component: main,
    children: [
        { path: 'organizeMyList', meta: { title: 'Organize My List' }, name: 'organize-my-list', component: () => import('../views/user-list/organize-my-list.vue') },
    ]
}
]
export const routers = [
    loginRouter,
    locking,
    ...appRouters,
    otherRouters
];
