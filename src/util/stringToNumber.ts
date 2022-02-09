export default function stringToNumber(value: string) {
    return Number(value.replace(',', '.'));
}
