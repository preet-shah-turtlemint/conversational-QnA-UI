import { Epic, ofType } from "redux-observable"
import { catchError, map, mergeMap } from "rxjs/operators"
import { API_CONSTANTS } from "../../constants/api-contants"
import { postFormData } from "../../__utils/ajax-wrapper"
import { createCohort, createCohortError, createCohortSuccess } from "./reducer"
import { Observable, ObservableInput } from "rxjs"
import { RootState } from "../../redux/store"

export const CohortCreationEpic: Epic<any, any, RootState> = (action$, state$) => action$.pipe(
    ofType<any, any>(createCohort.type),
    mergeMap((action): ObservableInput<any> => {
        const apiurl = API_CONSTANTS.CREATE_CAMPAIGN;
        const val = action.payload
        return new Observable<any>((observer) => {
            postFormData(API_CONSTANTS.CAMPAIGN, apiurl, val)
                .pipe(
                    map((response: any) => {
                        if (response.status === 200) {
                            return { type: createCohortSuccess.type, payload: response.response.data }
                        }
                    }),
                    catchError((error): any => {
                        return { type: createCohortError.type, payload: error }

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
