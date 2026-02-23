# Alphaways Financial Comparator

Comparador financeiro avançado para análise de aquisição de ativos. Simule e compare o impacto no seu patrimônio líquido entre **compra à vista**, **financiamento** e **consórcio** com projeções de longo prazo.

![Alphaways](logo-alphaways-transparente-removebg-preview.png)

## Funcionalidades

- **Comparação completa** entre 3 modalidades de aquisição (À Vista, Financiamento, Consórcio)
- **Cálculo de amortização** SAC (decrescente) e PRICE (fixa)
- **Valor Presente Líquido (VPL)** - valores trazidos a valor de hoje considerando inflação
- **Patrimônio Líquido Real** - evolução do saldo em dinheiro ao longo do tempo
- **Gráficos interativos** com zoom temporal
- **Geração de relatório PDF** com todos os parâmetros e resultados
- **Suporte a diferentes tipos de bens**: Imóveis, Veículos, Maquinário

## Screenshots

O sistema possui duas telas principais:

1. **Dashboard** - Tela inicial com apresentação e acesso à simulação
2. **Simulação** - Painel completo com formulário de parâmetros, KPIs e gráficos

## Parâmetros de Simulação

### Premissas Gerais
- Tipo de bem (Imóvel, Veículo, Maquinário)
- Valor de mercado
- Inflação anual
- Taxa Selic/CDI (custo de oportunidade)

### Financiamento
- Entrada
- Prazo em meses
- CET (Custo Efetivo Total) anual
- Sistema de amortização (SAC ou PRICE)

### Consórcio
- Valor da carta de crédito
- Prazo total do grupo
- Taxa de administração
- Fundo de reserva
- Seguro anual
- Correção anual
- Mês de contemplação
- Valor do lance
- Modo pós-contemplação (Reduz Prazo ou Reduz Parcela)

### Reserva Investida
- Capital inicial disponível
- Aporte mensal do planejamento financeiro

## Tecnologias

- **React 19** - Interface de usuário
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Recharts** - Gráficos (versão React)
- **Chart.js** - Gráficos (versão standalone HTML)

## Como Executar

### Pré-requisitos
- Node.js (v18+)

### Instalação

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

### Versão Standalone

Também há uma versão standalone em HTML puro que pode ser aberta diretamente no navegador:

```bash
# Abrir no navegador
open comparador-standalone.html
```

## Estrutura do Projeto

```
├── App.tsx                    # Componente principal React
├── index.tsx                  # Entry point
├── components/                # Componentes React
├── services/                  # Lógica de negócio
├── utils/                     # Utilitários
├── types.ts                   # Definições de tipos
├── constants.ts               # Constantes
├── comparador-standalone.html # Versão standalone (HTML puro)
├── docs/                      # Documentação adicional
└── tests/                     # Testes
```

## Metodologia de Cálculo

### Financiamento
- **SAC**: Amortização constante, parcelas decrescentes
- **PRICE**: Parcelas fixas, amortização crescente

### Consórcio
O modelo segue as regras contratuais de um consórcio brasileiro:
1. Pré-contemplação: parcela fixa com amortização proporcional
2. Pós-contemplação: amortização fixa calculada uma vez
3. Correção anual no mês de aniversário do grupo
4. Dois modos: "Reduz Prazo" ou "Reduz Parcela"

### Valor Presente
Todos os valores futuros são trazidos a valor presente usando a taxa de inflação, permitindo comparação real entre cenários.

## Aviso Legal

Este simulador é disponibilizado exclusivamente para fins educacionais e de estudo, não constituindo oferta, recomendação ou aconselhamento financeiro. As taxas, índices e valores apresentados são meramente ilustrativos e podem não refletir as condições reais de mercado. Consulte instituições financeiras para informações atualizadas.

## Licença

Projeto privado - Alphaways Financial Intelligence
