/* eslint-disable prettier/prettier */
import { Button } from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { useNavigate } from "react-router-dom";

const ModalForVerifyingSessionInQuiz = ({isOpen,onOpenChange}:any) => {

    const navigate = useNavigate()
    

    function iniciarSesion(e: any) {
        navigate({pathname: "/auth/login"})
    }

    function registrarUsuario(e: any) {
        navigate({pathname: "/auth/register"})
    }

  return (
          <Modal isOpen={isOpen} placement="auto" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <p>
                  Para poder usar de manera remota tus quizzes, deberás iniciar sesión o registrarte.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" variant="light" onPress={iniciarSesion}>
                  Iniciar Sesión
                </Button>
                <Button color="primary" onPress={registrarUsuario}>
                  Registrarse
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
  )
}

export default ModalForVerifyingSessionInQuiz