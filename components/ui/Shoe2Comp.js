import Shoe2product from "./Shoe2product.js";
import { Container, MainDiv, SubDiv } from "./Shoe2.style.js";
import en from "./lang/en";
import fr from "./lang/fr";
import { useRouter } from "next/router";

const Shoe2Comp = ({ value }) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : fr;

  return (
    <Container>
      <MainDiv>
        <SubDiv>
          {value.map((result) => (
            <Shoe2product value={result} />
          ))}
        </SubDiv>
      </MainDiv>
    </Container>
  );
};
export default Shoe2Comp;
