<template>
    <div>
        <el-container>
            <el-aside width="auto">
                <common-active></common-active>
            </el-aside>
            <el-container>
                <el-header>
                    <common-header />
                </el-header>
                <common-tag />
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>


    </div>
</template>

<script>
import CommonActive from '../components/CommonActive.vue'
import CommonHeader from '../components/CommonHeader.vue'
import CommonTag from '../components/CommonTag.vue'
export default {
    components: {
        CommonActive,
        CommonHeader,
        CommonTag
    }
}
</script>

<style scoped>
.el-header {
    padding: 0;
}
</style>