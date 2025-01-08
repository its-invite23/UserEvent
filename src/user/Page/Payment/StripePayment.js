import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Listing from "../../../Api/Listing";
import { useParams } from "react-router-dom";
import AuthLayout from "../../Layout/AuthLayout";
import moment from "moment";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Popup from "../../compontents/Popup";
import LoginLogic from "../SignUp/LoginLogic";
import { formatMultiPrice } from "../../hooks/ValueData";
import VenuePhotos from "../../compontents/VenuePhoto";
const StripePayment = () => {
  const [data, setData] = useState(false);
  const token = localStorage && localStorage.getItem("token");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [processing, setprocessing] = useState(false);
  const [isPaymentDone, setIsPaymentDone] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);
  const { id } = useParams();
  const handlePayment = async () => {
    try {
      setprocessing(true);
      const payment = new Listing();
      const resp = payment.Stripe_payment({
        amount: data?.totalPrice*data?.adminCurrencyRate,
        userId: data?.userId,
        booking_id: data?._id,
        currency: data?.AdminCurrencyCode || "USD",
      });
      resp
        .then((res) => {
          if (res.data.url) {
            window.location.href = res.data.url;
          }
          setprocessing(false);
        })
        .catch((err) => {
          console.log("err", err);
          toast.error(err?.response?.data?.error);
          setprocessing(false);
        });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error during payment");
      setprocessing(false);
    }
  };

  const fetch = (id) => {
    const main = new Listing();
    main
      .getBookingByID(id)
      .then((r) => {
        setData(r?.data?.packageRecord);
      })
      .catch((err) => {
        setData([]);
        console.log("error", err);
      });
  };

  const fetchPaymentStatus = (id) => {
    const main = new Listing();
    main
      .getPaymentByID(id)
      .then((r) => {
        setIsPaymentDone(r?.data?.payment);
      })
      .catch((err) => {
        setIsPaymentDone(false);
        console.log("error", err);
      });
  };

  useEffect(() => {
    if (id) {
      fetch(id);
      fetchPaymentStatus(id);
    }
  }, []);

  return (
    <div className="bg-[#000] p-[10px] h-full min-h-full">
      <AuthLayout>
        <div className="w-full max-w-[1300px] m-auto mt-[40px] md:mt-[60px] lg:mt-[70px]">
          <div className="flex items-start justify-between flex-wrap lg:flex-nowrap gap-[30px] ">
            <div className="w-full lg:max-w-[720px]">
              <h2 className="flex items-center gap-[5px] mb-[15px] font-manrope font-[700] text-[18px] leading-[20px] md:text-[22px] lg:text-[24px] text-white">
                <button>
                  <svg
                    width="16"
                    height="15"
                    viewBox="0 0 16 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.4999 8.50006L3.91394 8.50006L8.41394 13.0001L6.99994 14.4141L0.0859372 7.50006L6.99994 0.586063L8.41394 2.00006L3.91394 6.50006L15.4999 6.50006L15.4999 8.50006Z"
                      fill="white"
                    />
                  </svg>
                </button>{" "}
                Selected services for your event
              </h2>
              <div className="">
                {data?.package?.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between flex-wrap sm:flex-nowrap gap-[10px] md:gap-[20px] border-b border-b-[#ffffff42] py-[15px]"
                  >
                    <VenuePhotos venue={item} />
                    <div className="flex items-center justify-between sm:justify-end gap-[20px] lg:gap-[50px] w-[100%] md:w-auto">
                      <div>
                        <h2 className="font-manrope font-[700] text-[18px]  text-[#fff]">
                          {item?.services_provider_name
                            ? formatMultiPrice(
                              item?.services_provider_price *
                              data?.adminCurrencyRate,
                              data?.AdminCurrencyCode || "USD"
                            )
                            : formatMultiPrice(
                              item?.price_level * data?.adminCurrencyRate,
                              data?.AdminCurrencyCode || "USD"
                            )}
                        </h2>
                        <h2 className="font-manrope font-[400] text-[10px] lg:text-[12px] text-[#EB3465]">
                          *Estimated Budget
                        </h2>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full lg:max-w-[420px] bg-[#1B1B1B] rounded-[15px] p-[15px] lg:rounded-[20px] lg:p-[25px]">
              <div className="flex justify-center mb-[15px] text-center">
                <iframe
                  src={`https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${encodeURIComponent(
                    `${data?.location} )`
                  )}&t=&z=14&ie=UTF8&iwloc=B&output=embed`}
                  width="100%"
                  height="200"
                  style={{ border: "0" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Map"
                ></iframe>
              </div>
              <div className="border-b border-b-[#ffffff42] mt-[30px] pb-[15px]">
                <h2 className="mb-[2px] lg:mb-[5px] font-manrope font-[600] text-[14px] lg:text-[16px] text-[#EB3465]">
                  Address of your event
                </h2>
                <h3 className="font-manrope font-[400] text-[18px] leading-[22px] lg:text-[18px] lg:leading-[24px] text-[#fff]">
                  {data?.location}
                </h3>
              </div>
              <div className="grid grid-cols-12 gap-[10px] border-b border-b-[#ffffff42] mt-[5px] pb-[5px]">
                <div className="col-span-12 lg:col-span-5">
                  <h2 className="mb-[2px] lg:mb-[5px] font-manrope font-[600] text-[13px] lg:text-[13px] text-[#EB3465]">
                    Date
                  </h2>
                  <h3 className="font-manrope font-[400] text-[15px] text-[#fff]">
                    {moment(data?.bookingDate, "DD-MM-YYYY").format("DD MMMM YYYY")}

                  </h3>
                </div>

                <div className="col-span-12 lg:col-span-6 pl-[0px] lg:pl-[15px] ">
                  <h2 className="mb-[2px] lg:mb-[5px] font-manrope font-[600] text-[13px] text-[#EB3465]">
                    Number of attendees
                  </h2>
                  <h3 className="font-manrope font-[400] text-[15px] text-[#fff]">
                    {data?.attendees}
                  </h3>
                </div>
              </div>

              <div className="border-b border-b-[#ffffff42] mt-[5px] pb-[5px]">
                <div className="border-b border-b-[#ffffff42] mt-[10px] pb-[10px]">
                  {data?.package?.map((item, index) => (
                    <div
                      className="flex items-center justify-between"
                      key={index}
                    >
                      <h2 className="font-manrope text-[13px] lg:text-[13px] text-white">
                        {item?.services_provider_name
                          ? item?.services_provider_name
                          : item?.name}
                      </h2>
                      <h3 className="font-manrope text-[13px] lg:text-[13px] text-white flex items-center">
                        {item?.services_provider_name
                          ? `${formatMultiPrice(
                            item?.services_provider_price *
                            data?.adminCurrencyRate,
                            data?.AdminCurrencyCode || "USD"
                          )} * ${data?.attendees} persons`
                          : `${formatMultiPrice(
                            item?.price_level * data?.adminCurrencyRate,
                            data?.AdminCurrencyCode || "USD"
                          )} * ${data?.attendees} persons`}
                      </h3>
                    </div>
                  ))}
                </div>

                <div className="border-b border-b-[#ffffff42] mt-[5px] pb-[5px]">
                  <div className="flex items-center justify-between">
                    <h2 className="font-manrope text-[13px] lg:text-[13px] text-white">
                      Service Fee
                    </h2>
                    <h3 className="font-manrope text-[13px] lg:text-[13px] text-white flex items-center">
                      Free
                    </h3>
                  </div>
                </div>
                <h2 className="mb-[5px] mt-[5px] font-manrope font-[600] text-[13px] lg:text-[13px] text-[#EB3465]">
                  Estimated Price Details
                </h2>
              </div>
              <div className="flex items-center justify-between mt-[5px] pb-[5px]">
                <h2 className="font-manrope text-[14px] text-white">Total</h2>
                <h3 className="font-manrope text-[14px] text-white flex items-center">
                  {data?.totalPrice !== 0 ? (
                    <>
                      {formatMultiPrice(
                        data?.totalPrice * data?.adminCurrencyRate,
                        data?.AdminCurrencyCode || "USD"
                      )}
                    </>
                  ) : (
                    "N/A"
                  )}
                </h3>
              </div>
              <div className="flex justify-end mt-[10px]">
                {isPaymentDone ? (
                  <p className="font-manrope text-[18px] lg:text-[20px] text-[#a1a1a1] mt-3  font-bold">
                    Payment already done!
                  </p>
                ) : (
                  <button
                    onClick={() => {
                      if (token) {
                        handlePayment();
                      } else {
                        // Open popup
                        openPopup();
                      }
                    }}
                    className="px-[25px] py-[12px] xl:px-[30px] xl:py-[15px] bg-[#ff0062] hover:bg-[#4400c3] font-manrope font-[500] text-[16px] lg:text-[18px] text-white rounded-[5px]"
                  >
                    {processing ? "Processing.." : "Pay Now"}
                  </button>
                )}
              </div>
              <Popup
                isOpen={isPopupOpen}
                onClose={closePopup}
                title="Welcome!"
                  size="w-full max-w-lg"
                content={<LoginLogic isPopup={true} onClose={closePopup} />}
              />
            </div>
          </div>
        </div>
      </AuthLayout>
    </div>
  );
};

export default StripePayment;
