import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./LoginPage.css";
import { login } from "../../service/userservices";

const schema = z.object({
  email: z.string().email({ message: "Please enter valid email address." }),
  password: z.string().min(8, { message: "Password should be at least 8 characters." }),
});

const LoginPage = ({ setUser }) => {
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (formData) => {
    try {
      const response = await login(formData);
      if (response.token) {
        const jwtUser = jwtDecode(response.token);
        setUser(jwtUser);
        navigate("/");
      }
    } catch (error) {
      setFormError("Invalid email or password");
    }
  };

  return (
    <section className="align_center form_page">
      <form className="authentication_form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login Form</h2>
        <div className="form_inputs">
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" className="form_text_input" {...register("email")} />
            {errors.email && <em className="form_error">{errors.email.message}</em>}
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" className="form_text_input" {...register("password")} />
            {errors.password && <em className="form_error">{errors.password.message}</em>}
          </div>

          {formError && <em className="form_error">{formError}</em>}

          <button type="submit" className="search_button form_submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
