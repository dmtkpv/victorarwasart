// ------------------
// Modules
// ------------------

import Axios from 'axios'



// ------------------
// Exports
// ------------------

export default function (options) {

    const instance = Axios.create(options);

    const success = response => {
        return response.data.data;
    }

    const error = error => {
        let response;
        if (Axios.isCancel(error)) response = { cancelled: true };
        else response = { error: error.message || 'Unknown error' };
        return Promise.resolve(response);
    }

    instance.interceptors.response.use(success, error);

    return instance;

}