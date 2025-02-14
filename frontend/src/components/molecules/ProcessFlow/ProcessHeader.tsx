import Button from "@/components/atoms/Button";
import ProcessFlowItem from "@/components/atoms/ProcessFlowItem";
import {useProcessFlow} from "@/context/FlowContext";
import {ProcessFlowProps} from "@/interfaces";
import {ReactNode} from "react";

interface ProcessHeaderProps {
    flowData: ProcessFlowProps[];
    handleProcessActive: (id: number) => void;
    subTitle?: string;
    children: ReactNode;
}

const ProcessHeader: React.FC<ProcessHeaderProps> = ({
    flowData,
    handleProcessActive,
    subTitle,
    children
}) => {
    const {currentProcessIndex} = useProcessFlow();
    return (
        <div className="flex justify-between items-center h-[112px] px-4">
            <div>
                <p className="capitalize text-[16px] font-sf-ui-display font-[500] text-primary leading-[20px]">
                    {flowData[currentProcessIndex - 1] &&
                        flowData[currentProcessIndex - 1].label}
                </p>
                <p className="text-[13px] pt-1 font-sf-ui-display font-[400] leading-[16px] text-text">
                    {subTitle ? subTitle : ""}
                </p>
            </div>
            <div className="flex justify-start items-center gap-[11px]">
                {flowData.map((flow) => (
                    <ProcessFlowItem
                        key={flow.id}
                        id={flow.id}
                        icon={flow.icon}
                        label={flow.label}
                        state={flow.state}
                        line={flow.line}
                        onChangeState={() => handleProcessActive(flow.id)}
                    />
                ))}
            </div>
            {children}
        </div>
    );
};

export default ProcessHeader;
