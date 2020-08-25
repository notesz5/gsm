import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";

import LoadingScreen from "./loadingScreen";
import CustomToolbar from "./partnerCustomToolbar";
import CustomToolbarSelect from "./partnerCustomToolbarSelect";
import NumberFormat from "react-number-format";

import "../styles/table.scss";
import { PartnerEditFormValues } from "./partnerEditDialog";

export interface Partner {
  id: number;
  name: string;
  email: string;
  phone: string;
  postalCode: string;
  city: string;
  street: string;
  streetNumber: string;
}

export default function PartnerTable() {
  const [partnerData, setPartnerData] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getData = () => {
    const partnerGetAll = process.env.REACT_APP_PARTNERS_GET_ALL_URL || "";
    const partnerDataResult: Partner[] = [];

    fetch(partnerGetAll)
      .then((resp) => resp.json())
      .then((data) => {
        data.forEach((item) => {
          partnerDataResult.push(item);
        });
        setPartnerData(partnerDataResult);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAdd = (partners: Partner[]) => {
    setPartnerData([...partnerData, ...partners]);
  };

  const handleUpdate = (values: PartnerEditFormValues) => {
    let updated: Partner[] = [...partnerData];

    const updatableIndex = partnerData.findIndex(
      (partner) => partner.id === values.id
    );

    updated[updatableIndex] = {
      ...updated[updatableIndex],
      name: values.name,
      email: values.email,
      phone: values.phone,
      postalCode: values.postalCode,
      city: values.city,
      street: values.street,
      streetNumber: values.streetNumber,
    };

    setPartnerData(updated);
  };

  const handleDelete = (
    selectedRows: number[],
    setSelectedRows: (selectedRows: number[]) => void
  ) => {
    setPartnerData(
      partnerData.filter((partner) => !selectedRows.includes(partner.id))
    );
    setSelectedRows([]);

    const deleteUrl = process.env.REACT_APP_PARTNERS_DELETE_URL || "";

    fetch(deleteUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedRows),
    }).catch((err) => {
      console.log(err);
    });
  };

  const columns = [
    {
      name: "id",
      label: "id",
      options: { filter: false, sort: false, display: false },
    },
    {
      name: "name",
      label: "Name",
      options: { filter: false, sort: false },
    },
    {
      name: "email",
      label: "Email",
      options: { filter: false, sort: false },
    },
    {
      name: "phone",
      label: "Phone",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          return (
            <NumberFormat
              displayType="text"
              format="+## ## ### ####"
              value={value}
            />
          );
        },
      },
    },
    {
      name: "postalCode",
      label: "Postal Code",
      options: { filter: false, sort: false },
    },
    {
      name: "city",
      label: "City",
      options: { filter: false, sort: false },
    },
    {
      name: "street",
      label: "Street",
      options: { filter: false, sort: false },
    },
    {
      name: "streetNumber",
      label: "Street Number",
      options: { filter: false, sort: false },
    },
  ];

  const options = {
    viewColumns: false,
    download: false,
    print: false,
    filter: false,
    selectableRows: "multiple",
    rowsPerPage: 20,
    rowsPerPageOptions: [5, 10, 15, 20],
    responsive: "standard",
    setRowProps: (row) => {
      return {
        className: "partnerRow",
      };
    },
    sortOrder: {
      name: "id",
      direction: "asc",
    },
    customToolbar: () => {
      return <CustomToolbar handleAddNewPartners={handleAdd} />;
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

      const selectedPartners: Partner[] = [];

      selectedIds.forEach((selectedId) => {
        partnerData.forEach((partner) => {
          partner.id === selectedId && selectedPartners.push(partner);
        });
      });

      const editRendered: boolean = selectedIds.length === 1 ? true : false;

      const editablePartner: Partner = partnerData.filter(
        (partner) => partner.id === selectedIds[0]
      )[0];

      return (
        <CustomToolbarSelect
          editablePartner={editablePartner}
          shouldEditButtonRender={editRendered}
          setSelectedRows={setSelectedRows}
          handleUpdate={handleUpdate}
          selectedIds={selectedIds}
          handleDelete={() => handleDelete(selectedIds, setSelectedRows)}
        />
      );
    },
    textLabels: {
      body: {
        noMatch: "No matching records found...",
      },
      selectedRows: {
        text: "partner(s) selected",
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
        title="Partners"
        columns={columns}
        data={partnerData}
        options={options}
      />
    </div>
  );
}
