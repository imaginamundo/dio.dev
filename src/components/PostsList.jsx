import React from 'react';
import Link from 'next/link';

import styles from './PostsList.module.css';

function PostsList({ posts }) {
  return (
    <dl className={ styles.posts }>
      {
        posts.map(post => {
          return (
            <React.Fragment key={ post.slug }>
              <dt>
                <h2 className={ styles.postTitle }>
                  <Link href={ `/${ post.slug }` }>
                    <a title={ `Ir para o artigo ${ post.title }` }>
                      { post.icon } 
                      { ' ' }
                      <time dateTime={ post.date.iso }>
                        { post.date.formated }
                      </time>
                      { ' · ' }
                      <strong>{ post.title }</strong>
                    </a>
                  </Link>
                </h2>
              </dt>
              <dd>{ post.summary }</dd>
            </React.Fragment>
          );
        })
      }
    </dl>
  );
}

export default PostsList;