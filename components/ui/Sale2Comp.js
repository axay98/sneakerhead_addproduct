import Sale2product from "./Sale2product.js";
import { Container, MainDiv, SubDiv } from "./Sale2.style.js";
import en from "./lang/en";
import fr from "./lang/fr";
import { useRouter } from "next/router";

const Sale2Comp = ({ value }) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : fr;

  return (
    <Container>
      <MainDiv>
        <SubDiv>
          {value.map((result) => (
            <Sale2product value={result} />
          ))}
        </SubDiv>
      </MainDiv>
    </Container>
  );
};
export default Sale2Comp;
