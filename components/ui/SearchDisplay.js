import { Hits, HitsPerPage, Stats } from "react-instantsearch-dom";
import Hit from "./Product";
import { Div, Container, HitDiv } from "./SearchPage.style";

import en from "./lang/en";
import fr from "./lang/fr";
import { useRouter } from "next/router";

const SearchDisplay = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : fr;

  return (
    <Div>
      <Container>
        <Div>
          <Stats />
        </Div>
        <HitDiv>
          <HitsPerPage
            defaultRefinement={6}
            items={[
              { value: 6, label: [t.Disp1] },
              { value: 12, label: [t.Disp2] },
            ]}
          />
        </HitDiv>
      </Container>

      <Hits hitComponent={Hit} />
    </Div>
  );
};

export default SearchDisplay;
