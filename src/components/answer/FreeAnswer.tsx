import { Card, CardHeader, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";

type Props = {
  id: number;
  question: any;
  onAnswerChange: any;
  isSolving: boolean;
};

type AnswerTemplate = {
  number: number;
  answer: any;
  type: any;
};

const FreeAnswer = ({ id, question, isSolving, onAnswerChange }: Props) => {
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
                if (answer.number === id) {
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
