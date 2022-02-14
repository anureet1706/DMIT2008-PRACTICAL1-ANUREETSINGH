import {ref as dataRef, get, set, push, remove} from 'firebase/database';
import {db} from './libs/firebase/firebaseConfig';
import {productSku} from './templates/productSku'

async function pageInit(){
    const rentalRef = dataRef(db, 'products/');
    const rentalSnapShot = await get(rentalRef)
    const data = rentalSnapShot.val();
    
    // ES Modules For The Render Function
    // JS Client  Arrays[{},{},{},{},{}]
    // Firebase Object of ojbects  {{},{},{},{}}
    // Creating An Array from Objects
    // Object.keys() Object.entries() Object.values() return array
    // Object propert  Obj.prop   or  Obj['key']

    // Render Function   component + data =====> DOM Content.

    Object.values(data).map(rental=>{
        const card = productSku(rental)
        document.querySelector('main').append(card)
    })

     
}

pageInit()