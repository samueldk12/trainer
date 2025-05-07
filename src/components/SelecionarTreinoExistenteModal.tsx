'use client';

import { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { FaPlus, FaCheck, FaSpinner, FaExclamationTriangle, FaSync } from 'react-icons/fa';

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

interface SelecionarTreinoExistenteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddExercicios: (exercicios: Exercicio[]) => void;
}

export default function SelecionarTreinoExistenteModal({
  isOpen,
  onClose,
  onAddExercicios
}: SelecionarTreinoExistenteModalProps) {
  const [treinos, setTreinos] = useState<Treino[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [exerciciosSelecionados, setExerciciosSelecionados] = useState<Record<string, boolean>>({});
  const [treinoAberto, setTreinoAberto] = useState<Record<string, boolean>>({});

  // Função para buscar treinos de forma simplificada
  const buscarTreinos = async (showLoading = true) => {
    if (showLoading) {
      setIsLoading(true);
    }
    setError('');
    
    try {
      console.log('Iniciando busca de treinos...');
      const timestamp = new Date().getTime(); // Evitar cache
      const response = await fetch(`/api/treinos?t=${timestamp}`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Dados recebidos:', data);
      
      if (!Array.isArray(data)) {
        console.error('Resposta não é um array:', data);
        throw new Error('Formato de dados inválido');
      }
      
      // Filtrar apenas treinos com pelo menos um exercício válido
      const treinosComExercicios = data.filter((treino) => 
        treino && 
        treino.exercicios && 
        Array.isArray(treino.exercicios) && 
        treino.exercicios.length > 0
      );
      
      // Inicializar estados para treinos com exercícios
      const novosTreinosAbertos: Record<string, boolean> = {};
      treinosComExercicios.forEach(treino => {
        novosTreinosAbertos[treino.id] = false;
      });
      
      console.log(`${treinosComExercicios.length} treinos com exercícios encontrados`);
      setTreinos(treinosComExercicios);
      setTreinoAberto(novosTreinosAbertos);
    } catch (error) {
      console.error('Erro ao buscar treinos:', error);
      setError('Não foi possível carregar os treinos. Verifique sua conexão ou tente mais tarde.');
      setTreinos([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Carregar treinos quando o modal abrir
  useEffect(() => {
    if (isOpen) {
      setExerciciosSelecionados({});
      buscarTreinos();
    }
  }, [isOpen]);

  // Alternar seleção de exercício
  const toggleExercicioSelecionado = (exercicioId: string) => {
    setExerciciosSelecionados(prev => ({
      ...prev,
      [exercicioId]: !prev[exercicioId]
    }));
  };

  // Alternar exibição de exercícios de um treino
  const toggleTreinoAberto = (treinoId: string) => {
    setTreinoAberto(prev => ({
      ...prev,
      [treinoId]: !prev[treinoId]
    }));
  };

  // Selecionar todos os exercícios de um treino
  const selecionarTodosTreino = (treino: Treino) => {
    const novosSelecionados = { ...exerciciosSelecionados };
    
    treino.exercicios.forEach(exercicio => {
      novosSelecionados[exercicio.id] = true;
    });
    
    setExerciciosSelecionados(novosSelecionados);
    setTreinoAberto(prev => ({
      ...prev,
      [treino.id]: true
    }));
  };

  // Adicionar exercícios selecionados ao treino
  const adicionarExerciciosSelecionados = () => {
    const exerciciosParaAdicionar: Exercicio[] = [];
    
    treinos.forEach(treino => {
      treino.exercicios.forEach(exercicio => {
        if (exerciciosSelecionados[exercicio.id]) {
          // Garantir que todas as propriedades necessárias estejam disponíveis
          const exercicioCompleto: Exercicio = {
            id: exercicio.id,
            nome: exercicio.nome,
            descricao: exercicio.descricao || '',
            tipoExercicio: exercicio.tipoExercicio || 'cardio',
            caloriasPorMinuto: exercicio.caloriasPorMinuto || 0,
            duracao: exercicio.duracao || 0,
            repeticoes: exercicio.repeticoes || 0,
            series: exercicio.series || 0
          };
          exerciciosParaAdicionar.push(exercicioCompleto);
        }
      });
    });
    
    onAddExercicios(exerciciosParaAdicionar);
    onClose();
  };

  // Calcular quantos exercícios estão selecionados em cada treino
  const contarExerciciosSelecionadosPorTreino = (treino: Treino) => {
    return treino.exercicios.filter(ex => exerciciosSelecionados[ex.id]).length;
  };

  // Contar total de exercícios selecionados
  const totalExerciciosSelecionados = () => {
    return Object.values(exerciciosSelecionados).filter(Boolean).length;
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title="Adicionar exercícios de treinos existentes"
      maxWidth="2xl"
    >
      {isLoading ? (
        <div className="flex flex-col justify-center items-center py-12">
          <FaSpinner className="animate-spin text-primary h-8 w-8 mb-4" />
          <p className="text-gray-500">Carregando treinos...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col justify-center items-center py-8">
          <div className="text-red-500 p-4 border border-red-200 rounded-md bg-red-50 mb-4 flex items-center">
            <FaExclamationTriangle className="mr-2" /> {error}
          </div>
          <Button onClick={() => buscarTreinos()} className="flex items-center gap-2">
            <FaSync /> Tentar Novamente
          </Button>
        </div>
      ) : treinos.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">Você ainda não tem treinos cadastrados ou todos os treinos estão vazios.</p>
          <Button onClick={onClose} variant="outline">Voltar</Button>
        </div>
      ) : (
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {treinos.map(treino => (
            <div key={treino.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div 
                className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-3 cursor-pointer"
                onClick={() => toggleTreinoAberto(treino.id)}
              >
                <div>
                  <h3 className="font-semibold">{treino.nome}</h3>
                  <p className="text-xs text-gray-500">
                    {treino.exercicios.length} exercícios • {contarExerciciosSelecionadosPorTreino(treino)} selecionados
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      selecionarTodosTreino(treino);
                    }}
                  >
                    Selecionar todos
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTreinoAberto(treino.id);
                    }}
                  >
                    {treinoAberto[treino.id] ? '▲' : '▼'}
                  </Button>
                </div>
              </div>
              
              {treinoAberto[treino.id] && treino.exercicios && treino.exercicios.length > 0 && (
                <div className="p-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {treino.exercicios.map(exercicio => (
                      <div 
                        key={exercicio.id}
                        className={`border p-2 rounded-md cursor-pointer transition-colors ${
                          exerciciosSelecionados[exercicio.id] 
                            ? 'border-[var(--primary)] bg-[var(--primary-light)] bg-opacity-20' 
                            : 'border-gray-200 dark:border-gray-700'
                        }`}
                        onClick={() => toggleExercicioSelecionado(exercicio.id)}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            exerciciosSelecionados[exercicio.id] 
                              ? 'bg-[var(--primary)] text-white' 
                              : 'border border-gray-300 dark:border-gray-600'
                          }`}>
                            {exerciciosSelecionados[exercicio.id] && <FaCheck className="text-xs" />}
                          </div>
                          <span className="font-medium">{exercicio.nome}</span>
                        </div>
                        <div className="text-xs text-gray-500 ml-7 mt-1">
                          {exercicio.tipoExercicio}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      <div className="flex justify-between items-center mt-6">
        <p className="text-sm text-gray-500">
          {totalExerciciosSelecionados()} exercícios selecionados
        </p>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button 
            onClick={adicionarExerciciosSelecionados}
            disabled={totalExerciciosSelecionados() === 0}
          >
            <FaPlus className="mr-2" /> Adicionar Selecionados
          </Button>
        </div>
      </div>
    </Modal>
  );
} 