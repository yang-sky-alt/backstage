import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import user from './mockServeData/user'
import permission from './mockServeData/permission'
// 定义mock请求拦截
// 请求的地址 请求类型 处理函数
Mock.mock('/api/home/getData', 'get', homeApi.getStatisticalData)
// 新增用户列表的数据
Mock.mock('/api/user/add', 'post', user.createUser)
// 编辑用户列表的数据
Mock.mock('/api/user/edit', 'post', user.updateUser)
// 删除用户列表的数据
Mock.mock('/api/user/del', 'post', user.deleteUser)
// 获取用户列表
Mock.mock(/api\/user\/getUser/, 'get', user.getUserList)
// 用户登录
Mock.mock(/api\/permission\/getMenu/, 'post', permission.getMenu)

