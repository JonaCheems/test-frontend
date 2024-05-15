import FormClientes from "@/components/clientes/form";
import { Breadcrumb, Button, Form, Input, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ClienteId() {
  const [formCliente] = useForm();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getCliente();
  }, []);

  const getCliente = async () => {
    axios
      .get(`/api/clientes/${id}`)
      .then((response) => {
        formCliente.setFieldsValue(response.data);
      })
      .catch((error) => {});
  };

  return (
    <>
      <Typography.Title level={4}>Información del cliente</Typography.Title>
      <Breadcrumb
        items={[
          {
            title: (
              <Button type="link" href="/clientes">
                Directorio
              </Button>
            ),
          },
          {
            title: "Cliente",
          },
        ]}
      />
      <FormClientes mode="edit" formCliente={formCliente} />
    </>
  );
}
