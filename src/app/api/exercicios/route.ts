import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { exerciciosPadrao } from './exerciciosPadrao';

// Endpoint para obter todos os exercícios base
export async function GET() {
  try {
    // Usamos um usuário provisório até implementar autenticação
    const usuarioId = await getOrCreateUsuarioProvisorio();
    
    const exercicios = await prisma.exercicioBase.findMany({
      where: { usuarioId },
      orderBy: {
        nome: 'asc'
      }
    });
    
    // Se não houver exercícios, retorne os exercícios padrão
    if (exercicios.length === 0) {
      return NextResponse.json(exerciciosPadrao);
    }
    
    return NextResponse.json(exercicios);
  } catch (error) {
    console.error('Erro ao buscar exercícios:', error);
    // Em caso de erro, retornar os exercícios padrão
    return NextResponse.json(exerciciosPadrao);
  }
}

// Endpoint para criar um novo exercício base
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, descricao, tipoExercicio, caloriasPorMinuto, imagem } = body;
    
    if (!nome || !tipoExercicio) {
      return NextResponse.json(
        { error: 'Nome e tipo de exercício são obrigatórios' },
        { status: 400 }
      );
    }
    
    // Usamos um usuário provisório até implementar autenticação
    const usuarioId = await getOrCreateUsuarioProvisorio();
    
    // Criamos o exercício base no banco de dados
    const exercicio = await prisma.exercicioBase.create({
      data: {
        nome,
        descricao,
        tipoExercicio,
        caloriasPorMinuto: caloriasPorMinuto || null,
        imagem: imagem || null,
        usuarioId
      }
    });
    
    return NextResponse.json(exercicio);
  } catch (error) {
    console.error('Erro ao criar exercício:', error);
    return NextResponse.json(
      { error: 'Erro ao criar exercício' },
      { status: 500 }
    );
  }
}

// Função auxiliar para obter ou criar um usuário provisório para desenvolvimento
async function getOrCreateUsuarioProvisorio() {
  const usuario = await prisma.usuario.findFirst();
  
  if (usuario) {
    return usuario.id;
  }
  
  // Se não existir nenhum usuário, criamos um provisório
  const novoUsuario = await prisma.usuario.create({
    data: {
      nome: 'Usuário Teste',
      email: 'usuario@teste.com'
    }
  });
  
  return novoUsuario.id;
} 