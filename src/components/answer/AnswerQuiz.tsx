import FreeAnswer from "@/components/answer/FreeAnswer";
import MultipleAnswer from "@/components/answer/MultipleAnswer";
import TrueFalseAnswer from "@/components/answer/TrueFalseAnswer";
import UniqueAnswer from "@/components/answer/UniqueAnswer";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";
import { useEffect, useState } from "react";

const AnswerQuiz = ({ quiz }) => {
    
  const answersTemplate = quiz.questions.map((question) => ({
    number: question.question_id,
    answer: undefined,
  }));

  const [selectedAnswers, setSelectedAnswers] = useState(answersTemplate);

  return (
    <DefaultLayout>
      <section className="grid md:grid-cols-12">
        <form
          className="col-span-6 flex flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {quiz.questions.map((question) => {
            switch (question.type) {
              case "unique":
                return (
                  <UniqueAnswer
                    key={question.question_id}
                    answers={question.answers}
                    id={question.question_id}
                    question={question.question}
                    onSelectedChange={setSelectedAnswers}
                  />
                );
                break;
              case "multiple":
                return (
                  <MultipleAnswer
                    key={question.question_id}
                    answers={question.answers}
                    id={question.question_id}
                    question={question.question}
                    onSelectedChange={setSelectedAnswers}
                  />
                );
                break;

              case "free":
                return (
                  <FreeAnswer
                    id={question.question_id}
                    onAnswerChange={setSelectedAnswers}
                    question={question.question}
                    key={question.question_id}
                  />
                );

              case "true_false":
                return (
                  <TrueFalseAnswer
                    id={question.question_id}
                    onSelectedChange={setSelectedAnswers}
                    question={question.question}
                    key={question.question_id}
                  />
                );
                break;
            }
          })}
          <Button color="primary" type="submit">
            Terminar
          </Button>
        </form>
      </section>
    </DefaultLayout>
  );
};

export default AnswerQuiz;
