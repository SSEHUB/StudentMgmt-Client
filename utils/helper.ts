import { ActivatedRoute } from "@angular/router";
import { ParticipantDto } from "../api";

/**
 * Returns the current semester.
 * Winter semesters will be represented as "wise" followed by the last two digits of the years that the semester will take place in.
 * Summer semesters will be represented as "sose" followed by the corresponding year.
 * - Example 1: "wise1819"
 * - Example 2: "sose2021"
 */
export function getSemester(): string {
	const now = new Date();
	const month = now.getMonth() + 1;
	const year = now.getFullYear();
	let semester = undefined;

	if (month <= 9 && month >= 4) {
		semester = "sose" + year;
	} else {
		const yearLastTwoDigits = year % 100;
		if (month >= 1 && month <= 3) {
			semester = "wise" + (yearLastTwoDigits - 1) + yearLastTwoDigits;
		} else {
			semester = "wise" + yearLastTwoDigits + (yearLastTwoDigits + 1);
		}
	}

	return semester;
}

export function getSemesterString(value: string): string {
	if (!value || value === "") {
		return value;
	}

	if (!/^(wise|sose)\d{4}$/g.test(value)) return "?";

	let semName = value.substring(0, 4); // wise or sose
	let semYear = value.substring(4); // i.e 2020

	if (semName === "wise") {
		semName = "WiSe";
		semYear = value.substring(4, 6) + "/" + value.substring(6); // i.e 1920 -> 19/20
	} else {
		semName = "SoSe";
	}

	return `${semName} ${semYear}`;
}

/** Returns the specified route parameter. */
export function getRouteParam(param: string, route: ActivatedRoute): string | null {
	return route.snapshot.paramMap.get(param);
}

export function createDictionary<T>(
	data: T[],
	property: (item: T) => string
): { [key: string]: T } {
	const map = {};
	for (const value of data) {
		map[property(value)] = value;
	}
	return map;
}

/**
 * Checks, if one of the following properties of the given `participant` matches the `filter`.
 *  - `displayName` (lowercase),
 *  - `matrNr`
 * @param filter
 * @param participant
 * @return `true` if one of the named properties matches the `filter`.
 */
export function matchesParticipant(filter: string, participant: ParticipantDto): boolean {
	if (participant.displayName.toLowerCase().includes(filter)) {
		return true;
	}
	if (participant.matrNr?.toString().includes(filter)) {
		return true;
	}
	return false;
}

/**
 * Data accessor function for `mat-table` that is used for accessing nested properties for sorting
 * through the default sortData function. In contrast to the default `sortingDataAccessor`,
 * this function can deal with nested properties. The `matColumnDef` in the component's template
 * and the `displayedColumns` entry specify the path to this property through dots (i.e. "user.displayName").
 * @example
 * // Template
 * matColumnDef="user.displayName"
 * // Component
 * displayedColumns = ["user.displayName"]
 * this.dataSource.sortingDataAccessor = nestedPropertyAccessor;
 */
export function nestedPropertyAccessor<T>(item: T, path: string): any {
	return path.split(".").reduce((accumulator: any, key: string) => {
		return accumulator ? accumulator[key] : undefined;
	}, item);
}
