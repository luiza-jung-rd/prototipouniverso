# Payments Universo TOTVS (protótipo)

Protótipo throwaway da experiência TOTVS Pay, baseado no [arquivo Figma](https://www.figma.com/design/0lRpjpN4PLJkvF377w8GSh/Untitled).

Fluxo: **paywall → credenciamento → dashboard**. No dashboard, a funcionalidade interativa é **links de pagamento** (criar, listar, copiar, inativar, detalhar). Os números do dashboard e da listagem são dados falsos.

## Como rodar

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

Estado fica só em memória: recarregar a página volta os links mockados e pede o credenciamento de novo.
