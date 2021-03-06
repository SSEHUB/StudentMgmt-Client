/**
 * Student-Management-System-API
 * The Student-Management-System-API. <a href=\'http://localhost:3000/api-json\'>JSON</a>
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface GroupCreateBulkDto { 
    /**
     * List of group names.
     */
    names?: Array<string>;
    /**
     * If utilized, all group names will use the nameSchema followed by the group\'s number.
     */
    nameSchema?: string;
    /**
     * The number of groups that should be created. Should only be used in conjunction with nameSchema.
     */
    count?: number;
}

