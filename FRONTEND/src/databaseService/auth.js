import conf from "../conf/conf";
import axios from "axios";

export class AuthService {
  databaseUrl;
  constructor() {
    this.databaseUrl = conf.databaseBaseUrl;
  }

  async createAccount({ username, password, email }) {
    try {
      const response = axios.post(`${this.databaseUrl}/v1/register`, {
        username,
        email,
        password,
      });

      return response.data;
    } catch (error) {
      console.log(`authService :: CreateAccount :: ${error}`);
    }
  }

  async login({ password, email }) {
    try {
      const response = axios.post(`${this.databaseUrl}/v1/login`, {
        email,
        password,
      });

      if (response) {
        return true;
      }
      throw new error("Something Went Wrong");
    } catch (error) {
      console.log(`authService :: CreateAccount :: ${error}`);
    }
  }

  async getCurrentUser() {
    try {
      const response = axios.post(`${this.databaseUrl}/v1/getCurrentUser`);

      if (response) {
        return response.data;
      }
      throw new error("Something Went Wrong");
    } catch (error) {
      console.log(`authService :: CreateAccount :: ${error}`);
    }
  }
}

const authService = new AuthService();

export default authService;
