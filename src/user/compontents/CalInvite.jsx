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
                <div className="max-w-[1400px] m-auto mt-[30px] md:mt-[80px] !z-[1]">
                <Cal
                    calLink="its-invite/15min"
                    config={{
                        theme: "dark",
                        layout: "month_view",
                        branding: { brandColor: "#00D8FF", hideBranding: true }
                    }}
                />
        </div>
    );
}
