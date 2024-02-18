import conf from "../conf/conf";
import axios from "axios";

export class AuthService {
  databaseUrl;
  constructor() {
    this.databaseUrl = conf.databaseBaseUrl;
  }

  async createAccount({ username, password, email }) {
    try {
      const response = await axios.post(`http://localhost:3000/api/v1/register`, {
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
      const response = await axios.post(`${this.databaseUrl}/v1/login`, {
        email,
        password,
      });

      if (response) {
        return true;
      }
      throw new error("Something Went Wrong");
    } catch (error) {
      console.log(`authService :: login :: ${error}`);
    }
  }

  async getCurrentUser() {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/getCurrentUser`);

      console.log('response');
      if (response) {
        return response;
      }
    } catch (error) {
      console.log(`authService :: currentUser :: ${error}`);
    }
  }
}

const authService = new AuthService();

export default authService;
