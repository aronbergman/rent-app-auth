const createTitleAd = values => {
    console.log('values', values)
    let title = `
    ${values.typeOfApplicant === '0' ? 'Сниму' : 'Сдам'}
    ${values.typeOfObject === 'flat' ? 'квартиру' : values.typeOfObject === 'room' ? 'комнату' : values.typeOfObject === 'bad' ? 'койко-место' : ''}
    ${values.typeOfObject === 'room' ? `в ${values.sizeOfObject} комнатной квартире` : ''}
    `
    console.log('title', title)
    return title.replace(/ +/g, ' ').replace(/[\n\r]/g, ' ').replace(/\s{2,}/g, ' ').trim();
}

export default createTitleAd;