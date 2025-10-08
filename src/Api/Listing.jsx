import { Component } from "react";
import Api from "./Api";

class Listing extends Component {
  async signup(data) {
    return Api.post("/user/signup", data);
  }
  async login(data) {
    return Api.post("/user/login", data);
  }
  async verifyAccount(data) {
    return Api.post("/user/verifyaccount", data);
  }
  async SignUpOtp(data) {
    return Api.post("/user/otp", data);
  }
  async OtpVerify(data) {
    return Api.post("/user/otp_verifiy", data);
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

  async packageget(page, limit) {
    return Api.get(`/package/package-Status?page=${page}&limit=${limit}`,);
  }

  async getServices(Id) {
    return Api.post(`/package/package-get-id`, Id);
  }

  async addBooking(data) {
    return Api.post("/booking/booking-add", data);
  }


  async Stripe_payment(data) {
    return Api.post("/stripe/create-checkout-session", data);
  }

  async StripeSuccess(data) {
    return Api.get(`/stripe/payment-success/${data}`);
  }

  async StripeCancel(data) {
    return Api.get(`/stripe/payment-cancel/${data}`);
  }
  async getBookingByID(data) {
    return Api.get(`/booking/payment/${data}`);
  }
  async getPaymentByID(data) {
    return Api.get(`/stripe/getByID/${data}`);
  }

  async getCurrencyRate(data) {
    return Api.get(`/currency/get-rate/${data}`);
  }

  async nearbySearch(params) {
    return Api.post(`/place/nearbysearch` ,params );
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