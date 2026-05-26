(() => {
        const cartItems = document.getElementById('cartItems');
        const cartSubtotal = document.getElementById('cartSubtotal');
        const cartItbis = document.getElementById('cartItbis');
        const cartCargo = document.getElementById('cartCargo');
        const cartTotal = document.getElementById('cartTotal');
        const orderForm = document.getElementById('orderForm');
        const DELIVERY_FEE = 50;

        // Example: cart state and update function must exist or be created elsewhere, here is a pattern:
        // Assuming cart is an array of {price, quantity} objects or similar provided globally
        // This script handles recalculations and whatsapp message construction upon submit

        // For demo, dummy cart array; replace with actual data source or reactive update calls
        let cart = [];

        function updateCartDisplay() {
          // Clear items first (expected to be updated elsewhere realistically)
          cartItems.innerHTML = '';
          let subtotal = 0;
          cart.forEach(item => {
            const price = Number(item.price) || 0;
            const quantity = Number(item.quantity) || 0;
            subtotal += price * quantity;
            // render each item if needed, omitted here to avoid duplication of existing code
          });
          cartSubtotal.textContent = `RD$${subtotal.toFixed(0)}`;

          if (subtotal > 0) {
            const cargo = Math.round(subtotal * 0.18);
            cartItbis.textContent = `RD$${cargo.toFixed(0)}`;
            cartCargo.textContent = `RD$${cargo.toFixed(0)}`;
            const total = subtotal + cargo + DELIVERY_FEE;
            cartTotal.textContent = `RD$${total.toFixed(0)}`;
          } else {
            cartItbis.textContent = 'RD$0';
            cartCargo.textContent = 'RD$0';
            cartTotal.textContent = 'RD$0';
          }
        }

        // Hook this function or replace existing cart update calls with this
        // updateCartDisplay();

        orderForm.addEventListener('submit', e => {
          e.preventDefault();
          const formData = new FormData(orderForm);
          const name = formData.get('name') || '';
          const phone = formData.get('phone') || '';
          const address = formData.get('address') || '';
          const notes = formData.get('notes') || '';

          // Calculate amounts again in case of changes (should sync with display)
          let subtotal = 0;
          cart.forEach(item => {
            const price = Number(item.price) || 0;
            const quantity = Number(item.quantity) || 0;
            subtotal += price * quantity;
          });
          if (subtotal === 0) {
            alert('Tu carrito está vacío.');
            return;
          }
          const cargo = Math.round(subtotal * 0.18);
          const total = subtotal + cargo + DELIVERY_FEE;

          let message = `Hola, soy ${name}.\nMi pedido es:\n`;
          cart.forEach(item => {
            // Assume existence of item.productName or similar; substitute as needed
            message += `${item.quantity} x ${item.productName || 'Producto'}: RD$${(item.price * item.quantity).toFixed(0)}\n`;
          });
          message += `Subtotal: RD$${subtotal.toFixed(0)}\n`;
          message += `Cargo 18%: RD$${cargo.toFixed(0)}\n`;
          message += `Delivery: RD$${DELIVERY_FEE}\n`;
          message += `Total final: RD$${total.toFixed(0)}\n\n`;
          message += `Dirección: ${address}\n`;
          if (notes.trim()) message += `Notas: ${notes}\n`;
          message += `Teléfono: ${phone}`;

          // Encode message for WhatsApp link
          const encodedMessage = encodeURIComponent(message);
          // Replace with real WhatsApp number
          const whatsappNumber = '1234567890';
          const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
          window.open(whatsappUrl, '_blank');
        });
      })();

const WHATSAPP='18293813886';
const DELIVERY=50;
const SHEET_URL='https://app.agentesconia.com/api/public/landing-pages/4004/sheet-data';
const cart={};
let categories=[];
const fallbackCategories=[
 {id:'asado-a-la-parrilla',chip:'Parrilla',title:'Asado a la parrilla',subtitle:'O a la plancha',icon:'🥩',image:'assets/categoria-parrilla.jpg',order:1,items:[['Alitas de pollo asada BBQ',450],['Muzlo de pollo asado',375],['Brocheta de pollo',375],['Pincho de res',375],['Brocheta de cerdo',375],['Chuleta BBQ',450],['Costillitas asada',495],['Filete de cerdo parrilla',550],['Filete de res a la parrilla',750],['Pollo criollo asado 1/4',475],['Pizza personal',325]]},
 {id:'exquisiteces',chip:'Exquisiteces',title:'Exquisiteces',subtitle:'Especialidades de la casa',icon:'🍽️',image:'assets/categoria-exquisiteces.jpg',order:2,items:[['Chivo asado',990],['Pescado entero chillo a la plancha 1 libra',990],['Langosta a la parrilla',1500],['Gallina de guinea asada',990]]},
 {id:'importados',chip:'Importados',title:'Importados',subtitle:'Cortes y platos premium',icon:'🔥',image:'assets/categoria-importados.jpg',order:3,items:[['Salmon importado',750],['Churrasco importado 10 onza',1300],['Ribeye importado 12 onza',1450]]},
 {id:'para-los-mas-jovenes',chip:'Jóvenes',title:'Para los más jóvenes',subtitle:'Favoritos urbanos',icon:'🍔',image:'assets/categoria-jovenes.jpg',order:4,items:[['Hamburguesa de la casa',425],['Chimi dorado',425],['Mofongo de chicharron',425],['Mofongo de pollo y chicharron en salsa 4 queso',550],['Mofongo de camarones a la crema y chicharron',850],['Carnita de cerdo frita',425],['Tacos de la casa 3 unidades',350],['Pechurina',425],['Chicharrones de pollo con hueso',425],['Salchichas salteadas',275],['Chicharron de cerdo',650],['Alitas con salsa Bufalo Wings',450]]},
 {id:'nuevos-antojitos',chip:'Antojitos',title:'Nuevos antojitos',subtitle:'Para picar y compartir',icon:'🥟',image:'assets/categoria-antojitos.jpg',order:5,items:[['Empanadas 1 unidad',100],['Pastelitos 2 unidades',100],['Quipes 2 unidades',100]]},
 {id:'guarniciones',chip:'Guarniciones',title:'Guarniciones',subtitle:'Acompaña tu orden',icon:'🍟',image:'assets/categoria-guarniciones.jpg',order:6,items:[['Papas fritas',150],['Tostones',150],['Palitos de yuca',150],['Maíz asado',150],['Platano Maduro',150]]},
 {id:'bebidas-sin-alcohol',chip:'Sin alcohol',title:'Bebidas sin alcohol',subtitle:'Refrescantes',icon:'🥤',image:'assets/categoria-bebidas.jpg',order:7,items:[['Jugos naturales',125],['Fresa frozen',200],['Frut pochs',150],['Piña colada',250],['Refresco',75],['Limonada',175]]}
];
function slug(s){return String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'categoria'}
function money(n){return 'RD$'+Number(n||0).toLocaleString('es-DO')}
function esc(s){return String(s||'').replace(/[&<>'"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m]))}
function fromRows(rows){
  const map=new Map();
  rows.filter(r=>String(r.Activo||'').toUpperCase()!=='FALSE').forEach(r=>{
    const cat=(r.Categoria||'Sin categoría').trim();
    if(!r.Producto) return;
    if(!map.has(cat)) map.set(cat,{id:slug(cat),chip:cat.replace('Asado a la parrilla','Parrilla').replace('Para los más jóvenes','Jóvenes').replace('Bebidas sin alcohol','Sin alcohol'),title:cat,subtitle:r.Subtitulo||'',icon:r.IconoCategoria||'🍽️',image:r.ImagenCategoria||'',order:parseInt(r.OrdenCategoria||'999',10),items:[]});
    const c=map.get(cat);
    c.items.push([String(r.Producto), Number(String(r.Precio||'0').replace(/[^0-9.]/g,'')), parseInt(r.OrdenProducto||'999',10)]);
  });
  return [...map.values()].sort((a,b)=>a.order-b.order).map(c=>({...c,items:c.items.sort((a,b)=>(a[2]||999)-(b[2]||999)).map(i=>[i[0],i[1]])}));
}
async function loadMenu(){
  try{
    const res=await fetch(SHEET_URL,{cache:'no-store'});
    if(!res.ok) throw new Error('No se pudo leer la hoja');
    const data=await res.json();
    const rows=Array.isArray(data)?data:(data.rows||data.data||[]);
    const parsed=fromRows(rows);
    if(!parsed.length) throw new Error('Hoja sin productos activos');
    categories=parsed;
    menuStatus.textContent='Menú cargado.';
  }catch(err){
    categories=fallbackCategories;
    menuStatus.textContent='Menú cargado.';
  }
  renderChips(); renderMenu();
}
function renderChips(){
  chips.innerHTML=categories.map(c=>`<button type="button" data-target="${esc(c.id)}" class="cat-chip shrink-0 rounded-full border border-orange-300/30 bg-zinc-900 px-4 py-2 text-sm font-black text-orange-100 whitespace-nowrap">${esc(c.chip)}</button>`).join('');
  chips.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>openCategory(btn.dataset.target)));
}
function openCategory(id){
  const el=document.getElementById(id); if(!el) return;
  el.open=true;
  chips.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.target===id));
  const chipsRect=chips.getBoundingClientRect();
  const stickyOffset=Math.max(72, Math.ceil(chipsRect.height + 16));
  const y=el.getBoundingClientRect().top+window.pageYOffset-stickyOffset;
  window.scrollTo({top:y,behavior:'smooth'});
}
function categoryVisual(c){
  if(c.image) return `<img src="${esc(c.image)}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" class="category-media rounded-2xl object-cover shrink-0 max-w-full"><div style="display:none" class="cat-img category-media rounded-2xl items-center justify-center text-5xl md:text-6xl shrink-0 max-w-full">${esc(c.icon)}</div>`;
  return `<div class="cat-img category-media rounded-2xl flex items-center justify-center text-5xl md:text-6xl shrink-0 max-w-full">${esc(c.icon)}</div>`;
}
function renderMenu(){
  menuWrap.innerHTML=categories.map((c,i)=>`<details id="${esc(c.id)}" ${i<7?'open':''} class="glass rounded-[1.5rem] overflow-hidden scroll-mt-32 max-w-full"><summary class="cursor-pointer p-4 md:p-5 flex items-start gap-4 max-w-full">${categoryVisual(c)}<div class="min-w-0 flex-1">${`<h3 class="text-2xl md:text-3xl font-black break-words">${esc(c.title)}</h3>`}<p class="text-orange-200 font-bold break-words">${esc(c.subtitle||'')}</p><p class="text-xs text-zinc-400 mt-1">${c.items.length} opciones disponibles</p></div><span class="ml-auto text-2xl text-yellow-300 shrink-0">⌄</span></summary><div class="px-4 md:px-5 pb-5 grid gap-2">${c.items.map(it=>`<div class="rounded-2xl bg-black/25 border border-white/5 p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 max-w-full product-row"><div class="product-info"><p class="font-bold leading-tight product-name">${esc(it[0])}</p><p class="text-yellow-300 font-black mt-1">${money(it[1])}</p></div><button type="button" onclick="addItem('${String(it[0]).replace(/'/g,"\\'")}',${Number(it[1]||0)})" class="product-btn shrink-0 rounded-xl bg-orange-500 hover:bg-orange-400 px-4 py-3 font-black whitespace-nowrap">+ Agregar</button></div>`).join('')}</div></details>`).join('')
}
function addItem(name,price){ if(!cart[name]) cart[name]={name,price,qty:0}; cart[name].qty++; renderCart(); }
function changeQty(name,delta){ cart[name].qty+=delta; if(cart[name].qty<=0) delete cart[name]; renderCart(); }
function renderCart(){
  const arr=Object.values(cart);
  if(!arr.length){cartItems.innerHTML='<div class="rounded-xl border border-white/10 p-4 text-zinc-400 text-sm">Todavía no has agregado productos.</div>'; cartSubtotal.textContent='RD$0'; cartItbis.textContent='RD$0'; cartCargo.textContent='RD$0'; cartTotal.textContent='RD$0'; return;}
  let subtotal=0;
  cartItems.innerHTML=arr.map(i=>{subtotal+=i.price*i.qty; return `<div class="rounded-xl bg-black/25 border border-white/5 p-3 max-w-full"><div class="flex justify-between gap-3"><p class="font-bold text-sm break-words min-w-0">${esc(i.name)}</p><p class="font-black text-yellow-300 shrink-0">${money(i.price*i.qty)}</p></div><div class="mt-2 flex items-center gap-2"><button type="button" onclick="changeQty('${i.name.replace(/'/g,"\\'")}',-1)" class="rounded-lg bg-zinc-800 px-3 py-2 font-black">-</button><span class="font-black min-w-[1.5rem] text-center">${i.qty}</span><button type="button" onclick="changeQty('${i.name.replace(/'/g,"\\'")}',1)" class="rounded-lg bg-zinc-800 px-3 py-2 font-black">+</button></div></div>`}).join('');
  const cargo = Math.round(subtotal * 0.18);
  cartSubtotal.textContent=money(subtotal); cartItbis.textContent=money(cargo); cartCargo.textContent=money(cargo); cartTotal.textContent=money(subtotal+cargo+DELIVERY);
}
orderForm.addEventListener('submit',e=>{
  e.preventDefault();
  const arr=Object.values(cart); if(!arr.length){alert('Agrega al menos un producto.');return;}
  const f=new FormData(orderForm); const subtotal=arr.reduce((s,i)=>s+i.price*i.qty,0); const cargo=Math.round(subtotal*0.18); const total=subtotal+cargo+DELIVERY;
  const lines=arr.map(i=>`- ${i.qty} x ${i.name} = ${money(i.qty*i.price)}`).join('\n');
  const msg=`Nuevo pedido - Sabor de Calle Street Food\n\nProductos:\n${lines}\n\nSubtotal: ${money(subtotal)}\nCargo 18%: ${money(cargo)}\nDelivery: ${money(DELIVERY)}\nTotal: ${money(total)}\n\nCliente: ${f.get('name')}\nTeléfono: ${f.get('phone')}\nDirección: ${f.get('address')}\nNotas: ${f.get('notes')||'Sin notas'}`;
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`,'_blank');
});
year.textContent=new Date().getFullYear(); renderCart(); loadMenu();