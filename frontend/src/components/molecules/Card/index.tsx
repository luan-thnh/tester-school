import {title} from "process";
import React from "react";

interface CardProps {
    title: string;
    content: React.ReactNode;
}
const Card = ({title, content}: CardProps) => {
    return (
        <div className=" rounded overflow-hidden shadow-lg p-4 bg-white">
            <div className="flex items-center mb-4 justify-center">
                <h2 className="text-xl font-bold ">{title}</h2>
            </div>
            <div className="text-gray-700 ">{content}</div>
        </div>
    );
};

export default Card;
