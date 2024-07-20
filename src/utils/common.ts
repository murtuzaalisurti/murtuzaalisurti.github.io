/**
 * Capitalizes the first letter of a given string.
 *
 * @param {string} str - The input string to capitalize.
 * @return {string} The string with the first letter capitalized.
 */
export const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Calculates the suffix for the duration based on the input duration value.
 *
 * @param {number} duration - The input duration value.
 * @return {object} An object containing the calculated years and months suffix.
 */
export const getDurationSuffix = (duration: number) => {
    if (!duration) return { years: "", months: "" };
    const years = duration > 1 ? "yrs" : "yr";
    const months = duration > 1 ? "mos" : "mo";
    return { years, months };
}

/**
 * Generates a string representation of the duration in years and months.
 *
 * @param {number} years - The number of years in the duration.
 * @param {number} months - The number of months in the duration.
 * @return {string} The string representation of the duration.
 */
export const getDurationString = (years: number, months: number): string => {
    return `${years ? `${years} ${getDurationSuffix(years).years}` : ""} ${months ? `${months} ${getDurationSuffix(months).months}` : ""}`
}