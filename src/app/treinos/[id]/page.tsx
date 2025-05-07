'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { FaArrowLeft, FaPlay, FaEdit, FaTrash, FaPlus, FaDumbbell } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface Exercicio {
  id: string;
  nome: string;
  descricao?: string | null;
  tipoExercicio: string;
  caloriasPorMinuto?: number | null;
  duracao?: number | null;
  repeticoes?: number | null;
  series?: number | null;
}

interface Treino {
  id: string;
  nome: string;
  descricao: string | null;
  nivelDificuldade: string;
  exercicios: Exercicio[];
}

export default function TreinoDetalhePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const treinoId = params.id;
  
  const [treino, setTreino] = useState<Treino | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    async function carregarTreino() {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/treinos/${treinoId}`);
        
        if (!response.ok) {
          throw new Error('Erro ao carregar treino');
        }
        
        const data = await response.json();
        setTreino(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao carregar treino:', error);
        setError('Falha ao carregar dados do treino');
        setIsLoading(false);
      }
    }
    
    carregarTreino();
  }, [treinoId]);
  
  const handleExcluirTreino = async () => {
    if (confirm('Tem certeza que deseja excluir este treino?')) {
      try {
        const response = await fetch(`/api/treinos/${treinoId}`, { 
          method: 'DELETE'
        });
        
        if (!response.ok) {
          throw new Error('Erro ao excluir treino');
        }
        
        // Redireciona para a página de treinos
        router.push('/treinos');
        router.refresh();
      } catch (error) {
        console.error("Erro ao excluir treino:", error);
        setError('Falha ao excluir treino. Tente novamente mais tarde.');
      }
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[var(--primary)]"></div>
      </div>
    );
  }
  
  if (error || !treino) {
    return (
      <div className="container mx-auto py-6 px-4">
        <Link href="/treinos" className="flex items-center mb-4 text-[var(--primary)]">
          <FaArrowLeft className="mr-2" /> Voltar aos Treinos
        </Link>
        
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error || 'Treino não encontrado'}
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-6 px-4">
      <Link href="/treinos" className="flex items-center mb-4 text-[var(--primary)]">
        <FaArrowLeft className="mr-2" /> Voltar aos Treinos
      </Link>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">{treino.nome}</h1>
          <p className="text-gray-600">Nível de dificuldade: {treino.nivelDificuldade}</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Link href={`/treinos/${treinoId}/iniciar`}>
            <Button className="gap-2">
              <FaPlay /> Iniciar Treino
            </Button>
          </Link>
          
          <Link href={`/treinos/${treinoId}/editar`}>
            <Button variant="info" className="gap-2">
              <FaEdit /> Editar
            </Button>
          </Link>
          
          <Button 
            variant="destructive" 
            className="gap-2"
            onClick={handleExcluirTreino}
          >
            <FaTrash /> Excluir
          </Button>
        </div>
      </div>
      
      {treino.descricao && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="text-gray-700">{treino.descricao}</p>
          </CardContent>
        </Card>
      )}
      
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center">
          <FaDumbbell className="mr-2 text-[var(--primary)]" /> Exercícios
        </h2>
        
        <Link href={`/treinos/${treinoId}/adicionar-exercicios`}>
          <Button variant="outline" className="gap-2">
            <FaPlus /> Adicionar Exercícios
          </Button>
        </Link>
      </div>
      
      {treino.exercicios.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <FaDumbbell className="mx-auto text-4xl text-gray-300 mb-4" />
          <p className="text-gray-500 mb-4">Este treino ainda não possui exercícios</p>
          <Link href={`/treinos/${treinoId}/adicionar-exercicios`}>
            <Button className="gap-2">
              <FaPlus /> Adicionar Exercícios
            </Button>
          </Link>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {treino.exercicios.map((exercicio, index) => (
            <motion.div
              key={exercicio.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="h-full flex flex-col hover:shadow-md transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{exercicio.nome}</CardTitle>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--primary-light)] text-[var(--primary)]">
                      {exercicio.tipoExercicio}
                    </span>
                  </div>
                  {exercicio.descricao && (
                    <CardDescription className="line-clamp-2">
                      {exercicio.descricao}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {exercicio.series && (
                      <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded">
                        <span className="block text-gray-500">Séries</span>
                        <span className="font-semibold">{exercicio.series}</span>
                      </div>
                    )}
                    {exercicio.repeticoes && (
                      <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded">
                        <span className="block text-gray-500">Repetições</span>
                        <span className="font-semibold">{exercicio.repeticoes}</span>
                      </div>
                    )}
                    {exercicio.duracao && (
                      <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded">
                        <span className="block text-gray-500">Duração</span>
                        <span className="font-semibold">{Math.floor(exercicio.duracao / 60)}:{(exercicio.duracao % 60).toString().padStart(2, '0')} min</span>
                      </div>
                    )}
                    {exercicio.caloriasPorMinuto && (
                      <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded">
                        <span className="block text-gray-500">Cal/min</span>
                        <span className="font-semibold">{exercicio.caloriasPorMinuto}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
} 