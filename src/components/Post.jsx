import Sharer from 'components/Sharer.jsx';
import styles from './Post.module.css';

function Post({ post }) {
  return (
    <article className="h-entry">
      <header className={ styles.header }>
        <data className="u-url" href={ `https://dio.dev/${ post.slug }` } />
        <p>
          <span className={ styles.icon }>
            { post.icon }
            <Sharer title={ post.title } />
          </span>
        </p>
        <h1 className={ `p-name ${ styles.title }` }>{ post.title }</h1>
        <p className={ styles.date }>
          <time dateTime={ post.createdAt.iso } className="dt-published">
            { post.createdAt.formated }
          </time>
        </p>
      </header>
      {
        !!post.updatedAt?.formated &&
        <section className={ styles.updatedAt }>
          <p>Atualizado no dia <b><time dateTime={ post.updatedAt.iso }>{ post.updatedAt.formated }</time>:</b> { post.updatedAt.reason }</p>
        </section>
      }
      <section className={ styles.summary }aria-label="summary">
        <p className={ `p-summary ${ styles.summary }` }>{ post.summary }</p>
      </section>
      <section 
        className="content e-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  ); 
}

export default Post;