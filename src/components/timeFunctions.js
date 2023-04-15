import moment from 'moment';

export function timestampToString(timestamp){
    return new Date(timestamp)
    // "Mon Apr 17 2023 11:48:50 GMT+0300 (Eastern European Summer Time)"
}

export function firebaseToString(timestamp){
    return moment.unix(timestamp.seconds).format('DD.MM.YYYY')
    // "17.04.2023"
}

export function timestampToDay(timestamp) {
    const dateFormat = new Date(timestamp);
    return dateFormat.toString().split(" ")[2];
    // "01"
}

export function firebaseToDate(fbStamp){
    return fbStamp.toDate();
    // "Mon Apr 17 2023 11:48:50 GMT+0300 (Eastern European Summer Time)"
}

export function dateToUnixTimestamp(dateItem) {
    const dateObject = new Date(dateItem)
    return Math.floor(dateObject.getTime());
    //"1681556218013"
}



