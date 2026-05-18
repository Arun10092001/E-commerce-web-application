import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // ✅ make sure to import

import "./SignupPage.css";
import profile from "../../assets/profile.png";
import { signup } from "../../service/userServices";

const schema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name should be at least 3 characters." }),
    email: z.string().email({ message: "Please enter valid email" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirmpassword: z.string(),
    deliveryAddress: z
      .string()
      .min(15, { message: "Address must be at least 15 characters" }),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Confirm password does not match password.",
    path: ["confirmpassword"],
  });

const SignupPage = ({ setUser }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (formData) => {
    try {
      const data = await signup(formData, profilePic);
      const jwtUser = jwtDecode(data.token);
      setUser(jwtUser);
      navigate("/");
    } catch (error) {
      setFormError(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <section className="align_center form_page">
      <form
        className="authentication_form signup_form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>SignUp Form</h2>

        {/* Profile Image */}
        <div className="image_input_section">
          <div className="image_preview">
            <img
              src={profilePic ? URL.createObjectURL(profilePic) : profile}
              alt="profile preview"
            />
          </div>
          <label htmlFor="file-ip-1" className="image_label">
            Upload Image
          </label>
          <input
            type="file"
            id="file-ip-1"
            onChange={(e) => setProfilePic(e.target.files[0])}
            className="image_input"
          />
        </div>

        <div className="form_input signup_form_input">
          {/* Name */}
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              className="form_text_input"
              {...register("name")}
            />
            {errors.name && (
              <em className="form_error">{errors.name.message}</em>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="form_text_input"
              {...register("email")}
            />
            {errors.email && (
              <em className="form_error">{errors.email.message}</em>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form_text_input"
              {...register("password")}
            />
            {errors.password && (
              <em className="form_error">{errors.password.message}</em>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              id="cpassword"
              type="password"
              className="form_text_input"
              {...register("confirmpassword")}
            />
            {errors.confirmpassword && (
              <em className="form_error">{errors.confirmpassword.message}</em>
            )}
          </div>

          {/* Delivery Address */}
          <div>
            <label htmlFor="address">Delivery Address</label>
            <input
              id="address"
              className="input_textarea"
              {...register("deliveryAddress")}
            />
            {errors.deliveryAddress && (
              <em className="form_error">{errors.deliveryAddress.message}</em>
            )}
          </div>
        </div>

        {formError && <em className="form_error">{formError}</em>}

        <button className="search_button form_submit" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default SignupPage;
