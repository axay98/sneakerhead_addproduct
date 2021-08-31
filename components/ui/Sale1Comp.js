import Sale1product from "./Sale1product.js";
import { Container, MainDiv, SubDiv } from "./Sale1.style.js";
import en from "./lang/en";
import fr from "./lang/fr";
import { useRouter } from "next/router";

const Sale1Comp = ({ value }) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : fr;

  return (
    <Container>
      <MainDiv>
        <SubDiv>
          {value.map((result) => (
            <Sale1product value={result} />
          ))}
        </SubDiv>
      </MainDiv>
    </Container>
  );
};
export default Sale1Comp;
