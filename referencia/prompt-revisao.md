# Prompt para o Claude Code: revisão do site da Escola Castelinho da Criança

> Cole tudo abaixo no Claude Code, aberto na pasta do projeto do site.

---

## 1. Contexto

Você vai trabalhar no site da **Escola Castelinho da Criança**, uma escola de educação infantil no Paranoá (Brasília-DF). O site está no ar em **https://escolacastelinhodacrianca.com.br/** e é estático, feito à mão: HTML, CSS e JS, com páginas `.html` e imagens `.webp` em `/imagens/`.

Páginas atuais:
- `index.html`: início
- `creche.html`: Maternal I e II
- `pre-escola.html`: Jardim I e II
- `reforco-escolar.html`: Reforço Escolar e Contraturno
- `contato.html`: contato

Existe também um **protótipo meu** (`referencia/prototipo.html`), uma página única que fiz antes de ter acesso ao site real. **Ele foi uma prévia e é especulação minha.** Várias informações dele estão erradas: número do WhatsApp, nomes das turmas, horários e Instagram. Use o protótipo **só como referência de ideias de interface**, nunca como fonte de informação.

**Regra de ouro:** as informações do site no ar são as verdadeiras. O site no ar é a base. O objetivo é **corrigir bugs e melhorar**, não refazer do zero nem mudar a identidade do site.

Se o código do site não estiver na pasta, me avise antes de fazer qualquer coisa. Não recrie o site a partir do protótipo.

---

## 2. Dados que NÃO podem mudar (fonte da verdade)

Esses dados têm que ficar **idênticos** ao site no ar, em todas as páginas. Se encontrar qualquer valor diferente (inclusive vindo do protótipo), o certo é o desta lista.

### WhatsApp
- Exibição: **(61) 99971-0675**
- Link: `https://wa.me/5561999710675`
- ⚠️ O número **(61) 99852-6089 / 5561998526089** é do meu protótipo e está **ERRADO**. Ele não pode aparecer em lugar nenhum.

### Outros contatos
- Telefone fixo: **(61) 3369-6680**, `tel:+556133696680`
- E-mail: **escolacastelinhodacrianca@gmail.com**
- Instagram: **https://www.instagram.com/castelinhodacriancaa/** (com dois "a" no final; o `@castelinhodacrianca` do protótipo está errado)
- Facebook: **https://www.facebook.com/profile.php?id=100063696559764**
- Endereço: **Quadra 14, Conjunto D, Lotes 25/26 – Paranoá, Brasília-DF, CEP 71571-404**
- Coordenadas: -15.774809, -47.776314
- Razão social: **Cantinho do Sucesso Educação Infantil Ltda**, CNPJ **13.166.256/0001-15**
- Funcionamento: **segunda a sexta, 7h às 18h**; sábado e domingo fechado

### Nomes das turmas (exatamente assim)
- **Maternal I**: 2 anos
- **Maternal II**: 3 anos
- **Jardim I**: 4 anos (1º período)
- **Jardim II**: 5 anos (2º período)
- **Reforço Escolar**: 1º ao 5º ano do Ensino Fundamental
- **Contraturno**: 4 a 10 anos, com almoço (para quem estuda em outra escola)

⚠️ "Maternal 1/2" e "Período 1/2" são nomes do protótipo e estão **ERRADOS**. Use os nomes acima, com algarismos romanos.

### Horários (exatamente assim)
Creche e pré-escola:
- **Matutino:** 8h às 12h
- **Vespertino:** 13h30 às 17h30
- **Integral:** 7h às 18h (a criança estuda em um turno e tem recreação no outro)

Reforço escolar:
- **Manhã:** 9h às 12h
- **Tarde:** 14h às 17h
- **Contraturno:** com almoço, no turno oposto ao da escola regular

⚠️ A sequência "7h chegada / 11h almoço / 17h saída" do protótipo é inventada. Não use.

### Bairros atendidos
Paranoá, Paranoá Parque, Itapoã, Itapoã Parque, Del Lago, Fazendinha, Condomínio Entre Lagos, Condomínio Novo Horizonte e Condomínio La Font.

### Conteúdo pedagógico e atividades
Mantenha o texto do site no ar: alinhamento à BNCC; inglês, informática, balé e capoeira; as atividades listadas em cada página. Pode melhorar a redação, mas não invente nem tire informação.

---

## 3. Antes de mexer em qualquer coisa

1. Se a pasta ainda não for um repositório git, rode `git init` e faça um commit com o estado atual (`chore: estado original do site no ar`), para eu poder voltar atrás.
2. Faça um **inventário** e me mostre antes de editar:
   - a estrutura de arquivos;
   - onde estão o CSS e o JS (arquivo próprio ou inline em cada página);
   - quais partes se repetem entre páginas (cabeçalho, rodapé);
   - a lista de todas as imagens: quais são usadas, em quais páginas, quais estão duplicadas e quais não são usadas.
3. Rode uma busca para confirmar que o site no ar não tem dados errados:
   `grep -rn "99852\|998526089\|Período 1\|Período 2\|Maternal 1\|Maternal 2\|@castelinhodacrianca[^a]" .`

---

## 4. Bugs para corrigir

Trabalhe nesta ordem. Faça **um commit por item** (ou por grupo pequeno) com mensagem clara.

### Prioridade alta
1. **Lista de bairros quebrada (index):** aparece como texto corrido e duplicado ("Paranoá Paranoá Parque Itapoã Itapoã Parque…"). Transforme numa lista visual de verdade (chips/tags ou lista), sem repetição, com os 9 bairros da seção 2.
2. **"Ver tour virtual" sem destino (index):** o link não tem `href`. Se não existir tour virtual, **remova o botão** e me avise. Não invente um link.
3. **"Ver mapa" sem destino (rodapé de todas as páginas e contato):** aponte para a rota do Google Maps que já existe na página de contato:
   `https://www.google.com/maps/dir/?api=1&destination=Escola%20Castelinho%20da%20Crian%C3%A7a%2C%20Q%2014%20Conjunto%20D%2C%20Lotes%2025%2F26%2C%20Parano%C3%A1%2C%20Bras%C3%ADlia%20-%20DF`
4. **Instagram com dois destinos (contato):** a seção principal aponta para uma publicação (`/p/C_UA_HcAjxq/`) e o rodapé aponta para o perfil. Padronize tudo para o perfil.
5. **Links em texto cru no rodapé:** URLs completas de Instagram, Facebook e WhatsApp aparecem como texto. Troque por links com texto legível ou ícone, com `aria-label`.
6. **Item "Ensino" no menu sem função:** hoje é um rótulo que não é link. Transforme num dropdown acessível de verdade (abre com clique e teclado, `aria-expanded`, funciona no celular) ou remova o rótulo e deixe Creche / Pré-escola / Reforço direto no menu. Me mostre as duas opções e eu escolho.

### Prioridade média
7. **Texto inconsistente de idade no rodapé e na FAQ:** dizem que a escola atende "de 2 a 5 anos", mas há reforço até o 5º ano e contraturno até 10 anos. Reescreva para algo como "Educação infantil de 2 a 5 anos, reforço escolar do 1º ao 5º ano e contraturno de 4 a 10 anos". Use só os dados da seção 2.
8. **Imagens fora de contexto nas subpáginas:** `pre-escola.html` e `reforco-escolar.html` usam fotos com alt "Sala do maternal" e "da creche". Depois de ver as fotos (seção 6), escolha imagens que façam sentido para cada página.
9. **Imagens repetidas:** `hero-bg.jpg` aparece duas vezes na index, e `escola(9).webp` aparece em "Ensino de Qualidade" e de novo na galeria. Tire a repetição.
10. **Canonical x links internos:** o canonical é `/creche`, `/pre-escola` etc., mas os links usam `.html`. Verifique se o servidor serve as URLs sem `.html`. Se servir, padronize os links sem extensão; se não servir, ajuste o canonical para `.html`. Pode ser que eu precise te dizer onde o site está hospedado.
11. **Metadados duplicados:** o `meta-ICBM` repete o `geo.position`. Revise as meta tags de cada página (title, description, og:*, twitter:*) para que cada página tenha título e descrição próprios, sem duplicar à toa.
12. **Possível metadado aparecendo como texto visível:** a ferramenta que analisou o site viu o bloco de meta tags/front matter (`---`) no conteúdo de algumas páginas. **Confirme abrindo no navegador.** Pode ter sido só a ferramenta. Se aparecer de verdade, corrija.
13. **Ano no rodapé:** "© 2026" fixo. Deixe dinâmico com JS (com 2026 como fallback no HTML).

### Prioridade baixa
14. **Repetições no rodapé:** endereço e link de WhatsApp aparecem duas vezes no mesmo rodapé. Deixe uma vez cada.
15. **Cabeçalho e rodapé duplicados em 5 arquivos:** não introduza framework nem build. Se for simples, sugira uma forma de manter os 5 sincronizados (por exemplo, um script pequeno que gere os parciais). Só implemente se eu aprovar.

---

## 5. Melhorias (trazidas do meu protótipo, com cuidado)

Pode aproveitar do `referencia/prototipo.html` **as ideias de interface abaixo**, adaptando ao visual do site no ar e **sempre com os dados da seção 2**:

1. **Formulário "Monte sua mensagem":** nome do responsável, nome da criança (opcional), turma/idade (select com as turmas reais) e dúvida (opcional). Mostra uma prévia e abre o WhatsApp `5561999710675` com a mensagem pronta. Valida nome e turma antes de enviar. Lugar sugerido: página de contato e/ou final da index.
2. **Botões de rota na página de contato:** "Abrir no Google Maps", "Ir com Waze" e "Copiar endereço" (com fallback se a área de transferência falhar). Se fizer sentido, inclua um iframe do Google Maps com `loading="lazy"`.
3. **Botão flutuante de WhatsApp** no canto da tela, em todas as páginas (só ícone no celular).
4. **Mensagens pré-preenchidas diferentes por botão** (matrícula, visita, dúvida), mantendo a do site no ar: "Olá! Vim pelo site e gostaria de saber mais sobre as matrículas."
5. **Destaque visual das turmas por idade:** algo parecido com a "régua de idades" do protótipo, usando as 6 turmas reais. Opcional: me mostre antes.
6. **Acessibilidade:** `:focus-visible` visível, menu mobile com `aria-expanded`, contraste ok, `prefers-reduced-motion` respeitado e textos alternativos descritivos.

⚠️ **NÃO copie do protótipo**, porque são especulações minhas e ainda não foram confirmadas:
- o aviso "As matrículas são feitas presencialmente, na secretaria" e o passo a passo de matrícula presencial;
- o "Desde 2011";
- as descrições do que a criança aprende em cada turma (use o texto do site no ar).

Se achar que algum desses ajudaria, liste numa seção "Para confirmar com o dono da escola" no final, sem colocar no site.

---

## 6. Imagens (importante)

As fotos da escola foram tiradas com a câmera do meu pai e eu ainda não tinha visto. **Abra e olhe cada imagem** (você consegue ler imagens com a ferramenta de leitura de arquivos) antes de decidir qualquer coisa.

1. **Catálogo:** crie `imagens/CATALOGO.md` com uma tabela: arquivo atual → o que aparece de verdade na foto → em qual página/seção está sendo usada → qualidade (boa / escura / torta / borrada) → sugestão.
   Inclua também `logo.webp`, `og-castelinho.jpg`, `hero-bg.jpg` e os mascotes (`mascote-bebe.webp`, `mascote-menina.webp`, `mascote-menino.webp`).
2. **Alt text:** compare o alt de cada imagem com o que a foto mostra de verdade e corrija quando não bater. Alt em português, descritivo e curto, sem encher de palavra-chave.
3. **Nomes de arquivo:** renomeie `escola(36).webp` e afins para nomes descritivos sem parênteses e sem acento (por exemplo, `patio-coberto-brinquedos.webp`). Atualize **todas** as referências e confirme com `grep` que não sobrou nenhum caminho quebrado.
4. **Escolha por página:** cada página deve mostrar fotos que combinem com ela (creche → salas do maternal e brinquedoteca; reforço → sala do reforço e informática; e assim por diante). Na galeria, nada de foto repetida.
5. **Otimização:** `width` e `height` em todas as `<img>` (evita pulo de layout); `loading="lazy"` em tudo que não está no topo da página; `fetchpriority="high"` na imagem principal do hero; hero em `.webp`; tamanho razoável (até ~1600px de largura no hero, ~1000px na galeria).
6. **Fotos novas da câmera:** se eu colocar fotos originais numa pasta `fotos-originais/`, converta para `.webp` com qualidade ~80 e **remova os metadados EXIF, principalmente a localização GPS**, antes de publicar. Não apague os originais.
7. **Crianças nas fotos:** se alguma foto mostrar rosto de criança identificável, **não publique** e me avise. A escola precisa da autorização dos pais para isso.
8. **Fotos ruins:** se houver foto escura, torta ou borrada, só me avise na tabela. Não edite a foto sem eu pedir.

---

## 7. O que NÃO fazer

- Não mudar WhatsApp, telefones, endereço, nomes de turmas, horários nem redes sociais (seção 2).
- Não trocar a identidade visual inteira (logo, cores principais) do site no ar. Melhorar sim, descaracterizar não.
- Não migrar para React, Next, Tailwind, WordPress ou qualquer build. O site continua estático.
- Não inventar informação: preços, vagas, tour virtual, depoimentos, ano de fundação.
- Não apagar arquivos sem me perguntar (imagens não usadas vão para uma pasta `_nao-usadas/`).
- Não fazer deploy nem mexer em DNS/hospedagem.

---

## 8. Como trabalhar comigo

1. Primeiro me mostre o **inventário** (seção 3) e um **plano** curto, na ordem das seções 4 → 6 → 5.
2. Faça os itens em etapas, com commit por item, e me mostre o que mudou.
3. Quando tiver uma decisão de design ou dúvida sobre informação, **pergunte**, não chute.
4. Teste em **celular (~375px)** e **desktop (~1280px)**: menu mobile, links do WhatsApp, botões de mapa e formulário.
5. **Checklist final** antes de dizer que terminou:
   - [ ] `grep` não acha `99852`, `998526089`, `Período 1`, `Período 2`, `Maternal 1`, `Maternal 2`
   - [ ] todos os links `wa.me` usam `5561999710675`
   - [ ] todas as páginas usam Maternal I/II, Jardim I/II, Reforço Escolar, Contraturno
   - [ ] horários idênticos à seção 2 em todas as páginas
   - [ ] nenhum link com `href` vazio ou `#` sem função
   - [ ] nenhuma `<img>` com caminho quebrado; todas com alt, width e height
   - [ ] nenhuma foto repetida na mesma página
   - [ ] fotos novas sem EXIF/GPS
   - [ ] site funciona abrindo os `.html` direto no navegador e num servidor local (`python3 -m http.server`)
6. No fim, me entregue um resumo: o que foi corrigido, o que foi melhorado e a lista **"Para confirmar com o dono da escola"**.
