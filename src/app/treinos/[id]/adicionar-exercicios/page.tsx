'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { FaArrowLeft, FaPlus, FaFilter, FaSearch, FaDumbbell, FaCheck } from 'react-icons/fa';
import ExercicioCard from '@/components/ExercicioCard';
import { motion, AnimatePresence } from 'framer-motion';

interface Exercicio {
  id: string;
  nome: string;
  descricao?: string | null;
  tipoExercicio: string;
  caloriasPorMinuto?: number | null;
  imagem?: string | null;
  nivelForca?: number | null;
  isPublico?: boolean;
}

interface Treino {
  id: string;
  nome: string;
  descricao: string | null;
  nivelDificuldade: string;
  exercicios: Exercicio[];
}

export default function AdicionarExerciciosPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const treinoId = params.id;
  
  const [treino, setTreino] = useState<Treino | null>(null);
  const [exercicios, setExercicios] = useState<Exercicio[]>([]);
  const [exerciciosSelecionados, setExerciciosSelecionados] = useState<Exercicio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdicionando, setIsAdicionando] = useState(false);
  const [error, setError] = useState('');
  const [sucesso, setSucesso] = useState(false);
  const [filtro, setFiltro] = useState('');
  const [tipoSelecionado, setTipoSelecionado] = useState('');
  
  // Tipos de exercícios disponíveis
  const tiposExercicio = [
    { valor: '', label: 'Todos' },
    { valor: 'cardio', label: 'Cardio' },
    { valor: 'força', label: 'Força' },
    { valor: 'flexibilidade', label: 'Flexibilidade' },
    { valor: 'equilíbrio', label: 'Equilíbrio' },
    { valor: 'abdominal', label: 'Abdominal' },
  ];
  
  // Buscar detalhes do treino
  useEffect(() => {
    async function carregarTreino() {
      try {
        const response = await fetch(`/api/treinos/${treinoId}`);
        
        if (!response.ok) {
          throw new Error('Erro ao carregar treino');
        }
        
        const data = await response.json();
        setTreino(data);
      } catch (error) {
        console.error('Erro ao carregar treino:', error);
        setError('Falha ao carregar dados do treino');
      }
    }
    
    carregarTreino();
  }, [treinoId]);
  
  // Buscar exercícios disponíveis
  useEffect(() => {
    async function carregarExercicios() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/exercicios');
        
        if (!response.ok) {
          throw new Error('Erro ao carregar exercícios');
        }
        
        const data = await response.json();
        setExercicios(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao carregar exercícios:', error);
        setError('Falha ao carregar exercícios');
        setIsLoading(false);
      }
    }
    
    carregarExercicios();
  }, []);
  
  // Filtrar exercícios com base no texto e no tipo selecionado
  const exerciciosFiltrados = exercicios.filter((exercicio) => {
    const correspondeAoTexto = exercicio.nome.toLowerCase().includes(filtro.toLowerCase()) || 
                              (exercicio.descricao?.toLowerCase().includes(filtro.toLowerCase()) || false);
    const correspondeAoTipo = tipoSelecionado === '' || exercicio.tipoExercicio === tipoSelecionado;
    
    // Removemos exercícios que já fazem parte do treino
    const jaNoTreino = treino?.exercicios.some(e => e.id === exercicio.id);
    
    return correspondeAoTexto && correspondeAoTipo && !jaNoTreino;
  });

  // Alternar a seleção de um exercício
  const toggleExercicioSelecionado = (exercicio: Exercicio) => {
    if (exerciciosSelecionados.some(e => e.id === exercicio.id)) {
      setExerciciosSelecionados(exerciciosSelecionados.filter(e => e.id !== exercicio.id));
    } else {
      setExerciciosSelecionados([...exerciciosSelecionados, exercicio]);
    }
  };
  
  // Verificar se um exercício está selecionado
  const isExercicioSelecionado = (id: string) => {
    return exerciciosSelecionados.some(e => e.id === id);
  };
  
  // Adicionar exercícios selecionados ao treino
  const adicionarExerciciosAoTreino = async () => {
    if (exerciciosSelecionados.length === 0) {
      setError('Selecione pelo menos um exercício para adicionar ao treino');
      return;
    }
    
    setIsAdicionando(true);
    setError('');
    
    try {
      const response = await fetch(`/api/treinos/${treinoId}/exercicios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          exercicios: exerciciosSelecionados
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao adicionar exercícios ao treino');
      }
      
      const data = await response.json();
      
      // Mostra mensagem de sucesso
      setSucesso(true);
      
      // Redireciona para a página do treino após um breve delay
      setTimeout(() => {
        router.push(`/treinos/${treinoId}`);
        router.refresh(); // Para garantir que os dados sejam atualizados
      }, 1500);
    } catch (error) {
      console.error('Erro ao adicionar exercícios:', error);
      setError(error instanceof Error ? error.message : 'Erro ao adicionar exercícios ao treino');
    } finally {
      setIsAdicionando(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[var(--primary)]"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6">
        <Link href={`/treinos/${treinoId}`} className="flex items-center mb-4 text-[var(--primary)]">
          <FaArrowLeft className="mr-2" /> Voltar ao Treino
        </Link>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Adicionar Exercícios</h1>
            {treino && <p className="text-gray-600">Treino: {treino.nome}</p>}
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={() => setExerciciosSelecionados([])}
              variant="ghost"
              disabled={exerciciosSelecionados.length === 0}
            >
              Limpar Seleção
            </Button>
            
            <Button
              onClick={adicionarExerciciosAoTreino}
              className="gap-2"
              disabled={exerciciosSelecionados.length === 0 || isAdicionando}
            >
              {isAdicionando ? (
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
              ) : (
                <FaPlus />
              )}
              Adicionar ({exerciciosSelecionados.length})
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mensagens de erro ou sucesso */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {sucesso && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex items-center">
          <FaCheck className="mr-2" /> Exercícios adicionados com sucesso! Redirecionando...
        </div>
      )}
      
      {/* Filtros */}
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
        </div>
      </motion.div>
      
      {/* Lista de exercícios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {exerciciosFiltrados.map((exercicio) => (
          <motion.div 
            key={exercicio.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`cursor-pointer relative ${isExercicioSelecionado(exercicio.id) ? 'ring-4 ring-[var(--primary)] rounded-lg' : ''}`}
            onClick={() => toggleExercicioSelecionado(exercicio)}
          >
            {isExercicioSelecionado(exercicio.id) && (
              <div className="absolute top-2 right-2 z-10 bg-[var(--primary)] text-white rounded-full p-1">
                <FaCheck />
              </div>
            )}
            <ExercicioCard
              exercicio={exercicio}
              isPublico={exercicio.isPublico || exercicio.id.startsWith('padrao-')}
            />
          </motion.div>
        ))}
        
        {exerciciosFiltrados.length === 0 && (
          <div className="col-span-full text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <FaDumbbell className="mx-auto text-4xl text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">Nenhum exercício disponível</p>
            <p className="text-gray-400 text-sm mt-2">Tente ajustar seus filtros ou criar novos exercícios</p>
          </div>
        )}
      </div>
    </div>
  );
} 