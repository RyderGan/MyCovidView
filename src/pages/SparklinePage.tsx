import AreaChart from "@carbon/charts-react/area-chart";
import { ScaleTypes } from "@carbon/charts/interfaces";
import "@carbon/charts/styles.css";
import "@carbon/styles/css/styles.css";
import { useLoaderData } from "react-router-dom";
import { sparklineLoader } from "../loaders";
import { LoaderData } from "../types";

const options = {
    "title": "Covid new cases in Malaysia",
    "axes": {
        "bottom": {
            "title": "Date",
            "scaleType": ScaleTypes.TIME,
            "mapsTo": "date"
        }, 
        "left": {
            "title": "New cases",
            "scaleType": ScaleTypes.LINEAR,
            "mapsTo": "value"
        }

    },
    "height": "400px"
};

const Cases = () => {
    const data = useLoaderData() as LoaderData<typeof sparklineLoader>;
    return (
        <div>
            <h1>Covid cases</h1>
            <AreaChart data={data} options={options} />
        </div>
    );
};

export default Cases;
