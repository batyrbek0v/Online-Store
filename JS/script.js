
const BASE_URL = 'https://fakestoreapi.com/'
const $container = document.querySelector('.container')
const $wrapper = document.querySelector('.wrapper')

function getRequest(endPoint, cb) {
   fetch(`${BASE_URL}${endPoint}`)
      .then(r => r.json())
      .then(res => cb(res))
}

window.addEventListener('load', () => {
   getRequest('products', cb => {
      cardTemplate(cb)
      console.log(cb);
   })
})


function cardTemplate(base) {
   const newBase = base.map(item => {
      return `
         <div class="card">
            <div class="card_image">
               <img src="${item.image}">
            </div>
            <div class="card_info">
               <h3>
                  ${item.title.length > 20 ? item.title.slice(0,15) + '...' : item.title} / ${item.price}$
               </h3>
            </div>
            <div class="btn_block">
               <button onclick="getRoute('${item.id}')" class="more_btn">More</button>
            </div>
         </div>
      `
   }).join('')
   $wrapper.innerHTML = newBase
}
function getRoute(id){
   getRequest(`products/${id}`, cb => {
      moreInfo(cb)
   })
 }
function moreInfo(item) {
   $container.innerHTML = `
      <div class="more_card">
         <div class="more_image">
            <img src="${item.image}">
         </div>
      </div>
   `
   console.log(item);
}
