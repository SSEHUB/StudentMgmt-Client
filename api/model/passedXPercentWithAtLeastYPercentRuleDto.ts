/**
 * Student-Management-System-API
 * The Student-Management-Sytem-API. <a href='http://localhost:3000/api-json'>JSON</a>
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { RoundingBehavior } from './roundingBehavior';

export interface PassedXPercentWithAtLeastYPercentRuleDto { 
    type: PassedXPercentWithAtLeastYPercentRuleDto.TypeEnum;
    assignmentType: PassedXPercentWithAtLeastYPercentRuleDto.AssignmentTypeEnum;
    requiredPercent: number;
    pointsRounding: RoundingBehavior;
    passedAssignmentsPercent: number;
    passedAssignmentsRounding: RoundingBehavior;
}
export namespace PassedXPercentWithAtLeastYPercentRuleDto {
    export type TypeEnum = 'PASSED_X_PERCENT_WITH_AT_LEAST_Y_PERCENT' | 'REQUIRED_PERCENT_OVERALL';
    export const TypeEnum = {
        PASSEDXPERCENTWITHATLEASTYPERCENT: 'PASSED_X_PERCENT_WITH_AT_LEAST_Y_PERCENT' as TypeEnum,
        REQUIREDPERCENTOVERALL: 'REQUIRED_PERCENT_OVERALL' as TypeEnum
    };
    export type AssignmentTypeEnum = 'HOMEWORK' | 'TESTAT' | 'SEMINAR' | 'PROJECT' | 'OTHER';
    export const AssignmentTypeEnum = {
        HOMEWORK: 'HOMEWORK' as AssignmentTypeEnum,
        TESTAT: 'TESTAT' as AssignmentTypeEnum,
        SEMINAR: 'SEMINAR' as AssignmentTypeEnum,
        PROJECT: 'PROJECT' as AssignmentTypeEnum,
        OTHER: 'OTHER' as AssignmentTypeEnum
    };
}