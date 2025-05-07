import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Endpoint para verificar a saúde da API e do banco de dados
export async function GET() {
  try {
    console.log('Health check: Iniciando verificação');
    
    // Verificar conexão com o banco de dados tentando contar os usuários
    const usuariosCount = await prisma.usuario.count();
    
    // Verificar se há treinos no banco
    const treinosCount = await prisma.treino.count();
    
    // Verificar se há exercícios no banco
    const exerciciosCount = await prisma.exercicioTreino.count();
    
    return NextResponse.json({
      status: 'ok',
      message: 'API está funcionando corretamente',
      database: {
        connected: true,
        usuariosCount,
        treinosCount,
        exerciciosCount
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Health check error:', error);
    
    return NextResponse.json({
      status: 'error',
      message: 'Erro ao conectar com a API ou banco de dados',
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      timestamp: new Date().toISOString()
    }, {
      status: 500
    });
  }
} 