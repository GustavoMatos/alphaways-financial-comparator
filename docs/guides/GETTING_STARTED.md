# Guia de Início Rápido

## Pré-requisitos

- Node.js v18 ou superior
- npm ou yarn
- Navegador moderno (Chrome, Firefox, Safari, Edge)

## Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/alphaways-financial-comparator.git
cd alphaways-financial-comparator
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Execute em modo desenvolvimento

```bash
npm run dev
```

O servidor de desenvolvimento será iniciado em `http://localhost:5173`

## Build para Produção

```bash
# Gerar build otimizado
npm run build

# Preview do build
npm run preview
```

Os arquivos de produção serão gerados na pasta `dist/`.

## Versão Standalone

Se você não precisa do ambiente de desenvolvimento React, pode usar a versão standalone:

```bash
# macOS
open comparador-standalone.html

# Windows
start comparador-standalone.html

# Linux
xdg-open comparador-standalone.html
```

A versão standalone é um único arquivo HTML com todo o JavaScript e CSS inline, sem necessidade de instalação.

## Estrutura de Comandos

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Gera build de produção |
| `npm run preview` | Preview do build de produção |

## Próximos Passos

1. Leia o [Manual do Usuário](./USER_MANUAL.md) para entender todas as funcionalidades
2. Consulte a [Metodologia de Cálculos](../architecture/CALCULATIONS.md) para entender a lógica financeira
3. Veja a [Arquitetura](../architecture/README.md) se quiser contribuir com o código
