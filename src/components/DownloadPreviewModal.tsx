import { Modal, ModalProps, Table, TableProps, Tabs, TabsProps } from "antd";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import {
  IElectricityMeter,
  IElectricityMeterData,
  IRoom,
  IRoomData,
} from "../interfaces";

interface Props extends ModalProps {
  room?: IRoom;
  electricityMeter?: IElectricityMeter;
}

const DownloadPreviewModal = ({ room, electricityMeter, ...rest }: Props) => {
  const [activeTab, setActiveTab] = useState("");

  const { columns: roomColumns, dataSource: roomDataSource } = useMemo(() => {
    if (!room)
      return {
        columns: [],
        dataSource: [],
      };

    const columns: TableProps<IRoomData>["columns"] = [
      {
        title: "Timestamp",
        dataIndex: "timestamp",
        key: "timestamp",
        render: (timestamp: string) => dayjs(timestamp).format("YYYY-MM-DD"),
      },
      {
        title: "Temperature",
        dataIndex: "temperature",
        key: "temperature",
        align: "center",
      },
      {
        title: "Humidity",
        dataIndex: "humidity",
        key: "humidity",
        align: "center",
      },
    ];
    return {
      columns,
      dataSource: room.data,
    };
  }, [room]);
  const {
    columns: electricityMeterColumns,
    dataSource: electricityMeterDataSource,
  } = useMemo(() => {
    if (!electricityMeter)
      return {
        columns: [],
        dataSource: [],
      };

    const columns: TableProps<IElectricityMeterData>["columns"] = [
      {
        title: "Timestamp",
        dataIndex: "timestamp",
        key: "timestamp",
        render: (timestamp: string) => dayjs(timestamp).format("YYYY-MM-DD"),
      },
      {
        title: "Energy Consumption",
        dataIndex: "energyConsumption",
        key: "energyConsumption",
        align: "center",
      },
      {
        title: "Cost",
        dataIndex: "cost",
        key: "cost",
        align: "center",
      },
    ];
    return {
      columns,
      dataSource: electricityMeter.data,
    };
  }, [electricityMeter]);

  const items: TabsProps["items"] = [
    {
      key: "room",
      label: room?.name,
      children: <Table dataSource={roomDataSource} columns={roomColumns} />,
    },
    {
      key: "electricityMeter",
      label: electricityMeter?.name,
      children: (
        <Table
          dataSource={electricityMeterDataSource}
          columns={electricityMeterColumns}
        />
      ),
    },
  ];

  const onTabChange: TabsProps["onChange"] = (key) => {
    setActiveTab(key);
  };

  useEffect(() => {
    if (room && !electricityMeter) {
      setActiveTab("room");
    } else if (!room && electricityMeter) {
      setActiveTab("electricityMeter");
    }
  }, [room, electricityMeter]);

  return (
    <Modal {...rest}>
      <Tabs activeKey={activeTab} items={items} onChange={onTabChange} />
    </Modal>
  );
};

export { DownloadPreviewModal };
