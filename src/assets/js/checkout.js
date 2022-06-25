// This is your test publishable API key.
const stripe = Stripe("pk_test_51KBv6oAS6fMexrhZAkuHyWW2zPVsVTDghIWRZHcOvqLCgFJjno84xq2zrOqrnIt6tyQvF5r9d0Nid0HtBNhAjeIw00kpH2gTBv");

// The items the customer wants to buy
/*
const items = [{ id: "xl-tshirt" }];
*/

let elements;
let apiClient;
/*
initialize();
checkStatus();
*/

document
  .querySelector("#payment-form")
  .addEventListener("submit", handleSubmit);

// Fetches a payment intent and captures the client secret
async function initialize(userID, planID, link) {
  // const response = await fetch("https://www.monetlive.com/grpTwo/many/api/create-payment-intent", {
  const response = await fetch(`https://www.monetlive.com/many/api/create-payment-intent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({userId: userID, planId: planID })
    // body: JSON.stringify({ id: planID }),
  });
  apiClient = await response.json();
  console.log('client secret :', apiClient);
  const { clientSecret } = apiClient;
  const appearance = {
    theme: 'stripe',
  };
  elements = stripe.elements({ appearance, clientSecret });
  const paymentElement = elements.create("payment");
  paymentElement.mount("#payment-element");
}

async function handleSubmit(e) {
  e.preventDefault();
  // setLoading(true);
const url = `${location.origin}/profile/dashboard/payCard/paySuccess`;
  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      // Make sure to change this to your payment completion page

      return_url: url,
      // return_url: `/paySuccess`,
    },
  });

  // This point will only be reached if there is an immediate error when
  // confirming the payment. Otherwise, your customer will be redirected to
  // your `return_url`. For some payment methods like iDEAL, your customer will
  // be redirected to an intermediate site first to authorize the payment, then
  // redirected to the `return_url`.
  if (error.type === "card_error" || error.type === "validation_error") {
    showMessage(error.message);
  } else {

    showMessage("An unexpected error occured.");
    window.open(url, "_self");
  }

  // setLoading(false);
}
// Fetches the payment intent status after payment submission
async function checkStatus() {
  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );

  if (!apiClient.clientSecret) {
    return;
  }

  const { paymentIntent } = await stripe.retrievePaymentIntent(apiClient.clientSecret);

  switch (paymentIntent.status) {
    case "succeeded":
      showMessage("Payment succeeded!");
      break;
    case "processing":
      showMessage("Your payment is processing.");
      break;
    case "requires_payment_method":
      showMessage("Your payment was not successful, please try again.");
      break;
    default:
      showMessage("Something went wrong.");
      break;
  }
}

// ------- UI helpers -------

function showMessage(messageText) {
  const messageContainer = document.querySelector("#payment-message");

  messageContainer.classList.remove("hidden");
  messageContainer.textContent = messageText;

  setTimeout(function () {
    messageContainer.classList.add("hidden");
    messageText.textContent = "";
  }, 4000);
}

// Show a spinner on payment submission
function setLoading(isLoading) {
  console.log(isLoading, 'loading');
  if (isLoading) {
    // Disable the button and show a spinner
    document.querySelector("#submit").disabled = true;
    document.querySelector("#spinner").classList.remove("hidden");
    document.querySelector("#button-text").classList.add("hidden");
  } else {
    document.querySelector("#submit").disabled = false;
    document.querySelector("#spinner").classList.add("hidden");
    document.querySelector("#button-text").classList.remove("hidden");
  }
}
