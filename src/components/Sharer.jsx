import { useEffect, useState, useRef } from 'react';
import styles from './Sharer.module.css';

const Sharer = ({ title }) => {
  const urlInput = useRef(null);
  const [ url, setUrl ] = useState(null);
  const [ open, setOpen ] = useState(false);
  const safeUrl = encodeURIComponent(url);

  const shareOptions = {
    ['WhatsApp']: `whatsapp://send?text=${ title } ${ safeUrl }`,
    ['Twitter']: `https://twitter.com/intent/tweet?url=${ safeUrl }&text=${ title }`,
    ['Facebook']: `http://www.facebook.com/sharer/sharer.php?u=${ safeUrl }`,
    ['LinkedIn']: `http://www.linkedin.com/shareArticle?mini=true&amp;url=${ safeUrl }`,
    ['E-mail']: `mailto:?Subject=${ title }&amp;Body=${ url }`
  }

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  function share() {
    if (navigator.share) {
      navigator.share({
        title,
        url
      });
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
    <div class={ styles.share }>
      <button onClick={ share }>
        Compartilhar
      </button>
      {
        open &&
        <span class={ styles.shareDialog }>
          <button onClick={ closeDialog }>
            ×
          </button>
          {
            Object.entries(shareOptions).map(([ socialNetwork, url ]) => {
              return (
                <a href={ url } className={ styles.shareLink }>
                  { socialNetwork }
                </a>
              );
            })
          }
          <input
            type="text"
            ref={ urlInput }
            value={ url }
            readonly="readonly"
            className={ styles.inputUrl }
          />
          <button onClick={ copyUrl }>Copiar url</button>
        </span>
      }
    </div>
  );
}

export default Sharer;