import React, { FC, useState, useCallback } from 'react';
import { useField } from 'formik';
import { PiSuitcaseSimpleLight } from 'react-icons/pi';
import { MdArrowDropUp, MdArrowDropDown } from 'react-icons/md';
import { Drawer } from '@mui/material';

type SelectInputProps = {
	name: string;
	placeholder: string;
	options: string[];
};

const SelectInput: FC<SelectInputProps> = ({
	name,
	options,
	placeholder,
	...props
}) => {
	const [showOptions, setShowOptions] = useState(false);
	const [field, meta, helpers] = useField(name);

	const toggleDrawer =
		(open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event.type === 'keydown' &&
				((event as React.KeyboardEvent).key === 'Tab' ||
					(event as React.KeyboardEvent).key === 'Shift')
			) {
				return;
			}

			setShowOptions(open);
		};

	const handleOptionSelect = useCallback(
		(option: string) => () => {
			helpers.setValue(option);
			setShowOptions(false);
		},
		[helpers],
	);

	return (
		<div className="form-wrapper">
			<div
				onClick={toggleDrawer(true)}
				className={`form-group ${
					meta.touched && meta.error ? 'is-invalid' : ''
				} `}
			>
				<PiSuitcaseSimpleLight />
				<p
					className={`form-control ${
						field.value.length === 0 && 'form_placeholder'
					} `}
					{...field}
					{...props}
				>
					{field.value.length > 0 ? field.value : placeholder}
				</p>
				{showOptions ? <MdArrowDropUp /> : <MdArrowDropDown />}
			</div>

			<Drawer anchor="bottom" open={showOptions} onClose={toggleDrawer(false)}>
				<div className="form_option_wrapper">
					{options.map((option, idx) => (
						<div
							className="form_option"
							key={idx}
							onClick={handleOptionSelect(option)}
						>
							{option}
						</div>
					))}
				</div>
			</Drawer>

			{meta.touched && meta.error ? (
				<div className="invalid-feedback">{meta.error}</div>
			) : null}
		</div>
	);
};

export default SelectInput;
