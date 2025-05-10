import { Card, CardBody, CardHeader } from "@heroui/card";
import { Radio, RadioGroup } from "@heroui/radio";
import React from "react";

type Props = {
  id: number;
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
  id,
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
          name={id.toString()}
          id={id.toString()}
          isDisabled={isSolving}
          onValueChange={(selectedValue) => {
            onSelectedChange((prev: AnswerTemplate[]) => {
              return prev.map((answer: AnswerTemplate) => {
                if (answer.number === id) {
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
