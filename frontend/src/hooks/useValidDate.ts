const MAX_VALID_YR = 9999;
const MIN_VALID_YR = 1800;
function isLeap(year: number) {
    return (((year % 4 == 0) &&
        (year % 100 != 0)) ||
        (year % 400 == 0));
}
export function isValidDate(time: string) {
    let date = time.split("T")
    let dateSplit = date[0].split("-")
    let y = Number(dateSplit[0])
    let m = Number(dateSplit[1])
    let d = Number(dateSplit[2])
    if (y > MAX_VALID_YR ||
        y < MIN_VALID_YR)
        return false;

    if (m < 1 || m > 12)
        return false;
    if (d < 1 || d > 31)
        return false;

    if (m == 2) {
        if (isLeap(y))
            return (d <= 29);
        else
            return (d <= 28);
    }

    if (m == 4 || m == 6 ||
        m == 9 || m == 11)
        return (d <= 30);

    return true;
}