import React from "react";
import UserLayout from "../../Layout/UserLayout";

export default function Terms() {
  const data = [
    {
      text: [
        "Welcome to INVITE! These terms and conditions outline the rules and regulations for the use of INVITE’s website and services. By accessing or using our platform, you agree to be bound by these Terms & Conditions. If you do not agree with any of these terms, please do not use our services.",
      ],
    },
    {
      heading: "Definitions",
      text: [
        `- <strong>“Platform”</strong> refers to INVITE’s website and mobile applications.`,
        `- <strong>“User”</strong> refers to any individual or entity using our platform to plan events or book services.`,
        `- <strong>“Service Provider”</strong> refers to individuals or businesses listed on our platform offering services related to event planning.`,
        `- <strong>“We,” “Us,”</strong> and <strong>“Our”</strong> refer to INVITE.`,
      ],
    },
    {
      heading: "Service Description",
      text: [
        "INVITE is an all-in-one event planning platform that connects users with service providers. Our platform allows users to browse, compare, and book various services needed to organize an event, from venues to caterers to entertainers.",
      ],
    },
    {
      heading: "User Responsibilities",
      text: [
        "- Account Creation: Users must provide accurate and complete information when creating an account on our platform. You are responsible for maintaining the confidentiality of your account details.",
        "- Usage: Users agree to use the platform only for lawful purposes and in accordance with these terms.",
        "- Booking: When booking a service through our platform, you agree to be bound by the terms and conditions of the service provider. It is your responsibility to review these terms before booking.",
      ],
    },
    {
      heading: "Service Provider Responsibilities",
      text: [
        "- Listing: Service providers must provide accurate and up-to-date information about their services, including pricing, availability, and any specific terms and conditions.",
        "- Engagement: Service providers are responsible for fulfilling the services booked through our platform. Any disputes arising from the service must be resolved directly between the provider and the user.",
        "- Fees: There are no fees for service providers to list their services on INVITE. However, providers are responsible for any applicable taxes or charges related to the services they offer.",
      ],
    },
    {
      heading: "Payments and Fees",
      text: [
        "- Transparency: INVITE does not charge users or service providers any hidden fees. All costs associated with a booking will be clearly outlined in the quote provided.",
        "- Payment Process: After selecting services, users will receive a payment link. All payments must be made through the platform.",
        "- Refunds: Refund policies are determined by the individual service providers. Users should review these policies before booking. INVITE is not responsible for any refunds or disputes related to service provider policies.",
      ],
    },
    {
      heading: "Cancellation Policy",
      text: [
        "- User Cancellations: Users may cancel bookings in accordance with the cancellation policies of the individual service providers. These policies will be provided at the time of booking.",
        "- Service Provider Cancellations: In the event a service provider cancels a booking, the user will be notified immediately and offered an alternative provider or a full refund.",
      ],
    },
    {
      heading: "Intellectual Property",
      text: [
        "- Ownership: All content on the INVITE platform, including logos, designs, text, graphics, and software, is the intellectual property of INVITE and is protected by copyright laws.",
        "- Usage: Users and service providers may not use, reproduce, or distribute any content from our platform without our explicit permission.",
      ],
    },
    {
      heading: "Limitation of Liability",
      text: [
        "- No Guarantees: While INVITE strives to connect users with high-quality service providers, we do not guarantee the performance or quality of any services booked through our platform.",
        "- Liability: INVITE is not liable for any damages, losses, or expenses that arise from the use of our platform or the services provided by third-party service providers.",
      ],
    },
    {
      heading: "Changes to Terms",
      text: [
        "INVITE is an all-in-one event planning platform that connects users with service providers. Our platform allows users to browse, compare, and book various services needed to organize an event, from venues to caterers to entertainers.",
      ],
    },
    {
      heading: "Contact Us",
      text: [
        "If you have any questions or concerns about these Terms & Conditions, please contact us at contact@its-invite.com.",
      ],
    },
    {
      text: [
        "By using INVITE, you agree to these Terms & Conditions and are bound by them. We encourage you to review this page regularly to stay informed about your rights and responsibilities.",
      ],
    },
  ];
  return (
    <div className="bg-[#000] p-[10px] h-full min-h-full">
      <UserLayout>
        <div className="w-full max-w-[830px] m-auto bg-[#000] mt-[50px] md:mt-[70px] lg:mt-[100px] px-[5px]  md:px-[15px]">
          <h1 className="text-[#ffff] ny-2.5 text-[1.8em] leading-[1.5em] md:text-[2em] md:leading-[1.5em]  md:text-[4em] text-center font-[600] mb-[10px] md:mb-[50px]">Terms and Conditions</h1>
          {data &&
            data?.map((item, index) => (
              <div className="my-4" key={index}>
                {item?.heading ? (
                  <h2 className="text-[#ffff] text-[18px] font-[700]">{item?.heading}</h2>
                ) : (
                  <></>
                )}
                {item?.text &&
                  item?.text?.map((text, idx) => (
                    <p
                      className="text-[#ffffff80] text-[1.2em] leading-[1.2] md:text-[1.4em] md:leading-[1.5]"
                      key={idx}
                      dangerouslySetInnerHTML={{ __html: text }}
                    ></p>
                  ))}
              </div>
          ))}
        </div>
      </UserLayout>
    </div>
  );
}
