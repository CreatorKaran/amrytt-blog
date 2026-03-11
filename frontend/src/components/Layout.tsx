import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-200 py-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <a 
            href="/" 
            className="text-sm font-semibold tracking-wider text-gray-600 hover:text-blue-600 transition-colors"
          >
            HOME / ARTICLES
          </a>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
