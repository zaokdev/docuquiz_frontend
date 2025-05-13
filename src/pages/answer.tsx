/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import AnswerQuiz from "@/components/answer/AnswerQuiz";
import DefaultLayout from "@/layouts/default";
import { API_URL } from "@/utils/dotenv";
const AnswerPage = () => {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const [quiz, setQuiz] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [type, setType] = useState<string>();

  useEffect(() => {
    if (!searchParams.get("type")) {
      navigate({
        pathname: "/answer",
        search: `?type=local`,
      });
    }

    const tempType = searchParams.get("type");

    if (tempType) setType(tempType);

    if (tempType != "local" && tempType != "online")
      navigate({ pathname: "/answer", search: `?type=local` });

    if (tempType == "local") {
      setQuiz(localStorage.getItem("quizLocal"));
      return;
    }

    if (tempType == "online") {
      setIsLoading(true);
      const QuizId = searchParams.get("id");
      const fetchingQuiz = async () => {
        try {
          const response = await fetch(`${API_URL}/quiz/${QuizId}`);
          const { quiz } = await response.json();
          setQuiz(quiz);
          setError(null);
          setIsLoading(false);
        } catch (e: any) {
          console.log(e);
          setError(e.message);
          setIsLoading(false);
        }
      };

      fetchingQuiz();
    }
  }, []);

  if (isLoading) return <div>Loading</div>;

  if (quiz)
    return (
      <DefaultLayout>
        <AnswerQuiz quiz={quiz} type={type} />
      </DefaultLayout>
    );
};

export default AnswerPage;
