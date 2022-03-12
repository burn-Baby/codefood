import axios from 'axios';
import constant from "../../config/constant";

class homeService {
    static getRecipes() {
        const URL = constant.URL_MASTER_PATH + constant.API_GET_RECIPES;
        return new Promise((resolve, reject) => {
            axios.get(URL).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        })
    }

    static getRecipesCategory() {
        const URL = constant.URL_MASTER_PATH + constant.API_GET_CATEGORY;
        return new Promise((resolve, reject) => {
            axios.get(URL).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        })
    }

    static getRecipesByCategory(foodCategory) {
        const URL = constant.URL_MASTER_PATH + constant.API_GET_RECIPES + "?" + foodCategory;
        return new Promise((resolve, reject) => {
            axios.get(URL).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        })
    }
}

export default homeService;