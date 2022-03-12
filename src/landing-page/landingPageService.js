import axios from 'axios';
import constant from "../config/constant";

class landingPageService {
    static login(data) {
        const URL = constant.URL_MASTER_PATH + constant.API_AUTH;
        return new Promise((resolve, reject) => {
            axios.post(URL, data).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        })
    }
}

export default landingPageService;