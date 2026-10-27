import React from 'react';
import { Terminal, CheckCircle2, AlertOctagon, HelpCircle } from 'lucide-react';
import { HOW_TO_RUN_STEPS } from '../data/pythonCode';

export const HowToRunGuide: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Terminal className="w-5 h-5 text-indigo-600" />
          <span>Como Executar o Código no Seu Computador</span>
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">
          Siga o passo a passo abaixo para rodar a calculadora no seu próprio computador (Windows, macOS ou Linux).
        </p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {HOW_TO_RUN_STEPS.map((item) => (
          <div key={item.step} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex gap-4">
            <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 text-sm">
              {item.step}
            </div>
            <div className="space-y-1">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">{item.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Common Pitfalls / Beginner Mistakes */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <AlertOctagon className="w-5 h-5 text-amber-600" />
          <span>Erros Comuns de Iniciantes (e como evitar)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 space-y-2">
            <h4 className="font-bold text-amber-950">1. Indentação (Espaçamentos)</h4>
            <p className="text-amber-800 leading-relaxed">
              No Python, os blocos dentro de <code>if</code> e <code>else</code> <strong>precisam</strong> estar recuados (geralmente 4 espaços ou 1 Tab). Se não estiverem, o Python avisa <code>IndentationError</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 space-y-2">
            <h4 className="font-bold text-amber-950">2. Ponto ao invés de Vírgula</h4>
            <p className="text-amber-800 leading-relaxed">
              No Python (padrão internacional), números decimais usam ponto (ex: <code>4.5</code>). Se você digitar <code>4,5</code> com vírgula, o <code>float()</code> dará erro!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 space-y-2">
            <h4 className="font-bold text-amber-950">3. Maiúsculas e Minúsculas</h4>
            <p className="text-amber-800 leading-relaxed">
              O Python diferencia maiúsculas de minúsculas (case-sensitive). Escrever <code>IF</code> ou <code>Float</code> com inicial maiúscula não funciona: use sempre <code>if</code>, <code>float</code> e <code>input</code> minúsculos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
