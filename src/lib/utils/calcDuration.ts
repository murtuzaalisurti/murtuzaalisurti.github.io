import dayjs from "dayjs";
import { getDurationString } from "./common";

/**
 * Takes a date string in the format "MM/YY" and converts it to an array
 * of strings in the format ["MM", "YYYY"]. If `present` is true, the year
 * is not prepended with "20".
 *
 * @param {string} dateString - The date string to convert.
 * @param {boolean} [present=false] - Whether the year should not be prepended with
 * "20". Defaults to false.
 * @return {string[]} An array of strings in the format ["MM", "YYYY"].
 */
const getMonthAndYearArray = (dateString: string, present: boolean = false) => {
    return dateString.split("/")
        .filter((i) => i !== " ")
        .map((e) => e.trim().padStart(2, "0"))
        .map((k, i, arr) => {
            if (!present) {
                if (i === arr.length - 1) return `20${k}`;
            }
            return k;
        });
}

/**
 * Calculates the duration between two dates and returns an object with the
 * difference in years and months, as well as a formatted HTML string.
 *
 * @param {string} startDate - The start date in the format "d MMM yyyy".
 * @param {string} endDate - The end date in the format "d MMM yyyy" or "Present".
 * @return {Object} An object with the difference in years and months, and a
 * formatted HTML string.
 */
export const calcDuration = (startDate: string, endDate: string) => {
    const ArrayStartDate = getMonthAndYearArray(startDate);

    const ArrayEndDate =
        endDate === "Present"
            ? getMonthAndYearArray(`${new Date().getMonth() + 1}/${new Date().getFullYear()}`, true)
            : getMonthAndYearArray(endDate);

    // new Date() accepts YYYY-MM format
    const EndDate = (dayjs(new Date(ArrayEndDate.reverse().join("-"))));
    const StartDate = (dayjs(new Date(ArrayStartDate.reverse().join("-"))));

    const diffYears = EndDate.diff(StartDate, 'years');
    const diffMonths = EndDate.diff(StartDate, 'months') - (diffYears * 12);

    return {
        diffYears,
        diffMonths,
        html: `${StartDate.format("MMM, YYYY")} - ${endDate === "Present" ? "Present" : EndDate.format("MMM, YYYY")} • 
        ${getDurationString(diffYears, diffMonths)}`
    };
};