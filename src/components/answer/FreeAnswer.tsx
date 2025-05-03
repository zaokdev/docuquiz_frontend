import { Card, CardHeader, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";

type Props = {
  id: number;
  question: string;
  onAnswerChange: any;
};

type AnswerTemplate = {
  number: number;
  answer: any;
};

const FreeAnswer = ({ id, question, onAnswerChange }: Props) => {
  return (
    <Card>
      <CardHeader>{question}</CardHeader>
      <CardBody>
        <Input
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
