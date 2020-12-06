import React from 'react';
import Link from 'next/link';
import DarkMode from './DarkMode.jsx';

import styles from './Breadcrumb.module.css';

export default function Breadcrumb({ items = [] }) {
  return (
    <nav className={ styles.breadcrumb } aria-label="Breadcrumb">
      <ol>
        <li>
          <Link href="/">
            <a>Página inicial</a>
          </Link>
        </li>
        {
          items.map(item => {
            return (
              <li key={ `breadcrumb-${ item.href }` }>
                {
                  item.current && (
                    <a href={ item.href } aria-current="page">
                      { item.label }
                    </a>
                  )
                }
                {
                  !item.current && (
                    <Link href={ item.href }>
                      <a>{ item.label }</a>
                    </Link>
                  )
                }
              </li>
            )
          })
        }
      </ol>
      <DarkMode />
    </nav>
  );
}