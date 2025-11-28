'use client';

import { useState } from 'react';
import { 
  User, 
  Calendar, 
  Target, 
  Award, 
  TrendingUp,
  BookOpen,
  Heart,
  Edit,
  Save,
  Camera,
  Mail,
  Phone,
  MapPin,
  Shield,
  Clock,
  CheckCircle
} from 'lucide-react';
import Navbar from '@/components/custom/navbar';
import Link from 'next/link';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '+55 11 98765-4321',
    location: 'São Paulo, SP',
    joinDate: '15 de Janeiro, 2024',
    bio: 'Em busca de uma vida mais saudável e equilibrada. Cada dia é uma nova oportunidade de crescimento.',
    avatar: 'JS'
  });

  const stats = {
    cleanDays: 45,
    totalStrategies: 24,
    completedGoals: 156,
    journalEntries: 38,
    reflections: 42,
    communityPosts: 12,
    badges: 8
  };

  const recentAchievements = [
    { id: 1, title: '30 Dias Limpo', badge: '🏆', date: '15 dias atrás', color: 'from-yellow-500 to-orange-500' },
    { id: 2, title: 'Primeira Semana', badge: '⭐', date: '38 dias atrás', color: 'from-blue-500 to-cyan-500' },
    { id: 3, title: 'Guerreiro Iniciante', badge: '🛡️', date: '45 dias atrás', color: 'from-green-500 to-emerald-500' },
  ];

  const weeklyProgress = [
    { day: 'Seg', completed: 8, total: 10 },
    { day: 'Ter', completed: 10, total: 10 },
    { day: 'Qua', completed: 7, total: 10 },
    { day: 'Qui', completed: 9, total: 10 },
    { day: 'Sex', completed: 10, total: 10 },
    { day: 'Sáb', completed: 6, total: 10 },
    { day: 'Dom', completed: 8, total: 10 },
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Aqui você salvaria os dados no backend
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              Meu Perfil
            </h1>
            <p className="text-xl text-slate-400">
              Acompanhe sua jornada e evolução
            </p>
          </div>

          {/* Profile Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 space-y-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Avatar Section */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-4xl font-bold">
                    {profile.avatar}
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors">
                      <Camera className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{stats.cleanDays}</div>
                  <div className="text-sm text-slate-400">Dias Limpos</div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold text-white">{profile.name}</h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      Editar
                    </button>
                  ) : (
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      Salvar
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-slate-300">
                    <Mail className="w-5 h-5 text-blue-400" />
                    {isEditing ? (
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                        className="bg-slate-900/50 border border-slate-700 rounded px-3 py-1 text-white flex-1"
                      />
                    ) : (
                      <span>{profile.email}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-slate-300">
                    <Phone className="w-5 h-5 text-blue-400" />
                    {isEditing ? (
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                        className="bg-slate-900/50 border border-slate-700 rounded px-3 py-1 text-white flex-1"
                      />
                    ) : (
                      <span>{profile.phone}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-slate-300">
                    <MapPin className="w-5 h-5 text-blue-400" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.location}
                        onChange={(e) => setProfile({...profile, location: e.target.value})}
                        className="bg-slate-900/50 border border-slate-700 rounded px-3 py-1 text-white flex-1"
                      />
                    ) : (
                      <span>{profile.location}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-slate-300">
                    <Calendar className="w-5 h-5 text-blue-400" />
                    <span>Membro desde {profile.joinDate}</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Sobre mim</label>
                  {isEditing ? (
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                      rows={3}
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white resize-none"
                    />
                  ) : (
                    <p className="text-slate-300">{profile.bio}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 text-center space-y-2">
              <Shield className="w-8 h-8 text-blue-400 mx-auto" />
              <div className="text-2xl font-bold text-white">{stats.totalStrategies}</div>
              <div className="text-sm text-slate-400">Estratégias Aplicadas</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 text-center space-y-2">
              <Target className="w-8 h-8 text-green-400 mx-auto" />
              <div className="text-2xl font-bold text-white">{stats.completedGoals}</div>
              <div className="text-sm text-slate-400">Metas Cumpridas</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 text-center space-y-2">
              <BookOpen className="w-8 h-8 text-purple-400 mx-auto" />
              <div className="text-2xl font-bold text-white">{stats.journalEntries}</div>
              <div className="text-sm text-slate-400">Entradas no Diário</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 text-center space-y-2">
              <Heart className="w-8 h-8 text-pink-400 mx-auto" />
              <div className="text-2xl font-bold text-white">{stats.reflections}</div>
              <div className="text-sm text-slate-400">Reflexões</div>
            </div>
          </div>

          {/* Weekly Progress */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Progresso Semanal</h2>
              <Clock className="w-6 h-6 text-blue-400" />
            </div>
            <div className="grid grid-cols-7 gap-2">
              {weeklyProgress.map((day) => (
                <div key={day.day} className="text-center space-y-2">
                  <div className="text-xs text-slate-400 font-semibold">{day.day}</div>
                  <div className="bg-slate-900/50 rounded-lg p-2 space-y-1">
                    <div className="h-20 bg-slate-800 rounded relative overflow-hidden">
                      <div 
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500 to-cyan-500 transition-all"
                        style={{ height: `${(day.completed / day.total) * 100}%` }}
                      />
                    </div>
                    <div className="text-xs text-slate-400">
                      {day.completed}/{day.total}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Conquistas Recentes</h2>
              <Award className="w-6 h-6 text-yellow-400" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`bg-gradient-to-br ${achievement.color} rounded-xl p-6 text-center space-y-3`}
                >
                  <div className="text-5xl">{achievement.badge}</div>
                  <h3 className="text-xl font-bold text-white">{achievement.title}</h3>
                  <p className="text-sm text-white/80">{achievement.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/journal"
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/70 transition-all group"
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
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/70 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Heart className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Reflexões</h3>
                  <p className="text-sm text-slate-400">Suas reflexões diárias</p>
                </div>
              </div>
            </Link>

            <Link
              href="/goals"
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/70 transition-all group"
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
      </div>
    </div>
  );
}
