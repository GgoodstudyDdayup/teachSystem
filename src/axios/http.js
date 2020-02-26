import { instance, loginPost } from './axios'
//login为了获取token
export const login = (params) => {
    console.log(params)
    return loginPost.post('/api/user/login',params)
}

//instance实例作为系统内部cookie验证每个接口
export const tree = (params) => {
    return instance.post('/api/system/get_tree',params)
}
//科目接口
export const subjectList = () =>{
    return instance.get('/api/system/get_subject_list')
}
//题库查询筛选接口
export const tkList = (params) =>{
    return instance.post('/api/question/get_search_condition',params)
}