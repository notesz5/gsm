import React, { useState } from "react";
import {
  Button,
  Dialog,
  Grid,
  Typography,
  Paper,
  TextField as MUITextField,
} from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import IconCancel from "@material-ui/icons/Cancel";

import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";

import NumberFormat from "react-number-format";

import * as yup from "yup";

import { Partner } from "./partnerTable";
import "../styles/partnerAddDialog.scss";

interface PartnerEditFormProps {
  editablePartner: Partner;
  handleDialogClose: () => void;
  postData: (values: PartnerEditFormValues) => void;
}

export interface PartnerEditFormValues {
  id: number;
  name: string;
  email: string;
  phone: string;
  postalCode: string;
  city: string;
  street: string;
  streetNumber: string;
}

function PartnerEditForm(props: PartnerEditFormProps) {
  const baseValues: PartnerEditFormValues = {
    id: props.editablePartner.id,
    name: props.editablePartner.name,
    email: props.editablePartner.email,
    phone: props.editablePartner.phone,
    postalCode: props.editablePartner.postalCode,
    city: props.editablePartner.city,
    street: props.editablePartner.street,
    streetNumber: props.editablePartner.streetNumber,
  };

  // eslint-disable-next-line
  const [initialValues, setInitialValues] = useState<PartnerEditFormValues>(
    baseValues
  );

  const phoneRegExp = /^(\+?\d{0,6})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
  const notContainsNumber = /^([^0-9]*)$/;

  const validationSchema = yup.object().shape({
    name: yup.string().required("Required field!"),
    email: yup.string().email("Not valid email!").required("Required field!"),
    phone: yup
      .string()
      .matches(phoneRegExp, "Not valid phone number!")
      .required("Required field!"),
    postalCode: yup
      .string()
      .length(4, "Must be 4 characters long!")
      .required("Required field"),
    city: yup
      .string()
      .matches(notContainsNumber, "Numbers not allowed!")
      .required("Required field!"),
    street: yup.string().required("Required field!"),
    streetNumber: yup.string().required("Required field!"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => props.postData(values)}
      enableReinitialize
    >
      {({
        setFieldValue,
        isValid,
        isSubmitting,
        setFieldTouched,
        touched,
        errors,
        dirty,
      }) => (
        <Form autoComplete="off" className="addDialogForm">
          <Grid container spacing={3}>
            <Paper className="titlePaper">
              <Typography className="title" variant="h4">
                Edit Partner
              </Typography>
            </Paper>

            <Grid item xs={12}>
              <Field
                name="name"
                label={"Partner Name"}
                component={TextField}
                fullWidth
                variant="outlined"
                className="partnerNameField"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Field
                name="email"
                label="Email Address"
                component={TextField}
                fullWidth
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Field name="phone">
                {(props) => (
                  <>
                    <NumberFormat
                      format="+## ## ### ####"
                      customInput={MUITextField}
                      fullWidth
                      variant="outlined"
                      value={props.field.value !== "" ? props.field.value : ""}
                      className={
                        touched.phone && errors.phone
                          ? "numberFormat error"
                          : ""
                      }
                      label="Phone Number"
                      onBlur={() => setFieldTouched("phone", true)}
                      onValueChange={(val) => setFieldValue("phone", val.value)}
                    />
                    {touched.phone && errors.phone && (
                      <p className="errorText">{errors.phone}</p>
                    )}
                  </>
                )}
              </Field>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Field name="postalCode">
                {(props) => (
                  <>
                    <NumberFormat
                      format="####"
                      customInput={MUITextField}
                      fullWidth
                      variant="outlined"
                      value={props.field.value !== "" ? props.field.value : ""}
                      className={
                        touched.postalCode && errors.postalCode
                          ? "numberFormat error"
                          : ""
                      }
                      label="Zip Code"
                      onBlur={() => setFieldTouched("postalCode", true)}
                      onValueChange={(val) =>
                        setFieldValue("postalCode", val.value)
                      }
                    />
                    {touched.postalCode && errors.postalCode && (
                      <p className="errorText">{errors.postalCode}</p>
                    )}
                  </>
                )}
              </Field>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Field
                name="city"
                label="City"
                component={TextField}
                fullWidth
                variant="outlined"
              />
            </Grid>

            <Grid item xs={6} sm={3}>
              <Field
                name="street"
                label="Street"
                component={TextField}
                fullWidth
                variant="outlined"
              />
            </Grid>

            <Grid item xs={6} sm={3}>
              <Field name="streetNumber">
                {(props) => (
                  <>
                    <NumberFormat
                      format="####"
                      customInput={MUITextField}
                      fullWidth
                      variant="outlined"
                      value={props.field.value !== "" ? props.field.value : ""}
                      className={
                        touched.streetNumber && errors.streetNumber
                          ? "numberFormat error"
                          : ""
                      }
                      label="Street Number"
                      onBlur={() => setFieldTouched("streetNumber", true)}
                      onValueChange={(val) =>
                        setFieldValue("streetNumber", val.value)
                      }
                    />
                    {touched.streetNumber && errors.streetNumber && (
                      <p className="errorText">{errors.streetNumber}</p>
                    )}
                  </>
                )}
              </Field>
            </Grid>

            <Grid item xs={6} sm={6} className="cancelButtonGridItem">
              <Button
                startIcon={<IconCancel />}
                className="phoneBuyDialogCancelButton"
                fullWidth
                disableRipple
                variant="outlined"
                onClick={() => props.handleDialogClose()}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6} sm={6} className="submitButtonGridItem">
              <Button
                startIcon={<EditIcon />}
                className="buyDialogFormSubmit"
                fullWidth
                disableRipple
                variant="contained"
                type="submit"
                disabled={!isValid || isSubmitting || !dirty}
              >
                Edit
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

interface PartnerEditDialogProps {
  editDialogOpen: boolean;
  editablePartner: Partner;
  handleDialogClose: () => void;
  handleUpdate: (values: PartnerEditFormValues) => void;
}

export default function PartnerEditDialog(props: PartnerEditDialogProps) {
  const postData = (values: PartnerEditFormValues) => {
    props.handleUpdate(values);

    const updateUrl = process.env.REACT_APP_PARTNERS_UPDATE_URL || "";

    fetch(updateUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(values),
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={props.editDialogOpen}
      className="partnerAddDialog"
    >
      <PartnerEditForm
        editablePartner={props.editablePartner}
        handleDialogClose={props.handleDialogClose}
        postData={postData}
      />
    </Dialog>
  );
}
