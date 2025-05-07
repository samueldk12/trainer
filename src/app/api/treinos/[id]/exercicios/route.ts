import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Endpoint para adicionar exercícios a um treino existente
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    const { exercicios } = body;
    
    if (!exercicios || !Array.isArray(exercicios) || exercicios.length === 0) {
      return NextResponse.json(
        { error: 'É necessário fornecer pelo menos um exercício para adicionar ao treino' },
        { status: 400 }
      );
    }
    
    // Verificar se o treino existe
    const treinoExistente = await prisma.treino.findUnique({
      where: { id },
      include: {
        exercicios: true
      }
    });
    
    if (!treinoExistente) {
      return NextResponse.json(
        { error: 'Treino não encontrado' },
        { status: 404 }
      );
    }
    
    // Calculamos a ordem inicial para os novos exercícios
    // Começando do maior valor de ordem existente + 1
    const ordemInicial = treinoExistente.exercicios.length > 0
      ? Math.max(...treinoExistente.exercicios.map(ex => ex.ordem)) + 1
      : 0;
    
    // Adicionamos os novos exercícios ao treino
    const novosExercicios = await prisma.exercicioTreino.createMany({
      data: exercicios.map((exercicio: any, index: number) => ({
        nome: exercicio.nome,
        descricao: exercicio.descricao || null,
        tipoExercicio: exercicio.tipoExercicio,
        caloriasPorMinuto: exercicio.caloriasPorMinuto || null,
        imagem: exercicio.imagem || null,
        duracao: exercicio.duracao || null,
        repeticoes: exercicio.repeticoes || null,
        series: exercicio.series || null,
        exercicioBaseId: exercicio.id || null,
        ordem: ordemInicial + index,
        treinoId: id
      }))
    });
    
    // Buscamos o treino atualizado
    const treinoAtualizado = await prisma.treino.findUnique({
      where: { id },
      include: {
        exercicios: {
          orderBy: {
            ordem: 'asc'
          }
        }
      }
    });
    
    return NextResponse.json(treinoAtualizado);
  } catch (error) {
    console.error('Erro ao adicionar exercícios ao treino:', error);
    return NextResponse.json(
      { error: 'Erro ao adicionar exercícios ao treino' },
      { status: 500 }
    );
  }
} 