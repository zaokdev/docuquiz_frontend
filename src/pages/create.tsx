import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";

import QuestionCreationHandler from "@/components/create/QuestionCreationHandler";

const CreatePage = () => {
  return (
    <DefaultLayout>
      <section className="border grid md:grid-cols-12 grid-cols-6">
        <div className="md:col-span-8 col-span-6 flex flex-col gap-8">
          <QuestionCreationHandler />
          <Button color="secondary" variant="shadow">
            Terminar
          </Button>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default CreatePage;
