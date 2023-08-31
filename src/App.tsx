import React from 'react';
import Header from './componets/Header';
import Footer from './componets/Footer';
import BuscaCep from './componets/BuscaCepForm';
import  Styles  from './App.module.css';



function App() {
  return (
    <div>
      <Header />

      <main className={Styles.main}>
        <BuscaCep />
      </main>


      <Footer/>
    </div>
  );
}

export default App;
