import axios from 'axios';

const client = axios.create({baseURL: 'https://api.example.com'});

export const fetchFortune = () => client.get('/fortune');
