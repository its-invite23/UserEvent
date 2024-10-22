import React, { useEffect, useState } from 'react';
import  { Toaster } from 'react-hot-toast';
import Listing from '../../Api/Listing'; 
import Header from '../compontents/Header';
import Footer from '../compontents/Footer';

export default function AuthLayout({ children }) {
    const [loading, setLoading] = useState(false); 
    const [content, setContent] = useState([]);

    const fetchData = async (signal) => {
        setLoading(true);
        try {
            const main = new Listing(); 
            const response = await main.profile({ signal }); 
            if (response.data) {
                setContent(response.data.data);
            }
        } catch (error) {
            localStorage && localStorage.removeItem("token");
            // toast.error("Please log in first.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const controller = new AbortController();
        fetchData(controller.signal); 
        return () => controller.abort(); 
    }, []);

    return (
        <>
           <Toaster
        position="top-right"
        reverseOrder={false}
      />
            <Header />
            {loading ? <p>Loading...</p> : children}
            <Footer />
        </>
    );
}
