import conf from "../conf/conf";
import axios from "axios";

class BlogService{
    databaseBaseUrl;

    constructor(){
        this.databaseBaseUrl = conf.databaseBaseUrl;
    }

    async getBlogs(inProduction, category, limit) {
        try {
            const params = {
                inProduction: inProduction||false,
                blogCategory: category||"All",
                limit:limit||10
            }
           const response = await axios.get(`${this.databaseBaseUrl}blog/api/v1/all-blogs?${new URLSearchParams(params)}`);
           if(response){
               return response.data;
           }
        } catch (error) {
            console.log(error.response);
            return false;
        }
    }
}

const blogService = new BlogService();

export default blogService