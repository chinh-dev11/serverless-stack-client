import React, { useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { CardElement, injectStripe } from "react-stripe-elements";
// injectStripe: HOC wrapper giving access to the props.stripe.createToken method
// CardElement: credit card number form provided by Stripe React SDK
import LoaderButton from "./LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import "./BillingForm.css";

function BillingForm({ isLoading, onSubmit, ...props }) {
  const [fields, handleFieldChange] = useFormFields({
    name: "",
    storage: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCardComplete, setIsCardComplete] = useState(false);

  isLoading = isProcessing || isLoading;

  function validateForm() {
    return (
      fields.name !== "" &&
      fields.storage !== "" &&
      isCardComplete
    );
  }

  async function handleSubmitClick(event) {
    // console.log('handleSubmitClick()');
    event.preventDefault();

    setIsProcessing(true);

    const { token, error } = await props.stripe.createToken({ name: fields.name });
    // console.log('token',token);
    /*
    id: "tok_1GNHpRD1N0mIm5q9XeNDRsD8"
    object: "token"
    card: {id: "card_1GNHpQD1N0mIm5q9PabQnpD5", object: "card", address_city: null, address_country: null, address_line1: null, …}
    client_ip: "70.82.174.123"
    created: 1584360837
    livemode: false
    type: "card"
    used: false
    */
    // console.log('error',error);

    setIsProcessing(false);

    onSubmit(fields.storage, { token, error });
  }

  return (
    <form className="BillingForm" onSubmit={handleSubmitClick}>
      <FormGroup bsSize="large" controlId="storage">
        <ControlLabel>Storage</ControlLabel>
        <FormControl
          min="0"
          type="number"
          value={fields.storage}
          onChange={handleFieldChange}
          placeholder="Number of notes to store"
        />
      </FormGroup>
      <hr />
      <FormGroup bsSize="large" controlId="name">
        <ControlLabel>Cardholder&apos;s name</ControlLabel>
        <FormControl
          type="text"
          value={fields.name}
          onChange={handleFieldChange}
          placeholder="Name on the card"
        />
      </FormGroup>
      <ControlLabel>Credit Card Info</ControlLabel>
      <CardElement
        className="card-field"
        onChange={e => setIsCardComplete(e.complete)}
        style={{
          base: { fontSize: "18px", fontFamily: '"Open Sans", sans-serif' }
        }}
      />
      <LoaderButton
        block
        type="submit"
        bsSize="large"
        isLoading={isLoading}
        disabled={!validateForm()}
      >
        Purchase
      </LoaderButton>
    </form>
  );
}

export default injectStripe(BillingForm);