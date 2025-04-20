import { X, ChevronDown } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"
import { useState } from "react"

const MobileMenu = ({ onClose }: { onClose: () => void }) => {
    const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

    const toggleCategory = (category: string) => {
        setExpandedCategories(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity">
            <div className="bg-white h-full w-full overflow-y-auto animate-slide-in-right">
                <div className="flex justify-between items-center p-5 border-b">
                    <h3 className="text-xl font-medium">Меню</h3>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={onClose}
                        className="p-1"
                    >
                        <X className="w-6 h-6" />
                    </Button>
                </div>

                <div className="py-2">
                    <Link href="/catalog" className="block px-5 py-3 border-b border-gray-100">
                        Каталог
                    </Link>

                    <div className="border-b border-gray-100">
                        <div 
                            className="flex justify-between items-center px-5 py-3 cursor-pointer"
                            onClick={() => toggleCategory('women')}
                        >
                            <span>Женщинам</span>
                            <ChevronDown className={`w-5 h-5 transition-transform ${expandedCategories['women'] ? 'rotate-180' : ''}`} />
                        </div>
                        {expandedCategories['women'] && (
                            <div className="bg-gray-50 py-2 px-8">
                                <div className="py-2">Парфюмерия</div>
                                <div className="py-2">Тестеры</div>
                                <div className="py-2">Мини-версии</div>
                            </div>
                        )}
                    </div>

                    <div className="border-b border-gray-100">
                        <div 
                            className="flex justify-between items-center px-5 py-3 cursor-pointer"
                            onClick={() => toggleCategory('men')}
                        >
                            <span>Мужчинам</span>
                            <ChevronDown className={`w-5 h-5 transition-transform ${expandedCategories['men'] ? 'rotate-180' : ''}`} />
                        </div>
                        {expandedCategories['men'] && (
                            <div className="bg-gray-50 py-2 px-8">
                                <div className="py-2">Парфюмерия</div>
                                <div className="py-2">Тестеры</div>
                                <div className="py-2">Мини-версии</div>
                            </div>
                        )}
                    </div>

                    <div className="border-b border-gray-100">
                        <div 
                            className="flex justify-between items-center px-5 py-3 cursor-pointer"
                            onClick={() => toggleCategory('brands')}
                        >
                            <span>Бренды</span>
                            <ChevronDown className={`w-5 h-5 transition-transform ${expandedCategories['brands'] ? 'rotate-180' : ''}`} />
                        </div>
                        {expandedCategories['brands'] && (
                            <div className="bg-gray-50 py-2 px-8">
                                <div className="py-2">A-Z</div>
                                <div className="py-2">Популярные</div>
                                <div className="py-2">Новинки</div>
                            </div>
                        )}
                    </div>

                    <Link href="/home-perfume" className="block px-5 py-3 border-b border-gray-100">
                        Парфюм для дома
                    </Link>

                    <Link href="/new" className="block px-5 py-3 border-b border-gray-100">
                        Новинки
                    </Link>

                    <div className="border-b border-gray-100">
                        <div 
                            className="flex justify-between items-center px-5 py-3 cursor-pointer"
                            onClick={() => toggleCategory('sales')}
                        >
                            <span>Скидки</span>
                            <ChevronDown className={`w-5 h-5 transition-transform ${expandedCategories['sales'] ? 'rotate-180' : ''}`} />
                        </div>
                    </div>
                </div>

                <div className="mt-4 border-t pt-4">
                    <Link href="/" className="block px-5 py-2">Главная</Link>
                    <Link href="/brands" className="block px-5 py-2">Бренды</Link>
                    <Link href="/contacts" className="block px-5 py-2">Контакты</Link>
                    <Link href="/about" className="block px-5 py-2">О компании</Link>
                    <Link href="/promo" className="block px-5 py-2">Акции</Link>
                </div>

                <div className="flex gap-5 p-5 mt-4 border-t">
                    <a href="https://vk.com" className="text-gray-600 hover:text-gray-900">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M21.579 6.855c.14-.465 0-.806-.662-.806h-2.193c-.558 0-.815.295-.953.619 0 0-1.115 2.719-2.695 4.482-.51.513-.743.675-1.021.675-.139 0-.341-.162-.341-.627V6.855c0-.558-.161-.806-.626-.806H9.642c-.348 0-.558.258-.558.504 0 .528.788.65.869 2.138v3.228c0 .707-.128.836-.406.836-.743 0-2.551-2.729-3.624-5.853-.21-.606-.42-.855-.98-.855H2.752c-.627 0-.752.295-.752.619 0 .582.743 3.462 3.461 7.271 1.812 2.601 4.363 4.011 6.687 4.011 1.393 0 1.565-.313 1.565-.853v-1.966c0-.626.133-.752.574-.752.324 0 .882.164 2.183 1.417 1.486 1.486 1.732 2.153 2.567 2.153h2.192c.626 0 .939-.313.759-.932-.197-.615-.907-1.51-1.849-2.569-.512-.604-1.277-1.254-1.51-1.579-.325-.418-.232-.604 0-.976.001 0 2.672-3.765 2.949-5.046z"/>
                        </svg>
                    </a>
                    <a href="https://instagram.com" className="text-gray-600 hover:text-gray-900">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                    </a>
                    <a href="https://facebook.com" className="text-gray-600 hover:text-gray-900">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default MobileMenu;