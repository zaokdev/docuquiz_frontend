import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";

type Props = {
  questionValue: string;
};

const OpenQuestion = ({ questionValue }: Props) => {
  return (
    <Card>
      <CardBody>
        <CardHeader>Pregunta abierta</CardHeader>
        <Input type="text" value={questionValue} />
      </CardBody>
    </Card>
  );
};

export default OpenQuestion;
