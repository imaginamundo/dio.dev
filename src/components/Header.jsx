import React from 'react';
import Link from 'next/link';

import styles from './Header.module.css';

function Header() {
  return (
    <header className={ styles.header }>
      <Link href="/">
        <a
          title="Ir para página inicial"
        >
          <strong>dio.dev</strong>
        </a>
      </Link>
      <nav className={ styles.menu }>
        <a
          href="https://github.com/imaginamundo"
          title="Abrir GitHub numa nova aba"
          target="_blank"
          rel="noopener"
          className={ styles.menuItem }
        >
          Github
        </a>
        { ' ' }
        <a
          href="https://instagr.am/fotografolixo"
          title="Abrir Instagram numa nova aba"
          target="_blank"
          rel="noopener"
          className={ styles.menuItem }
        >
          Instagram
        </a>
      </nav>
    </header>
  );
}

export default Header;