import React from 'react';
import Link from 'next/link';

import styles from './Header.module.css';

function Header() {
  return (
    <header className={ `h-card ${ styles.header }` }>
      <Link href="/">
        <a
          title="Ir para página inicial"
          className="u-url"
        >
          <strong>dio.dev</strong>
        </a>
      </Link>
      <nav className={ `h-card ${ styles.menu }` }>
        <a
          href="https://github.com/imaginamundo"
          title="Abrir GitHub numa nova aba"
          target="_blank"
          rel="me"
          className={ `u-url ${ styles.menuItem }` }
        >
          Github
        </a>
        { ' ' }
        <a
          href="https://instagram.com/fotografolixo"
          title="Abrir Instagram numa nova aba"
          target="_blank"
          rel="me"
          className={ `u-url ${ styles.menuItem }` }
        >
          Instagram
        </a>
        { ' ' }
        <a
          href="https://twitter.com/dioruto"
          title="Abrir Twitter numa nova aba"
          target="_blank"
          rel="me"
          className={ `u-url ${ styles.menuItem }` }
        >
          Twitter
        </a>
      </nav>
    </header>
  );
}

export default Header;