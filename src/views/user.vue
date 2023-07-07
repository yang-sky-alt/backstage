<template>
    <div class="container">
        <el-dialog title="提示" :visible.sync="dialogVisible" width="55%" :before-close="handleClose">
            <!-- 用户表单信息 -->
            <el-form ref="form" :model="from" label-width="80px" :inline="true" :rules="rules">
                <el-form-item label="姓名" prop="name">
                    <el-input placeholder="请输入姓名" v-model="from.name"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input placeholder="请输入年龄" v-model="from.age"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="from.sex" placeholder="请选择性别">
                        <el-option label="男" :value="1"></el-option>
                        <el-option label="女" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出生日期" prop="birth">
                    <el-date-picker v-model="from.birth" type="datetime" value-format="yyyy-MM-DD" placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="地址" prop="addr">
                    <el-input placeholder="请输入地址" v-model="from.addr"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel()">取 消</el-button>
                <el-button type="primary" @click="submit()">确 定</el-button>
            </span>
        </el-dialog>

        <div class="btn">
            <el-button type="primary" @click="handleAdd()"> + 新增</el-button>
            <!-- form搜索区域 -->
            <el-form :model="userForm" :inline="true">
                <el-form-item>
                    <el-input placeholder="请输入关键字" v-model="userForm.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit()">查询</el-button>
                </el-form-item>
            </el-form>

        </div>
        <div class="common-table">
            <el-table :data="tableData" stripe border style="width: 100%" height="100%">
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column prop="sex" label="性别">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.sex == 1 ? '男' : '女' }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="age" label="年龄">
                </el-table-column>
                <el-table-column prop="birth" label="出生日期">
                </el-table-column>
                <el-table-column prop="addr" label="地址">
                </el-table-column>
                <el-table-column prop="addr" label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row)">修改</el-button>
                        <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination layout="prev, pager, next" :total="total" @current-change="handlePage">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { getUser, addUser, editUser, delUser } from '../api'
export default {
    mounted() {
        this.getList()
    },
    data() {
        return {
            dialogVisible: false,
            from: {
                name: '',
                age: '',
                sex: '',
                birth: '',
                addr: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入姓名' }
                ],
                age: [
                    { required: true, message: '请输入年龄' }
                ],
                sex: [
                    { required: true, message: '请选择性别' }
                ],
                birth: [
                    { required: true, message: '请选择出生日期' }
                ],
                addr: [
                    { required: true, message: '请输入地址' }
                ]
            },
            tableData: [],
            modalType: 0, // 0表示新增弹层 1表示编辑
            total: 0, // 当前的总条数默认为零
            pageData: {
                page: 1,
                limit: 10
            },
            userForm: {
                name: ''
            }
        }
    },
    methods: {
        // 提交用户表单
        submit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    // 后续对表单数据的处理
                    if (this.modalType === 0) {
                        addUser(this.from).then(() => {
                            // 重新获取列表的接口
                            this.getList()
                        })
                    } else {
                        editUser(this.form).then(() => {
                            // 重新获取列表的接口
                            this.getList()
                        })
                    }
                    console.log(this.from, 'from');
                    // 清空表单的数据
                    this.$refs.form.resetFields()
                    // 关闭弹窗
                    this.dialogVisible = false
                }
            })
        },
        handleClose() {
            this.$refs.form.resetFields()
            this.dialogVisible = false
        },
        cancel() {
            this.handleClose()
        },
        // 修改数据
        handleEdit(row) {
            this.modalType = 1
            this.dialogVisible = true
            // 注意需要对当前行数据进行深拷贝，否则会出错
            this.from = JSON.parse(JSON.stringify(row))
        },
        // 删除数据
        handleDelete(row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delUser({ id: row.id }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getList()
                })

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 获取列表数据
        getList() {
            getUser({ params: { ...this.userForm, ...this.pageData } }).then(({ data }) => {
                this.tableData = data.list
                console.log(data);
                this.total = data.count ? data.count : 0
            })
        },
        // 打开编辑框
        handleAdd() {
            this.dialogVisible = true
            this.modalType = 0
        },
        // 选择页码的回调函数
        handlePage(val) {
            this.pageData.page = val
            this.getList()
        },
        // 列表搜索条件
        onSubmit() {
            this.getList()
        }
    }
}
</script>

<style lang="less" scoped>
.container {
    height: 100%;

    .common-table {
        position: relative;
        height: calc(100% - 62px);

        .pagination {
            position: absolute;
            bottom: -30px;
            right: 20px;
        }
    }
}

.btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>