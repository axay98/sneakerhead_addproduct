import NavbarAloglia1 from "../components/ui/NavbarAloglia1";
import algoliasearch from "algoliasearch";
import { InstantSearch, Configure } from "react-instantsearch-dom";
import classes from "../components/ui/Card.module.css";
import Content from "../components/ui/Content";
import { useState } from "react";

import {
  defaultEndpointProducts,
  authEndpoint,
  defEndpointProducts,
} from "./Property.js";

import { clientid, clientsecret, algoliaindex, searchClient } from "./Cred";

//function to add commercetool data to Algolia index
const addToAloglia = (results) => {
  const client = algoliasearch(
    "ZQV098TIG8",
    "a47fc83f41362cbad77d2a492ce7d914"
  );
  const index = client.initIndex(algoliaindex);
  results.map((result) => {
    const { id, masterData } = result;
    console.log(masterData);
    index
      .saveObject({
        objectID: id,
        masterData: masterData,
      })
      .then(({ objectID }) => {});
  });
};

//function to fetch data from commercetool
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
  const res = await fetch(defaultEndpointProducts, {
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

function HomePage({ data }) {
  const { info, results: defaultResults = [] } = data;
  const [results, updateResults] = useState(defaultResults);

  // getDataforAlgolia();

  //function to fetch data from commercetool and send the data to AddtoAlgolia function
  async function getDataforAlgolia() {
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
    let data;
    for (var i = 10; i < 20; i++) {
      let id = i * 500;
      const res = await fetch(`${defEndpointProducts}=${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + clientToken,
        },
      });
      data = await res.json();
      addToAloglia(data.results);
    }
  }

  return (
    <div>
      <InstantSearch searchClient={searchClient} indexName={algoliaindex}>
        <Configure clickAnalytics />
        <NavbarAloglia1 />

        {/* Banner1 */}
        <img
          className={classes.img1}
          variant="top"
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
        />
        {/* Banner2 */}
        <img
          className={classes.img1}
          variant="top"
          src="https://i.pinimg.com/originals/c8/c8/f6/c8c8f6a67b4f3402de8c43739a158683.jpg"
        />
        <Content value={results} />
      </InstantSearch>
    </div>
  );
}

export default HomePage;
