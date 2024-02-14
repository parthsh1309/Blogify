import React from 'react'
import {FloatingInput, SecondaryBtn} from '../index'

function Login() {
  return (
    <div className='w-full h-96 flex items-center justify-center '>
      <div className='w-full h-full p-5 flex flex-col gap-5 justify-center'>
        <FloatingInput type='email' text='Email'/>
        <FloatingInput type='password' text='Password'/>
        <SecondaryBtn className='w-1/3 mx-auto flex' backgroundColor='yellow'>
          Submit
        </SecondaryBtn>
      </div>
    </div>
  )
}

export default Login