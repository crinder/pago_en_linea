import React from 'react'
import Logo from "../../assets/img/LogoOceanicaSeguros_Mesa.png"

const Header = () => {
    return (
        <div className='flex justify-center flex-col items-center'>
            <div className=' p-15'>
                <section className='text-center '>
                    <div className='text-center w-[400px]'>
                        <img className='' src={Logo} alt="logo MNK SEGUROS" />
                    </div>
                </section>
            </div>


            <section className='mt-12 mb-5'>
                <div className='text-center'>
                    <h1>Pago en linea</h1>
                    <h3>Consulta y paga tus facturas pendientes de forma segura</h3>
                </div>
            </section>
        </div>
    )
}

export default Header