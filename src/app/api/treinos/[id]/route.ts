import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Endpoint para obter um treino específico
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    const treino = await prisma.treino.findUnique({
      where: { id },
      include: {
        exercicios: true
      }
    });
    
    if (!treino) {
      return NextResponse.json(
        { error: 'Treino não encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(treino);
  } catch (error) {
    console.error('Erro ao buscar treino:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar treino' },
      { status: 500 }
    );
  }
}

// Endpoint para atualizar um treino específico
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    const { nome, descricao, nivelDificuldade, exercicios } = body;
    
    if (!nome || !nivelDificuldade) {
      return NextResponse.json(
        { error: 'Nome e nível de dificuldade são obrigatórios' },
        { status: 400 }
      );
    }
    
    // Verificar se o treino existe
    const treinoExistente = await prisma.treino.findUnique({
      where: { id }
    });
    
    if (!treinoExistente) {
      return NextResponse.json(
        { error: 'Treino não encontrado' },
        { status: 404 }
      );
    }
    
    // Excluímos todos os exercícios existentes e criamos novos
    // (uma abordagem simplificada para este exemplo)
    await prisma.exercicio.deleteMany({
      where: { treinoId: id }
    });
    
    // Atualizamos o treino e seus exercícios
    const treino = await prisma.treino.update({
      where: { id },
      data: {
        nome,
        descricao,
        nivelDificuldade,
        exercicios: {
          create: exercicios.map((exercicio: any) => ({
            nome: exercicio.nome,
            descricao: exercicio.descricao || null,
            tipoExercicio: exercicio.tipoExercicio,
            caloriasPorMinuto: exercicio.caloriasPorMinuto || null,
            duracao: exercicio.duracao || null,
            repeticoes: exercicio.repeticoes || null,
            series: exercicio.series || null
          }))
        }
      },
      include: {
        exercicios: true
      }
    });
    
    return NextResponse.json(treino);
  } catch (error) {
    console.error('Erro ao atualizar treino:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar treino' },
      { status: 500 }
    );
  }
}

// Endpoint para excluir um treino específico
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Verificar se o treino existe
    const treinoExistente = await prisma.treino.findUnique({
      where: { id }
    });
    
    if (!treinoExistente) {
      return NextResponse.json(
        { error: 'Treino não encontrado' },
        { status: 404 }
      );
    }
    
    // Excluímos o treino (os exercícios serão excluídos automaticamente devido ao onDelete: Cascade)
    await prisma.treino.delete({
      where: { id }
    });
    
    return NextResponse.json({ message: 'Treino excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir treino:', error);
    return NextResponse.json(
      { error: 'Erro ao excluir treino' },
      { status: 500 }
    );
  }
} 