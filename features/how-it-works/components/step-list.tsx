'use client'

import * as React from 'react'
import { HOW_IT_WORKS_STEPS } from '../constants'
import { StepItem } from './step-item'
import { StepConnector } from './step-connector'

interface StepListProps {
    activeStep: number
    onStepClick: (index: number) => void
}

export function StepList({ activeStep, onStepClick }: StepListProps) {
    return (
        <div className="flex flex-col gap-0 sticky top-32">
            {HOW_IT_WORKS_STEPS.map((step, index) => (
                <React.Fragment key={step.id}>
                    <StepItem
                        step={step}
                        isActive={activeStep === index}
                        onClick={() => onStepClick(index)}
                    />
                    <StepConnector
                        active={activeStep > index}
                        isLast={index === HOW_IT_WORKS_STEPS.length - 1}
                    />
                </React.Fragment>
            ))}
        </div>
    )
}
