import GearProduct from "./Gearproduct.js";
import {
  Container,
  MainDiv,
  SubDiv,
  Name,
  Price,
  Bold,
  Title,
} from "./Gear.style";

import en from "./lang/en";
import fr from "./lang/fr";
import { useRouter } from "next/router";

const GearComp = ({ value }) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : fr;

  return (
    <Container>
      <MainDiv>
        <SubDiv>
          {value.map((result) => (
            <GearProduct value={result} />
          ))}
        </SubDiv>
      </MainDiv>
    </Container>
  );
};
export default GearComp;
