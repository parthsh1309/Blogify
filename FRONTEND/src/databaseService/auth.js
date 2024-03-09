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
      },{withCredentials: true,headers: { "Content-Type": "application/json" }});

      if (response) {
        return response;
      }
      throw new error("Something Went Wrong");
    } catch (error) {
      return error.response.data;
    }
  }

  async getCurrentUser() {
    try {
      const response = await axios.get(`${this.databaseBaseUrl}auth/api/v1/getCurrentUser`,{withCredentials: true,headers: { "Content-Type": "application/json" }});
      if (response) {
        return response.data;
      }
    } catch (error) {
      return  error.response.data;
    }
  }

  async logout() {
    try {
      const response = await axios.post(`${this.databaseBaseUrl}auth/api/v1/logout`,{},{withCredentials: true,headers: { "Content-Type": "application/json" }});
      if(response){
        return response.data;
      }
    } catch (error) {
      return error.response.data;
    }
  }

  async editProfile(data) {
    try {
      const response = await axios.put(`${this.databaseBaseUrl}auth/api/v1/editProfile`,data,{withCredentials: true ,headers: { "Content-Type": "application/json" }});
      if(response){
        return response.data;
      }
    } catch (error) {
      return error.response.data;
    }
  }  

  async refreshToken() {
    try {
      const response = await axios.post(`${this.databaseBaseUrl}auth/api/v1/refreshToken`,{},{withCredentials: true , headers: { "Content-Type": "application/json" }});
      if(response){
        return response.data;
      }
    }catch(error){
      return error.response.data;
    }
  }
}

const authService = new AuthService();

export default authService;

