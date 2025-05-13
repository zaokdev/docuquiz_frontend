import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { RadioGroup, Radio } from "@heroui/radio";
type Props = {
  questionValue: string;
};

const TrueOrFalse = ({ questionValue }: Props) => {
  return (
    <Card>
      <CardBody>
        <RadioGroup>
          <Input
            type="text"
            placeholder="Escribe aquí la pregunta"
            value={questionValue}
          ></Input>
          <Radio value="true">Verdadero</Radio>
          <Radio value="false">Falso</Radio>
        </RadioGroup>
      </CardBody>
    </Card>
  );
};

export default TrueOrFalse;
