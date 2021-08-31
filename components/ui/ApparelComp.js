import ApparelProduct from "./Apparelproduct";
import React from "react";
import {
  Container,
  MainDiv,
  SubDiv,
  Name,
  Price,
  Bold,
  Title,
} from "./Apparel.style";
import en from "./lang/en";
import fr from "./lang/fr";
import { useRouter } from "next/router";

const ApparelComp = ({ value }) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : fr;

  return (
    <Container>
      <MainDiv>
        <SubDiv>
          {value.map((result) => (
            <ApparelProduct key={result.id} value={result} />
          ))}
        </SubDiv>
      </MainDiv>
    </Container>
  );
};
export default ApparelComp;
