import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <header className="layout__header">
        <div className="layout__container">
          <a href="/" className="layout__logo">HOME / ARTICLES</a>
        </div>
      </header>
      <main className="layout__main">{children}</main>
    </div>
  );
}
