'use client';

import { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Plus,
  Search,
  Filter,
  Heart,
  MessageCircle,
  Share2,
  Award,
  Clock
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/custom/navbar';
import { ADDICTION_TYPES } from '@/lib/constants';

interface Post {
  id: string;
  author: string;
  avatar: string;
  cleanDays: number;
  content: string;
  likes: number;
  comments: number;
  timestamp: string;
  addiction: string;
}

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    author: 'Marcos Silva',
    avatar: 'M',
    cleanDays: 30,
    content: 'Hoje completei 30 dias! Nunca pensei que conseguiria. A meditação matinal tem sido fundamental. Obrigado a todos pelo apoio! 💪',
    likes: 47,
    comments: 12,
    timestamp: '2h atrás',
    addiction: 'porn'
  },
  {
    id: '2',
    author: 'Rafael Costa',
    avatar: 'R',
    cleanDays: 90,
    content: '90 dias! Minha vida mudou completamente. Relacionamentos melhores, mais energia, foco no trabalho. Para quem está começando: vale MUITO a pena. Não desistam! 🔥',
    likes: 128,
    comments: 34,
    timestamp: '5h atrás',
    addiction: 'porn'
  },
  {
    id: '3',
    author: 'Lucas Mendes',
    avatar: 'L',
    cleanDays: 7,
    content: 'Primeira semana completa! Os primeiros dias foram difíceis, mas estou sentindo a diferença. Exercícios físicos ajudaram muito. Vamos juntos! 💪',
    likes: 23,
    comments: 8,
    timestamp: '1d atrás',
    addiction: 'porn'
  },
  {
    id: '4',
    author: 'Pedro Oliveira',
    avatar: 'P',
    cleanDays: 180,
    content: 'Seis meses sem redes sociais! Minha produtividade triplicou. Estou lendo mais, aprendendo coisas novas. A vida real é muito melhor que a virtual.',
    likes: 89,
    comments: 21,
    timestamp: '3h atrás',
    addiction: 'social'
  },
  {
    id: '5',
    author: 'André Santos',
    avatar: 'A',
    cleanDays: 45,
    content: 'Parei de jogar há 45 dias. Consegui um emprego melhor, voltei a estudar e estou mais presente com minha família. Melhor decisão da minha vida!',
    likes: 56,
    comments: 15,
    timestamp: '6h atrás',
    addiction: 'gaming'
  },
  {
    id: '6',
    author: 'Carlos Ferreira',
    avatar: 'C',
    cleanDays: 14,
    content: 'Duas semanas sem apostar. Já economizei mais de R$2000. Estou pagando minhas dívidas e me sentindo no controle da minha vida financeira pela primeira vez.',
    likes: 67,
    comments: 19,
    timestamp: '8h atrás',
    addiction: 'gambling'
  }
];

export default function CommunitiesPage() {
  const [selectedAddiction, setSelectedAddiction] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [newPost, setNewPost] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);

  const filteredPosts = MOCK_POSTS.filter(post => {
    const matchesAddiction = selectedAddiction === 'all' || post.addiction === selectedAddiction;
    const matchesSearch = post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesAddiction && matchesSearch;
  });

  const handleSubmitPost = () => {
    if (newPost.trim()) {
      // Aqui você adicionaria a lógica para salvar o post
      setNewPost('');
      setShowNewPost(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              Comunidades de Apoio
            </h1>
            <p className="text-xl text-slate-400">
              Compartilhe sua jornada, inspire outros e receba apoio
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 text-center">
              <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white">10,247</div>
              <div className="text-sm text-slate-400">Membros Ativos</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 text-center">
              <MessageSquare className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white">1,523</div>
              <div className="text-sm text-slate-400">Posts Hoje</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 text-center">
              <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white">87%</div>
              <div className="text-sm text-slate-400">Taxa de Sucesso</div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar posts..."
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Addiction Type Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedAddiction('all')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedAddiction === 'all'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                    : 'bg-slate-900/50 text-slate-400 hover:text-white border border-slate-700'
                }`}
              >
                Todos
              </button>
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
          </div>

          {/* New Post Button */}
          {!showNewPost && (
            <button
              onClick={() => setShowNewPost(true)}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-xl font-bold hover:from-blue-700 hover:to-cyan-700 transition-all hover:scale-105 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Compartilhar Minha Evolução
            </button>
          )}

          {/* New Post Form */}
          {showNewPost && (
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 space-y-4">
              <h3 className="text-xl font-bold text-white">Compartilhe sua história</h3>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Como está sua jornada? Compartilhe suas vitórias, desafios e aprendizados..."
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 min-h-[120px] resize-none"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSubmitPost}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all"
                >
                  Publicar
                </button>
                <button
                  onClick={() => {
                    setShowNewPost(false);
                    setNewPost('');
                  }}
                  className="px-6 bg-slate-700 text-white py-3 rounded-lg font-semibold hover:bg-slate-600 transition-all"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* Posts Feed */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 space-y-4 hover:border-slate-600 transition-all"
              >
                {/* Post Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                      {post.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{post.author}</span>
                        {post.cleanDays >= 90 && (
                          <Award className="w-4 h-4 text-yellow-400" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-semibold">
                          {post.cleanDays} dias limpo
                        </span>
                        <span>•</span>
                        <Clock className="w-3 h-3" />
                        <span>{post.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <p className="text-slate-300 leading-relaxed">{post.content}</p>

                {/* Post Actions */}
                <div className="flex items-center gap-6 pt-2 border-t border-slate-700">
                  <button className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors">
                    <Heart className="w-5 h-5" />
                    <span className="font-semibold">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-semibold">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 text-slate-400 hover:text-green-400 transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span className="font-semibold">Compartilhar</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <button className="w-full bg-slate-800/50 border border-slate-700 text-white py-3 rounded-xl font-semibold hover:bg-slate-800 transition-all">
            Carregar Mais Posts
          </button>
        </div>
      </div>
    </div>
  );
}