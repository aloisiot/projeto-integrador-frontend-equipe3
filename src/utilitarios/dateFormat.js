export function dateFormatPtBt(data) {
    return data.toLocaleDateString('pt-BR')
}

export function formatDateForTransfer(data) {
    return dateFormatPtBt(data).split("/").reverse().join("-")
}