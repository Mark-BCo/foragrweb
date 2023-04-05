import axios from 'axios'

export default axios.create({
    baseURL: 'http://localhost:3500' // base directory needs to change at deployment
})

const userRequest = axios.create({ baseURL: 'http://localhost:3500'}) // base directory needs to change at deployment

export const getUser = (userId) => userRequest.get(`/user/${userId}`);

