import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const EMICalcFrom = () => {
  const [result, setResult] = useState();
  const [total, setTotal] = useState();
  const [payInterest, setPayInterest] = useState();
  const [cal, setCal] = useState([]);
  const [localData, setLocalData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const emiData = localStorage.getItem("EMI-Data");
    let localData = emiData ? JSON.parse(localStorage.getItem("EMI-Data")) : [];
    setLocalData(localData);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data, e) => {
    e.preventDefault();
    let { principal, interest, months } = data;
    History(principal, interest, months);

    localData.push(data);
    setLocalData(localData);
    localStorage.setItem("EMI-data", JSON.stringify(localData));
  };

  const History = (principal, interest, months) => {
    setIsLoading(true);
    setCal([]);
    const rate = interest / (12 * 100);

    const EMI =
      (principal * rate * Math.pow(1 + rate, months)) /
      (Math.pow(1 + rate, months) - 1);

    const total = EMI * months;

    const payInterest = total - principal;

    setResult(Math.round(EMI));
    setTotal(Math.round(total));
    setPayInterest(Math.round(payInterest));
    const ra = interest / 100;

    const Calculation = [];
    for (let i = 1; i <= months; i++) {
      const newInterest = (principal * ra) / 12;

      const cutPrincipal = EMI - newInterest;

      const remainPrincipal = principal - cutPrincipal;

      Calculation.push({ newInterest, cutPrincipal, remainPrincipal });

      principal = remainPrincipal;
    }
    setCal(Calculation);
    setIsLoading(false);
  };
  return (
    <>
      <div className="container py-5 ">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card">
              <div className="card-body p-5 text-center">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <h3 className="mb-5">EMI Calculation</h3>

                  <div className="form-outline mb-4">
                    <label className="form-label">Principal Amount</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter your principal amount"
                      {...register("principal", { required: true, min: 1 })}
                    />

                    {errors.principal && (
                      <p className="alert alert-danger alert-dismissible fade show mt-2">
                        <strong>Error! </strong>Principal amount is required and
                        value must be greater than 0.
                      </p>
                    )}
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label">
                      Rate of Interest (In Percentage)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      step="any"
                      placeholder="Enter your rate of interest"
                      {...register("interest", { required: true, min: 1 })}
                    />

                    {errors.interest && (
                      <p className="alert alert-danger alert-dismissible fade show mt-2">
                        <strong>Error! </strong>interest is required and value
                        must be greater than 0.
                      </p>
                    )}
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label">Duration (In months)</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter your duration in months"
                      {...register("months", { required: true, min: 1 })}
                    />

                    {errors.months && (
                      <p className="alert alert-danger alert-dismissible fade show mt-2">
                        <strong>Error! </strong>duration is required and value
                        must be greater than 0.
                      </p>
                    )}
                  </div>

                  <button
                    className="btn btn-primary btn-lg btn-block"
                    type="submit"
                    disabled={!isValid}
                  >
                    Calculate
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="m-3">
        <h5>EMI (per month) : {result}</h5>
        <h5>Total Interest : {payInterest}</h5>
        <h5>Total Amount : {total}</h5>
      </div>

      <div className="row d-flex justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <hr mt-2></hr>
          <h4>History</h4>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Principal</th>
                <th scope="col">Interest</th>
                <th scope="col">Month</th>
                <th scope="col">EMI Calculation</th>
              </tr>
            </thead>
            <tbody>
              {localData.map((d, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{d.principal}</td>
                    <td>{d.interest}</td>
                    <td>{d.months}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-block"
                        onClick={() =>
                          History(d.principal, d.interest, d.months)
                        }
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="row d-flex justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <h4>Calculation</h4>
          {isLoading === false && (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Month</th>
                  <th scope="col">Principal</th>
                  <th scope="col">Interest</th>
                  <th scope="col">Balance</th>
                </tr>
              </thead>
              <tbody>
                {cal.map((d, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{Math.round(d.newInterest)}</td>
                      <td>{Math.round(d.cutPrincipal)}</td>
                      <td>{Math.round(d.remainPrincipal)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default EMICalcFrom;
