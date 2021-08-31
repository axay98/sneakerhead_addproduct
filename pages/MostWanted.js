import NavbarAloglia1 from "../components/ui/NavbarAloglia1";

import { InstantSearch } from "react-instantsearch-dom";
import { useState } from "react";
import MostWantedcomponent from "../components/ui/MostWantedcomponent";
import {
  orderEndpoint,
  authEndpoint,} from "./Property";
import { clientid, clientsecret,algoliaindex,searchClient } from "./Cred";

export async function getServerSideProps() {
  const auth_res = await fetch(authEndpoint, {
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
  const res = await fetch(orderEndpoint, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + clientToken,
    },
  });
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

function MostWanted({ data }) {
  const { info, results: defaultResults = [] } = data;
  const [results, updateResults] = useState(defaultResults);

  let i, j;
  let productArray = [];
  for (i = 0; i < results.length; i++) {
    for (j = 0; j < results[i].lineItems.length; j++) {
      productArray.push(results[i].lineItems[j]);
    }
  }

  function uniqueProduct(data, key) {
    return [...new Map(data.map((x) => [key(x), x])).values()];
  }

  const UniqueValuFromOrder = uniqueProduct(productArray, (it) => it.productId);

  return (
    <div>
      <InstantSearch searchClient={searchClient} indexName={algoliaindex}>
        <NavbarAloglia1 />

        <MostWantedcomponent value={UniqueValuFromOrder} />
      </InstantSearch>
    </div>
  );
}

export default MostWanted;
