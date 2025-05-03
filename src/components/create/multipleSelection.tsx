import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { CheckboxGroup, Checkbox } from "@heroui/checkbox";
import { Input } from "@heroui/input";

type Props = {
  questionValue: string;
  answers: any[] | undefined;
};

const MultipleSelection = ({ questionValue, answers }: Props) => {
  return (
    <Card>
      <CardBody>
        <CheckboxGroup>
          <Input
            type="text"
            placeholder="Escribe aquí la pregunta"
            value={questionValue}
          ></Input>
          {answers?.map((answer) => (
            <div className="flex">
              <Checkbox value={answer.id}></Checkbox>
              <Input type="text" value={answer.text} />
            </div>
          ))}

          <Button>Agregar respuesta</Button>
        </CheckboxGroup>
      </CardBody>
    </Card>
  );
};

export default MultipleSelection;
