import React, { useEffect, useState } from "react";
import UserLayout from "../../Layout/UserLayout";
import LoadingSpinner from "../../compontents/LoadingSpinner"; // Fixed typo here
import EventForm from "./EventForm"; // Unused import
import Listing from "../../../Api/Listing";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearData } from "../Redux/formSlice.js";
import { clearAllVenues } from "../Redux/selectedVenuesSlice.js";

export default function Package() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchData = async (signal) => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.packageget(page, limit, { signal });
      if (response?.data?.data?.packagegetdata) {
        setData((prevData) => {
          if (page === 1) {
            return response.data.data.packagegetdata;
          } else {
            return [...prevData, ...response.data.data.packagegetdata];
          }
        });
        setHasMore(response.data.data.nextPage !== null);
      }
    } catch (error) {
      console.error("Error fetching package data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    fetchData(page, signal);
    return () => controller.abort();
  }, [page, limit]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  const bgColors = [
    "#BD5841",
    "#A340B7",
    "#394EEA",
    "#8B4CED",
    "#919246",
    "#0B196F",
    "#4E4F20",
  ];

  return (
    <div className="bg-[#000] p-[15px] h-full min-h-full">
      <UserLayout>
        <div className="container mx-auto w-full max-w-[990px]">
          <h1
            className="font-manrope font-[700] mt-[35px] lg:mt-[50px] text-white text-center 
        text-[24px] md:text-[32px] lg:text-[36px] xl:text-[44px] leading-[25px] md:leading-[35px] lg:leading-[38px] xl:leading-[48px]"
          >
            Explore the exclusive{" "}
            <span className="text-[#EB3465]">event packages</span> designed just
            for you
          </h1>
          
          <h2
            className="font-manrope font-[700] mt-[35px] lg:mt-[50px] text-white text-center 
        text-[14px] md:text-[17px] lg:text-[18px] text-[#9ca3af] xl:text-[24px] mb-5  leading-[25px] lg:leading-[38px] xl:leading-[48px]"
          >
            Currently, our event packages are only available in Dubai, UAE. Stay
            tuned as we expand to more locations soon!
          </h2>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-7 ">
                {data &&
                  data.map((item, index) => (
                    <button
                      key={index}
                      className="p-[15px] lg:p-[20px] flex justify-center items-center rounded-md"
                      style={{
                        backgroundColor: bgColors[index % bgColors.length],
                      }}
                      onClick={() => {
                        dispatch(clearData());
                        dispatch(clearAllVenues());
                        navigate(`/event-show/${item?._id}`);
                      }}
                    >
                      <div className="flex flex-col items-center gap-[1px]">
                        <p className="capitalize text-center font-manrope font-[600] text-[16px] sm:text-[18px] md:text-[22px] lg:text-[20px] xl:text-[26px] text-white">
                          {item.package_name}
                        </p>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          )}
          <div className="mt-[20px] mb-[30px] lg:mt-[60px]  lg:mb-[40px] flex justify-center">
            {hasMore && (
              <button
                onClick={loadMore}
                className="px-[40px] py-[15px] lg:px-[50px] lg:py-[18px] bg-[#B8A955] text-white font-manrope font-[700] text-[18px] rounded-[3px] hover:bg-[#938539] transition duration-300"
              >
                Load More
              </button>
            )}
          </div>
        </div>
        <EventForm />
      </UserLayout>
    </div>
  );
}
