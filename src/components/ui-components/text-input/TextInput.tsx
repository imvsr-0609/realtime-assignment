import React, { FC } from 'react';
import { useField } from 'formik';
import { HiOutlineUser } from 'react-icons/hi';

type TextInputProps = {
	name: string;
	placeholder: string;
};

const TextInput: FC<TextInputProps> = ({ name, ...props }) => {
	const [field, meta] = useField(name);
	return (
		<div className="form-wrapper">
			<label
				className={`form-group ${
					meta.touched && meta.error ? 'is-invalid' : ''
				} `}
			>
				<HiOutlineUser />
				<input className={`form-control `} {...field} {...props} />
			</label>

			{meta.touched && meta.error ? (
				<div className="invalid-feedback">{meta.error}</div>
			) : null}
		</div>
	);
};

export default TextInput;
