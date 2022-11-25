import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { db } from "../../database/db";
import bcrypt from "bcryptjs";
import * as yup from "yup";

interface SignUpFormProps {}

const initialSignUpFormValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

const signUpFormSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
  confirmPassword: yup.string().required(),
});

const SignUpForm: FunctionComponent<SignUpFormProps> = () => {
  const navigate = useNavigate();
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

      try {
        const id = await db.users.add({
          email: values.email,
          password: hashedPassword,
        });
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
