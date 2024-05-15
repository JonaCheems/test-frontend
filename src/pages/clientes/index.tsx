import {
  Button,
  Col,
  Layout,
  Row,
  Table,
  Typography,
  Menu,
  Form,
  Input,
} from "antd";
import { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { title } from "process";
import { render } from "react-dom";
import { useRouter } from "next/router";

interface Clientes {
  id: number;
  nombre: string;
  telefono?: string;
  correo?: string;
}

const mockclientes: Clientes[] = [
  { id: 1, nombre: "36-t", correo: "hello@36-t.com", telefono: "55555555" },
  { id: 2, nombre: "Axios", correo: "hello@36-t.com", telefono: "77777" },
];

export default function Clientes() {
  const [clientes, setClientes] = useState<Clientes[]>(mockclientes);
  const router = useRouter();
  const [formSearch] = Form.useForm();
  const watchFormSearch = Form.useWatch(formSearch);

  useEffect(() => {}, []);

  const responsiveInputSearch = { xs: 24, sm: 24, md: 12, lg: 6 };
  const responsiveTitle = { xs: 24, sm: 24, md: 12, lg: 6 };

  const onHandlerClient = (id: number) => {
    router.push(`clientes/${id}`);
  };

  const columns: any[] = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
      render: (value: number) => (
        <Button type="link" onClick={() => onHandlerClient(value)}>
          {value}
        </Button>
      ),
    },
    { key: "nombre", dataIndex: "nombre", title: "Nombre Comercial" },
    { key: "telefono", dataIndex: "telefono", title: "telefono" },
    { key: "correo", dataIndex: "correo", title: "Correo" },
    {
      key: "_actions",
      dataIndex: "id",
      render: (value: number, row: Clientes) => (
        <Row>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => onHandlerClient(value)}
          ></Button>
          <Button
            type="primary"
            style={{ background: "red" }}
            icon={<DeleteOutlined />}
          ></Button>
        </Row>
      ),
    },
  ];

  const filterClient = () => {
    return clientes.filter((cliente) => watchFormSearch ? watchFormSearch["nombre"].includes(cliente.nombre): true);
  };

  return (
    <Row>
      <Col span={24}>
        <Row justify={"space-between"}>
          <Col {...responsiveTitle}>
            <Typography.Title level={4}>
              Directorio de Clientes
            </Typography.Title>
          </Col>
          <Col span={12}>
            <Button type="primary">Agregar</Button>
          </Col>
          <Col {...responsiveInputSearch}>
            <Form form={formSearch}>
              <Form.Item
                labelCol={{ span: 24 }}
                label={"Buscar"}
                name={"nombre"}
              >
                <Input />
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Col>
      <Col span={24}></Col>
      <Table
        scroll={{ x: 1200, y: 1200 }}
        dataSource={filterClient()}
        columns={columns}
      />
    </Row>
  );
}
