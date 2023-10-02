import React, { FC, useState } from 'react';
import { Formik, FormikHelpers, Form } from 'formik';
import { Employee } from '../Employees.hooks';
import EmployeeForm from '../../../forms/EmployeeForm/EmployeeForm';
import { EmployeeFormType } from '../../../forms/EmployeeForm/types';
import { useIndexedDB } from '../../../helpers/useIndexedDB';
import SwipeWrapper from './SwipeWrapper';
import { getInitialValue } from '../../../forms/EmployeeForm/initialValue';
import { EmployeeFormSchema } from '../../../forms/EmployeeForm/validation';
import { Drawer } from '@mui/material';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { MdDelete } from 'react-icons/md';

type SingleEmployeeProps = {
	employeeData: Employee;
};

dayjs.extend(localizedFormat);

const SingleEmployee: FC<SingleEmployeeProps> = ({ employeeData }) => {
	const [showForm, setShowForm] = useState(false);
	const { updateEmployee, deleteEmployee } = useIndexedDB();

	const { name, role, dateFrom, dateTo } = employeeData;

	const handleEditEmployee = (values: EmployeeFormType) => {
		updateEmployee(values);
	};

	const handleDeleteEmployee = (key: string) => {
		deleteEmployee(key);
	};

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

	const handleSubmit = (
		values: EmployeeFormType,
		helpers: FormikHelpers<EmployeeFormType>,
	) => {
		handleEditEmployee(values);
		helpers.setSubmitting(false);
		setShowForm(false);
	};

	return (
		<>
			<Drawer anchor="bottom" open={showForm} onClose={toggleDrawer(false)}>
				<Formik<EmployeeFormType>
					initialValues={getInitialValue(employeeData)}
					onSubmit={handleSubmit}
					validationSchema={EmployeeFormSchema}
				>
					<Form>
						<EmployeeForm close={() => setShowForm(false)} />
					</Form>
				</Formik>
			</Drawer>

			<div className="employee_swipe">
				<SwipeWrapper onDelete={() => handleDeleteEmployee(employeeData.id)}>
					<div onClick={() => setShowForm(true)} className="single_employee ">
						<h2 className="employee_name">{name}</h2>
						<p className="employee_role">{role}</p>
						<p className="employee_date">
							{dateTo === '' && 'From '}
							{dayjs(dateFrom).format('ll')}
							{dateTo !== '' && ` - ${dayjs(dateTo).format('ll')}`}
						</p>
					</div>
				</SwipeWrapper>
				<div className="delete-icon">
					<MdDelete />
				</div>
			</div>
		</>
	);
};

export default SingleEmployee;
