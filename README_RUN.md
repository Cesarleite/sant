# Santiago Assistant – Como rodar local e implantar na Vercel

## Rodar localmente
1) Descompacte este projeto (santiago-assistant.zip) em uma pasta de sua preferência.
2) Abra um terminal nesta pasta e execute:

```bash
# 1. Instalar dependências (escolha pnpm ou npm)
pnpm install  # ou: npm install

# 2. Rodar em modo desenvolvimento
pnpm run dev  # ou: npm run dev
```

3) Acesse no navegador o endereço mostrado no terminal (normalmente http://localhost:5173).

Se preferir usar npm, troque os comandos equivalentes (npm install / npm run dev).

## Estrutura do projeto
- src/
  - App.jsx (aplicativo principal do assistente)
  - App.css, index.css, main.jsx
  - components/ui/ (biblioteca de componentes UI já inclusa)
- public/
- index.html
- package.json
- vite.config.js

## Build para produção
```bash
pnpm build  # ou: npm run build
```
Os arquivos prontos para publicar ficarão em `dist/`.

## Deploy na Vercel
1) Faça push deste projeto para um repositório Git (GitHub/GitLab/Bitbucket).
2) No painel da Vercel, clique em "New Project" e importe o repositório.
3) O preset deve ser Vite/React. Caso precise ajustar manualmente:
   - Build Command: `pnpm build` (ou `npm run build`)
   - Output Directory: `dist`
4) Clique em Deploy.

Este repositório contém um arquivo `vercel.json` com as configurações acima para facilitar.

## Dúvidas comuns
- ERR_PNPM_NO_IMPORTER_MANIFEST_FOUND: você está no diretório errado. Entre na pasta raiz do projeto onde fica o package.json.
- Porta 5173 não abre: confirme que o comando `pnpm run dev` está rodando e não houve erro.

Buen Camino! 🚶‍♂️✨

