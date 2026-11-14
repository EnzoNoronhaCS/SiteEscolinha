// Interações locais. Não requer bibliotecas nem conexão.
document.documentElement.classList.add('js');
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
// Menu "Ensino": botão que abre e fecha o submenu (padrão de divulgação acessível).
const dropdown = document.querySelector('[data-dropdown]');
const dropdownBox = dropdown.parentElement;
const dropdownLinks = [...dropdownBox.querySelectorAll('.offline-dropdown-panel a')];
function abrirEnsino(abrir) {
 dropdownBox.classList.toggle('is-open', abrir);
 dropdown.setAttribute('aria-expanded', String(abrir));
}
let abertoPeloMouse = false;
dropdown.addEventListener('click', () => {
 // Se o mouse acabou de abrir o submenu, o clique confirma em vez de fechar.
 if(abertoPeloMouse) { abertoPeloMouse = false; abrirEnsino(true); return; }
 abrirEnsino(dropdown.getAttribute('aria-expanded') !== 'true');
});
dropdownBox.addEventListener('keydown', event => {
 if(event.key!=='ArrowDown' && event.key!=='ArrowUp') return;
 event.preventDefault();
 abrirEnsino(true);
 const atual = dropdownLinks.indexOf(document.activeElement);
 const passo = event.key==='ArrowDown' ? 1 : -1;
 const proximo = atual<0 ? (passo>0 ? 0 : dropdownLinks.length-1) : (atual+passo+dropdownLinks.length)%dropdownLinks.length;
 dropdownLinks[proximo].focus();
});
dropdownBox.addEventListener('focusout', event => { if(!dropdownBox.contains(event.relatedTarget)) abrirEnsino(false); });
document.addEventListener('click', event => { if(!dropdownBox.contains(event.target)) abrirEnsino(false); });
if(matchMedia('(hover: hover)').matches) {
 dropdownBox.addEventListener('mouseenter', () => { if(!dropdownBox.classList.contains('is-open')) abertoPeloMouse = true; abrirEnsino(true); });
 dropdownBox.addEventListener('mouseleave', () => { abertoPeloMouse = false; if(!dropdownBox.contains(document.activeElement)) abrirEnsino(false); });
}
document.addEventListener('keydown', event => {
 if(event.key!=='Escape') return;
 if(!mobileMenu.hidden) {
  mobileMenu.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Menu');
  if(document.activeElement.closest('#menu-mobile')) menuButton.focus();
 }
 if(dropdownBox.classList.contains('is-open')) {
  const estavaDentro = dropdownBox.contains(document.activeElement);
  abrirEnsino(false);
  if(estavaDentro) dropdown.focus();
 }
 updateHeader();
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
// Ano do rodapé sempre atualizado (o HTML traz 2026 como reserva, caso o JS não rode).
document.querySelectorAll('[data-ano]').forEach(el => { el.textContent = new Date().getFullYear(); });
// "Copiar endereço": usa a área de transferência; se o navegador bloquear, tenta o método antigo
// e, se nada funcionar, mostra o endereço selecionado para a pessoa copiar na mão.
document.querySelectorAll('[data-copiar]').forEach(botao => {
 const aviso = document.querySelector('[data-copiar-aviso]');
 const texto = botao.dataset.copiar;
 function copiarAntigo() {
  const campo = document.createElement('textarea');
  campo.value = texto; campo.setAttribute('readonly', ''); campo.style.position = 'fixed'; campo.style.opacity = '0';
  document.body.appendChild(campo); campo.select();
  let ok = false; try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
  campo.remove(); return ok;
 }
 function avisar(ok) {
  aviso.classList.toggle('is-erro', !ok);
  aviso.textContent = ok ? 'Endereço copiado.' : 'Não foi possível copiar. O endereço é: ' + texto;
 }
 botao.addEventListener('click', () => {
  if(navigator.clipboard && window.isSecureContext) {
   navigator.clipboard.writeText(texto).then(() => avisar(true), () => avisar(copiarAntigo()));
  } else avisar(copiarAntigo());
 });
});
// "Monte sua mensagem" (página de contato): monta o texto, mostra a prévia e abre o WhatsApp.
const ficha = document.querySelector('[data-ficha]');
if(ficha) {
 const WHATSAPP = '5561999710675';
 const previa = document.querySelector('[data-ficha-previa]');
 const campo = nome => ficha.elements[nome];
 function montarMensagem() {
  const nome = campo('nome').value.trim();
  const crianca = campo('crianca').value.trim();
  const turma = campo('turma').value;
  const duvida = campo('duvida').value.trim();
  let texto = 'Olá! Vim pelo site da Escola Castelinho da Criança.';
  texto += nome ? ' Meu nome é ' + nome + '.' : ' Meu nome é [seu nome].';
  if(crianca) texto += ' Sou responsável por ' + crianca + '.';
  texto += turma ? ' Tenho interesse na turma ' + turma + '.' : ' Tenho interesse na turma [escolha a turma].';
  if(duvida) texto += '\n\nMinha dúvida: ' + duvida;
  return texto;
 }
 function atualizarPrevia() { previa.textContent = montarMensagem(); }
 function marcarErro(nome, comErro) {
  const el = campo(nome);
  el.setAttribute('aria-invalid', String(comErro));
  document.getElementById('ficha-' + nome + '-erro').hidden = !comErro;
 }
 ficha.addEventListener('input', event => {
  if(event.target.getAttribute('aria-invalid') === 'true' && event.target.value.trim()) marcarErro(event.target.name, false);
  atualizarPrevia();
 });
 ficha.addEventListener('submit', event => {
  event.preventDefault();
  const semNome = !campo('nome').value.trim();
  const semTurma = !campo('turma').value;
  marcarErro('nome', semNome); marcarErro('turma', semTurma);
  if(semNome || semTurma) { (semNome ? campo('nome') : campo('turma')).focus(); return; }
  window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(montarMensagem()), '_blank', 'noopener');
 });
 atualizarPrevia();
}
