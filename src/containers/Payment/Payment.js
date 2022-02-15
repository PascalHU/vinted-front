import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";

// const stripePromise = loadStripe("pk_test_5z9rSB8XwuAOihoBixCMfL6X");//Reacteur
const stripePromise = loadStripe(
  "pk_test_51KTW2bK1wIU0Rm7XtV7lCy9DucEgQdAJpTwxEau7h2coyLDT3U4C2dG8iYswswm8K3MuXdHsfUZligiGTO6FQ6rv00UyygtM7g"
); //Peso

const Payment = () => {
  const location = useLocation();
  const { title, price, token } = location.state;

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm title={title} price={price} token={token} />
    </Elements>
  );
};

export default Payment;
