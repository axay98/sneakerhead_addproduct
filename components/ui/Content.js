import Product from "./Hit";
import {
  Container,
  MainDiv,
  SubDiv,
  Name,
  Price,
  Bold,
  Title,
} from "./Content.style";

import en from "./lang/en";
import fr from "./lang/fr";
import { useRouter } from "next/router";

const Content = ({ value }) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : fr;

  return (
    <Container>
      <MainDiv>
        <SubDiv>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginRight: "11%",
            }}
          >
            <Title>
              <h3>
                <Bold>{t.Heading_Homepage}</Bold>
              </h3>
            </Title>
            <Title>
              <h5
                style={{ color: "yellow" , cursor:"pointer"}}
                onClick={() => {
                  router.push("/search");
                }}
              >
                <Bold>{t.VIEWALL} </Bold>
              </h5>
            </Title>
          </div>
          {value.map((result) => (
            <Product key={result.id} value={result} />
          ))}
        </SubDiv>
      </MainDiv>
    </Container>
  );
};
export default Content;
