# Metodologia de Cálculos

## Visão Geral

O simulador compara três cenários de aquisição de um bem, todos partindo do mesmo capital inicial disponível. O objetivo é determinar qual modalidade resulta em maior patrimônio líquido ao final do período.

## Premissas Fundamentais

### Capital Inicial
O usuário define um **Capital de Reserva** que representa o valor total disponível para a aquisição. Este valor é o ponto de partida para todos os cenários.

### Custo de Oportunidade
O dinheiro não utilizado imediatamente rende a taxa CDI (aproximada pela Selic), representando o custo de oportunidade do capital.

### Valor Presente
Todos os valores futuros são trazidos a valor presente usando a taxa de inflação, permitindo comparação real entre cenários com diferentes horizontes temporais.

---

## Cenário 1: Compra à Vista

### Lógica
1. Desembolsa o valor total do bem no mês 0
2. O patrimônio inicial fica negativo (-valor do bem)
3. Aportes mensais são investidos em CDI
4. Ao longo do tempo, os aportes acumulados superam o custo inicial

### Fórmulas

```
Patrimônio Líquido(mês) = Investimentos Acumulados - Valor do Bem

Investimentos(mês) = Investimentos(mês-1) × (1 + CDI_mensal) + Aporte_mensal
```

### Características
- Liquidez imediata do bem
- Sem pagamento de juros ou taxas
- Depende exclusivamente do rendimento dos aportes

---

## Cenário 2: Financiamento

### Lógica
1. Dá entrada (sai do PV - Patrimônio em Valor presente)
2. O restante do capital inicial rende CDI
3. Parcelas mensais saem do PV
4. Aportes mensais entram no PV
5. Saldo devedor é amortizado conforme sistema escolhido

### Sistema SAC (Sistema de Amortização Constante)

```
Amortização = Saldo Devedor / Meses Restantes
Juros = Saldo Devedor × Taxa Mensal
Parcela = Amortização + Juros + Taxa Administrativa

Características:
- Amortização constante
- Parcelas decrescentes
- Mais juros no início
```

### Sistema PRICE (Tabela Price)

```
Parcela = Principal × [i × (1+i)^n] / [(1+i)^n - 1]

Onde:
- i = taxa mensal
- n = número de parcelas
- Principal = valor financiado

Amortização = Parcela - Juros
Juros = Saldo Devedor × Taxa Mensal

Características:
- Parcelas fixas (até correção anual)
- Amortização crescente
- Mais juros totais que SAC
```

### Patrimônio Líquido

```
PV(mês) = PV(mês-1) × (1 + CDI) - Parcela + Aporte
```

---

## Cenário 3: Consórcio

### Lógica
O modelo segue as regras contratuais de um consórcio brasileiro real.

### Fases

#### Pré-Contemplação (antes de receber a carta)
- Parcela fixa = (Carta × (1 + Taxas)) / Prazo Total
- Amortização proporcional reduz o saldo devedor
- Sem posse do bem

#### Contemplação
- Pode ocorrer por sorteio ou lance
- Lance (se houver) sai da reserva e abate do saldo devedor
- Define-se a amortização fixa para o restante do contrato

#### Pós-Contemplação
- Amortização FIXA (calculada uma vez na contemplação)
- Dois modos possíveis:
  - **Reduz Prazo**: Parcela constante, prazo variável
  - **Reduz Parcela**: Prazo constante, parcela variável

### Fórmulas

```
# Pré-Contemplação
Parcela_pre = (Carta × (1 + Taxa_adm + Fundo_reserva)) / Prazo_total
Amortização_pre = Carta / Prazo_total

# Contemplação
Amortização_fixa = Saldo_devedor_pos_lance / Meses_restantes

# Pós-Contemplação
Taxa_adm_mensal = (Taxa_adm_total / Prazo_total) × Carta_corrigida
Fundo_reserva_mensal = (Fundo_reserva_total / Prazo_total) × Carta_corrigida
Seguro_mensal = (Seguro_anual / 12) × Saldo_devedor

# Modo Reduz Prazo
Parcela = Valor_alvo (constante, corrigido anualmente)

# Modo Reduz Parcela
Parcela = Amortização_fixa + Taxas_mensais
```

### Correção Anual
No mês de aniversário do grupo (13, 25, 37...):
- Carta de crédito corrige pela taxa definida
- Saldo devedor corrige proporcionalmente
- Amortização fixa é recalculada

### Patrimônio Líquido

```
Reserva(mês) = Reserva(mês-1) × (1 + CDI) - Parcela - Lance + Aporte
Patrimônio = Reserva
```

---

## Valor Presente (VP)

Para comparação justa entre cenários, todos os valores são trazidos a valor presente:

```
VP = Valor_nominal / (1 + Inflação_anual)^anos
```

Isso permite comparar:
- R$ 1.000.000 daqui a 30 anos
- R$ 500.000 daqui a 15 anos
- R$ 200.000 hoje

Todos convertidos para o poder de compra atual.

---

## Imposto de Renda sobre Investimentos

O sistema considera a tabela regressiva de IR para renda fixa:

| Prazo | Alíquota |
|-------|----------|
| Até 180 dias | 22,5% |
| 181 a 360 dias | 20% |
| 361 a 720 dias | 17,5% |
| Acima de 720 dias | 15% |

*Nota: Na versão atual, o IR é considerado apenas no cálculo final do rendimento.*

---

## Limitações do Modelo

1. **Não considera custos de cartório e ITBI** na compra à vista ou financiamento
2. **Não considera valorização/depreciação do bem** (assume que todos terão o mesmo bem ao final)
3. **Taxa Selic/CDI constante** ao longo de toda a simulação
4. **Inflação constante** para cálculo do valor presente
5. **Não considera antecipação de parcelas** ou quitação antecipada
