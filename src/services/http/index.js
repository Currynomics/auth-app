import axios from 'axios';

const postRequest = async (url, body)=>{
    const res = await axios.post(url, body);
    return res;
}


export {postRequest}