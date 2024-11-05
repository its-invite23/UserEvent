import React, { useEffect, useState } from "react";
import UserLayout from "../../Layout/UserLayout";
import LoadingSpinner from "../../compontents/LoadingSpinner"; // Fixed typo here
import EventForm from "./EventForm"; // Unused import
import Listing from "../../../Api/Listing";

export default function Package() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [hasMore, setHasMore] = useState(true);

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
  const bgColors = ['#BD5841', '#A340B7', '#394EEA', '#8B4CED', '#919246', '#0B196F', "#4E4F20"];

  return (
    <div className="bg-[#000] p-[15px] h-full min-h-full">
      <UserLayout>
        <div className="container mx-auto w-full max-w-[1180px]">
          <h1 className="font-manrope font-[700] mb-[30px] mt-[30px] lg:mt-[30px] lg:mb-[55px] text-white text-center 
        text-[30px] md:text-[38px] lg:text-[40px] xl:text-[48px] leading-[25px] lg:leading-[38px] xl:leading-[48px]">
            Browse our <span className="text-[#EB3465]"> event </span> packages
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-7 ">
            {loading ? (
              <LoadingSpinner />) : (
              data && data.map((item, index) => (
                <div
                  key={index}
                  className={`p-[15px] lg:p-[20px]`}
                  style={{ backgroundColor: bgColors[index % bgColors.length] }} // Use modulo to loop through colors
                >
                  <div className="flex items-center gap-[1px]">
                    <div className="flex items-center justify-center w-[45px] h-[45px]  md:w-[50px] md:h-[50px] lg:w-[55px] lg:h-[55px]  xl:w-[67px] xl:h-[67px] p-[5] bg-[#ffffff] rounded-[4px]">
                      <svg
                        width="20"
                        height="25"
                        viewBox="0 0 20 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.7616 23.7762L10.7485 23.7784L10.6711 23.8165L10.6494 23.8208L10.6341 23.8165L10.5568 23.7773C10.5451 23.7744 10.5364 23.7765 10.5306 23.7838L10.5263 23.7947L10.5077 24.2609L10.5132 24.2827L10.5241 24.2969L10.6374 24.3775L10.6537 24.3819L10.6668 24.3775L10.7801 24.2969L10.7932 24.2795L10.7975 24.2609L10.779 23.7958C10.7761 23.7842 10.7703 23.7776 10.7616 23.7762ZM11.0492 23.6531L11.0339 23.6553L10.8335 23.7566L10.8226 23.7675L10.8193 23.7794L10.8389 24.2479L10.8444 24.2609L10.8531 24.2697L11.072 24.3699C11.0858 24.3735 11.0964 24.3706 11.1036 24.3612L11.108 24.3459L11.0709 23.677C11.0673 23.6632 11.0601 23.6553 11.0492 23.6531ZM10.2703 23.6553C10.2655 23.6523 10.2597 23.6514 10.2542 23.6526C10.2488 23.6538 10.244 23.6571 10.2408 23.6618L10.2343 23.677L10.1973 24.3459C10.198 24.359 10.2042 24.3677 10.2158 24.3721L10.2321 24.3699L10.4511 24.2686L10.462 24.2599L10.4653 24.2479L10.4849 23.7794L10.4816 23.7664L10.4707 23.7555L10.2703 23.6553Z"
                          fill="#EB3465"
                        />
                        <path
                          d="M10.7681 0.83604C10.5796 0.694615 10.3502 0.618164 10.1145 0.618164C9.87879 0.618164 9.64943 0.694615 9.46087 0.83604C9.00703 1.18375 8.5885 1.57527 8.21135 2.00495C7.6416 2.64659 6.84635 3.72835 6.84635 4.97569C6.84635 5.84246 7.19067 6.67372 7.80357 7.28662C8.41646 7.89952 9.24773 8.24384 10.1145 8.24384H3.5782C2.71144 8.24384 1.88017 8.58816 1.26728 9.20105C0.65438 9.81395 0.310059 10.6452 0.310059 11.512V13.6907C0.310059 15.0372 1.84718 15.8063 2.92458 14.998L3.65119 14.4533C3.83976 14.3119 4.06911 14.2354 4.30482 14.2354C4.54053 14.2354 4.76988 14.3119 4.95845 14.4533L5.24823 14.6712C5.81393 15.0955 6.50198 15.3248 7.20911 15.3248C7.91624 15.3248 8.6043 15.0955 9.17 14.6712L9.46087 14.4533C9.64943 14.3119 9.87879 14.2354 10.1145 14.2354C10.3502 14.2354 10.5796 14.3119 10.7681 14.4533L11.059 14.6712C11.6247 15.0955 12.3127 15.3248 13.0199 15.3248C13.727 15.3248 14.4151 15.0955 14.9808 14.6712L15.2705 14.4533C15.4591 14.3119 15.6885 14.2354 15.9242 14.2354C16.1599 14.2354 16.3892 14.3119 16.5778 14.4533L17.3044 14.998C18.3818 15.8063 19.9189 15.0372 19.9189 13.6907V11.512C19.9189 10.6452 19.5746 9.81395 18.9617 9.20105C18.3488 8.58816 17.5176 8.24384 16.6508 8.24384H10.1145C10.9813 8.24384 11.8125 7.89952 12.4254 7.28662C13.0383 6.67372 13.3826 5.84246 13.3826 4.97569C13.3826 3.72835 12.5874 2.64659 12.0176 2.00495C11.6407 1.58009 11.2224 1.17702 10.7681 0.83604ZM1.39944 17.411V20.227C1.39944 20.8049 1.62899 21.3591 2.03759 21.7677C2.44618 22.1763 3.00036 22.4058 3.5782 22.4058H16.6508C17.2286 22.4058 17.7828 22.1763 18.1914 21.7677C18.6 21.3591 18.8295 20.8049 18.8295 20.227V17.411C18.576 17.5026 18.3036 17.5291 18.0371 17.4882C17.7707 17.4473 17.5188 17.3402 17.3044 17.1768L16.5778 16.6321C16.3892 16.4907 16.1599 16.4142 15.9242 16.4142C15.6885 16.4142 15.4591 16.4907 15.2705 16.6321L14.9808 16.85C14.4151 17.2742 13.727 17.5036 13.0199 17.5036C12.3127 17.5036 11.6247 17.2742 11.059 16.85L10.7681 16.6321C10.5796 16.4907 10.3502 16.4142 10.1145 16.4142C9.87879 16.4142 9.64943 16.4907 9.46087 16.6321L9.17 16.85C8.6043 17.2742 7.91624 17.5036 7.20911 17.5036C6.50198 17.5036 5.81393 17.2742 5.24823 16.85L4.95845 16.6321C4.76988 16.4907 4.54053 16.4142 4.30482 16.4142C4.06911 16.4142 3.83976 16.4907 3.65119 16.6321L2.92458 17.1768C2.7102 17.3402 2.45828 17.4473 2.19185 17.4882C1.92541 17.5291 1.65297 17.5026 1.39944 17.411Z"
                          fill="#EB3465"
                        />
                      </svg>
                    </div>

                    <div className="flex-col items-center gap-[1px] pl-[10px] xl:pl-[15px]">
                      <p className="capitalize font-manrope font-[600] text-[16px] sm:text-[18px] md:text-[22px] lg:text-[20px] xl:text-[26px] text-white">
                        {item.package_name}
                      </p>
                      <p className="font-manrope font-[600] text-[10px] md:text-[11px] lg:text-[12px] xl:text-[14px] text-white uppercase">
                        {item.package_categories.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
            {

            }
          </div>
          <div className="mt-[40px] mb-[50px] lg:mt-[60px] lg:mb-[100px] flex justify-center">
            {
              hasMore && (
                <button
                  onClick={loadMore}
                  className="px-[40px] py-[15px] lg:px-[50px] lg:py-[18px] bg-[#B8A955] text-white font-manrope font-[700] text-[18px] rounded-[3px] hover:bg-[#938539] transition duration-300">
                  Load More
                </button>
              )
            }
          </div>
        </div>
        <EventForm />
      </UserLayout>
    </div>
  );
}
