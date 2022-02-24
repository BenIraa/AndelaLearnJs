import { initializeApp} from 'firebase/app'
import {
    getFirestore, collection, getDocs, onSnapshot,
    addDoc, deleteDoc, doc
} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyDK6yZSPjlTW63IKLcrTH5vyTAXiWckHqo",
    authDomain: "beniraa-639b8.firebaseapp.com",
    projectId: "beniraa-639b8",
    storageBucket: "beniraa-639b8.appspot.com",
    messagingSenderId: "768639511600",
    appId: "1:768639511600:web:d2d190ec02335a71cf51f5"
  };

  // init firebase app
  initializeApp(firebaseConfig)

  //init service
  const db = getFirestore()

  //collection ref

  const colRef = collection(db, 'books')

  //collection data
//   getDocs(colRef)
//   .then((snapshot) =>{
//     //   console.log(snapshot.docs)
    
//   })
//   .catch(err =>{
//       console.log(err, message)
//   })
  
  //on Real time data

  onSnapshot(colRef, (snapshot) =>{
    let books = []
    snapshot.docs.forEach((doc) =>{
        books.push({...doc.data(), id: doc.id})
    })
    console.log(books)
      

  })

  //adding new documents

  const addBookForm = document.querySelector('.add')
  addBookForm.addEventListener('submit', (e) =>{
      e.preventDefault()
      addDoc(colRef, {
          title: addBookForm.title.value,
          author: addBookForm.author.value,
      })
      .then(() => {
          addBookForm.reset() // Add new doc and stay on the same page
      })

  })

  //deleting documents
  const deleteBookForm = document.querySelector('.delete')
  deleteBookForm.addEventListener('submit', (e) =>{
      e.preventDefault()

      const docRef = doc(db, 'books', deleteBookForm.id.value)

      deleteDoc(docRef)
    .then(() =>{
        deleteBookForm.reset()
    })

  })