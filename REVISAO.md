# Revisão do site (novembro de 2026)

Base: cópia fiel do site no ar (https://escolacastelinhodacrianca.com.br/), baixada em 14/11/2026 e registrada no commit `chore: estado original do site no ar`. O protótipo foi para `referencia/` e só serviu de ideia de interface. Cada correção tem seu próprio commit; `git log` mostra a ordem.

Nada foi publicado: o site no ar continua como estava até alguém subir estes arquivos para a hospedagem.

## Inventário (antes da revisão)

- **Arquivos:** 5 páginas (`index`, `creche`, `pre-escola`, `reforco-escolar`, `contato`), `estilo.css` (Tailwind já compilado, 3.383 linhas), `script.js` (59 linhas), `fontes/` (Nunito e Quicksand locais), `imagens/` (30 arquivos), `favicon.ico`, `robots.txt`, `sitemap.xml` e `sitemap-pages.xml`.
- **CSS e JS:** um arquivo de cada, compartilhado pelas 5 páginas. Não há CSS nem JS dentro das páginas (só os dados estruturados JSON-LD).
- **Partes repetidas:** cabeçalho e rodapé são copiados nas 5 páginas. Só mudam o `aria-current` do menu e a classe `is-home` do cabeçalho na página inicial. A frase do rodapé dizia "escola particular" na index e "escola" nas outras.
- **Imagens:** 19 fotos `escola(N).webp`, o `hero-bg.jpg`, o logo, 3 mascotes, `og-castelinho.jpg`, o logo do Google e 2 ícones. As 3 subpáginas usavam as **mesmas 4 fotos**. Na index, o `hero-bg.jpg` e o `escola(9).webp` apareciam duas vezes cada. A `escola(9)` e a `escola(18)` são a mesma brinquedoteca, e a `escola(5)` e a `escola(10)` são a mesma secretaria. Detalhes em `imagens/CATALOGO.md`.
- **Busca por dados errados** (`99852`, `Maternal 1`, `Período 1`, `@castelinhodacrianca` sem o segundo "a"): nada no site no ar. Esses dados só existiam no protótipo.

## Bugs da lista (seção 4 do pedido)

| # | Item | O que foi feito |
|---|---|---|
| 1 | Lista de bairros | No navegador já eram etiquetas sem repetição. A ferramenta leu como texto corrido porque eram `<span>` soltos. Viraram `<ul>/<li>` com o mesmo visual. |
| 2 | "Ver tour virtual" | **Não removido.** O botão não tem `href` porque é um `<button>` que carrega um Street View real do Google (não é link inventado). Com internet, o JS troca o botão pelo Street View sozinho. Ver "Para confirmar". |
| 3 | "Ver mapa" sem destino | Rodapé: o mini-mapa virou o link "Ver rota no Google Maps", com a rota da página de contato. Contato: o mapa entra direto como iframe com `loading="lazy"`. |
| 4 | Instagram com dois destinos | O botão da página de contato apontava para uma publicação; agora aponta para o perfil. |
| 5 | Links em texto cru no rodapé | No navegador já eram ícones, não URLs. Os ícones ganharam `aria-label` completo, e o WhatsApp do rodapé virou link de verdade (antes era `tel:`). |
| 6 | Menu "Ensino" | Implementada a **opção A (dropdown acessível)**. Abre com clique, Enter e setas, fecha com Esc, clique fora ou Tab, e o `aria-expanded` acompanha. Ver "Decisões para você". |
| 7 | "2 a 5 anos" | Rodapé, FAQ e dados estruturados agora dizem: educação infantil de 2 a 5 anos, reforço do 1º ao 5º ano e contraturno de 4 a 10 anos. |
| 8 | Fotos fora de contexto | Cada subpágina tem 4 fotos próprias (ver catálogo) e alt fiel ao que a foto mostra. |
| 9 | Fotos repetidas | Nenhuma foto se repete na mesma página. A galeria tem 13 fotos diferentes das dos destaques. |
| 10 | Canonical x `.html` | **Não alterado; precisa da sua decisão.** O servidor serve `/creche` e `/creche.html` (os dois dão 200). Links sem `.html` quebrariam o site aberto direto do disco e no `python3 -m http.server`, que o checklist exige. Hoje os links usam `.html` e o canonical e o sitemap usam a URL limpa, o que o Google entende bem. |
| 11 | Metadados duplicados | Removida a meta `ICBM`. Cada página já tinha title, description, og:* e canonical próprios. |
| 12 | `---` visível | Não acontece: conferido no navegador nas 5 páginas, em 375 e 1280 px. Foi coisa da ferramenta de análise. |
| 13 | Ano do rodapé | Atualizado por JS, com 2026 no HTML como reserva. |
| 14 | Repetições no rodapé | Endereço e WhatsApp aparecem uma vez cada. |
| 15 | Cabeçalho e rodapé em 5 arquivos | Só a sugestão, abaixo. Não implementado. |

## Imagens (seção 6)

- Renomeadas para nomes descritivos (`escola(15).webp` virou `sala-informatica-leitura.webp`, e assim por diante), com todas as referências atualizadas e conferidas.
- `hero-bg.jpg` (199 KB) virou `patio-coberto-hero.webp` (137 KB).
- `width`/`height` com o tamanho real, `loading="lazy"` fora do topo e `fetchpriority="high"` na imagem principal de cada página.
- Fotos não usadas foram para `imagens/_nao-usadas/` (nada foi apagado).
- Nenhuma imagem tem GPS. Nenhuma foto mostra rosto de criança identificável.
- As fotos da galeria ficaram em 1280 px e **não foram reduzidas** para cerca de 1000 px. Elas já têm de 37 a 133 KB, e recomprimir um webp perde qualidade para ganhar pouco.
- `ferramentas/converter-fotos.py` converte fotos novas de `fotos-originais/` para webp q80, sem EXIF/GPS e sem apagar os originais.

## Melhorias (seção 5)

1. **Ficha "Monte sua mensagem"** na página de contato: nome, criança (opcional), turma (as 6 turmas reais) e dúvida (opcional), com prévia ao vivo e validação de nome e turma.
2. **Como chegar:** mapa direto na página e botões "Abrir no Google Maps", "Ir com Waze" e "Copiar endereço" (com plano B se o navegador bloquear a cópia).
3. **Botão flutuante:** só ícone no celular e ícone + "WhatsApp" no computador. O verde ficou mais escuro para o branco ter contraste.
4. **Mensagens por botão:** matrícula (mensagem original do site), visita e dúvida.
5. **Régua de idades:** não implementada (o pedido era "me mostre antes"). Proposta abaixo.
6. **Acessibilidade:**
   - foco visível;
   - link "Pular para o conteúdo";
   - contraste do texto secundário corrigido (de 4,2:1 para 5,1:1);
   - decorações ocultas para leitor de tela;
   - estrelas das avaliações com texto.

   O menu mobile e o `prefers-reduced-motion` já estavam certos.

## Decisões para você

1. **Menu "Ensino" (item 6):**
   - **A (feita):** dropdown acessível, que mantém o visual do site no ar.
   - **B:** tirar o "Ensino" e mostrar Creche, Pré-escola e Reforço direto no menu do computador, como já acontece no celular. É mais simples e não esconde nada, mas o menu fica com 5 itens. Se preferir B, é uma mudança pequena.
2. **Canonical (item 10):** manter como está (recomendado) ou trocar o canonical e o sitemap para `.html`? Trocar mudaria as URLs que o Google já indexou.
3. **Régua de idades (5.5):** uma faixa na página inicial com as 6 turmas em ordem de idade (2, 3, 4, 5 anos, 1º ao 5º ano, 4 a 10 anos). Clicar numa turma mostra a idade, o turno e o link para a página dela. Substituiria a grade "Séries que atendemos", sem informação nova. Posso montar uma prévia.
4. **Cabeçalho e rodapé sincronizados (item 15):**
   - Proposta: um script pequeno em Python, `ferramentas/sincronizar.py`, sem dependências e sem build.
   - Funcionamento: o cabeçalho e o rodapé ficam uma vez só em `parciais/` e o script copia os dois para as 5 páginas, ajustando o `aria-current`.
   - Uso: rodar depois de editar um parcial. As páginas continuam sendo HTML puro e a hospedagem não muda.
   - Implemento se você aprovar.

## Para confirmar com o dono da escola

- **WhatsApp:** (61) 99971-0675 é o número do site no ar e foi mantido. Coincidência a conferir: é o mesmo número usado no site da Chácara Pôr do Sol (outro repositório). Vale garantir que não houve troca.
- **"Desde 2011":** o pedido mandava não copiar do protótipo, mas o **site no ar já diz** "desde 2011" (texto, rodapé e `foundingDate: 2011-01-25`). Foi mantido como estava. Confirmar a data.
- **Tour virtual:** o Street View do Google mostra só a fachada ou também o interior? Se for só a fachada, o texto "Faça um tour virtual pela nossa escolinha" promete mais do que entrega e vale trocar para "Veja a fachada no Street View".
- **Coordenadas:** as oficiais (-15.774809, -47.776314), usadas no Waze, ficam cerca de 280 m a leste do ponto do mapa embutido do Google (-15.77483, -47.77890). Confirmar qual é a entrada certa.
- **Fotos:**
  - a "sala do reforço" (`sala-aula-quadro-branco`) e a "sala da direção" eram nomes do site antigo e precisam de confirmação;
  - a foto da sala de informática tem um Papai Noel (é de dezembro);
  - a brinquedoteca com escalada está escura;
  - há um banner com foto de criança ao fundo do parquinho (pequeno, é propaganda da própria escola).
- **Mascotes:** parecem desenhos de banco de imagens (o menino tem um logo de outra marca na camiseta). Confirmar se a escola tem direito de uso.
- **Matrícula:**
  - Confirmar se é feita presencialmente na secretaria. Isso vinha do protótipo e **não** foi colocado no site.
  - Confirmar se existe passo a passo de matrícula. Também ficou de fora.
- **Avaliações do Google:** o site no ar mostra 3 avaliações reais com nome. Foram mantidas. Vale atualizar de tempos em tempos.
- **Sitemap:** o `lastmod` é 2026-11-12. Atualizar a data quando publicar esta revisão.
