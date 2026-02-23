# Manual do Usuário

## Introdução

O Alphaways Financial Comparator é uma ferramenta de análise financeira que ajuda você a tomar decisões informadas sobre a aquisição de bens de alto valor, comparando três modalidades:

1. **Compra à Vista** - Pagar o valor total imediatamente
2. **Financiamento** - Parcelar com juros (SAC ou PRICE)
3. **Consórcio** - Participar de um grupo de consórcio

## Navegação

### Tela Inicial (Dashboard)

Ao abrir o aplicativo, você verá a tela inicial com:
- Apresentação do sistema
- Três cards destacando as principais funcionalidades
- Botão "Nova Simulação" para iniciar

### Tela de Simulação

A tela de simulação é dividida em duas áreas:

- **Painel Esquerdo**: Formulário com todos os parâmetros
- **Painel Direito**: Resultados, KPIs e gráficos

---

## Parâmetros de Simulação

### Premissas Gerais

| Campo | Descrição | Exemplo |
|-------|-----------|---------|
| Tipo de Bem | Categoria do ativo | Imóvel, Veículo, Maquinário |
| Valor de Mercado | Preço atual do bem | R$ 500.000 |
| Inflação Anual | Taxa de inflação esperada | 5% |
| Taxa Selic/CDI | Taxa de juros de referência | 13,5% a.a. |

**Dica**: A taxa Selic/CDI é usada como custo de oportunidade - representa quanto seu dinheiro renderia se ficasse investido.

### Financiamento

| Campo | Descrição | Exemplo |
|-------|-----------|---------|
| Entrada | Valor pago à vista | R$ 100.000 |
| Prazo | Duração do financiamento | 360 meses (30 anos) |
| CET | Custo Efetivo Total anual | 16% a.a. |
| Amortização | Sistema de cálculo | SAC ou PRICE |

**SAC vs PRICE**:
- **SAC**: Parcelas começam altas e diminuem. Paga menos juros no total.
- **PRICE**: Parcelas fixas. Mais previsível, mas paga mais juros.

### Consórcio

| Campo | Descrição | Exemplo |
|-------|-----------|---------|
| Valor da Carta | Crédito disponível na contemplação | R$ 500.000 |
| Prazo Total | Duração do grupo | 200 meses |
| Taxa Adm. Total | Taxa de administração | 16% |
| Fundo de Reserva | Percentual para fundo | 4% |
| Seguro | Taxa anual de seguro | 2% a.a. |
| Correção Anual | Reajuste da carta e saldo | 5% |
| Mês da Contemplação | Quando receberá a carta | Mês 12 |
| Lance | Valor ofertado para antecipar | R$ 300.000 |

**Modo Pós-Contemplação**:
- **Reduz Prazo**: Parcela permanece constante, você termina antes
- **Reduz Parcela**: Prazo permanece igual, parcelas diminuem

### Reserva Investida

| Campo | Descrição | Exemplo |
|-------|-----------|---------|
| Capital Inicial | Valor total disponível | R$ 500.000 |
| Aporte Mensal | Valor que pode investir por mês | R$ 5.000 |

---

## Interpretando os Resultados

### KPIs (Indicadores Principais)

No topo do painel de resultados, você verá três cards:

1. **Consórcio (Valor Presente)** - Patrimônio líquido em valores de hoje
2. **Financiamento (Valor Presente)** - Patrimônio líquido em valores de hoje
3. **Compra à Vista (Valor Presente)** - Patrimônio líquido em valores de hoje

**O maior valor indica o cenário mais vantajoso financeiramente.**

### Gráfico de Evolução do Patrimônio

Mostra como o patrimônio líquido (em dinheiro) evolui ao longo dos anos para cada cenário.

- **Linha Dourada**: Consórcio
- **Linha Azul**: Financiamento
- **Linha Verde**: Compra à Vista

**Dica**: Use o controle deslizante abaixo do gráfico para dar zoom em períodos específicos.

### Gráfico de Fluxo de Caixa

Mostra o valor das parcelas mensais de cada cenário:
- Parcela do Consórcio
- Parcela do Financiamento
- Aporte Mensal (Compra à Vista)

---

## Gerando Relatório PDF

1. Configure todos os parâmetros desejados
2. Clique no botão **"Gerar Relatório PDF"**
3. Uma janela de impressão será aberta
4. Selecione "Salvar como PDF" ou imprima diretamente

O relatório inclui:
- Resumo de todos os parâmetros
- KPIs calculados
- Gráficos
- Aviso legal

---

## Dicas de Uso

### Para Imóveis
- Use prazos longos (240-360 meses) para financiamento
- Considere inflação entre 4-6% ao ano
- Lance de consórcio costuma ser 20-50% da carta

### Para Veículos
- Prazos menores (36-72 meses)
- Considere depreciação (o bem perde valor)
- Consórcio pode não valer a pena pelo prazo

### Para Maquinário
- Avalie o retorno que a máquina trará ao negócio
- Financiamento pode ser dedutível de impostos
- Considere manutenção e seguros

---

## Perguntas Frequentes

**P: Por que o consórcio às vezes aparece melhor que à vista?**

R: Porque no consórcio, parte do seu dinheiro fica investido em CDI enquanto você ainda não foi contemplado. Se o rendimento superar os custos do consórcio, pode ser vantajoso.

**P: O simulador considera todas as taxas?**

R: O simulador considera as principais taxas (administração, fundo de reserva, seguro, CET do financiamento), mas não inclui custos como cartório, ITBI, e taxas bancárias avulsas.

**P: Posso confiar 100% no resultado?**

R: O simulador é uma ferramenta educacional. Consulte sempre um profissional financeiro e obtenha propostas reais das instituições antes de tomar decisões.

---

## Suporte

Para dúvidas ou sugestões, entre em contato com a equipe Alphaways.
