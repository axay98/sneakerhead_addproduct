import { RefinementList, Menu } from "react-instantsearch-dom";
import { FacetDiv, Div } from "./product.style";
import en from "./lang/en";
import fr from "./lang/fr";
import { useRouter } from "next/router";

const Facet = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : fr;

  return (
    <FacetDiv>
      <Div>{t.Filter}</Div>
      <RefinementList attribute="hit.masterData.staged.masterVariant.attributes.name

" />
    </FacetDiv>
  );
};

export default Facet;
