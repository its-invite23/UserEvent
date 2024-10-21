import { Component } from "react";
import Api from "./Api";

class Listing extends Component {
  async signup(data) {
    return Api.post("/user/signup", data);
  }
  async login(data) {
    return Api.post("/user/login", data);
  }


  async ForgetPassword(data) {
    return Api.post("/user/forgot", data);
  }

  async ForgetPasswordLink(data) {
    return Api.post("/user/forgot-password", data);
  }
  async profile() {
    return Api.get("/user/profile-token", );
  }
  render() {
    return (
      <div>
        <></>
      </div>
    );
  }
}

export default Listing;