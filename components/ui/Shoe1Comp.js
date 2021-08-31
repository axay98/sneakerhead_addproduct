import Shoe1product from "./Shoe1product.js";
import { Container, MainDiv, SubDiv } from "./Shoe1.style.js";
import en from "./lang/en";
import fr from "./lang/fr";
import { useRouter } from "next/router";

const Shoe1Comp = ({ value }) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : fr;

  return (
    <Container>
      <MainDiv>
        <SubDiv>
          {value.map((result) => (
            <Shoe1product value={result} />
          ))}
        </SubDiv>
      </MainDiv>
    </Container>
  );
};
export default Shoe1Comp;
