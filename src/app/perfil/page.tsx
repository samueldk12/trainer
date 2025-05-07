'use client';

import { useState } from 'react';
import { FaUser, FaEnvelope, FaSave, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import RequireAuth from '@/components/auth/RequireAuth';

export default function Perfil() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    nome: user?.nome || '',
    email: user?.email || '',
    altura: '',
    peso: '',
    objetivo: 'emagrecimento'
  });
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState<{tipo: 'sucesso' | 'erro', texto: string} | null>(null);

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Função para salvar o perfil
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSalvando(true);
      setMensagem(null);
      
      // Aqui você faria uma chamada à API para atualizar o perfil
      // Por enquanto, apenas simulamos o sucesso
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMensagem({
        tipo: 'sucesso',
        texto: 'Perfil atualizado com sucesso!'
      });
    } catch (erro: any) {
      setMensagem({
        tipo: 'erro',
        texto: erro.message || 'Erro ao atualizar perfil'
      });
    } finally {
      setSalvando(false);
    }
  };

  const conteudo = (
    <div className="max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Meu Perfil</h1>
        <Link 
          href="/" 
          className="text-gray-600 hover:text-gray-800 flex items-center"
        >
          <FaArrowLeft className="mr-2" /> Voltar
        </Link>
      </div>
      
      {mensagem && (
        <div 
          className={`${
            mensagem.tipo === 'sucesso' 
              ? 'bg-green-100 border-green-400 text-green-700' 
              : 'bg-red-100 border-red-400 text-red-700'
          } px-4 py-3 rounded relative mb-4`} 
          role="alert"
        >
          <span className="block sm:inline">{mensagem.texto}</span>
        </div>
      )}
      
      <div className="rounded-lg shadow-md p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-[var(--primary)] flex items-center justify-center text-white text-4xl mb-3">
            {user?.nome.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-xl font-semibold">{user?.nome}</h2>
          <p className="text-gray-500">{user?.email}</p>
        </div>
        
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
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md"
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md"
                  required
                  disabled
                />
              </div>
              <p className="text-xs text-gray-500">O email não pode ser alterado.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="altura" className="block text-sm font-medium text-gray-700">
                  Altura (cm)
                </label>
                <input
                  type="number"
                  id="altura"
                  name="altura"
                  value={formData.altura}
                  onChange={handleChange}
                  className="px-3 py-2 w-full border border-gray-300 rounded-md"
                  placeholder="175"
                  min="100"
                  max="250"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="peso" className="block text-sm font-medium text-gray-700">
                  Peso (kg)
                </label>
                <input
                  type="number"
                  id="peso"
                  name="peso"
                  value={formData.peso}
                  onChange={handleChange}
                  className="px-3 py-2 w-full border border-gray-300 rounded-md"
                  placeholder="70"
                  min="30"
                  max="300"
                  step="0.1"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="objetivo" className="block text-sm font-medium text-gray-700">
                Objetivo principal
              </label>
              <select
                id="objetivo"
                name="objetivo"
                value={formData.objetivo}
                onChange={handleChange}
                className="px-3 py-2 w-full border border-gray-300 rounded-md"
              >
                <option value="emagrecimento">Emagrecimento</option>
                <option value="hipertrofia">Ganho de massa muscular</option>
                <option value="resistencia">Melhorar resistência</option>
                <option value="saude">Saúde e bem-estar</option>
              </select>
            </div>
            
            <button
              type="submit"
              disabled={salvando}
              className="w-full bg-[var(--primary)] text-white py-2 px-4 rounded-md flex items-center justify-center disabled:opacity-50"
            >
              {salvando ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mr-2"></div>
                  <span>Salvando...</span>
                </>
              ) : (
                <>
                  <FaSave className="mr-2" /> Salvar alterações
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
  return <RequireAuth>{conteudo}</RequireAuth>;
} 