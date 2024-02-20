import conf from "../conf/conf";
import axios from "axios";

export class AuthService {
  databaseUrl;
  constructor() {
    this.databaseUrl = conf.databaseBaseUrl;
  }

  async createAccount({ username, password, email }) {
    try {
      const response = await axios.post(`${this.databaseUrl}auth/api/v1/register`, {
        username,
        email,
        password,
      },{withCredentials: true});

      return response.data;
    } catch (error) {
      console.log(`authService :: CreateAccount :: ${error}`);
    }
  }

  async login({ password, email }) {
    try {
      const response = await axios.post(`${this.databaseUrl}auth/api/v1/login`, {
        email,
        password,
      },{withCredentials: true});

      if (response) {
        return response;
      }
      throw new error("Something Went Wrong");
    } catch (error) {
      console.log(`authService :: login :: ${error}`);
    }
  }

  async getCurrentUser() {
    try {
      const response = await axios.get(`${this.databaseUrl}auth/api/v1/getCurrentUser`,{withCredentials: true});
      if (response) {
        return response.data;
      }
    } catch (error) {
      console.log(`authService :: currentUser :: ${error.response.data.error}`);
      return false;
    }
  }

  async logout() {
    try {
      const response = await axios.post(`${this.databaseUrl}auth/api/v1/logout`,{withCredentials: true});
      if(response){
        return response.data;
      }
    } catch (error) {
      console.log(error.response);
      console.log(`authService :: logout :: ${error.response.data.error}`);
      return false;
    }
  }
}

const authService = new AuthService();

export default authService;
