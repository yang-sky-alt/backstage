<template>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
        :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <h3>{{ isCollapse ? '后台' : '通用后台管理系统' }}</h3>
        <el-menu-item @click="clickMeun(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{ item.label }}</span>
        </el-menu-item>
        <el-submenu index="2" v-for="item in hasChildren" :key="item.label">
            <template slot="title">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{ item.label }}</span>
            </template>
            <el-menu-item-group @click="clickMeun(subItem)" v-for="subItem in item.children" :key="subItem.name">
                <el-menu-item index="1-1">{{ subItem.label }}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>

<script>
import Cookie from 'js-cookie'
export default {
    data() {
        return {
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        // 点击事件
        clickMeun(item) {
            // 当页面的路由与跳转的路由不一致的时候才允许跳转
            if (this.$route.path !== item.path && !(this.$route.path === '/home' && (item.path === '/'))) {
                this.$router.push(item.path)
            }
            this.$store.commit('selectMeun', item)
        }
    },
    computed: {
        // 没有子菜单
        noChildren() {
            return this.menuData.filter(item => !item.children)
        },
        // 有子菜单
        hasChildren() {
            return this.menuData.filter(item => item.children)
        },
        isCollapse() {
            return this.$store.state.Tab.isCollapse
        },
        // 菜单数据
        menuData() {
            // 判断当前数据 如果缓存中没有 当前store中去获取
            return JSON.parse(Cookie.get('menu')) || this.$store.state.Tab.menu
        }
    }
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.el-menu {
    height: 100vh;
    border-right: none;

    h3 {
        color: #fff;
        line-height: 48px;
        font-size: 16px;
        font-weight: 400;
        text-align: center;
    }
}
</style>