(function(){try{
  var slug="sabordecalle";
  var SK='lp_access_'+slug;
  var map={access_token:'lp_pw_',allowlist_access_token:'lp_al_',pin_access_token:'lp_pin_',paywall_access_token:'lp_paid_'};
  var u=new URL(location.href);var found=null;var changed=false;
  Object.keys(map).forEach(function(p){var v=u.searchParams.get(p);if(v){found=v;try{localStorage.setItem(map[p]+slug,v);}catch(e){}u.searchParams.delete(p);changed=true;}});
  if(found){try{sessionStorage.setItem(SK,found);}catch(e){}}
  else{try{if(!sessionStorage.getItem(SK)){var t=localStorage.getItem('lp_pw_'+slug)||localStorage.getItem('lp_al_'+slug)||localStorage.getItem('lp_pin_'+slug)||localStorage.getItem('lp_paid_'+slug);if(t)sessionStorage.setItem(SK,t);}}catch(e){}}
  if(changed){try{history.replaceState(null,'',u.toString());}catch(e){}}

  // Auto-attach gate token to:
  //   1. sheet-rows writes (PATCH/POST/PUT/DELETE)
  //   2. LLM proxy calls (POST/GET) — /api/landing-pages/public/<slug>/llm/...
  //   3. landing-page LLM config probes (GET) — same prefix
  // So AI-generated pages don't have to know about the X-Landing-Page-Token header.
  function getTok(){try{return sessionStorage.getItem(SK)||localStorage.getItem('lp_pw_'+slug)||localStorage.getItem('lp_al_'+slug)||localStorage.getItem('lp_pin_'+slug)||localStorage.getItem('lp_paid_'+slug);}catch(e){return null;}}
  function needsToken(url,method){if(!url)return false;var s=String(url);var m=(method||'GET').toUpperCase();var isSheetWrite=(m==='POST'||m==='PATCH'||m==='PUT'||m==='DELETE')&&/\/sheet-rows(\/|$|\?)/.test(s);var isLlm=/\/api\/landing-pages\/public\/[^/]+\/(llm|llm-config)(\/|$|\?)/.test(s);return isSheetWrite||isLlm;}
  if(window.fetch){var _f=window.fetch;window.fetch=function(input,init){try{var url=typeof input==='string'?input:(input&&input.url)||'';var method=(init&&init.method)||(input&&input.method)||'GET';if(needsToken(url,method)){var tok=getTok();if(tok){init=init||{};var h=new Headers(init.headers||(typeof input!=='string'?input.headers:undefined)||{});if(!h.has('X-Landing-Page-Token'))h.set('X-Landing-Page-Token',tok);init.headers=h;}}}catch(e){}return _f.call(this,input,init);};}
  if(window.XMLHttpRequest){var _o=XMLHttpRequest.prototype.open;var _s=XMLHttpRequest.prototype.send;XMLHttpRequest.prototype.open=function(m,u){this.__lpM=m;this.__lpU=u;return _o.apply(this,arguments);};XMLHttpRequest.prototype.send=function(){try{if(needsToken(this.__lpU,this.__lpM)){var tok=getTok();if(tok)this.setRequestHeader('X-Landing-Page-Token',tok);}}catch(e){}return _s.apply(this,arguments);};}
}catch(e){}})();

window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-JC6J0G4J0E');

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
  if(!arr.length){cartItems.innerHTML='<div class="rounded-xl border border-white/10 p-4 text-zinc-400 text-sm">Todavía no has agregado productos.</div>'; cartSubtotal.textContent='RD$0'; cartTotal.textContent='RD$0'; return;}
  let subtotal=0;
  cartItems.innerHTML=arr.map(i=>{subtotal+=i.price*i.qty; return `<div class="rounded-xl bg-black/25 border border-white/5 p-3 max-w-full"><div class="flex justify-between gap-3"><p class="font-bold text-sm break-words min-w-0">${esc(i.name)}</p><p class="font-black text-yellow-300 shrink-0">${money(i.price*i.qty)}</p></div><div class="mt-2 flex items-center gap-2"><button type="button" onclick="changeQty('${i.name.replace(/'/g,"\\'")}',-1)" class="rounded-lg bg-zinc-800 px-3 py-2 font-black">-</button><span class="font-black min-w-[1.5rem] text-center">${i.qty}</span><button type="button" onclick="changeQty('${i.name.replace(/'/g,"\\'")}',1)" class="rounded-lg bg-zinc-800 px-3 py-2 font-black">+</button></div></div>`}).join('');
  cartSubtotal.textContent=money(subtotal); cartTotal.textContent=money(subtotal+DELIVERY);
}
orderForm.addEventListener('submit',e=>{
  e.preventDefault();
  const arr=Object.values(cart); if(!arr.length){alert('Agrega al menos un producto.');return;}
  const f=new FormData(orderForm); const subtotal=arr.reduce((s,i)=>s+i.price*i.qty,0); const total=subtotal+DELIVERY;
  const lines=arr.map(i=>`- ${i.qty} x ${i.name} = ${money(i.qty*i.price)}`).join('\n');
  const msg=`Nuevo pedido - Sabor de Calle Street Food\n\nProductos:\n${lines}\n\nSubtotal: ${money(subtotal)}\nDelivery: ${money(DELIVERY)}\nTotal: ${money(total)}\n\nCliente: ${f.get('name')}\nTeléfono: ${f.get('phone')}\nDirección: ${f.get('address')}\nNotas: ${f.get('notes')||'Sin notas'}`;
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`,'_blank');
});
year.textContent=new Date().getFullYear(); renderCart(); loadMenu();