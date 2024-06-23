

"use client";




import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from './authContext'; // Importación desde la misma carpeta
import { Button } from '@/components/ui/button';
import SignupForm from '@/components/SignupForm';
import SigninForm from '@/components/SigninForm';
import { MenuIcon } from '@/components/ui/icons';



const Header = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
    const [isSigninModalOpen, setIsSigninModalOpen] = useState(false);

    useEffect(() => {}, [isAuthenticated, user]);

    return (
        <header className="bg-gray-900 text-white px-4 lg:px-6 py-4 flex items-center justify-between relative">
            <Link href="/" className="flex items-center" prefetch={false}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span className="text-lg font-semibold ml-2">Servicios a Domicilio</span>
            </Link>

            <nav className="hidden lg:flex gap-6">
                {isAuthenticated ? (
                    <>
                        <Link href="/" className="hover:underline" prefetch={false}>Inicio</Link>
                        <Link href="/servicios" className="hover:underline" prefetch={false}>Servicios</Link>
                        <Link href="#" className="hover:underline" prefetch={false}>Mis Publicacioines</Link>
                        <Link href="#" className="hover:underline" prefetch={false}>Acerca de</Link>
                    </>
                ) : (
                    <>
                        <Link href="/" className="hover:underline" prefetch={false}>Inicio</Link>
                        <Link href="/about" className="hover:underline" prefetch={false}>Sobre Nosotros</Link>
                    </>
                )}
            </nav>

            <div className="flex gap-2">
                {isAuthenticated ? (
                    <div className="flex items-center gap-2">
                        <span>Bienvenido,</span>
                        <Button variant="outline" className="text-white hover:bg-white hover:text-gray-900" onClick={logout}>
                            Cerrar sesión
                        </Button>
                    </div>
                ) : (
                    <>
                        <Button variant="outline" className="text-white hover:bg-white hover:text-gray-900" onClick={() => setIsSigninModalOpen(true)}>
                            Iniciar sesión
                        </Button>
                        <Button className="bg-white text-gray-900 hover:bg-gray-900 hover:text-white" onClick={() => setIsSignupModalOpen(true)}>
                            Registrarse
                        </Button>
                    </>
                )}
            </div>

            <nav className="lg:hidden">
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-gray-800"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <MenuIcon className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </nav>

            <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} isAuthenticated={isAuthenticated} user={user} logout={logout} />

            {isSignupModalOpen && (
                <SignupForm onClose={() => setIsSignupModalOpen(false)} />
            )}

            {isSigninModalOpen && (
                <SigninForm onClose={() => setIsSigninModalOpen(false)} />
            )}
        </header>
    );
};


export default Header;

const MobileMenu = ({ menuOpen, setMenuOpen, isAuthenticated, user, logout }) => (
    <div className={`absolute top-16 right-0 bg-gray-900 w-64 flex flex-col items-start gap-4 p-4 z-50 ${menuOpen ? 'block' : 'hidden'}`}>
        {isAuthenticated ? (
            <>
                <Link href="/" className="hover:underline w-full text-left" prefetch={false} onClick={() => setMenuOpen(false)}>
                    Mi cuenta
                </Link>
                <Link href="/servicios" className="hover:underline w-full text-left" prefetch={false} onClick={() => setMenuOpen(false)}>
                    Servicios
                </Link>
                <Link href="#" className="hover:underline w-full text-left" prefetch={false} onClick={() => { setMenuOpen(false); logout(); }}>
                    Salir
                </Link>
            </>
        ) : (
            <>
                <Link href="/" className="hover:underline w-full text-left" prefetch={false} onClick={() => setMenuOpen(false)}>
                    Home
                </Link>
                <Link href="/servicios" className="hover:underline w-full text-left" prefetch={false} onClick={() => setMenuOpen(false)}>
                    Servicios
                </Link>
                <Link href="about" className="hover:underline w-full text-left" prefetch={false} onClick={() => setMenuOpen(false)}>
                    Acerca de nosotros
                </Link>
                <Link href="#" className="hover:underline w-full text-left" prefetch={false} onClick={() => setMenuOpen(false)}>
                    no logeado
                </Link>
            </>
        )}
    </div>
);
