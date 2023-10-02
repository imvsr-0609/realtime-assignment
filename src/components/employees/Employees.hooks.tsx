export type Employee = {
	id: string;
	name: string;
	role: string;
	dateFrom: string;
	dateTo: string;
};

type EmployeeHook = {
	employees: Employee[];
};

export const useEmployee = (): EmployeeHook => {
	return {
		employees: [],
	};
};
