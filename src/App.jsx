import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Content from './components/General/Content';
import AnimatedPage from './components/utils/Animated';
import { AnimatePresence } from 'framer-motion';

const App = () => (
  <>
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <div className='flex items-center flex-col p-5 w-[100dvw] min-h-[100dvh] '>
          <Routes>
            <Route path="/" element={<AnimatedPage><Navigate to="/pago_en_linea/datos_personales" /></AnimatedPage>} />
            <Route path="/pago_en_linea/:step" element={<AnimatedPage><Content /></AnimatedPage>} />
          </Routes>
        </div>

      </AnimatePresence>
    </BrowserRouter>
  </>
);

export default App;