import { Card, CardHeader, CardBody } from "@heroui/card";
import { CheckboxGroup, Checkbox } from "@heroui/checkbox";

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

const MultipleAnswer = ({ id, question, answers, onSelectedChange }: Props) => {
  return (
    <Card key={id}>
      {id}
      <CardHeader>{question}</CardHeader>
      <CardBody>
        <CheckboxGroup
          name={id.toString()}
          id={id.toString()}
          onValueChange={(selectedValue) => {
            onSelectedChange((prev: AnswerTemplate[]) => {
              return prev.map((answerLog: AnswerTemplate) => {
                if (answerLog.number === id) {
                  return { ...answerLog, answer: [...selectedValue] };
                }
                return answerLog;
              });
            });
          }}
        >
          {answers.map((answer: any) => (
            <Checkbox
              value={answer.id}
              id={answer.id}
              name={id.toString()}
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
