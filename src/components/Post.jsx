import React from 'react';

import styles from './Post.module.css';

function Post({ post }) {
  return (
    <article>
      <header className={ styles.header }>
        <p className={ styles.icon }>{ post.icon }</p>
        <h1 className={ styles.title }>{ post.title }</h1>
        <p className={ styles.date }>
          <time dateTime={ post.date.iso }>
            { post.date.formated }
          </time>
        </p>
      </header>
      <section className={ styles.summary }aria-label="summary">
        <p className={ styles.summary }>{ post.summary }</p>
      </section>
      <section 
        className="content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  ); 
}

export default Post;