import conf from "../conf/conf";
import axios from "axios";

class BlogService {
  databaseBaseUrl;

  constructor() {
    this.databaseBaseUrl = conf.databaseBaseUrl;
  }

  async getBlogs(
    inProduction = false,
    category = "All",
    limit = 10,
    sortBy = "-createdAt",
    language = "English",
    time = 60
  ) {
    try {
      const params = {
        inProduction,
        blogCategory: category,
        limit: limit,
        sortBy: sortBy,
        language,
        time,
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

  async addBlog(data) {
    console.log(data);
    try {
      const response = await axios.post(
        `${this.databaseBaseUrl}blog/api/v1/create-blog`,
        data,
        {
          withCredentials: true,
          Headers: { "Content-Type": "multipart/form-data" },
        }
      );

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

  async getSingleBlog(blogId) {
    try {
      const response = await axios.get(
        `${this.databaseBaseUrl}blog/api/v1/blog/${blogId}`
      );
      if (response) {
        return response.data;
      }
      throw new Error("Blog not found");
    } catch (error) {
      console.log(error.response);
      return error.response.data.error;
    }
  }

  async LikeBlog(blogId) {
    try {
      const response = await axios.post(
        `${this.databaseBaseUrl}blog/api/v1/like-blog/${blogId}`,
        {},
        { withCredentials: true }
      );
      if (response) {
        return response.data;
      }
      throw new Error("Unable to like blog");
    } catch (error) {
      console.log(error.response);
      return error.response.data.error;
    }
  }

  async addComments(blogId, content) {
    try {
      console.log(content);
      const response = await axios.post(
        `${this.databaseBaseUrl}blog/api/v1/blog-comment/${blogId}`,
        { content },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error.response);
      return error.response.data.error;
    }
  }

  async getBlogComments(blogId) {
    try {
      const response = await axios.get(
        `${this.databaseBaseUrl}blog/api/v1/get-comments/${blogId}`
      );
      if (response) {
        return response.data;
      }
      throw new Error("Unable to get blog comments");
    } catch (error) {
      console.log(error.response);
      return error.response.data.error;
    }
  }
}

const blogService = new BlogService();

export default blogService;
