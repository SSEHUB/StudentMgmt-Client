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
 */
import { GroupEventDto } from './groupEventDto';
import { ParticipantDto } from './participantDto';

export interface GroupDto { 
    /**
     * Unique identifier of this group.
     */
    id?: string;
    /**
     * Name of the group.
     */
    name: string;
    /**
     * Password required to enter the group.
     */
    password?: string;
    /**
     * Indicates, wether group has a password. Set by the server.
     */
    hasPassword?: boolean;
    /**
     * Count of group members. Set by the server.
     */
    size?: number;
    /**
     * Determines, wether course participant are able to join this group.
     */
    isClosed?: boolean;
    /**
     * The members of this group.
     */
    members?: Array<ParticipantDto>;
    history?: Array<GroupEventDto>;
}