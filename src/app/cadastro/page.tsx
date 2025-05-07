'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import Link from 'next/link';
import { FaUser, FaLock, FaEnvelope, FaArrowRight } from 'react-icons/fa';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [senhaErro, setSenhaErro] = useState('');
  const { register, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificar se as senhas coincidem
    if (senha !== confirmarSenha) {
      setSenhaErro('As senhas não coincidem');
      return;
    }
    
    // Limpar erro anterior
    setSenhaErro('');
    
    // Chamar função de registro
    await register(nome, email, senha);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Crie sua conta</h1>
        <p className="text-gray-600">Preencha os dados abaixo para começar</p>
      </div>

      {(error || senhaErro) && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error || senhaErro}</span>
        </div>
      )}

      <div className="rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                Nome completo
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md"
                  placeholder="Seu nome completo"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  id="senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
              <p className="text-xs text-gray-500">
                A senha deve ter pelo menos 6 caracteres
              </p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="confirmarSenha" className="block text-sm font-medium text-gray-700">
                Confirmar Senha
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  id="confirmarSenha"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--primary)] text-white py-2 px-4 rounded-md flex items-center justify-center disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mr-2"></div>
                  <span>Processando...</span>
                </>
              ) : (
                <>
                  <span>Criar conta</span>
                  <FaArrowRight className="ml-2" />
                </>
              )}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Já tem uma conta?{' '}
            <Link href="/login" className="text-[var(--primary)] hover:underline">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 