import { ProductDiv, Name, Price, Bold, Div } from "./Sale2.style.js";
import Link from "next/link";
import en from "./lang/en";
import fr from "./lang/fr";
import { useRouter } from "next/router";

const Sale2product = ({ value }) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : fr;
  let productname = null;
  if (!value.masterData.staged.name.fr) {
    productname = (
      <Name>
        <Bold>
          {locale === "en"
            ? value.masterData.staged.name.en
            : value.masterData.staged.name.en}
        </Bold>
      </Name>
    );
  } else if (value.masterData.staged.name.fr) {
    productname = (
      <Name>
        <Bold>
          {locale === "en"
            ? value.masterData.staged.name.en
            : value.masterData.staged.name.fr}
        </Bold>
      </Name>
    );
  }

  return (
    <ProductDiv key={value.id}>
      <Link href="/Products/[id]" as={`/Products/${value.id}`}>
        <Div>
          <Div>
            <img
              style={{ width: "200px", height: "150px" }}
              src={value.masterData.staged.masterVariant.images[0].url}
            />
          </Div>
          <Div>
            {productname}
            <Price>
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
            </Price>
          </Div>
        </Div>
      </Link>
    </ProductDiv>
  );
};

export default Sale2product;
