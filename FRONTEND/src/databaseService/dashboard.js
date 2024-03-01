import conf from "../conf/conf";

class DashboardService {
  databaseBaseUrl;

  constructor() {
    this.databaseBaseUrl = conf.databaseBaseUrl;
  }

  async getUserBlogs() {
    try {
      const response = await axios.get(
        `${this.databaseBaseUrl}dashboard/api/v1/getUserBlogs`,
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
    } catch (error) {
      console.log(`dashboardService :: getLikedBlogs :: ${error}`);
    }
  }
}

const dashboard = new DashboardService();
export default dashboard;
