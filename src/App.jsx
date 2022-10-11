import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Button, Col, Row, Container, Form, Collapse } from "react-bootstrap";
import { useFormik } from "formik";
import {
  ClientBillRateAnnum,
  EmployeeSalaryHr,
  EmployerTax,
  EmployeePTO,
  OperationalChargers,
  AerosapienProfitAnnum,
  AerosapienProfitMonthly,
} from "./utils/Utils";
function App() {
  const initialValues = {
    ClientBillRateHr: "",
    EmployeeType: "",
    EmployeeSalaryHr: "",
    EmployeeSalaryAnnum: "",
    InsuranceRequired: "",
    NumberofPeople: "",
    EmployeePTO: "",
    OneTimeChargersVISA: "",
    Relocation: "",
  };
  const [fromDetails, setFormDetails] = useState(initialValues);

  const formik = useFormik({
    initialValues,
    onSubmit: values => {
      // alert(JSON.stringify(values, null, 2));
      // console.log(values);
    },
    validate: values => {
      let errors = {};
      if (!values.ClientBillRateHr) {
        errors.ClientBillRateHr = "required";
      }
      if (!values.EmployeeSalaryAnnum) {
        errors.EmployeeSalaryAnnum = "required";
      }
      if (!values.Relocation) {
        errors.Relocation = "required";
      }
      if (!values.OneTimeChargersVISA) {
        errors.OneTimeChargersVISA = "required";
      }
      return errors;
    },
  });
  const HndleKeyPress = e => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };
  useEffect(() => {}, [formik]);
  return (
    <div>
      <Container>
        <Form onSubmit={formik.handleSubmit}>
          <Row className="text-center mb-4">
            <h2>Recruiter Calculator</h2>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Client Bill Rate $/Hr</Form.Label>
                <Form.Control
                  type="text"
                  name="ClientBillRateHr"
                  placeholder="Client Bill Rate $/Hr"
                  onChange={formik.handleChange}
                  value={formik.values.ClientBillRateHr}
                  onKeyPress={e => HndleKeyPress(e)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Client Bill Rate $/Annum</Form.Label>
                <p>
                  <b>{ClientBillRateAnnum(formik.values.ClientBillRateHr)}</b>
                </p>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Label>Employee Type</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={formik.handleChange}
                name="EmployeeType"
                value={formik.values.EmployeeType}
                disabled={formik.values.ClientBillRateHr > 0 ? false : true}
              >
                <option value="">select one</option>
                <option value="w2">W2</option>
                <option value="1099">1099</option>
              </Form.Select>
            </Col>
          </Row>
          <div className={formik.values.EmployeeType ? "d-lg-block" : "d-none"}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label> Employee Salary $/Annum</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Employee Salary $/Annum"
                    onChange={formik.handleChange}
                    name="EmployeeSalaryAnnum"
                    value={formik.values.EmployeeSalaryAnnum}
                    onKeyPress={e => HndleKeyPress(e)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Employee Salary $/Hr</Form.Label>
                  <p>
                    <b>{EmployeeSalaryHr(formik.values.EmployeeSalaryAnnum)}</b>
                  </p>
                </Form.Group>
              </Col>
            </Row>
            <div
              className={
                formik.values.EmployeeType === "1099" ? "d-none" : "d-lg-block"
              }
            >
              <div
                className={
                  formik.values.EmployeeSalaryAnnum > 0
                    ? "d-lg-block"
                    : "d-none"
                }
              >
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Employer Tax</Form.Label>
                      <p>
                        <b>{EmployerTax(formik.values.EmployeeSalaryAnnum)}</b>
                      </p>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>Insurance Required</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={formik.handleChange}
                      name="InsuranceRequired"
                      value={formik.values.InsuranceRequired}
                    >
                      <option value="select one">select one</option>
                      <option value="yes">YES</option>
                      <option value="no">NO</option>
                    </Form.Select>
                  </Col>
                  <Col
                    md={6}
                    className={
                      formik.values.InsuranceRequired === "yes"
                        ? "mb-3 d-lg-block"
                        : "d-none"
                    }
                  >
                    <Form.Label>Number of People</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={formik.handleChange}
                      name="NumberofPeople"
                      value={formik.values.NumberofPeople}
                    >
                      <option value="0">select one</option>
                      <option value="400">Employee Only</option>
                      <option value="800">Employee + Spouse</option>
                      <option value="1200">Employee + 2 Dependents</option>
                      <option value="1400">Employee + 3 Dependents</option>
                    </Form.Select>
                  </Col>
                </Row>
              </div>
              <div
                className={
                  formik.values.InsuranceRequired === "yes"
                    ? formik.values.NumberofPeople > 0
                      ? "d-lg-block"
                      : "d-none"
                    : formik.values.InsuranceRequired === "no"
                    ? "d-lg-block"
                    : "d-none"
                }
              >
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Employee PTO</Form.Label>
                      <p>
                        <b>{EmployeePTO(formik.values.ClientBillRateHr)}</b>
                      </p>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>One Time Chargers/VISA</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="One Time Chargers/VISA"
                        onChange={formik.handleChange}
                        name="OneTimeChargersVISA"
                        value={formik.values.OneTimeChargersVISA}
                        onKeyPress={e => HndleKeyPress(e)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Relocation</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Relocation"
                        onChange={formik.handleChange}
                        name="Relocation"
                        value={formik.values.Relocation}
                        onKeyPress={e => HndleKeyPress(e)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Operational Chargers</Form.Label>
                      <p>
                        <b>
                          {OperationalChargers(formik.values.ClientBillRateHr)}
                        </b>
                      </p>
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            </div>
            <div
              // className={
              //   formik.values.EmployeeSalaryAnnum > 0 ? "d-lg-block" : "d-none"
              // }
              className={
                formik.values.InsuranceRequired === "yes"
                  ? formik.values.NumberofPeople > 0
                    ? "d-lg-block"
                    : "d-none"
                  : formik.values.InsuranceRequired === "no"
                  ? "d-lg-block"
                  : formik.values.EmployeeType === "1099" &&
                    formik.values.EmployeeSalaryAnnum > 0
                  ? "d-lg-block"
                  : "d-none"
              }
            >
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Label>Aerosapien Profit $/Annum</Form.Label>
                    <p>
                      <b>
                        {AerosapienProfitAnnum(
                          formik.values.ClientBillRateHr,
                          formik.values.EmployeeSalaryAnnum,
                          formik.values.NumberofPeople || 0,
                          formik.values.OneTimeChargersVISA || 0,
                          formik.values.Relocation || 0,
                          formik.values.EmployeeType
                        )}
                      </b>
                    </p>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Label>Aerosapien Profit $/Monthly</Form.Label>
                    <p>
                      <b>
                        {AerosapienProfitMonthly(
                          formik.values.ClientBillRateHr,
                          formik.values.EmployeeSalaryAnnum,
                          formik.values.NumberofPeople || 0,
                          formik.values.OneTimeChargersVISA || 0,
                          formik.values.Relocation || 0,
                          formik.values.EmployeeType
                        )}
                      </b>
                    </p>
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </div>
          <Row>
            <Button
              variant="warning"
              size="lg"
              type="reset"
              onClick={formik.handleReset}
            >
              Reset
            </Button>
          </Row>
        </Form>
      </Container>
    </div>
  );
}

export default App;
