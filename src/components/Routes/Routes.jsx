// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Params from '../Pages/Params'
import Invoices from '../Pages/Invoices'
import Pay from '../Pages/Pay'
import Content from './General/Content';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/pago_en_linea/1" />} />
      
      <Route path="/pago_en_linea/:step" element={<Content />}>
        <Route path="1" element={<Params />} />
        <Route path="2" element={<Invoices />} />
        <Route path="3" element={<Pay />} />
      </Route>
    </Routes>
  </BrowserRouter>

);

export default App;