import React, { useState } from 'react';
import { Play, RotateCcw, AlertTriangle, CheckCircle2, Terminal as TerminalIcon, Sparkles } from 'lucide-react';

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
  const [result, setResult] = useState<SimulationResult | null>(() => {
    // Initial evaluation for default state
    return runSimulation('15', '+', '5');
  });

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
    setResult(runSimulation(n1, op, n2));
  };

  const handleReset = () => {
    setNum1Str('10');
    setOperacao('+');
    setNum2Str('5');
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
          {/* Inputs Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Entrada de Dados (input)</span>
              <span className="text-xs text-slate-500 font-mono">Valores float e str</span>
            </div>

            {/* Num 1 */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Variável <code className="text-indigo-600 font-mono">num1</code> (Primeiro número):
              </label>
              <input
                type="text"
                value={num1Str}
                onChange={(e) => setNum1Str(e.target.value)}
                placeholder="Ex: 10 ou 7.5"
                className="w-full px-3.5 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50/50"
              />
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                Equivalente ao comando: <code>num1 = float(input(...))</code>
              </span>
            </div>

            {/* Operacao */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Variável <code className="text-indigo-600 font-mono">operacao</code> (Símbolo matemático):
              </label>
              {/* Quick Operation Buttons */}
              <div className="grid grid-cols-4 gap-2 mb-2">
                {[
                  { op: '+', label: 'Soma (+)' },
                  { op: '-', label: 'Subtração (-)' },
                  { op: '*', label: 'Multiplicação (*)' },
                  { op: '/', label: 'Divisão (/)' },
                ].map((item) => (
                  <button
                    key={item.op}
                    type="button"
                    onClick={() => {
                      setOperacao(item.op);
                      const res = runSimulation(num1Str, item.op, num2Str);
                      setResult(res);
                    }}
                    className={`py-2 px-2 text-center rounded-lg border text-sm font-mono font-bold transition-all cursor-pointer ${
                      operacao === item.op
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {item.op}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={operacao}
                onChange={(e) => setOperacao(e.target.value)}
                placeholder="+, -, *, / ou digite outro"
                maxLength={4}
                className="w-full px-3.5 py-1.5 text-xs font-mono border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
              />
            </div>

            {/* Num 2 */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Variável <code className="text-indigo-600 font-mono">num2</code> (Segundo número):
              </label>
              <input
                type="text"
                value={num2Str}
                onChange={(e) => setNum2Str(e.target.value)}
                placeholder="Ex: 5 ou 0"
                className="w-full px-3.5 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50/50"
              />
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                Dica: experimente colocar <span className="font-semibold text-amber-700">0</span> com a divisão (<span className="font-mono">/</span>) para testar o tratamento de erro!
              </span>
            </div>

            {/* Run Button */}
            <button
              onClick={handleExecute}
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-lg font-semibold text-sm shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Executar Código Python</span>
            </button>
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
