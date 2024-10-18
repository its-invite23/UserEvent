import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Listing from '../../Api/Listing';
import Header from "../compontents/Header"
import Footer from "../compontents/Footer"


export default function UserLayout({ children }) {
    return (
        <>
            {/* <Toaster /> */}
            <Header />
            {children}
            <Footer />
        </>

    );
}

