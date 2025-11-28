'use client';

import { useState } from 'react';
import { 
  Target, 
  Plus, 
  Calendar, 
  TrendingUp,
  CheckCircle,
  Circle,
  Edit,
  Trash2,
  Save,
  X,
  Award,
  Clock,
  Flag,
  Zap
} from 'lucide-react';
import Navbar from '@/components/custom/navbar';

interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'daily' | 'weekly' | 'monthly' | 'long-term';
  priority: 'low' | 'medium' | 'high';
  startDate: string;
  targetDate: string;
  progress: number;
  status: 'active' | 'completed' | 'paused';
  milestones: Milestone[];
}

interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  completedDate?: string;
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: '90 Dias Limpo',
      description: 'Completar 90 dias consecutivos sem recaídas',
      category: 'long-term',
      priority: 'high',
      startDate: '2024-01-01',
      targetDate: '2024-04-01',
      progress: 50,
      status: 'active',
      milestones: [
        { id: '1', title: '7 dias', completed: true, completedDate: '2024-01-08' },
        { id: '2', title: '30 dias', completed: true, completedDate: '2024-01-31' },
        { id: '3', title: '60 dias', completed: false },
        { id: '4', title: '90 dias', completed: false }
      ]
    },
    {
      id: '2',
      title: 'Exercícios Diários',
      description: 'Fazer 30 minutos de exercício físico todos os dias',
      category: 'daily',
      priority: 'high',
      startDate: '2024-01-01',
      targetDate: '2024-12-31',
      progress: 75,
      status: 'active',
      milestones: [
        { id: '1', title: '7 dias consecutivos', completed: true },
        { id: '2', title: '30 dias consecutivos', completed: true },
        { id: '3', title: '90 dias consecutivos', completed: false }
      ]
    },
    {
      id: '3',
      title: 'Meditação Matinal',
      description: 'Meditar por 15 minutos todas as manhãs',
      category: 'daily',
      priority: 'medium',
      startDate: '2024-01-15',
      targetDate: '2024-12-31',
      progress: 60,
      status: 'active',
      milestones: [
        { id: '1', title: '7 dias', completed: true },
        { id: '2', title: '21 dias (hábito)', completed: false },
        { id: '3', title: '90 dias', completed: false }
      ]
    }
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const [newGoal, setNewGoal] = useState<Partial<Goal>>({
    title: '',
    description: '',
    category: 'daily',
    priority: 'medium',
    startDate: new Date().toISOString().split('T')[0],
    targetDate: '',
    progress: 0,
    status: 'active',
    milestones: []
  });

  const categories = {
    daily: { icon: '📅', label: 'Diária', color: 'from-blue-500 to-cyan-500' },
    weekly: { icon: '📆', label: 'Semanal', color: 'from-green-500 to-emerald-500' },
    monthly: { icon: '🗓️', label: 'Mensal', color: 'from-purple-500 to-pink-500' },
    'long-term': { icon: '🎯', label: 'Longo Prazo', color: 'from-orange-500 to-red-500' }
  };

  const priorities = {
    low: { icon: '🟢', label: 'Baixa', color: 'text-green-400' },
    medium: { icon: '🟡', label: 'Média', color: 'text-yellow-400' },
    high: { icon: '🔴', label: 'Alta', color: 'text-red-400' }
  };

  const handleSaveGoal = () => {
    if (editingId) {
      setGoals(goals.map(g => g.id === editingId ? { ...newGoal, id: editingId } as Goal : g));
      setEditingId(null);
    } else {
      const goal: Goal = {
        ...newGoal,
        id: Date.now().toString(),
      } as Goal;
      setGoals([goal, ...goals]);
    }
    setNewGoal({
      title: '',
      description: '',
      category: 'daily',
      priority: 'medium',
      startDate: new Date().toISOString().split('T')[0],
      targetDate: '',
      progress: 0,
      status: 'active',
      milestones: []
    });
    setIsCreating(false);
  };

  const handleEditGoal = (goal: Goal) => {
    setNewGoal(goal);
    setEditingId(goal.id);
    setIsCreating(true);
  };

  const handleDeleteGoal = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta meta?')) {
      setGoals(goals.filter(g => g.id !== id));
    }
  };

  const toggleMilestone = (goalId: string, milestoneId: string) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const updatedMilestones = goal.milestones.map(m => 
          m.id === milestoneId 
            ? { ...m, completed: !m.completed, completedDate: !m.completed ? new Date().toISOString().split('T')[0] : undefined }
            : m
        );
        const completedCount = updatedMilestones.filter(m => m.completed).length;
        const progress = (completedCount / updatedMilestones.length) * 100;
        return { ...goal, milestones: updatedMilestones, progress };
      }
      return goal;
    }));
  };

  const filteredGoals = goals.filter(goal => {
    const matchesCategory = filterCategory === 'all' || goal.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || goal.status === filterStatus;
    return matchesCategory && matchesStatus;
  });

  const activeGoals = goals.filter(g => g.status === 'active');
  const completedGoals = goals.filter(g => g.status === 'completed');
  const totalProgress = goals.length > 0 ? goals.reduce((acc, g) => acc + g.progress, 0) / goals.length : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Target className="w-12 h-12 text-green-400" />
              <h1 className="text-4xl sm:text-5xl font-bold text-white">
                Minhas Metas
              </h1>
            </div>
            <p className="text-xl text-slate-400">
              Defina objetivos claros e acompanhe seu progresso
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">{goals.length}</div>
              <div className="text-sm text-slate-400">Total de Metas</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">{activeGoals.length}</div>
              <div className="text-sm text-slate-400">Metas Ativas</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">{completedGoals.length}</div>
              <div className="text-sm text-slate-400">Concluídas</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">{Math.round(totalProgress)}%</div>
              <div className="text-sm text-slate-400">Progresso Médio</div>
            </div>
          </div>

          {/* Filters and Actions */}
          <div className="flex flex-col md:flex-row gap-4">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500"
            >
              <option value="all">Todas Categorias</option>
              {Object.entries(categories).map(([key, value]) => (
                <option key={key} value={key}>{value.icon} {value.label}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500"
            >
              <option value="all">Todos Status</option>
              <option value="active">Ativas</option>
              <option value="completed">Concluídas</option>
              <option value="paused">Pausadas</option>
            </select>
            <button
              onClick={() => setIsCreating(true)}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all flex items-center justify-center gap-2 md:ml-auto"
            >
              <Plus className="w-5 h-5" />
              Nova Meta
            </button>
          </div>

          {/* Create/Edit Form */}
          {isCreating && (
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  {editingId ? 'Editar Meta' : 'Nova Meta'}
                </h2>
                <button
                  onClick={() => {
                    setIsCreating(false);
                    setEditingId(null);
                    setNewGoal({
                      title: '',
                      description: '',
                      category: 'daily',
                      priority: 'medium',
                      startDate: new Date().toISOString().split('T')[0],
                      targetDate: '',
                      progress: 0,
                      status: 'active',
                      milestones: []
                    });
                  }}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-2 block">Título da Meta</label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                  placeholder="Ex: 90 dias limpo, Exercícios diários..."
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500"
                />
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-2 block">Descrição</label>
                <textarea
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                  placeholder="Descreva sua meta em detalhes..."
                  rows={3}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Categoria</label>
                  <select
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({...newGoal, category: e.target.value as any})}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white"
                  >
                    {Object.entries(categories).map(([key, value]) => (
                      <option key={key} value={key}>{value.icon} {value.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Prioridade</label>
                  <select
                    value={newGoal.priority}
                    onChange={(e) => setNewGoal({...newGoal, priority: e.target.value as any})}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white"
                  >
                    {Object.entries(priorities).map(([key, value]) => (
                      <option key={key} value={key}>{value.icon} {value.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Status</label>
                  <select
                    value={newGoal.status}
                    onChange={(e) => setNewGoal({...newGoal, status: e.target.value as any})}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white"
                  >
                    <option value="active">Ativa</option>
                    <option value="completed">Concluída</option>
                    <option value="paused">Pausada</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Data de Início</label>
                  <input
                    type="date"
                    value={newGoal.startDate}
                    onChange={(e) => setNewGoal({...newGoal, startDate: e.target.value})}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Data Alvo</label>
                  <input
                    type="date"
                    value={newGoal.targetDate}
                    onChange={(e) => setNewGoal({...newGoal, targetDate: e.target.value})}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white"
                  />
                </div>
              </div>

              <button
                onClick={handleSaveGoal}
                disabled={!newGoal.title || !newGoal.description}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                {editingId ? 'Atualizar' : 'Criar'} Meta
              </button>
            </div>
          )}

          {/* Goals List */}
          <div className="space-y-4">
            {filteredGoals.length === 0 ? (
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-12 text-center">
                <Target className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-400 mb-2">
                  Nenhuma meta encontrada
                </h3>
                <p className="text-slate-500">
                  Crie sua primeira meta para começar a acompanhar seu progresso
                </p>
              </div>
            ) : (
              filteredGoals.map((goal) => (
                <div
                  key={goal.id}
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 space-y-4 hover:bg-slate-800/70 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${categories[goal.category].color} flex items-center justify-center text-2xl`}>
                          {categories[goal.category].icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl font-bold text-white">{goal.title}</h3>
                            <span className={`text-lg ${priorities[goal.priority].color}`}>
                              {priorities[goal.priority].icon}
                            </span>
                          </div>
                          <p className="text-sm text-slate-400">{goal.description}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(goal.startDate).toLocaleDateString('pt-BR')} - {new Date(goal.targetDate).toLocaleDateString('pt-BR')}
                        </div>
                        <span className="px-2 py-1 bg-slate-700 rounded-full text-xs">
                          {categories[goal.category].label}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          goal.status === 'active' ? 'bg-green-500/20 text-green-400' :
                          goal.status === 'completed' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {goal.status === 'active' ? 'Ativa' : goal.status === 'completed' ? 'Concluída' : 'Pausada'}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Progresso</span>
                          <span className="text-white font-semibold">{Math.round(goal.progress)}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all"
                            style={{ width: `${goal.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Milestones */}
                      {goal.milestones.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                            <Flag className="w-4 h-4" />
                            Marcos
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {goal.milestones.map((milestone) => (
                              <div
                                key={milestone.id}
                                onClick={() => toggleMilestone(goal.id, milestone.id)}
                                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                                  milestone.completed
                                    ? 'bg-green-500/10 border-green-500/30'
                                    : 'bg-slate-900/50 border-slate-700 hover:border-slate-600'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  {milestone.completed ? (
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                  ) : (
                                    <Circle className="w-5 h-5 text-slate-500 flex-shrink-0" />
                                  )}
                                  <div className="flex-1">
                                    <span className="text-sm text-white">{milestone.title}</span>
                                    {milestone.completedDate && (
                                      <p className="text-xs text-slate-400">
                                        {new Date(milestone.completedDate).toLocaleDateString('pt-BR')}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEditGoal(goal)}
                        className="text-blue-400 hover:text-blue-300 p-2"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteGoal(goal.id)}
                        className="text-red-400 hover:text-red-300 p-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
