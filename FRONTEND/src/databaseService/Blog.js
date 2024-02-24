import conf from "../conf/conf";
import axios from "axios";

class BlogService {
  databaseBaseUrl;

  constructor() {
    this.databaseBaseUrl = conf.databaseBaseUrl;
  }

  async getBlogs(inProduction, category, limit, sortBy) {
    try {
      const params = {
        inProduction: inProduction || false,
        blogCategory: category || "All",
        limit: limit || 10,
        sortBy: sortBy || "-createdAt",
      };
      const response = await axios.get(
        `${this.databaseBaseUrl}blog/api/v1/all-blogs?${new URLSearchParams(
          params
        )}`
      );
      if (response) {
        return response.data;
      }
    } catch (error) {
      console.log(error.response);
      return false;
    }
  }

  async addBlog(data ) {
    
    console.log(data);
    try {
      const response = await axios.post(
        `${this.databaseBaseUrl}blog/api/v1/create-blog`,
        data,{withCredentials: true , Headers:{ 'Content-Type': 'multipart/form-data'}}
        )

      if (response) {
        return response.data;
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.log(error.response);
      return error.response.data.error;
    }
  }
}

const blogService = new BlogService();

export default blogService;
