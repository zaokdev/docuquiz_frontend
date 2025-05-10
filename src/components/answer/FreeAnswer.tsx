/* eslint-disable prettier/prettier */
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";

type Props = {
  question: any;
  onAnswerChange: any;
  isSolving: boolean;
};

type AnswerTemplate = {
  number: number;
  answer: any;
  type: any;
};

const FreeAnswer = ({ question, isSolving, onAnswerChange }: Props) => {
  return (
    <Card>
      <CardHeader>{question.question}</CardHeader>
      <CardBody>
        {isSolving && <span>{question.feedback}</span>}

        <Input
          isDisabled={isSolving}
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
