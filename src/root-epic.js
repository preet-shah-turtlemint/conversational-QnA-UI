import { combineEpics } from "redux-observable";
import { CohortCreationEpic } from "./views/cohort-creation/epics";
import { CohortSummaryEpic } from "./views/cohort-summary/epics";
import { AskChabotEpic } from "./views/bot/epics";
import { ChatWithAudioEpic } from "./views/bot/epics";


const rootEpic = combineEpics(
    // Add your epics here
    CohortCreationEpic,
    CohortSummaryEpic,
    AskChabotEpic,
    ChatWithAudioEpic
  );

export default rootEpic;
  