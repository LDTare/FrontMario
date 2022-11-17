import React from "react";
import hospi1 from "../images/hospi1.jpg";
import hospi4 from "../images/hospi4.jpg";
import hospi5 from "../images/hospi5.jpg";
import hospi6 from "../images/hospi6.jpg";
import hospi7 from "../images/hospi7.jpg";
import hospi8 from "../images/hospi8.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import hospi3 from '../images/hospi3.jpg';


const Home = () => {

  return (
    <><div className="about-container">
      <div className="about-desc">
        <h3>Hospital Nacional de Retalhuleu</h3>
        <p align="justify">
          Este centro médico es una entidad hospitalaria, que depende
          del Ministerio de Salud Pública y Asistencia Social de Guatemala, y es
          responsable de promover la atención en salud, con calidad y respeto a los
          pacientes que lo necesiten, mediante la atención en prevención, recuperación
          y rehabilitación de enfermedades. Así pues, cuentan con un recurso humano que
          hace un excelente uso de las tecnologías del establecimiento para tratar de
          mejorar la vida de quienes necesiten de los servicios médicos.
        </p>
      </div>
      <div>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-300"
              src={hospi1}
              width={510}
              height={370}
              alt="Second slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-300"
              src={hospi3}
              width={510}
              height={370}
              alt="Second slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-300"
              src={hospi4}
              width={510}
              height={370}
              alt="Second slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-300"
              src={hospi5}
              width={510}
              height={370}
              alt="Second slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-300"
              src={hospi6}
              width={510}
              height={370}
              alt="Second slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-300"
              src={hospi7}
              width={510}
              height={370}
              alt="Second slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-300"
              src={hospi8}
              width={510}
              height={370}
              alt="Second slide" />
          </Carousel.Item>
        </Carousel>
      </div>
    </div><div>
        <footer>
          <p>&copy;Todos los derechos reservados :: Aguilar, López, Galicia, Aldamas :: 2022</p>
        </footer>
      </div></>
  );
};

export default Home;