'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaSave, FaArrowLeft, FaTrash } from 'react-icons/fa';
import Link from 'next/link';

interface ExercicioEditProps {
  params: {
    id: string;
  };
}

export default function EditarExercicio({ params }: ExercicioEditProps) {
  const id = params.id;
  const router = useRouter();
  const [salvando, setSalvando] = useState(false);
  const [excluindo, setExcluindo] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  
  // Estado para os dados do formulário
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    tipoExercicio: '',
    caloriasPorMinuto: '',
    imagem: ''
  });
  
  // Tipos de exercícios disponíveis
  const tiposExercicio = [
    { valor: 'cardio', label: 'Cardio' },
    { valor: 'força', label: 'Força' },
    { valor: 'flexibilidade', label: 'Flexibilidade' },
    { valor: 'equilíbrio', label: 'Equilíbrio' },
    { valor: 'abdominal', label: 'Abdominal' },
  ];
  
  // Buscar dados do exercício
  useEffect(() => {
    async function carregarExercicio() {
      try {
        setCarregando(true);
        
        const resposta = await fetch(`/api/exercicios/${id}`);
        
        if (!resposta.ok) {
          throw new Error('Falha ao carregar exercício');
        }
        
        const exercicio = await resposta.json();
        
        setFormData({
          nome: exercicio.nome,
          descricao: exercicio.descricao || '',
          tipoExercicio: exercicio.tipoExercicio,
          caloriasPorMinuto: exercicio.caloriasPorMinuto?.toString() || '',
          imagem: exercicio.imagem || ''
        });
      } catch (erro) {
        console.error('Erro ao carregar exercício:', erro);
        setErro('Não foi possível carregar os dados do exercício. Tente novamente.');
      } finally {
        setCarregando(false);
      }
    }
    
    carregarExercicio();
  }, [id]);
  
  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  // Função para enviar o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.tipoExercicio) {
      setErro('Nome e tipo de exercício são obrigatórios.');
      return;
    }
    
    try {
      setSalvando(true);
      setErro(null);
      
      const dadosParaEnviar = {
        ...formData,
        caloriasPorMinuto: formData.caloriasPorMinuto ? parseFloat(formData.caloriasPorMinuto) : null
      };
      
      const resposta = await fetch(`/api/exercicios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosParaEnviar)
      });
      
      if (!resposta.ok) {
        const dados = await resposta.json();
        throw new Error(dados.error || 'Erro ao atualizar exercício');
      }
      
      // Redirecionar para a página de exercícios após salvar
      router.push('/exercicios');
      router.refresh();
    } catch (erro: any) {
      setErro(erro.message);
    } finally {
      setSalvando(false);
    }
  };
  
  // Função para excluir o exercício
  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir este exercício? Esta operação não pode ser desfeita.')) {
      try {
        setExcluindo(true);
        setErro(null);
        
        const resposta = await fetch(`/api/exercicios/${id}`, {
          method: 'DELETE'
        });
        
        if (!resposta.ok) {
          const dados = await resposta.json();
          throw new Error(dados.error || 'Erro ao excluir exercício');
        }
        
        // Redirecionar para a página de exercícios após excluir
        router.push('/exercicios');
        router.refresh();
      } catch (erro: any) {
        setErro(erro.message);
      } finally {
        setExcluindo(false);
      }
    }
  };
  
  if (carregando) {
    return (
      <div className="container mx-auto py-6 px-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Editar Exercício</h1>
        <div className="flex gap-4">
          <button
            onClick={handleDelete}
            disabled={excluindo}
            className="bg-red-600 text-white px-4 py-2 rounded-md flex items-center justify-center disabled:opacity-50"
          >
            {excluindo ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mr-2"></div>
                <span>Excluindo...</span>
              </>
            ) : (
              <>
                <FaTrash className="mr-2" /> Excluir
              </>
            )}
          </button>
          
          <Link 
            href="/exercicios" 
            className="text-gray-600 hover:text-gray-800 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Voltar
          </Link>
        </div>
      </div>
      
      {erro && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{erro}</span>
        </div>
      )}
      
      <div className="rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                Nome *
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="tipoExercicio" className="block text-sm font-medium text-gray-700">
                Tipo de Exercício *
              </label>
              <select
                id="tipoExercicio"
                name="tipoExercicio"
                value={formData.tipoExercicio}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                {tiposExercicio.map((tipo) => (
                  <option key={tipo.valor} value={tipo.valor}>
                    {tipo.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="caloriasPorMinuto" className="block text-sm font-medium text-gray-700">
                Calorias por Minuto
              </label>
              <input
                type="number"
                id="caloriasPorMinuto"
                name="caloriasPorMinuto"
                value={formData.caloriasPorMinuto}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                min="0"
                step="0.1"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="imagem" className="block text-sm font-medium text-gray-700">
                URL da Imagem
              </label>
              <input
                type="text"
                id="imagem"
                name="imagem"
                value={formData.imagem}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
                Descrição
              </label>
              <textarea
                id="descricao"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={salvando}
              className="bg-[var(--primary)] text-white px-6 py-2 rounded-md flex items-center justify-center disabled:opacity-50"
            >
              {salvando ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mr-2"></div>
                  <span>Salvando...</span>
                </>
              ) : (
                <>
                  <FaSave className="mr-2" /> Salvar
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 