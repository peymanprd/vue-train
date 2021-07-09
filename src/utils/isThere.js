export const isThere = (array, id) => {
    let status = false
    let spot = -1

    array.some((item, index) => {
        if (item.id === id) {
            status = true
            spot = index
        }
    })

    let result = {
        status: status,
        spot: spot,
    }
    return result
}

export const salamKon = message => {
    return `salam kon be ${message}`
}
