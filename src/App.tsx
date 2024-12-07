import { Line, LineConfig } from "@ant-design/charts";
import { DownloadOutlined } from "@ant-design/icons";
import {
  Col,
  Dropdown,
  MenuProps,
  message,
  Radio,
  RadioChangeEvent,
  Row,
  Typography,
} from "antd";
import { NoticeType } from "antd/es/message/interface";
import dayjs from "dayjs";
import { unparse } from "papaparse";
import { useMemo, useState } from "react";
import {
  AppDatePicker,
  AppDateRangePicker,
  AppSelect,
  DownloadPreviewModal,
} from "./components";
import {
  useGetElectricityMeterByIdQuery,
  useGetElectricityMetersQuery,
  useGetHeadquartersQuery,
  useGetRoomByIdQuery,
  useGetRoomsQuery,
} from "./hooks";
import { IRoomData } from "./interfaces";
import { delay } from "./utils";

const items: MenuProps["items"] = [
  {
    key: "csv",
    label: "Download CSV file",
  },
  {
    key: "json",
    label: "Download JSON file",
  },
];

function App() {
  const [messageApi, contextHolder] = message.useMessage();

  const [headquarterId, setHeadquarterId] = useState<string | undefined>();
  const [roomId, setRoomId] = useState<string | undefined>();
  const [electricityMeterId, setElectricityMeterId] = useState<
    string | undefined
  >();
  const [isShowPreviewModal, setIsShowPreviewModal] = useState(false);
  const [resultDownloadType, setResultDownloadType] =
    useState<string>("success");
  const [isDownloading, setIsDownloading] = useState(false);

  const { headquarters, onPopupScroll, isFetching } = useGetHeadquartersQuery({
    query: {
      name: "",
      _page: 1,
      _per_page: 10,
    },
  });
  const { rooms } = useGetRoomsQuery({
    query: {
      name: "",
      _page: 1,
      _per_page: 10,
      headquarterId: headquarterId,
    },
  });
  const { electricityMeters } = useGetElectricityMetersQuery({
    query: {
      name: "",
      _page: 1,
      _per_page: 10,
      headquarterId: headquarterId,
    },
  });

  const { room } = useGetRoomByIdQuery({
    id: roomId,
  });
  const { electricityMeter } = useGetElectricityMeterByIdQuery({
    id: electricityMeterId,
  });

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "csv") {
      return onDownloadCsvFile();
    }

    return onDownloadJsonFile();
  };

  const onDownloadCsvFile = async () => {
    if (!room && !electricityMeter) return;

    try {
      setIsDownloading(true);

      if (resultDownloadType === "fail") {
        await delay(3000);
        throw new Error("Download CSV file failed");
      }

      let csvContent = "";

      if (room) {
        const roomCSV = unparse(room.data, { header: true });
        csvContent += `${room?.name}\n${roomCSV}\n\n`;
      }

      if (electricityMeter) {
        const electricityMeterCSV = unparse(electricityMeter.data, {
          header: true,
        });
        csvContent += `${electricityMeter.name}\n${electricityMeterCSV}`;
      }

      await delay(3000);

      await onDownloadFile(
        csvContent,
        "text/csv;charset=utf-8;",
        "time-series-download.csv"
      );

      onShowNotification(
        "success",
        "The CSV file has been downloaded successfully"
      );

      onShowPreviewModal();
    } catch (error) {
      onShowNotification("error", (error as Error).message);
    } finally {
      setIsDownloading(false);
    }
  };
  const onDownloadJsonFile = async () => {
    if (!room && !electricityMeter) return;

    try {
      setIsDownloading(true);

      if (resultDownloadType === "fail") {
        await delay(3000);
        throw new Error("Download JSON file failed");
      }

      const jsonContent = JSON.stringify(
        {
          ...(room?.data && { room: room?.data }),
          ...(electricityMeter?.data && {
            electricityMeter: electricityMeter?.data,
          }),
        },
        null,
        2
      );

      await delay(3000);

      await onDownloadFile(
        jsonContent,
        "application/json",
        "time-series-download.json"
      );

      onShowNotification(
        "success",
        "The JSON file has been downloaded successfully"
      );

      onShowPreviewModal();
    } catch (error) {
      onShowNotification("error", (error as Error).message);
    } finally {
      setIsDownloading(false);
    }
  };

  const onDownloadFile = (content: string, type: string, fileName: string) => {
    return new Promise((resolve) => {
      const blob = new Blob([content], { type });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      resolve({ success: true });
    });
  };

  const onShowPreviewModal = () => {
    setIsShowPreviewModal(true);
  };
  const onClosePreviewModal = () => {
    setIsShowPreviewModal(false);
  };

  const onChangeResultDownloadType = (e: RadioChangeEvent) => {
    setResultDownloadType(e.target.value);
  };

  const roomChartConfig: LineConfig = useMemo(
    () => ({
      data: {
        value: room?.data,
        transform: [
          {
            type: "fold",
            fields: ["temperature", "humidity"],
            key: "type",
            value: "value",
          },
        ],
      },
      xField: (item: IRoomData) => {
        return dayjs(item.timestamp).format("YYYY-MM-DD");
      },
      yField: "value",
      colorField: "type",
      axis: {
        x: { labelAutoHide: "greedy" },
      },
      smooth: true,
    }),
    [room]
  );

  const electricityMeterChartConfig: LineConfig = useMemo(
    () => ({
      data: {
        value: electricityMeter?.data,
        transform: [
          {
            type: "fold",
            fields: ["energyConsumption", "cost"],
            key: "type",
            value: "value",
          },
        ],
      },
      xField: (row: IRoomData) => {
        return dayjs(row.timestamp).format("YYYY-MM-DD");
      },
      yField: "value",
      colorField: "type",
      axis: {
        x: { labelAutoHide: "greedy" },
      },
    }),
    [electricityMeter]
  );

  const onShowNotification = (type: NoticeType, message: string) => {
    messageApi.open({
      content: message,
      type,
    });
  };

  return (
    <div className="flex flex-col gap-6 py-6 px-8">
      <Row gutter={[24, 16]}>
        <Col span={8}>
          <AppSelect
            label="Select Headquarter"
            options={headquarters.map((hq) => ({
              label: hq.name,
              value: hq.id,
            }))}
            onPopupScroll={onPopupScroll}
            isFetching={isFetching}
            onChange={(value) => setHeadquarterId(value)}
            value={headquarterId}
          />
        </Col>
        <Col span={8}>
          <AppSelect
            label="Select Room"
            options={rooms.map((room) => ({
              label: room.name,
              value: room.id,
            }))}
            onChange={(value) => setRoomId(value)}
            value={roomId}
          />
        </Col>
        <Col span={8}>
          <AppSelect
            label="Select Electricity Meter"
            options={electricityMeters.map((meter) => ({
              label: meter.name,
              value: meter.id,
            }))}
            onChange={(value) => setElectricityMeterId(value)}
            value={electricityMeterId}
          />
        </Col>
        {(room || electricityMeter) && (
          <>
            <Col span={8}>
              <AppDatePicker label="Select Time Series" />
            </Col>
            <Col span={8}>
              <AppDateRangePicker label="Select Date Range" />
            </Col>
            <Col span={8} className="mt-auto">
              <Radio.Group
                onChange={onChangeResultDownloadType}
                value={resultDownloadType}
              >
                <Radio value="success">Download success</Radio>
                <Radio value="fail">Download fail</Radio>
              </Radio.Group>
              <Dropdown.Button
                menu={{
                  items,
                  onClick: handleMenuClick,
                }}
                type="primary"
                trigger={["click"]}
                icon={<DownloadOutlined />}
                loading={isDownloading}
              >
                Download
              </Dropdown.Button>
            </Col>
          </>
        )}
      </Row>
      {room && (
        <Row>
          <Col span={24}>
            <Typography.Title level={4}>{room.name}</Typography.Title>
            <Line {...roomChartConfig} />
          </Col>
        </Row>
      )}
      {electricityMeter && (
        <Row>
          <Col span={24}>
            <Typography.Title level={4}>
              {electricityMeter.name}
            </Typography.Title>
            <Line {...electricityMeterChartConfig} />
          </Col>
        </Row>
      )}
      <DownloadPreviewModal
        open={isShowPreviewModal}
        electricityMeter={electricityMeter}
        centered
        title="Time series downloaded"
        room={room}
        onCancel={onClosePreviewModal}
        footer={null}
        width={600}
      />
      {contextHolder}
    </div>
  );
}

export default App;
