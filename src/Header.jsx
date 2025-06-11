import { useState } from 'react';
import { Menu, X, Home, User, Settings, Mail } from 'lucide-react';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold">MyApp</h1>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        <a href="#" className="flex items-center space-x-1 hover:text-blue-200 transition-colors">
                            <Home size={20} />
                            <span>Home</span>
                        </a>
                        <a href="#" className="flex items-center space-x-1 hover:text-blue-200 transition-colors">
                            <User size={20} />
                            <span>About</span>
                        </a>
                        <a href="#" className="flex items-center space-x-1 hover:text-blue-200 transition-colors">
                            <Mail size={20} />
                            <span>Contact</span>
                        </a>
                        <a href="#" className="flex items-center space-x-1 hover:text-blue-200 transition-colors">
                            <Settings size={20} />
                            <span>Settings</span>
                        </a>
                    </nav>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-white hover:text-blue-200 transition-colors"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden pb-4">
                        <nav className="flex flex-col space-y-2">
                            <a href="#" className="flex items-center space-x-2 py-2 hover:text-blue-200 transition-colors">
                                <Home size={20} />
                                <span>Home</span>
                            </a>
                            <a href="#" className="flex items-center space-x-2 py-2 hover:text-blue-200 transition-colors">
                                <User size={20} />
                                <span>About</span>
                            </a>
                            <a href="#" className="flex items-center space-x-2 py-2 hover:text-blue-200 transition-colors">
                                <Mail size={20} />
                                <span>Contact</span>
                            </a>
                            <a href="#" className="flex items-center space-x-2 py-2 hover:text-blue-200 transition-colors">
                                <Settings size={20} />
                                <span>Settings</span>
                            </a>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;