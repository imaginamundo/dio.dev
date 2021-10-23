import React from 'react';
import books from '../store/books.json'
import games from '../store/games.json'
import others from '../store/others.json'

import styles from './Store.module.css';

export default function Store() {
  const categories = [
    {
      label: 'Livros',
      path: '/store/books/',
      items: books
    },
    {
      label: 'Jogos',
      path: '/store/games/',
      items: games
    },
    {
      label: 'Outros',
      path: '/store/others/',
      items: others
    }
  ];

  return (
    <>
      <h1>Lojinha 🛒</h1>
      <p>Estou mudando de país, por isso estou vendendo as coisas bem baratinhas. Se tiver interesse, entra em contato comigo pelo Twitter, Instagram ou se tiver meu número, me envia uma mensagem.</p>
      <p>O frete dos produtos não esta incluido no preço mostrado.</p>
      {
        categories.map(category => (
          <div key={ `category-${ category.path }` }>
            <h2>{ category.label }</h2>
            <div className={ styles.store }>
              {
                category.items
                  .sort((a, b) => a.image.localeCompare(b.image))
                  .map((item, idx) => (
                    <div key={ `sale-${ item.image }` }>
                      <a
                        className={ styles.imageWrap }
                        href={ category.path + item.image + '.jpeg' }
                        target="_blank"
                      >
                        <img
                          className={ styles.image }
                          src={ category.path + item.image + '.jpeg' }
                          alt={ item.title }
                          width="100"
                          height="100"
                        />
                      </a>
                      <p><strong>{ item.title }</strong></p>
                      <p>R$ { item.price }</p>
                    </div>
                  ))
              }
            </div>
          </div>
        ))
      }
    </>
  );
}