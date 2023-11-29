const validate = (input) => {
  let errors = {};
  let regexUpperCase = /[A-Z]/;
  let regexNumberSimbols = /[0-9!@#$%^&*()_+{}\\[\]:;<>,.?~\\/\\-]/;
  let regexURL = /^(http|https):\/\/[^\s]+$/;

  if (!input.name) errors.name = "Escriba un nombre";

  if (input.name.length > 20) errors.name = "Deben ser menos de 20 caracteres";

  if (regexUpperCase.test(input.name))
    errors.name = "No puede contener mayúsculas";

  if (regexNumberSimbols.test(input.name))
    errors.name = "No puede contener números o símbolos";

  if (!regexURL.test(input.image)) errors.image = "URL inválida";
  if (!input.image) errors.image = "Debe proporcionar una URL";

  if (input.hp === "") errors.hp = "No puede quedar vacío";
  if (input.hp <= 0) errors.hp = "No puede ser menor a 0";

  if (input.attack === "") errors.attack = "No puede quedar vacío";
  if (input.attack <= 0) errors.attack = "No puede ser menor a 0";

  if (input.defense === "") errors.defense = "No puede quedar vacío";
  if (input.defense <= 0) errors.defense = "No puede ser menor a 0";

  if (input.speed < 0) errors.speed = "No puede ser menor a 0";

  if (input.height < 0) errors.height = "No puede ser menor a 0";

  if (input.weight < 0) errors.weight = "No puede ser menor a 0";

  if (input.types.length <= 0) errors.types = "Tienes que elegir 1 o 2 tipos";
  if (input.types.length >= 3) errors.types = "No puedes elegir más de 2 tipos";

  return errors;
};

export default validate;
