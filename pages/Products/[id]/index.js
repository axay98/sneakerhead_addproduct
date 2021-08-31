import NavbarAloglia1 from "../../../components/ui/NavbarAloglia1";
import ProductDetail from "../../../components/ui/ProductDetail";
import { createClient as createClientD } from "contentful";
import { InstantSearch } from "react-instantsearch-dom";

import {
 defaultEndpointProducts,
  authEndpoint,
} from "../../Property.js";
import { clientid, clientsecret, algoliaindex, searchClient } from  "../../Cred";

//api function to fetch product data from commercetool
export async function getServerSideProps({ query }) {
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

  const client = createClientD({
    space: "27dvrilv9g9m",
    accessToken: "7eR1gkrfTTlkiHY0BP-gqdqB3RBm_z6E6EB1xYljiQo",
  });
  let contentful_res = await client.getEntries({ content_type: "review" });

  const { id } = query;
  const res = await fetch(`${defaultEndpointProducts}/${id}`, {
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
      contentful_res,
    },
  };
}

const product = ({ data, contentful_res }) => {
  return (
    <div>
      <InstantSearch searchClient={searchClient} indexName={algoliaindex}>
        <NavbarAloglia1 />
        <ProductDetail value={data} review={contentful_res} />
      </InstantSearch>
    </div>
  );
};

export default product;
