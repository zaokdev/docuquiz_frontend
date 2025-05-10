/* eslint-disable prettier/prettier */
import React from 'react'
import {Form} from "@heroui/form"
import { Input } from '@heroui/input'
import { Button } from '@heroui/button'

const RegisterForm = () => {
  return (
    <main className='container flex mx-auto items-center justify-center border max-h-auto'>
    <div className='grid grid-cols-12 p-12'>
        <Form
      className="w-full max-w-xs flex flex-col gap-4 col-span-6"
      onSubmit={(e:any) => {
        e.preventDefault();

      }}
    >
      <Input
        isRequired
        errorMessage="Please enter a valid username"
        label="Username"
        labelPlacement="outside"
        name="username"
        placeholder="Enter your username"
        type="text"
        size='lg'
      />
        <Input
        isRequired
        errorMessage="Please enter email"
        label="Email"
        labelPlacement="outside"
        name="email"
        placeholder="Enter your email"
        type="email"
        size='lg'
      />
      <Input
        isRequired
        errorMessage="Please enter password"
        label="Password"
        labelPlacement="outside"
        name="password"
        placeholder="Enter your password"
        type="password"
        size='lg'
      />

      <div className="flex gap-2">
        <Button color="primary" type="submit" size='lg'>
          Registrar
        </Button>
      </div>
    </Form>
    <img       
    alt="HeroUI hero Image"
      src="https://heroui.com/images/hero-card-complete.jpeg"
      className='col-span-6 rounded-r-3xl'/>
    </div>
    </main>
  )
}

export default RegisterForm