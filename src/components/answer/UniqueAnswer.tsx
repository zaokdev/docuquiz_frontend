import { Card, CardBody, CardHeader } from "@heroui/card";
import { Radio, RadioGroup } from "@heroui/radio";

type Props = {
  id: number;
  question: any;
  answers: any;
  onSelectedChange: any;
  isSolving: boolean;
};

type AnswerTemplate = {
  number: number;
  answer: any;
  type: any;
};

const UniqueAnswer = ({
  id,
  question,
  answers,
  isSolving,
  onSelectedChange,
}: Props) => {
  return (
    <Card key={id}>
      <CardHeader>{question.question}</CardHeader>
      <CardBody>
        {isSolving && <span>{question.feedback}</span>}

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
              isDisabled={isSolving}
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
