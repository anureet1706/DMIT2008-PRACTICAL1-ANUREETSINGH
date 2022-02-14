import { ref as storageRef, uploadBytes, getDownloadURL, connectStorageEmulator } from "firebase/storage";
import {ref as databaseRef, push, set, get, remove} from 'firebase/database'
import { db, storage  } from "./libs/firebase/firebaseConfig";


async function pageInit(){
    const key = sessionStorage.getItem('key')
    console.log("Delete Page")
    console.log(key)
    // key
    // button  remove()
    // get data from RTD
    const rentalRef = databaseRef(db, `products/${key}`)
    rentalRef.remove()
   
  }
  
  
  pageInit();