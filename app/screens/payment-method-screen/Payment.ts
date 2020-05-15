function clearNumber(value = "") {
    return value.toString().replace(/\D+/g, "");
}

export function formatCreditCardNumber(value) {
    if (!value) {
        return value;
    }

    const clearValue = clearNumber(value);
    let nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 8)} ${clearValue.slice(
        8,
        12,
    )} ${clearValue.slice(12, 16)}`;

    return nextValue.trim();
}

interface IAllValue {
    number?: number;
}

export function formatCVC(value, allValues: IAllValue = {}) {
    const clearValue = clearNumber(value);
    let maxLength = 3;

    if (allValues.number) {
        maxLength = 3;
    }

    return clearValue.slice(0, maxLength);
}

export function formatExpirationDate(value) {
    const clearValue = clearNumber(value);

    if (clearValue.length >= 3) {
        return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
    }

    return clearValue;
}

export function formatFormData(data) {
    return Object.keys(data).map((d) => `${d}: ${data[d]}`);
}
