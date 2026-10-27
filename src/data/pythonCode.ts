export interface CodeExplanation {
  id: string;
  title: string;
  badge: string;
  description: string;
  codeSnippet: string;
  tip: string;
}

export const BASIC_PYTHON_CODE = `# ==========================================
# CALCULADORA SIMPLES EM PYTHON
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
# Usamos float() para aceitar tanto números inteiros (ex: 10) quanto decimais (ex: 4.5)
num1 = float(input("Digite o primeiro número: "))
operacao = input("Escolha a operação (+, -, *, /): ")
num2 = float(input("Digite o segundo número: "))

# 2. Estrutura condicional para definir a lógica dos cálculos
if operacao == "+":
    resultado = num1 + num2
    print(f"\\nResultado: {num1} + {num2} = {resultado}")

elif operacao == "-":
    resultado = num1 - num2
    print(f"\\nResultado: {num1} - {num2} = {resultado}")

elif operacao == "*":
    resultado = num1 * num2
    print(f"\\nResultado: {num1} * {num2} = {resultado}")

elif operacao == "/":
    # Regra matemática: não existe divisão por zero!
    if num2 == 0:
        print("\\nErro: Não é possível dividir por zero!")
    else:
        resultado = num1 / num2
        print(f"\\nResultado: {num1} / {num2} = {resultado}")

else:
    # Executado caso o usuário digite um operador inválido
    print("\\nErro: Operação inválida! Escolha apenas +, -, * ou /.")
`;

export const ADVANCED_PYTHON_CODE = `# ==========================================
# CALCULADORA MODULAR EM PYTHON (COM FUNÇÕES)
# O próximo passo no aprendizado de programação!
# ==========================================

def somar(a, b):
    return a + b

def subtrair(a, b):
    return a - b

def multiplicar(a, b):
    return a * b

def dividir(a, b):
    if b == 0:
        return "Erro: Divisão por zero!"
    return a / b

# Laço de repetição: permite fazer vários cálculos seguidos
while True:
    print("\\n=== CALCULADORA COM FUNÇÕES ===")
    print("1. Adição (+)")
    print("2. Subtração (-)")
    print("3. Multiplicação (*)")
    print("4. Divisão (/)")
    print("0. Sair")

    opcao = input("Escolha uma opção (1-4 ou 0): ")

    if opcao == "0":
        print("Calculadora encerrada. Até a próxima!")
        break

    if opcao in ["1", "2", "3", "4", "+", "-", "*", "/"]:
        n1 = float(input("Primeiro número: "))
        n2 = float(input("Segundo número: "))

        if opcao in ["1", "+"]:
            res = somar(n1, n2)
            print(f"Resultado: {n1} + {n2} = {res}")
        elif opcao in ["2", "-"]:
            res = subtrair(n1, n2)
            print(f"Resultado: {n1} - {n2} = {res}")
        elif opcao in ["3", "*"]:
            res = multiplicar(n1, n2)
            print(f"Resultado: {n1} * {n2} = {res}")
        elif opcao in ["4", "/"]:
            res = dividir(n1, n2)
            print(f"Resultado: {n1} / {n2} = {res}")
    else:
        print("Opção inválida! Tente novamente.")
`;

export const EXPLANATIONS: CodeExplanation[] = [
  {
    id: "input-float",
    title: "1. Entrada de Dados e Conversão de Tipo",
    badge: "input() e float()",
    description:
      "A função input() recebe o que o usuário digita no teclado sempre em formato de texto (string). Para podermos realizar operações matemáticas, precisamos converter esse texto para número decimal usando float().",
    codeSnippet: `num1 = float(input("Digite o primeiro número: "))\noperacao = input("Escolha a operação: ")`,
    tip: "Se usássemos int(), só aceitaríamos números inteiros. O float() aceita tanto inteiros (como 10) quanto decimais (como 7.5).",
  },
  {
    id: "conditionals",
    title: "2. Estrutura Condicional: Como o Python decide",
    badge: "if · elif · else",
    description:
      "O computador avalia uma condição lógica por vez, de cima para baixo. Quando encontra uma condição verdadeira (True), ele executa apenas aquele bloco de código e ignora os demais.",
    codeSnippet: `if operacao == "+":\n    resultado = num1 + num2\nelif operacao == "-":\n    resultado = num1 - num2\nelif operacao == "*":\n    resultado = num1 * num2\nelif operacao == "/":\n    # ... lógica da divisão\nelse:\n    print("Operação inválida!")`,
    tip: "Em Python usamos '==' (dois iguais) para comparar igualdade. Um único '=' serve para atribuir valor a uma variável.",
  },
  {
    id: "division-by-zero",
    title: "3. Tratamento de Erro: Divisão por Zero",
    badge: "Condicional Aninhada",
    description:
      "Dividir qualquer número por 0 é matematicamente indefinido. No Python, tentar fazer `10 / 0` causaria o erro crítico `ZeroDivisionError` e fecharia o programa. Para evitar isso, colocamos um if checando se o divisor é 0 antes de calcular.",
    codeSnippet: `elif operacao == "/":\n    if num2 == 0:\n        print("Erro: Não é possível dividir por zero!")\n    else:\n        resultado = num1 / num2`,
    tip: "Esta técnica é conhecida como 'Validação Prévia' ou Programação Defensiva: verificar os dados antes de executar operações perigosas.",
  },
  {
    id: "operators",
    title: "4. Operadores Matemáticos Básicos",
    badge: "+ · - · * · /",
    description:
      "O Python utiliza símbolos padrão da programação para cálculos: '+' para soma, '-' para subtração, '*' para multiplicação (asterisco) e '/' para divisão (barra normal).",
    codeSnippet: `soma = 10 + 5           # 15.0\nsubtracao = 10 - 5      # 5.0\nmultiplicacao = 10 * 5  # 50.0\ndivisao = 10 / 5        # 2.0`,
    tip: "Em Python 3, o operador '/' sempre retorna um número float (com casa decimal), mesmo quando a divisão é exata.",
  },
  {
    id: "f-strings",
    title: "5. Formatação do Resultado na Tela",
    badge: "print() e f-strings",
    description:
      "As f-strings (format strings) permitem inserir variáveis diretamente dentro do texto usando chaves `{variavel}`. É a forma mais moderna, legível e rápida de exibir dados no Python.",
    codeSnippet: `print(f"Resultado: {num1} + {num2} = {resultado}")`,
    tip: "Basta colocar a letra 'f' antes das aspas da string para o Python substituir tudo que está entre chaves pelo seu valor real.",
  },
];

export const HOW_TO_RUN_STEPS = [
  {
    step: "1",
    title: "Tenha o Python Instalado",
    description:
      "Baixe a versão mais recente e gratuita no site oficial python.org. No Windows, lembre-se de marcar a caixinha 'Add Python to PATH' durante a instalação.",
  },
  {
    step: "2",
    title: "Salve o Código em um Arquivo",
    description:
      "Clique no botão 'Baixar calculadora.py' aqui na aplicação, ou abra um editor (Bloco de Notas, VS Code) e salve o código com o nome 'calculadora.py'.",
  },
  {
    step: "3",
    title: "Abra o Terminal ou Prompt",
    description:
      "Abra o Prompt de Comando (CMD / PowerShell no Windows, ou Terminal no Mac/Linux) e navegue até a pasta onde salvou o arquivo.",
  },
  {
    step: "4",
    title: "Execute o Programa",
    description:
      "Digite o comando e aperte Enter: python calculadora.py (ou python3 calculadora.py no Mac/Linux). Pronto! O programa pedirá os números.",
  },
];

export const CHALLENGES = [
  {
    title: "Adicionar Exponenciação (Potência)",
    description: "Em Python, o operador de potência é '**' (ex: 2 ** 3 = 8). Adicione uma nova condição `elif operacao == '**':`.",
    difficulty: "Fácil",
  },
  {
    title: "Adicionar Resto da Divisão (Módulo)",
    description: "O operador '%' descobre o resto de uma divisão inteira (ex: 10 % 3 = 1). Útil para saber se um número é par ou ímpar!",
    difficulty: "Fácil",
  },
  {
    title: "Repetir até o Usuário Sair (Laço while)",
    description: "Coloque o código dentro de um `while True:` para que a calculadora não feche após cada cálculo e pergunte se deseja continuar.",
    difficulty: "Médio",
  },
  {
    title: "Tratar Erros com try/except",
    description: "E se o usuário digitar uma letra no lugar do número? Use `try:` e `except ValueError:` para evitar que o programa trave.",
    difficulty: "Desafiador",
  },
];
