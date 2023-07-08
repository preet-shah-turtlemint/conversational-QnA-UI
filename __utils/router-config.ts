import CohortCreation from "../views/cohort-creation";
import CohorSummary from "../views/cohort-summary";
import TechnologyMahasay from "../views/technology-mahashay";
import { VIEW_PERMISSION } from "./permission-contant";
import { ROUTES } from "./routes";

export const RouterConfig = [
    // {
    //     path: ROUTES.COHORT_SUMMARY,
    //     component: CohorSummary,
    //     permission: VIEW_PERMISSION.COHORT_SUMMARY
    // },
    // {
    //     path: ROUTES.COHORT_CREATION,
    //     component: CohortCreation,
    //     permission: VIEW_PERMISSION.CREATE_COHORT
    // },
    {
        path: ROUTES.TECHNOLOGY_MAHASAY,
        component: TechnologyMahasay ,
        permission: VIEW_PERMISSION.CREATE_COHORT
    }

]