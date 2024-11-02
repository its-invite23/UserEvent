import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Listing from '../../../Api/Listing';

const stripePromise = loadStripe('pk_test_51QCE0sCstph9qeprzkMb5aXKsLV0CZSqvOCiYMBdDWP6SQVm1czwzv5R7QYqrEtcOI4UYilahHTJYLmcg7ueIzJl004uHmMIAl');

export default function Test() {
    const [clientSecret, setClientSecret] = useState(null);
    const [error, setError] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        const main = new Listing();
        main
            .paymentTest({
                amount:1000,
                currency:"USD",
            })
            .then((r) => {
                setClientSecret(r.clientSecret);
            })
            .catch((err) => {
                setClientSecret(null);
                console.log("Error fetching client secret:", err);
            });
    }, []);

    const PaymentForm = () => {
        const stripe = useStripe();
        const elements = useElements();

        const handleSubmit = async (event) => {
            event.preventDefault();

            if (!stripe || !elements || !clientSecret) return;

            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (error) {
                setError(error.message);
            } else {
                setPaymentSuccess(true);
                setOrderDetails({
                    orderId: paymentIntent.id,
                    amount: paymentIntent.amount,
                    currency: paymentIntent.currency,
                });
            }
        };

        return (
            <form onSubmit={handleSubmit}>
                <CardElement />
                <button type="submit" disabled={!stripe}>Pay</button>
                {error && <p>{error}</p>}
            </form>
        );
    };

    const OrderScreen = () => (
        <div>
            <h2>Order Confirmed</h2>
            <p>Thank you for your payment!</p>
            <p>Order ID: {orderDetails.orderId}</p>
            <p>Amount Paid: {orderDetails.amount / 100} {orderDetails.currency.toUpperCase()}</p>
        </div>
    );

    return (
        <Elements stripe={stripePromise}>
            {paymentSuccess ? <OrderScreen /> : <PaymentForm />}
        </Elements>
    );
}
