import "@mock/app";

import axios from 'axios';

import QS from "qs";

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/api' : 'url';

axios.defaults.timeout = 10000;

// 请求拦截器
axios.interceptors.request.use((config) => {
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(response => {
    return response
}, err => {
    return Promise.reject(err)
});

interface IFRequestParam {
    url: string;
    params?: any;
}

// get请求
export const _get = ({url, params}: IFRequestParam) => {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        })
            .then(function (response: any) {
                const status: number = response.status;
                if (status === 200) {
                    const dataSource = response.data;
                    resolve(dataSource);
                }
            })
            .catch(function (error: any) {
                reject(error);
            });
    });
};

// post请求
export const _post = ({url, params}: IFRequestParam) => {
    return new Promise((resolve, reject) => {
        axios.post(
            url,
            QS.stringify(params)
        )
            .then(function (response: any) {
                const status: number = response.status;
                if (status === 200) {
                    const dataSource = response.data;
                    resolve(dataSource);
                }
            })
            .catch(function (error: any) {
                reject(error);
            });
    });
};

