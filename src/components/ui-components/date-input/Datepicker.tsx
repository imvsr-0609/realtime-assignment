import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { FC, useState } from 'react';
import { MdOutlineDateRange } from 'react-icons/md';
import { DateTab, dateTabs } from '../../../constants/date';
import localizedFormat from 'dayjs/plugin/localizedFormat';

type DatepickerProps = {
	handleDateSelect: (date: string) => () => void;
	value: string;
	close: () => void;
};

dayjs.extend(localizedFormat);

const Datepicker: FC<DatepickerProps> = ({
	handleDateSelect,
	value,
	close,
}) => {
	const [date, setDate] = useState<Dayjs>(
		value !== '' ? dayjs(value) : dayjs(),
	);
	const [selectedTab, setSelectedTab] = useState<number>(0);

	const handleDateChange = (value: Dayjs | null) => {
		if (value) {
			setDate(value);
		}
	};

	const handleDateTabSelect = (date: DateTab) => {
		setSelectedTab(date.id);
		setDate(date.date);
	};

	return (
		<div className="datepicker_wrapper">
			<div className="datepicker_component">
				<div className="date_picker">
					<div className="date_tabs">
						{dateTabs.map((date) => (
							<button
								onClick={() => handleDateTabSelect(date)}
								key={date.id}
								className={`form_action_btn ${
									selectedTab === date.id ? 'save_btn' : 'cancel_btn'
								}`}
							>
								{date.title}
							</button>
						))}
					</div>

					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DateCalendar
							value={date}
							onChange={(newValue) => handleDateChange(newValue)}
						/>
					</LocalizationProvider>
				</div>

				<div className="date_picker_action">
					<div className="date_picker_value">
						<MdOutlineDateRange />
						<p>{date.format('ll')}</p>
					</div>

					<div className="action_btn">
						<button onClick={close} className="cancel_btn form_action_btn">
							Cancel
						</button>
						<button
							onClick={handleDateSelect(dayjs(date).toString())}
							className="save_btn form_action_btn"
						>
							Save
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Datepicker;
