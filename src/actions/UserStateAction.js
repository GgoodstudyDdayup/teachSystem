export const UserStateActionTypes = {
    LOAD_USERSTATE: 'LOAD_USERSTATE'
}

//保存登陆之后的token
export const UserStateActionCreators = {
    SaveUserStateActionCreator(payload) {
        console.log(payload)
        return {
            type: UserStateActionTypes.LOAD_USERSTATE,
            payload
        }
    },
}