import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import "./CheckoutForm.css";
import axios from "axios";

const CheckoutForm = ({ title, price, token }) => {
  const [completed, setCompleted] = useState(false);
  const [msg, setMsg] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const total = price + 1.2;

  const submitPayment = async (event) => {
    event.preventDefault();
    const cardElement = elements.getElement(CardElement);
    const stripeResponse = await stripe.createToken(cardElement, {
      name: token,
    });
    const stripeToken = stripeResponse.token.id;
    const response = await axios.post(
      "https://vinted-sky.herokuapp.com/payment",
      // "https://lereacteur-vinted-api.herokuapp.com/payment",
      {
        token: stripeToken,
        title: title,
        amount: total,
      }
    );
    console.log(response.data);
    if (response.data.status === "succeeded") {
      setMsg("Paiement effectué !");
      setCompleted(true);
    } else {
      setMsg("Paiement echoué 😭");
    }
  };
  return (
    <>
      {!completed ? (
        <div className="background">
          <div className="checkout-form">
            <h1>Résumé de la comande</h1>
            <div className="checkout-detail">
              <div className="checkout-detail-line">
                <span>Commande</span>
                <span>{price.toFixed(2).replace(".", ",") + " €"}</span>
              </div>
              <div className="checkout-detail-line">
                <span>Frais protection acheteurs</span>
                <span>0,40 €</span>
              </div>
              <div className="checkout-detail-line">
                <span>Frais de port</span>
                <span>0,80 €</span>
              </div>
              <div className="line"></div>
              <div className="checkout-detail-line ">
                <span className="total">Total</span>
                <span className="total">
                  {total.toFixed(2).replace(".", ",") + " €"}
                </span>
              </div>
            </div>
            <div className="checkout-detail-line">
              <p>
                Il ne vous reste plus qu'une étape pour vous offrir
                <b> {title}</b>. Vous allez payer
                <b> {total.toFixed(2).replace(".", ",") + " €"}</b> (frais de
                protection et frais de port inclus).
              </p>
            </div>
            <div className="line"></div>

            <form onSubmit={submitPayment}>
              <div className="card-info">
                <CardElement />
              </div>
              <button type="submit">Pay</button>
            </form>
          </div>
        </div>
      ) : (
        <div className="background">
          <div className="checkout-form">{msg}</div>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;
