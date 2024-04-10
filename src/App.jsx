import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyBe7NJHkJAWBwkrFRCaqy4kPi6fL1NPoXk",
      authDomain: "learnfirebase-82d14.firebaseapp.com",
      projectId: "learnfirebase-82d14",
      storageBucket: "learnfirebase-82d14.appspot.com",
      messagingSenderId: "491316288982",
      appId: "1:491316288982:web:a355ef4411c9b31fcb9877",
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const fetchBooks = async () => {
      const colRef = collection(db, "books");
      const querySnapshot = await getDocs(colRef);

      const fetchedBooks = [];
      querySnapshot.forEach((doc) => {
        fetchedBooks.push(doc.data());
        console.log(doc.data());
      });
      setBooks(fetchedBooks);
    };

    fetchBooks();
  }, []);

  const handleSubmitBook = (event) => {
    event.preventDefault();

    console.log(title);
    console.log(author);

    const firebaseConfig = {
      apiKey: "AIzaSyBe7NJHkJAWBwkrFRCaqy4kPi6fL1NPoXk",
      authDomain: "learnfirebase-82d14.firebaseapp.com",
      projectId: "learnfirebase-82d14",
      storageBucket: "learnfirebase-82d14.appspot.com",
      messagingSenderId: "491316288982",
      appId: "1:491316288982:web:a355ef4411c9b31fcb9877",
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    addDoc(collection(db, "books"), {
      title: title,
      author: author,
    });

    setTitle("");
    setAuthor("");
  };

  return (
    <>
      <div>
        <h1>Get Books</h1>
        <ul>
          {books.map((book, index) => (
            <li key={index}>{book.title}</li>
          ))}
        </ul>
      </div>

      <div>
        <h1>Add a Book</h1>

        <form onSubmit={handleSubmitBook}>
          <div>
            <label>title: </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label>author: </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <input type="submit" />
        </form>
      </div>
    </>
  );
}

export default App;
