import logo from './logo.svg';
import './App.css';
import Header from './Header.js';
import MainSection from './MainSection.js';
import Footer from './Footer.js';

//esta es la parte principal de nuestra pagina. Abajo definimos varios componentes como Header, MainSection y Footer, que son las partes de nuestra paginaweb
//tambien importamos otros archivos que lo que hacen es permitirnos editar los componentes independientemente sin que nuestro codigo sea muy largo o un desorden
//tambien para cada archivo .js importamos un archivo .css que nos permite cambiarle el diseño.

function App() {
  return (
    <div className="App">

    

          <Header />
          <MainSection />
          <Footer />
          

    </div>
  );
}

export default App;
