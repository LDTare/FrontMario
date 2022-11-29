import React, {useState}from "react";
import hospi1 from "../images/hospi1.jpg";
import hospi4 from "../images/hospi4.jpg";
import hospi5 from "../images/hospi5.jpg";
import hospi6 from "../images/hospi6.jpg";
import hospi7 from "../images/hospi7.jpg";
import hospi8 from "../images/hospi8.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import hospi3 from '../images/hospi3.jpg';
import { Galleria } from 'primereact/galleria';

const Home = () => {

  const [images] = useState([hospi1, hospi3, hospi4, hospi5, hospi5, hospi6, hospi7, hospi8]);
  const responsiveOptions = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];
const itemTemplate = (images) => {
  return <img src={images} style={{ width: '120%', display: 'block' }} />;
}
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
      <div className="about-desc">
          <Galleria value={images} responsiveOptions={responsiveOptions} numVisible={5} style={{ maxWidth: '750px' }}
                        showThumbnails={false} autoPlay circular showIndicators changeItemOnIndicatorHover showIndicatorsOnItem item={itemTemplate} />
      </div>
    </div><div>
        <footer>
          <p>&copy;Todos los derechos reservados :: Aguilar, López, Galicia, Aldamas :: 2022</p>
        </footer>
      </div></>
  );
};

export default Home;