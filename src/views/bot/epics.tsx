import { Epic, ofType } from "redux-observable"
import { catchError, map, mergeMap } from "rxjs/operators"
import { API_CONSTANTS } from "../../constants/api-contants"
import { post, postFormData } from "../../__utils/ajax-wrapper"
import { askBot, askBotResponse, chatWithAudio, chatWithAudioSucces  } from "./reducer"
import { Observable, ObservableInput } from "rxjs"
import { RootState } from "../../redux/store"


export const AskChabotEpic: Epic<any, any, RootState> = (action$, state$) => action$.pipe(
    ofType<any, any>(askBot.type),
    mergeMap((action): ObservableInput<any> => {
        const apiurl = API_CONSTANTS.PROCESS;
        const text = action.payload
        console.log(text, "pay")
        return new Observable<any>((observer) => {
            post(API_CONSTANTS.CAMPAIGN, apiurl, text)
                .pipe(
                    map((response: any) => {
                        if (response.status === 200) {
                            console.log(response, "epic")
                            return { type: askBotResponse.type, payload: response.response.output }
                        }
                    }),
                    catchError((error): any => {
                        return 

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

export const ChatWithAudioEpic: Epic<any, any, RootState> = (action$, state$) => action$.pipe(
    ofType<any, any>(chatWithAudio.type),
    mergeMap((action): ObservableInput<any> => {
        const apiurl = API_CONSTANTS.AUDIO;
        console.log(action.payload, "chatpayload")
        const audio = action.payload
        return new Observable<any>((observer) => {
            postFormData(API_CONSTANTS.CAMPAIGN, apiurl, audio, {'Content-Type': 'audio/webm'})
                .pipe(
                    map((response: any) => {
                        if (response.status === 200) {
                            console.log(response, "epic")
                            return { type: chatWithAudioSucces.type, payload: response.response.output }
                        }
                    }),
                    catchError((error): any => {
                        return 

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
