import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, message } from 'antd';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import axios from 'axios';

const stripePromise = loadStripe('your_stripe_publishable_key'); // Replace with your actual publishable key

const CheckoutForm = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    axios.post('http://localhost:5000/create-payment-intent', { amount })
      .then(res => setClientSecret(res.data.clientSecret))
      // .catch(err => message.error('Failed to initiate payment'));
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
      }
    });

    if (result.error) {
      message.error(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        message.success('Payment successful!');
        // Here you can redirect to a success page or update your backend
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <Button type="primary" htmlType="submit" disabled={!stripe} style={{ marginTop: 16 }}>
        Pay
      </Button>
    </form>
  );
};

const Payment: React.FC = () => {
  const amount = 1; // Example amount, you might want to pass this as a prop or get it from a context

  return (
    <Layout>
      <PageHeader title="Complete Your Payment" />
      <div style={{ maxWidth: 400, margin: '0 auto' }}>
        <h2>Total Amount: ฿{amount}</h2>
        <Elements stripe={stripePromise}>
          <CheckoutForm amount={amount} />
        </Elements>
      </div>
    </Layout>
  );
};

export default Payment;