import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [bookID, setBookID] = useState("");
  const [findAuthor, setFindAuthor] = useState("");
  const [resultBooks, setResultBooks] = useState([]);
  const [arrangeBooks, setArrangeBooks] = useState("");
  const [arrangeBooksColl, setArrangeBooksColl] = useState([]);
  const [updateBookID, setUpdateBookID] = useState("");
  const [updateBookTitle, setUpdateBookTitle] = useState("");

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [signEmail, setSignEmail] = useState("");
  const [signPass, setSignPass] = useState("");

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
    const colRef = collection(db, "books");

    const unsubscribe = onSnapshot(colRef, (querySnapshot) => {
      const fetchedBooks = [];
      querySnapshot.forEach((doc) => {
        fetchedBooks.push({ id: doc.id, ...doc.data() });
      });
      setBooks(fetchedBooks);
    });

    return () => {
      unsubscribe();
    };
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

  const handleDeleteBook = (event) => {
    event.preventDefault();

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

    const docRef = doc(db, "books", bookID);
    deleteDoc(docRef);

    setBookID("");
  };

  const handleFindBooksByAuthor = (event) => {
    event.preventDefault();

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
    const colRef = collection(db, "books");
    const userQuery = query(colRef, where("author", "==", findAuthor));

    onSnapshot(userQuery, (snapshot) => {
      let books = [];
      snapshot.docs.forEach((doc) => {
        books.push({ id: doc.id, ...doc.data() });
      });
      console.log(books);
      setResultBooks(books);
    });
  };

  const handleBookOrder = (event) => {
    event.preventDefault();

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
    const colRef = collection(db, "books");
    const userQuery = query(colRef, orderBy("title", arrangeBooks));

    onSnapshot(userQuery, (snapshot) => {
      let books = [];
      snapshot.docs.forEach((doc) => {
        books.push({ id: doc.id, ...doc.data() });
      });
      setArrangeBooksColl(books);
    });
  };

  const handleUpdate = (event) => {
    event.preventDefault();

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
    const docRef = doc(db, "books", updateBookID);

    updateDoc(docRef, {
      title: updateBookTitle,
    });
  };

  const handleSignUpUser = (event) => {
    event.preventDefault();

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, userEmail, userPassword).then(
      (cred) => {
        console.log(cred, cred.user);

        userEmail = "";
        userPassword = "";
      },
    );
  };

  const handleSignOut = (event) => {
    event.preventDefault();

    const auth = getAuth();
    signOut(auth).then(() => {
      console.log("user signed out");
    });
  };

  const handleSignIn = (event) => {
    event.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, signEmail, signPass).then((cred) => {
      console.log("user signed in", cred.user);
    });
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

      <div>
        <h1>Delete a Book</h1>

        <form onSubmit={handleDeleteBook}>
          <div>
            <label>book id: </label>
            <input
              type="text"
              value={bookID}
              onChange={(e) => setBookID(e.target.value)}
            />
          </div>
          <input type="submit" />
        </form>
      </div>

      <div>
        <h1>Search a Book By Author</h1>
        <ul>
          {resultBooks.map((book, index) => (
            <li key={index}>{book.title}</li>
          ))}
        </ul>

        <form onSubmit={handleFindBooksByAuthor}>
          <div>
            <label>author: </label>
            <input
              type="text"
              value={findAuthor}
              onChange={(e) => setFindAuthor(e.target.value)}
            />
          </div>
          <input type="submit" />
        </form>
      </div>

      <div>
        <h1>Order Books</h1>

        <ul>
          {arrangeBooksColl.map((book, index) => (
            <li key={index}>
              {book.title}, {book.author}
            </li>
          ))}
        </ul>

        <form onSubmit={handleBookOrder}>
          <div>
            <label>order by: </label>
            <select
              value={arrangeBooks}
              onChange={(e) => setArrangeBooks(e.target.value)}
            >
              <option value="">Select Book Arrangement</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          <input type="submit" />
        </form>
      </div>

      <div>
        <h1>Update Document</h1>

        <form onSubmit={handleUpdate}>
          <div>
            <label>title: </label>

            <input
              type="text"
              value={updateBookTitle}
              onChange={(e) => setUpdateBookTitle(e.target.value)}
            />
          </div>
          <div>
            <label>book id: </label>

            <input
              type="text"
              value={updateBookID}
              onChange={(e) => setUpdateBookID(e.target.value)}
            />
          </div>
          <input type="submit" />
        </form>
      </div>

      <div>
        <h1>Create User</h1>
        <form onSubmit={handleSignUpUser}>
          <div>
            <label>Email: </label>
            <input
              type="text"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password: </label>
            <input
              type="text"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </div>
          <input type="submit" />
        </form>
      </div>

      <div>
        <form onClick={handleSignOut}>
          <h1>Logout</h1>
          <input type="submit" />
        </form>
      </div>

      <div>
        <h1>Log In</h1>

        <form onClick={handleSignIn}>
          <div>
            <label>Email: </label>
            <input
              type="text"
              value={signEmail}
              onChange={(e) => setSignEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password: </label>
            <input
              type="text"
              value={signPass}
              onChange={(e) => setSignPass(e.target.value)}
            />
          </div>
          <input type="submit" />
        </form>
      </div>
    </>
  );
}

export default App;
