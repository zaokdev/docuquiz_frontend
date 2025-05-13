import { Card, CardBody, CardHeader } from "@heroui/card";
import { Radio, RadioGroup } from "@heroui/radio";

type Props = {
  question: any;
  onSelectedChange: any;
  isGrading: boolean;
  finalScore: any;
};

type AnswerTemplate = {
  number: number;
  answer: any;
  type: any;
};

const UniqueAnswer = ({
  question,
  isGrading,
  onSelectedChange,
  finalScore,
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

        <RadioGroup
          name={question.question_id.toString()}
          id={question.question_id.toString()}
          onValueChange={(selectedValue) => {
            onSelectedChange((prev: AnswerTemplate[]) => {
              return prev.map((answer) => {
                if (answer.number === question.question_id) {
                  return { ...answer, answer: selectedValue };
                }
                return answer;
              });
            });
          }}
        >
          {question.answers.map((answer: any) => (
            <Radio
              key={answer.id}
              value={answer.id}
              id={answer.id}
              name={answer.id}
              isDisabled={isGrading}
            >
              {answer.text}
            </Radio>
          ))}
        </RadioGroup>
      </CardBody>
    </Card>
  );
};

export default UniqueAnswer;
