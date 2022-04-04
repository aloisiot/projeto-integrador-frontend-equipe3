

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