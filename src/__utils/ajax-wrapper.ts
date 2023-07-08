/* eslint-disable @typescript-eslint/no-explicit-any */
import { ajax } from 'rxjs/ajax';
import { Observable } from 'rxjs';

import { API_CONSTANTS } from '../constants/api-contants';

interface defaultHeadersProps {
	[string: string]: string
}

const defaultHeaders: defaultHeadersProps = {
	'Content-Type': 'application/json'
};

const baseUrl: defaultHeadersProps = {};
baseUrl[API_CONSTANTS.CAMPAIGN] =
	`${process.env.REACT_APP_CAMPAIGN_MANAGEMENT_URL}` || "";

export const get = (
	endpoint: string,
	url: string,
	headers?: any
): Observable<any> =>
	ajax.get(
		baseUrl[endpoint] + url,
		Object.assign({}, defaultHeaders, headers)
	);

export const post = (
	endpoint: string,
	url: string,
	body: any,
	headers?: any
): Observable<any> =>
	ajax.post(
		baseUrl[endpoint] + url,
		body,
		Object.assign({}, defaultHeaders, headers)
	);

export const postFormData = (
	endpoint: string,
	url: string,
	body: any,
	headers?: any
): Observable<any> =>
	ajax.post(
		baseUrl[endpoint] + url,
		body
	);


export const put = (
	endpoint: string,
	url: string,
	body: any,
	headers?: any
): Observable<any> =>
	ajax.put(
		baseUrl[endpoint] + url,
		body,
		Object.assign({}, defaultHeaders, headers)
	);

export const deleteRequest = (
	url: string,
	headers?: any
): Observable<any> =>
	ajax.delete(baseUrl + url, Object.assign({}, defaultHeaders, headers));
