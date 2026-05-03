const products = [
 {id:'driver-titleist',name:'Driver Titleist TSR2',price:12500000,img:'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800',cat:'gay-golf',slug:'driver-titleist-tsr2'},
 {id:'iron-callaway',name:'Iron Set Callaway Rogue',price:18900000,img:'https://images.unsplash.com/photo-1593111774240-d529f12e39c8?w=800',cat:'gay-golf',slug:'iron-callaway-rogue'},
 {id:'putter-scotty',name:'Putter Scotty Cameron',price:9800000,img:'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800',cat:'gay-golf',slug:'putter-scotty-cameron'},
 {id:'bong-prov1',name:'Bóng Titleist Pro V1',price:1250000,img:'https://images.unsplash.com/photo-1606721966706-481b0e6d13f1?w=800',cat:'phu-kien',slug:'bong-titleist-prov1'},
 {id:'gang-footjoy',name:'Găng Tay FootJoy',price:650000,img:'https://images.unsplash.com/photo-1544986581-efac024faf62?w=800',cat:'phu-kien',slug:'gang-tay-footjoy'},
 {id:'tui-ping',name:'Túi Golf Ping Hoofer',price:4200000,img:'https://images.unsplash.com/photo-1591498016941-d58b2d02a897?w=800',cat:'phu-kien',slug:'tui-ping-hoofer'},
 {id:'ao-adidas',name:'Áo Polo Adidas',price:1150000,img:'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800',cat:'thoi-trang',slug:'ao-polo-adidas'},
 {id:'giay-nike',name:'Giày Nike Air Zoom',price:3900000,img:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',cat:'thoi-trang',slug:'giay-nike-airzoom'},
 {id:'mu-titleist',name:'Mũ Titleist Tour',price:850000,img:'https://images.unsplash.com/photo-1575428652377-a2d80e0011f0?w=800',cat:'thoi-trang',slug:'mu-titleist'}
];

function fmt(v){return v.toLocaleString('vi-VN')+'₫'}

let cart = JSON.parse(localStorage.getItem('cart')||'[]');

function save(){localStorage.setItem('cart',JSON.stringify(cart))}

function openCart(){
  document.getElementById('cart').classList.add('open');
  document.getElementById('overlay').classList.add('show');
  renderCart();
}

function closeCart(){
  document.getElementById('cart').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
}

function addToCart(id){
  const p = products.find(x=>x.id===id);
  const f = cart.find(x=>x.id===id);
  if(f) f.qty++;
  else cart.push({...p, qty:1});
  save();
  renderCart();
  openCart();
}

function renderCart(){
  const wrap = document.getElementById('cart-items');
  if(!wrap) return;
  wrap.innerHTML = '';
  let total = 0;
  cart.forEach((it,i) => {
    total += it.price * it.qty;
    wrap.innerHTML += `
      <div class="cart-item">
        <img src="${it.img}">
        <div>
          <div>${it.name}</div>
          <div>${fmt(it.price)} x ${it.qty}</div>
        </div>
      </div>`;
  });
  document.getElementById('cart-total').innerText = fmt(total);
  document.getElementById('cart-count').innerText = cart.reduce((a,b)=>a+b.qty,0);
}

document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('overlay');
  const cartClose = document.getElementById('cart-close');
  const cartBtn = document.getElementById('cart-btn');

  if(overlay) overlay.addEventListener('click', closeCart);
  if(cartClose) cartClose.addEventListener('click', closeCart);
  if(cartBtn) cartBtn.addEventListener('click', openCart);

  renderCart();

  // Auto slider
  const slides = document.querySelectorAll('.slide');
  let s = 0;
  if(slides.length){
    setInterval(()=>{
      slides[s].classList.remove('active');
      s = (s+1)%slides.length;
      slides[s].classList.add('active');
    }, 4000);
  }
});