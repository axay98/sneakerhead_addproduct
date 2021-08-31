import { ProductDiv, Name, Price, Bold, Div } from "./MostWanted.style";
import Link from "next/link";
import en from "./lang/en";
import fr from "./lang/fr";
import { useRouter } from "next/router";

const MostWantedProduct = ({ value }) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : fr;
  let productname = null;
  if (!value.name.fr) {
    productname = (
      <Name>
        <Bold>{locale === "en" ? value.name.en : value.name.en}</Bold>
      </Name>
    );
  } else if (value.name.fr) {
    productname = (
      <Name>
        <Bold>{locale === "en" ? value.name.en : value.name.fr}</Bold>
      </Name>
    );
  }

  return (
    <ProductDiv key={value.productId}>
      <Link href="/Products/[id]" as={`/Products/${value.productId}`}>
        <Div>
          <Div>
            <img
              style={{ width: "200px", height: "150px" }}
              src={value.variant.images[0].url}
            />
          </Div>
          <Div>
            {productname}
            <Price>
              {locale === "en" ? (
                <p>$ {parseFloat(value.price.value.centAmount  )}</p>
              ) : (
                <p>€ {parseFloat(value.price.value.centAmount  )}</p>
              )}
            </Price>
          </Div>
        </Div>
      </Link>
    </ProductDiv>
  );
};
export default MostWantedProduct;
