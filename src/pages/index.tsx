/* eslint-disable prettier/prettier */
import { button as buttonStyles } from "@heroui/theme";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useEffect, useState } from "react";
import { CircularProgress } from "@heroui/progress";
import { useNavigate } from "react-router-dom";

import DefaultLayout from "@/layouts/default";
import { title, subtitle } from "@/components/primitives";

export default function IndexPage() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | any>(null);
  const [isUploading, setIsUploading] = useState<boolean>();
  const [success, setSuccess] = useState<boolean>(false);

  const navigate = useNavigate();

  function handleFileChange(event: any): void {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsUploading(true);
    if (!file) {
      setError("No hay archivo seleccionado");

      return;
    }

    if (file.type !== "application/pdf") {
      setError("El archivo debe ser un PDF");

      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("El archivo es demasiado grande (máximo 10MB)");

      return;
    }

    setError(null);

    try {
      const formData = new FormData();

      formData.append("pdf", file);

      const response = await fetch("http://localhost:3000/api/read-pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        setError("Error al subir el archivo");
        setError(response)

        return;
      }

      const result = await response.json();

      localStorage.setItem("quizLocal", result);
      setSuccess(true);
    } catch (e:any) {
      setError("Hubo un error externo: " + e.message);
      setSuccess(false)
    } finally {
      setIsUploading(false);
    }
  }

  useEffect(() => {
    if (success) {
      navigate({
        pathname: "/answer",
        search: "?type=local",
      });
    }
  }, [success]);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <span className={title()}>Convierte PDFs en </span>
          <span className={title({ color: "blue" })}>quizzes&nbsp;</span>
          <br />

          <div className={subtitle({ class: "mt-4" })}>
            Potenciado con inteligencia artificial
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3 py-4">
          <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            <Input
              required
              accept=".pdf"
              className="mb-2"
              id="file-pdf"
              type="file"
              onChange={handleFileChange}
            />
            <Button
              className={buttonStyles({
                color: "primary",
              })}
              type="submit"
            >
              Subir
            </Button>
          </form>
        </div>
        {error && <span>{error}</span>}
        {isUploading && !error && <CircularProgress color="primary" />}
      </section>
    </DefaultLayout>
  );
}
