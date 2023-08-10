import { DateRange, Range, RangeKeyDict } from "react-date-range";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

type CalendarInputProps = {
	rangeValue: Range[];
	onChangeDate: (value: RangeKeyDict) => void;
	disabledDates?: Date[];
};

export default function CalendarInput({
	rangeValue,
	onChangeDate,
	disabledDates,
}: CalendarInputProps) {
	return (
		<DateRange
			ranges={rangeValue}
			onChange={onChangeDate}
			disabledDates={disabledDates}
			rangeColors={["#262626"]}
			date={new Date()}
			minDate={new Date()}
			showDateDisplay={false}
		/>
	);
}
