import {makeStyles} from "@material-ui/core/styles";

const styleUserCard = makeStyles((theme) => ({
    root: {
        width: '1fr'
    },
    avatar: {
        color: '#fff',
        backgroundColor: '#3f51b5',
    },
    grid: {
        // gridTemplateColumns: "repeat(auto-fit, minmax(150px, 100%))"
    }
}));

export default styleUserCard;