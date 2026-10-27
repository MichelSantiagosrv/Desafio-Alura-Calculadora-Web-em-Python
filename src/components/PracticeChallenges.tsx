import React, { useState } from 'react';
import { Target, ChevronDown, ChevronUp, Code, Lightbulb } from 'lucide-react';
import { CHALLENGES } from '../data/pythonCode';

export const PracticeChallenges: React.FC = () => {
  const [openHint, setOpenHint] = useState<number | null>(null);

  const hints = [
    `# Dica para Exponenciação (Potência):
elif operacao == "**":
    resultado = num1 ** num2
    print(f"Resultado: {num1} ** {num2} = {resultado}")`,

    `# Dica para Resto da Divisão (Módulo):
elif operacao == "%":
    if num2 == 0:
        print("Erro: Divisão por zero!")
    else:
        resultado = num1 % num2
        print(f"Resto de {num1} % {num2} = {resultado}")`,

    `# Dica para Laço while:
while True:
    # ... código dos cálculos ...
    continuar = input("Deseja fazer outro cálculo? (s/n): ")
    if continuar.lower() != 's':
        print("Até logo!")
        break`,

    `# Dica para try/except:
try:
    num1 = float(input("Digite o primeiro número: "))
except ValueError:
    print("Erro: Você precisa digitar um número válido!")`,
  ];

  const toggleHint = (idx: number) => {
    setOpenHint(openHint === idx ? null : idx);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-600" />
            <span>Desafios Práticos para Subir de Nível</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Agora que você compreendeu o básico, tente implementar essas melhorias no seu arquivo <code>calculadora.py</code>:
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CHALLENGES.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-600 font-mono">
                  Desafio {idx + 1}
                </span>
                <span
                  className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                    item.difficulty === 'Fácil'
                      ? 'bg-emerald-100 text-emerald-800'
                      : item.difficulty === 'Médio'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-indigo-100 text-indigo-800'
                  }`}
                >
                  {item.difficulty}
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => toggleHint(idx)}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
              >
                <Code className="w-3.5 h-3.5" />
                <span>{openHint === idx ? 'Ocultar Código da Solução' : 'Ver Código de Exemplo'}</span>
                {openHint === idx ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {openHint === idx && (
                <div className="mt-2 p-3 bg-slate-950 rounded-lg text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800">
                  <pre>{hints[idx]}</pre>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
