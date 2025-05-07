import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Endpoint para obter um exercício base específico
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    const exercicio = await prisma.exercicioBase.findUnique({
      where: { id }
    });
    
    if (!exercicio) {
      return NextResponse.json(
        { error: 'Exercício não encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(exercicio);
  } catch (error) {
    console.error('Erro ao buscar exercício:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar exercício' },
      { status: 500 }
    );
  }
}

// Endpoint para atualizar um exercício base específico
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    const { nome, descricao, tipoExercicio, caloriasPorMinuto, imagem } = body;
    
    if (!nome || !tipoExercicio) {
      return NextResponse.json(
        { error: 'Nome e tipo de exercício são obrigatórios' },
        { status: 400 }
      );
    }
    
    // Verificar se o exercício existe
    const exercicioExistente = await prisma.exercicioBase.findUnique({
      where: { id }
    });
    
    if (!exercicioExistente) {
      return NextResponse.json(
        { error: 'Exercício não encontrado' },
        { status: 404 }
      );
    }
    
    // Atualizamos o exercício
    const exercicio = await prisma.exercicioBase.update({
      where: { id },
      data: {
        nome,
        descricao,
        tipoExercicio,
        caloriasPorMinuto: caloriasPorMinuto || null,
        imagem: imagem || null
      }
    });
    
    return NextResponse.json(exercicio);
  } catch (error) {
    console.error('Erro ao atualizar exercício:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar exercício' },
      { status: 500 }
    );
  }
}

// Endpoint para excluir um exercício base específico
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Verificar se o exercício existe
    const exercicioExistente = await prisma.exercicioBase.findUnique({
      where: { id }
    });
    
    if (!exercicioExistente) {
      return NextResponse.json(
        { error: 'Exercício não encontrado' },
        { status: 404 }
      );
    }
    
    // Verificar se o exercício está sendo usado em algum treino
    const exercicioEmUso = await prisma.exercicioTreino.findFirst({
      where: { exercicioBaseId: id }
    });
    
    if (exercicioEmUso) {
      return NextResponse.json(
        { error: 'Exercício está sendo usado em um treino e não pode ser excluído' },
        { status: 400 }
      );
    }
    
    // Excluímos o exercício
    await prisma.exercicioBase.delete({
      where: { id }
    });
    
    return NextResponse.json({ message: 'Exercício excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir exercício:', error);
    return NextResponse.json(
      { error: 'Erro ao excluir exercício' },
      { status: 500 }
    );
  }
} 