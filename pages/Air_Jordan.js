import NavbarAloglia1 from "../components/ui/NavbarAloglia1";
import { InstantSearch, Configure } from "react-instantsearch-dom";
import Shoe2Comp from "../components/ui/Shoe2Comp";
import { useState, useEffect } from "react";
import algoliasearch from "algoliasearch";

import { AirJordanEndpoint, authEndpoint } from "./Property.js";

import { clientid, clientsecret, algoliaindex, searchClient } from "./Cred";

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
  const res = await fetch(AirJordanEndpoint, {
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

function Air_Jordan({ data }) {
  const { info, results: defaultResults = [] } = data;
  const [results, updateResults] = useState(defaultResults);

  return (
    <div>
      <InstantSearch searchClient={searchClient} indexName={algoliaindex}>
        <NavbarAloglia1 />

        <Shoe2Comp value={results} />
      </InstantSearch>
    </div>
  );
}

export default Air_Jordan;
