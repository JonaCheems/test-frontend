import FormClientes from "@/components/clientes/form";
import { Breadcrumb, Button, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import { useRouter } from "next/router";

export default function ClienteNuevo() {
  const [formCliente] = useForm();
  const router = useRouter();
  return <>
    <Typography.Title level={4}>Información del cliente Nuevo</Typography.Title>
      <Breadcrumb
        items={[
          {
            title: <Button type="link" href="/clientes">Directorio</Button>,
          },
          {
            title: "Cliente Nuevo",
          },
        ]}
      />
  <FormClientes formCliente={formCliente} mode="new" />;
  </>
}
