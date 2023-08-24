import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (data.username === "admin" && data.password === "admin") {
      navigate("/emi-calculator");
    } else {
      alert("Please, Enter correct username and password");
    }
  };

  return (
    <>
      <div className="container py-5 ">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card">
              <div className="card-body p-5 text-center">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <h3 className="mb-5">Login</h3>

                  <div className="form-outline mb-4">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Enter your username"
                      {...register("username", { required: true })}
                    />
                    {errors.username && (
                      <p className="alert alert-danger alert-dismissible fade show mt-2">
                        <strong>Error! </strong>Username is required.
                      </p>
                    )}
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Enter your password"
                      {...register("password", { required: true })}
                    />
                    {errors.password && (
                      <p className="alert alert-danger alert-dismissible fade show mt-2">
                        <strong>Error! </strong>Password is required.
                      </p>
                    )}
                  </div>

                  <button
                    className="btn btn-primary btn-lg btn-block"
                    type="submit"
                    disabled={!isValid}
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
