const yup = require("yup");

const ocorrencieSchema = yup.object().shape({
    description: yup.string().required("A descrição é obrigatória").max(255),
    latitude: yup.number().typeError("Este campo deve ser numérico").required("O campo é obrigatório"),
    longitude: yup.number().typeError("Este campo deve ser numérico").required("O campo é obrigatório")
});

export default ocorrencieSchema;