import { calcDuration } from "./calcDuration";
import { type Experiences } from "../types/common";

export const groupExperienceByCompany = (list: Experiences["list"]) => {
    const groupByCompanyRaw = list.reduce((acc: Record<string, any>, exp) => {
        const roleDuration = calcDuration(exp.startDate, exp.endDate);
        exp.roleDuration = roleDuration;
        const company = exp.company;
        if (!acc[company]) {
            acc[company] = [];
        }
        acc[company].push(exp);
        return acc;
    }, {});

    const groupByCompany = Object.keys(groupByCompanyRaw)
        .map((company) => {
            const roles: Experiences["list"] = groupByCompanyRaw[company];
            const companyDuration = { diffMonths: 0, diffYears: 0, html: "" };

            roles.forEach((role) => {
                const years = role.roleDuration ? role.roleDuration.diffYears : 0;
                const months = role.roleDuration ? role.roleDuration.diffMonths : 0;
                companyDuration.diffYears += years as number;
                companyDuration.diffMonths += months as number;
            });

            companyDuration.html = `${companyDuration.diffYears ? `${companyDuration.diffYears} yr` : ""} ${companyDuration.diffMonths ? ` ${companyDuration.diffMonths} mos` : ""}`;

            roles.forEach((role) => (role.companyDuration = companyDuration));
            return { [company]: roles };
        })
        .reduce((acc, curr) => ({ ...acc, ...curr }), {});

    return groupByCompany;
}