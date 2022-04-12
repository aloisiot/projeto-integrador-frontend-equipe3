// comentário para uma futura revisão:
// disableDate aqui tem uma função que retorna uma outra função que recebe os parametros de cada data no calendario. O props disableDay do DateRangePicker
// passa cada data para essa função retornada, ao mesmo tempo que ela tem acesso ao dateRangeList, que são os intervalos de data reservados
// (do dia 6 ao 10 por exemplo). Se a data no calendario tiver os milisegundos iguais ou maiores aos milisegundos totais da data de inicio do intervalo e
// tambem tiver os milisegundos iguais ou menores a data de fim significará que ela está dentro do intervalo reservado e assim a função retornara true para
// desativar a data.


 const  disableDate = (dateRangeList) => (date) => {
    try {
        for (let i = 0; dateRangeList.length > i; i++) {

            const startDate = stringToDate(dateRangeList[i].startDate)
            const endDate = stringToDate(dateRangeList[i].endDate)
            const afterStartDate = date.getTime() >= startDate.getTime();
            const beforeEndDate = date.getTime() <= endDate.getTime();

            if (afterStartDate && beforeEndDate) return true
        }
        return false
    }catch{
        return false
    }
}



function stringToDate(arrayDate) {
    const year = +arrayDate[0]
    const month = +arrayDate[1] - 1
    const day = +arrayDate[2]
    return new Date(year, month, day)

}

export default disableDate;