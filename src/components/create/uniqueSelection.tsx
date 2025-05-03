import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { RadioGroup, Radio } from "@heroui/radio";
import { useEffect, useState } from "react";

type Props = {
  questionValue: string;
  initialAnswers: any[] | undefined;
};

const UniqueSelection = ({ questionValue, initialAnswers }: Props) => {
  const [answers, setAnswers] = useState(initialAnswers);

  function handleAnswerTextChange(id: any, value: string): void {
    const updatedAnswers = answers?.map((answer) =>
      answer.id === id ? { ...answer, text: value } : answer
    );
    setAnswers(updatedAnswers);
    console.log(answers);
  }

  function handleRemoveAnswer(id: any): void {
    throw new Error("Function not implemented.");
  }

  return (
    <Card>
      <CardBody>
        <RadioGroup>
          <Input
            type="text"
            placeholder="Escribe aquí la pregunta"
            value={questionValue}
          ></Input>
          {answers?.map((answer) => (
            <div className="flex" key={answer.id}>
              <Radio value={answer.id} />
              <Input
                type="text"
                value={answer.text}
                onChange={(e) =>
                  handleAnswerTextChange(answer.id, e.target.value)
                }
              />
              <Button
                color="danger"
                size="sm"
                onPress={() => handleRemoveAnswer(answer.id)}
              >
                Eliminar
              </Button>
            </div>
          ))}
          <Button>Agregar respuesta</Button>
        </RadioGroup>
      </CardBody>
    </Card>
  );
};

export default UniqueSelection;
