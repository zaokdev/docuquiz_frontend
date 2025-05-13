import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { APP_URL } from "@/utils/dotenv";
const CompartirModal = ({ onOpenChange, isOpen, quiz_id }: any) => {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        `${APP_URL}/answer?id=${quiz_id}&type=online`
      );
      alert("Texto copiado al portapapeles!");
    } catch (err) {
      console.error("Error al copiar: ", err);
      alert("Error al copiar el texto");
    }
  };
  return (
    <Modal isOpen={isOpen} placement="auto" onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Compartir quiz
            </ModalHeader>
            <ModalBody>
              <div className="flex gap-2">
                <Input
                  disabled={true}
                  value={`${APP_URL}/answer?id=${quiz_id}&type=online`}
                />
                <Button
                  value="Copiar"
                  variant="faded"
                  onClick={copyToClipboard}
                >
                  Copiar
                </Button>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onOpenChange}>
                Cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CompartirModal;
