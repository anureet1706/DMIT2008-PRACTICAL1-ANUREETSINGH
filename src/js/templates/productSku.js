/* 
            Vacation Rental Template
            - template
            - pass data
            - add any interactivity
            - return element

            1. setting up and testing the component...
               html/css ---->view ui element.
*/

function productSku ({key, sku, urlPath, title, price, availability, model}) {
    const template =`
    <aside class="product-rental">

    <figure>
    <img src="${urlPath}" width="160" alt="Airplane ${model} of ${title}">
        <figcaption> <h2>${title}</h2></figcaption>
    </figure>

    <footer>
        <button id="edit"  data-key="${key}" >edit</button>
        <button id="delete" data-key="${key}" >delete</button>
    </footer>

  </aside>
    `
    const element = document.createRange().createContextualFragment(template).children[0]
    addRentalControls(element)
    return element
}

function addRentalControls(rental){
    rental.querySelector('#edit').addEventListener('click', onEditRental)
    rental.querySelector('#delete').addEventListener('click', onRemoveRental)

}
function onEditRental(e){
    const key = e.target.dataset.key
    sessionStorage.setItem('key', key)
    window.location.assign('update.html')
}
function onRemoveRental(e){
    const key = e.target.dataset.key
    sessionStorage.setItem('key', key)
    window.location.assign('delete.html')
}
export {productSku}