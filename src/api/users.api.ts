import axios from 'axios';

export default {
   

    // login a user
    login: (data: any) => {
        return axios.post('http://localhost:3000/login', data)
    },
}