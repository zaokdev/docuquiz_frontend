import { Card, CardBody, CardHeader } from "@heroui/card";
import { Radio, RadioGroup } from "@heroui/radio";
import React from "react";

type Props = {
  id: number;
  question: string;
  onSelectedChange: any;
};

type AnswerTemplate = {
  number: number;
  answer: string;
};

const TrueFalseAnswer = ({ id, question, onSelectedChange }: Props) => {
  return (
    <Card>
      <CardHeader>{question}</CardHeader>
      <CardBody>
        <RadioGroup
          name={id.toString()}
          id={id.toString()}
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
