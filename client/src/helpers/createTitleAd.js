import {cityParser} from "./rentDataParsers";

const createTitleAd = values => {
    console.log('values', values)
    let title = `
    ${values.typeOfApplicant === '0' ? 'Сниму' : 'Сдам'}
    ${values.typeOfObject === 'flat' ? 'квартиру' : values.typeOfObject === 'room' ? 'комнату' : values.typeOfObject === 'bad' ? 'место в комнате' : ''}
    ${(values.typeOfObject !== 'flat' && values.typeOfApplicant !== '0') ? `в ${values.sizeOfObject} комнатной квартире` : ''}
    ${cityParser(values.city)}
    `
    return title.replace(/ +/g, ' ').replace(/[\n\r]/g, ' ').replace(/\s{2,}/g, ' ').trim();
}
export default createTitleAd;