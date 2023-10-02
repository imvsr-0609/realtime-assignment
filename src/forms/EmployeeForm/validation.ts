import dayjs from 'dayjs';
import * as Yup from 'yup';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

dayjs.extend(isSameOrBefore)

const EmployeeFormValidation = {
	name: Yup.string().required('Name is a required field'),
	role: Yup.string().required('Role is a required field'),
	dateFrom: Yup.string().required('From date is a required field'),
	dateTo: Yup.string().test('dateTo', 'to date must be after from date', function (value) {
		const dateFrom  = this.parent.dateFrom;
		if (!dateFrom || !value) {
		  return true;
		}
		return dayjs(value).isAfter(dayjs(dateFrom))
	  }),
};

export const EmployeeFormSchema = Yup.object().shape(EmployeeFormValidation);
