'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaHome, FaDumbbell, FaCalendarAlt, FaChartLine, FaRunning, FaUser, FaSignOutAlt, FaCog } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems = [
    { href: '/', label: 'Home', icon: <FaHome className="text-lg" /> },
    { href: '/treinos', label: 'Treinos', icon: <FaDumbbell className="text-lg" /> },
    { href: '/exercicios', label: 'Exercícios', icon: <FaRunning className="text-lg" /> },
    { href: '/calendario', label: 'Calendário', icon: <FaCalendarAlt className="text-lg" /> },
    { href: '/progresso', label: 'Progresso', icon: <FaChartLine className="text-lg" /> },
  ];

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <header className="relative z-20">
      <div className="fixed w-full top-0 z-20 bg-[#121726] shadow-lg">
        <div className="container mx-auto flex items-center justify-between h-16">
          <Link href="/" className="flex-shrink-0 text-lg font-bold text-white transition-transform hover:scale-105">
            <Image 
              src="/trainerys_logo_white.png" 
              alt="TrainerYS Logo" 
              width={150} 
              height={45} 
              className="h-12 w-auto"
              priority
            />
          </Link>
          
          <nav className="flex-1 flex justify-center">
            <div className="flex space-x-4 md:space-x-6 lg:space-x-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href} className="relative">
                    <button 
                      className={cn(
                        'flex items-center gap-2 px-3 py-2 font-medium rounded-lg transition-all duration-200',
                        isActive 
                          ? 'text-white' 
                          : 'text-gray-400 hover:text-white'
                      )}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm hidden sm:inline">{item.label}</span>
                    </button>
                    {isActive && (
                      <motion.div 
                        layoutId="activeIndicator"
                        className="absolute -bottom-1 left-0 right-0 h-1 bg-[#4f46e5] mx-1"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>
          
          <div className="relative flex-shrink-0">
            <button 
              onClick={toggleUserMenu}
              className="flex items-center space-x-2 py-1 px-4 rounded-full border border-gray-700 bg-[#1c2435] hover:bg-[#262f45] transition-all duration-200"
              aria-label="Menu do usuário"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-md mr-2">
                  <span className="text-sm font-bold">
                    {user?.nome ? user.nome.charAt(0) : "S"}
                  </span>
                </div>
                <span className="text-white text-sm font-medium hidden sm:inline">
                  {user?.nome ? user.nome.split(' ')[0] : "Samuel"}
                </span>
              </div>
            </button>
            
            <AnimatePresence>
              {showUserMenu && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 bg-[#1c2435] border border-gray-700 rounded-lg shadow-lg py-1 z-50"
                >
                  {user ? (
                    <>
                      <div className="px-4 py-3 border-b border-gray-700">
                        <p className="text-sm font-semibold text-white">{user.nome}</p>
                        <p className="text-xs text-gray-400 mt-1">{user.email}</p>
                      </div>
                      <Link 
                        href="/perfil" 
                        className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-[#262f45] transition-colors"
                      >
                        <FaUser className="mr-3 text-gray-400" /> 
                        Meu Perfil
                      </Link>
                      <Link 
                        href="/configuracoes" 
                        className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-[#262f45] transition-colors"
                      >
                        <FaCog className="mr-3 text-gray-400" /> 
                        Configurações
                      </Link>
                      <div className="border-t border-gray-700 my-1"></div>
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-[#322631] flex items-center transition-colors"
                      >
                        <FaSignOutAlt className="mr-3" /> Sair
                      </button>
                    </>
                  ) : (
                    <>
                      <Link 
                        href="/login" 
                        className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-[#262f45] transition-colors"
                      >
                        <FaUser className="mr-3 text-gray-400" /> 
                        Entrar
                      </Link>
                      <Link 
                        href="/cadastro" 
                        className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-[#262f45] transition-colors"
                      >
                        <FaUser className="mr-3 text-gray-400" /> 
                        Cadastrar-se
                      </Link>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      <div className="h-16"></div>
    </header>
  );
} 