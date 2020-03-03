import { instance, loginPost } from './axios'
//login为了获取token
export const login = (params) => {
    return loginPost.post('/api/user/login', params)
}
//instance实例作为系统内部cookie验证每个接口
export const tree = (params) => {
    return instance.post('/api/system/get_tree', params)
}
//科目接口
export const subjectList = () => {
    return instance.get('/api/system/get_subject_list')
}
//题库查询筛选接口
export const tkList = (params) => {
    return instance.post('/api/question/get_search_condition', params)
}
//获取题库列表选接口
export const question = (params) => {
    return instance.post('/api/question/get_question', params)
}
//获取排课信息
export const paike = (params) => {
    return instance.post('/api/self_lecture/get_course', params)
}
//上传课件
export const zidingyikejian = (params) => {
    return instance.post('/api/self_lecture/upload_lecture', params)
}
//获取进度
export const jindu = (params) => {
    return instance.post('/api/self_lecture/get_list', params)
}
//获取进度
export const jiangyishenghe = (params) => {
    return instance.post('/api/self_lecture/check_self_lecture', params)
}
//上传课程地址
export const kechendizhi = (params) => {
    return instance.post('/api/self_lecture/upload_course_url', params)
}
//获取后台权限组列表
export const quanxianList = (params) => {
    return instance.get('/api/user/get_permission_group', params)
}
//获取后台登录用户列表
export const loginUserList = (params) => {
    return instance.post('/api/user/get_user_list', params)
}