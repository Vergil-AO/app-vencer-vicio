'use client';

import Link from 'next/link';
import { Brain, User } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Imagem do Cérebro */}
            <div className="relative w-10 h-10 rounded-lg overflow-hidden border-2 border-blue-500/50 group-hover:border-blue-400 transition-all">
              <Image
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/56cc0e53-b85c-4184-b22b-c0e54bc94f9e.jpg"
                alt="Clear Mind Logo"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent" />
            </div>
            
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                {APP_NAME}
              </span>
              <span className="text-xs text-slate-400 -mt-1">Saia da Pornografia Agora</span>
            </div>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/#como-funciona" 
              className="text-slate-300 hover:text-white transition-colors"
            >
              Como Funciona
            </Link>
            <Link 
              href="/#estrategias" 
              className="text-slate-300 hover:text-white transition-colors"
            >
              Estratégias
            </Link>
            <Link 
              href="/pricing" 
              className="text-slate-300 hover:text-white transition-colors"
            >
              Planos
            </Link>
            <Link 
              href="/login"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Entrar
            </Link>
            <Link 
              href="/profile"
              className="text-slate-300 hover:text-white transition-colors flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              Perfil
            </Link>
            <Link 
              href="/dashboard"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all hover:scale-105 shadow-lg shadow-blue-500/20"
            >
              Dashboard
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Link 
              href="/profile"
              className="text-slate-300 p-2"
            >
              <User className="w-5 h-5" />
            </Link>
            <Link 
              href="/login"
              className="text-slate-300 text-sm"
            >
              Entrar
            </Link>
            <Link 
              href="/dashboard"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-lg font-semibold text-sm"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
