import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Button, Col, Row, Container, Form } from "react-bootstrap";
import { useFormik } from "formik";
function App() {
  const [count, setCount] = useState(0);
  const HndleKeyPress = e => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const formik = useFormik({
    initialValues: {
      ClientBillRateHr: "", 
      EmployeeType: "",
      EmployeeSalaryHr: "",
      EmployeeSalaryAnnum: "",
      InsuranceRequired: "",
      NumberofPeople: "",
      EmployeePTO: "",
      OneTimeChargersVISA: "",
      Relocation: "",
    },
    onSubmit: values => {
      // alert(JSON.stringify(values, null, 2));
      console.log(values);
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
  let x1 =
    parseInt(formik.values.EmployeeSalaryAnnum || 1) +
    (parseInt(formik.values.EmployeeSalaryAnnum || 1) * 11) / 100 +
    parseInt((formik.values.NumberofPeople*12) || 400) +
    parseInt(formik.values.ClientBillRateHr || 1) * 64 +
    parseInt(formik.values.OneTimeChargersVISA || 0) +
    parseInt(formik.values.Relocation || 0);
  let x2 = parseInt(formik.values.ClientBillRateHr) * 2000;
  let prePopulate = {
    ClientBillRateAnnum: formik.values.ClientBillRateHr * 2000,
    EmployeeSalaryHr: formik.values.EmployeeSalaryAnnum / 1920,
    EmployerTax: (formik.values.EmployeeSalaryAnnum * 11) / 100,
    EmployeePTO: formik.values.ClientBillRateHr * 64,
    OperationalChargers: (formik.values.ClientBillRateHr * 2000 * 2) / 100,
    AerosapienProfitAnnum: x2 - x1,
    AerosapienProfitMonthly: (x2 - x1) / 12,
  };

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
                <div className="text-danger">
                  <b>{formik.errors.ClientBillRateHr}</b>
                </div>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Client Bill Rate $/Annum</Form.Label>
                {/* <Form.Control
                  type="text"
                  placeholder="Client Bill Rate $/Annum"
                  // onChange={formik.handleChange}
                  name="ClientBillRateAnnum"
                  value={prePopulate.ClientBillRateAnnum}
                /> */}
                <p>
                  <b>{prePopulate.ClientBillRateAnnum}</b>
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
              >
                <option value="1">W2</option>
                <option value="2">1099</option>
              </Form.Select>
            </Col>
          </Row>
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
                <div className="text-danger">
                  <b>{formik.errors.EmployeeSalaryAnnum}</b>
                </div>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Employee Salary $/Hr</Form.Label>
                {/* <Form.Control
                  type="text"
                  placeholder="Employee Salary $/Hr"
                  // onChange={formik.handleChange}
                  name="EmployeeSalaryHr"
                  value={prePopulate.EmployeeSalaryHr}
                /> */}
                <p>
                  <b>{prePopulate.EmployeeSalaryHr}</b>
                </p>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Employer Tax</Form.Label>
                {/* <Form.Control
                  type="text"
                  placeholder="Employer Tax"
                  // onChange={formik.handleChange}
                  name="EmployerTax"
                  value={prePopulate.EmployerTax}
                /> */}
                <p>
                  <b>{prePopulate.EmployerTax}</b>
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
                <option value="1">YES</option>
                <option value="2">NO</option>
              </Form.Select>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Label>Number of People</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={formik.handleChange}
                name="NumberofPeople"
                value={formik.values.NumberofPeople}
              >
                <option value="400">Employee Only</option>
                <option value="800">Employee + Spouse</option>
                <option value="1200">Employee + 2 Dependents</option>
                <option value="1400">Employee + 3 Dependents</option>
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Employee PTO</Form.Label>
                {/* <Form.Control
                  type="text"
                  placeholder="Client Bill Rate $/Hr"
                  // onChange={formik.handleChange}
                  name="EmployeePTO"
                  value={prePopulate.EmployeePTO}
                /> */}
                <p>
                  <b>{prePopulate.EmployeePTO}</b>
                </p>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>One Time Chargers/VISA</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Client Bill Rate $/Annum"
                  onChange={formik.handleChange}
                  name="OneTimeChargersVISA"
                  value={formik.values.OneTimeChargersVISA}
                  onKeyPress={e => HndleKeyPress(e)}
                />
                <div className="text-danger">
                  <b> {formik.errors.OneTimeChargersVISA}</b>
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Relocation</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Client Bill Rate $/Hr"
                  onChange={formik.handleChange}
                  name="Relocation"
                  value={formik.values.Relocation}
                  onKeyPress={e => HndleKeyPress(e)}
                />
                <div className="text-danger">
                  <b>{formik.errors.Relocation}</b>
                </div>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Operational Chargers</Form.Label>
                {/* <Form.Control
                  type="text"
                  placeholder="Client Bill Rate $/Annum"
                  // onChange={formik.handleChange}
                  name="OperationalChargers"
                  value={prePopulate.OperationalChargers}
                /> */}
                <p>
                  <b>{prePopulate.OperationalChargers}</b>
                </p>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-2" controlId="formBasicEmail">
                <Form.Label>Aerosapien Profit $/Annum</Form.Label>
                {/* <Form.Control
                  type="text"
                  placeholder="Client Bill Rate $/Hr"
                  name="AerosapienProfitAnnum"
                  value={prePopulate.AerosapienProfitAnnum}
                /> */}
                <p>
                  <b>{prePopulate.AerosapienProfitAnnum}</b>
                </p>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-2" controlId="formBasicEmail">
                <Form.Label>Aerosapien Profit $/Monthly</Form.Label>
                {/* <Form.Control
                  type="text"
                  placeholder="Client Bill Rate $/Annum"
                  onChange={formik.handleChange}
                  name="AerosapienProfitMonthly"
                /> */}
                <p>
                  <b>{prePopulate.AerosapienProfitMonthly}</b>
                </p>
              </Form.Group>
            </Col>
          </Row>
          {/* <Row>
            <Button variant="warning" size="lg" type="submit">
              Warning
            </Button>
          </Row> */}
        </Form>
      </Container>
    </div>
  );
}

export default App;
