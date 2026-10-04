# Site da Escola Castelinho da Criança — passagem para o Claude Code

Site **informativo**, de uma página, da Escola Castelinho da Criança (Paranoá-DF). A matrícula é feita **presencialmente** na secretaria. O site existe para apresentar a escola e levar os pais ao WhatsApp e ao endereço.

O protótipo foi aprovado pelo responsável (Ycaro, que trabalha na escola). As decisões abaixo foram pedidas por ele e **não devem ser revertidas sem perguntar**.

---

## Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | O site inteiro: HTML, CSS e JS num arquivo só, sem build e sem dependências. Só carrega fontes do Google Fonts. |
| `favicon.svg` | Ícone da aba, com o mesmo brasão do site. |
| `HANDOFF.md` | Este documento. |

Para ver localmente, basta abrir o `index.html` no navegador ou rodar `python3 -m http.server` na pasta.

---

## Dados da escola (confirmados)

- **Nome:** Escola Castelinho da Criança
- **Razão social:** Cantinho do Sucesso Educação Infantil Ltda — CNPJ 13.166.256/0001-15
- **Endereço:** Quadra 14, Conjunto D, Lotes 25 e 26 — Paranoá, Brasília-DF — CEP 71571-404
- **WhatsApp:** (61) 99852-6089 → `5561998526089`
- **Telefone fixo:** (61) 3369-6680
- **Horário de atendimento:** segunda a sexta, das 7h às 18h
- **Instagram:** @castelinhodacrianca
- **Desde:** 2011
- **Slogan (do site antigo):** "Educação infantil com carinho, segurança e excelência."

## Turmas

A escola aceita crianças **a partir de 2 anos**. Não existe creche/berçário. Não reintroduzir.

| Turma | Idade |
|---|---|
| Maternal 1 | 2 anos |
| Maternal 2 | 3 anos |
| Período 1 | 4 anos |
| Período 2 | 5 anos |
| Reforço Escolar | a partir de 6 anos |

> ⚠️ As idades seguem o padrão do DF e **ainda precisam de confirmação** do Ycaro. Os textos descritivos de cada turma (objeto `TURMAS` no JS) são provisórios e devem ser revisados por ele.

## Rotina do dia (só informativo, sem gráfico)

- 7h — Chegada
- 11h — Almoço
- 17h — Saída

> ⚠️ O atendimento vai até 18h e a saída das crianças é às 17h. Ycaro confirmou os dois, mas vale checar se é isso mesmo.

---

## Decisões já tomadas (manter)

1. Paleta e logo vêm do **brasão oficial** da escola: azul, amarelo, vermelho e branco.
2. O brasão foi **redesenhado em SVG** (`<symbol id="brasao">`) a partir de uma foto de baixa resolução. Se aparecer o arquivo original em alta, ele pode substituir o SVG.
3. Sem botão "Ver as turmas" no início. Os botões do início são "Falar no WhatsApp" e "Como chegar".
4. Sem faixa de números/estatísticas abaixo do início.
5. Sem creche: nem na régua de idades, nem no card de detalhes.
6. A rotina é só um informativo com 3 horários. Os relógios são ilustração, não gráfico.
7. A seção de fotos fica com os **quadros em branco** até as fotos chegarem.
8. Sem depoimento de pais.
9. A seção "Matrículas 2027" fica, com a ficha que monta uma mensagem personalizada para o WhatsApp. O texto deixa claro que a matrícula é presencial.
10. Estética de escola, alegre e animada: bandeirinhas, faixa vermelha nos títulos (como a fita do brasão), estrelas e microanimações.
11. Tema único, claro. Não há modo escuro, de propósito: as cores são a identidade da escola.

---

## Estrutura da página

`#inicio` → bandeirinhas → `#turmas` → `#horarios` → `#estrutura` → `#matricula` → `#contato` → rodapé, mais o botão flutuante do WhatsApp.

| Seção | Conteúdo |
|---|---|
| Topo fixo | Brasão, nome, menu com âncoras e botão WhatsApp. No celular vira um menu hambúrguer. |
| Início | Selo "2027 Matrículas abertas", slogan, texto curto, botões, aviso de matrícula presencial e brasão grande com estrelas. |
| Turmas | Régua de idades clicável (`role="tablist"`) e card de detalhe. |
| Horários | Fundo azul-escuro, "Segunda a sexta-feira" e 3 relógios que giram até o horário quando aparecem na tela. |
| Estrutura | 6 polaroides vazias com fita colorida. |
| Matrículas 2027 | Aviso de matrícula presencial, 3 passos e ficha (nome, criança, idade, dúvida) com prévia da mensagem. O botão é um `<a href="https://wa.me/...">` real. |
| Contato | Lista (endereço, WhatsApp, telefone, horário, Instagram) e card "Como chegar" com mapa e botões Google Maps, Waze e Copiar endereço. |
| Rodapé | Brasão, endereço, contatos, razão social e CNPJ. |

## Configuração (topo do `<script>`)

```js
const CONFIG = {
  whatsapp: "5561998526089",
  endereco: "Quadra 14, Conjunto D, Lotes 25 e 26 - Paranoá, Brasília-DF, CEP 71571-404",
  mapaInterativo: true,  // true = iframe do Google Maps; false = mapa ilustrado
};
```

- No protótipo (artifact do Claude), iframes eram bloqueados, então lá aparecia um **mapa ilustrado**. As ruas dele são decorativas, não o traçado real. Neste `index.html` final, `mapaInterativo` já vem `true` e mostra o mapa real do Google. O mapa ilustrado continua no código como alternativa.
- Todos os links com a classe `.js-zap` recebem automaticamente a URL do WhatsApp com uma mensagem padrão.

## Design tokens (`:root`)

- Cores: `--azul #1E4FA6`, `--azul-escuro #12306B`, `--azul-noite #0C2250`, `--azul-claro #E8EFFC`, `--amarelo #F6D93A`, `--amarelo-forte #F2C200`, `--amarelo-claro #FFF6CC`, `--vermelho #E3141F`, `--vermelho-escuro #A70D15`, `--tinta #14214A`, `--zap #1E8A4E` (verde só nos botões de WhatsApp)
- Fontes: **Fredoka** (títulos) e **Nunito** (texto), pelo Google Fonts
- Estilo: bordas de 3px em azul-escuro com sombra "chapada" deslocada (amarela ou azul), cantos de 18px e botões com sombra inferior sólida
- Movimento: entrada ao rolar (`.revela` / `.pre` via IntersectionObserver, só para o que começa fora da tela), régua que cresce, relógios, bandeirinhas balançando e estrelas piscando. Tudo respeita `prefers-reduced-motion`.

---

## Pendências

- [ ] **Fotos reais:** fachada, salas, parquinho, refeitório e eventos. Para cada polaroide, trocar `<div class="foto"></div>` por `<img class="foto" src="fotos/x.webp" alt="..." loading="lazy">` e ajustar o CSS com `object-fit: cover`. Fotos de crianças só com autorização dos pais.
- [ ] Confirmar as **idades** das turmas e revisar os **textos** do objeto `TURMAS`.
- [ ] Confirmar os horários de atendimento (até 18h) e de saída das crianças (17h).
- [ ] Logo original em alta resolução (opcional).
- [ ] **Domínio:** o site antigo (`escolacastelinhodacrianca.com.br`) ficou inacessível depois de um acordo com terceiro que não deu certo. Verificar no registro.br em nome de quem está o domínio. Se não for da escola, recuperar ou registrar outro.

## Sugestões para publicar

- É um site estático: GitHub Pages, Cloudflare Pages, Netlify ou Vercel servem, todos com plano gratuito.
- Apontar o domínio da escola e ativar HTTPS (todos os serviços acima fazem isso automaticamente).
- Opcional depois de publicar: imagem de compartilhamento (`og:image`) de 1200×630 com o brasão, cadastro no Google Meu Negócio (ajuda muito a aparecer no mapa) e `robots.txt` com `sitemap.xml`.
