import { Epic, ofType } from "redux-observable"
import { catchError, map, mergeMap } from "rxjs/operators"
import { API_CONSTANTS } from "../../constants/api-contants"
import { get } from "../../__utils/ajax-wrapper"
import { cohortSummary, cohortSummarySuccess, cohortSummaryError  } from "./reducer"
import { Observable, ObservableInput } from "rxjs"
import { RootState } from "../../redux/store"


export const CohortSummaryEpic: Epic<any, any, RootState> = (action$, state$) => action$.pipe(
    ofType<any, any>(cohortSummary.type),
    mergeMap((action): ObservableInput<any> => {
        const { pageNo, limit, broker } = action.payload
        const apiurl = API_CONSTANTS.COHORT_SUMMARY + `?pageNo=${pageNo}&limit=${limit}`;
        return new Observable<any>((observer) => {
            get(API_CONSTANTS.CAMPAIGN, apiurl, {
                'x-tenant': broker,
                'x-broker': broker
            })
                .pipe(
                    map((response: any) => {
                        if (response.status === 200) {
                            return { type: cohortSummarySuccess.type, payload: response.response }
                        }
                    }),
                    catchError((error) : any => {
                        return { type: cohortSummaryError.type, payload: error };
                    })
                )
                .subscribe({
                    next: (value) => {
                        // handle next value if needed
                        observer.next(value);
                    },
                    error: (error) => {
                        // handle error if needed
                        observer.error(error);
                    },
                    complete: () => {
                        // handle completion if needed
                        observer.complete();
                    },
                });
        });

    })
)
