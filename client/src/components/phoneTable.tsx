import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

import "../styles/table.scss";

import CustomToolbarSelect from "./phoneCustomToolbarSelect";
import CustomToolbar from "./phoneCustomToolbar";
import LoadingScreen from "./loadingScreen";

import { SellListFormValues } from "./phoneSellDialog";
import { PhoneEditFormValues } from "./phoneEditDialog";
import { Partner } from "./partnerTable";

export interface PhoneData {
  id: number;
  gsmItemId: number;
  imei: string;
  gsmDeviceId: number;
  brand: string;
  type: string;
  gsmPartnerId: number;
  boughtFrom: string;
  buyPrice: number;
  gsmPartner2Id: number;
  soldTo: string;
  salePrice: number;
  used: boolean;
  sold: boolean;
}

export interface Device {
  id: number;
  brand: string;
  type: string;
}

export function createPhoneData(
  id: number,
  gsmItemId: number,
  imei: string,
  gsmDeviceId: number,
  brand: string,
  type: string,
  gsmPartnerId: number,
  boughtFrom: string,
  buyPrice: number,
  gsmPartner2Id: number,
  soldTo: string,
  sellPrice: number,
  used: boolean,
  sold: boolean
): PhoneData {
  return {
    id,
    gsmItemId,
    imei,
    gsmDeviceId,
    brand,
    type,
    gsmPartnerId,
    boughtFrom,
    buyPrice,
    gsmPartner2Id,
    soldTo,
    salePrice: sellPrice,
    used,
    sold,
  };
}

export default function PhoneTable() {
  const [phoneData, setPhoneData] = useState<PhoneData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [devices, setDevices] = useState<Device[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);

  const getData = () => {
    const phoneGetAll = process.env.REACT_APP_STORAGE_GET_ALL_URL || "";
    const deviceGetAll = process.env.REACT_APP_DEVICES_GET_ALL_URL || "";
    const partnerGetAll = process.env.REACT_APP_PARTNERS_GET_ALL_URL || "";

    const phoneDataResult: PhoneData[] = [];
    const deviceDataResult: Device[] = [];
    const partnerDataResult: Partner[] = [];

    fetch(phoneGetAll, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        data.forEach((item) => {
          if (item.sold) {
            phoneDataResult.push(
              createPhoneData(
                item.id,
                item.gsmItemId.id,
                item.gsmItemId.imei,
                item.gsmItemId.gsmDeviceId.id,
                item.gsmItemId.gsmDeviceId.brand,
                item.gsmItemId.gsmDeviceId.type,
                item.gsmPartnerId.id,
                item.gsmPartnerId.name,
                item.buyPrice,
                item.gsmPartner2Id.id,
                item.gsmPartner2Id.name,
                item.salePrice,
                item.gsmItemId.used,
                item.sold
              )
            );
          } else {
            phoneDataResult.push(
              createPhoneData(
                item.id,
                item.gsmItemId.id,
                item.gsmItemId.imei,
                item.gsmItemId.gsmDeviceId.id,
                item.gsmItemId.gsmDeviceId.brand,
                item.gsmItemId.gsmDeviceId.type,
                item.gsmPartnerId.id,
                item.gsmPartnerId.name,
                item.buyPrice,
                0,
                "",
                0,
                item.gsmItemId.used,
                item.sold
              )
            );
          }
        });
        setPhoneData(phoneDataResult);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(deviceGetAll, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        data.forEach((item) => {
          deviceDataResult.push(item);
        });
        setDevices(deviceDataResult);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(partnerGetAll, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        data.forEach((item) => {
          partnerDataResult.push(item);
        });
        setPartners(partnerDataResult);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (
    selectedRows: number[],
    setSelectedRows: (selectedRows: number[]) => void
  ) => {
    setPhoneData(phoneData.filter((phone) => !selectedRows.includes(phone.id)));
    setSelectedRows([]);

    const deleteUrl = process.env.REACT_APP_STORAGE_DELETE_URL || "";

    fetch(deleteUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(selectedRows),
    }).catch((err) => {
      console.log(err);
    });
  };

  const handleUpdate = (values: PhoneEditFormValues) => {
    let updated: PhoneData[] = [...phoneData];

    const updatableIndex = phoneData.findIndex(
      (phone) => phone.id === values.id
    );

    updated[updatableIndex] = {
      ...updated[updatableIndex],
      imei: values.gsmItemId.imei,
      gsmDeviceId: values.gsmItemId.gsmDeviceId.id,
      brand: values.gsmItemId.gsmDeviceId.brand,
      type: values.gsmItemId.gsmDeviceId.type,
      used: values.gsmItemId.used,
      buyPrice: values.buyPrice,
      gsmPartnerId: values.gsmPartnerId.id,
      boughtFrom: values.gsmPartnerId.name,
      salePrice: values.salePrice,
      gsmPartner2Id: values.gsmPartner2Id.id,
      soldTo: values.gsmPartner2Id.name,
    };

    setPhoneData(updated);
  };

  const handleSellPhones = (soldPhones: SellListFormValues[]) => {
    let updated = [...phoneData];

    soldPhones.forEach((soldPhone) => {
      const updatableIndex = phoneData.findIndex(
        (phone) => phone.id === soldPhone.id
      );

      updated[updatableIndex] = {
        ...updated[updatableIndex],
        sold: true,
        soldTo: soldPhone.soldTo,
        salePrice: soldPhone.salePrice,
        gsmPartner2Id: soldPhone.gsmPartner2Id,
      };
    });

    setPhoneData(updated);
  };

  const handleAdd = (phones: PhoneData[]) => {
    setPhoneData([...phoneData, ...phones]);
  };

  const columns = [
    {
      name: "id",
      label: "id",
      options: {
        filter: false,
        display: false,
      },
    },
    {
      name: "imei",
      label: "IMEI",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "brand",
      label: "Brand",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "type",
      label: "Type",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "boughtFrom",
      label: "Bought From",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "buyPrice",
      label: "Buy Price",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          const nf = new Intl.NumberFormat("HU", {
            style: "currency",
            currency: "HUF",
            minimumFractionDigits: 0,
          });
          return nf.format(value);
        },
      },
    },
    {
      name: "soldTo",
      label: "Sold To",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          if (value === "") {
            return "";
          }
          return value;
        },
      },
    },
    {
      name: "salePrice",
      label: "Sale Price",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          if (value === 0) {
            return "";
          }
          const nf = new Intl.NumberFormat("HU", {
            style: "currency",
            currency: "HUF",
            minimumFractionDigits: 0,
          });
          return nf.format(value);
        },
      },
    },
    {
      name: "used",
      label: "Used",
      options: {
        filter: true,
        sort: false,
        filterOptions: {
          names: ["Used", "New"],
          logic(value, filters) {
            if (filters.length > 1) {
              return null;
            } else if (filters[0] === "Used") {
              return !value;
            } else if (filters[0] === "New") {
              return value;
            }
          },
        },
        customBodyRender: (value) => {
          if (value) {
            return <CheckBoxIcon className="usedCheckbox" />;
          }
          return <CheckBoxOutlineBlankIcon className="usedCheckbox" />;
        },
      },
    },
    {
      name: "sold",
      label: "Sold",
      options: {
        filter: true,
        sort: false,
        display: false,
        customBodyRender: (value) => {
          if (value) {
            return "Sold";
          }
          return "In Stock";
        },
      },
    },
  ];

  const options = {
    viewColumns: false,
    download: false,
    print: false,
    selectableRows: "multiple",
    rowsPerPage: 20,
    rowsPerPageOptions: [5, 10, 15, 20],
    filterType: "checkbox",
    responsive: "standard",
    sortOrder: {
      name: "sold",
      direction: "asc",
    },
    setRowProps: (row) => {
      return {
        className: row[9] === "Sold" ? "sold" : "inStock",
      };
    },
    customToolbar: () => {
      return (
        <CustomToolbar
          devices={devices}
          partners={partners}
          handleAddNewPhones={handleAdd}
        />
      );
    },
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => {
      const selectedDataIndexes: number[] = selectedRows.data.map((item) => {
        return item.dataIndex;
      });

      const selectedIds: number[] = [];

      selectedDataIndexes.forEach((dataIndex) => {
        displayData.forEach((displayDataItem) => {
          if (dataIndex === displayDataItem.dataIndex) {
            selectedIds.push(displayDataItem.data[0]);
          }
        });
      });

      const filtered: boolean[] = [];

      selectedDataIndexes.forEach((dataIndex) => {
        displayData.forEach((displayDataItem) => {
          if (
            dataIndex === displayDataItem.dataIndex &&
            displayDataItem.data[9] === "Sold"
          ) {
            filtered.push(false);
          }
          filtered.push(true);
        });
      });

      const sellRendered = filtered.includes(false) ? false : true;

      const selectedPhoneData: PhoneData[] = [];

      selectedIds.forEach((selectedId) => {
        phoneData.forEach((phoneData) => {
          phoneData.id === selectedId && selectedPhoneData.push(phoneData);
        });
      });

      const editRendered: boolean = selectedIds.length === 1 ? true : false;

      const editablePhone: PhoneData = phoneData.filter(
        (phone) => phone.id === selectedIds[0]
      )[0];

      return (
        <CustomToolbarSelect
          shouldSellButtonRender={sellRendered}
          shouldEditButtonRender={editRendered}
          handleDelete={() => handleDelete(selectedIds, setSelectedRows)}
          selectedPhoneData={selectedPhoneData}
          partners={partners}
          devices={devices}
          selectedIds={selectedIds}
          setSelectedRows={setSelectedRows}
          handleSellPhones={handleSellPhones}
          editablePhone={editablePhone}
          handleUpdate={handleUpdate}
        />
      );
    },
    textLabels: {
      body: {
        noMatch: "No matching records found...",
      },
      selectedRows: {
        text: "phone(s) selected",
      },
    },
  };

  useEffect(() => {
    setIsLoading(true);
    getData();
  }, []);

  useEffect(() => {
    const t_id = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, 1200);
    return () => {
      clearTimeout(t_id);
    };
  }, [isLoading]);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <div className="wrapper">
      <MUIDataTable
        title="Phones"
        columns={columns}
        data={phoneData}
        options={options}
      />
    </div>
  );
}
