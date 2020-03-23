/**
 * Student-Management-System-API
 * The Student-Management-Sytem-API description.
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { CourseDto } from './courseDto';

export interface UserDto { 
    id?: string;
    email: string;
    username: string;
    rzName: string;
    role: UserDto.RoleEnum;
    courses?: Array<CourseDto>;
    courseRole?: UserDto.CourseRoleEnum;
}
export namespace UserDto {
    export type RoleEnum = 'SYSTEM_ADMIN' | 'ADMIN_TOOL' | 'MGTM_ADMIN' | 'USER';
    export const RoleEnum = {
        SYSTEMADMIN: 'SYSTEM_ADMIN' as RoleEnum,
        ADMINTOOL: 'ADMIN_TOOL' as RoleEnum,
        MGTMADMIN: 'MGTM_ADMIN' as RoleEnum,
        USER: 'USER' as RoleEnum
    };
    export type CourseRoleEnum = 'LECTURER' | 'TUTOR' | 'STUDENT';
    export const CourseRoleEnum = {
        LECTURER: 'LECTURER' as CourseRoleEnum,
        TUTOR: 'TUTOR' as CourseRoleEnum,
        STUDENT: 'STUDENT' as CourseRoleEnum
    };
}