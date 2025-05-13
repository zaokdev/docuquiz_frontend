/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-sort-props */
import { Card, CardHeader, CardBody } from "@heroui/card";
import { CheckboxGroup, Checkbox } from "@heroui/checkbox";

type Props = {
  question: any;
  finalScore: any;
  onSelectedChange: any;
  isGrading: boolean;
};

type AnswerTemplate = {
  number: number;
  answer: any;
  type: any;
};

const MultipleAnswer = ({
  question,
  finalScore,
  isGrading,
  onSelectedChange,
}: Props) => {
  return (
    <Card key={question.question_id}>
      <CardHeader>{question.question}</CardHeader>
      <CardBody>
        {isGrading && (
          <span
            className={
              finalScore && finalScore[question.question_id - 1].correct
                ? "bg-green-200 rounded-xl p-3 m-3"
                : "bg-red-200 rounded-xl p-3 m-3"
            }
          >
            {question.feedback}
          </span>
        )}
        <CheckboxGroup
          name={question.question_id.toString()}
          id={question.question_id.toString()}
          isDisabled={isGrading}
          onValueChange={(selectedValue) => {
            onSelectedChange((prev: AnswerTemplate[]) => {
              return prev.map((answerLog: AnswerTemplate) => {
                if (answerLog.number === question.question_id) {
                  return { ...answerLog, answer: [...selectedValue] };
                }
                return answerLog;
              });
            });
          }}
        >
          {question.answers.map((answer: any) => (
            <Checkbox
              value={answer.id}
              id={answer.id}
              name={question.question_id.toString()}
              key={answer.id}
            >
              {answer.text}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </CardBody>
    </Card>
  );
};

export default MultipleAnswer;
