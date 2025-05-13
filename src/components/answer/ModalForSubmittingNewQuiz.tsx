import { AuthContext } from "@/context/AuthContext";
import { API_URL } from "@/utils/dotenv";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const ModalForSubmittingNewQuiz = ({ isOpen, onOpenChange }: any) => {
  const { user } = useContext(AuthContext);
  const [quizName, setQuizName] = useState();
  const navigate = useNavigate();

  async function submitQuiz(e: any) {
    if (!quizName) return alert("No puedes tener un quiz sin nombre");
    const questionsData = localStorage.getItem("quizLocal");
    if (!questionsData) return alert("No se encuentra datos de ningun quiz");
    const { questions } = JSON.parse(questionsData);
    const { username, id } = user;
    const newQuiz = {
      quizTitle: quizName,
      questions,
      quizCreatorName: username,
      quizCreatorId: id,
    };

    const response = await fetch(`${API_URL}/quiz/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuiz),
      credentials: "include",
    });

    if (!response.ok) {
      alert("Error al crear el quiz");
      return;
    }

    navigate({
      pathname: "/all_quizzes",
    });
  }

  return (
    <Modal isOpen={isOpen} placement="auto" onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Subir nuevo quiz
            </ModalHeader>
            <ModalBody>
              <Input
                onValueChange={(e: any) => setQuizName(e)}
                isRequired
                errorMessage="No puedes tener un quiz sin nombre"
                placeholder="Nombre"
                labelPlacement="outside"
                label="Nombre del quiz"
                type="text"
                size="lg"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={submitQuiz}>
                Subir
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalForSubmittingNewQuiz;
