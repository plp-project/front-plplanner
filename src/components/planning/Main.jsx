import React from "react";
import { Search } from "react-feather";
import SecondHeader from "./SecondHeader";
import Quadro from "./Quadro";

const Main = () => {
  return (
    <div className="flex flex-col w-full bg-white  ">
    <SecondHeader></SecondHeader>
    <Quadro></Quadro>
    </div>
    
);
};

export default Main;
