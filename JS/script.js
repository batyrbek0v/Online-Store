
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
         <div class="more_info">
            <div class="more_title">
               <h2>Category: ${item.title}</h2>
            </div>
            <ul class="list">
               <li>Category: ${item.category}</li>
               <li>Price: ${item.price}$</li>
               <li>Rate: ${item.rating.rate}</li>
               <li>Сount: ${item.rating.count} pieces</li>
            </ul>
            <div class="list_footer">
               <p>Description: ${item.description}</p>
            </div>
            <div class="more_cart">
               <button class="cart_btn"  onclick="clickCart()"><i class="fas fa-cart-arrow-down"></i></button>
               <button class="heart_btn"><i class="fas fa-heart"></i></button>
               <button class="back_btn" onclick="goBack()">Back</button>
            </div>
         </div>
      </div>
      <div class="back_btn_block">
         <button class="back_btn" onclick="goBack()">Back</button>
      </div>
         
   `
   console.log(item);
}

function clickCart() {
   const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      timerProgressBarColor:'red', 
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Product successfully added to cart in successfully!',
      color:'white',
      background:'#6b25b6'
    })
}

function goBack() {
   window.location.reload()
}