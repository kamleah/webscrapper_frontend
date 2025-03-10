import { baseURL } from "../constants/BaseConfig";
export const configurationEndPoints = {
    user_scrap: `${baseURL}scrap/user-scrapping/`,
    user_scrap_by_id: `${baseURL}scrap/scrapped/`,
    translate_content: `${baseURL}scrap/translate-content/`,
    user_resgistration: `${baseURL}account/registration/`,
    user_list: `${baseURL}account/users-list/`,
    user_scrap_filter: `${baseURL}scrap/user-scrap-filter/`,
    translation_result_json: `${baseURL}scrap/translations-results/`,
    delete_history: `${baseURL}scrap/delete-history/`,
    download_scrap: `${baseURL}scrap/download-scrap/`,
};