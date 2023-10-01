import React, { FC, useCallback, useState } from 'react';
import { useField } from 'formik';
import { MdOutlineDateRange } from 'react-icons/md';
import Modal from '@mui/material/Modal';
import Datepicker from './Datepicker';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

type DateInputProps = {
	name: string;
};

dayjs.extend(localizedFormat);

const DateInput: FC<DateInputProps> = ({ name, ...props }) => {
	const style = {
		position: 'absolute' as 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	};

	const [showDatePicker, setShowDatePicker] = useState(false);
	const [field, meta, helpers] = useField(name);

	const handleClose = () => setShowDatePicker(false);

	const handleDateSelect = useCallback(
		(date: string) => () => {
			helpers.setValue(date);
			setShowDatePicker(false);
		},
		[helpers],
	);

	return (
		<div className="form-wrapper">
			<div
				onClick={() => setShowDatePicker(true)}
				className={`form-group ${
					meta.touched && meta.error ? 'is-invalid' : ''
				} `}
			>
				<MdOutlineDateRange />
				<p
					className={`form-control ${
						field.value.length === 0 && 'form_placeholder'
					} `}
					{...field}
					{...props}
				>
					{field.value.length > 0 ? dayjs(field.value).format('ll') : 'No date'}
				</p>
			</div>

			{meta.touched && meta.error ? (
				<div className="invalid-feedback">{meta.error}</div>
			) : null}

			<Modal open={showDatePicker} onClose={handleClose}>
				<Box sx={style}>
					<Datepicker
						value={field.value}
						handleDateSelect={handleDateSelect}
						close={() => setShowDatePicker(false)}
					/>
				</Box>
			</Modal>
		</div>
	);
};

export default DateInput;
