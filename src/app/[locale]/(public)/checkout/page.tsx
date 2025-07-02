import AccordionController from "./_components/accordion-controller";

export default async function Page() {
  return (
    <div className="flex container my-20 gap-20">
      {/* Accordion */}
      <AccordionController />
    </div>
  );
}