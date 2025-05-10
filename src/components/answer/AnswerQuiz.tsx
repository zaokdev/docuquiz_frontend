/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
import FreeAnswer from "@/components/answer/FreeAnswer";
import MultipleAnswer from "@/components/answer/MultipleAnswer";
import TrueFalseAnswer from "@/components/answer/TrueFalseAnswer";
import UniqueAnswer from "@/components/answer/UniqueAnswer";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";
import { useState } from "react";
import { useDisclosure } from "@heroui/modal";
import ModalForVerifyingSessionInQuiz from "./ModalForVerifyingSessionInQuiz";

const AnswerQuiz = ({ quiz }: any) => {
  if (typeof quiz == "string") {
    quiz = JSON.parse(quiz);
  }
  const answersTemplate = quiz.questions.map((question: any) => ({
    number: question.question_id,
    answer: undefined,
    type: question.type,
  }));

  const [selectedAnswers, setSelectedAnswers] = useState(answersTemplate);
  const [isGrading, setIsGrading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleSubmit = async (e: any) => {
    setIsGrading(true);
    e.preventDefault();
    const { questions } = quiz;
    await fetch("http://localhost:3000/api/quiz/grade", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ questions, selectedAnswers }),
    });
  };

  return (
    <>
      <section className="grid md:grid-cols-12">
        <form
          className="col-span-6 flex flex-col gap-6"
          onSubmit={handleSubmit}
        >
          {quiz.questions.map((question: any) => {
            switch (question.type) {
              case "unique":
                return (
                  <UniqueAnswer
                    key={question.question_id}
                    question={question}
                    onSelectedChange={setSelectedAnswers}
                    isSolving={isGrading}
                  />
                );
                break;
              case "multiple":
                return (
                  <MultipleAnswer
                    key={question.question_id}
                    question={question}
                    onSelectedChange={setSelectedAnswers}
                    isSolving={isGrading}
                  />
                );
                break;

              case "free":
                return (
                  <FreeAnswer
                    key={question.question_id}
                    onAnswerChange={setSelectedAnswers}
                    question={question}
                    isSolving={isGrading}
                  />
                );

              case "true_false":
                return (
                  <TrueFalseAnswer
                    key={question.question_id}
                    onSelectedChange={setSelectedAnswers}
                    question={question}
                    isSolving={isGrading}
                  />
                );
                break;
            }
          })}
          {!isGrading && (
            <Button color="primary" type="submit">
              Terminar
            </Button>
          )}
          {isGrading && (
            <Button color="secondary" type="button" onPress={onOpen}>
              Subir cuestionario a la nube
            </Button>
          )}
        </form>
      </section>
      <ModalForVerifyingSessionInQuiz
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
};

export default AnswerQuiz;
