import { Modal, ModalProps, Table, TableProps } from "antd";
import dayjs from "dayjs";
import { useMemo } from "react";
import { ITimeSeries, ITimestampData } from "../interfaces";

interface Props extends ModalProps {
  timeSeriesDetail?: ITimeSeries;
  type: "room" | "electricityMeter";
}

const DownloadPreviewModal = ({ timeSeriesDetail, type, ...rest }: Props) => {
  const { columns, dataSource } = useMemo(() => {
    if (!timeSeriesDetail)
      return {
        columns: [],
        dataSource: [],
      };

    const columns: TableProps<ITimestampData>["columns"] = [
      {
        title: "Timestamp",
        dataIndex: "timestamp",
        key: "timestamp",
        render: (timestamp: string) => dayjs(timestamp).format("YYYY-MM-DD"),
      },
      ...((type === "room" &&
        ([
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
        ] as TableProps<ITimestampData>["columns"])) ||
        []),
      ...((type === "electricityMeter" &&
        ([
          {
            title: "Energy consumption",
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
        ] as TableProps<ITimestampData>["columns"])) ||
        []),
    ];
    return {
      columns,
      dataSource: timeSeriesDetail.data,
    };
  }, [timeSeriesDetail]);

  return (
    <Modal {...rest}>
      <div className="flex flex-col gap-4">
        <Table dataSource={dataSource} columns={columns} />
      </div>
    </Modal>
  );
};

export { DownloadPreviewModal };
