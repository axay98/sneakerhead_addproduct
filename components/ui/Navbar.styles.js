import styled from "styled-components";

export const Nav = styled.nav`
  background-color: #000;
  height: 65px;
  display: flex;
  justify-content: space-between;

  z-index: 12;
`;

export const SecondaryNav = styled.nav`
  background-color: #151515;
  height: 65px;
  display: flex;
  justify-content: space-between;
  overflow-x: hidden;
  overflow-y: hidden;
  z-index: 12;
`;

export const Title = styled.b`
  padding-left: 5px;
  color: white;
  font-size: 20px;
`;

export const SearchForm = styled.form`
  padding-left: 10px;
  display: flex;
  flex-direction: row;
`;
export const AlgoliaSearchInput = styled.input`
  width: 750px;
  display: block;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.25rem;
`;
export const SearchInput = styled.input`
  width: 750px;
  display: block;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.25rem;
`;

export const NavMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  // margin-right: -24px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const SearchButton = styled.button`
  background-color: yellow;

  border-radius: 0.25rem;
`;

export const NavLink = styled.a`
  color: white;
  font-size: 15px;
  padding-left: 15px;
  text-decoration: none;
  cursor: pointer;
`;

export const Div = styled.div`
  // margin-left: 27%;
  width: 100%;
  padding-top: 20px;
`;
