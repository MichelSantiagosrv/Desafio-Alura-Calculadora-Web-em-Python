import React, { useState } from 'react';
import { Copy, Check, Download, FileCode2, Layers } from 'lucide-react';
import { BASIC_PYTHON_CODE, ADVANCED_PYTHON_CODE } from '../data/pythonCode';

export const CodeViewer: React.FC = () => {
  const [activeVersion, setActiveVersion] = useState<'basic' | 'modular'>('basic');
  const [copied, setCopied] = useState(false);

  const currentCode = activeVersion === 'basic' ? BASIC_PYTHON_CODE : ADVANCED_PYTHON_CODE;
  const fileName = activeVersion === 'basic' ? 'calculadora_simples.py' : 'calculadora_modular.py';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([currentCode], { type: 'text/x-python' });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const renderHighlightedLine = (line: string, index: number) => {
    // Simple, clean syntax highlighter
    const trimmed = line.trim();
    const isComment = trimmed.startsWith('#');

    if (isComment) {
      return (
        <span key={index} className="text-slate-400 italic">
          {line}
        </span>
      );
    }

    // Replace keywords with styled spans
    const keywords = [
      'if', 'elif', 'else', 'def', 'return', 'while', 'break', 'in', 'float', 'input', 'print'
    ];

    return (
      <span key={index} className="text-slate-100">
        {line}
      </span>
    );
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs space-y-0">
      {/* Top Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FileCode2 className="w-5 h-5 text-indigo-600" />
            <span>Código-Fonte Python Formatado</span>
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Código limpo, organizado com comentários explicativos e indentação padrão PEP 8.
          </p>
        </div>

        {/* Version Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-lg self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveVersion('basic')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              activeVersion === 'basic'
                ? 'bg-white text-indigo-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Versão Básica (Iniciante)
          </button>
          <button
            type="button"
            onClick={() => setActiveVersion('modular')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              activeVersion === 'modular'
                ? 'bg-white text-indigo-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Versão com Funções (Avançado)
          </button>
        </div>
      </div>

      {/* Action Bar */}
      <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
        <span className="text-slate-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{fileName}</span>
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors cursor-pointer"
            title="Copiar código para a área de transferência"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copiado!</span>
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
            className="inline-flex items-center gap-1.5 px-3 py-1 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors cursor-pointer"
            title="Baixar arquivo Python (.py)"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar .py</span>
          </button>
        </div>
      </div>

      {/* Code Area */}
      <div className="bg-slate-950 p-4 sm:p-6 overflow-x-auto">
        <pre className="font-mono text-xs sm:text-sm text-slate-200 leading-relaxed">
          <code>
            {currentCode.split('\n').map((line, idx) => {
              const isComment = line.trim().startsWith('#');
              const isIfElif =
                line.trim().startsWith('if ') ||
                line.trim().startsWith('elif ') ||
                line.trim().startsWith('else:') ||
                line.trim().startsWith('def ');

              return (
                <div key={idx} className="table-row hover:bg-slate-900/60 transition-colors">
                  <span className="table-cell pr-4 text-right select-none text-slate-600 text-xs w-8">
                    {idx + 1}
                  </span>
                  <span
                    className={`table-cell whitespace-pre ${
                      isComment
                        ? 'text-emerald-400/80 italic'
                        : isIfElif
                        ? 'text-indigo-300 font-semibold'
                        : 'text-slate-100'
                    }`}
                  >
                    {line}
                  </span>
                </div>
              );
            })}
          </code>
        </pre>
      </div>

      {/* Code Summary Footer */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-slate-900">Total de linhas: {currentCode.split('\n').length}</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>Compatível com Python 3.6+</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>PEP 8 compliant</span>
        </div>
        <span className="text-indigo-700 font-medium">
          Dica: Você pode copiar o código e colar diretamente no VS Code ou PyCharm.
        </span>
      </div>
    </div>
  );
};
