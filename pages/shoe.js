import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useRouter } from "next/router";

function Shoe() {
  const router = useRouter();
  const goToURL = (e) => {
    e.preventDefault();
    router.push("/");
  };
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
      />
      <Card.Body>
        <Card.Title>Single pair of Shoes</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button onClick={goToURL} variant="primary">
          Home
        </Button>
        {/* <Button onClick={goToURL('someshoe')} variant="primary">Home</Button> */}
      </Card.Body>
    </Card>
  );
}

export default Shoe;
