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
  async Enquiry(data) {
    return Api.post("/enquiry/enquiry-add", data);
  }

  async contact(data) {
    return Api.post("/contact/contact-add", data);
  }

  async profile() {
    return Api.get("/user/profile-token",);
  }

  async packageget(page , limit) {
    return Api.get(`/package/package-Status?page=${page}&limit=${limit}`,);
  }

  async getServices(Id) {
    return Api.post(`/package/package-get-id`,Id);
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