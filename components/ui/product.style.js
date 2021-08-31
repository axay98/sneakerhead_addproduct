import styled from "styled-components";

export const Container = styled.div`
  background-color: rgb(39, 36, 36);
  margin-right: 5%;
  // width:95%;
  border: solid 0.5px rgb(247, 244, 240);
  // display: inline-block;
  padding: 15px;
  // list-style:none;
  // justify-content: end;
  // align-items: flex-start;
  display: flex;
  // flex-direction: row;
`;

export const Div = styled.div``;
export const ProductDiv = styled.div`
  justify-content: end;
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  width: 410px;
`;

export const SubDiv = styled.div`
  width: 30%;
`;

export const Price = styled.div`
  color: yellow;
`;

export const Name = styled.div`
  color: white;
`;

export const ContentDiv = styled.div`
  width: 100%;
  padding-left: 20px;
`;

export const ButtonDiv = styled.div`
  padding-left: 15px;
  padding-top: 10px;
  padding-bottom: 15px;
`;
export const Button1 = styled.button`
  width: 150px;
  color: white;
  background-color: #ffc107;
  border-color: #ffc107;
`;

export const Button2 = styled(Button1)`
  background-color: rgb(39, 36, 36);
`;

export const Bold = styled.b``;

export const FacetDiv = styled.div`
  background-color: rgb(39, 36, 36);
  width: 55%;
  border-top: solid 0.5px rgb(247, 244, 240);
  border-bottom: solid 0.5px rgb(247, 244, 240);
  border-left: solid 0.5px rgb(247, 244, 240);
  border-right: solid 0.5px rgb(247, 244, 240);

  padding-top: 15px;
  padding-left: 25px;
  padding-right: 15px;
  padding-bottom: 15px;
  color: white;
`;
