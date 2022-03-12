import axios from 'axios';
import constant from "../../config/constant";

class stepsService {
    static getRecipeSteps(data) {
        const URL = constant.URL_MASTER_PATH + constant.API_GET_RECIPES + data;
        return new Promise((resolve, reject) => {
            axios.get(URL).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        })
    }
}

export default stepsService;