import { postRequest } from "../http";
import {getAdminBaseUrl} from '../../assets/constants/index'

const SET_USER_WORDS_URL = getAdminBaseUrl() + "api/users/words"

const setUserSecretWords = async (token, words) => {
    try {
        const body ={
            words: words,
        }
        const headers = {
            'Authorization': `JWT ${token}`
        }

        const res = await postRequest(SET_USER_WORDS_URL, body, headers)
        console.log("res: ", res)
        return { data: res.data, code: 200, message: "OK" }
    } catch (error) {
        console.log("error: ", error)
        return { data: undefined, code: 400, message: error.message }
    }
}

export {setUserSecretWords}