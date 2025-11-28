'use client';

import { useState } from 'react';
import { 
  BookOpen, 
  Plus, 
  Calendar, 
  Search,
  Filter,
  Heart,
  MessageCircle,
  TrendingUp,
  Edit,
  Trash2,
  Save,
  X
} from 'lucide-react';
import Navbar from '@/components/custom/navbar';

interface JournalEntry {
  id: string;
  date: string;
  mood: 'great' | 'good' | 'neutral' | 'bad' | 'terrible';
  title: string;
  content: string;
  tags: string[];
  gratitude?: string;
  challenges?: string;
  wins?: string;
}

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      date: '2024-01-20',
      mood: 'great',
      title: 'Dia incrível de progresso',
      content: 'Hoje foi um dia excelente. Consegui resistir a todas as tentações e me senti muito mais forte. A meditação matinal realmente fez diferença.',
      tags: ['vitória', 'meditação', 'força'],
      gratitude: 'Grato pela minha família e pelo apoio da comunidade',
      challenges: 'Momento difícil à noite, mas usei a técnica de respiração',
      wins: 'Completei todas as metas diárias e ajudei outro membro da comunidade'
    },
    {
      id: '2',
      date: '2024-01-19',
      mood: 'good',
      title: 'Mantendo o foco',
      content: 'Mais um dia de vitória. Percebi que os gatilhos estão diminuindo. Continuo firme no propósito.',
      tags: ['progresso', 'foco'],
      gratitude: 'Grato pela oportunidade de mudança',
      wins: 'Exercício físico pela manhã'
    }
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMood, setFilterMood] = useState<string>('all');

  const [newEntry, setNewEntry] = useState<Partial<JournalEntry>>({
    date: new Date().toISOString().split('T')[0],
    mood: 'good',
    title: '',
    content: '',
    tags: [],
    gratitude: '',
    challenges: '',
    wins: ''
  });

  const moodEmojis = {
    great: { emoji: '😄', label: 'Excelente', color: 'from-green-500 to-emerald-500' },
    good: { emoji: '🙂', label: 'Bom', color: 'from-blue-500 to-cyan-500' },
    neutral: { emoji: '😐', label: 'Neutro', color: 'from-yellow-500 to-orange-500' },
    bad: { emoji: '😟', label: 'Difícil', color: 'from-orange-500 to-red-500' },
    terrible: { emoji: '😢', label: 'Muito Difícil', color: 'from-red-500 to-pink-500' }
  };

  const handleSaveEntry = () => {
    if (editingId) {
      setEntries(entries.map(e => e.id === editingId ? { ...newEntry, id: editingId } as JournalEntry : e));
      setEditingId(null);
    } else {
      const entry: JournalEntry = {
        ...newEntry,
        id: Date.now().toString(),
      } as JournalEntry;
      setEntries([entry, ...entries]);
    }
    setNewEntry({
      date: new Date().toISOString().split('T')[0],
      mood: 'good',
      title: '',
      content: '',
      tags: [],
      gratitude: '',
      challenges: '',
      wins: ''
    });
    setIsCreating(false);
  };

  const handleEditEntry = (entry: JournalEntry) => {
    setNewEntry(entry);
    setEditingId(entry.id);
    setIsCreating(true);
  };

  const handleDeleteEntry = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta entrada?')) {
      setEntries(entries.filter(e => e.id !== id));
    }
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMood = filterMood === 'all' || entry.mood === filterMood;
    return matchesSearch && matchesMood;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <BookOpen className="w-12 h-12 text-purple-400" />
              <h1 className="text-4xl sm:text-5xl font-bold text-white">
                Meu Diário
              </h1>
            </div>
            <p className="text-xl text-slate-400">
              Registre sua jornada, sentimentos e progresso diário
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">{entries.length}</div>
              <div className="text-sm text-slate-400">Entradas</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">{entries.filter(e => e.mood === 'great' || e.mood === 'good').length}</div>
              <div className="text-sm text-slate-400">Dias Positivos</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">{Math.floor(entries.length / 7)}</div>
              <div className="text-sm text-slate-400">Semanas</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">
                {entries.length > 0 ? Math.round((entries.filter(e => e.mood === 'great' || e.mood === 'good').length / entries.length) * 100) : 0}%
              </div>
              <div className="text-sm text-slate-400">Taxa Positiva</div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar entradas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterMood}
                onChange={(e) => setFilterMood(e.target.value)}
                className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              >
                <option value="all">Todos os Humores</option>
                {Object.entries(moodEmojis).map(([key, value]) => (
                  <option key={key} value={key}>{value.emoji} {value.label}</option>
                ))}
              </select>
              <button
                onClick={() => setIsCreating(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Nova Entrada
              </button>
            </div>
          </div>

          {/* Create/Edit Form */}
          {isCreating && (
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  {editingId ? 'Editar Entrada' : 'Nova Entrada'}
                </h2>
                <button
                  onClick={() => {
                    setIsCreating(false);
                    setEditingId(null);
                    setNewEntry({
                      date: new Date().toISOString().split('T')[0],
                      mood: 'good',
                      title: '',
                      content: '',
                      tags: [],
                      gratitude: '',
                      challenges: '',
                      wins: ''
                    });
                  }}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Data</label>
                  <input
                    type="date"
                    value={newEntry.date}
                    onChange={(e) => setNewEntry({...newEntry, date: e.target.value})}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Como você se sente?</label>
                  <div className="flex gap-2">
                    {Object.entries(moodEmojis).map(([key, value]) => (
                      <button
                        key={key}
                        onClick={() => setNewEntry({...newEntry, mood: key as any})}
                        className={`flex-1 p-2 rounded-lg border-2 transition-all ${
                          newEntry.mood === key
                            ? 'border-purple-500 bg-purple-500/20'
                            : 'border-slate-700 hover:border-slate-600'
                        }`}
                        title={value.label}
                      >
                        <div className="text-2xl">{value.emoji}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-2 block">Título</label>
                <input
                  type="text"
                  value={newEntry.title}
                  onChange={(e) => setNewEntry({...newEntry, title: e.target.value})}
                  placeholder="Dê um título para esta entrada..."
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500"
                />
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-2 block">Como foi seu dia?</label>
                <textarea
                  value={newEntry.content}
                  onChange={(e) => setNewEntry({...newEntry, content: e.target.value})}
                  placeholder="Escreva sobre seu dia, sentimentos, desafios e vitórias..."
                  rows={6}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 resize-none"
                />
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-2 block">Pelo que você é grato hoje?</label>
                <textarea
                  value={newEntry.gratitude}
                  onChange={(e) => setNewEntry({...newEntry, gratitude: e.target.value})}
                  placeholder="Liste 3 coisas pelas quais você é grato..."
                  rows={3}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Desafios enfrentados</label>
                  <textarea
                    value={newEntry.challenges}
                    onChange={(e) => setNewEntry({...newEntry, challenges: e.target.value})}
                    placeholder="Quais foram os momentos difíceis?"
                    rows={3}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 resize-none"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Vitórias do dia</label>
                  <textarea
                    value={newEntry.wins}
                    onChange={(e) => setNewEntry({...newEntry, wins: e.target.value})}
                    placeholder="O que você conquistou hoje?"
                    rows={3}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSaveEntry}
                  disabled={!newEntry.title || !newEntry.content}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {editingId ? 'Atualizar' : 'Salvar'} Entrada
                </button>
              </div>
            </div>
          )}

          {/* Entries List */}
          <div className="space-y-4">
            {filteredEntries.length === 0 ? (
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-12 text-center">
                <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-400 mb-2">
                  {searchTerm || filterMood !== 'all' ? 'Nenhuma entrada encontrada' : 'Nenhuma entrada ainda'}
                </h3>
                <p className="text-slate-500">
                  {searchTerm || filterMood !== 'all' 
                    ? 'Tente ajustar os filtros de busca' 
                    : 'Comece a registrar sua jornada criando sua primeira entrada'}
                </p>
              </div>
            ) : (
              filteredEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 space-y-4 hover:bg-slate-800/70 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${moodEmojis[entry.mood].color} flex items-center justify-center text-3xl`}>
                        {moodEmojis[entry.mood].emoji}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{entry.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <Calendar className="w-4 h-4" />
                          {new Date(entry.date).toLocaleDateString('pt-BR', { 
                            day: '2-digit', 
                            month: 'long', 
                            year: 'numeric' 
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditEntry(entry)}
                        className="text-blue-400 hover:text-blue-300 p-2"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteEntry(entry.id)}
                        className="text-red-400 hover:text-red-300 p-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-slate-300 leading-relaxed">{entry.content}</p>

                  {entry.gratitude && (
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Heart className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-semibold text-green-400">Gratidão</span>
                      </div>
                      <p className="text-sm text-slate-300">{entry.gratitude}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {entry.challenges && (
                      <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-orange-400" />
                          <span className="text-sm font-semibold text-orange-400">Desafios</span>
                        </div>
                        <p className="text-sm text-slate-300">{entry.challenges}</p>
                      </div>
                    )}

                    {entry.wins && (
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-blue-400" />
                          <span className="text-sm font-semibold text-blue-400">Vitórias</span>
                        </div>
                        <p className="text-sm text-slate-300">{entry.wins}</p>
                      </div>
                    )}
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
