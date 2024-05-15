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
  notification,
  Spin,
  Modal,
} from "antd";
import { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import axios from "axios";
import { Clientes } from "@/components/interfaces/cliente";
import { NotificationType } from "@/components/clientes/form";

export default function DirectoryClientes() {
  const [clientes, setClientes] = useState<Clientes[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const [formSearch] = Form.useForm();
  const watchFormSearch = Form.useWatch(formSearch);
  const [api, contextHolder] = notification.useNotification();
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string
  ) => {
    api[type]({
      message: message,
      description: "",
    });
  };

  const getClients = async (specs?: {
    nombre?: string;
    currentPage?: number;
  }) => {
    axios
      .get(`/api/clientes`, { params: specs })
      .then((response) => {
        setClientes(response.data.clientes);
        setCurrentPage(response.data.currentPage);
        setCount(response.data.count);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getClients();
  }, []);

  const responsiveInputSearch = { xs: 24, sm: 24, md: 12, lg: 6 };
  const responsiveTitle = { xs: 24, sm: 24, md: 12, lg: 6 };

  const onHandlerClient = (id: number) => {
    router.push(`clientes/${id}`);
  };

  const deleteClient = async (cliente: Clientes) => {
    Modal.confirm({
      title: `Eliminar ${cliente.nombre}`,
      okText: "Si",
      onCancel: async (...args) => {},
      cancelText: "Cancelar",
      onOk: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        axios
          .delete(`/api/clientes/${cliente.id}`)
          .then((response) => {
            openNotificationWithIcon(
              "success",
              `Se removio el Cliente ${cliente.nombre}`
            );
            setClientes(response.data);
          })
          .catch((error) => {});
      },
    });
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
      width: 120,
      render: (value: number, row: Clientes) => (
        <Row justify={"space-between"} key={`RowActions-${row.id}`}>
          <Col>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => onHandlerClient(value)}
            ></Button>
          </Col>
          <Col>
            <Button
              onClick={() => {
                deleteClient(row);
              }}
              type="primary"
              style={{ background: "red" }}
              icon={<DeleteOutlined />}
            ></Button>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <Row>
      <Col span={24}>
        <Row justify={"space-between"}>
          <Col {...responsiveTitle}>
            <Typography.Title level={4}>
              Directorio de Clientes
            </Typography.Title>
          </Col>
          <Button type="primary" onClick={() => router.push("clientes/nuevo")}>
            Agregar
          </Button>
        </Row>
        <Col {...responsiveInputSearch}>
          <Form form={formSearch}>
            <Form.Item labelCol={{ span: 24 }} label={"Buscar"} name={"nombre"}>
              <Input.Search
                onSearch={() => getClients(formSearch.getFieldsValue(true))}
              />
            </Form.Item>
          </Form>
        </Col>
      </Col>
      <Col span={24}>

      <Spin spinning={isLoading}>
        {contextHolder}
        <Table
          pagination={{
              current: currentPage,
              total: count,
              onChange(page, pageSize) {
                  getClients({ currentPage: page });
                  return page;
                },
            }}
          scroll={{ x: 900, y: 1200 }}
          dataSource={clientes}
          columns={columns}
          />
      </Spin>
          </Col>
    </Row>
  );
}
