/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51LxVmAB7AbIuRSHE6fEAzjyIRikCAbEPNq6sTuZhvybW8vtTEzH2c0KBm7xhRIUN7Q5s37kfIOdFv0OIE34N5X9600wndqe9V0'
);

export const bookTour = async (tourId) => {
  try {
    // 1 Get checkout session from endpoint API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // const session = await axios({
    //   method: 'GET',
    //   url: `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`,
    // });
    console.log(session);
    // 2 Create checkout form + charge creditcard

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
