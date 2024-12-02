import React from 'react'

const Footer = () => {
  return (
    <div className='flex mt-auto'>
      <div className='flex justify-between items-center w-full absolute left-0 p-10 bg-slate-300'>

        <p className='text-sm text-gray-500 font-bold'>Developed by Thiha Zaw</p>
        <p className='text-sm text-gray-500'>Copyright &copy; {new Date().getFullYear()}</p>
        <p className='text-sm text-gray-500'>We take care of your privacy</p>
      </div>
    </div>
  )
}

export default Footer