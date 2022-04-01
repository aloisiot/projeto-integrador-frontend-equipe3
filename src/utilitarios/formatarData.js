export default function formatarData(data) {
    return data.toLocaleDateString('pt-BR')
}

export function formatDateForTransfer(data) {
    return formatarData(data).split("/").reverse().join("-")
}