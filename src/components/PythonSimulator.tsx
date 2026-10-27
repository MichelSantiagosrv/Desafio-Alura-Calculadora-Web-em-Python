import React, { useState } from 'react';
import { Play, RotateCcw, AlertTriangle, CheckCircle2, Terminal as TerminalIcon, Sparkles, Delete, Calculator, Equal } from 'lucide-react';

interface SimulationResult {
  step: string;
  conditionMet: string;
  isError: boolean;
  message: string;
  rawResult?: number;
  terminalOutput: string[];
}

export const PythonSimulator: React.FC = () => {
  const [num1Str, setNum1Str] = useState<string>('15');
  const [operacao, setOperacao] = useState<string>('+');
  const [num2Str, setNum2Str] = useState<string>('5');
  const [activeTarget, setActiveTarget] = useState<'num1' | 'num2'>('num1');
  const [result, setResult] = useState<SimulationResult | null>(() => {
    return runSimulation('15', '+', '5');
  });

  // Calculator Keypad Actions
  const handleDigit = (digit: string) => {
    if (activeTarget === 'num1') {
      setNum1Str((prev) => (prev === '0' ? digit : prev + digit));
    } else {
      setNum2Str((prev) => (prev === '0' ? digit : prev + digit));
    }
  };

  const handleDot = () => {
    if (activeTarget === 'num1') {
      if (!num1Str.includes('.')) {
        setNum1Str((prev) => (prev === '' ? '0.' : prev + '.'));
      }
    } else {
      if (!num2Str.includes('.')) {
        setNum2Str((prev) => (prev === '' ? '0.' : prev + '.'));
      }
    }
  };

  const handleOperatorSelect = (op: string) => {
    setOperacao(op);
    // Move to second number like a real calculator
    setActiveTarget('num2');
  };

  const handleBackspace = () => {
    if (activeTarget === 'num1') {
      setNum1Str((prev) => (prev.length <= 1 ? '' : prev.slice(0, -1)));
    } else {
      setNum2Str((prev) => (prev.length <= 1 ? '' : prev.slice(0, -1)));
    }
  };

  const handleClear = () => {
    if (activeTarget === 'num1') {
      setNum1Str('');
    } else {
      setNum2Str('');
    }
  };

  const handleClearAll = () => {
    setNum1Str('');
    setNum2Str('');
    setOperacao('+');
    setActiveTarget('num1');
    setResult(null);
  };

  const handleToggleSign = () => {
    if (activeTarget === 'num1') {
      if (!num1Str) return;
      setNum1Str((prev) => (prev.startsWith('-') ? prev.slice(1) : '-' + prev));
    } else {
      if (!num2Str) return;
      setNum2Str((prev) => (prev.startsWith('-') ? prev.slice(1) : '-' + prev));
    }
  };

  function runSimulation(n1Str: string, op: string, n2Str: string): SimulationResult {
    const n1 = parseFloat(n1Str);
    const n2 = parseFloat(n2Str);

    if (isNaN(n1) || isNaN(n2)) {
      return {
        step: 'Erro de Conversão float()',
        conditionMet: 'ValueError',
        isError: true,
        message: 'No Python real, digitar letras onde se espera float() gera ValueError!',
        terminalOutput: [
          'Traceback (most recent call last):',
          '  File "calculadora.py", line 17, in <module>',
          `    num = float(input(...))`,
          `ValueError: could not convert string to float: '${isNaN(n1) ? n1Str : n2Str}'`,
        ],
      };
    }

    const lines: string[] = [
      '=== CALCULADORA BÁSICA ===',
      'Operações disponíveis:',
      '+ : Adição',
      '- : Subtração',
      '* : Multiplicação',
      '/ : Divisão',
      '===========================',
      `Digite o primeiro número: ${n1}`,
      `Escolha a operação (+, -, *, /): ${op}`,
      `Digite o segundo número: ${n2}`,
    ];

    if (op === '+') {
      const res = n1 + n2;
      lines.push('');
      lines.push(`Resultado: ${n1} + ${n2} = ${res}`);
      return {
        step: 'Condicional "if operacao == \'+\':"',
        conditionMet: 'operacao == "+"',
        isError: false,
        message: `Condição Verdadeira! Executou: resultado = ${n1} + ${n2}`,
        rawResult: res,
        terminalOutput: lines,
      };
    } else if (op === '-') {
      const res = n1 - n2;
      lines.push('');
      lines.push(`Resultado: ${n1} - ${n2} = ${res}`);
      return {
        step: 'Condicional "elif operacao == \'-\':"',
        conditionMet: 'operacao == "-"',
        isError: false,
        message: `Condição Verdadeira! Executou: resultado = ${n1} - ${n2}`,
        rawResult: res,
        terminalOutput: lines,
      };
    } else if (op === '*') {
      const res = n1 * n2;
      lines.push('');
      lines.push(`Resultado: ${n1} * ${n2} = ${res}`);
      return {
        step: 'Condicional "elif operacao == \'*\'":',
        conditionMet: 'operacao == "*"',
        isError: false,
        message: `Condição Verdadeira! Executou: resultado = ${n1} * ${n2}`,
        rawResult: res,
        terminalOutput: lines,
      };
    } else if (op === '/') {
      if (n2 === 0) {
        lines.push('');
        lines.push('Erro: Não é possível dividir por zero!');
        return {
          step: 'Condicional Aninhada "if num2 == 0:"',
          conditionMet: 'operacao == "/" e num2 == 0',
          isError: true,
          message: 'Detectou divisão por zero antes que o Python quebrasse com ZeroDivisionError!',
          terminalOutput: lines,
        };
      } else {
        const res = n1 / n2;
        // Clean float representation
        const formattedRes = Number(res.toFixed(6)) / 1;
        lines.push('');
        lines.push(`Resultado: ${n1} / ${n2} = ${formattedRes}`);
        return {
          step: 'Condicional "elif operacao == \'/\':"',
          conditionMet: 'operacao == "/" e num2 != 0',
          isError: false,
          message: `Condição Verdadeira! Executou: resultado = ${n1} / ${n2}`,
          rawResult: formattedRes,
          terminalOutput: lines,
        };
      }
    } else {
      lines.push('');
      lines.push('Erro: Operação inválida! Escolha apenas +, -, * ou /.');
      return {
        step: 'Bloco "else:"',
        conditionMet: 'else (nenhuma das opções anteriores)',
        isError: true,
        message: `O operador '${op}' não corresponde a +, -, * ou /. O Python caiu no bloco 'else'.`,
        terminalOutput: lines,
      };
    }
  }

  const handleExecute = () => {
    const res = runSimulation(num1Str, operacao, num2Str);
    setResult(res);
  };

  const handleApplyPreset = (n1: string, op: string, n2: string) => {
    setNum1Str(n1);
    setOperacao(op);
    setNum2Str(n2);
    setActiveTarget('num1');
    setResult(runSimulation(n1, op, n2));
  };

  const handleReset = () => {
    setNum1Str('10');
    setOperacao('+');
    setNum2Str('5');
    setActiveTarget('num1');
    setResult(runSimulation('10', '+', '5'));
  };

  return (
    <section className="space-y-6">
      {/* Intro strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <TerminalIcon className="w-5 h-5 text-indigo-600" />
            <span>Simulador Interativo de Execução Python</span>
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Veja em tempo real como o interpretador Python recebe os dados do usuário, avalia cada estrutura condicional (<code>if / elif / else</code>) e gera a saída.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar Valores</span>
          </button>
        </div>
      </div>

      {/* Main 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: Controls & Presets (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Inputs Card: Calculadora Interativa com Teclado Numérico */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Entrada de Dados (input)</span>
              </div>
              <span className="text-[11px] font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                Calculadora Clicável
              </span>
            </div>

            {/* Visor Digital da Calculadora */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 shadow-inner space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Variável ativa:</span>
                  <strong className="text-white bg-slate-800 px-1.5 py-0.5 rounded font-mono">
                    {activeTarget}
                  </strong>
                </span>
                <span className="text-slate-500">Clique nas caixas para alternar</span>
              </div>

              {/* Expressão Interativa Clicável */}
              <div className="flex items-center gap-2 font-mono text-base sm:text-lg">
                {/* Num 1 slot */}
                <button
                  type="button"
                  onClick={() => setActiveTarget('num1')}
                  className={`flex-1 py-1.5 px-3 rounded-lg border text-right transition-all cursor-pointer truncate ${
                    activeTarget === 'num1'
                      ? 'bg-indigo-950/80 border-indigo-500 text-white ring-2 ring-indigo-500/30'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                  title="Clique para editar num1"
                >
                  <span className="text-[10px] block text-slate-500 text-left">num1</span>
                  <span className="font-bold">{num1Str || '0'}</span>
                </button>

                {/* Operator slot */}
                <div
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold text-center border border-indigo-500 shadow-xs shrink-0"
                  title="Operador selecionado"
                >
                  <span className="text-[10px] block text-indigo-200">op</span>
                  <span className="font-mono text-base">{operacao}</span>
                </div>

                {/* Num 2 slot */}
                <button
                  type="button"
                  onClick={() => setActiveTarget('num2')}
                  className={`flex-1 py-1.5 px-3 rounded-lg border text-right transition-all cursor-pointer truncate ${
                    activeTarget === 'num2'
                      ? 'bg-indigo-950/80 border-indigo-500 text-white ring-2 ring-indigo-500/30'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                  title="Clique para editar num2"
                >
                  <span className="text-[10px] block text-slate-500 text-left">num2</span>
                  <span className="font-bold">{num2Str || '0'}</span>
                </button>
              </div>

              {/* Live Formula Explanation */}
              <div className="text-[11px] font-mono text-slate-400 text-center pt-1 border-t border-slate-800/80">
                Python: <code>num1={num1Str || '0'}</code>, <code>operacao='{operacao}'</code>, <code>num2={num2Str || '0'}</code>
              </div>
            </div>

            {/* Teclado Numérico da Calculadora */}
            <div className="grid grid-cols-4 gap-2 pt-1">
              {/* Linha 1: Funções de Controle & Divisão */}
              <button
                type="button"
                onClick={handleClearAll}
                className="py-2.5 rounded-lg font-bold text-xs bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors cursor-pointer active:scale-95 shadow-xs"
                title="Limpar todas as variáveis (C)"
              >
                C
              </button>

              <button
                type="button"
                onClick={handleBackspace}
                className="py-2.5 rounded-lg font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer active:scale-95 flex items-center justify-center shadow-xs"
                title="Apagar último caractere"
              >
                <Delete className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleToggleSign}
                className="py-2.5 rounded-lg font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer active:scale-95 shadow-xs"
                title="Inverter sinal positivo/negativo"
              >
                ±
              </button>

              <button
                type="button"
                onClick={() => handleOperatorSelect('/')}
                className={`py-2.5 rounded-lg font-mono font-bold text-sm transition-colors cursor-pointer active:scale-95 shadow-xs ${
                  operacao === '/'
                    ? 'bg-indigo-600 text-white border border-indigo-700 ring-2 ring-indigo-400/40'
                    : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200'
                }`}
                title="Divisão (/)"
              >
                /
              </button>

              {/* Linha 2: 7, 8, 9, Multiplicação */}
              {['7', '8', '9'].map((digit) => (
                <button
                  key={digit}
                  type="button"
                  onClick={() => handleDigit(digit)}
                  className="py-3 rounded-lg font-mono font-bold text-base bg-slate-50 hover:bg-white text-slate-800 border border-slate-200 hover:border-slate-300 transition-all cursor-pointer active:scale-95 shadow-xs"
                >
                  {digit}
                </button>
              ))}
              <button
                type="button"
                onClick={() => handleOperatorSelect('*')}
                className={`py-3 rounded-lg font-mono font-bold text-sm transition-colors cursor-pointer active:scale-95 shadow-xs ${
                  operacao === '*'
                    ? 'bg-indigo-600 text-white border border-indigo-700 ring-2 ring-indigo-400/40'
                    : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200'
                }`}
                title="Multiplicação (*)"
              >
                *
              </button>

              {/* Linha 3: 4, 5, 6, Subtração */}
              {['4', '5', '6'].map((digit) => (
                <button
                  key={digit}
                  type="button"
                  onClick={() => handleDigit(digit)}
                  className="py-3 rounded-lg font-mono font-bold text-base bg-slate-50 hover:bg-white text-slate-800 border border-slate-200 hover:border-slate-300 transition-all cursor-pointer active:scale-95 shadow-xs"
                >
                  {digit}
                </button>
              ))}
              <button
                type="button"
                onClick={() => handleOperatorSelect('-')}
                className={`py-3 rounded-lg font-mono font-bold text-sm transition-colors cursor-pointer active:scale-95 shadow-xs ${
                  operacao === '-'
                    ? 'bg-indigo-600 text-white border border-indigo-700 ring-2 ring-indigo-400/40'
                    : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200'
                }`}
                title="Subtração (-)"
              >
                -
              </button>

              {/* Linha 4: 1, 2, 3, Adição */}
              {['1', '2', '3'].map((digit) => (
                <button
                  key={digit}
                  type="button"
                  onClick={() => handleDigit(digit)}
                  className="py-3 rounded-lg font-mono font-bold text-base bg-slate-50 hover:bg-white text-slate-800 border border-slate-200 hover:border-slate-300 transition-all cursor-pointer active:scale-95 shadow-xs"
                >
                  {digit}
                </button>
              ))}
              <button
                type="button"
                onClick={() => handleOperatorSelect('+')}
                className={`py-3 rounded-lg font-mono font-bold text-sm transition-colors cursor-pointer active:scale-95 shadow-xs ${
                  operacao === '+'
                    ? 'bg-indigo-600 text-white border border-indigo-700 ring-2 ring-indigo-400/40'
                    : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200'
                }`}
                title="Adição (+)"
              >
                +
              </button>

              {/* Linha 5: 0, Ponto Decimal, Executar (=) */}
              <button
                type="button"
                onClick={() => handleDigit('0')}
                className="py-3 rounded-lg font-mono font-bold text-base bg-slate-50 hover:bg-white text-slate-800 border border-slate-200 hover:border-slate-300 transition-all cursor-pointer active:scale-95 shadow-xs"
              >
                0
              </button>

              <button
                type="button"
                onClick={handleDot}
                className="py-3 rounded-lg font-mono font-bold text-base bg-slate-50 hover:bg-white text-slate-800 border border-slate-200 hover:border-slate-300 transition-all cursor-pointer active:scale-95 shadow-xs"
                title="Ponto decimal (float)"
              >
                .
              </button>

              {/* Botão de Executar / Igual (=) ocupando 2 colunas */}
              <button
                type="button"
                onClick={handleExecute}
                className="col-span-2 py-3 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-lg font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                title="Executar código Python com estes valores"
              >
                <Equal className="w-4 h-4 stroke-[2.5]" />
                <span>Executar no Python (=)</span>
              </button>
            </div>

            {/* Alternar Campos Manuais de Entrada (se o usuário preferir digitar) */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Ou digite diretamente nos campos Python:
              </span>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-mono text-slate-600 mb-0.5">num1:</label>
                  <input
                    type="text"
                    value={num1Str}
                    onFocus={() => setActiveTarget('num1')}
                    onChange={(e) => setNum1Str(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs font-mono border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-600 mb-0.5">operacao:</label>
                  <input
                    type="text"
                    value={operacao}
                    onChange={(e) => setOperacao(e.target.value)}
                    maxLength={3}
                    className="w-full px-2.5 py-1.5 text-xs font-mono text-center font-bold border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-600 mb-0.5">num2:</label>
                  <input
                    type="text"
                    value={num2Str}
                    onFocus={() => setActiveTarget('num2')}
                    onChange={(e) => setNum2Str(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs font-mono border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 bg-slate-50"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Presets / Test Cases */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              Cenários de Teste Rápidos
            </span>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleApplyPreset('25', '+', '15')}
                className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 transition-colors text-xs cursor-pointer flex items-center justify-between"
              >
                <div>
                  <span className="font-semibold text-slate-800">1. Adição Básica</span>
                  <p className="text-slate-500">Testa o primeiro bloco <code>if operacao == '+'</code></p>
                </div>
                <span className="font-mono text-indigo-600 font-bold">25 + 15</span>
              </button>

              <button
                type="button"
                onClick={() => handleApplyPreset('100', '/', '0')}
                className="w-full text-left p-2.5 rounded-lg border border-amber-200 bg-amber-50/30 hover:bg-amber-50/70 transition-colors text-xs cursor-pointer flex items-center justify-between"
              >
                <div>
                  <span className="font-semibold text-amber-900">2. Teste: Divisão por Zero</span>
                  <p className="text-amber-700">Verifica a proteção <code>if num2 == 0</code></p>
                </div>
                <span className="font-mono text-amber-700 font-bold">100 / 0</span>
              </button>

              <button
                type="button"
                onClick={() => handleApplyPreset('4.5', '*', '3')}
                className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 transition-colors text-xs cursor-pointer flex items-center justify-between"
              >
                <div>
                  <span className="font-semibold text-slate-800">3. Multiplicação Decimal</span>
                  <p className="text-slate-500">Testa o uso do <code>float()</code></p>
                </div>
                <span className="font-mono text-indigo-600 font-bold">4.5 * 3</span>
              </button>

              <button
                type="button"
                onClick={() => handleApplyPreset('50', '?', '2')}
                className="w-full text-left p-2.5 rounded-lg border border-rose-200 bg-rose-50/30 hover:bg-rose-50/70 transition-colors text-xs cursor-pointer flex items-center justify-between"
              >
                <div>
                  <span className="font-semibold text-rose-900">4. Operação Inválida</span>
                  <p className="text-rose-700">Verifica o desvio para o <code>else:</code></p>
                </div>
                <span className="font-mono text-rose-700 font-bold">50 ? 2</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right column: Terminal Output & Decision Inspector (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Conditional Decision Inspector */}
          {result && (
            <div
              className={`p-4 rounded-xl border transition-all ${
                result.isError
                  ? 'bg-rose-50/60 border-rose-200 text-rose-950'
                  : 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
              }`}
            >
              <div className="flex items-start gap-3">
                {result.isError ? (
                  <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Ramo Condicional Ativado:
                    </span>
                    <span className="text-xs font-mono font-bold bg-white/80 px-2 py-0.5 rounded border border-slate-200">
                      {result.conditionMet}
                    </span>
                  </div>
                  <p className="text-sm font-medium">{result.message}</p>
                </div>
              </div>
            </div>
          )}

          {/* Terminal Console */}
          <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-md">
            {/* Terminal Header */}
            <div className="bg-slate-900 px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                <span className="text-xs font-mono text-slate-400 ml-2">bash ~ python3 calculadora.py</span>
              </div>
              <span className="text-[11px] font-mono text-slate-500">Terminal Virtual</span>
            </div>

            {/* Terminal Body */}
            <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm text-slate-200 space-y-1.5 min-h-[300px] overflow-x-auto leading-relaxed">
              <div className="text-slate-400 mb-2">
                <span className="text-emerald-400">aluno@aprendendo-python</span>:<span className="text-sky-400">~/projetos</span>$ python3 calculadora.py
              </div>

              {result ? (
                result.terminalOutput.map((line, idx) => {
                  const isResultLine = line.startsWith('Resultado:');
                  const isErrorLine = line.startsWith('Erro:');
                  const isTraceback = line.includes('Traceback') || line.includes('ValueError');

                  let colorClass = 'text-slate-200';
                  if (isResultLine) colorClass = 'text-emerald-400 font-bold bg-emerald-950/40 p-1 rounded inline-block';
                  else if (isErrorLine) colorClass = 'text-rose-400 font-bold bg-rose-950/40 p-1 rounded inline-block';
                  else if (isTraceback) colorClass = 'text-amber-400 font-semibold';
                  else if (line.startsWith('=')) colorClass = 'text-indigo-400';

                  return (
                    <div key={idx} className={colorClass}>
                      {line}
                    </div>
                  );
                })
              ) : (
                <div className="text-slate-500 italic">Pressione "Executar Código Python" para iniciar a simulação...</div>
              )}
            </div>
          </div>

          {/* Variables Inspector Box */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-3">
              Estado Atual da Memória (Variáveis)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block text-[11px]">num1 (float)</span>
                <span className="font-bold text-slate-900 text-sm">{num1Str || '0'}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block text-[11px]">operacao (str)</span>
                <span className="font-bold text-indigo-600 text-sm">"{operacao}"</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block text-[11px]">num2 (float)</span>
                <span className="font-bold text-slate-900 text-sm">{num2Str || '0'}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block text-[11px]">resultado</span>
                <span className="font-bold text-emerald-600 text-sm">
                  {result && !result.isError && result.rawResult !== undefined ? result.rawResult : '—'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
