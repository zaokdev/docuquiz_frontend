import { AuthContext } from "@/context/AuthContext";
import DefaultLayout from "@/layouts/default";
import { API_URL } from "@/utils/dotenv";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import CompartirModal from "@/components/compartirModal";

const AllQuizzesPage = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [quizzesArray, setQuizzesArray] = useState<any>();
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [quizId, setQuizId] = useState<any>();

  const handleResolver = (id: any) => {
    navigate({ pathname: "/answer", search: `?id=${id}&type=online` });
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate({ pathname: "/" });
    }

    const fetchQuizzes = async () => {
      const response = await fetch(`${API_URL}/quiz/byUser/get`, {
        credentials: "include",
      });
      const quizzes = await response.json();
      setQuizzesArray(quizzes.quiz);
      console.log(quizzes.quiz);
    };

    fetchQuizzes();
  }, []);

  return (
    <DefaultLayout>
      <main className="mx-auto container">
        <h1 className="text-center my-4 text-xl">
          Bienvenido, <br />{" "}
          <span className="text-blue-700">{user?.username}</span>
        </h1>
        {quizzesArray && (
          <Table hideHeader>
            <TableHeader>
              <TableColumn>ROLE</TableColumn>
              <TableColumn>STATUS</TableColumn>
            </TableHeader>
            <TableBody items={quizzesArray}>
              {quizzesArray.map((quiz: any) => (
                <TableRow key={quiz._id}>
                  <TableCell>
                    <span className="font-bold md:text-xl text-md">
                      {quiz.quizTitle}
                    </span>
                  </TableCell>
                  <TableCell className="flex gap-2 md:gap-8">
                    <Button
                      color="primary"
                      onPress={() => handleResolver(quiz._id)}
                      variant="faded"
                    >
                      Resolver
                    </Button>
                    <Button
                      color="secondary"
                      variant="faded"
                      onPress={() => {
                        setQuizId(quiz._id);
                        onOpen();
                      }}
                    >
                      Compartir
                    </Button>
                    <Button color="danger" variant="faded">
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <CompartirModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          quiz_id={quizId}
        />
      </main>
    </DefaultLayout>
  );
};

export default AllQuizzesPage;
