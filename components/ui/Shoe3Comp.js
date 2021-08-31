import Shoe3product from "./Shoe3product.js";
import { Container, MainDiv, SubDiv } from "./Shoe3.style.js";
import en from "./lang/en";
import fr from "./lang/fr";
import { useRouter } from "next/router";

const Shoe3Comp = ({ value }) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : fr;

  return (
    <Container>
      <MainDiv>
        <SubDiv>
          {value.map((result) => (
            <Shoe3product value={result} />
          ))}
        </SubDiv>
      </MainDiv>
    </Container>
  );
};
export default Shoe3Comp;
