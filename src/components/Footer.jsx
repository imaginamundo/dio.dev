import React from 'react';

import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={ styles.footer }>
      <p>Criado por <strong>Diogo Ferreira Fernandes</strong></p>
      <p>
        <Link href="/analytics">
          <a>Analytics</a>
        </Link>
      </p>
    </footer>
  );
}

