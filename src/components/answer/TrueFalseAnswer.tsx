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
  answer: string;
  type: any;
};

const TrueFalseAnswer = ({
  question,
  isGrading,
  onSelectedChange,
  finalScore,
}: Props) => {
  return (
    <Card>
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
          isDisabled={isGrading}
          onValueChange={(selectedValue) => {
            onSelectedChange((prev: AnswerTemplate[]) => {
              return prev.map((answer: AnswerTemplate) => {
                if (answer.number === question.question_id) {
                  return { ...answer, answer: selectedValue };
                }
                return answer;
              });
            });
          }}
        >
          <Radio value="true">Verdadero</Radio>
          <Radio value="false">Falso</Radio>
        </RadioGroup>
      </CardBody>
    </Card>
  );
};

export default TrueFalseAnswer;
