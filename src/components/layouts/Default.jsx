import React from 'react';
import Header from 'components/Header.jsx';
import Footer from 'components/Footer.jsx';

import styles from './Default.module.css';

function Default(props) {
  return (
    <>
      <div className={ styles.default }>
        <Header />
      </div>
      <main>
        { props.children }
      </main>
      <div className={ styles.default }>
        <Footer />
      </div>
    </>
  );
}

export default Default;