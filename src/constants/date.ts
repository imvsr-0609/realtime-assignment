import dayjs, { Dayjs } from 'dayjs';
import weekday from 'dayjs/plugin/weekday'

export type DateTab = {
    id:number;
	title: string;
	date: Dayjs;
};
dayjs.extend(weekday)

export const dateTabs: DateTab[] = [
	{
        id:0,
		title: 'Today',
		date: dayjs(),
	},
	{
        id:1,
		title: 'Next Monday',
		date: dayjs().weekday(8),

	},
	{
        id:2,
		title: 'Next Tuesday',
		date: dayjs().weekday(9),
	},
	{
        id:3,
		title: 'After 1 week',
		date: dayjs().add(7, 'day'),
	},
];
