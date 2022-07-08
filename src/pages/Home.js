import Contacts from "../components/Contacts";
import Form from "../components/Form";

function Home() {
  return (
    <div className="container my-5">
      <div className="row justify-content-sm-center my-5">
        <Form />
        <Contacts />
      </div>
    </div>
  );
}

export default Home;
