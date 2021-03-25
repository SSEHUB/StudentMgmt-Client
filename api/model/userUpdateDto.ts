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

export interface UserUpdateDto { 
    /**
     * Role within the application.
     */
    role: UserUpdateDto.RoleEnum;
    matrNr?: number;
    email?: string;
    displayName: string;
}
export namespace UserUpdateDto {
    export type RoleEnum = 'SYSTEM_ADMIN' | 'ADMIN_TOOL' | 'MGMT_ADMIN' | 'USER';
    export const RoleEnum = {
        SYSTEMADMIN: 'SYSTEM_ADMIN' as RoleEnum,
        ADMINTOOL: 'ADMIN_TOOL' as RoleEnum,
        MGMTADMIN: 'MGMT_ADMIN' as RoleEnum,
        USER: 'USER' as RoleEnum
    };
}