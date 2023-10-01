import { Formik, FormikHelpers, Form } from 'formik';
import { FC, useEffect, useState } from 'react';
import { defaultEmployee, dummyEmployees } from '../../constants/employee';
import EmployeeForm from '../../forms/EmployeeForm/EmployeeForm';
import { getInitialValue } from '../../forms/EmployeeForm/initialValue';
import { EmployeeFormType } from '../../forms/EmployeeForm/types';
import { EmployeeFormSchema } from '../../forms/EmployeeForm/validation';
import { useIndexedDB } from '../../helpers/useIndexedDB';
import EmployeeList from '../employee-list/EmployeeList';
import { Employee } from './Employees.hooks';
import { Drawer } from '@mui/material';

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

	useEffect(() => {
		getEmployees((employees) => setEmployees(employees));
	}, []);

	const handleAddEmployee = (employee: Employee) => {
		addEmployee(employee);
	};

	const handleSubmit = (
		values: EmployeeFormType,
		helpers: FormikHelpers<EmployeeFormType>,
	) => {
		addEmployee(values);
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
						<EmployeeForm
							value={defaultEmployee}
							onSubmit={handleAddEmployee}
							close={() => setShowForm(false)}
						/>
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
			<EmployeeList employees={dummyEmployees} />
		</div>
	);
};

export default Employees;
