import { Card, CardBody, CardHeader } from "@heroui/card";
import { Radio, RadioGroup } from "@heroui/radio";

type Props = {
  id: number;
  question: string;
  answers: any;
  onSelectedChange: any;
};

type AnswerTemplate = {
  number: number;
  answer: any;
};

const UniqueAnswer = ({ id, question, answers, onSelectedChange }: Props) => {
  return (
    <Card key={id}>
      <CardHeader>{question}</CardHeader>
      <CardBody>
        <RadioGroup
          name={id.toString()}
          id={id.toString()}
          onValueChange={(selectedValue) => {
            onSelectedChange((prev: AnswerTemplate[]) => {
              return prev.map((answer) => {
                if (answer.number === id) {
                  return { ...answer, answer: selectedValue };
                }
                return answer;
              });
            });
          }}
        >
          {answers.map((answer: any) => (
            <Radio
              key={answer.id}
              value={answer.id}
              id={answer.id}
              name={answer.id}
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
