import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Endpoint para obter todos os treinos
export async function GET() {
  try {
    console.log('API: Iniciando busca de treinos');
    
    // Usamos um usuário provisório até implementar autenticação
    const usuarioId = await getOrCreateUsuarioProvisorio();
    console.log('API: Usuário ID obtido:', usuarioId);
    
    // Verificar se o ID é válido
    if (!usuarioId) {
      console.error('API: ID de usuário inválido');
      return NextResponse.json(
        { error: 'ID de usuário inválido' },
        { status: 400 }
      );
    }
    
    // Buscar treinos com tratamento de erro mais explícito
    let treinos;
    try {
      treinos = await prisma.treino.findMany({
        where: { usuarioId },
        include: {
          exercicios: {
            select: {
              id: true,
              nome: true,
              descricao: true,
              tipoExercicio: true,
              caloriasPorMinuto: true,
              duracao: true,
              repeticoes: true,
              series: true,
              imagem: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
      
      console.log(`API: ${treinos.length} treinos encontrados`);
      
      // Verificar se cada treino tem a propriedade exercicios como array
      const treinosValidados = treinos.map(treino => {
        // Garantir que exercicios seja sempre um array
        if (!treino.exercicios || !Array.isArray(treino.exercicios)) {
          treino.exercicios = [];
        }
        return treino;
      });
      
      console.log('API: Treinos validados e prontos para retorno');
      return NextResponse.json(treinosValidados);
      
    } catch (queryError) {
      console.error('API: Erro específico na consulta Prisma:', queryError);
      return NextResponse.json(
        { error: 'Erro ao consultar treinos no banco de dados' },
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error('API: Erro geral ao buscar treinos:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar treinos' },
      { status: 500 }
    );
  }
}

// Endpoint para criar um novo treino
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, descricao, nivelDificuldade, exercicios } = body;
    
    if (!nome || !nivelDificuldade) {
      return NextResponse.json(
        { error: 'Nome e nível de dificuldade são obrigatórios' },
        { status: 400 }
      );
    }
    
    // Usamos um usuário provisório até implementar autenticação
    const usuarioId = await getOrCreateUsuarioProvisorio();
    
    // Criamos o treino no banco de dados
    const treino = await prisma.treino.create({
      data: {
        nome,
        descricao,
        nivelDificuldade,
        usuarioId,
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
    console.error('Erro ao criar treino:', error);
    return NextResponse.json(
      { error: 'Erro ao criar treino' },
      { status: 500 }
    );
  }
}

// Função auxiliar para obter ou criar um usuário provisório para desenvolvimento
async function getOrCreateUsuarioProvisorio() {
  try {
    console.log('API: Buscando usuário provisório');
    const usuario = await prisma.usuario.findFirst();
    
    if (usuario) {
      console.log('API: Usuário existente encontrado:', usuario.id);
      return usuario.id;
    }
    
    console.log('API: Nenhum usuário encontrado, criando um novo');
    // Se não existir nenhum usuário, criamos um provisório
    const novoUsuario = await prisma.usuario.create({
      data: {
        nome: 'Usuário Teste',
        email: 'usuario@teste.com'
      }
    });
    
    console.log('API: Novo usuário criado:', novoUsuario.id);
    return novoUsuario.id;
  } catch (error) {
    console.error('API: Erro ao buscar/criar usuário:', error);
    return null;
  }
} 