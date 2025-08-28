import React, { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useFormLocal from '../Hooks/useFormLocal';
import Button from '../utils/Button';
import { z } from 'zod'
import { IconMasterCard, IconAmexCard, IconVisaCard } from '../utils/Icons';
import { useNavigate } from 'react-router-dom';
import { useWizardStore } from '../utils/Persists';

const Pay = () => {

  const { step, setStep, formData, setFormData, completedSteps, markStepCompleted, resetWizard } = useWizardStore();
  const [selectedInvoices, setSelectedInvoices] = useState([]);

  const navigate = useNavigate();

  let schema = z.object({
    cvv: z
      .string()
      .regex(/^\d+$/, "Solo se permiten números")
      .min(3, "Debe tener al menos 3 dígitos")
      .max(3, "Máximo 3 dígitos"),
    titular_card: z.string().regex(/^[A-Za-z\s]+$/, "Solo letras y espacios"),
    number_card: z.string().regex(/^\d+$/, "Solo se permiten números").min(15, "Debe tener al menos 15 dígitos").max(16, "Máximo 16 dígitos")
  });

  const IconTypeCard = {
    visa: <IconVisaCard />,
    amex: <IconAmexCard />,
    mast: <IconMasterCard />
  }


  const [cardYear, setCardYears] = useState([]);
  const [cardNumber, setCardNumber] = useState();
  const yearDefault = new Date().getFullYear().toString();
  const [typeCard, setTypeCard] = useState([]);

  const { values, errors, handleChange, handleCustomChange, setValue, reset, validateAll } = useFormLocal(
    {
      titular_card: '',
      cvv: '',
      number_card: '',
      mes_card: '01',
      year_card: yearDefault,
    },
    schema
  );


  const array_mes = [
    { value: '01', label: 'Enero' },
    { value: '02', label: 'Febrero' },
    { value: '03', label: 'Marzo' },
    { value: '04', label: 'Abril' },
    { value: '05', label: 'Mayo' },
    { value: '06', label: 'Junio' },
    { value: '07', label: 'Julio' },
    { value: '08', label: 'Agosto' },
    { value: '09', label: 'Septiembre' },
    { value: '10', label: 'Octubre' },
    { value: '11', label: 'Novimienbre' },
    { value: '12', label: 'Diciembre' }
  ]

  const getYearsOptions = (range = 10) => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: range }, (_, i) => {
      const year = currentYear + i;
      return {
        value: year.toString(),
        label: year.toString()
      };
    });
  };

  useEffect(() => {
    setCardYears(getYearsOptions());
    setValue("mes_card", '01');
    setValue("year_card", yearDefault);
  }, []);

  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, "") // eliminar todo lo que no sea dígito
      .replace(/(.{4})/g, "$1 ") // insertar espacio cada 4 dígitos
      .trim(); // eliminar espacio final
  }

  useEffect(() => {

    if (values.number_card) {
      setCardNumber(formatCardNumber(values.number_card));
      setTypeCard(getCardType(values.number_card || ""));

    } else {
      setCardNumber('•••• •••• •••• ••••');
    }
  }, [values.number_card]);

  const handleNext = () => {
    validateAll();
    const isValid = validateAll();
    if (!isValid) {
      console.log("Formulario inválido:", errors);
      return;
    }

  }

  const handleBack = () => {
    navigate("/pago_en_linea/facturas");
  }

  const getCardType = (number) => {
    const cleaned = number.replace(/\s+/g, "");

    if (/^4\d{0,15}$/.test(cleaned)) return "visa";
    if (/^5[1-5]\d{0,14}$/.test(cleaned)) return "mast";
    if (/^2(2[2-9]|[3-6]|7[01]|720)\d{0,12}$/.test(cleaned)) return "mast";
    if (/^3[47]\d{0,13}$/.test(cleaned)) return "amex"; // ← aquí estaba el error

    return "Desconocida";
  };

  const getTotalAmount = () => {

    let total = 0;

    selectedInvoices.map(invoice => {
      total += invoice.datos.amount
    });

    return total;

  }

  useEffect(() => {
    if (formData.factura) {
      setSelectedInvoices(formData.factura);

    }

  }, [])

  return (
    <section className='flex flex-col mb-20 justify-center items-center gap-10 mt-10 '>

      <div className='flex gap-5'>
        <div id='card__card' className="hidden w-[300px] md:h-[200px] md:w-[350px]  md:block  rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6 shadow-xl relative font-sans">

          <div className="absolute top-4 right-6 flex items-center gap-3 w-14 h-14">
            {IconTypeCard[typeCard]}
          </div>

          <div className="mt-16 text-xl tracking-widest font-mono">
            {cardNumber}
          </div>
          <div className='flex flex-col'>

            <div className="flex justify-between items-center mt-6 text-sm">
              <div>
                <div className="text-gray-400 text-xs">Titular</div>
                <div className="font-semibold">{values.titular_card || "Nombre Apellido"}</div>
              </div>
              <div>
                <div className="text-gray-400 text-xs">Expira</div>
                <div className="font-semibold">
                  {values.mes_card || "MM"}/{values.year_card || "YY"}
                </div>
              </div>
            </div>
            <div className='bottom-4 right-6 text-lg font-bold italic'>

            </div>

          </div>
        </div>

        <div className='flex flex-col gap-5 '>

          <div>
            <div className='flex flex-row relative w-full'>
              <input
                type="text"
                id="titular_card"
                name='titular_card'
                placeholder=" "
                onChange={handleChange}
                className="peer w-full border bg-transparent border-gray-300 rounded-md px-4 pt-6 pb-2 text-sm text-gray-900 placeholder-transparent focus:border-blue-500 focus:outline-none "
                value={values.titular_card || ""}
              />
              <label
                htmlFor="titular_card"
                className="absolute left-3 bg-white px-1 text-gray-500 text-base transition-all duration-200 ease-in-out
                                   peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                                   peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-500
                                   peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-blue-500">
                Titular tarjeta
              </label>
            </div>

            {errors.titular_card && (
              <p className="text-red-500 text-sm mt-1">{errors.titular_card}</p>
            )}

          </div>

          <div className='flex flex-row gap-4'>
            <div className='basis-3/4'>
              <div className=' relative '>
                <input
                  type="text"
                  id="number_card"
                  name='number_card'
                  placeholder=" "
                  onChange={handleChange}
                  className="peer w-full border bg-transparent border-gray-300 rounded-md px-4 pt-6 pb-2 text-sm text-gray-900 placeholder-transparent focus:border-blue-500 focus:outline-none "
                  value={values.number_card || ""}
                  maxLength={16}
                />
                <label
                  htmlFor="number_card"
                  className="absolute left-3 bg-white px-1 text-gray-500 text-base transition-all duration-200 ease-in-out
                                   peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                                   peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-500
                                   peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-blue-500">
                  Numero tarjeta
                </label>
              </div>
            </div>

            <div className='basis-1/4'>
              <div className=' relative'>
                <input
                  type="text"
                  id="cvv"
                  name='cvv'
                  placeholder=" "
                  onChange={handleChange}
                  values={values.cvv || ""}
                  className="peer w-full border bg-transparent border-gray-300 rounded-md px-4 pt-6 pb-2 text-sm text-gray-900 placeholder-transparent focus:border-blue-500 focus:outline-none "
                  maxLength={3}
                />
                <label
                  htmlFor="cvv"
                  className="absolute left-3 bg-white px-1 text-gray-500 text-base transition-all duration-200 ease-in-out
                                   peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                                   peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-500
                                   peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-blue-500">
                  CVV
                </label>
              </div>
              {errors.cvv && (
                <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
              )}
            </div>
          </div>

          <div className='flex flex-row relative gap-4'>

            <div className='basis-3/4'>
              <div className=''>
                <Select className='select__option' defaultValue="01" onValueChange={(val) => handleCustomChange("mes_card", val)}
                  name='mes_card'>
                  <SelectTrigger className="w-[180px] p-[1.6rem]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {array_mes.map(({ value, label }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='basis-1/4'>
              <div className=''>
                <Select className='select__option' defaultValue={yearDefault} onValueChange={(val) => handleCustomChange("year_card", val)}
                  name='year_card'>
                  <SelectTrigger className="w-[180px] p-[1.6rem]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cardYear && cardYear.map(({ value, label }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {selectedInvoices.length > 0 && (

          <span className="text-xl font-bold text-primary">Total a pagar: {(getTotalAmount())}</span>

        )}
      </div>
      <div className='m-10 flex gap-5'>
        <Button action={handleBack} label={'Regresar'} />
        <Button action={handleNext} label={'Procesar'} />
      </div>

    </section>
  )
}

export default Pay