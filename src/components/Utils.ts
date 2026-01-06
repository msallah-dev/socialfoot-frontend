export const dateParser = (num: string) => {
    let options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
    };

    let timestamp = Date.parse(num);

    let date = new Date(timestamp).toLocaleDateString("fr-FR", options);

    return date.toString();
};

export const timestampParser = (num: number) => {
  let options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  let date = new Date(num).toLocaleDateString("fr-FR", options);

  return date.toString();
}

export const terms = (): HTMLInputElement => {
    return document.getElementById("terms") as HTMLInputElement;
}

export const errors = (className: string): HTMLDivElement => {
    return document.querySelector(`.${className}.error`) as HTMLDivElement;
}

export const getMessageError = (messages: string[] | string): HTMLDivElement | undefined => {
    if (Array.isArray(messages)) {
        for (const msg of messages) {
            for (const key in fieldMap) {
                if (msg.includes(key)) {
                    const div = errors(fieldMap[key]);
                    if (div) div.innerHTML = msg;
                    return div;
                }
            }

        }
    } else {
        if (messages.includes("Email déjà utilisé")) {
            const div = errors("email");
            if (div) div.innerHTML = messages;
            return div;
        }
    }
}

const fieldMap: Record<string, string> = {
    "Prenom": "prenom",
    "Nom": "nom",
    "E-mail": "email",
    "Mot de passe": "password",
    "âge": "age",
    "Le texte doit": "content",
    "Le contenu doit": "texte"
};