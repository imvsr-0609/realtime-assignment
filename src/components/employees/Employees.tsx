import { Drawer } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { FC, useCallback, useEffect, useState } from 'react';
import uuid from 'react-uuid';
import { defaultEmployee } from '../../constants/employee';
import EmployeeForm from '../../forms/EmployeeForm/EmployeeForm';
import { getInitialValue } from '../../forms/EmployeeForm/initialValue';
import { EmployeeFormType } from '../../forms/EmployeeForm/types';
import { EmployeeFormSchema } from '../../forms/EmployeeForm/validation';
import { useIndexedDB } from '../../helpers/useIndexedDB';
import { Employee } from './Employees.hooks';
import EmployeeList from './employee-list/EmployeeList';

const Employees: FC = () => {
	const [employees, setEmployees] = useState<Employee[]>([]);
	const { addEmployee, getEmployees } = useIndexedDB();
	const [showForm, setShowForm] = useState(false);

	const toggleDrawer =
		(open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event.type === 'keydown' &&
				((event as React.KeyboardEvent).key === 'Tab' ||
					(event as React.KeyboardEvent).key === 'Shift')
			) {
				return;
			}

			setShowForm(open);
		};

	const fetchEmployees = useCallback(() => {
		getEmployees((employees) => setEmployees(employees));
	}, [getEmployees]);

	useEffect(() => {
		fetchEmployees();
	}, [fetchEmployees]);

	const handleSubmit = (
		values: EmployeeFormType,
		helpers: FormikHelpers<EmployeeFormType>,
	) => {
		const newEmployee = { ...values, id: uuid() };
		console.log(newEmployee);
		addEmployee(newEmployee);
		helpers.setSubmitting(false);
		setShowForm(false);
	};

	return (
		<div className="employee_wrapper">
			<Drawer anchor="bottom" open={showForm} onClose={toggleDrawer(false)}>
				<Formik<EmployeeFormType>
					initialValues={getInitialValue(defaultEmployee)}
					onSubmit={handleSubmit}
					validationSchema={EmployeeFormSchema}
				>
					<Form>
						<EmployeeForm close={() => setShowForm(false)} />
					</Form>
				</Formik>
			</Drawer>
			<button onClick={() => setShowForm(true)} className="add_employee_btn">
				+
			</button>
			<div className="swipe_delete_banner">
				<h2 className="title">Swipe left to delete</h2>
			</div>
			<div className="header">
				<h2 className="header_title">Employee List</h2>
			</div>
			<EmployeeList employees={employees} />
		</div>
	);
};

export default Employees;
