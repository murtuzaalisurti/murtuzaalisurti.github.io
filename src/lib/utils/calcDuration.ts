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
const toDayjs = (date: string) => {
    const formatted =
        date === CONSTANTS.PRESENT
            ? getMonthAndYear(`${new Date().getMonth() + 1}/${new Date().getFullYear()}`, true)
            : getMonthAndYear(date);

    // new Date() accepts YYYY-MM format
    return dayjs(new Date(formatted));
};

export const calcDuration = (startDate: string, endDate: string) => {
    const StartDate = toDayjs(startDate);
    const EndDate = toDayjs(endDate);

    const diffYears = EndDate.diff(StartDate, 'years');
    const diffMonths = EndDate.diff(StartDate, 'months') - (diffYears * 12);

    return {
        diffYears,
        diffMonths,
        html: `${formatDayjs(StartDate, "MMM, YYYY")} - ${endDate === CONSTANTS.PRESENT ? CONSTANTS.PRESENT : formatDayjs(EndDate, "MMM, YYYY")} • 
        ${getDurationString(diffYears, diffMonths)}`
    };
};

/**
 * Calculates the combined tenure across multiple positions (e.g. several roles
 * held at the same company), spanning from the earliest start date to the
 * latest end date.
 *
 * @param positions - A list of positions with `startDate` and `endDate`.
 * @return An object with the combined difference in years and months, and a
 * formatted HTML string covering the full span.
 */
export const calcCombinedDuration = (
    positions: { startDate: string; endDate: string }[]
) => {
    const starts = positions.map((p) => toDayjs(p.startDate));
    const ends = positions.map((p) => toDayjs(p.endDate));

    const minStart = starts.reduce((a, b) => (a.isBefore(b) ? a : b));
    const maxEnd = ends.reduce((a, b) => (a.isAfter(b) ? a : b));

    const hasPresent = positions.some((p) => p.endDate === CONSTANTS.PRESENT);

    const diffYears = maxEnd.diff(minStart, 'years');
    const diffMonths = maxEnd.diff(minStart, 'months') - (diffYears * 12);

    return {
        diffYears,
        diffMonths,
        html: `${formatDayjs(minStart, "MMM, YYYY")} - ${hasPresent ? CONSTANTS.PRESENT : formatDayjs(maxEnd, "MMM, YYYY")} • 
        ${getDurationString(diffYears, diffMonths)}`
    };
};