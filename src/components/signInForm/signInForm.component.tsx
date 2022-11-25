import { useFormik } from "formik";
import localforage from "localforage";
import { FunctionComponent, useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { db } from "../../database/db";
import * as yup from "yup";
import { UserContext } from "../../contexts/user/user.context";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";

interface SignInFormProps {}

const initialSignInFormValues = {
  email: "",
  password: "",
};

const signInFormSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const SignInForm: FunctionComponent<SignInFormProps> = () => {
  const { signInUser } = useContext(UserContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialSignInFormValues,
    validationSchema: signInFormSchema,
    onSubmit: async (values, {}) => {
      const user = await db.users.where("email").equals(values.email).first();
      if (user) {
        const result = await bcrypt.compare(values.password, user.password);

        if (result) {
          signInUser(user);
          navigate("/");
        }
      }
    },
  });
  const { errors, touched, handleChange, values, handleBlur } = formik;

  return (
    <Form
      noValidate
      className="mt-5 border-start p-3 rounded"
      onSubmit={formik.handleSubmit}
    >
      <Form.Group className="mb-3" controlId="emailSignIn">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
          value={values.email}
          onChange={handleChange}
          onBlur={formik.handleBlur}
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

      <Form.Group className="mb-3" controlId="passwordSignIn">
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

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default SignInForm;
