import { Employee } from '../components/employees/Employees.hooks';

export const defaultEmployee: Employee = {
	id: 0,
	name: '',
	role: '',
	dateFrom: '',
	dateTo: '',
};

export const roleOptions: string[] = [
	'Product Designer',
	'Flutter Developer',
	'QA Tester',
	'Product Owner',
];


export const dummyEmployees:Employee[]=[
	{
		id:0,
		name:'Vedant Singh',
		role:'Product Designer',
		dateFrom:'2020-04-02T08:02:17-05:00',
		dateTo:'2020-05-02T08:02:17-05:00'
	},
	{
		id:0,
		name:'Vaibhav Singh',
		role:'Flutter Developer',
		dateFrom:'2020-06-02T08:02:17-05:00',
		dateTo:''
	},
]