import { StackedBarChart } from '@carbon/charts-react';
import '@carbon/charts/styles.css';
import "@carbon/styles/css/styles.css";
import { ScaleTypes } from '@carbon/charts/interfaces';

const options = {
	title: 'Daily Covid Cases and Deaths in Each State',
	axes: {
		left: {
			mapsTo: "value",
			title: "Value",
			stacked: true
		},
		bottom: {
			mapsTo: "key",
			title: "State",
			scaleType : ScaleTypes.LABELS
		}
	},
	height: '400px',
};

function DeathRate ({ data }: { data: any }) {
	let processed_data: any[] = [];
	data.forEach((item: any) => {
		processed_data.push(...item);
	})

	return (
		<div>
			<h1>Stacked Bar Chart</h1>
			<StackedBarChart data={processed_data} options={options} />
		</div>
	);
}

export default DeathRate;
