import { Employee } from '../../components/employees/Employees.hooks';
import { EmployeeFormType } from './types';

export const getInitialValue = (defaultValue: Employee): EmployeeFormType => {
	return { ...defaultValue };
};
