const naiveRound = (num, decimalPlaces = 0) => {
  var p = Math.pow(10, decimalPlaces);
  return Math.round(num * p) / p;
};
export const ClientBillRateAnnum = data => {
  return parseInt(data) * 2000 || 0;
};
export const EmployeeSalaryHr = data => {
  let num = parseInt(data) / 1920 || 0;
  return naiveRound(num, 2);
};
export const EmployerTax = data => {
  return (parseInt(data) * 11) / 100 || 0;
};

export const EmployeePTO = data => {
  return parseInt(data) * 64 || 0;
};
export const OperationalChargers = data => {
  return parseInt((ClientBillRateAnnum(data) * 2) / 100) || 0;
};
export const AerosapienProfitAnnum = (
  ClientBillRateHr,
  EmployeeSalaryAnnum,
  noOfPeple,
  visa,
  realocation,
  flag
) => {
  if (flag === "w2") {
    return (
      parseInt(ClientBillRateAnnum(ClientBillRateHr)) -
      (parseInt(EmployeeSalaryAnnum) +
        parseInt(EmployerTax(EmployeeSalaryAnnum)) +
        parseInt(noOfPeple) * 12 +
        parseInt(EmployeePTO(ClientBillRateHr)) +
        parseInt(visa) +
        parseInt(realocation) +
        parseInt(OperationalChargers(ClientBillRateHr)))
    );
  } else {
    return (
      parseInt(ClientBillRateAnnum(ClientBillRateHr)) -
      parseInt(EmployeeSalaryAnnum)
    );
  }
};

export const AerosapienProfitMonthly = (a, b, c, d, f, g) => {
  let monthval = parseInt(AerosapienProfitAnnum(a, b, c, d, f, g)) / 12;
  return naiveRound(monthval, 2);
};
