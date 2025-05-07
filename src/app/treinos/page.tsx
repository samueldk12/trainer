'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import Link from 'next/link';
import { FaPlus, FaPlay, FaEdit, FaTrash, FaEye } from 'react-icons/fa';

interface Exercicio {
  id: string;
  nome: string;
}

interface Treino {
  id: string;
  nome: string;
  descricao: string | null;
  nivelDificuldade: string;
  exercicios: Exercicio[];
}

export default function TreinosPage() {
  const [treinos, setTreinos] = useState<Treino[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function carregarTreinos() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/treinos');
        
        if (!response.ok) {
          throw new Error('Erro ao carregar treinos');
        }
        
        const data = await response.json();
        setTreinos(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao carregar treinos:", error);
        setError('Falha ao carregar treinos. Tente novamente mais tarde.');
        setIsLoading(false);
      }
    }
    
    carregarTreinos();
  }, []);

  const handleExcluirTreino = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este treino?')) {
      try {
        const response = await fetch(`/api/treinos/${id}`, { 
          method: 'DELETE'
        });
        
        if (!response.ok) {
          throw new Error('Erro ao excluir treino');
        }
        
        // Atualiza a lista de treinos
        setTreinos(treinos.filter(treino => treino.id !== id));
      } catch (error) {
        console.error("Erro ao excluir treino:", error);
        setError('Falha ao excluir treino. Tente novamente mais tarde.');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Meus Treinos</h1>
          <div className="animate-pulse h-10 w-32 bg-[var(--card-border)] rounded-md"></div>
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse h-64 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg p-6">
              <div className="h-6 bg-[var(--card-border)] rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-[var(--card-border)] rounded w-1/2 mb-6"></div>
              <div className="h-4 bg-[var(--card-border)] rounded w-full mb-3"></div>
              <div className="h-4 bg-[var(--card-border)] rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Meus Treinos</h1>
        <Link href="/treinos/novo">
          <Button className="gap-2">
            <FaPlus /> Novo Treino
          </Button>
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {treinos.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">Você ainda não tem treinos cadastrados</p>
          <Link href="/treinos/novo">
            <Button>Criar meu primeiro treino</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {treinos.map((treino) => (
            <Card key={treino.id} className="flex flex-col h-full">
              <CardHeader>
                <CardTitle>{treino.nome}</CardTitle>
                <CardDescription>Nível: {treino.nivelDificuldade}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-gray-600 mb-4">{treino.descricao}</p>
                <div>
                  <p className="text-sm font-semibold mb-2">Exercícios:</p>
                  {treino.exercicios.length === 0 ? (
                    <p className="text-sm text-gray-500">Nenhum exercício adicionado</p>
                  ) : (
                    <ul className="text-sm space-y-1">
                      {treino.exercicios.slice(0, 3).map((exercicio) => (
                        <li key={exercicio.id} className="flex items-center">
                          <span className="w-2 h-2 bg-[var(--primary)] rounded-full mr-2"></span>
                          {exercicio.nome}
                        </li>
                      ))}
                      {treino.exercicios.length > 3 && (
                        <li className="text-sm text-[var(--primary)]">
                          + {treino.exercicios.length - 3} exercícios
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between gap-2">
                <div className="grid grid-cols-2 gap-2 w-full">
                  <Link href={`/treinos/${treino.id}/iniciar`} className="col-span-1">
                    <Button className="w-full flex items-center justify-center gap-2">
                      <FaPlay /> Iniciar
                    </Button>
                  </Link>
                  <Link href={`/treinos/${treino.id}`} className="col-span-1">
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                      <FaEye /> Detalhes
                    </Button>
                  </Link>
                </div>
                <div className="flex gap-2">
                  <Link href={`/treinos/${treino.id}/editar`}>
                    <Button variant="info" className="flex items-center justify-center">
                      <FaEdit />
                    </Button>
                  </Link>
                  <Button 
                    variant="destructive" 
                    className="flex items-center justify-center"
                    onClick={() => handleExcluirTreino(treino.id)}
                  >
                    <FaTrash />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 