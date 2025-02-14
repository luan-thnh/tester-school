import Button from "@/components/atoms/Button";
import ProcessFlowItem from "@/components/atoms/ProcessFlowItem";
import {processFlowData} from "@/faker";
import {ReactNode, useState} from "react";
import ProcessHeader from "./ProcessHeader";
import {ProcessFlowProps} from "@/interfaces";
import {ProcessFlowProvider, useProcessFlow} from "@/context/FlowContext";
import ProcessContainer from "./ProccessContainer";
interface ProcessFlowContainerProps {
    processLabel: ProcessFlowProps[];
    processBody: ReactNode[];
    rightHeader?: ReactNode;
    subTitle: string;
}
function ProcessFlow({
    processLabel,
    processBody,
    subTitle,
    rightHeader
}: ProcessFlowContainerProps) {
    return (
        <ProcessFlowProvider flowData={processLabel}>
            <ProcessContainer
                processBody={processBody}
                subTitle={subTitle}
                rightHeader={rightHeader}
            />
        </ProcessFlowProvider>
    );
}

export default ProcessFlow;
