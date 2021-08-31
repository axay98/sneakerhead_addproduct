import NavbarAloglia1 from "../components/ui/NavbarAloglia1";
import Facet from "../components/ui/Facet";
import classes from "./search.module.css";

import { InstantSearch, Configure, Pagination } from "react-instantsearch-dom";
import SearchDisplay from "../components/ui/SearchDisplay";
import React, { useState } from "react";

<link rel="stylesheet" href="./algolia.module.css" />;

import { searchClient, algoliaindex } from "./Cred";

const search = () => {
  return (
    <div>
      <InstantSearch searchClient={searchClient} indexName={algoliaindex}>
        <NavbarAloglia1 />
        <div className={classes.main}>
          <Facet />
          <Configure hitsPerPage={2} />
          <SearchDisplay />
        </div>
        <div
          style={{
            backgroundColor: "black",
            color: "white",
            listStyle: "none",
            display: "flex",
          }}
        >
          <Pagination
            style={{ listStyle: "none" }}
            showFirst={true}
            showLast={true}
            showPrevious={true}
            showNext={true}
          />
        </div>
      </InstantSearch>
    </div>
  );
};
export default search;
