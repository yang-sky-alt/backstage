<template>
    <div class="header-container">
        <div class="l-content">
            <el-button style="margin-right: 10px;" @click="handleMeun()" icon="el-icon-menu" size="small"></el-button>
            <!-- 面包屑 -->
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item v-for="item in tags" :key="item.icon" :to="{ path: item.path }">{{ item.label
                }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown @command="handleClick">
                <span class="el-dropdown-link">
                    <img class="user" src="../assets/images/user.png" alt="">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item command="cancel">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Cookie from 'js-cookie'
export default {
    data() {
        return {

        }
    },
    methods: {
        handleMeun() {
            this.$store.commit('collapseMenu')
        },
        // 退出登录
        handleClick(command) {
            if (command === 'cancel') {
                // 清除token
                Cookie.remove('token')
                this.$router.push('/login')
            }
            console.log('test');

        }
    },
    computed: {
        ...mapState({
            tags: state => state.Tab.tabsList
        })
    },
}
</script>

<style lang="less" scoped>
.header-container {
    padding: 0 20px;
    background-color: #333;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
        font-size: 14px;
        color: #fff;
        margin-left: 10px;
    }

    .user {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}

.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}

.el-icon-arrow-down {
    font-size: 12px;
}

.l-content {
    display: flex;
    align-items: center;

    /deep/.el-breadcrumb__item {
        .el-breadcrumb__inner {
            font-weight: normal;

            &.is-link {
                color: #666;
            }

        }

        &:last-child {
            .el-breadcrumb__inner {
                color: #fff
            }
        }
    }

}
</style>