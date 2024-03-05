import conf from "../conf/conf";
import axios from "axios";

class DashboardService {
  databaseBaseUrl;

  constructor() {
    this.databaseBaseUrl = conf.databaseBaseUrl;
  }

  async getUserBlogs() {
    try {
      const response = await axios.get(
        `${this.databaseBaseUrl}dashboard/api/v1/getMyBlogs`,
        { withCredentials: true }
      );
      if (response) {
        return response.data;
      }
    } catch (error) {
      console.log(`dashboardService :: getUserBlogs :: ${error}`);
    }
  }

  async getLikedBlogs() {
    try {
      const response = await axios.get(
        `${this.databaseBaseUrl}dashboard/api/v1/getUserLikedBlogs`,
        { withCredentials: true }
      );

      if (response) {
        return response.data;
      }
    } catch (error) {
      console.log(`dashboardService :: getLikedBlogs :: ${error}`);
    }
  }
}

const dashboardService = new DashboardService();
export default dashboardService;
