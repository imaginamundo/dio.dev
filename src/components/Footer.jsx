import React from 'react';
import Link from 'next/link';

import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={ styles.footer }>
      <p>Criado por <strong><a href="https://dio.dev/" className="h-card u-author p-name">Diogo Ferreira Fernandes</a></strong></p>
      <p>
        <Link href="/analytics">
          <a>Analytics</a>
        </Link>
      </p>
    </footer>
  );
}

