import dayjs from "dayjs";
import { CONSTANTS, getDurationString, getMonthAndYear } from "./common";

const formatDayjs = (date: dayjs.Dayjs, format: string) => {
    return date.format(format);
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
    const formattedStartDate = getMonthAndYear(startDate);

    const formattedEndDate =
        endDate === CONSTANTS.PRESENT
            ? getMonthAndYear(`${new Date().getMonth() + 1}/${new Date().getFullYear()}`, true)
            : getMonthAndYear(endDate);

    // new Date() accepts YYYY-MM format
    const StartDate = dayjs(new Date(formattedStartDate));
    const EndDate = dayjs(new Date(formattedEndDate));

    const diffYears = EndDate.diff(StartDate, 'years');
    const diffMonths = EndDate.diff(StartDate, 'months') - (diffYears * 12);

    return {
        diffYears,
        diffMonths,
        html: `${formatDayjs(StartDate, "MMM, YYYY")} - ${endDate === CONSTANTS.PRESENT ? CONSTANTS.PRESENT : formatDayjs(EndDate, "MMM, YYYY")} • 
        ${getDurationString(diffYears, diffMonths)}`
    };
};