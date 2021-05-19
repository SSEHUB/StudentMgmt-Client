/**
 * Student-Management-System-API
 * The Student-Management-System-API. <a href='http://localhost:3000/api-json'>JSON</a>
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';


import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class CsvService {

    protected basePath = '/';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Get admission status of participants.
     * Returns a .csv file containing the admission criteria and information about their fulfillment for each participant. Requires LECTURER or TUTOR role.
     * @param courseId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAdmissionStatusOfParticipantsAsCsv(courseId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getAdmissionStatusOfParticipantsAsCsv(courseId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getAdmissionStatusOfParticipantsAsCsv(courseId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getAdmissionStatusOfParticipantsAsCsv(courseId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (courseId === null || courseId === undefined) {
            throw new Error('Required parameter courseId was null or undefined when calling getAdmissionStatusOfParticipantsAsCsv.');
        }

        let headers = this.defaultHeaders;

        // authentication (bearer) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('get',`${this.basePath}/csv/courses/${encodeURIComponent(String(courseId))}/admission-status`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get assessments of assignments.
     * Retrieves a .csv containing all assessments of a specified assignment. Requires LECTURER or TUTOR role.
     * @param courseId 
     * @param assignmentId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAssessmentsForAssignmentAsCsv(courseId: string, assignmentId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getAssessmentsForAssignmentAsCsv(courseId: string, assignmentId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getAssessmentsForAssignmentAsCsv(courseId: string, assignmentId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getAssessmentsForAssignmentAsCsv(courseId: string, assignmentId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (courseId === null || courseId === undefined) {
            throw new Error('Required parameter courseId was null or undefined when calling getAssessmentsForAssignmentAsCsv.');
        }

        if (assignmentId === null || assignmentId === undefined) {
            throw new Error('Required parameter assignmentId was null or undefined when calling getAssessmentsForAssignmentAsCsv.');
        }

        let headers = this.defaultHeaders;

        // authentication (bearer) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('get',`${this.basePath}/csv/courses/${encodeURIComponent(String(courseId))}/assignments/${encodeURIComponent(String(assignmentId))}/assessments`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get participants.
     * Returns a .csv file containing the participants of the specified course. Requires LECTURER or TUTOR role.
     * @param courseId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getParticipantsAsCsv(courseId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getParticipantsAsCsv(courseId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getParticipantsAsCsv(courseId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getParticipantsAsCsv(courseId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (courseId === null || courseId === undefined) {
            throw new Error('Required parameter courseId was null or undefined when calling getParticipantsAsCsv.');
        }

        let headers = this.defaultHeaders;

        // authentication (bearer) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('get',`${this.basePath}/csv/courses/${encodeURIComponent(String(courseId))}/users`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get points overview.
     * Returns a .csv file containing the achieved points of every student for all assignments of the specified course. Requires LECTURER or TUTOR role.
     * @param courseId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getPointsOverviewAsCsv(courseId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getPointsOverviewAsCsv(courseId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getPointsOverviewAsCsv(courseId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getPointsOverviewAsCsv(courseId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (courseId === null || courseId === undefined) {
            throw new Error('Required parameter courseId was null or undefined when calling getPointsOverviewAsCsv.');
        }

        let headers = this.defaultHeaders;

        // authentication (bearer) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('get',`${this.basePath}/csv/courses/${encodeURIComponent(String(courseId))}/admission-status/overview`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get registered groups.
     * Retrieves a .csv containing all registered groups and their members for the specified assignment. Requires LECTURER or TUTOR role.
     * @param courseId 
     * @param assignmentId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getRegisteredGroupsAsCsv(courseId: string, assignmentId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getRegisteredGroupsAsCsv(courseId: string, assignmentId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getRegisteredGroupsAsCsv(courseId: string, assignmentId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getRegisteredGroupsAsCsv(courseId: string, assignmentId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (courseId === null || courseId === undefined) {
            throw new Error('Required parameter courseId was null or undefined when calling getRegisteredGroupsAsCsv.');
        }

        if (assignmentId === null || assignmentId === undefined) {
            throw new Error('Required parameter assignmentId was null or undefined when calling getRegisteredGroupsAsCsv.');
        }

        let headers = this.defaultHeaders;

        // authentication (bearer) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('get',`${this.basePath}/csv/courses/${encodeURIComponent(String(courseId))}/assignments/${encodeURIComponent(String(assignmentId))}/registrations`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
