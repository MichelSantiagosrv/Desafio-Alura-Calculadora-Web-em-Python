import React, { useState } from 'react';
import { Copy, Check, Download, Github, BookOpen, Terminal, Sparkles } from 'lucide-react';
import { README_MARKDOWN } from '../data/pythonCode';

export const ReadmeViewer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'preview' | 'raw'>('preview');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(README_MARKDOWN);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([README_MARKDOWN], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = 'README.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Github className="w-5 h-5 text-slate-900" />
            <span>README.md para o GitHub</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Arquivo <code>README.md</code> completo com badges, tabela explicativa de conceitos, instruções de instalação e desafios para enriquecer seu portfólio no GitHub.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setViewMode('preview')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                viewMode === 'preview' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Prévia Visual
            </button>
            <button
              onClick={() => setViewMode('raw')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                viewMode === 'raw' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Markdown Puro
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            title="Copiar README.md"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer shadow-xs"
            title="Baixar README.md"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar README.md</span>
          </button>
        </div>
      </div>

      {/* GitHub Instruction Callout */}
      <div className="bg-slate-900 text-slate-200 border border-slate-800 rounded-xl p-4 sm:p-5 text-xs space-y-2">
        <div className="flex items-center gap-2 font-mono text-indigo-400 font-bold">
          <Terminal className="w-4 h-4" />
          <span>Como enviar para o seu GitHub pelo terminal:</span>
        </div>
        <div className="bg-slate-950 p-3 rounded-lg font-mono text-slate-300 space-y-1 overflow-x-auto border border-slate-800">
          <div><span className="text-slate-500"># 1. Adicione o arquivo ao git</span></div>
          <div>git add README.md calculadora.py</div>
          <div><span className="text-slate-500"># 2. Faça o commit</span></div>
          <div>git commit -m "docs: adicionar documentacao README.md da calculadora"</div>
          <div><span className="text-slate-500"># 3. Envie para o GitHub</span></div>
          <div>git push origin main</div>
        </div>
      </div>

      {/* Viewport: Raw or Preview */}
      {viewMode === 'raw' ? (
        <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xs">
          <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>README.md</span>
            <span>Markdown</span>
          </div>
          <div className="p-4 sm:p-6 overflow-x-auto">
            <pre className="font-mono text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
              {README_MARKDOWN}
            </pre>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6 text-slate-800 prose max-w-none">
          {/* Formatted Preview */}
          <div className="border-b border-slate-200 pb-4">
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <span>🧮 Calculadora Simples em Python com Estruturas Condicionais</span>
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className="px-2.5 py-0.5 rounded bg-blue-100 text-blue-800 text-xs font-mono font-medium">python: 3.8+</span>
              <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-mono font-medium">license: MIT</span>
              <span className="px-2.5 py-0.5 rounded bg-green-100 text-green-800 text-xs font-mono font-medium">status: concluído</span>
              <span className="px-2.5 py-0.5 rounded bg-amber-100 text-amber-800 text-xs font-mono font-medium">nível: iniciante</span>
            </div>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              Uma calculadora simples desenvolvida em <strong>Python 3</strong> que realiza as quatro operações matemáticas básicas (adição, subtração, multiplicação e divisão), utilizando <strong>estruturas condicionais (<code>if</code>, <code>elif</code>, <code>else</code>)</strong> para determinar a lógica dos cálculos e <strong>tratamento preventivo de divisão por zero</strong>.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">📌 Funcionalidades</h2>
            <ul className="text-sm space-y-1.5 text-slate-600 list-disc list-inside">
              <li><strong>Adição:</strong> <code>num1 + num2</code></li>
              <li><strong>Subtração:</strong> <code>num1 - num2</code></li>
              <li><strong>Multiplicação:</strong> <code>num1 * num2</code></li>
              <li><strong>Divisão:</strong> <code>num1 / num2</code> com validação defensiva contra <strong>divisão por zero</strong></li>
              <li><strong>Validação de Operador:</strong> aviso claro caso o usuário digite um símbolo não reconhecido</li>
              <li><strong>Suporte a Decimais:</strong> aceita inteiros e decimais via <code>float()</code></li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-3">🛠️ Conceitos de Programação Aplicados</h2>
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Conceito</th>
                    <th className="py-2.5 px-3">Descrição</th>
                    <th className="py-2.5 px-3">Exemplo no Código</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-900">Entrada de Dados (input)</td>
                    <td className="py-2 px-3 text-slate-600">Captura os dados digitados pelo usuário no terminal</td>
                    <td className="py-2 px-3 font-mono text-indigo-600">input("Digite um número: ")</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-900">Conversão de Tipos (float)</td>
                    <td className="py-2 px-3 text-slate-600">Converte o texto recebido em número decimal</td>
                    <td className="py-2 px-3 font-mono text-indigo-600">num1 = float(input(...))</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-900">Estruturas Condicionais</td>
                    <td className="py-2 px-3 text-slate-600">Avalia condições de cima para baixo para guiar o fluxo</td>
                    <td className="py-2 px-3 font-mono text-indigo-600">if, elif, else</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-900">Tratamento de Exceções</td>
                    <td className="py-2 px-3 text-slate-600">Impede erro crítico checando se o divisor é zero</td>
                    <td className="py-2 px-3 font-mono text-indigo-600">if num2 == 0:</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-900">f-strings</td>
                    <td className="py-2 px-3 text-slate-600">Formata e interpola variáveis diretamente no texto</td>
                    <td className="py-2 px-3 font-mono text-indigo-600">f"&#123;num1&#125; + &#123;num2&#125; = &#123;resultado&#125;"</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">🚀 Como Executar</h2>
            <div className="bg-slate-900 text-slate-200 p-4 rounded-lg font-mono text-xs space-y-1">
              <div><span className="text-slate-500"># 1. Execute no terminal:</span></div>
              <div>python calculadora.py</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
