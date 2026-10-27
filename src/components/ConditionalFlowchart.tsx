import React, { useState } from 'react';
import { GitBranch, ArrowDown, Check, X, ShieldAlert, Sparkles } from 'lucide-react';

export const ConditionalFlowchart: React.FC = () => {
  const [selectedOp, setSelectedOp] = useState<string>('+');
  const [testNum2, setTestNum2] = useState<number>(5);

  const branches = [
    {
      id: '+',
      title: 'if operacao == "+":',
      operation: 'Adição',
      formula: 'resultado = num1 + num2',
      isDivision: false,
    },
    {
      id: '-',
      title: 'elif operacao == "-":',
      operation: 'Subtração',
      formula: 'resultado = num1 - num2',
      isDivision: false,
    },
    {
      id: '*',
      title: 'elif operacao == "*":',
      operation: 'Multiplicação',
      formula: 'resultado = num1 * num2',
      isDivision: false,
    },
    {
      id: '/',
      title: 'elif operacao == "/":',
      operation: 'Divisão',
      formula: 'if num2 == 0: Erro | else: resultado = num1 / num2',
      isDivision: true,
    },
    {
      id: 'outro',
      title: 'else:',
      operation: 'Operação Desconhecida',
      formula: 'print("Operação inválida!")',
      isDivision: false,
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-indigo-600" />
            <span>Fluxograma Lógico: Como as Condicionais Decidem</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Veja visualmente como o Python avalia a variável <code className="font-mono text-indigo-600">operacao</code> de cima para baixo. Clique em um operador para ver o caminho percorrido.
          </p>
        </div>

        {/* Interactive Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
          {['+', '-', '*', '/', 'outro'].map((op) => (
            <button
              key={op}
              type="button"
              onClick={() => setSelectedOp(op)}
              className={`px-3 py-1 text-xs font-mono font-bold rounded-md transition-all cursor-pointer ${
                selectedOp === op
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {op === 'outro' ? 'outro (?)' : op}
            </button>
          ))}
        </div>
      </div>

      {/* Simulator helper controls if division selected */}
      {selectedOp === '/' && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-between gap-4 text-xs">
          <span className="text-amber-900 font-medium">
            Simulando divisão: altere o valor do divisor <code className="font-mono font-bold">num2</code>:
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTestNum2(5)}
              className={`px-2.5 py-1 rounded text-xs font-mono font-semibold cursor-pointer ${
                testNum2 !== 0 ? 'bg-amber-600 text-white' : 'bg-white text-slate-700 border border-slate-300'
              }`}
            >
              num2 = 5 (Válido)
            </button>
            <button
              type="button"
              onClick={() => setTestNum2(0)}
              className={`px-2.5 py-1 rounded text-xs font-mono font-semibold cursor-pointer ${
                testNum2 === 0 ? 'bg-rose-600 text-white' : 'bg-white text-slate-700 border border-slate-300'
              }`}
            >
              num2 = 0 (Divisão por Zero!)
            </button>
          </div>
        </div>
      )}

      {/* Flowchart Diagram */}
      <div className="relative py-4 space-y-4 max-w-2xl mx-auto">
        {/* Start Node */}
        <div className="p-3.5 rounded-lg bg-slate-900 text-white text-center font-mono text-xs sm:text-sm font-semibold max-w-md mx-auto shadow-xs">
          <div>Início: Recebeu num1, operacao e num2</div>
          <div className="text-[11px] text-slate-400 font-normal mt-0.5">
            Valor de operacao = <span className="text-amber-300 font-bold">"{selectedOp}"</span>
          </div>
        </div>

        {/* Flow arrow */}
        <div className="flex justify-center text-slate-400">
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </div>

        {/* Branch Nodes */}
        {branches.map((branch, index) => {
          const isSelected = selectedOp === branch.id;
          const isEvaluatedBefore =
            (selectedOp === '-' && index < 1) ||
            (selectedOp === '*' && index < 2) ||
            (selectedOp === '/' && index < 3) ||
            (selectedOp === 'outro' && index < 4);

          return (
            <div key={branch.id} className="space-y-3">
              <div
                className={`p-4 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-indigo-50/70 border-indigo-400 ring-2 ring-indigo-500/20 shadow-sm'
                    : isEvaluatedBefore
                    ? 'bg-slate-50 border-slate-200 opacity-70'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs sm:text-sm text-slate-900">
                        {branch.title}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">({branch.operation})</span>
                    </div>
                    <div className="font-mono text-xs text-slate-600 bg-white/80 p-2 rounded border border-slate-200 inline-block">
                      {branch.formula}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    {isSelected ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
                        <Check className="w-3.5 h-3.5" />
                        True (Executa este!)
                      </span>
                    ) : isEvaluatedBefore ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-200 text-slate-600 text-xs font-mono">
                        <X className="w-3 h-3" />
                        False (Passa adiante)
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400 font-mono">Ignorado</span>
                    )}
                  </div>
                </div>

                {/* Sub-branch for division */}
                {branch.isDivision && isSelected && (
                  <div className="mt-3 pt-3 border-t border-indigo-200/60 pl-3 sm:pl-4 space-y-2">
                    <span className="text-xs font-bold text-indigo-900 block">
                      Sub-condicional de Segurança (Divisão):
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                      <div
                        className={`p-2.5 rounded-lg border ${
                          testNum2 === 0
                            ? 'bg-rose-100 border-rose-300 text-rose-900 font-bold'
                            : 'bg-white border-slate-200 text-slate-500 opacity-60'
                        }`}
                      >
                        <div>if num2 == 0:</div>
                        <div className="text-[11px] font-normal text-rose-800 mt-1">
                          ↳ Exibe: "Erro: Não é possível dividir por zero!"
                        </div>
                      </div>

                      <div
                        className={`p-2.5 rounded-lg border ${
                          testNum2 !== 0
                            ? 'bg-emerald-100 border-emerald-300 text-emerald-900 font-bold'
                            : 'bg-white border-slate-200 text-slate-500 opacity-60'
                        }`}
                      >
                        <div>else:</div>
                        <div className="text-[11px] font-normal text-emerald-800 mt-1">
                          ↳ Executa: resultado = num1 / num2
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {index < branches.length - 1 && (
                <div className="flex justify-center text-slate-300">
                  <ArrowDown className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {/* End Node */}
        <div className="flex justify-center text-slate-400">
          <ArrowDown className="w-5 h-5" />
        </div>
        <div className="p-3 rounded-lg bg-slate-100 border border-slate-300 text-slate-800 text-center font-mono text-xs font-semibold max-w-xs mx-auto">
          Fim: Exibe resultado ou erro via print()
        </div>
      </div>
    </div>
  );
};
