import axios from 'axios'

export default axios.create({
    baseURL: 'https://foragr-api.onrender.com' // base directory needs to change at deployment
})

const userRequest = axios.create({ baseURL: 'https://foragr-api.onrender.com'}) // base directory needs to change at deployment

export const getUser = (userId) => userRequest.get(`/user/${userId}`);

