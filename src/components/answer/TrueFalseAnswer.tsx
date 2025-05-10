import { Card, CardBody, CardHeader } from "@heroui/card";
import { Radio, RadioGroup } from "@heroui/radio";

type Props = {
  question: any;
  onSelectedChange: any;
  isSolving: boolean;
};

type AnswerTemplate = {
  number: number;
  answer: string;
  type: any;
};

const TrueFalseAnswer = ({
  question,
  isSolving,
  onSelectedChange,
}: Props) => {
  return (
    <Card>
      <CardHeader>{question.question}</CardHeader>
      <CardBody>
        {isSolving && <span>{question.feedback}</span>}
        <RadioGroup
          name={question.question_id.toString()}
          id={question.question_id.toString()}
          isDisabled={isSolving}
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
