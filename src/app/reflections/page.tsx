'use client';

import { useState } from 'react';
import { 
  Heart, 
  Plus, 
  Calendar, 
  Search,
  Lightbulb,
  TrendingUp,
  MessageCircle,
  Edit,
  Trash2,
  Save,
  X,
  Star,
  Sparkles
} from 'lucide-react';
import Navbar from '@/components/custom/navbar';

interface Reflection {
  id: string;
  date: string;
  category: 'insight' | 'learning' | 'gratitude' | 'challenge' | 'growth';
  title: string;
  content: string;
  mood: number; // 1-5
  tags: string[];
  isFavorite: boolean;
}

export default function ReflectionsPage() {
  const [reflections, setReflections] = useState<Reflection[]>([
    {
      id: '1',
      date: '2024-01-20',
      category: 'insight',
      title: 'Descobri meu gatilho principal',
      content: 'Percebi que o tédio é meu maior gatilho. Quando não tenho nada produtivo para fazer, a tentação aumenta. Preciso manter minha mente ocupada com atividades significativas.',
      mood: 4,
      tags: ['autoconhecimento', 'gatilhos'],
      isFavorite: true
    },
    {
      id: '2',
      date: '2024-01-19',
      category: 'learning',
      title: 'A importância da rotina matinal',
      content: 'Aprendi que começar o dia com meditação e exercícios faz toda a diferença. Quando acordo e já faço algo produtivo, o resto do dia flui melhor.',
      mood: 5,
      tags: ['rotina', 'disciplina'],
      isFavorite: false
    },
    {
      id: '3',
      date: '2024-01-18',
      category: 'gratitude',
      title: 'Grato pelo apoio da comunidade',
      content: 'Hoje recebi mensagens incríveis de apoio. Não estou sozinho nessa jornada. Ter pessoas que entendem o que estou passando faz toda a diferença.',
      mood: 5,
      tags: ['comunidade', 'apoio'],
      isFavorite: true
    }
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const [newReflection, setNewReflection] = useState<Partial<Reflection>>({
    date: new Date().toISOString().split('T')[0],
    category: 'insight',
    title: '',
    content: '',
    mood: 3,
    tags: [],
    isFavorite: false
  });

  const categories = {
    insight: { icon: '💡', label: 'Insight', color: 'from-yellow-500 to-orange-500' },
    learning: { icon: '📚', label: 'Aprendizado', color: 'from-blue-500 to-cyan-500' },
    gratitude: { icon: '🙏', label: 'Gratidão', color: 'from-green-500 to-emerald-500' },
    challenge: { icon: '⚡', label: 'Desafio', color: 'from-orange-500 to-red-500' },
    growth: { icon: '🌱', label: 'Crescimento', color: 'from-purple-500 to-pink-500' }
  };

  const handleSaveReflection = () => {
    if (editingId) {
      setReflections(reflections.map(r => r.id === editingId ? { ...newReflection, id: editingId } as Reflection : r));
      setEditingId(null);
    } else {
      const reflection: Reflection = {
        ...newReflection,
        id: Date.now().toString(),
      } as Reflection;
      setReflections([reflection, ...reflections]);
    }
    setNewReflection({
      date: new Date().toISOString().split('T')[0],
      category: 'insight',
      title: '',
      content: '',
      mood: 3,
      tags: [],
      isFavorite: false
    });
    setIsCreating(false);
  };

  const handleEditReflection = (reflection: Reflection) => {
    setNewReflection(reflection);
    setEditingId(reflection.id);
    setIsCreating(true);
  };

  const handleDeleteReflection = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta reflexão?')) {
      setReflections(reflections.filter(r => r.id !== id));
    }
  };

  const toggleFavorite = (id: string) => {
    setReflections(reflections.map(r => 
      r.id === id ? { ...r, isFavorite: !r.isFavorite } : r
    ));
  };

  const filteredReflections = reflections.filter(reflection => {
    const matchesSearch = reflection.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reflection.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || reflection.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const favoriteReflections = reflections.filter(r => r.isFavorite);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Heart className="w-12 h-12 text-pink-400" />
              <h1 className="text-4xl sm:text-5xl font-bold text-white">
                Minhas Reflexões
              </h1>
            </div>
            <p className="text-xl text-slate-400">
              Insights, aprendizados e momentos de crescimento pessoal
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">{reflections.length}</div>
              <div className="text-sm text-slate-400">Reflexões</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">{favoriteReflections.length}</div>
              <div className="text-sm text-slate-400">Favoritas</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">
                {reflections.length > 0 ? (reflections.reduce((acc, r) => acc + r.mood, 0) / reflections.length).toFixed(1) : 0}
              </div>
              <div className="text-sm text-slate-400">Humor Médio</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">{Math.floor(reflections.length / 7)}</div>
              <div className="text-sm text-slate-400">Semanas</div>
            </div>
          </div>

          {/* Prompts de Reflexão */}
          <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-bold text-white">Prompts para Reflexão</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-slate-900/50 rounded-lg p-4">
                <p className="text-slate-300 text-sm">💭 O que aprendi sobre mim hoje?</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4">
                <p className="text-slate-300 text-sm">🎯 Qual foi minha maior vitória hoje?</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4">
                <p className="text-slate-300 text-sm">🌟 Como posso melhorar amanhã?</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4">
                <p className="text-slate-300 text-sm">💪 Que desafio superei recentemente?</p>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar reflexões..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500"
              >
                <option value="all">Todas Categorias</option>
                {Object.entries(categories).map(([key, value]) => (
                  <option key={key} value={key}>{value.icon} {value.label}</option>
                ))}
              </select>
              <button
                onClick={() => setIsCreating(true)}
                className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-pink-700 hover:to-purple-700 transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Nova Reflexão
              </button>
            </div>
          </div>

          {/* Create/Edit Form */}
          {isCreating && (
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  {editingId ? 'Editar Reflexão' : 'Nova Reflexão'}
                </h2>
                <button
                  onClick={() => {
                    setIsCreating(false);
                    setEditingId(null);
                    setNewReflection({
                      date: new Date().toISOString().split('T')[0],
                      category: 'insight',
                      title: '',
                      content: '',
                      mood: 3,
                      tags: [],
                      isFavorite: false
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
                    value={newReflection.date}
                    onChange={(e) => setNewReflection({...newReflection, date: e.target.value})}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Categoria</label>
                  <select
                    value={newReflection.category}
                    onChange={(e) => setNewReflection({...newReflection, category: e.target.value as any})}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white"
                  >
                    {Object.entries(categories).map(([key, value]) => (
                      <option key={key} value={key}>{value.icon} {value.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-2 block">Como você se sente? (1-5)</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      onClick={() => setNewReflection({...newReflection, mood: level})}
                      className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                        newReflection.mood === level
                          ? 'border-pink-500 bg-pink-500/20'
                          : 'border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <div className="text-2xl">
                        {level === 1 ? '😢' : level === 2 ? '😟' : level === 3 ? '😐' : level === 4 ? '🙂' : '😄'}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">{level}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-2 block">Título</label>
                <input
                  type="text"
                  value={newReflection.title}
                  onChange={(e) => setNewReflection({...newReflection, title: e.target.value})}
                  placeholder="Dê um título para sua reflexão..."
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500"
                />
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-2 block">Reflexão</label>
                <textarea
                  value={newReflection.content}
                  onChange={(e) => setNewReflection({...newReflection, content: e.target.value})}
                  placeholder="Escreva sua reflexão, insight ou aprendizado..."
                  rows={8}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 resize-none"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="favorite"
                  checked={newReflection.isFavorite}
                  onChange={(e) => setNewReflection({...newReflection, isFavorite: e.target.checked})}
                  className="w-5 h-5 rounded border-slate-700 bg-slate-900/50"
                />
                <label htmlFor="favorite" className="text-slate-300 flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  Marcar como favorita
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSaveReflection}
                  disabled={!newReflection.title || !newReflection.content}
                  className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-pink-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {editingId ? 'Atualizar' : 'Salvar'} Reflexão
                </button>
              </div>
            </div>
          )}

          {/* Favorites Section */}
          {favoriteReflections.length > 0 && !isCreating && (
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Star className="w-6 h-6 text-yellow-400" />
                <h2 className="text-2xl font-bold text-white">Reflexões Favoritas</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {favoriteReflections.slice(0, 4).map((reflection) => (
                  <div
                    key={reflection.id}
                    className={`bg-gradient-to-br ${categories[reflection.category].color} rounded-xl p-4 cursor-pointer hover:scale-105 transition-transform`}
                    onClick={() => handleEditReflection(reflection)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-3xl">{categories[reflection.category].icon}</span>
                      <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                    </div>
                    <h3 className="font-bold text-white mb-1">{reflection.title}</h3>
                    <p className="text-sm text-white/80 line-clamp-2">{reflection.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reflections List */}
          <div className="space-y-4">
            {filteredReflections.length === 0 ? (
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-12 text-center">
                <Heart className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-400 mb-2">
                  {searchTerm || filterCategory !== 'all' ? 'Nenhuma reflexão encontrada' : 'Nenhuma reflexão ainda'}
                </h3>
                <p className="text-slate-500">
                  {searchTerm || filterCategory !== 'all' 
                    ? 'Tente ajustar os filtros de busca' 
                    : 'Comece a registrar seus insights e aprendizados'}
                </p>
              </div>
            ) : (
              filteredReflections.map((reflection) => (
                <div
                  key={reflection.id}
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 space-y-4 hover:bg-slate-800/70 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${categories[reflection.category].color} flex items-center justify-center text-3xl`}>
                        {categories[reflection.category].icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold text-white">{reflection.title}</h3>
                          {reflection.isFavorite && (
                            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(reflection.date).toLocaleDateString('pt-BR', { 
                              day: '2-digit', 
                              month: 'long', 
                              year: 'numeric' 
                            })}
                          </div>
                          <span className="px-2 py-1 bg-slate-700 rounded-full text-xs">
                            {categories[reflection.category].label}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleFavorite(reflection.id)}
                        className={`p-2 ${reflection.isFavorite ? 'text-yellow-400' : 'text-slate-400 hover:text-yellow-400'}`}
                      >
                        <Star className={`w-5 h-5 ${reflection.isFavorite ? 'fill-yellow-400' : ''}`} />
                      </button>
                      <button
                        onClick={() => handleEditReflection(reflection)}
                        className="text-blue-400 hover:text-blue-300 p-2"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteReflection(reflection.id)}
                        className="text-red-400 hover:text-red-300 p-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-slate-300 leading-relaxed">{reflection.content}</p>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-400">Humor:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`w-2 h-2 rounded-full ${
                            level <= reflection.mood ? 'bg-pink-500' : 'bg-slate-700'
                          }`}
                        />
                      ))}
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
