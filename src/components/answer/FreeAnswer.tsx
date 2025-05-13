/* eslint-disable prettier/prettier */
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";

type Props = {
  question: any;
  onAnswerChange: any;
  isGrading: boolean;
};

type AnswerTemplate = {
  number: number;
  answer: any;
  type: any;
};

const FreeAnswer = ({ question, isGrading, onAnswerChange }: Props) => {
  return (
    <Card>
      <CardHeader>{question.question}</CardHeader>
      <CardBody>
        {isGrading && (
          <span className="bg-slate-200 rounded-xl p-3 m-3">
            {question.feedback}
          </span>
        )}

        <Input
          isDisabled={isGrading}
          placeholder="..."
          onValueChange={(selectedValue) => {
            onAnswerChange((prev: AnswerTemplate[]) => {
              return prev.map((answer: AnswerTemplate) => {
                if (answer.number === question.question_id) {
                  return { ...answer, answer: selectedValue };
                }
                return answer;
              });
            });
          }}
        />
      </CardBody>
    </Card>
  );
};

export default FreeAnswer;
