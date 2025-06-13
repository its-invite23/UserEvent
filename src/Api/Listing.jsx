import axios from 'axios';

const API_URL = process.env.REACT_APP_URL;

function getToken() {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('token');
    return data;
  }
  return null;
}


let Api = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});

Api.interceptors.request.use(
  async (config) => {
    const token = getToken();
    if (token !== null) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Api;

class Listing {
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
    try {
      console.log("Sending request to backend with params:", params);
      const response = await Api.post(`/place/nearbysearch`, params);
      
      // Log the raw response for debugging
      console.log("Backend API response:", response);
      
      // If the response is successful but doesn't contain the expected data structure
      if (response?.data?.status === true) {
        // Try to extract the results array from various possible locations in the response
        let results = [];
        
        if (Array.isArray(response.data?.data)) {
          // If data is already an array, use it directly
          results = response.data.data;
        } else if (response.data?.data?.results && Array.isArray(response.data.data.results)) {
          // If data contains a results array (common Google Maps API format)
          results = response.data.data.results;
        } else if (response.data?.data?.local_results && Array.isArray(response.data.data.local_results)) {
          // If data contains local_results array (common SerpAPI format)
          results = response.data.data.local_results;
        } else {
          // If we can't find a valid array, return an empty one
          console.warn("Could not find valid results array in response:", response.data);
          results = [];
        }
        
        // Return a properly structured response
        return {
          data: {
            status: true,
            data: results
          }
        };
      }
      
      // If the response doesn't match our expected format, return it as is
      return response;
    } catch (error) {
      console.error("Error in nearbySearch API call:", error);
      // Return a structured error response
      return {
        data: {
          status: false,
          message: error.message || "Failed to fetch nearby locations",
          data: []
        }
      };
    }
  }
}

export default Listing;