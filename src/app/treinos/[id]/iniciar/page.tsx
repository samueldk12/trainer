'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import Timer from '@/components/Timer';
import { FaArrowLeft, FaCheck, FaSave } from 'react-icons/fa';
import Link from 'next/link';

// Dados fictícios para demonstração
const treinoMock = {
  id: '1',
  nome: 'Treino Full Body',
  descricao: 'Treino completo para todo o corpo com foco em força e resistência',
  nivelDificuldade: 'Intermediário',
  exercicios: [
    { 
      id: '1', 
      nome: 'Flexões', 
      descricao: 'Mantenha o corpo reto e abaixe até o peito quase tocar o chão',
      tipoExercicio: 'força',
      caloriasPorMinuto: 8,
      series: 3,
      repeticoes: 12
    },
    { 
      id: '2', 
      nome: 'Agachamentos', 
      descricao: 'Mantenha as costas retas e desça como se fosse sentar em uma cadeira',
      tipoExercicio: 'força',
      caloriasPorMinuto: 7,
      series: 3,
      repeticoes: 15
    },
    { 
      id: '3', 
      nome: 'Abdominais', 
      descricao: 'Mantenha a região lombar apoiada no chão durante o movimento',
      tipoExercicio: 'abdominal',
      caloriasPorMinuto: 6,
      series: 3,
      repeticoes: 20
    },
    { 
      id: '4', 
      nome: 'Prancha', 
      descricao: 'Mantenha o corpo reto da cabeça aos pés, contraindo o abdômen',
      tipoExercicio: 'abdominal',
      caloriasPorMinuto: 5,
      duracao: 60 // em segundos
    },
    { 
      id: '5', 
      nome: 'Jumping Jacks', 
      descricao: 'Salte abrindo pernas e braços simultaneamente',
      tipoExercicio: 'cardio',
      caloriasPorMinuto: 10,
      duracao: 120 // em segundos
    }
  ]
};

export default function IniciarTreinoPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [treino, _setTreino] = useState(treinoMock);
  const [exercicioAtual, setExercicioAtual] = useState(0);
  const [exerciciosConcluidos, setExerciciosConcluidos] = useState<string[]>([]);
  const [treinoFinalizado, setTreinoFinalizado] = useState(false);
  const [tempoTotal, setTempoTotal] = useState(0);
  const [caloriasTotal, setCaloriasTotal] = useState(0);
  
  // No mundo real, carregariamos o treino do banco de dados aqui
  useEffect(() => {
    // Aqui faríamos a consulta ao banco de dados usando o ID
    console.log(`Carregando treino ${params.id}`);
  }, [params.id]);

  const handleExercicioCompleto = (tempo: number, calorias: number) => {
    // Adicionar exercício à lista de concluídos
    setExerciciosConcluidos([
      ...exerciciosConcluidos, 
      treino.exercicios[exercicioAtual].id
    ]);
    
    // Atualizar tempo e calorias totais
    setTempoTotal(tempoTotal + tempo);
    setCaloriasTotal(caloriasTotal + calorias);
    
    // Avançar para o próximo exercício ou finalizar treino
    if (exercicioAtual < treino.exercicios.length - 1) {
      setExercicioAtual(exercicioAtual + 1);
    } else {
      setTreinoFinalizado(true);
    }
  };

  const handleProximoExercicio = () => {
    if (exercicioAtual < treino.exercicios.length - 1) {
      setExercicioAtual(exercicioAtual + 1);
    } else {
      setTreinoFinalizado(true);
    }
  };

  const handleExercicioAnterior = () => {
    if (exercicioAtual > 0) {
      setExercicioAtual(exercicioAtual - 1);
    }
  };

  const handleSalvarTreino = async () => {
    // Aqui salvaríamos os dados da sessão de treino no banco de dados
    console.log({
      treinoId: treino.id,
      exerciciosConcluidos,
      tempoTotal,
      caloriasTotal,
      completado: true,
      dataSessao: new Date()
    });
    
    // Redirecionar para a página de treinos
    router.push('/treinos');
  };
  
  if (treinoFinalizado) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Treino Finalizado!</CardTitle>
            <CardDescription>Parabéns por completar seu treino!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center p-4 bg-[var(--success-bg)] border border-[var(--accent-success)] rounded-lg">
              <div className="flex items-center">
                <FaCheck className="text-[var(--accent-success)] mr-2" />
                <span className="font-medium">Treino Concluído</span>
              </div>
              <span className="text-sm text-[var(--accent-success)]">100%</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 rounded-lg bg-[var(--secondary-light)]">
                <p className="text-sm text-gray-500">Tempo Total</p>
                <p className="text-xl font-bold text-[var(--secondary)]">{Math.floor(tempoTotal / 60)}:{(tempoTotal % 60).toString().padStart(2, '0')}</p>
              </div>
              <div className="p-4 rounded-lg bg-[var(--warning-bg)]">
                <p className="text-sm text-gray-500">Calorias Queimadas</p>
                <p className="text-xl font-bold text-[var(--accent-warning)]">{caloriasTotal}</p>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium mb-2">Resumo de Exercícios</h3>
              <ul className="space-y-2">
                {treino.exercicios.map((exercicio) => (
                  <li key={exercicio.id} className="flex items-center p-2 bg-[var(--card-bg)] border border-[var(--card-border)] rounded">
                    <FaCheck className={`mr-2 ${exerciciosConcluidos.includes(exercicio.id) ? 'text-[var(--accent-success)]' : 'text-gray-300'}`} />
                    <span>{exercicio.nome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center gap-4">
            <Link href="/treinos">
              <Button variant="outline">Voltar para Treinos</Button>
            </Link>
            <Button onClick={handleSalvarTreino} variant="success" className="gap-2">
              <FaSave /> Salvar Progresso
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const exercicioAtivo = treino.exercicios[exercicioAtual];
  const progresso = ((exercicioAtual) / treino.exercicios.length) * 100;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/treinos">
            <Button variant="outline" size="icon">
              <FaArrowLeft />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">{treino.nome}</h1>
        </div>
        <span className="text-gray-500">
          Exercício {exercicioAtual + 1} de {treino.exercicios.length}
        </span>
      </div>
      
      <div className="w-full bg-[var(--card-border)] rounded-full h-2.5 mb-6">
        <div 
          className="bg-[var(--primary)] h-2.5 rounded-full" 
          style={{ width: `${progresso}%` }}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{exercicioAtivo.nome}</CardTitle>
            <CardDescription>{exercicioAtivo.tipoExercicio}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{exercicioAtivo.descricao}</p>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              {exercicioAtivo.series && exercicioAtivo.repeticoes ? (
                <>
                  <div className="p-3 bg-[var(--primary-light)] rounded-lg">
                    <p className="text-sm text-gray-500">Séries</p>
                    <p className="text-xl font-bold text-[var(--primary)]">{exercicioAtivo.series}</p>
                  </div>
                  <div className="p-3 bg-[var(--primary-light)] rounded-lg">
                    <p className="text-sm text-gray-500">Repetições</p>
                    <p className="text-xl font-bold text-[var(--primary)]">{exercicioAtivo.repeticoes}</p>
                  </div>
                </>
              ) : (
                <div className="p-3 bg-[var(--primary-light)] rounded-lg col-span-2">
                  <p className="text-sm text-gray-500">Duração</p>
                  <p className="text-xl font-bold text-[var(--primary)]">
                    {Math.floor((exercicioAtivo.duracao || 0) / 60)}:{((exercicioAtivo.duracao || 0) % 60).toString().padStart(2, '0')}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="secondary" 
              onClick={handleExercicioAnterior}
              disabled={exercicioAtual === 0}
            >
              Anterior
            </Button>
            <Button 
              variant="secondary" 
              onClick={handleProximoExercicio}
            >
              Próximo
            </Button>
          </CardFooter>
        </Card>
        
        <div>
          <Timer 
            duracao={exercicioAtivo.duracao}
            caloriasPorMinuto={exercicioAtivo.caloriasPorMinuto} 
            onComplete={handleExercicioCompleto}
          />
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Progresso da Sessão</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Tempo Total</p>
                  <p className="text-xl font-bold text-[var(--secondary)]">
                    {Math.floor(tempoTotal / 60)}:{(tempoTotal % 60).toString().padStart(2, '0')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Calorias Queimadas</p>
                  <p className="text-xl font-bold text-[var(--accent-warning)]">{caloriasTotal}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Exercícios Completados</p>
                  <p className="text-xl font-bold text-[var(--accent-success)]">{exerciciosConcluidos.length} de {treino.exercicios.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 