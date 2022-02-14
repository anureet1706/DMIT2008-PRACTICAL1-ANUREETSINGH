import { ref as storageRef, uploadBytes, getDownloadURL, connectStorageEmulator } from "firebase/storage";
import {ref as databaseRef, push, set, get, remove} from 'firebase/database'
import { db, storage  } from "./libs/firebase/firebaseConfig";

document.querySelector("#productImage").addEventListener("change", onImageSelected);
document.forms["productForm"].addEventListener("submit", onUpdateProduct);

function onUpdateProduct(e) {
  e.preventDefault();
  uploadNewProduct();
}


async function pageInit(){
  const key = sessionStorage.getItem('key')
  console.log("Update Page")
  console.log(key)
  // key
  // get data from RTD
    const rentalRef = databaseRef(db, `products/${key}`);
    const rentalSnapShot = await get(rentalRef)
    const data = rentalSnapShot.val();
    console.log(data);
  // propulate the form with the values
    document.querySelector('#title').value = data.title;
    document.querySelector('#price').value = data.price;
    document.querySelector('#availability').value = data.availability;
    document.querySelector('#model').value = data.model;
    document.querySelector('.display img').src = `${data.urlPath}`
}


function onImageSelected(e) {
  //selected file
  // file objets   [fileObj, fileObj, fileObj]
  let file = e.target.files[0];
  console.log(file)
  // update the display with the requested image
  document.querySelector(".display img").src = URL.createObjectURL(file);
   
  }



async function uploadNewProduct() {
 // Save the edits ... write text
 const title = document.querySelector('#title').value.trim();
 const price = document.querySelector('#price').value.trim();
 const availability = document.querySelector('#availability').value.trim();
 const model = document.querySelector('#model').value.trim();

 const file = document.querySelector('#productImage').files[0] 

  // paths to the data to write
  const imageRef =     storageRef( storage, `images/${file.name}`);
  const dataRef =  databaseRef( db, 'products')

  // uploading file to the storage bucket
  const uploadResult = await uploadBytes(imageRef, file);
  // url to the image stored in storage bucket
  const urlPath =  await getDownloadURL(imageRef) 
  // path on the storage bucket to the image
  const storagePath = uploadResult.metadata.fullPath;

  // firebase unique key
  const itemRef = await push(dataRef)

 const postData = {
   key:itemRef.key,
          sku:`jhvr${itemRef.key}`,
          urlPath,
          storagePath,
          title,
          price,
          availability,
          model
 }

 // Write the new post's data simultaneously in the posts list and the user's post list.
 const updates = {};
 updates['/posts/' + newPostKey] = postData;
 updates['/user-posts/' + uid + '/' + newPostKey] = postData;

 update(ref(db), updates);
  
}


pageInit();