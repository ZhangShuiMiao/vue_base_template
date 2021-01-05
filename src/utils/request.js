
import axios from './axios';
import qs from 'qs';


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
const get = (url, params = {}) => {
    return axios
        .get(url, {
            params: params
        })
        .then(response => {
            return Promise.resolve(response)
        })
        .catch(err => {
            return Promise.reject(err)
        });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 * body  表单
 */
const post = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(
            response => {
                resolve(response);
            },
            err => {
                reject(err);
            }
        );
    });
}
/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 * * application/json
 * body  表单
 */
// const postJson = (url, data = {}) => {
//     return new Promise((resolve, reject) => {
//         axios.post(url, data,{
//             'ContentType': 'application/json'
//         }).then(
//             response => {
//                 resolve(response);
//             },
//             err => {
//                 reject(err);
//             }
//         );
//     });
// }
/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 * x-www
 */
const postFormData = (url, params = {}) => {
    return new Promise((resolve, reject) => {
        axios.post(url,qs.stringify(params,{ arrayFormat: 'repeat' })).then(
            response => {
                resolve(response);
            },
            err => {
                reject(err);
            }
        );
    });
}

/**
 * fetch
 * @param url
 * @param data
 * @returns {Promise}
 */
const fetch = (url, params = {}) => {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params: params
            })
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err);
            });
    });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
const patch = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        axios.patch(url, data).then(
            response => {
                resolve(response);
            },
            err => {
                reject(err);
            }
        );
    });
}

/**
 * 示例接口
 * 名称：exam
 * 参数：paramObj/null
 * 方式：fetch/post/patch/put
 */

/**
 * 下面是获取数据的接口
 */
// export const server = {
//     exam: function (paramObj) {
//         return post('/api.php?ac=v2_djList', paramObj);
//     }
// };

export default {
    get,
    post,
    postFormData,
    fetch,
    patch,
    // postJson
}