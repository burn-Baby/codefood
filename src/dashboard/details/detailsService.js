import axios from 'axios';
import constant from "../../config/constant";

class detailsService {
    static getDetailRecipe(idRecipe) {
        const URL = constant.URL_MASTER_PATH + constant.API_GET_RECIPES + '/' + idRecipe;
        return new Promise((resolve, reject) => {
            axios.get(URL).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        })
    }

    static getDetailRecipeWithPortion(data) {
        const URL = constant.URL_MASTER_PATH + constant.API_GET_RECIPES + '/' + data;
        return new Promise((resolve, reject) => {
            axios.get(URL).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        })
    }

}

export default detailsService;