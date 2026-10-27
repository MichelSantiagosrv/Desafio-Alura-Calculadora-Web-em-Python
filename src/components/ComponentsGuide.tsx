import React from 'react';
import { BookOpen, Lightbulb, CheckCircle2 } from 'lucide-react';
import { EXPLANATIONS } from '../data/pythonCode';

export const ComponentsGuide: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <span>Guia Explicativo dos Principais Componentes</span>
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">
          Para quem está começando a programar, cada linha de código tem um propósito bem definido. Abaixo, explicamos os 5 blocos fundamentais que compõem a calculadora.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {EXPLANATIONS.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:border-indigo-300 transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                  {item.badge}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900">{item.title}</h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>

              {/* Code Snippet */}
              <div className="bg-slate-950 p-3 rounded-lg overflow-x-auto border border-slate-800">
                <pre className="font-mono text-xs text-slate-200 leading-normal">
                  <code>{item.codeSnippet}</code>
                </pre>
              </div>
            </div>

            {/* Tip Box */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-start gap-2.5 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg">
              <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>
                <strong className="text-slate-800 font-semibold">Dica de Aprendizado:</strong> {item.tip}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Table of Comparison Operators in Python */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          Tabela Rápida: Operadores Relacionais (Comparações no Python)
        </h3>
        <p className="text-xs sm:text-sm text-slate-600">
          Nas estruturas condicionais (<code>if</code>), nós usamos operadores para testar se algo é verdadeiro (<code>True</code>) ou falso (<code>False</code>):
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm font-sans">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3 font-mono">Operador</th>
                <th className="py-2.5 px-3">Significado</th>
                <th className="py-2.5 px-3 font-mono">Exemplo no Código</th>
                <th className="py-2.5 px-3">Resultado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td className="py-2 px-3 font-mono font-bold text-indigo-600">==</td>
                <td className="py-2 px-3">Igual a</td>
                <td className="py-2 px-3 font-mono text-slate-800">operacao == "+"</td>
                <td className="py-2 px-3">True se o usuário digitou "+"</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono font-bold text-indigo-600">!=</td>
                <td className="py-2 px-3">Diferente de</td>
                <td className="py-2 px-3 font-mono text-slate-800">num2 != 0</td>
                <td className="py-2 px-3">True se o número não for zero</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono font-bold text-indigo-600">&gt;</td>
                <td className="py-2 px-3">Maior que</td>
                <td className="py-2 px-3 font-mono text-slate-800">resultado &gt; 100</td>
                <td className="py-2 px-3">True se resultado for maior que 100</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono font-bold text-indigo-600">&lt;</td>
                <td className="py-2 px-3">Menor que</td>
                <td className="py-2 px-3 font-mono text-slate-800">resultado &lt; 0</td>
                <td className="py-2 px-3">True se o resultado for negativo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
