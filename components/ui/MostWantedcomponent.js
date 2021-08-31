import {
  Container,
  MainDiv,
  SubDiv,
  Name,
  Price,
  Bold,
  Title,
} from "./MostWanted.style";
import MostWantedProduct from "./MostWantedproduct";

const MostWantedcomponent = ({ value }) => {
  return (
    <Container>
      <MainDiv>
        <SubDiv>
          {value.map((result) => (
            <MostWantedProduct key={result.id} value={result} />
          ))}
        </SubDiv>
      </MainDiv>
    </Container>
  );
};
export default MostWantedcomponent;
