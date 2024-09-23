import GoalMain from "../../components/goal/GoalMain";
import Header from "../../components/planning/Header";
import Sidebar from "../../components/planning/Sidebar";
import "./style.css";

const Goal = () => {
    return (
        <div>
            <Header></Header>
            <div className="content flex">
                <Sidebar></Sidebar>
                <GoalMain />
            </div>
        </div>
    );
};

export default Goal;
