# 🧮 Calculadora Simples em Python com Estruturas Condicionais

![Python Version](https://img.shields.io/badge/python-3.8+-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Status](https://img.shields.io/badge/status-concluído-brightgreen.svg)
![Level](https://img.shields.io/badge/nível-iniciante-orange.svg)

Uma calculadora simples desenvolvida em **Python 3** que realiza as quatro operações matemáticas básicas (adição, subtração, multiplicação e divisão), utilizando **estruturas condicionais (`if`, `elif`, `else`)** para determinar a lógica dos cálculos e **tratamento preventivo de divisão por zero**.

Projeto ideal para iniciantes que estão aprendendo lógica de programação e conceitos fundamentais do Python.

---

## 📌 Funcionalidades

- ➕ **Adição** (`num1 + num2`)
- ➖ **Subtração** (`num1 - num2`)
- ✖️ **Multiplicação** (`num1 * num2`)
- ➗ **Divisão** (`num1 / num2`) com validação defensiva contra **divisão por zero**
- 🛡️ **Validação de Operador:** aviso claro caso o usuário digite um símbolo não reconhecido
- 🔢 **Suporte a Decimais:** aceita números inteiros e com casas decimais via `float()`

---

## 🛠️ Conceitos de Programação Aplicados

| Conceito | Descrição | Exemplo no Código |
| :--- | :--- | :--- |
| **Entrada de Dados (`input`)** | Captura os dados digitados pelo usuário no terminal | `input("Digite um número: ")` |
| **Conversão de Tipos (`float`)** | Converte o texto recebido em número decimal | `num1 = float(input(...))` |
| **Estruturas Condicionais** | Avalia condições de cima para baixo para guiar o fluxo | `if`, `elif`, `else` |
| **Operadores de Comparação** | Compara a igualdade entre o símbolo digitado e o esperado | `operacao == "+"` |
| **Tratamento de Exceções** | Impede o erro crítico `ZeroDivisionError` checando se o divisor é 0 | `if num2 == 0:` |
| **f-strings** | Formata e interpola variáveis diretamente na string de saída | `f"{num1} + {num2} = {resultado}"` |

---

## 📂 Estrutura do Código

```python
# ==========================================
# CALCULADORA BÁSICA EM PYTHON
# Demonstração de Estruturas Condicionais
# ==========================================

print("=== CALCULADORA BÁSICA ===")
print("Operações disponíveis:")
print("+ : Adição")
print("- : Subtração")
print("* : Multiplicação")
print("/ : Divisão")
print("===========================")

# 1. Entrada de dados do usuário
num1 = float(input("Digite o primeiro número: "))
operacao = input("Escolha a operação (+, -, *, /): ")
num2 = float(input("Digite o segundo número: "))

# 2. Estrutura condicional para definir a lógica dos cálculos
if operacao == "+":
    resultado = num1 + num2
    print(f"\nResultado: {num1} + {num2} = {resultado}")

elif operacao == "-":
    resultado = num1 - num2
    print(f"\nResultado: {num1} - {num2} = {resultado}")

elif operacao == "*":
    resultado = num1 * num2
    print(f"\nResultado: {num1} * {num2} = {resultado}")

elif operacao == "/":
    # Tratamento especial: não é possível dividir por zero!
    if num2 == 0:
        print("\nErro: Não é possível dividir um número por zero!")
    else:
        resultado = num1 / num2
        print(f"\nResultado: {num1} / {num2} = {resultado}")

else:
    # Caso o usuário digite um símbolo inválido
    print("\nErro: Operação inválida! Por favor, escolha +, -, * ou /.")
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
Certifique-se de ter o **Python 3** instalado em sua máquina. Para verificar, abra o terminal e digite:
```bash
python --version
# ou
python3 --version
```

### Passo a Passo

1. **Clone este repositório:**
   ```bash
   git clone https://github.com/SEU-USUARIO/calculadora-simples-python.git
   ```

2. **Acesse o diretório do projeto:**
   ```bash
   cd calculadora-simples-python
   ```

3. **Execute o script:**
   ```bash
   python calculadora.py
   # ou no macOS/Linux:
   python3 calculadora.py
   ```

---

## 🖥️ Exemplo de Uso no Terminal

```text
=== CALCULADORA BÁSICA ===
Operações disponíveis:
+ : Adição
- : Subtração
* : Multiplicação
/ : Divisão
===========================
Digite o primeiro número: 15
Escolha a operação (+, -, *, /): +
Digite o segundo número: 8

Resultado: 15.0 + 8.0 = 23.0
```

### Exemplo com Validação de Divisão por Zero:
```text
Digite o primeiro número: 50
Escolha a operação (+, -, *, /): /
Digite o segundo número: 0

Erro: Não é possível dividir um número por zero!
```

---

## 🎯 Próximos Desafios (Para Praticar)

Se você quiser expandir este projeto, tente implementar:
- [ ] **Operação de Potência (`**`):** calcular $a^b$
- [ ] **Resto da Divisão (`%`):** descobrir o módulo de dois números
- [ ] **Laço de Repetição (`while`):** manter a calculadora rodando até o usuário optar por sair
- [ ] **Funções Modulares (`def`):** separar cada cálculo em sua própria função reutilizável
- [ ] **Tratamento com `try/except`:** capturar casos onde o usuário digita letras em vez de números

---

## 📄 Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para obter mais informações.

---

Feito com ☕ e dedicação por quem está aprendendo a programar! Se este projeto te ajudou, deixe uma ⭐ no repositório!
