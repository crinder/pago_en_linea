import { React, useState } from 'react'
import { IconCards, IconInvoice, IconId } from '../utils/Icons'

const v_steps = [
  {
    id: 1,
    title: "Identificación",
    description: "Ingresa tus datos",
    icon: <IconId className="w-6 h-6 text-emerald-500" />
  },
  {
    id: 2,
    title: "Facturas",
    description: "Selecciona facturas",
    icon: <IconInvoice className="w-6 h-6 text-emerald-500" />,
  },
  {
    id: 3,
    title: "Pago",
    description: "Completa el pago",
    icon: <IconCards className="w-6 h-6 text-emerald-500" />
  },
]

const Steps = ({ currentStep }) => {
  return (
    <section>
      <div className="flex justify-center">
        <div className="flex items-center max-w-2xl w-full px-4 justify-center">
          {v_steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              {/* Step Circle */}
              <div className="flex flex-col items-center relative">
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-500 ease-out relative z-10
          ${currentStep > step.id
                      ? "bg-gradient-to-br from-emerald-500 to-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-500/25 scale-110 animate-pulse"
                      : currentStep === step.id
                        ? "bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-500 text-emerald-600 shadow-lg shadow-emerald-500/20 scale-105 ring-4 ring-emerald-500/20"
                        : "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-300 text-gray-400 hover:border-gray-400 hover:scale-105"
                    }`}
                >
                  {currentStep > step.id ? (
                    <svg className="w-7 h-7 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <div className={`${currentStep === step.id ? "animate-pulse" : ""}`}>{step.icon}</div>
                  )}
                </div>

                {/* Step Text */}
                <div className="mt-3 text-center">
                  <div className={`text-sm font-bold transition-all duration-300 transform
          ${currentStep >= step.id ? "text-emerald-600 scale-105" : "text-gray-400"}`}>
                    {step.title}
                  </div>
                  <div className={`text-xs transition-all duration-300 mt-1
          ${currentStep >= step.id ? "text-emerald-500 opacity-100" : "text-gray-400 opacity-70"}`}>
                    {step.description}
                  </div>
                </div>
              </div>


              {/* Connector Line */}
              {index < v_steps.length - 1 && (


                <div className="relative flex-1 min-w-[40px] h-1 mx-2 mb-12">
                  {/* Línea base */}
                  <div className="absolute inset-0 bg-green-200 rounded-full" />

                  {/* Línea de progreso */}
                  <div
                    className="absolute top-0 left-0 h-1 rounded-full transition-all duration-500 ease-out"
                    style={{
                      width:
                        currentStep > step.id
                          ? "100%"
                          : currentStep === step.id
                            ? "50%"
                            : "0%",
                      background:
                        currentStep >= step.id
                          ? "linear-gradient(to right, #34d399, #10b981)"
                          : "transparent",
                    }}
                  />

                  {/* Brillo animado */}
                  {currentStep > step.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse pointer-events-none" />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section >
  )
}

export default Steps