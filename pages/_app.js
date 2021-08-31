import "../styles/globals.css";
import Head from "next/head";
import aa from "search-insights";
import FullStory from "react-fullstory";
import { useEffect, useState, useRef } from "react";
import { snipcart_API } from "./Cred";

import {
  defaultEndpointCart,
  orderdefaultEndpoint,
  authEndpoint1,
  cusotmerendpoint,
} from "./Property.js";

import { ORG_ID, clientid, clientsecret } from "./Cred";

aa("init", {
  appId: clientid,
  apiKey: clientsecret,
});

function MyApp({ Component, pageProps }) {
  const [cartidstate, setcartidstate] = useState("");
  const [cartitemdata, setcartitemdata] = useState("");

  const customerid = useRef("");
  const customermail = useRef("");

  useEffect(() => {
    if (cartitemdata) {
      cartUpdate(cartitemdata);
    }
  }, [cartidstate, cartitemdata]);

  useEffect(() => {
    getCustomerID();
  }, [cartidstate]);

  // function to fetch customer details from commercetool
  async function getCustomerID() {
    const auth_res = await fetch(authEndpoint1, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(clientid + ":" + clientsecret).toString("base64"),
      },
    });

    let res_auth = await auth_res.json();

    const clientToken = res_auth.access_token;
    const res = await fetch(cusotmerendpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + clientToken,
      },
    });
    const data = await res.json();
    let index = parseInt(Math.random() * (data.results.length - 0) + 0);

    let cid = data.results[index].id;
    let email = data.results[index].email;

    customermail.current = email;
    customerid.current = cid;
  }

  // function to create a cart in commercetool
  async function cartCreated() {
    const auth_res = await fetch(authEndpoint1, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(clientid + ":" + clientsecret).toString("base64"),
      },
    });

    let res_auth = await auth_res.json();

    const clientToken = res_auth.access_token;
    const res = await fetch(defaultEndpointCart, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + clientToken,
      },
      body: JSON.stringify({
        currency: "EUR",
      }),
    });

    const data = await res.json();
    setcartidstate(data.id);
    if (localStorage.getItem("cartid") == null) {
      localStorage.setItem("cartid", data.id);
      localStorage.setItem("cartversion", data.version);
    }
  }

  // Function to add item to the commercetool cart whenever item is added to the snipcart
  async function cartUpdate(item) {
    if (cartidstate) {
      const auth_res = await fetch(authEndpoint1, {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(clientid + ":" + clientsecret).toString("base64"),
        },
      });
      let cartid = localStorage.getItem("cartid");

      let cartversion = localStorage.getItem("cartversion");

      let res_auth = await auth_res.json();
      const clientToken = res_auth.access_token;
      const res = await fetch(`${defaultEndpointCart}/${cartid}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + clientToken,
        },
        body: JSON.stringify({
          version: parseInt(cartversion),

          actions: [
            {
              action: "addLineItem",
              productId: item.id,
              variantId: 1,
              quantity: 1,
              supplyChannel: {
                typeId: "channel",
                //channel id from commercetool
                id: "a386fdda-6583-4748-b650-ef11c9ad031f",
              },
              distributionChannel: {
                typeId: "channel",
                id: "a386fdda-6583-4748-b650-ef11c9ad031f",
              },
            },
            {
              action: "setCustomerEmail",

              email: customermail.current,
            },
            {
              action: "setCustomerId",

              customerId: customerid.current,
            },
          ],
        }),
      });
      const data = await res.json();

      if (data) {
        localStorage.setItem("cartversion", data.version);
      }
    }
  }

  //function to add shipping details to the commercetool order
  async function updateShipping(order) {
    const auth_res = await fetch(authEndpoint1, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(clientid + ":" + clientsecret).toString("base64"),
      },
    });
    let cartid = localStorage.getItem("cartid");

    let cartversion = localStorage.getItem("cartversion");

    let res_auth = await auth_res.json();
    const clientToken = res_auth.access_token;
    const res = await fetch(`${defaultEndpointCart}/${cartid}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + clientToken,
      },
      body: JSON.stringify({
        version: parseInt(cartversion),

        actions: [
          {
            action: "setShippingAddress",
            address: {
              id: "exampleAddress",
              key: "exampleKey",
              title: "My Address",
              salutation: "Mr.",
              firstName: order.billingAddress.name,
              lastName: "",
              streetName: order.billingAddress.address1,
              streetNumber: "4711",
              additionalStreetInfo: "Backhouse",
              postalCode: order.billingAddress.postalCode,
              city: order.billingAddress.city,
              region: order.billingAddress.province,
              state: "",
              country: "US",
              company: "My Company Name",
              department: "Sales",
              building: "Hightower 1",
              apartment: "247",
              pOBox: "2471",
              phone: "+49 89 12345678",
              mobile: "+49 171 2345678",
              email: order.email,
              fax: "+49 89 12345679",
              additionalAddressInfo: "no additional Info",
              externalId: "Information not needed",
            },
          },
        ],
      }),
    });
    const data = await res.json();

    if (data) {
      localStorage.setItem("cartversion", data.version);
      confirmOrder(order);
    }
  }

  // function to create a order in the Commercetool
  async function confirmOrder(order) {
    const auth_res = await fetch(authEndpoint1, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(clientid + ":" + clientsecret).toString("base64"),
      },
    });
    let cartid = localStorage.getItem("cartid");
    let orderid = Math.floor(Math.random() * (10000000 - 0) + 0);
    let cartversion = localStorage.getItem("cartversion");

    let res_auth = await auth_res.json();

    const clientToken = res_auth.access_token;
    const res = await fetch(`${orderdefaultEndpoint}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + clientToken,
      },
      body: JSON.stringify({
        id: cartid,
        version: parseInt(cartversion),
        orderNumber: order.token
      }),
    });
    const data = await res.json();

    // Adding custom field estimatedDeliveryDate with an order
    if(data){
       const resCustom = await fetch(`${orderdefaultEndpoint}/${data.id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + clientToken,
        },
        body: JSON.stringify({
        
          version: parseInt(data.version),
        
          actions: [
          {
              action : "setCustomType",
              type : {
                id : "21ca85bf-c8b7-400a-88a7-207360b6e4c7",
                typeId : "type"
              },
              fields : {
                estimatedDeliveryDate : "2021-09-30"
              }
            }
      ]
        }),
      });

      const datacustom = await resCustom.json();

    if (datacustom) {
      let bodydata = {
        orderid: datacustom.id,
        customername: datacustom.customerId,
        customeremail: datacustom.customerEmail,
        estimatedDelivery: datacustom.custom.fields.estimatedDeliveryDate,
        // estimatedDelivery: "2021-09-30"
      };

      const sql_res = await fetch(
        "/api/mongo",
        // "/api/neworder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodydata),
        }
      );

      const datasql = await sql_res.json();
    }

    }

    

    localStorage.setItem("orderid", data.id);
    localStorage.removeItem("cartid");
    localStorage.removeItem("cartversion");
  }

  if (process.browser) {
    document.addEventListener("snipcart.ready", function () {
      //Snipcart event when cart is created
      Snipcart.events.on("cart.created", (cartState) => {
        cartCreated();
      });
    });
  }

  if (process.browser) {
    document.addEventListener("snipcart.ready", function () {
      //snipcart event when item is added to the cart
      Snipcart.events.on("item.added", (cartItem) => {
        setcartitemdata(cartItem);
      });

      //snipcart event when order is confirmed
      Snipcart.events.on("cart.confirmed", (cartConfirmResponse) => {
        updateShipping(cartConfirmResponse);
      });
    });
  }
  return (
    <div>
      <FullStory org={ORG_ID} />
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />

        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x"
          crossorigin="anonymous"
        />
         <link
        rel="stylesheet"
        href="https://cdn.snipcart.com/themes/v3.2.1/default/snipcart.css"
      />
      <script
        async
        src="https://cdn.snipcart.com/themes/v3.2.1/default/snipcart.js"
      ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4"
          crossorigin="anonymous"
        ></script>

        <link rel="preconnect" href="https://app.snipcart.com" />
        <link rel="preconnect" href="https://cdn.snipcart.com" />
      </Head>

     
      <div
        id="snipcart"
        data-config-modal-style="side"
        data-api-key={snipcart_API}
        hidden
      ></div>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
