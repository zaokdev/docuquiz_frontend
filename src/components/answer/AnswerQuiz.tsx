/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
import FreeAnswer from "@/components/answer/FreeAnswer";
import MultipleAnswer from "@/components/answer/MultipleAnswer";
import TrueFalseAnswer from "@/components/answer/TrueFalseAnswer";
import UniqueAnswer from "@/components/answer/UniqueAnswer";
import { Button } from "@heroui/button";
import { useContext, useState } from "react";
import { useDisclosure } from "@heroui/modal";
import ModalForVerifyingSessionInQuiz from "./ModalForVerifyingSessionInQuiz";
import { AuthContext } from "@/context/AuthContext";
import ModalForSubmittingNewQuiz from "./ModalForSubmittingNewQuiz";
import { useSearchParams } from "react-router-dom";
import { API_URL } from "@/utils/dotenv";

const AnswerQuiz = ({ quiz, type }: any) => {
  let [searchParams] = useSearchParams();

  if (typeof quiz == "string") {
    quiz = JSON.parse(quiz);
  }
  const answersTemplate = quiz.questions.map((question: any) => ({
    number: question.question_id,
    answer: undefined,
    type: question.type,
  }));

  const { isLoggedIn } = useContext(AuthContext);
  const [selectedAnswers, setSelectedAnswers] = useState(answersTemplate);
  const [isGrading, setIsGrading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [finalScore, setFinalScore] = useState();

  const handleSubmit = async (e: any) => {
    setIsGrading(true);
    e.preventDefault();
    const { questions } = quiz;
    console.log(type);
    if (type == "local") {
      const response = await fetch(`${API_URL}/quiz/gradeLocal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ questions, selectedAnswers }),
        credentials: "include",
      });

      const data = await response.json();
      setFinalScore(data);
    }

    if (type == "online") {
      const id = searchParams.get("id");
      const response = await fetch(`${API_URL}/quiz/gradeOnline`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, selectedAnswers }),
      });

      const data = await response.json();
      setFinalScore(data);
    }
  };

  return (
    <>
      <section className="grid grid-cols-12 container mx-auto mb-4">
        <div className="col-span-12 text-center my-6">
          <h1 className="md:text-4xl text-lg font-bold">
            {quiz.quizTitle && quiz.quizTitle}
          </h1>
          <p>{quiz.quizDescription && quiz.quizDescription}</p>
          <p>{quiz.quizCreatorName && quiz.quizCreatorName}</p>
        </div>
        <form
          className="col-span-12 flex flex-col gap-6"
          onSubmit={handleSubmit}
        >
          {quiz.questions.map((question: any) => {
            switch (question.type) {
              case "unique":
                return (
                  <>
                    <UniqueAnswer
                      key={question.question_id}
                      question={question}
                      onSelectedChange={setSelectedAnswers}
                      isGrading={isGrading}
                      finalScore={finalScore}
                    />
                  </>
                );
                break;
              case "multiple":
                return (
                  <MultipleAnswer
                    key={question.question_id}
                    question={question}
                    onSelectedChange={setSelectedAnswers}
                    isGrading={isGrading}
                    finalScore={finalScore}
                  />
                );
                break;

              case "free":
                return (
                  <FreeAnswer
                    key={question.question_id}
                    onAnswerChange={setSelectedAnswers}
                    question={question}
                    isGrading={isGrading}
                  />
                );

              case "true_false":
                return (
                  <TrueFalseAnswer
                    key={question.question_id}
                    onSelectedChange={setSelectedAnswers}
                    question={question}
                    isGrading={isGrading}
                    finalScore={finalScore}
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
          {isGrading && type == "local" && (
            <Button color="secondary" type="button" onPress={onOpen}>
              Subir cuestionario a la nube
            </Button>
          )}
        </form>
      </section>
      {!isLoggedIn ? (
        <ModalForVerifyingSessionInQuiz
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      ) : (
        <ModalForSubmittingNewQuiz
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )}
    </>
  );
};

export default AnswerQuiz;
