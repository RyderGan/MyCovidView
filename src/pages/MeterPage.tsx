import MeterChart from "@carbon/charts-react/meter-chart";
import "@carbon/charts/styles.css";
import "@carbon/styles/css/styles.css";
import { useLoaderData } from "react-router-dom";
import { meterLoader } from "../loaders";
import { LoaderData } from "../types";

const options = {
    "title": "Vaccination by age group of 18 to 29 in Kuala Lumpur",
	"height": "130px",
	"meter": {
		"proportional": {
			"total": 18207570,
			"unit": "persons"
		}
	},
	"color": {
		"pairing": {
			"option": 2
		}
	}
};

const vaccination = () => {
    const data = useLoaderData() as LoaderData<typeof meterLoader>;
    return (
        <div>
            <h1>Covid vaccination</h1>
            <MeterChart data={data} options={options} />
        </div>
    );
};

export default vaccination;
