import { React, useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { z } from "zod";
import Button from '../utils/Button';
import { useNavigate } from 'react-router-dom';
import useForm from '../Hooks/useForm';
import { useWizardStore } from '../utils/Persists';
import Invoices from './Invoices';
import { IconSearch } from '../utils/Icons';


const Params = () => {

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { values, handleChange, reset, handleCustomChange, setValue } = useForm({ identification: "" });
  const { step, setStep, formData, setFormData, completedSteps, markStepCompleted, resetWizard } = useWizardStore();
  const [loading, setLoading] = useState(false);
  const [factura, setFactura] = useState(false);

  const schema = z.object({
    identification: z.string().regex(/^\d+$/, "Solo se permiten números").min(5, "Debe tener al menos 5 dígitos").max(14, "Debe tener maximo 14 dígitos"),
  });

  const handleNext = () => {

    // Limpio el persist
    resetWizard();

    

    setError("");
    console.log("Datos válidos:", result.data);
    setFormData(values);
    setStep('/pago_en_linea/facturas');
    markStepCompleted('/pago_en_linea/facturas');
    navigate("/pago_en_linea/facturas");

  };

  useEffect(() => {
    setValue("tipo_identificacion", "system");

  }, []);

  useEffect(() => {
    const result = schema.safeParse(values);

    if (!result.success) {
      const issue = result.error?.issues.find(i => i.path[0] === "identification");
      setError(issue?.message || "");
    } else {
      setError(""); // Limpia el error si el campo es válido
    }
  }, [values.identification]);

  const buscar = () => {
    
    const result = schema.safeParse(values);

    if (!result.success) {
      const issue = result.error?.issues.find(i => i.path[0] === "identification");
      setError(issue?.message || "Error desconocido");
      return;
    }
    
    setLoading(true);


    setTimeout(() => {
      setLoading(false);
      setFactura(true);
    }, 5000);
  }


  return (
    <section id='parametros' className='flex flex-col mt-10 gap-12 justify-center items-center'>
      <div className='flex gap-8'>
        <Select className='select__option' onValueChange={(val) => handleCustomChange("tipo_identificacion", val)}
          defaultValue="f"
          name="tipo_identificacion">
          <SelectTrigger className="w-[180px] p-[1.6rem]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="p">Pasaporte</SelectItem>
            <SelectItem value="j">Juridico</SelectItem>
            <SelectItem value="f">Fisico</SelectItem>
          </SelectContent>
        </Select>


        <div className="relative w-full">
          <input
            type="text"
            id="identification"
            name='identification'
            onChange={handleChange}
            placeholder=" "
            className="peer w-full border bg-transparent border-gray-300 rounded-md px-4 pt-6 pb-2 text-sm text-gray-900 placeholder-transparent focus:border-blue-500 focus:outline-none "
            value={values.identification || ""}
            maxLength={14}
          />
          <label
            htmlFor="identification"
            className="absolute left-3 bg-white px-1 text-gray-500 text-base transition-all duration-200 ease-in-out
                                   peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                                   peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-500
                                   peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-blue-500">
            Identificacion
          </label>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <div>
          <div
            className="bg-colorGreen hover:scale-110  transition-all duration-300 hover: cursor-pointer text-accent-foreground font-semibold px-8 py-4 rounded-xl"
            size="lg"
            disabled={loading}
            onClick={buscar}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="relative">
                  <IconSearch className="h-5 w-5 animate-pulse opacity-60" />
                  <div className="absolute inset-0 animate-ping">
                    <IconSearch className="h-5 w-5 opacity-20" />
                  </div>
                </div>
                <span className="animate-pulse">Buscando...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 group">
                <IconSearch className=" " />
                <span className="hidden sm:inline transition-all duration-1000 ">Consultar</span>
              </div>
            )}
          </div>
        </div>
      </div>


      {factura &&
        <div>
          <Invoices />
        </div>

      }

    </section>
  )
}

export default Params