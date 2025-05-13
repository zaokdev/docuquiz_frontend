import MultipleSelection from "./multipleSelection";
import UniqueSelection from "./uniqueSelection";
import OpenQuestion from "./openQuestion";
import TrueOrFalse from "./TrueOrFalse";
import { useState } from "react";
import { Button } from "@heroui/button";

const QuestionCreationHandler = () => {
  const quizExample = {
    questions: [
      {
        question_id: 1,
        question:
          "¿Qué afirma el autor sobre la relevancia del código correcto?",
        type: "unique",
        answers: [
          { id: 1, text: "Es una premisa frágil" },
          {
            id: 2,
            text: "Es una de las premisas más robustas y admitidas en el sector",
          },
          { id: 3, text: "No es importante en el desarrollo de software" },
        ],
        correct_answers: 2,
        feedback:
          "El autor considera que la relevancia del código correcto es una de las premisas más robustas y admitidas en el sector, contradiciendo la idea de que es una premisa frágil.",
      },
      {
        question_id: 2,
        question:
          "Según el texto, ¿qué consecuencias puede tener el código incorrecto?",
        type: "multiple",
        answers: [
          { id: 1, text: "Aumento de la productividad del equipo" },
          {
            id: 2,
            text: "Disminución de la productividad hasta llegar a cero",
          },
          { id: 3, text: "Desaparición de la empresa" },
        ],
        correct_answers: [2, 3],
        feedback:
          "El código incorrecto puede llevar a una disminución de la productividad hasta niveles cercanos a cero y, en casos extremos, a la desaparición de la empresa.",
      },
      {
        question_id: 3,
        question: "¿El autor sugiere que el código desaparecerá en el futuro?",
        type: "true_false",
        correct_answers: false,
        feedback:
          "El autor argumenta que el código nunca desaparecerá porque representa los detalles de los requisitos que no pueden ser ignorados o abstraídos.",
      },
      {
        question_id: 4,
        question:
          "Describe brevemente qué es para ti el código limpio basándote en el texto.",
        type: "free",
        correct_answers: null,
        feedback:
          "El código limpio es aquel que es elegante, eficaz, fácil de leer y mantener, con una lógica directa y que hace una cosa bien.",
      },
      {
        question_id: 5,
        question:
          "¿Qué metáfora usan Dave Thomas y Andy Hunt para describir el código incorrecto?",
        type: "unique",
        answers: [
          { id: 1, text: "Las ventanas rotas" },
          { id: 2, text: "El espejo roto" },
          { id: 3, text: "La casa embrujada" },
        ],
        correct_answers: 1,
        feedback:
          "Dave Thomas y Andy Hunt usan la metáfora de las ventanas rotas para describir cómo el código incorrecto puede llevar a un deterioro progresivo del sistema.",
      },
      {
        question_id: 6,
        question:
          "Según Bjarne Stroustrup, ¿qué características debe tener el código limpio?",
        type: "multiple",
        answers: [
          { id: 1, text: "Elegante y eficaz" },
          { id: 2, text: "Completo procesamiento de errores" },
          { id: 3, text: "Hacer muchas cosas a la vez" },
        ],
        correct_answers: [1, 2],
        feedback:
          "Bjarne Stroustrup menciona que el código limpio debe ser elegante, eficaz y tener un completo procesamiento de errores, además de hacer una cosa bien.",
      },
      {
        question_id: 7,
        question:
          "¿El autor compara la creación de código limpio con pintar un cuadro?",
        type: "true_false",
        correct_answers: true,
        feedback:
          "El autor compara la creación de código limpio con pintar un cuadro, destacando que reconocer la calidad no significa necesariamente saber cómo crearla.",
      },
      {
        question_id: 8,
        question: "¿Qué dice Grady Booch sobre el código limpio?",
        type: "unique",
        answers: [
          { id: 1, text: "Es simple y directo" },
          { id: 2, text: "Es complicado y enrevesado" },
          { id: 3, text: "No debe leerse como un texto bien escrito" },
        ],
        correct_answers: 1,
        feedback:
          "Grady Booch afirma que el código limpio es simple y directo, y se lee como un texto bien escrito.",
      },
      {
        question_id: 9,
        question:
          "¿El código incorrecto puede ser un obstáculo para los programadores?",
        type: "true_false",
        correct_answers: true,
        feedback:
          "El código incorrecto puede ser un obstáculo significativo para los programadores, ralentizando su trabajo y complicando los cambios.",
      },
      {
        question_id: 10,
        question:
          "¿Qué estrategia sugiere el autor para cumplir con los plazos de entrega?",
        type: "unique",
        answers: [
          { id: 1, text: "Cometer errores para avanzar más rápido" },
          { id: 2, text: "Mantener el código siempre limpio" },
          { id: 3, text: "Ignorar los detalles del código" },
        ],
        correct_answers: 2,
        feedback:
          "El autor sugiere que la única forma de cumplir con los plazos de entrega es mantener el código siempre limpio, ya que los errores solo ralentizan el proceso.",
      },
    ],
  };
  const [quiz, setQuiz] = useState<any>(quizExample.questions);
  const [questionCounter, setQuestionCounter] = useState<number>(
    quizExample.questions.length + 1
  );

  function handleAddQuestion(type: string): void {
    const newQuestion = {
      question_id: questionCounter,
      question: "",
      type,
      answers: type === "true_false" || type === "free" ? undefined : [],
      correct_answers: undefined,
      feedback: "",
    };

    setQuiz((prev: any) => [...prev, newQuestion]);
    setQuestionCounter((prev) => prev + 1);
  }

  return (
    <>
      {quiz.map((question: any) => {
        switch (question.type) {
          case "multiple":
            return (
              <MultipleSelection
                questionValue={question.question}
                answers={question.answers}
              />
            );
            break;
          case "unique":
            return (
              <UniqueSelection
                questionValue={question.question}
                initialAnswers={question.answers}
              />
            );
            break;

          case "free":
            return <OpenQuestion questionValue={question.question} />;
            break;

          case "true_false":
            return <TrueOrFalse questionValue={question.question} />;
            break;
        }
      })}
      <Button
        color="primary"
        onPress={() => {
          handleAddQuestion("unique");
        }}
      >
        Agregar Pregunta
      </Button>
    </>
  );
};

export default QuestionCreationHandler;
