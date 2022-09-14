import config from '../config/config.js'
import axios from 'axios'

export const valitLogin = ({blogUserAccount,blogUserPassword}) => {
    return axios({
        method:'GET',
        url:config.loginServerContext+'valitLogin',
        params:{
            blogUserAccount,
            blogUserPassword
        }
    })
}
