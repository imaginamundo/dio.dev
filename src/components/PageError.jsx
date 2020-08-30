import React from 'react';

import styles from './PageError.module.css';

export default function PageError({ statusCode }) {
  const error = {
    404: 'Página não encontrada',
    500: 'Algum problema interno aconteceu'
  }[statusCode]

  return (
    <div className={ styles.error }>
      <p className={ styles.errorEmoji }><b>:(</b></p>
      <h1>
        Erro { statusCode }
      </h1>
      <p>{ error }</p>
    </div>
  )
}