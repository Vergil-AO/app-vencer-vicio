'use client';

import { useState } from 'react';
import { Brain, Mail, Lock, User, ArrowRight, Shield, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { APP_NAME, APP_TAGLINE } from '@/lib/constants';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        // Login
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        if (data.user) {
          router.push('/dashboard');
        }
      } else {
        // Cadastro
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.name,
            }
          }
        });

        if (error) throw error;

        if (data.user) {
          // Criar perfil inicial
          const { error: profileError } = await supabase
            .from('profiles')
            .insert([
              {
                id: data.user.id,
                full_name: formData.name,
                clean_since: new Date().toISOString().split('T')[0],
                total_days_clean: 0,
                current_streak: 0,
                longest_streak: 0,
              }
            ]);

          if (profileError) console.error('Erro ao criar perfil:', profileError);

          router.push('/dashboard');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center space-y-4">
          <Link href="/" className="inline-flex flex-col items-center gap-3 group">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-4 border-blue-500 shadow-2xl shadow-blue-500/50">
              <Image
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/56cc0e53-b85c-4184-b22b-c0e54bc94f9e.jpg"
                alt="Clear Mind Logo"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent" />
            </div>
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-white">{APP_NAME}</h1>
              <p className="text-sm text-red-400 font-semibold">{APP_TAGLINE}</p>
            </div>
          </Link>
        </div>

        {/* Form Card */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 space-y-6">
          {/* Toggle Login/Cadastro */}
          <div className="flex gap-2 bg-slate-900/50 rounded-lg p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                isLogin
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Entrar
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                !isLogin
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Cadastrar
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Seu nome"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span>Lembrar de mim</span>
                </label>
                <a href="#" className="text-blue-400 hover:text-blue-300">
                  Esqueceu a senha?
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-lg font-bold hover:from-blue-700 hover:to-cyan-700 transition-all hover:scale-105 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  {isLogin ? 'Entrar' : 'Criar Conta'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Privacy Notice */}
          <div className="flex items-start gap-2 text-xs text-slate-400 bg-slate-900/50 rounded-lg p-3">
            <Shield className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
            <p>
              Seus dados são 100% privados e criptografados. Nunca compartilhamos suas informações.
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link href="/" className="text-slate-400 hover:text-white transition-colors text-sm">
            ← Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
}
