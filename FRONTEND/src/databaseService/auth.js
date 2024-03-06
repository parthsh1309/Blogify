import conf from "../conf/conf";
import axios from "axios";

export class AuthService {
  databaseBaseUrl;
  constructor() {
    this.databaseBaseUrl = conf.databaseBaseUrl;
  }

  async createAccount({ username, password, email }) {
    try {
      const response = await axios.post(`${this.databaseBaseUrl}auth/api/v1/register`, {
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
      const response = await axios.post(`${this.databaseBaseUrl}auth/api/v1/login`, {
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
      const response = await axios.get(`${this.databaseBaseUrl}auth/api/v1/getCurrentUser`,{withCredentials: true});
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
      const response = await axios.post(`${this.databaseBaseUrl}auth/api/v1/logout`,{},{withCredentials: true});
      if(response){
        return response.data;
      }
    } catch (error) {
      console.log(error.response);
      console.log(`authService :: logout :: ${error.response.data.error}`);
      return false;
    }
  }

  async editProfile(data) {
    try {
      const response = await axios.put(`${this.databaseBaseUrl}auth/api/v1/editProfile`,data,{withCredentials: true});
      if(response){
        return response.data;
      }
    } catch (error) {
      console.log(`authService :: editProfile :: ${error.response.data.error}`);
      return false;
    }
  }  

  async refreshToken() {
    try {
      const response = await axios.post(`${this.databaseBaseUrl}auth/api/v1/refreshToken`,{},{withCredentials: true});
      if(response){
        return response.data;
      }
    }catch(error){
      console.log(`authService :: refreshToken :: ${error.response.data.error}`);
      return false;
    }
  }
}

const authService = new AuthService();

export default authService;
