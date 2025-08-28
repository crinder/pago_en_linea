import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Params from '../Pages/Params';
import Invoices from '../Pages/Invoices';
import Pay from '../Pages/Pay';
import Header from '../General/Header';

const Content = () => {
  const { step } = useParams();

  const renderStep = () => {
    switch (step) {
      case 'datos_personales': return <Params />;
      case 'facturas': return <Invoices />;
      case 'datafono': return <Pay />;
      default: return <div>Paso inválido</div>;
    }
  };

  return (
    <div className='flex mt-10 flex-col'>
      <AnimatePresence mode="wait">
        <motion.div
          key={step} // ← esto es lo que activa la animación al cambiar ruta
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
        >
            <Header/>
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Content;