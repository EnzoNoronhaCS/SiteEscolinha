# Escola Castelinho da Criança: site institucional

Site estático da Escola Castelinho da Criança (Paranoá, Brasília-DF), no ar em https://escolacastelinhodacrianca.com.br/. Todo o conteúdo é em português do Brasil.

**Regra de ouro:** as informações do site no ar são as verdadeiras. O objetivo é corrigir e melhorar sem refazer do zero e sem mudar a identidade visual (logo, verde/amarelo/vermelho).

`referencia/prototipo.html` e `referencia/HANDOFF-prototipo.md` são um protótipo antigo com **dados errados** (WhatsApp, nomes de turmas, horários, Instagram). Servem só como ideia de interface, nunca como fonte de informação. A especificação completa da revisão está em `referencia/prompt-revisao.md`.

## Estrutura

- 5 páginas: `index.html`, `creche.html`, `pre-escola.html`, `reforco-escolar.html`, `contato.html`.
- `estilo.css`: CSS compartilhado (Tailwind já compilado, sem build). Classes Tailwind novas **não existem** a menos que estejam no arquivo; estilos novos ficam no bloco "Revisão" no fim do arquivo.
- `script.js`: JS compartilhado, sem bibliotecas.
- Cabeçalho e rodapé são repetidos nas 5 páginas: qualquer mudança neles precisa ser feita nas 5.
- `imagens/`: fotos em webp com nomes descritivos. `imagens/CATALOGO.md` diz o que cada foto mostra e onde é usada. Fotos fora de uso ficam em `imagens/_nao-usadas/`.
- `fontes/`: Nunito e Quicksand locais (o site não carrega Google Fonts).
- Sem framework, sem build, sem npm. Não migrar para React, Next, Tailwind CLI, WordPress etc.

Para testar: abrir os `.html` direto no navegador ou rodar `python3 -m http.server` nesta pasta. Conferir em 375 px e em 1280 px.

## Dados que não podem mudar

- WhatsApp: (61) 99971-0675, `https://wa.me/5561999710675`. O número (61) 99852-6089 é do protótipo e está **errado**.
- Fixo: (61) 3369-6680, `tel:+556133696680`. E-mail: escolacastelinhodacrianca@gmail.com
- Instagram: https://www.instagram.com/castelinhodacriancaa/ (dois "a"). Facebook: https://www.facebook.com/profile.php?id=100063696559764
- Endereço: Quadra 14, Conjunto D, Lotes 25/26 – Paranoá, Brasília-DF, CEP 71571-404. Coordenadas -15.77450, -47.77700 (canto da Q 14 Conjunto C D com a Conjunto A C). A ficha do lugar no Google Maps e as coordenadas antigas (-15.774809, -47.776314) apontam para o lado oposto da quadra: o mapa e as rotas do site usam as coordenadas, nunca a ficha do lugar
- Cantinho do Sucesso Educação Infantil Ltda, CNPJ 13.166.256/0001-15. Funcionamento: segunda a sexta, 7h às 18h.
- Turmas: Maternal I (2 anos), Maternal II (3 anos), Jardim I (4 anos, 1º período), Jardim II (5 anos, 2º período), Reforço Escolar (1º ao 5º ano), Contraturno (4 a 10 anos, com almoço). Nunca "Maternal 1/2" nem "Período 1/2".
- Creche e pré-escola: matutino 8h às 12h, vespertino 13h30 às 17h30, integral 7h às 18h. Reforço: manhã 9h às 12h, tarde 14h às 17h; contraturno com almoço no turno oposto.
- Bairros: Paranoá, Paranoá Parque, Itapoã, Itapoã Parque, Del Lago, Fazendinha, Condomínio Entre Lagos, Condomínio Novo Horizonte e Condomínio La Font.

Não inventar preço, vaga, tour, depoimento nem ano de fundação. Fotos com rosto de criança só com autorização dos pais. Não apagar arquivos sem perguntar e não fazer deploy nem mexer em DNS.

Verificação rápida de dados errados:

```sh
grep -rn "99852\|998526089\|Período 1\|Período 2\|Maternal 1\|Maternal 2\|@castelinhodacrianca[^a]" --include=*.html --include=*.js . | grep -v referencia/
```
