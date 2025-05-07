'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { FaPlus, FaSave, FaArrowLeft, FaTrash, FaDumbbell, FaRunning, FaHeartbeat, FaChartLine, FaList, FaClone } from 'react-icons/fa';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import SelecionarTreinoExistenteModal from '@/components/SelecionarTreinoExistenteModal';

interface Exercicio {
  id: string;
  nome: string;
  descricao?: string;
  tipoExercicio: string;
  caloriasPorMinuto?: number;
  duracao?: number;
  repeticoes?: number;
  series?: number;
}

// Tipos de exercício com ícones e cores para melhorar visualização
const tiposExercicio = [
  { valor: 'cardio', nome: 'Cardio', icone: <FaRunning />, cor: 'var(--accent-danger)' },
  { valor: 'força', nome: 'Força', icone: <FaDumbbell />, cor: 'var(--primary)' },
  { valor: 'abdominal', nome: 'Abdominal', icone: <FaHeartbeat />, cor: 'var(--accent-success)' },
  { valor: 'alongamento', nome: 'Alongamento', icone: <FaChartLine />, cor: 'var(--accent-warning)' },
];

// Função para obter informações do tipo de exercício
const getTipoExercicio = (tipo: string) => {
  return tiposExercicio.find(t => t.valor === tipo) || tiposExercicio[0];
};

export default function NovoTreinoPage() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [nivelDificuldade, setNivelDificuldade] = useState('Iniciante');
  const [exercicios, setExercicios] = useState<Exercicio[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [sucesso, setSucesso] = useState(false);
  const [etapaAtual, setEtapaAtual] = useState(1); // 1: Informações básicas, 2: Exercícios
  
  // Estados para o formulário de exercício
  const [novoExercicio, setNovoExercicio] = useState({
    id: '',
    nome: '',
    descricao: '',
    tipoExercicio: 'cardio',
    caloriasPorMinuto: 0,
    duracao: 0,
    repeticoes: 0,
    series: 0
  });
  
  const [mostrarFormExercicio, setMostrarFormExercicio] = useState(false);
  const [validacoes, setValidacoes] = useState({
    nome: true,
    descricao: true,
    nomeExercicio: true
  });
  
  // Estado para o modal de seleção de treinos existentes
  const [modalTreinosAberto, setModalTreinosAberto] = useState(false);

  // Calcula estatísticas do treino
  const estatisticasTreino = {
    tempoTotal: exercicios.reduce((total, ex) => total + (ex.tipoExercicio === 'cardio' ? (ex.duracao || 0) : 0), 0),
    caloriasTotal: exercicios.reduce((total, ex) => {
      const tempo = ex.tipoExercicio === 'cardio' ? (ex.duracao || 0) / 60 : 0;
      return total + tempo * (ex.caloriasPorMinuto || 0);
    }, 0),
    totalExercicios: exercicios.length,
    porTipo: tiposExercicio.map(tipo => ({
      ...tipo,
      quantidade: exercicios.filter(ex => ex.tipoExercicio === tipo.valor).length
    }))
  };

  useEffect(() => {
    // Validação em tempo real do nome
    setValidacoes(prev => ({
      ...prev,
      nome: nome.trim().length > 0
    }));
  }, [nome]);

  const validarFormulario = () => {
    const nomeValido = nome.trim().length > 0;
    
    setValidacoes(prev => ({
      ...prev,
      nome: nomeValido
    }));
    
    return nomeValido;
  };

  const handleAdicionarExercicio = () => {
    if (!novoExercicio.nome) {
      setValidacoes(prev => ({...prev, nomeExercicio: false}));
      setError('Nome do exercício é obrigatório');
      return;
    }
    
    // Adiciona ID único para o exercício (temporário, o ID real será gerado pelo banco)
    const exercicio = {
      ...novoExercicio,
      id: Date.now().toString()
    };
    
    setExercicios([...exercicios, exercicio]);
    setError('');
    setSucesso(true);
    setTimeout(() => setSucesso(false), 2000);
    
    // Limpa o formulário
    setNovoExercicio({
      id: '',
      nome: '',
      descricao: '',
      tipoExercicio: 'cardio',
      caloriasPorMinuto: 0,
      duracao: 0,
      repeticoes: 0,
      series: 0
    });
    
    setMostrarFormExercicio(false);
    setValidacoes(prev => ({...prev, nomeExercicio: true}));
  };

  const handleRemoverExercicio = (id: string) => {
    setExercicios(exercicios.filter(exercicio => exercicio.id !== id));
  };

  const avancarEtapa = () => {
    if (validarFormulario()) {
      setEtapaAtual(2);
    }
  };

  const voltarEtapa = () => {
    setEtapaAtual(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validarFormulario()) {
      setError('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    
    if (exercicios.length === 0) {
      setError('Adicione pelo menos um exercício ao treino');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/treinos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          descricao,
          nivelDificuldade,
          exercicios
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao criar treino');
      }
      
      const data = await response.json();
      console.log('Treino criado com sucesso:', data);
      
      // Mostra mensagem de sucesso
      setSucesso(true);
      
      // Redireciona para a lista de treinos após um breve delay
      setTimeout(() => {
        router.push('/treinos');
        router.refresh(); // Para garantir que a lista de treinos seja atualizada
      }, 1500);
    } catch (error) {
      console.error('Erro ao criar treino:', error);
      setError(error instanceof Error ? error.message : 'Erro ao criar treino');
      setSucesso(false);
    } finally {
      setIsLoading(false);
    }
  };

  const formatarTempo = (segundos: number) => {
    const minutos = Math.floor(segundos / 60);
    const segs = segundos % 60;
    return `${minutos}:${segs.toString().padStart(2, '0')}`;
  };
  
  // Função para adicionar exercícios de treinos existentes
  const handleAdicionarExerciciosDeTreinos = (exerciciosSelecionados: Exercicio[]) => {
    // Adicionar IDs temporários para os exercícios selecionados
    const exerciciosComIds = exerciciosSelecionados.map(ex => ({
      ...ex,
      id: `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }));
    
    setExercicios([...exercicios, ...exerciciosComIds]);
    setSucesso(true);
    setTimeout(() => setSucesso(false), 2000);
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <Link href="/treinos">
            <Button variant="outline" size="icon" className="rounded-full shadow-sm">
              <FaArrowLeft />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Novo Treino</h1>
        </div>
        
        {/* Indicador de etapas */}
        <div className="hidden md:flex items-center gap-2 bg-[var(--secondary-light)] px-4 py-1 rounded-full">
          <div 
            className={`flex items-center justify-center w-6 h-6 rounded-full text-sm font-medium ${
              etapaAtual === 1 ? 'bg-[var(--primary)] text-white' : 'bg-gray-200 text-gray-500'
            }`}
          >
            1
          </div>
          <div className="text-xs text-gray-500 hidden sm:block">Informações</div>
          <div className="w-6 h-0.5 bg-gray-300"></div>
          <div 
            className={`flex items-center justify-center w-6 h-6 rounded-full text-sm font-medium ${
              etapaAtual === 2 ? 'bg-[var(--primary)] text-white' : 'bg-gray-200 text-gray-500'
            }`}
          >
            2
          </div>
          <div className="text-xs text-gray-500 hidden sm:block">Exercícios</div>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow"
          >
            <div className="flex items-center">
              <span className="block sm:inline">{error}</span>
            </div>
          </motion.div>
        )}
        
        {sucesso && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md shadow"
          >
            <div className="flex items-center">
              <span className="block sm:inline">Operação realizada com sucesso!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-6">
        {etapaAtual === 1 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden border-0 shadow-lg">
              <div className="h-2 bg-gradient-to-r from-[var(--primary)] to-[var(--accent-info)]"></div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FaDumbbell className="text-[var(--primary)]" /> 
                  Informações do Treino
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium mb-1">
                    Nome do Treino <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all ${
                      !validacoes.nome ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Ex: Treino Full Body"
                    required
                  />
                  {!validacoes.nome && (
                    <p className="mt-1 text-sm text-red-500">Nome do treino é obrigatório</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="descricao" className="block text-sm font-medium mb-1">
                    Descrição
                  </label>
                  <textarea
                    id="descricao"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                    rows={3}
                    placeholder="Descreva o objetivo e características do treino"
                  />
                </div>
                
                <div>
                  <label htmlFor="nivelDificuldade" className="block text-sm font-medium mb-1">
                    Nível de Dificuldade <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Iniciante', 'Intermediário', 'Avançado'].map(nivel => (
                      <button
                        key={nivel}
                        type="button"
                        onClick={() => setNivelDificuldade(nivel)}
                        className={`p-3 rounded-md border transition-all ${
                          nivelDificuldade === nivel 
                            ? 'bg-[var(--primary)] text-white border-transparent' 
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {nivel}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button
                    type="button"
                    onClick={avancarEtapa}
                    className="px-6"
                  >
                    Avançar para Exercícios
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {etapaAtual === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden border-0 shadow-lg mb-6">
              <div className="h-2 bg-gradient-to-r from-[var(--accent-success)] to-[var(--primary)]"></div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FaRunning className="text-[var(--accent-success)]" /> 
                  Exercícios
                </CardTitle>
              </CardHeader>
              <CardContent>
                {exercicios.length === 0 ? (
                  <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <FaDumbbell className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-500 mb-4">Nenhum exercício adicionado</p>
                    <div className="flex flex-col md:flex-row justify-center gap-3">
                      <Button 
                        type="button" 
                        onClick={() => setMostrarFormExercicio(true)}
                        className="gap-2"
                      >
                        <FaPlus /> Adicionar Exercício Novo
                      </Button>
                      <Button 
                        type="button" 
                        onClick={() => setModalTreinosAberto(true)}
                        variant="outline"
                        className="gap-2"
                      >
                        <FaClone /> Adicionar de Treinos Existentes
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 bg-[var(--info-bg)] p-4 rounded-lg">
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Exercícios</p>
                        <p className="text-xl font-bold">{estatisticasTreino.totalExercicios}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Tempo Total</p>
                        <p className="text-xl font-bold">{formatarTempo(estatisticasTreino.tempoTotal)}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Calorias</p>
                        <p className="text-xl font-bold">{Math.round(estatisticasTreino.caloriasTotal)}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Nível</p>
                        <p className="text-xl font-bold">{nivelDificuldade}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Lista de Exercícios</h3>
                      <div className="flex gap-2">
                        <Button 
                          type="button" 
                          onClick={() => setMostrarFormExercicio(true)}
                          size="sm"
                          className="gap-1"
                        >
                          <FaPlus size={12} /> Novo
                        </Button>
                        <Button 
                          type="button" 
                          onClick={() => setModalTreinosAberto(true)}
                          size="sm"
                          variant="outline"
                          className="gap-1"
                        >
                          <FaList size={12} /> De Treinos
                        </Button>
                      </div>
                    </div>

                    <AnimatePresence>
                      <ul className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                        {exercicios.map((exercicio, index) => {
                          const tipoInfo = getTipoExercicio(exercicio.tipoExercicio);
                          return (
                            <motion.li 
                              key={exercicio.id} 
                              className="flex justify-between items-center p-4 bg-white rounded-md border shadow-sm hover:shadow-md transition-all"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${tipoInfo.cor}20`, color: tipoInfo.cor }}>
                                  {tipoInfo.icone}
                                </div>
                                <div>
                                  <p className="font-medium">{exercicio.nome}</p>
                                  <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <span style={{ color: tipoInfo.cor }}>{tipoInfo.nome}</span> • 
                                    {exercicio.tipoExercicio === 'cardio' 
                                      ? ` ${formatarTempo(exercicio.duracao || 0)} min` 
                                      : ` ${exercicio.series} séries x ${exercicio.repeticoes} repetições`
                                    }
                                  </div>
                                </div>
                              </div>
                              <Button 
                                type="button" 
                                variant="destructive" 
                                size="icon"
                                className="rounded-full w-8 h-8 opacity-80 hover:opacity-100"
                                onClick={() => handleRemoverExercicio(exercicio.id)}
                              >
                                <FaTrash size={12} />
                              </Button>
                            </motion.li>
                          );
                        })}
                      </ul>
                    </AnimatePresence>
                  </>
                )}

                <AnimatePresence>
                  {mostrarFormExercicio && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 p-5 border rounded-md bg-[var(--card-bg)] shadow-inner"
                    >
                      <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                        <FaPlus className="text-[var(--primary)]" /> Adicionar Exercício
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="nomeExercicio" className="block text-sm font-medium mb-1">
                            Nome do Exercício <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="nomeExercicio"
                            value={novoExercicio.nome}
                            onChange={(e) => setNovoExercicio({...novoExercicio, nome: e.target.value})}
                            className={`w-full p-3 border rounded-md ${
                              !validacoes.nomeExercicio ? 'border-red-500 bg-red-50' : 'border-gray-300'
                            }`}
                            placeholder="Ex: Flexões"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="descricaoExercicio" className="block text-sm font-medium mb-1">
                            Descrição (opcional)
                          </label>
                          <textarea
                            id="descricaoExercicio"
                            value={novoExercicio.descricao}
                            onChange={(e) => setNovoExercicio({...novoExercicio, descricao: e.target.value})}
                            className="w-full p-3 border rounded-md"
                            rows={2}
                            placeholder="Descreva como realizar o exercício"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-3">
                            Tipo de Exercício
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {tiposExercicio.map(tipo => (
                              <button
                                key={tipo.valor}
                                type="button"
                                onClick={() => setNovoExercicio({...novoExercicio, tipoExercicio: tipo.valor})}
                                className={`flex items-center justify-center gap-2 p-3 rounded-md border transition-all ${
                                  novoExercicio.tipoExercicio === tipo.valor
                                    ? `bg-[${tipo.cor}20] text-[${tipo.cor}] border-[${tipo.cor}]`
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                }`}
                                style={{
                                  backgroundColor: novoExercicio.tipoExercicio === tipo.valor ? `${tipo.cor}20` : '',
                                  color: novoExercicio.tipoExercicio === tipo.valor ? tipo.cor : '',
                                  borderColor: novoExercicio.tipoExercicio === tipo.valor ? tipo.cor : ''
                                }}
                              >
                                {tipo.icone} {tipo.nome}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="caloriasPorMinuto" className="block text-sm font-medium mb-1">
                            Calorias por Minuto (aproximado)
                          </label>
                          <input
                            type="number"
                            id="caloriasPorMinuto"
                            value={novoExercicio.caloriasPorMinuto}
                            onChange={(e) => setNovoExercicio({...novoExercicio, caloriasPorMinuto: Number(e.target.value)})}
                            className="w-full p-3 border rounded-md"
                            min="0"
                            step="0.1"
                            placeholder="Ex: 5.5"
                          />
                        </div>
                        
                        {novoExercicio.tipoExercicio === 'cardio' ? (
                          <div>
                            <label htmlFor="duracao" className="block text-sm font-medium mb-1">
                              Duração (em segundos)
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                id="duracao"
                                value={novoExercicio.duracao}
                                onChange={(e) => setNovoExercicio({...novoExercicio, duracao: Number(e.target.value)})}
                                className="w-full p-3 border rounded-md"
                                min="0"
                                placeholder="Ex: 300 (5 minutos)"
                              />
                              <span className="text-sm text-gray-500 whitespace-nowrap">
                                {formatarTempo(novoExercicio.duracao)} min
                              </span>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label htmlFor="series" className="block text-sm font-medium mb-1">
                                  Séries
                                </label>
                                <input
                                  type="number"
                                  id="series"
                                  value={novoExercicio.series}
                                  onChange={(e) => setNovoExercicio({...novoExercicio, series: Number(e.target.value)})}
                                  className="w-full p-3 border rounded-md"
                                  min="0"
                                  placeholder="Ex: 3"
                                />
                              </div>
                              <div>
                                <label htmlFor="repeticoes" className="block text-sm font-medium mb-1">
                                  Repetições
                                </label>
                                <input
                                  type="number"
                                  id="repeticoes"
                                  value={novoExercicio.repeticoes}
                                  onChange={(e) => setNovoExercicio({...novoExercicio, repeticoes: Number(e.target.value)})}
                                  className="w-full p-3 border rounded-md"
                                  min="0"
                                  placeholder="Ex: 12"
                                />
                              </div>
                            </div>
                          </>
                        )}
                        
                        <div className="flex justify-end gap-2 mt-4">
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => setMostrarFormExercicio(false)}
                          >
                            Cancelar
                          </Button>
                          <Button 
                            type="button" 
                            onClick={handleAdicionarExercicio}
                          >
                            Adicionar
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
            
            <div className="flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={voltarEtapa}
                className="gap-2"
              >
                <FaArrowLeft /> Voltar
              </Button>
              <div className="flex gap-2">
                <Link href="/treinos">
                  <Button variant="outline" type="button">
                    Cancelar
                  </Button>
                </Link>
                <Button 
                  type="submit" 
                  className="gap-2 bg-gradient-to-r from-[var(--primary)] to-[var(--accent-success)] border-none px-6"
                  disabled={isLoading || exercicios.length === 0}
                >
                  {isLoading ? 'Salvando...' : (
                    <>
                      <FaSave /> Salvar Treino
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </form>
      
      {/* Modal para adicionar exercícios de treinos existentes */}
      <SelecionarTreinoExistenteModal
        isOpen={modalTreinosAberto}
        onClose={() => setModalTreinosAberto(false)}
        onAddExercicios={handleAdicionarExerciciosDeTreinos}
      />
    </div>
  );
} 