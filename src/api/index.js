import instance from '../utils/request'
// 请求首页数据
export const getData = () => {
    return instance.get('/home/getData')
}
export const getUser = (params) => {
    // 返回用户列表
    return instance.get('/user/getUser', params)
}
// 新增
export const addUser = (data) => {
    return instance.post('/user/add', data)
}
// 编辑
export const editUser = (data) => {
    return instance.post('/user/edit', data)
}
// 删除
export const delUser = (data) => {
    return instance.post('/user/del', data)
}
// 登录
export const getMenu = (data) => {
    return instance.post('/permission/getMenu', data)
}
