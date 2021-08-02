import axios from "axios";
import React from "react";
import StripeCheckout from "react-stripe-checkout";
function Payment() {
  const makepayment = (token) => {
    console.log(token);
    payment(token);
  };

  async function payment(token) {
    let res = await axios.post("http://localhost:3002/api/payment", token);
    console.log(res);
  }

  return (
    <div>
      <StripeCheckout
        stripeKey="pk_test_51JGcCVSHuzIKOCXebylB11xsXUieQKMXHZXn7tyBRydTbgzUEU35mhaeqb3Oh7p1uauQJZwEQhvZrLVs9RP4nJS800LC31BZaY"
        name="chandani k khanesha"
        description="Demo Payment"
        token={makepayment}
        amount={1000}
        currency="USD"
      />
    </div>
  );
}

export default Payment;
