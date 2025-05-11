/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState<any>();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: user, password }),
      credentials: "include",
    });
    console.log(response);

    if (!response.ok) {
      console.log(response);
      setError(response.statusText);
      console.log(await response.json());
      return;
    }

    navigate({
      pathname: "/",
    });
  };
  return (
    <main className="container flex flex-col mx-auto items-center justify-center border max-h-auto">
      <div className="grid grid-cols-12 p-12">
        <Form
          className="w-full max-w-xs flex flex-col gap-4 col-span-12 lg:col-span-6"
          onSubmit={handleSubmit}
        >
          <Input
            isRequired
            errorMessage="Please enter a valid username"
            label="Username"
            labelPlacement="outside"
            name="username"
            placeholder="Enter your username"
            type="text"
            size="lg"
            onValueChange={(e: any) => {
              setUser(e);
            }}
          />

          <Input
            isRequired
            errorMessage="Please enter password"
            label="Password"
            labelPlacement="outside"
            name="password"
            placeholder="Enter your password"
            type="password"
            size="lg"
            onValueChange={(e: any) => {
              setPassword(e);
            }}
          />
          <div className="flex gap-2">
            <Button color="primary" type="submit" size="lg">
              Iniciar Sesión
            </Button>
          </div>
        </Form>
        <img
          alt="HeroUI hero Image"
          src="https://heroui.com/images/hero-card-complete.jpeg"
          className="col-span-6 rounded-r-3xl lg:block hidden"
        />
      </div>
      {error && <span>{error}</span>}
    </main>
  );
};

export default LoginForm;
