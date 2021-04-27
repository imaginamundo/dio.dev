import Sharer from 'components/Sharer.jsx';
import styles from './Post.module.css';

function Post({ post }) {
  return (
    <article className="h-entry">
      <header className={ styles.header }>
        <p>
          <span className={ styles.icon }>
            { post.icon }
            <Sharer title={ post.title } />
          </span>
        </p>
        <h1 className={ `p-name ${ styles.title }` }>{ post.title }</h1>
        <p className={ styles.date }>
          <time dateTime={ post.date.iso } className="dt-published">
            { post.date.formated }
          </time>
        </p>
        
      </header>
      <section className={ styles.summary }aria-label="summary">
        <p className={ `p-summary ${ styles.summary }` }>{ post.summary }</p>
      </section>
      <section 
        className="content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  ); 
}

export default Post;