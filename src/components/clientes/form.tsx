import {
  Button,
  Col,
  Form,
  FormInstance,
  Input,
  Row,
  Spin,
  notification,
} from "antd";
import axios from "axios";
import { useState } from "react";
export type NotificationType = "success" | "info" | "warning" | "error";

export default function FormClientes(props: {
  formCliente: FormInstance;
  mode: "edit" | "new";
}) {
  const { formCliente, mode } = props;
  const [api, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const responsiveInputs = { xs: 24, sm: 24, md: 12, lg: 12 };

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string
  ) => {
    api[type]({
      message: message,
      description: "",
    });
  };

  const formItems: any[] = [
    {
      name: "nombre",
      label: "Nombre Comercial",
      required: true,
      type: "string",
      message: "Favor de colocar un Nombre Comercial",
    },
    {
      name: "correo",
      label: "Correo electronico",
      required: true,
      type: "email",
      message: "Favor de colocar un Email Valido",
    },
    {
      name: "telefono",
      label: "Telefono",
      required: true,
      type: "string",
      message: "Favor de colocar un Telefono Valido",
      maxLength: 10,
      showCount: true,
    },
  ];

  const editClient = () => {
    const clienteId = formCliente.getFieldValue("id");
    axios
      .put(`/api/clientes/${clienteId}`)
      .then((response) => {
        setIsLoading(false);
        formCliente.setFieldsValue(response.data);
        openNotificationWithIcon("success", "Edito el cliente con exito!");
      })
      .catch((error) => {});
  };

  const newClient = () => {
    axios
      .post(`/api/clientes`, formCliente.getFieldsValue)
      .then((response) => {
        setIsLoading(false);
        formCliente.setFieldsValue(response.data);
        openNotificationWithIcon("success", "Creación de cliente con exito!");
      })
      .catch((error) => {});
  };

  return (
    <>
      <Spin spinning={isLoading}>
        {contextHolder}
        <Form form={formCliente}>
          <Row style={{ maxWidth: 1200 }} gutter={[12, 24]}>
            {formItems.map((item) => (
              <Col key={`ItemForm-${item.name}`} {...responsiveInputs}>
                <Form.Item
                  key={item.name}
                  labelCol={{ span: 24 }}
                  name={item.name}
                  label={item.label}
                  rules={[
                    {
                      type: item.type,
                      required: item.required,
                      message: item.message,
                    },
                  ]}
                >
                  <Input
                    placeholder={item.label}
                    maxLength={item.maxLength}
                    showCount={item.showCount}
                  />
                </Form.Item>
              </Col>
            ))}
          </Row>
          <Form.Item>
            <Button
              onClick={async () => {
                setIsLoading(true);
                await new Promise((resolve) => setTimeout(resolve, 1000));
                mode == "edit" ? editClient() : newClient();
              }}
            >
              {mode == "edit" ? "Editar" : "Crear"}{" "}
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
}
