describe("Assignment list", () => {
	const courseId = "java-wise1920";
	const otherCourseId = "info2-sose2020";
	const assignmentName = "Test_Assignment 01 (Java)";

	beforeEach(() => {
		cy.request({
			method: "POST",
			url: "http://localhost:3000/auth/login",
			body: { email: "mgtm.admin@test.com", password: "no_pw_required" }
		}).then(resp => {
			window.localStorage.setItem("studentMgmtToken", JSON.stringify(resp.body));
		});
		cy.visit(`/courses/${courseId}/assignments/`);
	});

	it("Navigates to /courses/{courseId}/assignments/", () => {
		cy.contains(assignmentName);
	});

	it("Loads new assignments when switching course via sidebar", () => {
		// Asserts that new content is loaded when switching between courses

		// First course should have 8 assignments
		cy.get("[data-assignment-name]").should("have.length", 8);

		// Locate link to other course in sidebar and click
		cy.get(".course-membership-list").contains(otherCourseId).click();

		// Other course should only have 2 assignments
		cy.url().should("contain", otherCourseId);
		cy.get("[data-assignment-name]").should("have.length", 2);
	});
});
