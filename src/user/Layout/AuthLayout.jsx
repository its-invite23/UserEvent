import React from 'react';
import { Toaster } from 'react-hot-toast';
import Header from '../compontents/Header';
import Footer from '../compontents/Footer';

export default function AuthLayout({ children }) {

    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <Header />
            {children}
            <Footer />
        </>
    );
}
