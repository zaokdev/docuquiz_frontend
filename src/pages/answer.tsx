/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import AnswerQuiz from "@/components/answer/AnswerQuiz";
import DefaultLayout from "@/layouts/default";
const AnswerPage = () => {


  let [searchParams, setSearchParams] = useSearchParams();
  const [type, setType] = useState<string>();
  const [quiz,setQuiz] = useState<any>()


  useEffect(()=>{
    if (!searchParams) {
      setType("local");
    }

    const tempType = searchParams.get("type");

    if (tempType != "local" && tempType != "online") {
      setType("local");
    }
    if (tempType == "local"){
      setQuiz(localStorage.getItem("quizLocal"))

    }
  },[])


  if(!quiz) return <div>Loading</div>

  return (
    <DefaultLayout>
      <AnswerQuiz quiz={quiz} />
    </DefaultLayout>
  );
};

export default AnswerPage;
