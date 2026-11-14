// Interações locais. Não requer bibliotecas nem conexão.
const header = document.querySelector('.offline-header');
const menuButton = document.querySelector('[data-menu]');
const mobileMenu = document.getElementById('menu-mobile');
function updateHeader() {
 header.classList.toggle('is-solid', !header.classList.contains('is-home') || window.scrollY > 50 || !mobileMenu.hidden);
}
menuButton.addEventListener('click', () => {
 mobileMenu.hidden = !mobileMenu.hidden;
 menuButton.setAttribute('aria-expanded', String(!mobileMenu.hidden));
 menuButton.setAttribute('aria-label', mobileMenu.hidden ? 'Menu' : 'Fechar menu');
 updateHeader();
});
window.addEventListener('scroll', updateHeader, {passive:true});
window.addEventListener('resize', () => {if(window.innerWidth>=768){mobileMenu.hidden=true;menuButton.setAttribute('aria-expanded','false');updateHeader();}});
updateHeader();
const dropdown = document.querySelector('[data-dropdown]');
dropdown.addEventListener('click', () => {
 const open = dropdown.parentElement.classList.toggle('is-open');
 dropdown.setAttribute('aria-expanded', String(open));
});
document.addEventListener('keydown', event => {
 if(event.key==='Escape') {
  mobileMenu.hidden=true;menuButton.setAttribute('aria-expanded','false');
  dropdown.parentElement.classList.remove('is-open');dropdown.setAttribute('aria-expanded','false');
  if(document.activeElement.closest('#menu-mobile')) menuButton.focus();
  else if(document.activeElement.closest('.offline-dropdown')) {dropdown.blur();}
  updateHeader();
 }
});
document.querySelectorAll('[role="region"]').forEach(track => {
 const wrapper = track.parentElement;
 wrapper.querySelectorAll('button[aria-label]').forEach(button => button.addEventListener('click', () => {
  track.scrollBy({left:button.getAttribute('aria-label')==='Anterior' ? -320 : 320, behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 }));
 const bar = wrapper.nextElementSibling?.firstElementChild;
 function progress(){
  if(!bar) return;
  const max=track.scrollWidth-track.clientWidth;
  const ratio=max>0?track.scrollLeft/max:0;
  const width=Math.max(20,ratio*100);
  bar.style.width=width+'%';bar.style.marginLeft=ratio*(100-width)+'%';
 }
 track.addEventListener('scroll',progress,{passive:true});window.addEventListener('resize',progress);progress();
});
// Mapas e tour aparecem sozinhos; o Google só carrega quando chegam perto da tela.
function carregarMapa(button){
 const iframe=document.createElement('iframe');iframe.loading='lazy';iframe.src=button.dataset.mapSrc;
 iframe.title=button.dataset.mapTitle;iframe.height=button.dataset.mapHeight;
 iframe.allowFullscreen=true;iframe.referrerPolicy='no-referrer-when-downgrade';
 button.closest('.offline-map').replaceChildren(iframe);
}
document.querySelectorAll('[data-map-src]').forEach(button=>{
 if(navigator.onLine){carregarMapa(button);return;}
 button.addEventListener('click',()=>{
  if(!navigator.onLine){button.textContent='Conecte-se à internet para carregar';return;}
  carregarMapa(button);
 });
});
