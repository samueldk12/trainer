'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaSearch, FaFilter, FaDumbbell } from 'react-icons/fa';
import Link from 'next/link';
import ExercicioCard from '@/components/ExercicioCard';
import RequireAuth from '@/components/auth/RequireAuth';
import { motion } from 'framer-motion';

// Interface para o objeto de exercício
interface Exercicio {
  id: string;
  nome: string;
  descricao?: string;
  tipoExercicio: string;
  caloriasPorMinuto?: number;
  imagem?: string;
  isPublico?: boolean;
}

export default function Exercicios() {
  const [exercicios, setExercicios] = useState<Exercicio[]>([]);
  const [filtro, setFiltro] = useState<string>('');
  const [tipoSelecionado, setTipoSelecionado] = useState<string>('');
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);
  const [view, setView] = useState<'grid' | 'list'>('grid');

  // Tipos de exercícios disponíveis
  const tiposExercicio = [
    { valor: '', label: 'Todos' },
    { valor: 'cardio', label: 'Cardio' },
    { valor: 'força', label: 'Força' },
    { valor: 'flexibilidade', label: 'Flexibilidade' },
    { valor: 'equilíbrio', label: 'Equilíbrio' },
    { valor: 'abdominal', label: 'Abdominal' },
  ];
  
  // Buscar exercícios da API
  useEffect(() => {
    async function carregarExercicios() {
      try {
        setCarregando(true);
        setErro(null);
        
        const resposta = await fetch('/api/exercicios');
        
        if (!resposta.ok) {
          throw new Error('Falha ao carregar exercícios');
        }
        
        const dados = await resposta.json();
        setExercicios(dados);
      } catch (erro) {
        console.error('Erro ao carregar exercícios:', erro);
        setErro('Não foi possível carregar os exercícios. Tente novamente.');
      } finally {
        setCarregando(false);
      }
    }
    
    carregarExercicios();
  }, []);
  
  // Filtrar exercícios com base no texto e no tipo selecionado
  const exerciciosFiltrados = exercicios.filter((exercicio) => {
    const correspondeAoTexto = exercicio.nome.toLowerCase().includes(filtro.toLowerCase()) || 
                              (exercicio.descricao?.toLowerCase().includes(filtro.toLowerCase()) || false);
    const correspondeAoTipo = tipoSelecionado === '' || exercicio.tipoExercicio === tipoSelecionado;
    
    return correspondeAoTexto && correspondeAoTipo;
  });

  // Verifica se o exercício pode ser excluído pelo usuário atual
  const podeExcluir = (exercicio: Exercicio) => {
    // Se o ID começar com "padrao-" ou for um exercício público, não pode excluir
    return !exercicio.id.startsWith('padrao-') && !exercicio.isPublico;
  };
  
  // Função para excluir um exercício
  const excluirExercicio = async (id: string) => {
    const exercicio = exercicios.find(ex => ex.id === id);
    
    if (!exercicio || !podeExcluir(exercicio)) {
      alert('Você não pode excluir exercícios padrão do sistema.');
      return;
    }
    
    if (window.confirm('Tem certeza que deseja excluir este exercício?')) {
      try {
        const resposta = await fetch(`/api/exercicios/${id}`, {
          method: 'DELETE'
        });
        
        if (!resposta.ok) {
          const erro = await resposta.json();
          throw new Error(erro.error || 'Falha ao excluir exercício');
        }
        
        // Atualizamos a lista removendo o exercício excluído
        setExercicios(exercicios.filter(ex => ex.id !== id));
      } catch (erro: any) {
        alert(erro.message);
      }
    }
  };

  // Animações para os cartões
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };
  
  const conteudo = (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaDumbbell className="mr-2 text-[var(--primary)]" /> Exercícios
        </h1>
        <Link 
          href="/exercicios/novo" 
          className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-4 py-2 rounded-md flex items-center transition-all duration-300 transform hover:scale-105"
        >
          <FaPlus className="mr-2" /> Novo Exercício
        </Link>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="rounded-lg shadow-md bg-white dark:bg-gray-800 p-4 mb-6"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar exercícios..."
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md w-full bg-white dark:bg-gray-700 transition-all focus:ring-2 focus:ring-[var(--primary-light)] focus:border-[var(--primary)]"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 transition-all focus:ring-2 focus:ring-[var(--primary-light)] focus:border-[var(--primary)]"
              value={tipoSelecionado}
              onChange={(e) => setTipoSelecionado(e.target.value)}
            >
              {tiposExercicio.map((tipo) => (
                <option key={tipo.valor} value={tipo.valor}>
                  {tipo.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setView('grid')}
              className={`p-2 rounded-md ${view === 'grid' ? 'bg-[var(--primary-light)] text-[var(--primary)]' : 'bg-gray-100 dark:bg-gray-700'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded-md ${view === 'list' ? 'bg-[var(--primary-light)] text-[var(--primary)]' : 'bg-gray-100 dark:bg-gray-700'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
      
      {carregando ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[var(--primary)]"></div>
        </div>
      ) : erro ? (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md relative" 
          role="alert"
        >
          <span className="block sm:inline">{erro}</span>
        </motion.div>
      ) : exerciciosFiltrados.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm"
        >
          <FaSearch className="mx-auto text-4xl text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">Nenhum exercício encontrado</p>
          <p className="text-gray-400 text-sm mt-2">Tente ajustar seus filtros ou criar um novo exercício</p>
        </motion.div>
      ) : (
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className={view === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "flex flex-col gap-4"
          }
        >
          {exerciciosFiltrados.map((exercicio) => (
            <motion.div 
              key={exercicio.id} 
              variants={item}
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <ExercicioCard
                exercicio={exercicio}
                editarUrl={`/exercicios/${exercicio.id}`}
                onExcluir={podeExcluir(exercicio) ? () => excluirExercicio(exercicio.id) : undefined}
                isPublico={exercicio.isPublico || exercicio.id.startsWith('padrao-')}
                view={view}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
  
  return <RequireAuth>{conteudo}</RequireAuth>;
} 