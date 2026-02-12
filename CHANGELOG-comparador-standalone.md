# Changelog - Comparador Financeiro Standalone

## Versão 2.0 (2026-02-12)

### Novas Funcionalidades

#### Aporte Mensal do Planejamento
- Nova caixinha de input para definir o aporte mensal fixo do cliente
- Aporte é usado em todos os 3 cenários (Compra à Vista, Consórcio, Financiamento)
- Aportes continuam até o último mês da projeção (max entre prazo financiamento e consórcio)

#### Lógica dos Aportes
- **Compra à Vista**: Aporte entra como investimento que rende CDI
- **Consórcio**: Aporte ENTRA na reserva (positivo), parcela SAI da reserva (negativo)
- **Financiamento**: Aporte ENTRA no PV (positivo), parcela SAI do PV (negativo)

#### Capital Inicial de Reserva
- Agora afeta tanto Consórcio quanto Financiamento
- Consórcio: Reserva começa com `reserveCapital`
- Financiamento: PV começa com `reserveCapital - entrada`
- Corrigido bug que impedia valor 0 (antes substituía por 500k)

#### UI/UX
- Label alterado de "Taxa de Juros (% a.a.)" para "Custo Efetivo Total - CET (% a.a.)"
- Tooltip do gráfico de Fluxo de Caixa mostra sinais:
  - Parcelas: **-R$ X.XXX** (negativo = sai)
  - Aporte: **+R$ X.XXX** (positivo = entra)

---

## Versão Final (2026-02-10)

### Últimas Atualizações

#### UI/UX
- Logo Alphaways adicionado na tela de simulação (ao lado de "Análise Patrimonial")
- Logo com fundo branco e border-radius para melhor visibilidade
- Animações CSS de fundo na tela inicial (dashboard):
  - Gráficos de linha (dourado, azul, verde) no topo da tela
  - Gráficos de barras animados na parte inferior
  - Animações não cruzam a área de texto central

#### Correções
- Gráfico agora inclui o mês exato da contemplação (marcado como "C24")
- Lance não aparece mais no gráfico de fluxo de caixa (apenas parcela mensal)
- Pré-contemplação agora amortiza o saldo devedor corretamente

---

## Versão Anterior (2026-02-08)

### Resumo
Comparador financeiro que analisa 3 cenários de aquisição de bens:
- **Consórcio**: Modelo contratual brasileiro com contemplação, lance e correção anual
- **Financiamento**: SAC ou PRICE com entrada e juros
- **Compra à Vista**: Desembolso inicial + aportes mensais rendendo CDI

---

## Funcionalidades Implementadas

### 1. Consórcio - Modelo Contratual Real
- **Pré-contemplação**: Parcela fixa que INCLUI amortização (reduz saldo devedor)
- **Pós-contemplação**: Amortização FIXA calculada uma vez
- **Taxas separadas**: Taxa Adm, Fundo Reserva, Seguro (sobre saldo devedor)
- **Correção anual**: Carta, saldo e parcela corrigem no mês de aniversário

### 2. Dois Modos Pós-Contemplação
- **Reduz Prazo**: Parcela constante, prazo variável
- **Reduz Parcela**: Prazo constante, parcela variável (só visível com seguro > 0%)

### 3. Fórmulas Implementadas
```javascript
// PRÉ-CONTEMPLAÇÃO
parcela = (carta × (1 + taxas)) / prazo_total
amortizacao = carta / prazo_total
saldo_devedor -= amortizacao // Reduz mesmo antes da contemplação

// PÓS-CONTEMPLAÇÃO
amortizacao_fixa = saldo_devedor_pos_lance / meses_restantes
taxa_adm_mensal = (taxa_adm_total / prazo_total) × carta_atualizada
fundo_reserva_mensal = (fundo_reserva_total / prazo_total) × carta_atualizada
seguro_mensal = (seguro_anual / 12) × saldo_devedor_atual
parcela = amortizacao_fixa + taxa_adm + fundo_reserva + seguro
```

### 4. Compra à Vista
- Custo inicial = Valor de Mercado do Bem
- Aporte mensal FIXO = Valor de Mercado / Prazo do Consórcio
- Aportes rendem CDI durante o período
- Após prazo: patrimônio líquido rende CDI diretamente

### 5. Gráficos
- **Evolução do Saldo**: Inclui mês da contemplação para mostrar o "dente" do lance
- **Fluxo de Caixa Mensal**: Mostra apenas parcelas (sem lance)
- Labels: Anos normais (1A, 2A...) + Mês de contemplação marcado (C24)

---

## Correções de Bugs

1. **Seguro**: Taxa anual dividida por 12 (não aplicada inteira todo mês)
2. **Pré-contemplação**: Agora amortiza o saldo devedor (antes não amortizava)
3. **Contemplação sem lance**: Funciona corretamente com lance = 0
4. **Gráfico de contemplação**: Mostra o mês exato da contemplação
5. **Fluxo de caixa**: Não inclui lance no gráfico (apenas parcela mensal)

---

## Parâmetros de Entrada

### Premissas Gerais
- Tipo de Bem (Imóvel/Veículo/Maquinário)
- Valor de Mercado (R$)
- Valorização Anual (%)
- Taxa Selic/CDI (% a.a.)

### Financiamento
- Entrada (R$)
- Prazo (Meses)
- Taxa de Juros (% a.a.)
- Amortização (SAC/PRICE)

### Consórcio
- Valor da Carta (R$)
- Prazo Total (Meses)
- Taxa Adm. Total (%)
- Fundo de Reserva (%)
- Seguro (% a.a.)
- Correção Anual (%)
- Mês da Contemplação
- Lance (R$)
- Modo: Reduz Prazo / Reduz Parcela

### Reserva Investida
- Capital Inicial da Reserva (R$)

---

## Observações Técnicas

- O modelo reflete um **consórcio contratual**, não uma simulação econômica
- Com seguro = 0%, os modos "Reduz Prazo" e "Reduz Parcela" são equivalentes
- A diferença entre modos só é visível quando seguro > 0%
- CDI é calculado como taxa equivalente mensal da Selic anual
