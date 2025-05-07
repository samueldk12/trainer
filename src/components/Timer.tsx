import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { FaPlay, FaPause, FaStop, FaRedo } from 'react-icons/fa';

interface TimerProps {
  duracao?: number; // em segundos
  caloriasPorMinuto?: number;
  onComplete?: (tempo: number, calorias: number) => void;
}

export default function Timer({ duracao = 0, caloriasPorMinuto = 0, onComplete }: TimerProps) {
  const [tempo, setTempo] = useState(duracao);
  const [emExecucao, setEmExecucao] = useState(false);
  const [calorias, setCalorias] = useState(0);
  const [tempoDecorrido, setTempoDecorrido] = useState(0);

  const formatarTempo = (segundos: number) => {
    const minutos = Math.floor(segundos / 60);
    const segs = segundos % 60;
    return `${minutos.toString().padStart(2, '0')}:${segs.toString().padStart(2, '0')}`;
  };

  const calcularCalorias = useCallback((tempo: number) => {
    // Tempo em minutos
    const minutos = tempo / 60;
    return Math.round(minutos * caloriasPorMinuto);
  }, [caloriasPorMinuto]);

  useEffect(() => {
    let intervalo: NodeJS.Timeout;

    if (emExecucao) {
      intervalo = setInterval(() => {
        if (tempo > 0) {
          setTempo((prevTempo) => prevTempo - 1);
          setTempoDecorrido((prev) => prev + 1);
          setCalorias(calcularCalorias(tempoDecorrido + 1));
        } else if (duracao === 0) {
          // Se duracao for 0, continua incrementando o tempo
          setTempoDecorrido((prev) => prev + 1);
          setCalorias(calcularCalorias(tempoDecorrido + 1));
        } else {
          // Tempo acabou
          setEmExecucao(false);
          if (onComplete) {
            onComplete(tempoDecorrido, calorias);
          }
        }
      }, 1000);
    }

    return () => clearInterval(intervalo);
  }, [emExecucao, tempo, duracao, tempoDecorrido, calorias, onComplete, calcularCalorias]);

  const iniciar = () => setEmExecucao(true);
  const pausar = () => setEmExecucao(false);
  const parar = () => {
    setEmExecucao(false);
    if (onComplete) {
      onComplete(tempoDecorrido, calorias);
    }
  };
  const reiniciar = () => {
    setEmExecucao(false);
    setTempo(duracao);
    setTempoDecorrido(0);
    setCalorias(0);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Cronômetro</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div className="text-5xl font-bold mb-4 text-[var(--primary)]">{formatarTempo(duracao === 0 ? tempoDecorrido : tempo)}</div>
        <div className="text-lg">
          <p>Tempo decorrido: {formatarTempo(tempoDecorrido)}</p>
          <p>Calorias queimadas: <span className="text-[var(--accent-success)]">{calorias}</span></p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-2">
        {!emExecucao ? (
          <Button onClick={iniciar} variant="success" className="flex items-center gap-2">
            <FaPlay /> Iniciar
          </Button>
        ) : (
          <Button onClick={pausar} variant="warning" className="flex items-center gap-2">
            <FaPause /> Pausar
          </Button>
        )}
        <Button onClick={parar} variant="destructive" className="flex items-center gap-2">
          <FaStop /> Parar
        </Button>
        <Button onClick={reiniciar} variant="outline" className="flex items-center gap-2">
          <FaRedo /> Reiniciar
        </Button>
      </CardFooter>
    </Card>
  );
} 