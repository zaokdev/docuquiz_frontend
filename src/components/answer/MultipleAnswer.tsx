import { Card, CardHeader, CardBody } from "@heroui/card";
import { CheckboxGroup, Checkbox } from "@heroui/checkbox";

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

const MultipleAnswer = ({
  id,
  question,
  answers,
  isSolving,
  onSelectedChange,
}: Props) => {
  return (
    <Card key={id}>
      {id}
      <CardHeader>{question.question}</CardHeader>
      <CardBody>
        {isSolving && <span>{question.feedback}</span>}
        <CheckboxGroup
          name={id.toString()}
          id={id.toString()}
          isDisabled={isSolving}
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
