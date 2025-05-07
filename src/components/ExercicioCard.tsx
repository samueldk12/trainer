import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { FaPlay, FaEdit, FaTrash, FaLock, FaStar, FaRunning, FaDumbbell, FaChild, FaCalculator, FaTimes, FaPlus } from 'react-icons/fa';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import AdicionarExercicioTreinoModal from './AdicionarExercicioTreinoModal';

interface ExercicioProps {
  exercicio: {
    id: string;
    nome: string;
    descricao?: string | null;
    tipoExercicio: string;
    caloriasPorMinuto?: number | null;
    imagem?: string | null;
    duracao?: number | null;
    repeticoes?: number | null;
    series?: number | null;
    nivelForca?: number | null;
  };
  editarUrl?: string;
  onIniciar?: () => void;
  onExcluir?: () => void;
  isPublico?: boolean;
  view?: 'grid' | 'list';
}

export default function ExercicioCard({
  exercicio,
  editarUrl,
  onIniciar,
  onExcluir,
  isPublico = false,
  view = 'grid'
}: ExercicioProps) {
  const { 
    id, 
    nome, 
    descricao, 
    tipoExercicio, 
    caloriasPorMinuto, 
    imagem, 
    duracao, 
    repeticoes, 
    series,
    nivelForca
  } = exercicio;

  // Estados para o cálculo de calorias
  const [mostrarCalculadora, setMostrarCalculadora] = useState(false);
  const [minutos, setMinutos] = useState('');
  const [caloriasTotais, setCaloriasTotais] = useState<number | null>(null);
  
  // Estado para o modal de adicionar ao treino
  const [modalAdicionarAberto, setModalAdicionarAberto] = useState(false);

  // Atualizar calorias em tempo real quando o valor de minutos mudar
  useEffect(() => {
    if (caloriasPorMinuto && minutos && !isNaN(Number(minutos))) {
      const total = caloriasPorMinuto * Number(minutos);
      setCaloriasTotais(Number(total.toFixed(1)));
    } else {
      setCaloriasTotais(null);
    }
  }, [minutos, caloriasPorMinuto]);

  // Função para obter o ícone por tipo de exercício
  const getTipoIcon = () => {
    switch(tipoExercicio.toLowerCase()) {
      case 'cardio':
        return <FaRunning className="text-red-500" />;
      case 'força':
        return <FaDumbbell className="text-blue-500" />;
      case 'flexibilidade':
        return <FaChild className="text-green-500" />;
      case 'abdominal':
        return <FaStar className="text-yellow-500" />;
      default:
        return <FaDumbbell className="text-gray-500" />;
    }
  };

  // Renderizando o formato Grade (padrão)
  if (view === 'grid') {
    return (
      <>
        <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
          <div className="relative">
            {isPublico && (
              <div className="absolute top-2 right-2 z-10">
                <Badge variant="secondary" className="flex items-center gap-1 bg-opacity-80 backdrop-blur-sm">
                  <FaLock className="text-xs" /> Padrão
                </Badge>
              </div>
            )}
            <div className="h-48 overflow-hidden">
              {imagem ? (
                <img 
                  src={imagem} 
                  alt={nome} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-[var(--primary-light)] to-[var(--primary)] flex items-center justify-center text-white">
                  <span className="text-5xl font-bold opacity-80">{nome.charAt(0)}</span>
                </div>
              )}
            </div>
          </div>
          
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl">{nome}</CardTitle>
              <div className="bg-[var(--primary-light)] p-2 rounded-full text-[var(--primary)]">
                {getTipoIcon()}
              </div>
            </div>
            {descricao && (
              <CardDescription className="line-clamp-2 mt-1 text-sm">
                {descricao}
              </CardDescription>
            )}
          </CardHeader>
          
          <CardContent className="flex-grow pt-0">
            <div className="grid grid-cols-2 gap-2 mt-2">
              {caloriasPorMinuto && (
                <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-md">
                  {!mostrarCalculadora ? (
                    <div 
                      className="cursor-pointer" 
                      onClick={() => setMostrarCalculadora(true)}
                    >
                      <div className="flex justify-between items-center">
                        <p className="text-xs font-semibold text-green-600 dark:text-green-400">Calorias/min</p>
                        <FaCalculator className="text-xs text-green-600 dark:text-green-400" />
                      </div>
                      <p className="text-lg font-bold text-green-600 dark:text-green-400">{caloriasPorMinuto}</p>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-xs font-semibold text-green-600 dark:text-green-400">
                          {caloriasPorMinuto} cal × <span className="font-bold">{minutos || '0'}</span> min
                        </p>
                        <button 
                          className="text-green-600 hover:text-green-800" 
                          onClick={() => {
                            setMostrarCalculadora(false);
                            setMinutos('');
                          }}
                        >
                          <FaTimes size={12} />
                        </button>
                      </div>
                      <input
                        type="number"
                        value={minutos}
                        onChange={(e) => setMinutos(e.target.value)}
                        placeholder="Minutos"
                        className="w-full p-1 text-sm border border-green-200 dark:border-green-800 rounded bg-white dark:bg-gray-700"
                        min="1"
                        autoFocus
                      />
                      {caloriasTotais !== null && (
                        <p className="text-sm font-bold text-green-600 dark:text-green-400 mt-1">
                          Total: {caloriasTotais} calorias
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
              {nivelForca && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-md">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">Nível</p>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-3 h-3 rounded-full mr-1 ${i < nivelForca ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-2 pt-2 border-t border-gray-100 dark:border-gray-700">
            <Button
              onClick={() => setModalAdicionarAberto(true)}
              variant="outline"
              className="w-full flex items-center justify-center gap-2 text-[var(--primary)]"
            >
              <FaPlus size={14} /> Adicionar a Treino
            </Button>
            
            <div className="flex justify-between w-full gap-2">
              {onIniciar && (
                <Button
                  onClick={onIniciar}
                  variant="success"
                  className="flex-1 flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                >
                  <FaPlay /> Iniciar
                </Button>
              )}
              <div className="flex gap-2">
                {editarUrl && !isPublico && (
                  <Link href={editarUrl} passHref>
                    <Button
                      variant="info"
                      className="flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                    >
                      <FaEdit />
                    </Button>
                  </Link>
                )}
                {onExcluir && (
                  <Button
                    variant="destructive"
                    onClick={onExcluir}
                    className="flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                  >
                    <FaTrash />
                  </Button>
                )}
              </div>
            </div>
          </CardFooter>
        </Card>
        
        <AdicionarExercicioTreinoModal
          isOpen={modalAdicionarAberto}
          onClose={() => setModalAdicionarAberto(false)}
          exercicio={exercicio}
        />
      </>
    );
  }
  
  // Formato de lista
  return (
    <>
      <Card className="flex flex-row hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="relative w-24 sm:w-32 md:w-48 flex-shrink-0">
          {isPublico && (
            <div className="absolute top-2 left-2 z-10">
              <Badge variant="secondary" className="flex items-center gap-1 bg-opacity-80 backdrop-blur-sm">
                <FaLock className="text-xs" /> Padrão
              </Badge>
            </div>
          )}
          {imagem ? (
            <img 
              src={imagem} 
              alt={nome} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-[var(--primary-light)] to-[var(--primary)] flex items-center justify-center text-white">
              <span className="text-3xl font-bold opacity-80">{nome.charAt(0)}</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-col flex-grow p-4">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h3 className="font-bold text-lg">{nome}</h3>
              <div className="flex items-center mt-1">
                <span className="inline-flex items-center mr-3 text-sm text-gray-600 dark:text-gray-400">
                  {getTipoIcon()}
                  <span className="ml-1">{tipoExercicio}</span>
                </span>
                {caloriasPorMinuto && !mostrarCalculadora && (
                  <span 
                    className="text-sm text-green-600 dark:text-green-400 cursor-pointer flex items-center gap-1"
                    onClick={() => setMostrarCalculadora(true)}
                  >
                    {caloriasPorMinuto} cal/min
                    <FaCalculator className="text-xs" />
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-[var(--primary)]"
                onClick={() => setModalAdicionarAberto(true)}
              >
                <FaPlus size={12} className="mr-1" /> Adicionar a Treino
              </Button>
              
              {onIniciar && (
                <Button
                  onClick={onIniciar}
                  variant="success"
                  className="flex items-center justify-center gap-1"
                  size="sm"
                >
                  <FaPlay /> Iniciar
                </Button>
              )}
              {editarUrl && !isPublico && (
                <Link href={editarUrl} passHref>
                  <Button
                    variant="info"
                    className="flex items-center justify-center"
                    size="sm"
                  >
                    <FaEdit />
                  </Button>
                </Link>
              )}
              {onExcluir && (
                <Button
                  variant="destructive"
                  onClick={onExcluir}
                  className="flex items-center justify-center"
                  size="sm"
                >
                  <FaTrash />
                </Button>
              )}
            </div>
          </div>
          
          {descricao && (
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
              {descricao}
            </p>
          )}
          
          {/* Calculadora de calorias embutida */}
          {mostrarCalculadora && caloriasPorMinuto && (
            <div className="mt-2 bg-green-50 dark:bg-green-900/20 p-2 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                  {caloriasPorMinuto} cal × <span className="font-bold">{minutos || '0'}</span> min
                </p>
                <button 
                  className="text-green-600 hover:text-green-800" 
                  onClick={() => {
                    setMostrarCalculadora(false);
                    setMinutos('');
                  }}
                >
                  <FaTimes size={14} />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={minutos}
                  onChange={(e) => setMinutos(e.target.value)}
                  placeholder="Minutos"
                  className="flex-1 p-2 text-sm border border-green-200 dark:border-green-800 rounded bg-white dark:bg-gray-700"
                  min="1"
                  autoFocus
                />
                {caloriasTotais !== null && (
                  <span className="font-bold text-green-600 dark:text-green-400 whitespace-nowrap">
                    = {caloriasTotais} cal
                  </span>
                )}
              </div>
            </div>
          )}
          
          {nivelForca && (
            <div className="flex items-center mt-2">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400 mr-2">Nível:</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-2 h-2 rounded-full mr-1 ${i < nivelForca ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
      
      <AdicionarExercicioTreinoModal
        isOpen={modalAdicionarAberto}
        onClose={() => setModalAdicionarAberto(false)}
        exercicio={exercicio}
      />
    </>
  );
} 