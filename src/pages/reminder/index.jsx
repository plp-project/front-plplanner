import Header from "../../components/planning/Header";
import Sidebar from "../../components/planning/Sidebar";
import ReminderMain from "../../components/Reminder/ReminderMain";
import "./styles.css";

const Reminder = () => {
	return (
		<div>
			<Header></Header>
			<div className="content flex">
				<Sidebar></Sidebar>
				<ReminderMain />
			</div>
		</div>
	);
};

export default Reminder;
