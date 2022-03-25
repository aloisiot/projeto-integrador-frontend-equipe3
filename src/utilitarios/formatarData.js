export default function formatarData(data) {
    let result = ""
    const mes = result.concat(String(data.getMonth()).length > 1 ? data.getMonth() : "0" + data.getMonth())
    const dia = result.concat(String(data.getDate()).length > 1 ? data.getDate() : "0" + data.getDate())
    return `${dia}/${mes}/${data.getFullYear()}`
}