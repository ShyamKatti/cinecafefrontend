import axios from 'axios';

export function getData(url, params) {
    return axios.get(url, {params: params});
};

export function postData(url, data) {
    return axios.post(url, data);
}