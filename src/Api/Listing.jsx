import { Component } from "react";
import Api from "./Api";

class Listing extends Component {
  async signup(data) {
    return Api.post("/user/signup", data);
  }
  async login(data) {
    return Api.post("/user/login", data);
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