import {
  Container,
  Maindiv,
  LeftDiv,
  RightDiv,
  Box1,
  Box2,
  Box3,
  Box4,
  Smallimg,
  Smallimgbox,
  DetailDiv,
  MainImgDiv,
  Smallimg1,
  MainImage,
  Div,
  ReviewDiv,
  MiniImage,
  Btn12,
  Btn3,
  ButtonDiv,
  BoldTitle,
  MainButton,
  Paragraph,
} from "./ProductDetails.styles";

import ReviewPopup from "./ReviewPopup";
import { createClient as createClientD } from "contentful";
import { createClient as createClientM } from "contentful-management";
import { useState, useEffect } from "react";
import classes from "./ProductDetail.module.css";
var contentful_res;

import en from "./lang/en";
import fr from "./lang/fr";
import { useRouter } from "next/router";

const ProductDetail = (props) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : fr;

  let [review, setreview] = useState("");
  let [email, setemail] = useState("");
  let [name, setname] = useState("");
  let [reviewstate, setreviewstate] = useState(false);
  let [reviewsuccess, setreviewsuccess] = useState(false);
  const [newreview, setnewreview] = useState("");
  const [newname, setnewname] = useState("");
  let value = props.value;
  const gettimestamp = () => {
    var d = new Date();
    d = new Date(d.getTime() - 3000000);
    var date_format_str =
      d.getFullYear().toString() +
      "-" +
      ((d.getMonth() + 1).toString().length == 2
        ? (d.getMonth() + 1).toString()
        : "0" + (d.getMonth() + 1).toString()) +
      "-" +
      (d.getDate().toString().length == 2
        ? d.getDate().toString()
        : "0" + d.getDate().toString()) +
      " " +
      (d.getHours().toString().length == 2
        ? d.getHours().toString()
        : "0" + d.getHours().toString()) +
      ":" +
      ((parseInt(d.getMinutes() / 5) * 5).toString().length == 2
        ? (parseInt(d.getMinutes() / 5) * 5).toString()
        : "0" + (parseInt(d.getMinutes() / 5) * 5).toString()) +
      ":00";
    return date_format_str;
  };
  let productname = null;
  if (!value.masterData.staged.name.fr) {
    productname = (
      <DetailDiv>
        <BoldTitle>
          <h3>
            {locale === "en"
              ? value.masterData.staged.name.en
              : value.masterData.staged.name.en}
          </h3>
        </BoldTitle>
      </DetailDiv>
    );
  } else if (value.masterData.staged.name.fr) {
    productname = (
      <DetailDiv>
        <BoldTitle>
          <h3>
            {locale === "en"
              ? value.masterData.staged.name.en
              : value.masterData.staged.name.fr}
          </h3>
        </BoldTitle>
      </DetailDiv>
    );
  }

  let productminiimage = null;

  if (value.masterData.staged) {
    productminiimage = (
      <Box1>
        <Smallimgbox>
          <Smallimg>
            <MiniImage
              src={value.masterData.staged.masterVariant.images[0].url}
            />
          </Smallimg>
          <Smallimg>
            <MiniImage
              src={value.masterData.staged.masterVariant.images[0].url}
            />
          </Smallimg>
          <Smallimg>
            <MiniImage
              src={value.masterData.staged.masterVariant.images[0].url}
            />
          </Smallimg>
          <Smallimg>
            <MiniImage
              src={value.masterData.staged.masterVariant.images[0].url}
            />
          </Smallimg>
          <Smallimg>
            <MiniImage
              src={value.masterData.staged.masterVariant.images[0].url}
            />
          </Smallimg>
        </Smallimgbox>
        <Div>
          <MainImgDiv>
            <MainImage
              src={value.masterData.staged.masterVariant.images[0].url}
            />
          </MainImgDiv>
        </Div>
      </Box1>
    );
  } else if (!value.masterData.staged) {
    productminiimage = (
      <Box1>
        <Smallimgbox>
          <Smallimg>
            <MiniImage
              src={value.masterData.staged.masterVariant.images[0].url}
            />
          </Smallimg>
          <Smallimg>
            <MiniImage
              src={value.masterData.staged.masterVariant.images[0].url}
            />
          </Smallimg>
          <Smallimg>
            <MiniImage
              src={value.masterData.staged.masterVariant.images[0].url}
            />
          </Smallimg>
          <Smallimg>
            <MiniImage
              src={value.masterData.staged.masterVariant.images[0].url}
            />
          </Smallimg>
          <Smallimg>
            <MiniImage
              src={value.masterData.staged.masterVariant.images[0].url}
            />
          </Smallimg>
        </Smallimgbox>
        <Div>
          <MainImgDiv>
            <MainImage
              src={value.masterData.staged.masterVariant.images[0].url}
            />
          </MainImgDiv>
        </Div>
      </Box1>
    );
  }
  let productpricedetail = null;

  if (value.masterData.staged.masterVariant.prices.length > 1) {
    productpricedetail = (
      <DetailDiv>
        <h4 style={{ color: "yellow" }}>
          {locale === "en" ? (
            <p>
              ${" "}
              {parseFloat(
                value.masterData.staged.masterVariant.prices[2].value
                  .centAmount  
              )}
            </p>
          ) : (
            <p>
              €{" "}
              {parseFloat(
                value.masterData.staged.masterVariant.prices[0].value
                  .centAmount  
              )}
            </p>
          )}
        </h4>
      </DetailDiv>
    );
  } else {
    productpricedetail = (
      <DetailDiv>
        <h4 style={{ color: "yellow" }}>
          {locale === "en" ? (
            <p>
              ${" "}
              {parseFloat(
                value.masterData.staged.masterVariant.prices[0].value
                  .centAmount  
              )}
            </p>
          ) : (
            <p>
              €{" "}
              {parseFloat(
                value.masterData.staged.masterVariant.prices[0].value
                  .centAmount  
              )}
            </p>
          )}
        </h4>
      </DetailDiv>
    );
  }

  let productcolordetail = null;
  let productsizedetail = null;
  if (value.masterData.staged.masterVariant.attributes.length == 2) {
    productcolordetail = (
      <DetailDiv>
        <ul>
          <li>{t.Style}: 555088-402</li>
          <li>
            {t.Color}:{" "}
            {value.masterData.staged.masterVariant.attributes[0].value}
          </li>
        </ul>
      </DetailDiv>
    );

    productsizedetail = (
      <DetailDiv>
        {t.MensSize}
        <ButtonDiv>
          <Btn12>
            {" "}
            {value.masterData.staged.masterVariant.attributes[1].value}{" "}
          </Btn12>
        </ButtonDiv>{" "}
      </DetailDiv>
    );
  } else if (value.masterData.staged.masterVariant.attributes.length > 2) {
    productcolordetail = (
      <DetailDiv>
        <ul>
          <li>{t.Style}: 555088-402</li>
          <li>
            {t.Color}:{" "}
            {value.masterData.staged.masterVariant.attributes[1].value.key}
          </li>
        </ul>
      </DetailDiv>
    );

    productsizedetail = (
      <DetailDiv>
        {t.MensSize}
        <ButtonDiv>
          <Btn12>
            {" "}
            {value.masterData.staged.masterVariant.attributes[2].value}{" "}
          </Btn12>
        </ButtonDiv>{" "}
      </DetailDiv>
    );
  }
  let productdescriptiondetail = null;
  if (value.masterData.staged.description) {
    if (!value.masterData.staged.description.fr) {
      productdescriptiondetail = (
        <Paragraph>
          {locale === "en"
            ? value.masterData.staged.description.en
            : value.masterData.staged.description.en}
        </Paragraph>
      );
    } else if (value.masterData.staged.description.fr) {
      productdescriptiondetail = (
        <Paragraph>
          {locale === "en"
            ? value.masterData.staged.description.en
            : value.masterData.staged.description.fr}
        </Paragraph>
      );
    }
  }

  let reviewdata = props.review;
  let reviewDataa1 = null;
  let reviewDataa2 = null;
  let reviewSuccessLine = null;

  let n = 0;
  for (var i = 0; i < reviewdata.items.length && n < 2; i++) {
    if (value.id == reviewdata.items[i].fields.productId) {
      n = n + 1;
      if (n == 1) {
        reviewDataa1 = (
          <p style={{ overflowWrap: "anywhere", width: "98.5%" }}>
            {gettimestamp()} <br></br>
            <b>{t.Name}</b>:&nbsp; {reviewdata.items[i].fields.customerName}
            <br></br> <b>{t.Review}</b>: &nbsp;
            {reviewdata.items[i].fields.review}
          </p>
        );
      }

      if (n == 2) {
        reviewDataa2 = (
          <p style={{ overflowWrap: "anywhere", width: "98.5%" }}>
            {gettimestamp()} <br></br> <b>{t.Name}</b>:&nbsp;
            {reviewdata.items[i].fields.customerName} <br></br>{" "}
            <b>{t.Review}</b>:&nbsp;
            {reviewdata.items[i].fields.review}
          </p>
        );
      }
    }
    if (reviewsuccess == true) {
      reviewSuccessLine = (
        <p style={{ color: "green" }}>{t.ReviewScuccessMsg}</p>
      );
    }
  }

  let newfirstreview = null;
  if (newname !== "") {
    newfirstreview = (
      <p style={{ overflowWrap: "anywhere", width: "98.5%" }}>
        {gettimestamp()} <br></br> <b>{t.Name}</b>:&nbsp;{newname}
        <br></br>
        <b>{t.Review}</b>:&nbsp; {newreview}
      </p>
    );
  }
  let noreview = null;
  if (newfirstreview == null && reviewDataa1 == null && reviewDataa2 == null) {
    noreview = <p>{t.NoReviewYet}</p>;
  }

  function generateHexString(length) {
    var ret = "";
    while (ret.length < length) {
      ret += Math.random().toString(16).substring(2);
    }
    return ret.substring(0, length);
  }


  const setReviewState = () => {
    setreviewstate(!reviewstate);
  };

  let [reviewupdated, setreviewupdated] = useState("");

  async function contentfulConnection() {
    setnewreview(review);
    setnewname(name);
    let valVal = generateHexString(14);
    let title = "sadasfdasd" + valVal;
    const client = createClientD({
      space: "27dvrilv9g9m",
      accessToken: "7eR1gkrfTTlkiHY0BP-gqdqB3RBm_z6E6EB1xYljiQo",
    });
    const contentful_res = await client.getEntries({ content_type: "review" });

    const clientMgmt = createClientM({
      accessToken: "CFPAT-AdkPC8W7-sbANTEblPE4YpCoBSBqoRiPPxc8VtqGfPw",
    });
    const space = await clientMgmt.getSpace("27dvrilv9g9m");
    const env = await space.getEnvironment("master");


    const fileData = {
      fields: {
        title: {
          "en-US": title,
        },
        file: {
          "en-US": {
            contentType: "image/jpeg",
            fileName: title + ".jpg",
            upload:
              "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
          },
        },
      },
    };

    env
      .createAsset(fileData)
      .then((asset) => asset.processForAllLocales())
      .then((asset) => asset.publish())
      .then(function (asset) {
        return env.createEntry("review", {
          fields: {
            productId: {
              "en-US": value.id,
            },
            review: {
              "en-US": review,
            },
            customerName: {
              "en-US": name,
            },
            customerEmail: {
              "en-US": email,
            },
          },
        });
      })
      .then(function (entry) {
        entry.publish();
        console.log("Entry", entry);
      })
      .catch("aasd" + console.error)
      .finally(console.log("asda"));

    analytics.track("Review button clicked", {
      title: "How to Create a Tracking Plan",
      course: "Intro to Analytics",
    });
    setTimeout(function () {
      setReviewState(!reviewstate);
      setreviewsuccess(true);
    }, 1000);
  }

  const CartButton = () => {
    analytics.track("Cart button clicked", {
      title: "How to Create a Tracking Plan",
      course: "Intro to Analytics",
    });
  };

  if (value !== undefined) {
    return (
      <Container>
        <Maindiv>
          <LeftDiv>
            {productminiimage}

            <Box3>
              <DetailDiv>
                <BoldTitle>{t.Description}</BoldTitle>
              </DetailDiv>
              <DetailDiv>{productdescriptiondetail}</DetailDiv>
            </Box3>

            <Box4>
              <div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div>
                    <BoldTitle>{t.CustomerReview}</BoldTitle>
                    <div>
                      <br></br>
                      <div>
                        {noreview}
                        {newfirstreview}

                        {reviewDataa1}
                        {reviewDataa2}
                        {reviewSuccessLine}
                      </div>
                      <div>
                        <MainButton onClick={setReviewState.bind()}>
                          <BoldTitle>{t.WriteReview}</BoldTitle>
                        </MainButton>
                      </div>
                    </div>
                  </div>
                </div>
                <ReviewPopup trigger={reviewstate} setTrigger={setReviewState}>
                  <h5 style={{ color: "grey" }}>{t.NewReview}</h5>
                  <div style={{ paddingTop: "15px", color: "black" }}>
                    <div
                      style={{ marginLeft: "-0.5rem", marginRight: "0.5rem" }}
                    >
                      {" "}
                      <input
                        style={{
                          width: "100%",
                          padding: "0.3rem",
                          marginBottom: "0.5rem",
                          marginTop: "0.5rem",
                          marginLeft: "0.5rem",
                          marginRight: "0.5rem",
                        }}
                        type="text"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        placeholder={t.Name}
                      />
                      <br />
                      <input
                        style={{
                          width: "100%",
                          padding: "0.3rem",
                          marginBottom: "0.5rem",
                          marginTop: "0.5rem",
                          marginLeft: "0.5rem",
                          marginRight: "0.5rem",
                        }}
                        type="text"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        placeholder={t.Email}
                      />
                      <br />
                      <textarea
                        style={{
                          width: "100%",
                          padding: "0.3rem",
                          marginBottom: "0.5rem",
                          marginTop: "0.7rem",
                          marginLeft: "0.5rem",
                          marginRight: "0.5rem",
                        }}
                        type="text"
                        value={review}
                        onChange={(e) => setreview(e.target.value)}
                        placeholder={t.ReviewPlaceholder}
                      />
                      <br />
                    </div>
                    <div style={{ marginLeft: "21rem" }}>
                      <button
                        onClick={setReviewState.bind()}
                        style={{
                          color: "grey",
                          backgroundColor: "white",
                          border: "none",
                          paddingRight: "15px",
                        }}
                      >
                        {t.Cancel}
                      </button>
                      <button
                        style={{
                          borderRadius: "12px",
                          border: "none",
                          backgroundColor: "rgb(136,77,249)",
                          width: "138px",
                          color: "white",
                        }}
                        onClick={contentfulConnection.bind()}
                      >
                        <BoldTitle>{t.Save}</BoldTitle>
                      </button>
                    </div>
                  </div>
                </ReviewPopup>
              </div>
            </Box4>
          </LeftDiv>
          <RightDiv>
            <Box2>
              <div className={classes.paddingstar}>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <p>
                  <b>{t.NoReview}</b>
                </p>
              </div>

              {productname}
              {productpricedetail}
              {productcolordetail}
              <DetailDiv>{t.DiscountHeading}</DetailDiv>
              <hr />
              {productsizedetail}
              <div
                style={{
                  paddingLeft: "15px",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                }}
              >
                {locale === "en" ? (
                  <MainButton
                    onClick={CartButton.bind()}
                    className="snipcart-add-item"
                    data-item-id={value.id}
                    data-item-price={parseFloat(
                      value.masterData.staged.masterVariant.prices[0].value
                        .centAmount  
                    )}
                    data-item-url={`/Products/${value.id}`}
                    data-item-image={
                      value.masterData.staged.masterVariant.images[0].url
                    }
                    data-item-description={value.masterData.staged.description.en}
                    data-item-image={
                      value.masterData.staged.masterVariant.images[0].url
                    }
                    data-item-name={value.masterData.staged.name.en}
                  >
                    <BoldTitle>{t.AddToCart}</BoldTitle>
                  </MainButton>
                ) : (
                  <MainButton
                    onClick={CartButton.bind()}
                    className="snipcart-add-item"
                    data-item-id={value.id}
                    data-item-price={parseFloat(
                      value.masterData.staged.masterVariant.prices[0].value
                        .centAmount  
                    )}
                    data-item-url={`/fr/Products/${value.id}`}
                    data-item-image={
                      value.masterData.staged.masterVariant.images[0].url
                    }
                    data-item-description={value.masterData.staged.description.en}
                    data-item-image={
                      value.masterData.staged.masterVariant.images[0].url
                    }
                    data-item-name={value.masterData.staged.name.fr}
                  >
                    <BoldTitle>{t.AddToCart}</BoldTitle>
                  </MainButton>
                )}
              </div>
            </Box2>
          </RightDiv>
        </Maindiv>
      </Container>
    );
  }
};

export default ProductDetail;
