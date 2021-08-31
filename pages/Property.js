
export const defaultEndpointProducts =
  "https://api.us-central1.gcp.commercetools.com/sneakerhead/products";
export const authEndpoint =
  "https://auth.us-central1.gcp.commercetools.com/oauth/token?grant_type=client_credentials";
export const defaultEndpointsnipCart =
  " https://app.snipcart.com/api/orders/fd017184-54e9-40ac-bc56-a31cc864895b";

export const defaultEndpointCart =
  "https://api.us-central1.gcp.commercetools.com/sneakerhead/carts";
export const orderdefaultEndpoint =
  "https://api.us-central1.gcp.commercetools.com/sneakerhead/orders";
export const authEndpoint1 =
  "https://auth.us-central1.gcp.commercetools.com/oauth/token?grant_type=client_credentials";
export const cusotmerendpoint =
  "https://api.us-central1.gcp.commercetools.com/sneakerhead/customers";
export const taxcategoryendpoint =
  "https://api.us-central1.gcp.commercetools.com/sneakerhead/tax-categories";
export const defEndpointProducts =
  "https://api.us-central1.gcp.commercetools.com/sneakerhead/products?limit=500&offset";

export const NewArrivalEndpoint = "https://api.us-central1.gcp.commercetools.com/sneakerhead/products?where=masterData(current(categories(id%3D%226a4d35d3-c649-404b-958f-f5ea07d5ae65%22)))"
export const ApparelEndpoint = "https://api.us-central1.gcp.commercetools.com/sneakerhead/products?where=masterData(current(categories(id%3D%22be463f37-a281-4ed8-8980-7265e5b3de1e%22)))"
export const GearEndpoint = "https://api.us-central1.gcp.commercetools.com/sneakerhead/products?where=masterData(current(categories(id%3D%220a15d0c7-dfd3-4c56-ba23-2a8f6924a7e0%22)))"
export const Sale10Endpoint = "https://api.us-central1.gcp.commercetools.com/sneakerhead/products?where=masterData(current(categories(id%3D%228ec4c498-d4cb-4571-b27f-33fd775109b8%22)))"
export const Sale20Endpoint = " https://api.us-central1.gcp.commercetools.com/sneakerhead/products?where=masterData(current(categories(id%3D%225e3cab9c-0833-415b-b488-8cf100d3adff%22)))"
export const NikeShoesEndpoint = "https://api.us-central1.gcp.commercetools.com/sneakerhead/products?where=masterData(current(categories(id%3D%225b223740-c82b-4443-a8b1-d2facbb00bb8%22)))"
export const AirJordanEndpoint = "https://api.us-central1.gcp.commercetools.com/sneakerhead/products?where=masterData(current(categories(id%3D%22fa580416-b552-4aa9-8d4c-e88d3b80ae72%22)))"
export const ReebokEndpoint = "https://api.us-central1.gcp.commercetools.com/sneakerhead/products?where=masterData(current(categories(id%3D%22ba0dd14b-a229-4cdc-b90f-db357e57b579%22)))"
export const orderEndpoint = "https://api.us-central1.gcp.commercetools.com/sneakerhead/orders?sort=createdAt%20desc"


export const DPage = [
  "I am in page product123",
  "I am in page product812",
  "I am in page productabc",
];

function Welcome() {
  return <h1>Hello</h1>;
}

export default Welcome;
