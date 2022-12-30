import axios from 'axios';

const postRequest = async (url, body, headers)=>{
    const h =  {
        headers: headers
    }
    const res = await axios.post(url, body, h);
    return res;
}


export {postRequest}