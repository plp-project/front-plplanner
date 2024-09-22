const errorsMsgs = {
	"pt-br": {
		duration:
			"Duração deve ser um dos seguintes valores: 30m, 1h, manhã, tarde, noite",
		"categoryId.integer": "categoryId deve ser um número inteiro",
		"categoryId.required": "Uma categoria deve ser selecionada.",
		default: "Algo deu errado.",
	},
};

export const mapErrors = (errors, lang = "pt-br") => {
	const messages = errorsMsgs[lang] || {};

	if (!Array.isArray(errors.message)) {
		return errors.message || messages.default;
	}

	return errors.message.map((error) => {
		if (error.includes("duration")) {
			return messages["duration"] || error;
		}
		if (error.includes("categoryId must be an integer number")) {
			return messages["categoryId.integer"] || error;
		}
		if (error.includes("categoryId should not be empty")) {
			return messages["categoryId.required"] || error;
		}

		return error;
	});
};
