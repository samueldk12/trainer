import { useState } from 'react';
import Calendar from 'react-calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { FaCheck, FaTimes } from 'react-icons/fa';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface TreinoCompleto {
  data: Date;
  concluido: boolean;
}

interface CalendarioTreinoProps {
  treinosCompletados: TreinoCompleto[];
  onSelect?: (data: Date) => void;
}

export default function CalendarioTreino({ treinosCompletados = [], onSelect }: CalendarioTreinoProps) {
  const [data, setData] = useState<Value>(new Date());

  const handleChange = (novaData: Value) => {
    setData(novaData);
    if (novaData instanceof Date && onSelect) {
      onSelect(novaData);
    }
  };

  // Verifica se um treino foi realizado em uma data específica
  const verificarTreinoRealizado = (data: Date) => {
    return treinosCompletados.find(
      (treino) => 
        treino.data.getDate() === data.getDate() && 
        treino.data.getMonth() === data.getMonth() && 
        treino.data.getFullYear() === data.getFullYear() &&
        treino.concluido
    );
  };

  // Função para renderizar conteúdo em cada dia do calendário
  const renderizarConteudo = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const treinoRealizado = verificarTreinoRealizado(date);
      
      if (treinoRealizado) {
        return <FaCheck className="text-[var(--accent-success)] mx-auto mt-1" />;
      }
      
      // Verifica se é um dia anterior ao atual e sem treino
      const hoje = new Date();
      if (date < hoje && 
          date.getDate() !== hoje.getDate() && 
          !treinoRealizado) {
        return <FaTimes className="text-[var(--accent-danger)] mx-auto mt-1" />;
      }
    }
    return null;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Calendário de Treinos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="custom-calendar-container">
          <Calendar 
            onChange={handleChange} 
            value={data} 
            tileContent={renderizarConteudo}
            className="mx-auto border-none"
          />
        </div>
        <style jsx global>{`
          .react-calendar {
            width: 100%;
            max-width: 100%;
            background: var(--card-bg);
            border: none;
            border-radius: 0.5rem;
            font-family: inherit;
          }
          .react-calendar__tile--active {
            background: var(--primary);
            color: white;
          }
          .react-calendar__tile--active:enabled:hover,
          .react-calendar__tile--active:enabled:focus {
            background: var(--primary-hover);
          }
          .react-calendar__tile--now {
            background: var(--primary-light);
          }
          .react-calendar__tile:disabled {
            background-color: var(--secondary-light);
          }
          .react-calendar__navigation button:enabled:hover,
          .react-calendar__navigation button:enabled:focus {
            background-color: var(--primary-light);
          }
          .react-calendar__tile:enabled:hover,
          .react-calendar__tile:enabled:focus {
            background-color: var(--primary-light);
            color: var(--primary);
          }
          .react-calendar__tile {
            position: relative;
            height: 50px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 8px;
          }
        `}</style>
      </CardContent>
    </Card>
  );
} 