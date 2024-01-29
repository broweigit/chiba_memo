import "./app.scss"
import Navbar from "./components/navbar/Navbar";

const App = () => {
  return <div>
    <section id="Homepage">
      <Navbar/>
    </section>
    <section id="Parallax">Parallax</section>
    <section id="Service">Service</section>
    <section id="Portfolio">Portfolio1</section>
    <section>Portfolio2</section>
    <section>Portfolio3</section>
    <section id="Contact">Contact</section>
  </div>;
};

export default App;