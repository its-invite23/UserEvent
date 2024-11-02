import { Component } from "react";
import Api from "./Api";

class Listing extends Component {
  async signup(data) {
    return Api.post("/user/signup", data);
  }
  async login(data) {
    return Api.post("/user/login", data);
  }
  
  // TSripe payment
  async Stripe_payment(data) {
    return Api.post(`/stripe/create-checkout-session`, data);
  }

  async ForgetPassword(data) {
    return Api.post("/user/forgot", data);
  }

  async ForgetPasswordLink(data) {
    return Api.post("/user/forgot-password", data);
  }
  async Enquiry(data){
    return Api.post("/enquiry/enquiry-add", data);
  }

  async contact(data){
    return Api.post("/contact/contact-add", data);
  }
  async profile() {
    return Api.get("/user/profile-token", );
  }
  async verifyAccount(data) {
    return Api.post("/user/verifyaccount",data );
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