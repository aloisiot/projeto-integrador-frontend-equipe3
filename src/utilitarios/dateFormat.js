export function dateFormatPtBt(data) {
    return data.toLocaleDateString('pt-BR')
}

export function formatDateForTransfer(data) {
    return data.toISOString().split("T")[0]
}