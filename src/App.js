import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import NotFound from "./pages/NotFound";
import Nav from "./components/Nav";
import { useEffect, useState } from "react";

function App() {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    const getContacts = async () => {
      const contactsFormServer = await fetchContacts();
      setContacts(contactsFormServer);
      // setContacts(fetchContacts())
    };
    getContacts();
  }, []);

  const fetchContacts = async () => {
    const res = await fetch("http://localhost:3004/contacts");
    const data = await res.json();
    return data;
  };
  const formSub = async (data) => {
    const res = await fetch("http://localhost:3004/contacts", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const newdata = await res.json();
    setContacts([...contacts, newdata]);
  };
  const deleteContact = async (id) => {
    const res = await fetch(`http://localhost:3004/contacts/${id}`, {
      method: "DELETE",
    });
    if (res.status === 200) {
      let newContact = contacts.filter((singleContact) => {
        return singleContact.id !== id;
      });
      setContacts(newContact);
    }
  };
  const favToggle = (id) => {
  const singleCon= await getCon(id)
    let updatedContact = contacts.map((singleContact) => {
      return singleContact.id === id
        ? { ...singleContact, fav: !singleContact.fav }
        : singleContact;
    });
    setContacts(updatedContact);
  };
  const getCon = async (id) => {
    const res = await fetch(`http://localhost:3004/contacts/${id}`);
    const data = await res.json();
    return data;
  };
  return (
    <Router>
      <Nav />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              formSub={formSub}
              contacts={contacts}
              deleteContact={deleteContact}
              favToggle={favToggle}
            />
          }
        ></Route>
        <Route
          exact
          path="/favorite"
          element={
            <Favorite
              contacts={contacts}
              deleteContact={deleteContact}
              favToggle={favToggle}
            />
          }
        ></Route>
        <Route exact path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
