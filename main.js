
//------------ LOGIN SECTION -------------------------


function validate() {
   var username = document.getElementById("username").value;
   var password = document.getElementById("password").value;

   if (username == "admin" && password == "123") {
      alert("Login succesful");
      return false;

   }
   else {
      alert("Login failed");
   }
   document.querySelector("#minus-btn").setAttribute("disabled", "disabled");

   var valueCount
   //plus
   document.querySelector("#plus-btn").addEventListener("click", function () {
      valueCount = document.getElementById("quantity").value;

      valueCount++;

      var valueCount
      //plus

      document.querySelector("#plus-btn").addEventListener("click", function () {
         valueCount = document.getElementById("quantity").value;

         document.getElementById("quantity").value = valueCount
         if (valueCount > 1) {
            document.querySelector("#minus-btn").removeAttribute("disabled")
            document.querySelector("#minus-btn").classList.remove("disabled")
         }

      })
      //minus
      document.querySelector("#minus-btn").addEventListener("click", function () {
         valueCount = document.getElementById("quantity").value;

         valueCount--;


         document.getElementById("quantity").value = valueCount
         if (valueCount == 1) {
            document.querySelector("#minus-btn").setAttribute("disabled", "disabled")
         }



      });



   });

}
//------------ LOGIN SECTION END -------------------------


window.onload = function () {
   /*select the cart link and the cart div and add a click event listner to show the cart by adding the css class using classList function, toggle helps in removing the css class when we again click on the cart link */
   const cartInfo = document.querySelector("#cart-info");
   const cart = document.querySelector("#cart");
   const closeBtn = document.querySelector(".fa-times-circle");
   cartInfo.addEventListener("click", function () {
      cart.classList.add("show-cart");
   });

   closeBtn.addEventListener("click", function () {
      cart.classList.remove("show-cart");
   });

   //adding data to local storage
   const addToCartBtn = document.getElementsByClassName("link-button");
   let items = [];
   for (let i = 0; i < addToCartBtn.length; i++) {
      addToCartBtn[i].addEventListener("click", function (e) {
         if (typeof (localStorage) !== 'undefined') {
            let item = {
               id: i + 1,
               name: e.target.parentElement.previousElementSibling.children[0].textContent,
               price: e.target.parentElement.children[0].children[0].textContent,
               quantity: 1
            };
            let fullPath = e.target.parentElement.parentElement.previousElementSibling.src;
            let pos = fullPath.indexOf("images") + 6;
            let partPath = fullPath.slice(pos);
            item.img = `img-cart${partPath}`;
            items.push(item);
            // console.log(items);
            if (JSON.parse(localStorage.getItem("productInCart")) === null) {
               localStorage.setItem("productInCart", JSON.stringify(items));
               window.location.reload();

            } else {
               const localItem = JSON.parse(localStorage.getItem("productInCart"));
               localItem.map(data => {
                  if (item.id == data.id) {
                     item.quantity = data.quantity + 1;
                  } else {
                     items.push(data);
                  }
               });

               localStorage.setItem("productInCart", JSON.stringify(items));
               console.log(items);
               window.location.reload();
               console.log(items);
            }


         } else {
            alert("localstorage is not set");

         }

      });
   };

   let currentDataIn = JSON.parse(localStorage.getItem("productInCart"));
   console.log(currentDataIn);

   const headerQuantityIcon = document.querySelector(".item-total");
   let quantity = 0;

   currentDataIn.map(data => {
      quantity = quantity + data.quantity;

   });
   headerQuantityIcon.textContent = quantity;

   const cartItem = document.createElement("div");
   cartItem.classList.add("cart-item");
   if (JSON.parse(localStorage.getItem("productInCart")) == null) {
      cartItem.innerHTML = `<p>"No items in cart"</p>`;

   } else {
      var dataInLocalStorage = JSON.parse(localStorage.getItem("productInCart"));

      dataInLocalStorage.map(data => {
         cartItem.innerHTML += `
         <span id="dataId" style="display:none;"> id:${data.id}</span>
         <img src="${data.img}" class="img-fluid rounded-circle" id="item-img" alt="">
             <div class="item-text">
                 <p id="cart-item-title" class="font-weight-bold mb-0">${data.name}</p>
                 <span id="cart-item-price" class="cart-item-price" class="mb-0">
                 <span>$</span>
                 ${data.price}</span>
                 <p id="cart-item-title" class="font-weight-bold mb-0">quantity:${data.quantity}</p>
                 <div>
                 <label for="quantity">Quantity:</label>
                 <input type="number" id="quantity" name="quantity" min="1" max="5">
                 </div>
                
             </div>
            
             <a href="#" onclick=Delete(this)><i class="fas fa-trash"></i></a>
            
          `;

      });



      const cartDiv = document.querySelector(".cart");
      const totalDiv = document.querySelector(".cart-total-container");
      cartDiv.insertBefore(cartItem, totalDiv);


   };


   showTotal();


};

function showTotal() {

   const total = [];
   const showTotal = JSON.parse(localStorage.getItem("productInCart"));
   showTotal.map(data => {

      total.push(parseFloat(((data.price) * data.quantity)));
      console.log(total);
      const totalMoney = total.reduce(function (total, item) {
         total += item;
         return total;

      }, 0);
      console.log(totalMoney);

      const FinalTotal = totalMoney.toFixed(2);
      const cartTotal = document.querySelector("#cart-total");
      cartTotal.textContent = FinalTotal;

      const navCartTotal = document.querySelector(".cart-total");
      navCartTotal.textContent = "$" + FinalTotal;


   });

   (function clearCartFunc() {

      let clearCartBtn = document.querySelector("#clear-cart");

      clearCartBtn.addEventListener("click", () => {

         localStorage.removeItem("productInCart");
         window.location.reload();

      });


   })();


   (function checkout() {
      let checkOutBtn = document.querySelector("#checkout");
      checkOutBtn.addEventListener("click", () => {
         var dataInLocalStorage = JSON.parse(localStorage.getItem("productInCart"));
         const cartTotal = document.querySelector("#cart-total");
         console.log(cartTotal);

         if (cartTotal.textContent == 0 || dataInLocalStorage == null) {
            alert("please add items to cart");
         }
         else { alert("Your Order has been placed successfully"); }


      })


   })();


};
