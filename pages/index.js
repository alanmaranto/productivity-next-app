import { useState } from "react";
import { Heading, Input, Button, Spacer } from "@alanmaranto/components";

export default function Home() {
  const [formValues, setFormValues] = useState({
    name: "",
    lastname: "",
    email: "",
  });

  const onChange = (key) => (event) => {
    const { value } = event.target;
    setFormValues({ ...formValues, [key]: value });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Heading>Cuentame sobre ti</Heading>
      <Spacer.Horizontal size="md" />
      <Input
        placeholder="Nombres"
        onChange={onChange("name")}
        value={formValues.name}
      />
      <Spacer.Horizontal size="sm" />
      <Input
        placeholder="Apellidos"
        onChange={onChange("lastname")}
        value={formValues.lastname}
      />
      <Spacer.Horizontal size="sm" />
      <Input
        placeholder="Correo electrónico"
        onChange={onChange("email")}
        value={formValues.email}
      />
      <Spacer.Horizontal size="lg" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button>Completa tu perfil</Button>
        <Spacer.Horizontal size="md" />
        <Button type="tertiary">Saltar este paso por ahora</Button>
      </div>
    </div>
  );
}
