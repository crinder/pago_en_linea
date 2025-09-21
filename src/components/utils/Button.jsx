import React from 'react'

const Button = ({ action, label = "Continuar" }) => {
    return (
        <div className='text-center'>
            <button className='block p-3 rounded-xl bg-colorGreen text-black font-semibold text-white hover:cursor-pointer hover:bg-colorGreen hover: -translate-y-1 hover:scale-110
                                transition delay-150 duration-300 ease-in-out'
                onClick={action}>{label}</button>
        </div>
    )
}

export default Button