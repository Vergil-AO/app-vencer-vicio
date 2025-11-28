'use client';

import { Shield, Brain, Target, Users, TrendingUp, CheckCircle, ArrowRight, Zap, Lock, Heart } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/custom/navbar';
import { APP_NAME, APP_TAGLINE, STRATEGIES, EDUCATIONAL_CONTENT, MILESTONES, ADDICTION_TYPES } from '@/lib/constants';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            {/* Logo com Imagem do Cérebro */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="relative w-48 h-48 rounded-2xl overflow-hidden border-4 border-blue-500 shadow-2xl shadow-blue-500/50">
                  <Image
                    src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/56cc0e53-b85c-4184-b22b-c0e54bc94f9e.jpg"
                    alt="Clear Mind - Neurociência da Superação"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent" />
                </div>
                
                {/* Cérebro Ativo Animado */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full p-4 shadow-2xl shadow-blue-500/50 animate-pulse">
                  <Brain className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2">
              <Zap className="w-4 h-4 text-red-400" />
              <span className="text-red-400 text-sm font-bold">{APP_TAGLINE}</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Reconquiste Seu Poder,
              </span>
              <span className="block">Vença Qualquer Vício,</span>
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Transforme Sua Vida
              </span>
            </h1>

            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Um programa completo e científico para homens que querem superar vícios comportamentais 
              e construir uma vida de propósito, disciplina e liberdade real.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link 
                href="/login"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-cyan-700 transition-all hover:scale-105 shadow-2xl shadow-blue-500/20 flex items-center gap-2"
              >
                Começar Minha Jornada
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/pricing"
                className="border-2 border-slate-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:border-slate-600 hover:bg-slate-800/50 transition-all"
              >
                Ver Planos
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-8 pt-8 text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>100% Anônimo</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Baseado em Ciência</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Suporte 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Addiction Types Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              Vença Qualquer Vício
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Nosso sistema funciona para todos os tipos de vícios comportamentais
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {ADDICTION_TYPES.map((addiction) => (
              <div 
                key={addiction.id}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 text-center space-y-3 hover:border-blue-500/50 transition-all hover:scale-105 cursor-pointer group"
              >
                <div className="text-5xl group-hover:scale-110 transition-transform">{addiction.icon}</div>
                <div className="font-bold text-white text-lg">{addiction.name}</div>
                <div className="text-sm text-slate-400 leading-relaxed">{addiction.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                10,000+
              </div>
              <div className="text-slate-400">Homens em recuperação</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                90 dias
              </div>
              <div className="text-slate-400">Programa de transformação</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                87%
              </div>
              <div className="text-slate-400">Taxa de sucesso</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="como-funciona" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              Como Funciona
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Um sistema completo e estruturado para sua recuperação
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 space-y-4 hover:border-blue-500/50 transition-all">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-12 h-12 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">1. Defina Seus Objetivos</h3>
              <p className="text-slate-400">
                Estabeleça metas claras e realistas. Comece com pequenas vitórias diárias.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 space-y-4 hover:border-cyan-500/50 transition-all">
              <div className="bg-gradient-to-br from-cyan-500 to-blue-500 w-12 h-12 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">2. Compreenda o Vício</h3>
              <p className="text-slate-400">
                Aprenda como o vício funciona no cérebro e por que você não está sozinho.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 space-y-4 hover:border-blue-500/50 transition-all">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-12 h-12 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">3. Aplique Estratégias</h3>
              <p className="text-slate-400">
                Use ferramentas práticas e comprovadas para prevenir recaídas.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 space-y-4 hover:border-cyan-500/50 transition-all">
              <div className="bg-gradient-to-br from-cyan-500 to-blue-500 w-12 h-12 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">4. Acompanhe Progresso</h3>
              <p className="text-slate-400">
                Veja sua evolução em tempo real e celebre cada conquista.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              Marcos da Jornada
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Cada dia é uma vitória. Celebre seu progresso.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MILESTONES.map((milestone) => (
              <div 
                key={milestone.days}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 space-y-3 hover:border-green-500/50 transition-all"
              >
                <div className="text-4xl">{milestone.badge}</div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-white">{milestone.title}</div>
                  <div className="text-sm text-green-400 font-semibold">{milestone.days} dias</div>
                </div>
                <p className="text-slate-400">{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategies */}
      <section id="estrategias" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              Estratégias Práticas
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Ferramentas comprovadas para sua recuperação
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STRATEGIES.map((strategy) => (
              <div 
                key={strategy.id}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 space-y-4 hover:border-blue-500/50 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white">{strategy.title}</h3>
                      <span className="text-xs bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">
                        {strategy.category}
                      </span>
                    </div>
                    <p className="text-slate-400">{strategy.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Content Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              Entenda o Vício
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Conhecimento é poder. Aprenda a ciência por trás da recuperação.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {EDUCATIONAL_CONTENT.slice(0, 2).map((content) => (
              <div 
                key={content.id}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 space-y-4 hover:border-cyan-500/50 transition-all"
              >
                <h3 className="text-2xl font-bold text-white">{content.title}</h3>
                <p className="text-slate-400 line-clamp-6">{content.content}</p>
                <Link 
                  href="/dashboard"
                  className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  Ler mais
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-12 text-center space-y-6 shadow-2xl shadow-blue-500/20">
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              Pronto Para Mudar Sua Vida?
            </h2>
            <p className="text-xl text-blue-100">
              Junte-se a milhares de homens que já deram o primeiro passo rumo à liberdade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link 
                href="/login"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all hover:scale-105 shadow-xl flex items-center gap-2"
              >
                Começar Gratuitamente
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/pricing"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all"
              >
                Ver Planos Premium
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-6 pt-4 text-blue-100">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                <span>Totalmente Privado</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                <span>Sem Julgamentos</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>Comunidade de Apoio</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Brain className="w-6 h-6 text-blue-400" />
            <span className="text-xl font-bold text-white">{APP_NAME}</span>
          </div>
          <p className="text-slate-400">
            {APP_TAGLINE} - Reconquiste seu poder, sua liberdade, sua vida.
          </p>
          <div className="text-sm text-slate-500">
            © 2024 {APP_NAME}. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}