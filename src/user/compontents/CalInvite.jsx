import React, { useEffect } from "react";
import Cal from "@calcom/embed-react";

// import Cal, { getCalApi } from "@calcom/embed-react";
// 
export default function CalInvite() {

    useEffect(() => {
        // Inject CSS after Cal.com iframe loads
        const style = document.createElement("style");
        style.innerHTML = `
      span.mb-6 mt-auto pt-6 [&_img]:h-[15px] block,
      span.mb-6.mt-auto.pt-6 *,
      a[href*="https://go.cal.com/booking"],
      img[alt="Cal.com Logo"] {
        display: none !important;
        visibility: hidden !important;
        height: 0 !important;
        width: 0 !important;
        overflow: hidden !important;
      }
    `;
        document.head.appendChild(style);
    }, []);

    //     useEffect(() => {
    //     (async function () {
    //       const cal = await getCalApi();
    //       cal("ui", {
    //         theme: "light",
    //         hideEventTypeDetails: false,
    //       });

    //       // ✅ Listen for the booking completion event
    //       cal("on", {
    //         eventType: "bookingSuccessful",
    //         callback: () => {
    //           console.log("✅ Booking completed!");

    //           // Show a temporary message or modal (instead of refreshing)
    //           alert("Thanks for booking your demo! Our team will contact you soon.");

    //           // Optional: Hide Cal widget after booking
    //           const calContainer = document.getElementById("cal-embed");
    //           if (calContainer) calContainer.style.display = "none";
    //         },
    //       });
    //     })();
    //   }, []);

    return (
                <div className="max-w-[1400px] m-auto mt-[50px] md:mt-[150px]">
                {/* <div data-aos="zoom-in">
                    <h2 className="mb-[10px] lg:mb-[40px] font-manrope font-[600] text-white text-center text-[22px] md:text-[30px] lg:text-[40px] leading-[24px] md:leading-[30px] lg:leading-[40px] rounded-[30px]">
                        Book a Free Demo
                    </h2>
                    <p className="mb-[40px] font-manrope font-[500] text-[#ffffff] text-[16px] leading-[24px] text-center px-[0] md:px-[40px] lg:px-[160px]">
                        Schedule a quick 15-minute demo with our team to explore how{" "}
                        <span className="font-semibold text-[#00D8FF]">ITS Invite</span> can
                        simplify your event planning and collaboration process.<br />
                        Pick a time that works best for you — we’ll handle the rest!
                    </p>
                </div> */}
                <Cal
                    calLink="its-invite/15min"
                    config={{
                        theme: "dark",
                        layout: "month_view",
                        branding: { brandColor: "#00D8FF", hideBranding: true }
                    }}
                    // style={{ width: "100%", height: "700px", border: "none" }}
                />
        </div>
    );
}
