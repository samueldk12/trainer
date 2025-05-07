import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Rota para semear o banco de dados com dados iniciais
export async function GET() {
  try {
    console.log('Iniciando seed do banco de dados');
    
    // Criar ou encontrar um usuário
    let usuario = await prisma.usuario.findFirst();
    
    if (!usuario) {
      console.log('Criando usuário teste');
      usuario = await prisma.usuario.create({
        data: {
          nome: 'Usuário Teste',
          email: 'usuario@teste.com'
        }
      });
    }
    
    // Criar exercícios base
    console.log('Criando exercícios base');
    
    const exerciciosBase = [
      {
        nome: 'Corrida',
        descricao: 'Corrida em ritmo moderado',
        tipoExercicio: 'cardio',
        caloriasPorMinuto: 12.5,
        usuarioId: usuario.id
      },
      {
        nome: 'Flexões',
        descricao: 'Flexões de braço padrão',
        tipoExercicio: 'força',
        caloriasPorMinuto: 8.0,
        usuarioId: usuario.id
      },
      {
        nome: 'Abdominais',
        descricao: 'Abdominais tradicionais',
        tipoExercicio: 'abdominal',
        caloriasPorMinuto: 8.0,
        usuarioId: usuario.id
      },
      {
        nome: 'Agachamentos',
        descricao: 'Agachamentos livres',
        tipoExercicio: 'força',
        caloriasPorMinuto: 7.5,
        usuarioId: usuario.id
      }
    ];
    
    // Criar os exercícios base
    for (const exercicio of exerciciosBase) {
      await prisma.exercicioBase.upsert({
        where: {
          id: `seed-${exercicio.nome.toLowerCase().replace(/\s+/g, '-')}`
        },
        update: exercicio,
        create: {
          id: `seed-${exercicio.nome.toLowerCase().replace(/\s+/g, '-')}`,
          ...exercicio
        }
      });
    }
    
    // Criar treinos de exemplo
    console.log('Criando treinos de exemplo');
    
    // Treino 1: Cardio
    const treino1 = await prisma.treino.upsert({
      where: { id: 'seed-treino-cardio' },
      update: {
        nome: 'Treino Cardio',
        descricao: 'Treino focado em exercícios cardiovasculares',
        nivelDificuldade: 'Intermediário',
        usuarioId: usuario.id
      },
      create: {
        id: 'seed-treino-cardio',
        nome: 'Treino Cardio',
        descricao: 'Treino focado em exercícios cardiovasculares',
        nivelDificuldade: 'Intermediário',
        usuarioId: usuario.id
      }
    });
    
    // Treino 2: Força
    const treino2 = await prisma.treino.upsert({
      where: { id: 'seed-treino-forca' },
      update: {
        nome: 'Treino de Força',
        descricao: 'Treino para ganho de força muscular',
        nivelDificuldade: 'Avançado',
        usuarioId: usuario.id
      },
      create: {
        id: 'seed-treino-forca',
        nome: 'Treino de Força',
        descricao: 'Treino para ganho de força muscular',
        nivelDificuldade: 'Avançado',
        usuarioId: usuario.id
      }
    });
    
    // Adicionar exercícios aos treinos
    console.log('Adicionando exercícios aos treinos');
    
    // Limpar exercícios existentes nos treinos
    await prisma.exercicioTreino.deleteMany({
      where: {
        OR: [
          { treinoId: treino1.id },
          { treinoId: treino2.id }
        ]
      }
    });
    
    // Exercícios para o treino de cardio
    await prisma.exercicioTreino.createMany({
      data: [
        {
          id: 'seed-exercicio-treino-1',
          nome: 'Corrida',
          descricao: 'Corrida em ritmo moderado',
          tipoExercicio: 'cardio',
          caloriasPorMinuto: 12.5,
          duracao: 600, // 10 minutos
          treinoId: treino1.id,
          exercicioBaseId: 'seed-corrida'
        },
        {
          id: 'seed-exercicio-treino-2',
          nome: 'Abdominais',
          descricao: 'Abdominais tradicionais',
          tipoExercicio: 'abdominal',
          series: 3,
          repeticoes: 15,
          treinoId: treino1.id,
          exercicioBaseId: 'seed-abdominais'
        }
      ]
    });
    
    // Exercícios para o treino de força
    await prisma.exercicioTreino.createMany({
      data: [
        {
          id: 'seed-exercicio-treino-3',
          nome: 'Flexões',
          descricao: 'Flexões de braço padrão',
          tipoExercicio: 'força',
          series: 4,
          repeticoes: 12,
          treinoId: treino2.id,
          exercicioBaseId: 'seed-flexões'
        },
        {
          id: 'seed-exercicio-treino-4',
          nome: 'Agachamentos',
          descricao: 'Agachamentos livres',
          tipoExercicio: 'força',
          series: 3,
          repeticoes: 15,
          treinoId: treino2.id,
          exercicioBaseId: 'seed-agachamentos'
        }
      ]
    });
    
    return NextResponse.json({
      success: true,
      message: 'Dados de exemplo criados com sucesso',
      data: {
        usuario: usuario.id,
        treinos: [treino1.id, treino2.id],
        exerciciosBase: exerciciosBase.length
      }
    });
    
  } catch (error) {
    console.error('Erro ao executar seed:', error);
    return NextResponse.json({
      success: false,
      message: 'Erro ao criar dados de exemplo',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 });
  }
} 