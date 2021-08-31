import { useRouter } from "next/router";
import {
  Container,
  SubDiv,
  Div,
  ProductDiv,
  Name,
  Price,
  ContentDiv,
  ButtonDiv,
  Button1,
  Button2,
  Bold,
} from "./product.style";
import { connectHitInsights } from "react-instantsearch-dom";
const mycart = [];
import aa from "search-insights";
import en from "./lang/en";
import fr from "./lang/fr";
import { algoliaindex } from "../../pages/Cred";
const Product = ({ hit }) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : fr;
  let cartitemnameen = null;
  let cartitemnamefr = null;
  let cartitemdescriptionen = null ;
  let cartitemdescriptionfr = null ;
  let cartitemprice = null ;
  let cartitemurl = null;

  let cartitemfr  = null ;
  let cartitemen = null ;
  let producturldiv = null;
  let productcontentdiv = null;
  let addtocartbuttonen = null ;
  let addtocartbuttonfr = null ;

  
  const CartButton = (id) => {
    // aa("viewedObjectIDs", {
    //   index: algoliaindex,
    //   userToken: "user-1",
    //   eventName: "Added to Cart",
    //   objectIDs: [hit.objectID],
    // });

    analytics.track("Cart button clicked", {
      title: "How to Create a Tracking Plan",
      course: "Intro to Analytics",
    });
  };


  if (hit.masterData.staged) {

 
    producturldiv = (
      <SubDiv>
        <img
          style={{ width: "130px" }}
          src={hit.masterData.staged.masterVariant.images[0].url}
        />
      </SubDiv>
    );
cartitemurl =  hit.masterData.staged.masterVariant.images[0].url;
cartitemprice =  hit.masterData.staged.masterVariant.prices[0].value.centAmount ; 
    if(!hit.masterData.staged.description.fr)
    {
      cartitemdescriptionen = cartitemdescriptionfr = hit.masterData.staged.description.en;
    }
    else
    {
      cartitemdescriptionfr = hit.masterData.staged.description.fr;
    }
    if (!hit.masterData.staged.name.fr) {
      cartitemnameen = cartitemnamefr = hit.masterData.staged.name.en;
      
      productcontentdiv = (
        <ContentDiv>
          <Name>
            <Bold>
              {locale === "en"
                ? hit.masterData.staged.name.en
                : hit.masterData.staged.name.en}
            </Bold>
          </Name>
          <Price>
            {locale === "en" ? (
              <p>
                ${" "}
                {parseFloat(
                  hit.masterData.staged.masterVariant.prices[0].value
                    .centAmount  
                )}
              </p>
            ) : (
              <p>
                €{" "}
                {parseFloat(
                  hit.masterData.staged.masterVariant.prices[0].value
                    .centAmount  
                )}
              </p>
            )}
          </Price>
        </ContentDiv>
      );
    } else if (hit.masterData.staged.name.fr) {
      cartitemnamefr = hit.masterData.staged.name.fr;
      productcontentdiv = (
        <ContentDiv>
          <Name>
            <Bold>
              {locale === "en"
                ? hit.masterData.staged.name.en
                : hit.masterData.staged.name.fr}
            </Bold>
          </Name>
          <Price>
            {locale === "en" ? (
              <p>
                ${" "}
                {parseFloat(
                  hit.masterData.staged.masterVariant.prices[0].value
                    .centAmount  
                )}
              </p>
            ) : (
              <p>
                €{" "}
                {parseFloat(
                  hit.masterData.staged.masterVariant.prices[0].value
                    .centAmount
                )}
              </p>
            )}
          </Price>
        </ContentDiv>
      );
    }
  } else if (hit.masterData.productProjection) {

    if(!hit.masterData.productProjection.description.fr)
    {
      cartitemdescriptionen = cartitemdescriptionfr = hit.masterData.productProjection.description.en;
    }
    else
    {
      cartitemdescriptionfr = hit.masterData.productProjection.description.en;
    }

    if(!hit.masterData.productProjection.name.fr)
    {
      cartitemnameen = cartitemnamefr = hit.masterData.productProjection.name.en;
    }
    else
    {
       cartitemnamefr = hit.masterData.productProjection.name.fr;
    }

    cartitemprice = hit.masterData.productProjection.masterVariant.prices[0].value.centAmount;
    
cartitemurl = hit.masterData.productProjection.masterVariant.images[0].url;

    producturldiv = (
      <SubDiv>
        <img
          style={{ width: "130px" }}
          src={hit.masterData.productProjection.masterVariant.images[0].url}
        />
      </SubDiv>
    );
    if (hit.masterData.productProjection.name.fr) {
      cartitemnamefr = hit.masterData.productProjection.name.fr;
      productcontentdiv = (
        <ContentDiv>
          <Name>
            <Bold>
              {locale === "en"
                ? hit.masterData.productProjection.name.en
                : hit.masterData.productProjection.name.fr}
            </Bold>
          </Name>
          <Price>
            {locale === "en" ? (
              <p>
                ${" "}
                {parseFloat(
                  hit.masterData.productProjection.masterVariant.prices[0].value
                    .centAmount 
                )}
              </p>
            ) : (
              <p>
                €{" "}
                {parseFloat(
                  hit.masterData.productProjection.masterVariant.prices[0].value
                    .centAmount 
                )}
              </p>
            )}
          </Price>
        </ContentDiv>
      );
    } else {
      cartitemen = cartitemfr = hit.masterData.productProjection.name.en;
      productcontentdiv = (
        <ContentDiv>
          <Name>
            <Bold>
              {locale === "en"
                ? hit.masterData.productProjection.name.en
                : hit.masterData.productProjection.name.en}
            </Bold>
          </Name>
          <Price>
            {locale === "en" ? (
              <p>
                ${" "}
                {parseFloat(
                  hit.masterData.productProjection.masterVariant.prices[0].value
                    .centAmount  
                )}
              </p>
            ) : (
              <p>
                €{" "}
                {parseFloat(
                  hit.masterData.productProjection.masterVariant.prices[0].value
                    .centAmount  
                )}
              </p>
            )}
          </Price>
        </ContentDiv>
      );
    }
  }



  const ViewButton = (id) => {
    analytics.track("Review button clicked", {
      title: "How to Create a Tracking Plan",
      course: "Intro to Analytics",
    });

    analytics.identify("user-1");

    aa("viewedObjectIDs", {
      index: algoliaindex,
      userToken: "user-1",
      eventName: "Product Viewed",
      objectIDs: [hit.objectID],
    });

    router.push(`/Products/${id}`);
  };


  return (
    <div>
      <Container>
        <ProductDiv>
          {producturldiv}
          {productcontentdiv}
        </ProductDiv>
        <div>
          {locale === "en" ? (
            <ButtonDiv>
             <Button1
    onClick={CartButton.bind(hit.objectID)}
    className="snipcart-add-item"
    data-item-id={hit.objectID}
    data-item-price={cartitemprice}
    data-item-url={`/Products/${hit.objectID}`}
    data-item-image={cartitemurl}
    data-item-description={cartitemdescriptionen}
    data-item-name={cartitemnameen}
  >
    <Bold>{t.AddToCart}</Bold>
  </Button1>
            </ButtonDiv>
          ) : (
            <ButtonDiv>
              <Button1
                onClick={CartButton.bind(hit.objectID)}
                className="snipcart-add-item"
                data-item-id={hit.objectID}
                data-item-price={cartitemprice}
                data-item-url={`/fr/Products/${hit.objectID}`}
                data-item-image={cartitemurl }
                data-item-description={cartitemdescriptionfr}
                data-item-name={cartitemnamefr}
              >
                <Bold>{t.AddToCart}</Bold>
              </Button1>
            </ButtonDiv>
          )}

          <ButtonDiv>
            <Button2
              onClick={() => {
                ViewButton(hit.objectID);
              }}
            >
              <Bold>{t.QuickView}</Bold>
            </Button2>
          </ButtonDiv>
        </div>
      </Container>
    </div>
  );
};

export default Product;
