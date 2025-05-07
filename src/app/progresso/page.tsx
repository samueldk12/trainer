'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FaFire, FaCalendarAlt, FaStopwatch, FaDumbbell } from 'react-icons/fa';

interface Progresso {
  totalSessoes: number;
  totalTempo: number; // em minutos
  caloriasQueimadas: number;
  diasConsecutivos: number;
  sessoesPorSemana: number[]; // últimas 7 semanas
  caloriasPorSemana: number[]; // últimas 7 semanas
  tempoPorSemana: number[]; // em minutos, últimas 7 semanas
}

interface TipoExercicio {
  tipo: string;
  quantidade: number;
  cor: string;
}

export default function ProgressoPage() {
  const [periodoAtivo, setPeriodoAtivo] = useState<'semana' | 'mes' | 'total'>('semana');
  const [progresso, setProgresso] = useState<Progresso>({
    totalSessoes: 0,
    totalTempo: 0,
    caloriasQueimadas: 0,
    diasConsecutivos: 0,
    sessoesPorSemana: [0, 0, 0, 0, 0, 0, 0],
    caloriasPorSemana: [0, 0, 0, 0, 0, 0, 0],
    tempoPorSemana: [0, 0, 0, 0, 0, 0, 0]
  });
  const [exerciciosPorTipo, setExerciciosPorTipo] = useState<TipoExercicio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [comparacaoMesAnterior, setComparacaoMesAnterior] = useState(0);
  const [sessoesSemanais, setSessoesSemanais] = useState(0);
  const [tempoSemanal, setTempoSemanal] = useState(0);
  const [melhorSequencia, setMelhorSequencia] = useState(0);
  
  useEffect(() => {
    async function carregarDados() {
      try {
        setIsLoading(true);
        
        // Em produção, usaríamos uma API para buscar os dados
        // const response = await fetch(`/api/progresso?periodo=${periodoAtivo}`);
        // const dados = await response.json();
        // setProgresso(dados.progresso);
        // setExerciciosPorTipo(dados.exerciciosPorTipo);
        // setComparacaoMesAnterior(dados.comparacaoMesAnterior);
        // setSessoesSemanais(dados.sessoesSemanais);
        // setTempoSemanal(dados.tempoSemanal);
        // setMelhorSequencia(dados.melhorSequencia);
        
        // Valores iniciais vazios para simulação
        setProgresso({
          totalSessoes: 0,
          totalTempo: 0,
          caloriasQueimadas: 0,
          diasConsecutivos: 0,
          sessoesPorSemana: [0, 0, 0, 0, 0, 0, 0],
          caloriasPorSemana: [0, 0, 0, 0, 0, 0, 0],
          tempoPorSemana: [0, 0, 0, 0, 0, 0, 0]
        });
        
        setExerciciosPorTipo([
          { tipo: 'Cardio', quantidade: 0, cor: 'bg-[var(--accent-danger)]' },
          { tipo: 'Força', quantidade: 0, cor: 'bg-[var(--primary)]' },
          { tipo: 'Abdominal', quantidade: 0, cor: 'bg-[var(--accent-success)]' },
          { tipo: 'Alongamento', quantidade: 0, cor: 'bg-[var(--accent-warning)]' }
        ]);
        
        setComparacaoMesAnterior(0);
        setSessoesSemanais(0);
        setTempoSemanal(0);
        setMelhorSequencia(0);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao carregar dados de progresso:", error);
        setIsLoading(false);
      }
    }
    
    carregarDados();
  }, [periodoAtivo]);
  
  // Função para formatar números com separador de milhares
  const formatarNumero = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  
  // Função para formatar tempo em horas e minutos
  const formatarTempo = (minutos: number) => {
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    return `${horas}h ${mins}min`;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Seu Progresso</h1>
        
        <div className="flex gap-3 mb-6">
          <div className="animate-pulse h-10 w-24 bg-[var(--card-border)] rounded-md"></div>
          <div className="animate-pulse h-10 w-24 bg-[var(--card-border)] rounded-md"></div>
          <div className="animate-pulse h-10 w-24 bg-[var(--card-border)] rounded-md"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse h-32 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg p-4">
              <div className="h-4 bg-[var(--card-border)] rounded w-1/2 mb-4"></div>
              <div className="h-6 bg-[var(--card-border)] rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-[var(--card-border)] rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Seu Progresso</h1>
      
      <div className="flex gap-3 mb-6">
        <Button 
          variant={periodoAtivo === 'semana' ? 'default' : 'outline'} 
          onClick={() => setPeriodoAtivo('semana')}
        >
          Semana
        </Button>
        <Button 
          variant={periodoAtivo === 'mes' ? 'default' : 'outline'} 
          onClick={() => setPeriodoAtivo('mes')}
        >
          Mês
        </Button>
        <Button 
          variant={periodoAtivo === 'total' ? 'default' : 'outline'} 
          onClick={() => setPeriodoAtivo('total')}
        >
          Total
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500 flex items-center">
              <FaFire className="mr-2 text-[var(--accent-danger)]" /> Calorias Queimadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{formatarNumero(progresso.caloriasQueimadas)}</p>
            {comparacaoMesAnterior > 0 && (
              <p className="text-sm text-[var(--accent-success)] mt-1">+{comparacaoMesAnterior}% em relação ao mês anterior</p>
            )}
            {comparacaoMesAnterior === 0 && (
              <p className="text-sm text-gray-500 mt-1">Sem dados do mês anterior</p>
            )}
            {comparacaoMesAnterior < 0 && (
              <p className="text-sm text-[var(--accent-danger)] mt-1">{comparacaoMesAnterior}% em relação ao mês anterior</p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500 flex items-center">
              <FaCalendarAlt className="mr-2 text-[var(--primary)]" /> Total de Sessões
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{progresso.totalSessoes}</p>
            {sessoesSemanais > 0 && (
              <p className="text-sm text-[var(--accent-success)] mt-1">+{sessoesSemanais} sessões esta semana</p>
            )}
            {sessoesSemanais === 0 && (
              <p className="text-sm text-gray-500 mt-1">Nenhuma sessão esta semana</p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500 flex items-center">
              <FaStopwatch className="mr-2 text-[var(--accent-info)]" /> Tempo Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{formatarTempo(progresso.totalTempo)}</p>
            {tempoSemanal > 0 && (
              <p className="text-sm text-[var(--accent-success)] mt-1">+{formatarTempo(tempoSemanal)} esta semana</p>
            )}
            {tempoSemanal === 0 && (
              <p className="text-sm text-gray-500 mt-1">Sem treinos esta semana</p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500 flex items-center">
              <FaDumbbell className="mr-2 text-[var(--accent-success)]" /> Dias Consecutivos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{progresso.diasConsecutivos}</p>
            <p className="text-sm text-gray-500 mt-1">Melhor sequência: {melhorSequencia} dias</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Progresso Semanal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Calorias Queimadas por Semana</h3>
                <div className="h-16 flex items-end gap-2">
                  {progresso.caloriasPorSemana.map((calorias, index) => {
                    const max = Math.max(...progresso.caloriasPorSemana);
                    const altura = max > 0 ? (calorias / max) * 100 : 0;
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-[var(--primary)] rounded-t-sm" 
                          style={{ height: `${altura}%` }}
                        />
                        <p className="text-xs mt-1">S{index + 1}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Tempo de Treino por Semana (min)</h3>
                <div className="h-16 flex items-end gap-2">
                  {progresso.tempoPorSemana.map((tempo, index) => {
                    const max = Math.max(...progresso.tempoPorSemana);
                    const altura = max > 0 ? (tempo / max) * 100 : 0;
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-[var(--accent-success)] rounded-t-sm" 
                          style={{ height: `${altura}%` }}
                        />
                        <p className="text-xs mt-1">S{index + 1}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Sessões por Semana</h3>
                <div className="h-16 flex items-end gap-2">
                  {progresso.sessoesPorSemana.map((sessoes, index) => {
                    const max = Math.max(...progresso.sessoesPorSemana);
                    const altura = max > 0 ? (sessoes / max) * 100 : 0;
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-[var(--accent-info)] rounded-t-sm" 
                          style={{ height: `${altura}%` }}
                        />
                        <p className="text-xs mt-1">S{index + 1}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Tipos de Exercícios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {exerciciosPorTipo.some(e => e.quantidade > 0) ? (
                <div>
                  <h3 className="text-sm font-medium mb-4">Distribuição por Tipo</h3>
                  <div className="space-y-4">
                    {exerciciosPorTipo.map((exercicio) => {
                      const total = exerciciosPorTipo.reduce((acc, curr) => acc + curr.quantidade, 0);
                      const porcentagem = total > 0 ? (exercicio.quantidade / total) * 100 : 0;
                      
                      return (
                        <div key={exercicio.tipo}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">{exercicio.tipo}</span>
                            <span className="text-sm">{Math.round(porcentagem)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className={`h-2.5 rounded-full ${exercicio.cor}`}
                              style={{ width: `${porcentagem}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500">Ainda não há dados suficientes para mostrar a distribuição por tipo de exercício.</p>
                </div>
              )}
              
              <div>
                <h3 className="text-sm font-medium mb-2">Resumo</h3>
                {exerciciosPorTipo.some(e => e.quantidade > 0) ? (
                  <div className="bg-[var(--info-bg)] p-4 rounded-md">
                    <p className="text-sm">
                      Você tem se concentrado mais em exercícios de <strong>{
                        exerciciosPorTipo.sort((a, b) => b.quantidade - a.quantidade)[0]?.tipo
                      }</strong> e <strong>{
                        exerciciosPorTipo.sort((a, b) => b.quantidade - a.quantidade)[1]?.tipo
                      }</strong>, 
                      o que é ótimo para seu desenvolvimento físico.
                    </p>
                    <p className="text-sm mt-2">
                      Considere manter um equilíbrio entre todos os tipos de exercícios para um treinamento mais completo.
                    </p>
                  </div>
                ) : (
                  <div className="bg-[var(--info-bg)] p-4 rounded-md">
                    <p className="text-sm">
                      Comece a registrar seus treinos para ver recomendações personalizadas aqui.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 