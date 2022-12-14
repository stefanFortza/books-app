import { useFormik } from "formik";
import { FunctionComponent, useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { db } from "../../../api/database/db";
import bcrypt from "bcryptjs";
import * as yup from "yup";
import { UserContext } from "../../../contexts/user/user.context";
import { useAPI } from "../../../utils/hooks";

interface SignUpFormProps {}

const initialSignUpFormValues = {
  email: "",
  password: "",
  username: "",
  confirmPassword: "",
};

const signUpFormSchema = yup.object({
  email: yup.string().email().required(),
  username: yup.string().min(3).required(),
  password: yup.string().min(3).required(),
  confirmPassword: yup.string().min(3).required(),
});

const SignUpForm: FunctionComponent<SignUpFormProps> = () => {
  const { signInUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { UsersAPI } = useAPI();
  const formik = useFormik({
    initialValues: initialSignUpFormValues,
    validationSchema: signUpFormSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      setSubmitting(false);
      if (values.confirmPassword !== values.password) {
        alert("not good");
        return;
      }
      const hashedPassword = await bcrypt.hash(values.password, 3);
      const user = {
        email: values.email,
        password: hashedPassword,
        username: values.username,
      };
      try {
        const id = await UsersAPI.addUsers(user);
        signInUser({ ...user, id: parseInt(id.toString()) });
      } catch (e: any) {
        if (e.name === "ConstraintError")
          setFieldError("email", "email already taken");
      }
    },
  });

  const { errors, touched, values, handleChange, handleBlur } = formik;
  return (
    <Form
      noValidate
      className="mt-5 border-start p-3 rounded"
      onSubmit={formik.handleSubmit}
    >
      <Form.Group className="mb-3" controlId="emailSignUp">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={touched.email && !errors.email}
          isInvalid={touched.email && !!errors.email}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="usernameSignUp">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          placeholder="Enter username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={touched.username && !errors.username}
          isInvalid={touched.username && !!errors.username}
        />
        <Form.Text className="text-muted">
          We'll never share your userName with anyone else.
        </Form.Text>
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="passwordSignUp">
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={touched.password && !errors.password}
          isInvalid={touched.password && !!errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="confirmPasswordSignUp">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          required
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={touched.confirmPassword && !errors.confirmPassword}
          isInvalid={touched.confirmPassword && !!errors.confirmPassword}
        />
        <Form.Control.Feedback type="invalid">
          {errors.confirmPassword}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default SignUpForm;
