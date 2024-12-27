
import axios from "axios";


export const baseURL = ""


export const Api = axios.create({

    baseURL: baseURL,
    headers: {
    'Content-Type': 'application/json',

    }
});
 