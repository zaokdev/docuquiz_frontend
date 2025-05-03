import AnswerQuiz from "@/components/answer/AnswerQuiz";
import DefaultLayout from "@/layouts/default";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
const AnswerPage = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [type, setType] = useState<string>();

  useEffect(() => {
    if (!searchParams) {
      setType("local");
    }

    const tempType = searchParams.get("type");

    if (tempType != "local" && tempType != "online") {
      setType("local");
    }
  }, []);

  return (
    <DefaultLayout>
      <AnswerQuiz quiz={undefined} />
    </DefaultLayout>
  );
};

export default AnswerPage;
