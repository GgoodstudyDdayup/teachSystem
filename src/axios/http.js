import instance from './axios'
export const login = (params) => {
    return instance.post('/api/user/login', params)
}
export const tree = (params) => {
    return instance.post('/teachingApi/unitTree/tree', params)
}