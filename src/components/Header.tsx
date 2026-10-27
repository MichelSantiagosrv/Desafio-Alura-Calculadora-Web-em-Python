import React from 'react';
import { Download, Code2, Terminal } from 'lucide-react';
import { BASIC_PYTHON_CODE } from '../data/pythonCode';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([BASIC_PYTHON_CODE], { type: 'text/x-python' });
    element.href = URL.createObjectURL(file);
    element.download = 'calculadora.py';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const navItems = [
    { id: 'simulador', label: 'Simulador' },
    { id: 'codigo', label: 'Código Python' },
    { id: 'fluxograma', label: 'Fluxograma' },
    { id: 'explicacao', label: 'Explicações' },
    { id: 'como-rodar', label: 'Como Executar' },
    { id: 'readme', label: 'README GitHub' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text wordmark */}
          <button
            onClick={() => setActiveTab('simulador')}
            className="flex items-center gap-2.5 text-left text-slate-900 font-bold tracking-tight text-lg hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-mono font-bold text-sm shadow-sm">
              Py
            </div>
            <span>Calculadora em Python</span>
          </button>

          {/* Zone 2: 4-5 single-line clean nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
                  activeTab === item.id
                    ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition-colors shadow-sm cursor-pointer whitespace-nowrap shrink-0"
              title="Baixar arquivo calculadora.py pronto para rodar no seu computador"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar calculadora.py</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav scrollbar */}
      <div className="md:hidden flex items-center overflow-x-auto px-4 py-2 gap-2 border-t border-slate-100 bg-slate-50/70 scrollbar-none">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`whitespace-nowrap shrink-0 px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer ${
              activeTab === item.id
                ? 'bg-white text-indigo-700 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
