import { DateTime } from "luxon";

export const calcDuration = (startDate: string, endDate: string) => {
    const ArrayStartDate = startDate
        .split(",")
        .filter((i) => i !== " ")
        .map((e) => e.trim());

    const ArrayEndDate =
        endDate === "Present"
            ? `${new Date().toLocaleString("default", {
                month: "short",
            })}, ${new Date().getFullYear()}`
                .split(",")
                .filter((i) => i !== " ")
                .map((e) => e.trim())
            : endDate
                .split(",")
                .filter((i) => i !== " ")
                .map((e) => e.trim());

    ArrayStartDate.unshift("1");
    ArrayEndDate.unshift("1");

    const EndDate = DateTime.fromFormat(ArrayEndDate.join(" "), "d MMM yyyy");
    const StartDate = DateTime.fromFormat(
        ArrayStartDate.join(" "),
        "d MMM yyyy"
    );

    const diffObject = EndDate.diff(StartDate, ["years", "months"]);
    const diffYears = diffObject.years;
    const diffMonths = diffObject.months;

    return {
        diffYears,
        diffMonths,
        html: `${startDate} - ${endDate} • 
        ${diffYears ? `${diffYears} yr` : ""}
        ${diffMonths ? ` ${diffMonths} mos` : ""}`
    };
};