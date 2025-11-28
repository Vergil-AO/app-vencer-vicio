'use client';

import { useState, useEffect } from 'react';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Shield, 
  Users, 
  CheckCircle, 
  Circle,
  Lock,
  AlertTriangle,
  MessageSquare,
  Plus,
  Calendar,
  Award,
  BookOpen,
  Settings,
  Heart,
  User
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/custom/navbar';
import { STRATEGIES, EDUCATIONAL_CONTENT, MILESTONES, ADDICTION_TYPES, DAILY_GOALS } from '@/lib/constants';

export default function DashboardPage() {
  const [cleanDays, setCleanDays] = useState(7);
  const [completedStrategies, setCompletedStrategies] = useState<string[]>([]);
  const [completedGoals, setCompletedGoals] = useState<string[]>([]);
  const [blockedSites, setBlockedSites] = useState<string[]>([
    'pornhub.com',
    'xvideos.com',
    'xnxx.com'
  ]);
  const [newSite, setNewSite] = useState('');
  const [selectedAddiction, setSelectedAddiction] = useState('porn');

  const toggleStrategy = (id: string) => {
    setCompletedStrategies(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const toggleGoal = (id: string) => {
    setCompletedGoals(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const addBlockedSite = () => {
    if (newSite && !blockedSites.includes(newSite)) {
      setBlockedSites([...blockedSites, newSite]);
      setNewSite('');
    }
  };

  const removeBlockedSite = (site: string) => {
    setBlockedSites(blockedSites.filter(s => s !== site));
  };

  const currentMilestone = MILESTONES.filter(m => m.days <= cleanDays).pop();
  const nextMilestone = MILESTONES.find(m => m.days > cleanDays);
  const progressToNext = nextMilestone 
    ? (cleanDays / nextMilestone.days) * 100 
    : 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              Seu Painel de Recuperação
            </h1>
            <p className="text-xl text-slate-400">
              Continue firme. Cada dia é uma vitória.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Clean Days Counter */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Dias Limpos</h3>
                <Calendar className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {cleanDays}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Próximo marco: {nextMilestone?.title}</span>
                  <span className="text-blue-400">{nextMilestone?.days} dias</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all"
                    style={{ width: `${progressToNext}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Strategies Progress */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Estratégias</h3>
                <Shield className="w-5 h-5 text-green-400" />
              </div>
              <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                {completedStrategies.length}/{STRATEGIES.length}
              </div>
              <p className="text-sm text-slate-400">
                Estratégias concluídas hoje
              </p>
            </div>

            {/* Daily Goals */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Metas Diárias</h3>
                <Target className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {completedGoals.length}/{DAILY_GOALS.length}
              </div>
              <p className="text-sm text-slate-400">
                Metas cumpridas hoje
              </p>
            </div>
          </div>

          {/* Current Milestone */}
          {currentMilestone && (
            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-8 text-center space-y-4">
              <div className="text-6xl">{currentMilestone.badge}</div>
              <h2 className="text-3xl font-bold text-white">{currentMilestone.title}</h2>
              <p className="text-blue-100 text-lg">{currentMilestone.description}</p>
            </div>
          )}

          {/* Daily Goals Checklist */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Metas Diárias</h2>
              <Target className="w-6 h-6 text-purple-400" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DAILY_GOALS.map((goal) => (
                <div
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    completedGoals.includes(goal.id)
                      ? 'bg-green-500/10 border-green-500'
                      : 'bg-slate-900/50 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {completedGoals.includes(goal.id) ? (
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    ) : (
                      <Circle className="w-6 h-6 text-slate-500 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{goal.title}</h3>
                      <p className="text-sm text-slate-400">{goal.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strategies Checklist */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Check-in de Estratégias Práticas</h2>
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <p className="text-slate-400">
              Marque as estratégias que você aplicou hoje. Quanto mais você praticar, mais forte ficará.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {STRATEGIES.map((strategy) => (
                <div
                  key={strategy.id}
                  onClick={() => toggleStrategy(strategy.id)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    completedStrategies.includes(strategy.id)
                      ? 'bg-blue-500/10 border-blue-500'
                      : 'bg-slate-900/50 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {completedStrategies.includes(strategy.id) ? (
                      <CheckCircle className="w-6 h-6 text-blue-500 flex-shrink-0" />
                    ) : (
                      <Circle className="w-6 h-6 text-slate-500 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-white">{strategy.title}</h3>
                        <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full">
                          {strategy.category}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400">{strategy.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Site Blocker */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Bloqueador de Sites</h2>
                <p className="text-slate-400 text-sm mt-1">
                  Adicione sites que você quer bloquear para evitar recaídas
                </p>
              </div>
              <Lock className="w-6 h-6 text-red-400" />
            </div>

            {/* Add Site Form */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newSite}
                onChange={(e) => setNewSite(e.target.value)}
                placeholder="exemplo.com"
                className="flex-1 bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                onKeyPress={(e) => e.key === 'Enter' && addBlockedSite()}
              />
              <button
                onClick={addBlockedSite}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Bloquear
              </button>
            </div>

            {/* Blocked Sites List */}
            <div className="space-y-2">
              {blockedSites.map((site) => (
                <div
                  key={site}
                  className="flex items-center justify-between bg-red-500/10 border border-red-500/30 rounded-lg p-3"
                >
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <span className="text-white font-medium">{site}</span>
                  </div>
                  <button
                    onClick={() => removeBlockedSite(site)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-200">
                <p className="font-semibold mb-1">Atenção:</p>
                <p>
                  Para ativar o bloqueio real, instale a extensão Clear Mind Blocker no seu navegador.
                  Esta lista será sincronizada automaticamente.
                </p>
              </div>
            </div>
          </div>

          {/* Communities Section */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Comunidades de Apoio</h2>
                <p className="text-slate-400 text-sm mt-1">
                  Conecte-se com outros guerreiros na mesma jornada
                </p>
              </div>
              <Users className="w-6 h-6 text-cyan-400" />
            </div>

            {/* Addiction Type Selector */}
            <div className="flex flex-wrap gap-2">
              {ADDICTION_TYPES.map((addiction) => (
                <button
                  key={addiction.id}
                  onClick={() => setSelectedAddiction(addiction.id)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    selectedAddiction === addiction.id
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                      : 'bg-slate-900/50 text-slate-400 hover:text-white border border-slate-700'
                  }`}
                >
                  {addiction.icon} {addiction.name}
                </button>
              ))}
            </div>

            {/* Community Feed */}
            <div className="space-y-4">
              <div className="bg-slate-900/50 rounded-lg p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                    M
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-white">Marcos Silva</span>
                      <span className="text-xs text-slate-500">• 30 dias limpo</span>
                    </div>
                    <p className="text-slate-300 text-sm">
                      Hoje completei 30 dias! Nunca pensei que conseguiria. A meditação matinal tem sido fundamental. 
                      Obrigado a todos pelo apoio! 💪
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                      <button className="hover:text-blue-400">👏 47</button>
                      <button className="hover:text-blue-400">💬 12</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                    R
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-white">Rafael Costa</span>
                      <span className="text-xs text-slate-500">• 90 dias limpo</span>
                    </div>
                    <p className="text-slate-300 text-sm">
                      90 dias! Minha vida mudou completamente. Relacionamentos melhores, mais energia, foco no trabalho. 
                      Para quem está começando: vale MUITO a pena. Não desistam! 🔥
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                      <button className="hover:text-blue-400">👏 128</button>
                      <button className="hover:text-blue-400">💬 34</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                    L
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-white">Lucas Mendes</span>
                      <span className="text-xs text-slate-500">• 7 dias limpo</span>
                    </div>
                    <p className="text-slate-300 text-sm">
                      Primeira semana completa! Os primeiros dias foram difíceis, mas estou sentindo a diferença. 
                      Exercícios físicos ajudaram muito. Vamos juntos! 💪
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                      <button className="hover:text-blue-400">👏 23</button>
                      <button className="hover:text-blue-400">💬 8</button>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/communities"
                className="block w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-lg font-semibold text-center hover:from-blue-700 hover:to-cyan-700 transition-all"
              >
                Ver Todas as Comunidades
              </Link>
            </div>
          </div>

          {/* Quick Access Section */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Acesso Rápido</h2>
              <User className="w-6 h-6 text-blue-400" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/journal"
                className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-900/70 hover:border-purple-500 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <BookOpen className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Meu Diário</h3>
                    <p className="text-sm text-slate-400">Registre seu dia</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/reflections"
                className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-900/70 hover:border-pink-500 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Heart className="w-6 h-6 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Reflexões</h3>
                    <p className="text-sm text-slate-400">Insights diários</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/goals"
                className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-900/70 hover:border-green-500 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Target className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Minhas Metas</h3>
                    <p className="text-sm text-slate-400">Defina objetivos</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Quick Access Section */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Acesso Rápido</h2>
              <User className="w-6 h-6 text-blue-400" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/journal"
                className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-900/70 hover:border-purple-500 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <BookOpen className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Meu Diário</h3>
                    <p className="text-sm text-slate-400">Registre seu dia</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/reflections"
                className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-900/70 hover:border-pink-500 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Heart className="w-6 h-6 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Reflexões</h3>
                    <p className="text-sm text-slate-400">Insights diários</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/goals"
                className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-900/70 hover:border-green-500 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Target className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Minhas Metas</h3>
                    <p className="text-sm text-slate-400">Defina objetivos</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Quick Access Section */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Acesso Rápido</h2>
              <User className="w-6 h-6 text-blue-400" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/journal"
                className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-900/70 hover:border-purple-500 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <BookOpen className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Meu Diário</h3>
                    <p className="text-sm text-slate-400">Registre seu dia</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/reflections"
                className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-900/70 hover:border-pink-500 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Heart className="w-6 h-6 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Reflexões</h3>
                    <p className="text-sm text-slate-400">Insights diários</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/goals"
                className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-900/70 hover:border-green-500 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Target className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Minhas Metas</h3>
                    <p className="text-sm text-slate-400">Defina objetivos</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Quick Access Section */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Acesso Rápido</h2>
              <User className="w-6 h-6 text-blue-400" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/journal"
                className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-900/70 hover:border-purple-500 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <BookOpen className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Meu Diário</h3>
                    <p className="text-sm text-slate-400">Registre seu dia</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/reflections"
                className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-900/70 hover:border-pink-500 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Heart className="w-6 h-6 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Reflexões</h3>
                    <p className="text-sm text-slate-400">Insights diários</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/goals"
                className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-900/70 hover:border-green-500 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Target className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Minhas Metas</h3>
                    <p className="text-sm text-slate-400">Defina objetivos</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Quick Access Section */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Acesso Rápido</h2>
              <User className="w-6 h-6 text-blue-400" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/journal"
                className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-900/70 hover:border-purple-500 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <BookOpen className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Meu Diário</h3>
                    <p className="text-sm text-slate-400">Registre seu dia</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/reflections"
                className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-900/70 hover:border-pink-500 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Heart className="w-6 h-6 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Reflexões</h3>
                    <p className="text-sm text-slate-400">Insights diários</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/goals"
                className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-900/70 hover:border-green-500 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Target className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Minhas Metas</h3>
                    <p className="text-sm text-slate-400">Defina objetivos</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Educational Content */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Conteúdo Educacional</h2>
              <BookOpen className="w-6 h-6 text-yellow-400" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {EDUCATIONAL_CONTENT.slice(0, 4).map((content) => (
                <div
                  key={content.id}
                  className="bg-slate-900/50 rounded-lg p-4 space-y-2 hover:bg-slate-900/70 transition-all cursor-pointer"
                >
                  <h3 className="font-semibold text-white">{content.title}</h3>
                  <p className="text-sm text-slate-400 line-clamp-2">
                    {content.content.substring(0, 100)}...
                  </p>
                  <span className="text-xs text-blue-400">Ler mais →</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}