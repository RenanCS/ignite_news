import axios from 'axios';

const base = process.env.BASE_URL;

export const api = axios.create({
  baseURL: `https://rcsti-ignite-news.vercel.app/api`
});
