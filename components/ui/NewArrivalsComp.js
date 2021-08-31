import NewArrivalsProduct from "./NewArrivalsProduct";
import { Container, MainDiv, SubDiv } from "./NewArrivals.styles.js";

import en from "./lang/en";
import fr from "./lang/fr";
import { useRouter } from "next/router";

const NewArrivalsComp = ({ value }) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : fr;

  return (
    <Container>
      <MainDiv>
        <SubDiv>
          {value.map((result) => (
            <NewArrivalsProduct value={result} />
          ))}
        </SubDiv>
      </MainDiv>
    </Container>
  );
};
export default NewArrivalsComp;
