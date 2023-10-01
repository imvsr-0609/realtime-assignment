import * as Yup from 'yup';

const EmployeeFormValidation = {
	name: Yup.string().required('Name is a required field'),
	role: Yup.string().required('Role is a required field'),
	dateFrom: Yup.string().required('From date is a required field'),
	dateTo: Yup.string(),
};

export const EmployeeFormSchema = Yup.object().shape(EmployeeFormValidation);
