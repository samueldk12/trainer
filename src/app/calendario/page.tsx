'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import CalendarioTreino from '@/components/CalendarioTreino';
import { Button } from '@/components/ui/Button';
import { FaCheckCircle, FaDumbbell, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';

interface SessaoTreino {
  id: string;
  nome: string;
  duracao: number;
  completado: boolean;
}

interface TreinoCompletado {
  data: Date;
  concluido: boolean;
}

export default function CalendarioPage() {
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [mostrarTreinosDoDia, setMostrarTreinosDoDia] = useState(true);
  const [treinosCompletados, setTreinosCompletados] = useState<TreinoCompletado[]>([]);
  const [treinosDoDia, setTreinosDoDia] = useState<SessaoTreino[]>([]);
  const [resumoSemana, setResumoSemana] = useState({
    diasTreinados: 0,
    totalDias: 7,
    percentualConcluido: 0,
    caloriasQueimadas: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function carregarDados() {
      try {
        // Em produção, usaríamos uma API para buscar os dados
        // const response = await fetch('/api/calendario/treinos-completados');
        // const dados = await response.json();
        // setTreinosCompletados(dados);
        
        setTreinosCompletados([]);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao carregar dados do calendário:", error);
        setIsLoading(false);
      }
    }
    
    carregarDados();
  }, []);
  
  useEffect(() => {
    async function carregarTreinosDoDia() {
      if (dataSelecionada) {
        try {
          // Em produção, usaríamos uma API para buscar os treinos do dia
          // const response = await fetch(`/api/calendario/treinos-do-dia?data=${dataSelecionada.toISOString()}`);
          // const dados = await response.json();
          // setTreinosDoDia(dados);
          
          setTreinosDoDia([]);
        } catch (error) {
          console.error("Erro ao carregar treinos do dia:", error);
          setTreinosDoDia([]);
        }
      }
    }
    
    async function carregarResumoSemana() {
      try {
        // Em produção, usaríamos uma API para buscar o resumo da semana
        // const response = await fetch('/api/calendario/resumo-semana');
        // const dados = await response.json();
        // setResumoSemana(dados);
        
        setResumoSemana({
          diasTreinados: 0,
          totalDias: 7,
          percentualConcluido: 0,
          caloriasQueimadas: 0
        });
      } catch (error) {
        console.error("Erro ao carregar resumo da semana:", error);
      }
    }
    
    carregarTreinosDoDia();
    carregarResumoSemana();
  }, [dataSelecionada]);
  
  const handleSelectData = (data: Date) => {
    setDataSelecionada(data);
    setMostrarTreinosDoDia(true);
  };

  const formatarData = (data: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(data);
  };
  
  const isHoje = (data: Date) => {
    const hoje = new Date();
    return data.getDate() === hoje.getDate() && 
           data.getMonth() === hoje.getMonth() && 
           data.getFullYear() === hoje.getFullYear();
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Calendário de Treinos</h1>
        <div className="animate-pulse h-80 bg-[var(--card-bg)] rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Calendário de Treinos</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-3/5">
          <CalendarioTreino 
            treinosCompletados={treinosCompletados}
            onSelect={handleSelectData}
          />
        </div>
        
        <div className="md:w-2/5">
          {mostrarTreinosDoDia && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>
                    {isHoje(dataSelecionada) ? 'Treinos de Hoje' : `Treinos de ${formatarData(dataSelecionada)}`}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {treinosDoDia.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-gray-500 mb-2">Nenhum treino programado para esta data</p>
                    <Button variant="info">Adicionar Treino</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {treinosDoDia.map((treino) => (
                      <div 
                        key={treino.id} 
                        className={`p-4 rounded-md border flex justify-between items-center ${
                          treino.completado ? 'bg-[var(--success-bg)] border-[var(--accent-success)]' : 'bg-[var(--secondary-light)]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            {treino.completado && <FaCheckCircle className="text-[var(--accent-success)]" />}
                            <h3 className="font-medium">{treino.nome}</h3>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Duração: {treino.duracao} minutos</p>
                        </div>
                        
                        {!treino.completado && (
                          <Button variant="success" size="sm" className="gap-1">
                            <FaDumbbell className="mr-1" /> 
                            Iniciar
                          </Button>
                        )}
                      </div>
                    ))}
                    
                    <div className="text-sm text-right mt-6">
                      <p className="flex items-center justify-end gap-1 text-gray-500">
                        <FaCheckCircle className="text-[var(--accent-success)]" /> 
                        <span>Treinos completados: {treinosDoDia.filter(t => t.completado).length}/{treinosDoDia.length}</span>
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="mt-6">
                  <h3 className="font-medium mb-2">Resumo da Semana</h3>
                  <div className="bg-[var(--primary-light)] p-4 rounded-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-[var(--primary)] font-semibold text-lg">{resumoSemana.diasTreinados}/{resumoSemana.totalDias}</p>
                        <p className="text-sm text-gray-600">dias de treino</p>
                      </div>
                      <div>
                        <p className="text-[var(--primary)] font-semibold text-lg">{resumoSemana.percentualConcluido}%</p>
                        <p className="text-sm text-gray-600">exercícios completados</p>
                      </div>
                      <div>
                        <p className="text-[var(--primary)] font-semibold text-lg">{resumoSemana.caloriasQueimadas}</p>
                        <p className="text-sm text-gray-600">calorias queimadas</p>
                      </div>
                    </div>
                    <Link href="/progresso">
                      <Button variant="info" className="w-full mt-4 gap-2">
                        Ver Progresso Completo <FaArrowRight />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
} 