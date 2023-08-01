import PocketBase from 'pocketbase';

export const API_URL = import.meta.env.VITE_API_URL;
const pb = new PocketBase(API_URL);

export default pb;
