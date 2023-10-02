import { useFormikContext } from 'formik';
import { FC } from 'react';
import { BsArrowRightShort } from 'react-icons/bs';
import DateInput from '../../components/ui-components/date-input/DateInput';
import SelectInput from '../../components/ui-components/select-input/SelectInput';
import TextInput from '../../components/ui-components/text-input/TextInput';
import { roleOptions } from '../../constants/employee';
import { EmployeeFormType } from './types';

type EmployeeFormProps = {
	close: () => void;
};

const EmployeeForm: FC<EmployeeFormProps> = ({ close }) => {
	const { resetForm } = useFormikContext<EmployeeFormType>();

	const handleCancel = () => {
		resetForm();
		close();
	};

	return (
		<div className="employee_form_wrapper">
			<div className="header">
				<h2 className="header_title">Add Employee Details</h2>
			</div>
			<div className="employee_form">
				<TextInput name="name" placeholder="Employee name" />

				<SelectInput
					name="role"
					placeholder="Select role"
					options={roleOptions}
				/>
				<div className="date_wrapper">
					<DateInput name="dateFrom" />
					<BsArrowRightShort />
					<DateInput name="dateTo" />
				</div>
			</div>
			<div className="form_action">
				<button
					onClick={handleCancel}
					type="button"
					className="cancel_btn form_action_btn"
				>
					Cancel
				</button>
				<button type="submit" className="save_btn form_action_btn">
					Save
				</button>
			</div>
		</div>
	);
};

export default EmployeeForm;
