import React, { useState } from 'react';
import { Header } from './components/Header';
import { PythonSimulator } from './components/PythonSimulator';
import { CodeViewer } from './components/CodeViewer';
import { ConditionalFlowchart } from './components/ConditionalFlowchart';
import { ComponentsGuide } from './components/ComponentsGuide';
import { HowToRunGuide } from './components/HowToRunGuide';
import { PracticeChallenges } from './components/PracticeChallenges';
import { Terminal, Code2, GitBranch, BookOpen, Laptop, Sparkles, ChevronRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('simulador');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Header Contract */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-mono font-medium">
              <span>Python 3 Básico</span>
              <span>·</span>
              <span>Lógica de Programação</span>
              <span>·</span>
              <span>Estruturas Condicionais</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white text-balance">
              Calculadora Simples em Python com Estruturas Condicionais
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Um ambiente completo e interativo para quem está começando na programação. Compreenda como o comando{' '}
              <code className="text-amber-300 font-mono">input()</code>, a conversão{' '}
              <code className="text-amber-300 font-mono">float()</code> e as decisões{' '}
              <code className="text-amber-300 font-mono">if / elif / else</code> funcionam juntos para calcular as quatro operações básicas.
            </p>

            {/* Quick Navigation Pills / Interactive Tabs */}
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('simulador')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeTab === 'simulador'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-slate-200'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Simulador de Execução</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('codigo')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeTab === 'codigo'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-slate-200'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Código-Fonte Completo</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('fluxograma')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeTab === 'fluxograma'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-slate-200'
                }`}
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>Fluxograma if / elif</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('explicacao')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeTab === 'explicacao'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Guia Didático</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('como-rodar')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  activeTab === 'como-rodar'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-slate-200'
                }`}
              >
                <Laptop className="w-3.5 h-3.5" />
                <span>Como Executar no PC</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Tab Content */}
        {activeTab === 'simulador' && (
          <div className="space-y-8">
            <PythonSimulator />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
                <h3 className="font-bold text-slate-900 text-sm flex items-center justify-between">
                  <span>Próximo Passo Recomendado</span>
                  <button
                    onClick={() => setActiveTab('fluxograma')}
                    className="text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Ver Fluxograma</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Quer ver como o interpretador Python pula os blocos que deram <code>False</code> até encontrar o correto? Explore o fluxograma visual interativo de decisões.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
                <h3 className="font-bold text-slate-900 text-sm flex items-center justify-between">
                  <span>Ver o Código em Python Puro</span>
                  <button
                    onClick={() => setActiveTab('codigo')}
                    className="text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Copiar Código</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Acesse o arquivo formatado com comentários em português pronto para salvar como <code>calculadora.py</code> e rodar no seu terminal ou editor favorito.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'codigo' && (
          <div className="space-y-8">
            <CodeViewer />
            <PracticeChallenges />
          </div>
        )}

        {activeTab === 'fluxograma' && (
          <div className="space-y-8">
            <ConditionalFlowchart />
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Pronto para testar valores reais?</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Execute cálculos no Simulador para ver as variáveis sendo atualizadas na memória.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('simulador')}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap self-start sm:self-auto"
              >
                Abrir Simulador
              </button>
            </div>
          </div>
        )}

        {activeTab === 'explicacao' && (
          <div className="space-y-8">
            <ComponentsGuide />
          </div>
        )}

        {activeTab === 'como-rodar' && (
          <div className="space-y-8">
            <HowToRunGuide />
            <PracticeChallenges />
          </div>
        )}
      </main>

      {/* Quiet, Clean Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Calculadora em Python</span>
            <span aria-hidden="true">·</span>
            <span>Guia para Iniciantes</span>
            <span aria-hidden="true">·</span>
            <span>Python 3.x</span>
          </div>
          <div>
            <span>Pratique codificando todos os dias!</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
