import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  MenuItem
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import axios from "axios";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  username: yup.string().required("required"),
  password: yup.string().required("required"),
  cpf: yup.string().required("required"),
  cnpj: yup.string(),
  picture: yup.string().required("required"),
  isInfluencer: yup.boolean(),
});

const loginSchema = yup.object().shape({
  username: yup.string().required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  cnpj: "",
  cpf: "",
  picture: null,
  isInfluencer: false,
};

const initialValuesLogin = {
  username: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    const file = values.picture;
    const readFileAsArrayBuffer = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
      });
    };

    try {
      const arrayBuffer = await readFileAsArrayBuffer(file);
      const bytes = new Uint8Array(arrayBuffer);

      const requestData = {
        nome: `${values.firstName} ${values.lastName}`,
        email: "", // Adicione o campo de e-mail se necessário
        username: values.username,
        senha: values.password,
        autenticado: false, // Defina o valor correto se necessário
        influencer: values.isInfluencer,
        logado: false, // Defina o valor correto se necessário
        cpf: values.cpf,
        cnpj: values.cnpj,
        foto: Array.from(bytes),
      };

      const response = await axios.post(
        "http://44.219.155.152:8080/cadastro/user/comum",
        requestData
      );
      const savedUser = response.data;
      onSubmitProps.resetForm();

      if (savedUser) {
        setPageType("login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const login = async (values, onSubmitProps) => {
    const requestData = {
      username: values.username,
      senha: values.password,
    };

    try {
      const response = await axios.post(
        "http://44.219.155.152:8080/login/logar",
        requestData
      );
      const loggedInUser = response.data;
      onSubmitProps.resetForm();

      if (loggedInUser) {
        console.log("ENTREI NO DISPATCH");
        dispatch(
          setLogin({
            user: loggedInUser,
            token: response.headers.authorization,
          })
        );
        console.log("após o dispatch");
        navigate("/home");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            flexWrap={"wrap"}
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <Box sx={{ mb: "1.5rem", gridColumn: "span 4" }}>
                  <Typography fontWeight="500" variant="h5">
                    Bem vindo a Zup, insira seus dados para criar uma conta
                  </Typography>
                </Box>

                <TextField
                  label="Nome"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Sobrenome"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="CPF"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.cpf}
                  name="cpf"
                  error={Boolean(touched.cpf) && Boolean(errors.cpf)}
                  helperText={touched.cpf && errors.cpf}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="CNPJ"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.cnpj}
                  name="cnpj"
                  error={Boolean(touched.cnpj) && Boolean(errors.cnpj)}
                  helperText={touched.cnpj && errors.cnpj}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Adicione sua foto aqui..</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            {isRegister && (
              <>
                <TextField
                  select
                  label="Influenciador"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.isInfluencer} // Update the value prop here
                  name="isInfluencer"
                  error={Boolean(touched.influencer) && Boolean(errors.influencer)}
                  helperText={touched.influencer && errors.influencer}
                  sx={{ gridColumn: "span 4" }}
                >
                  <MenuItem value={false}>Usuário Comum</MenuItem>
                  <MenuItem value={true}>Influenciador</MenuItem>
                </TextField>

              </>
            )}

            {isLogin && (
              <Box sx={{ mb: "0.2rem", gridColumn: "span 4" }}>
                <Typography fontWeight="500" variant="h5">
                  Bem vindo a Zup, acesse sua conta para continuar
                </Typography>
              </Box>
            )}


            <TextField
              label="Usuario"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.username}
              name="username"
              error={Boolean(touched.username) && Boolean(errors.username)}
              helperText={touched.username && errors.username}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Senha"
              onBlur={handleBlur}
              type="password"
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>


          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTRAR"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Não tem uma conta? Cadastre-se aqui."
                : "Já possui uma conta? Acesse aqui."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
