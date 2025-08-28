import { React, useEffect, useState } from 'react'
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Button from '../utils/Button';
import { useNavigate } from 'react-router-dom';
import { useWizardStore } from '../utils/Persists';
import useForm from '../Hooks/useForm';

const Invoices = () => {

  const navigate = useNavigate();

  const invoices = [
    {
      id: "1",
      number: "FAC-2024-001",
      amount: 150000,
      dueDate: "2024-01-15",
      description: "Servicios de consultoría",
      status: "pending",
      poliza: 'xxxxx'
    },
    {
      id: "2",
      number: "FAC-2024-002",
      amount: 75000,
      dueDate: "2024-01-10",
      description: "Mantenimiento de software",
      status: "overdue",
      poliza: 'zzzzz'
    },
    {
      id: "3",
      number: "FAC-2024-003",
      amount: 200000,
      dueDate: "2024-01-20",
      description: "Desarrollo de aplicación",
      status: "pending",
      poliza: 'ccccc'
    },
  ];

  const { step, setStep, formData, setFormData, completedSteps, markStepCompleted, resetWizard } = useWizardStore();
  const { values, handleChange, reset, handleCustomChange, setValue } = useForm();

  const handleNext = () => {
    navigate("/pago_en_linea/datafono");
  };

  const handleBack = () => {
    navigate("/pago_en_linea/datos_personales");
  }


 const handleInvoiceSelection = (invoice, checked) => {

  setSelectedInvoices((prev) => {
    let newSelection;
    let newCheck;

    const currentCheck = formData.facturaCheck || [];

    if (checked) {
      newSelection = [...prev, { id: invoice.id, datos: invoice }];
      newCheck = [...currentCheck, invoice.id];
    } else {
      newSelection = prev.filter((item) => item.id !== invoice.id);
      newCheck = currentCheck.filter((id) => id !== invoice.id);
    }

    setFormData({
      factura: newSelection,
      facturaCheck: newCheck,
    });

    return newSelection;
  });
};

  const [selectedInvoices, setSelectedInvoices] = useState([]);

  useEffect(() => {
    if(formData.factura){
      setSelectedInvoices(formData.factura);
    }
  },[]);



  const getTotalAmount = () => {

    let total = 0;

    selectedInvoices.map(invoice => {
      total += invoice.datos.amount
    });

    return total;

  }


  return (
    <div>
      <div className="space-y-6">
        <div className='flex flex-col gap-6 py-6 shadow-sm '>
          <div>
            <div className="flex items-center gap-2">
              Facturas Pendientes
            </div>
          </div>
          <div className='flex flex-col items-center'>
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-accent/5 transition-colors"
                >
                  <Checkbox
                    id={`invoice-${invoice.id}`}
                    checked={(formData.facturaCheck || []).includes(invoice.id)}
                    onCheckedChange={(checked) => {
                      handleInvoiceSelection(invoice, checked === true);
                    }}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"

                  />
                  <label htmlFor={`invoice-${invoice.id}`} className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Factura: {invoice.number} de la poliza {invoice.poliza}</h3>
                        <p className="text-sm text-muted-foreground">
                          Fecha de vencimiento: {new Date(invoice.dueDate).toLocaleDateString("es-CO")}
                        </p>
                        <p className="text-sm font-semibold">Monto: {invoice.amount}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold"></p>

                      </div>
                    </div>
                  </label>
                </div>
              ))}
            </div>

            {selectedInvoices.length > 0 && (
              <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total a pagar:</span>
                  <span className="text-xl font-bold text-primary">{(getTotalAmount())}</span>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Facturas seleccionadas: {selectedInvoices.length}
                </div>
              </div>
            )}

            <div className="flex gap-4 mt-6 items-center">
              <Button action={handleBack} label={'Regresar'} />
              <Button action={handleNext} />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Invoices