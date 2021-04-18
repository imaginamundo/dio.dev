import { useEffect, useState, useRef } from 'react';
import styles from './Sharer.module.css';

const Sharer = ({ title }) => {
  const urlInput = useRef(null);
  const [ url, setUrl ] = useState(null);
  const [ open, setOpen ] = useState(false);
  const safeUrl = encodeURIComponent(url);

  const shareOptions = {
    'WhatsApp': `whatsapp://send?text=${ title } ${ safeUrl }`,
    'Twitter': `https://twitter.com/intent/tweet?url=${ safeUrl }&text=${ title }`,
    'Facebook': `http://www.facebook.com/sharer/sharer.php?u=${ safeUrl }`,
    'LinkedIn': `http://www.linkedin.com/shareArticle?mini=true&amp;url=${ safeUrl }`,
    'E-mail': `mailto:?Subject=${ title }&amp;Body=${ url }`
  }

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  function share() {
    if (navigator.share) {
      navigator
        .share({
          title,
          url
        })
        .catch(e => {});
    } else {
      setOpen(!open);
    }
  }

  function closeDialog() {
    setOpen(false);
  }

  function copyUrl() {
    urlInput.current.select();
    urlInput.current.setSelectionRange(0, 99999); 
    document.execCommand('copy');
  }

  return (
    <span className={ styles.share }>
      <button onClick={ share }>
        Compartilhar
      </button>
      {
        open &&
        <span className={ styles.shareDialog }>
          <button onClick={ closeDialog }>
            ×
          </button>
          {
            Object.entries(shareOptions).map(([ socialNetwork, url ]) => {
              return (
                <a href={ url } key={ `social-${ socialNetwork }` } className={ styles.shareLink }>
                  { socialNetwork }
                </a>
              );
            })
          }
          <input
            type="text"
            ref={ urlInput }
            value={ url }
            className={ styles.inputUrl }
            onFocus={ copyUrl }
            readOnly
          />
          <button onClick={ copyUrl } className={ styles.copyUrl }>Copiar URL</button>
        </span>
      }
    </span>
  );
}

export default Sharer;