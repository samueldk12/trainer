'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// Interface para definir a estrutura do usuário
export interface User {
  id: string;
  nome: string;
  email: string;
  perfil?: string;
}

// Interface para o contexto de autenticação
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  register: (nome: string, email: string, senha: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

// Criando o contexto de autenticação
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para usar o contexto de autenticação
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

// Provedor de autenticação
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Função para verificar se o usuário está autenticado ao carregar a página
  useEffect(() => {
    // Recuperar dados do usuário do localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Função de login
  const login = async (email: string, senha: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Aqui você faria uma chamada real para sua API
      // Por enquanto, vamos simular o login
      
      // Simulação de verificação - Em produção, isso seria uma chamada à API
      if (email === 'teste@exemplo.com' && senha === 'senha123') {
        const userData: User = {
          id: '1',
          nome: 'Usuário Teste',
          email: email
        };
        
        // Salvar o usuário no localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        router.push('/'); // Redirecionar para a página inicial após login
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao realizar login';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Função de registro
  const register = async (nome: string, email: string, senha: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Aqui você faria uma chamada real para sua API para registrar o usuário
      // Por enquanto, vamos simular o registro
      
      // Verificar se o email já está sendo usado (simulação)
      if (email === 'teste@exemplo.com') {
        throw new Error('Este email já está sendo usado');
      }
      
      // Simulando um novo usuário
      const userData: User = {
        id: Date.now().toString(), // ID temporário simulado
        nome: nome,
        email: email
      };
      
      // Salvar o usuário no localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      router.push('/'); // Redirecionar para a página inicial após registro
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao realizar cadastro';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Função de logout
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  // Fornecendo o contexto
  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
} 