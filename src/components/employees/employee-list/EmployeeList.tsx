import React, { FC, useMemo } from 'react';
import { Employee } from '../Employees.hooks';
import SingleEmployee from './SingleEmployee';
import noEmployee from '../../../assets/no-employee.svg';

type EmployeeListProps = {
	employees: Employee[];
};

const EmployeeList: FC<EmployeeListProps> = ({ employees }) => {
	const currentEmployees = useMemo(
		() => employees.filter((employee) => employee.dateTo === ''),
		[employees],
	);
	const previousEmployees = useMemo(
		() => employees.filter((employee) => employee.dateTo !== ''),
		[employees],
	);
	return (
		<div className="employee_list_wrapper">
			{employees.length === 0 ? (
				<div className="no_employee">
					<img src={noEmployee} alt="" />
				</div>
			) : (
				<>
					{currentEmployees.length > 0 && (
						<div className="employee_list">
							<div className="employee_list_header">
								<h2 className="list_header_title">Current employees</h2>
							</div>

							{currentEmployees.map((employee) => (
								<SingleEmployee key={employee?.id} employeeData={employee} />
							))}
						</div>
					)}
					{previousEmployees.length > 0 && (
						<div className="employee_list">
							<div className="employee_list_header">
								<h2 className="list_header_title">Previous employees</h2>
							</div>
							{previousEmployees.map((employee) => (
								<SingleEmployee key={employee?.id} employeeData={employee} />
							))}
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default EmployeeList;
