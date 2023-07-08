import { VIEW_PERMISSION } from "./permission-contant";
import { ROUTES } from "./routes";

export const SideNavConfig = [
    {
        title: "Campaign",
        links: [
            {
                text: "Cohort Summary",
                link: ROUTES.COHORT_SUMMARY,
                permission: VIEW_PERMISSION.COHORT_SUMMARY
            },
        ],
        permission: VIEW_PERMISSION.COHORT_SUMMARY
    },
]