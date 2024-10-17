import React, { useEffect, useState } from "react";
import UserLayout from "../../Layout/AuthLayout";

function AskQuestion() {
    const [currentStep, setCurrentStep] = useState(1);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleOptionSelect = (nextStep) => {
        if (nextStep >= 1 && nextStep <= 5) {
            setCurrentStep(nextStep);
            if (nextStep === 5) {
                setShowSuccess(true);
            } else {
                setShowSuccess(false);
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <>
            <UserLayout>

            </UserLayout>
        </>
    );
}

export default AskQuestion;
