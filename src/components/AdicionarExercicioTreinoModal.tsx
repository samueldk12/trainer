'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaSpinner } from 'react-icons/fa';
import Modal from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

interface Treino {
  id: string;
  nome: string;
}

interface Exercicio {
  id: string;
  nome: string;
  tipoExercicio: string;
  caloriasPorMinuto?: number | null;
  imagem?: string | null;
  descricao?: string | null;
}

interface AdicionarExercicioTreinoModalProps {
  isOpen: boolean;
  onClose: () => void;
  exercicio: Exercicio;
}

export default function AdicionarExercicioTreinoModal({
  isOpen,
  onClose,
  exercicio
}: AdicionarExercicioTreinoModalProps) {
  const [treinos, setTreinos] = useState<Treino[]>([]);
  const [treinoSelecionado, setTreinoSelecionado] = useState<string>('');
  const [series, setSeries] = useState<string>('3');
  const [repeticoes, setRepeticoes] = useState<string>('12');
  const [duracao, setDuracao] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [carregandoTreinos, setCarregandoTreinos] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState(false);

  // Buscar treinos disponíveis
  useEffect(() => {
    const carregarTreinos = async () => {
      try {
        setCarregandoTreinos(true);
        const response = await fetch('/api/treinos');
        
        if (!response.ok) {
          throw new Error('Falha ao carregar treinos');
        }
        
        const data = await response.json();
        setTreinos(data);
      } catch (error) {
        console.error('Erro ao carregar treinos:', error);
        setErro('Não foi possível carregar a lista de treinos');
      } finally {
        setCarregandoTreinos(false);
      }
    };

    if (isOpen) {
      carregarTreinos();
    }
  }, [isOpen]);

  // Limpar o formulário ao fechar o modal
  const handleClose = () => {
    setTreinoSelecionado('');
    setSeries('3');
    setRepeticoes('12');
    setDuracao('');
    setErro(null);
    setSucesso(false);
    onClose();
  };

  // Adicionar exercício ao treino
  const handleSubmit = async () => {
    if (!treinoSelecionado) {
      setErro('Selecione um treino para adicionar o exercício');
      return;
    }

    setIsLoading(true);
    setErro(null);

    try {
      const response = await fetch(`/api/treinos/${treinoSelecionado}/exercicios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          exercicios: [{
            id: exercicio.id,
            nome: exercicio.nome,
            descricao: exercicio.descricao,
            tipoExercicio: exercicio.tipoExercicio,
            caloriasPorMinuto: exercicio.caloriasPorMinuto,
            imagem: exercicio.imagem,
            series: series ? parseInt(series) : undefined,
            repeticoes: repeticoes ? parseInt(repeticoes) : undefined,
            duracao: duracao ? parseInt(duracao) * 60 : undefined, // Converte minutos para segundos
          }]
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao adicionar exercício ao treino');
      }

      setSucesso(true);
      
      // Fecha o modal após mostrar a mensagem de sucesso por 1.5 segundos
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (error) {
      console.error('Erro ao adicionar exercício:', error);
      setErro(error instanceof Error ? error.message : 'Erro ao adicionar exercício ao treino');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Adicionar Exercício ao Treino"
      maxWidth="md"
    >
      {erro && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {erro}
        </div>
      )}

      {sucesso ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md w-full text-center">
            Exercício adicionado com sucesso!
          </div>
          <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {exercicio.nome}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            foi adicionado ao treino
          </p>
          <div className="mt-2 text-lg font-semibold text-[var(--primary)]">
            {treinos.find(t => t.id === treinoSelecionado)?.nome}
          </div>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <div className="font-semibold mb-1">Exercício:</div>
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
              <div className="font-medium">{exercicio.nome}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{exercicio.tipoExercicio}</div>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="treino" className="block font-semibold mb-1">
              Selecione o Treino:
            </label>
            {carregandoTreinos ? (
              <div className="flex justify-center p-4">
                <FaSpinner className="animate-spin text-[var(--primary)] text-2xl" />
              </div>
            ) : treinos.length === 0 ? (
              <div className="p-3 bg-yellow-100 text-yellow-700 rounded-md">
                Você ainda não possui treinos. Crie um treino primeiro.
              </div>
            ) : (
              <select
                id="treino"
                value={treinoSelecionado}
                onChange={(e) => setTreinoSelecionado(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                required
              >
                <option value="">Selecione um treino</option>
                {treinos.map((treino) => (
                  <option key={treino.id} value={treino.id}>
                    {treino.nome}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="mb-4">
            <div className="font-semibold mb-2">Configurações do exercício:</div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor="series" className="block text-sm font-medium mb-1">
                  Séries
                </label>
                <input
                  type="number"
                  id="series"
                  value={series}
                  onChange={(e) => setSeries(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                  min="1"
                  max="10"
                />
              </div>

              <div>
                <label htmlFor="repeticoes" className="block text-sm font-medium mb-1">
                  Repetições
                </label>
                <input
                  type="number"
                  id="repeticoes"
                  value={repeticoes}
                  onChange={(e) => setRepeticoes(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                  min="1"
                  max="100"
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="duracao" className="block text-sm font-medium mb-1">
                  Duração (min)
                </label>
                <input
                  type="number"
                  id="duracao"
                  value={duracao}
                  onChange={(e) => setDuracao(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                  min="1"
                  placeholder="Opcional"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6 gap-2">
            <Button
              variant="ghost"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!treinoSelecionado || isLoading || treinos.length === 0}
              className="flex items-center gap-2"
            >
              {isLoading ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <FaPlus />
              )}
              Adicionar ao Treino
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
} 