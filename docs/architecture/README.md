# Arquitetura do Sistema

## Visão Geral

O Alphaways Financial Comparator é uma aplicação web construída com React e TypeScript que permite aos usuários comparar diferentes modalidades de aquisição de bens (imóveis, veículos, maquinário).

## Stack Tecnológica

| Camada | Tecnologia | Versão |
|--------|------------|--------|
| UI Framework | React | 19.x |
| Linguagem | TypeScript | 5.8.x |
| Build Tool | Vite | 6.x |
| Gráficos | Recharts | 3.x |
| Estilização | Tailwind CSS (inline) | - |

## Estrutura de Diretórios

```
alphaways-financial-comparator/
├── components/           # Componentes React
│   ├── Dashboard.tsx     # Tela inicial
│   ├── SimulationForm.tsx # Formulário de parâmetros
│   ├── ResultsPanel.tsx  # Painel de resultados e gráficos
│   └── ui/               # Componentes de UI reutilizáveis
├── services/             # Serviços e lógica de negócio
│   └── geminiService.ts  # Integração com API (opcional)
├── utils/                # Funções utilitárias
├── docs/                 # Documentação
│   ├── architecture/     # Documentação de arquitetura
│   └── guides/           # Guias de uso
├── tests/                # Testes automatizados
├── App.tsx               # Componente raiz
├── index.tsx             # Entry point
├── types.ts              # Definições de tipos TypeScript
├── constants.ts          # Constantes e valores padrão
└── comparador-standalone.html  # Versão standalone
```

## Fluxo de Dados

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Dashboard     │────▶│  SimulationForm  │────▶│  ResultsPanel   │
│   (Início)      │     │   (Parâmetros)   │     │   (Gráficos)    │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                               │                        ▲
                               ▼                        │
                        ┌──────────────────┐            │
                        │  SimulationParams │───────────┘
                        │     (State)       │
                        └──────────────────┘
```

## Componentes Principais

### App.tsx
Componente raiz que gerencia a navegação entre Dashboard e Simulação.

### Dashboard.tsx
Tela inicial com apresentação do produto e botão para iniciar simulação.

### SimulationForm.tsx
Formulário completo com todos os parâmetros de simulação organizados em seções:
- Premissas Gerais
- Financiamento
- Consórcio
- Reserva Investida

### ResultsPanel.tsx
Painel de resultados contendo:
- KPIs principais (Valor Presente de cada cenário)
- Gráfico de evolução do patrimônio
- Gráfico de fluxo de caixa mensal
- Controle de zoom temporal

## Sistema de Tipos

### SimulationParams
Interface principal que define todos os parâmetros de entrada da simulação.

### MonthlyFlow
Interface que representa o fluxo financeiro de cada mês da simulação.

### SimulationResult
Interface que encapsula o resultado completo da simulação.

## Paleta de Cores

| Nome | Hex | Uso |
|------|-----|-----|
| Petrol Deep | #051F25 | Background principal |
| Petrol Surface | #0B2D36 | Cards e superfícies |
| Gold Prime | #D4B483 | Destaque (Consórcio) |
| Tech Blue | #2563EB | Financiamento |
| Emerald | #10B981 | Compra à Vista |

## Versão Standalone

O arquivo `comparador-standalone.html` é uma versão completa da aplicação em um único arquivo HTML, usando:
- Chart.js para gráficos
- CSS inline
- JavaScript vanilla

Esta versão pode ser aberta diretamente no navegador sem necessidade de servidor.
