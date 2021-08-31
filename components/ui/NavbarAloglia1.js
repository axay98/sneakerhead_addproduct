import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Highlight } from "react-instantsearch-dom";
import { Configure } from "react-instantsearch-dom";
import CustomHighlight from "./CustomHighlight";
import React from "react";

import {
  Nav,
  NavMenu,
  Title,
  SearchForm,
  SearchInput,
  NavLink,
  SecondaryNav,
  Div,
} from "./Navbar.styles.js";
import { useRouter } from "next/router";
import { AlgoliaSearchInput as Input } from "./Navbar.styles";
import classes from "./Dropdown.module.css";
import { connectAutoComplete, connectHighlight } from "react-instantsearch-dom";

import en from "./lang/en";
import fr from "./lang/fr";

const NavbarAloglia1 = ({ value }) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : fr;

  const changeLanguage = (e) => {
    const locale = e.target.value;
    router.push(router.pathname, router.asPath, { locale });
  };

  const Autocomplete = ({ hits, currentRefinement, refine }) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ position: "relative", marginLeft: "10px" }}>
        <Input
          placeholder={t.SearchPlaceholder}
          type="search"
          value={currentRefinement}
          onChange={(event) => refine(event.currentTarget.value)}
        />
        <ul
          style={{
            listStyleType: "none",
            color: "black",
            position: "absolute",
          }}
        >
          {currentRefinement &&
            hits.map((hit) => {
              let autocompletediv = null;
              let autocompleteimg = null;
              let autocompleteprice = null;
              let autocompletedivfr = null;

              if (hit.masterData.staged) {
                if (hit.masterData.staged.name.fr) {
                  autocompletedivfr = (
                    <CustomHighlight
                      style={{ color: "yellow" }}
                      hit={hit}
                      attribute="masterData.staged.name.fr"
                    />
                  );
                } else {
                  autocompletediv = autocompletedivfr = (
                    <CustomHighlight
                      style={{ color: "yellow" }}
                      hit={hit}
                      attribute="masterData.staged.name.en"
                    />
                  );
                }
                autocompleteimg = (
                  <div style={{ flexDirection: "row" }}>
                    <img
                      style={{
                        paddingBottom: "10px",
                        paddingLeft: "10px",
                        width: "60px",
                        height: "60px",
                      }}
                      src={hit.masterData.staged.masterVariant.images[0].url}
                    />
                  </div>
                );
                autocompleteprice = (
                  <div style={{ color: "yellow" }}>
                    ${" "}
                    {hit.masterData.staged.masterVariant.prices[0].value
                      .centAmount  }
                  </div>
                );
              } else if (hit.masterData.productProjection) {
                if (hit.masterData.productProjection.name.fr) {
                  autocompletedivfr = (
                    <CustomHighlight
                      style={{ color: "yellow" }}
                      hit={hit}
                      attribute="masterData.productProjection.name.fr"
                    />
                  );
                } else {
                  autocompletedivfr = autocompletediv = (
                    <CustomHighlight
                      style={{ color: "yellow" }}
                      hit={hit}
                      attribute="masterData.productProjection.name.en"
                    />
                  );
                }
                autocompleteimg = (
                  <div style={{ flexDirection: "row" }}>
                    <img
                      style={{
                        paddingBottom: "10px",
                        paddingLeft: "10px",
                        width: "60px",
                        height: "60px",
                      }}
                      src={
                        hit.masterData.productProjection.masterVariant.images[0]
                          .url
                      }
                    />
                  </div>
                );
                autocompleteprice = (
                  <div style={{ color: "yellow" }}>
                    ${" "}
                    {hit.masterData.productProjection.masterVariant.prices[0]
                      .value.centAmount  }
                  </div>
                );
              }
              return (
                <li
                  style={{ overflow: "hidden" }}
                  onClick={() => router.replace(`/Products/${hit.objectID}`)}
                  style={{
                    width: "740px",
                    height: "60px",
                    backgroundColor: "#151515",
                    color: "white",
                  }}
                  key={hit.objectID}
                >
                  {locale === "en" ? (
                    <div style={{ display: "flex" }}>
                      {autocompleteimg}
                      <div
                        style={{ flexDirection: "row", paddingLeft: "30px" }}
                      >
                        <div>{autocompletediv}</div>
                        {autocompleteprice}
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: "flex" }}>
                      <div style={{ flexDirection: "row" }}>
                        {autocompleteimg}
                      </div>
                      <div
                        style={{ flexDirection: "row", paddingLeft: "30px" }}
                      >
                        <div>{autocompletedivfr}</div>
                        {autocompleteprice}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
        </ul>{" "}
      </div>
    </div>
  );

  const CustomAutocomplete = connectAutoComplete(Autocomplete);

  const GoToSearch = () => {
    analytics.track("Search button clicked", {
      title: "How to Create a Tracking Plan",
      course: "Intro to Analytics",
    });
    analytics.page("Search", {
      title: "Segment Pricing",
      url: "https://segment.com/pricing",
      path: "/pricing",
      referrer: "https://segment.com/warehouses",
    });

    router.push("/search");
  };

  const GoToCart = () => {
    analytics.track("Cart button clicked", {
      title: "How to Create a Tracking Plan",
      course: "Intro to Analytics",
    });
    analytics.page("Cart", {
      title: "Segment Pricing",
      url: "https://segment.com/pricing",
      path: "/pricing",
      referrer: "https://segment.com/warehouses",
    });
  };

  const GoToHome = () => {
    analytics.track("Home button clicked", {
      title: "How to Create a Tracking Plan",
      course: "Intro to Analytics",
    });
    analytics.page("Home", {
      title: "Segment Pricing",
      url: "https://segment.com/pricing",
      path: "/pricing",
      referrer: "https://segment.com/warehouses",
    });

    router.push("/");
  };

  const GoToNewArrivals = () => {
    analytics.track("NewArrivals tab clicked", {
      title: "How to Create a Tracking Plan",
      course: "Intro to Analytics",
    });
    analytics.page("NewArrivals", {
      title: "Segment Pricing",
      url: "https://segment.com/pricing",
      path: "/pricing",
      referrer: "https://segment.com/warehouses",
    });

    router.push("/NewArrivals");
  };

  const GoToApparel = () => {
    analytics.track("Apparel tab clicked", {
      title: "How to Create a Tracking Plan",
      course: "Intro to Analytics",
    });
    analytics.page("Apparel", {
      title: "Segment Pricing",
      url: "https://segment.com/pricing",
      path: "/pricing",
      referrer: "https://segment.com/warehouses",
    });

    router.push("/Apparel");
  };

  const GoToGear = () => {
    analytics.track("Gear tab clicked", {
      title: "How to Create a Tracking Plan",
      course: "Intro to Analytics",
    });
    analytics.page("Gear", {
      title: "Segment Pricing",
      url: "https://segment.com/pricing",
      path: "/pricing",
      referrer: "https://segment.com/warehouses",
    });

    router.push("/Gear");
  };

  const GoToMostWanted = () => {
    analytics.track("MostWanted tab clicked", {
      title: "How to Create a Tracking Plan",
      course: "Intro to Analytics",
    });
    analytics.page("MostWanted", {
      title: "Segment Pricing",
      url: "https://segment.com/pricing",
      path: "/pricing",
      referrer: "https://segment.com/warehouses",
    });

    router.push("/MostWanted");
  };

  return (
    <>
      <Nav>
        <NavMenu>
          <Title>{t.Title}</Title>

          {/* <SearchBox  /> */}
          <CustomAutocomplete />
          <Configure hitsPerPage={2} />

          <NavLink onClick={GoToHome.bind()}>{t.Home}</NavLink>
          <NavLink onClick={GoToSearch.bind()}>{t.Product}</NavLink>
          <NavLink onClick={GoToCart.bind()} href="/#/cart">
            {t.Cart}{" "}
          </NavLink>
          <NavLink>
            <select
              style={{ backgroundColor: "black", color: "white" }}
              onChange={changeLanguage}
              defaultValue={locale}
            >
              <option
                style={{ backgroundColor: "black", color: "white" }}
                value="en"
              >
                English
              </option>
              <option
                style={{ backgroundColor: "black", color: "white" }}
                value="fr"
              >
                French
              </option>
            </select>
          </NavLink>
        </NavMenu>
      </Nav>
      <SecondaryNav>
        {" "}
        <Div>
          <NavMenu>
            <NavLink onClick={GoToNewArrivals.bind()}>{t.NEWARRIVALS}</NavLink>
            <NavLink onClick={GoToMostWanted.bind()}>{t.MOSTWANTED}</NavLink>
            <NavLink>
              <div className={classes.navbar}>
                <div className={classes.dropdown}>
                  <button className={classes.dropbtn}>
                    {t.SHOES}
                    <i
                      className="fa fa-caret-down"
                      style={{ paddingLeft: "6px" }}
                    ></i>
                  </button>
                  <div className={classes.dropdowncontent}>
                    <a
                      style={{ textDecoration: "none", color: "White" }}
                      onClick={() => {
                        router.push("/Nike");
                      }}
                    >
                      {t.Nike}
                    </a>
                    <a
                      style={{ textDecoration: "none", color: "White" }}
                      onClick={() => {
                        router.push("/Air_Jordan");
                      }}
                    >
                      {t.AirJordan}
                    </a>
                    <a
                      style={{ textDecoration: "none", color: "White" }}
                      onClick={() => {
                        router.push("/Reebok");
                      }}
                    >
                      {t.Reebok}
                    </a>
                  </div>
                </div>
              </div>
            </NavLink>
            <NavLink onClick={GoToApparel.bind()}>{t.APPAREL}</NavLink>
            <NavLink onClick={GoToGear.bind()}>{t.GEAR}</NavLink>
            <NavLink>
              <div className={classes.navbar}>
                <div className={classes.dropdown}>
                  <button className={classes.dropbtn}>
                    {t.SALE}
                    <i
                      className="fa fa-caret-down"
                      style={{ paddingLeft: "6px" }}
                    ></i>
                  </button>
                  <div className={classes.dropdowncontent}>
                    <a
                      style={{ textDecoration: "none", color: "White" }}
                      onClick={() => {
                        router.push("/SaleTenPercent");
                      }}
                    >
                      {t.TenSale}
                    </a>
                    <a
                      style={{ textDecoration: "none", color: "White" }}
                      onClick={() => {
                        router.push("/SaleTwentyPercent");
                      }}
                    >
                      {t.TwentySale}
                    </a>
                  </div>
                </div>
              </div>
            </NavLink>
          </NavMenu>{" "}
        </Div>
      </SecondaryNav>
    </>
  );
};

export default NavbarAloglia1;
