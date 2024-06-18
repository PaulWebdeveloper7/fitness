"use client";
import Image from "next/image";
import { useState } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CircularProgress from '@mui/material/CircularProgress';
import { FormControlLabel, Checkbox, RadioGroup, Radio, Button } from '@mui/material';

interface FormData {
  gender: string;
  goal: string;
  height: number;
  weight: number;
  goalWeight: number;
  trainingLevel: string;
  activities: string[];
}

const Process = () => {
  const [step, setStep] = useState(0);
  const [useFeet, setUseFeet] = useState(true);
  const [alignment, setAlignment] = useState('feet');

  const [formData, setFormData] = useState<FormData>({
    gender: "",
    goal: "",
    height: 0,
    weight: 0,
    goalWeight: 0,
    trainingLevel: "",
    activities: [],
  });

  const steps = [
    { label: "Gender", content: renderGenderStep() },
    { label: "Goal", content: renderGoalStep() },
    { label: "Height", content: renderHeightStep() },
    { label: "Weight", content: renderWeightStep() },
    { label: "Goal Weight", content: renderGoalWeightStep() },
    { label: "Training Level", content: renderTrainingLevelStep() },
    { label: "Activities", content: renderActivitiesStep() },
  ];

  function handleNext() {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  }

  function handlePrev() {
    if (step > 0) {
      setStep(step - 1);
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleArrayChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked
        ? [...prev.activities, value]
        : prev.activities.filter((activity) => activity !== value),
    }));
  }

  function renderGenderStep() {
    return (
      <div className="flex flex-col justify-center items-center">
        <label className="mb-4 text-2xl font-bold">
          Choose Your Gender
        </label>
        <RadioGroup row name="gender" value={formData.gender} onChange={handleInputChange}>
          {["Female", "Male", "Other"].map((gender, index) => (
            <div key={gender} className="flex flex-col items-center mx-4">
              <Image
                src={`/avatar${index + 1}.avif`}
                width={100}
                height={100}
                alt={gender}
                className="object-contain"
              />
              <FormControlLabel
                value={gender}
                control={<Radio />}
                label={gender}
              />
            </div>
          ))}
        </RadioGroup>
      </div>
    );
  }

  function renderGoalStep() {
    const goals = [
      "Lose weight",
      "Keep Fit",
      "Get Stronger",
      "Gain Muscle mass"
    ];
    return (
      <div className="flex flex-col items-start">
        <label className="mb-4 text-2xl font-bold">Enter Your Goal</label>
        {goals.map((goal) => (
          <FormControlLabel
            key={goal}
            control={<Checkbox checked={formData.goal === goal} onChange={handleInputChange} name="goal" value={goal} />}
            label={goal}
            className="mb-2"
          />
        ))}
      </div>
    );
  }

  function renderHeightStep() {
    return (
      <div className="flex flex-col justify-center items-center">
        <label className="mb-4 text-2xl font-bold">Enter Your Height</label>
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={(_, value) => {
            if (value !== null) {
              setAlignment(value);
              setUseFeet(value === 'feet');
            }
          }}
          aria-label="Height Unit"
        >
          <ToggleButton value="feet">Feet</ToggleButton>
          <ToggleButton value="cm">Cm</ToggleButton>
        </ToggleButtonGroup>
        <div className="mt-4 flex items-center gap-2">
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleInputChange}
            className="border p-2 rounded"
            placeholder={`Enter your height in ${useFeet ? 'feet' : 'cm'}`}
          />
          <span>{useFeet ? 'Feet' : 'Cm'}</span>
        </div>
      </div>
    );
  }

  function renderWeightStep() {
    return (
      <div className="flex flex-col justify-center items-center">
        <label className="mb-4 text-2xl font-bold">Enter Your Weight</label>
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={(_, value) => {
            if (value !== null) {
              setAlignment(value);
              setUseFeet(value === 'feet');
            }
          }}
          aria-label="Weight Unit"
        >
          <ToggleButton value="feet">Pounds</ToggleButton>
          <ToggleButton value="cm">Kilograms</ToggleButton>
        </ToggleButtonGroup>
        <div className="mt-4 flex items-center gap-2">
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
            className="border p-2 rounded"
            placeholder={`Enter your weight in ${useFeet ? 'pounds' : 'kg'}`}
          />
          <span>{useFeet ? 'Pounds' : 'Kg'}</span>
        </div>
      </div>
    );
  }

  function renderGoalWeightStep() {
    return (
      <div className="flex flex-col justify-center items-center">
        <label className="mb-4 text-2xl font-bold">Enter Your Goal Weight</label>
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={(_, value) => {
            if (value !== null) {
              setAlignment(value);
              setUseFeet(value === 'feet');
            }
          }}
          aria-label="Goal Weight Unit"
        >
          <ToggleButton value="feet">Pounds</ToggleButton>
          <ToggleButton value="cm">Kilograms</ToggleButton>
        </ToggleButtonGroup>
        <div className="mt-4 flex items-center gap-2">
          <input
            type="number"
            name="goalWeight"
            value={formData.goalWeight}
            onChange={handleInputChange}
            className="border p-2 rounded"
            placeholder={`Enter your goal weight in ${useFeet ? 'pounds' : 'kg'}`}
          />
          <span>{useFeet ? 'Pounds' : 'Kg'}</span>
        </div>
      </div>
    );
  }

  function renderTrainingLevelStep() {
    const levels = [
      { level: "Beginner", description: "I want to start training" },
      { level: "Irregular Training", description: "I train 1-2 times a week" },
      { level: "Medium", description: "I train 3-5 times a week" },
      { level: "Advanced", description: "I train more than 5 times a week" },
    ];
    return (
      <div className="flex flex-col items-start">
        <label className="mb-4 text-2xl font-bold">Enter Your Training Level</label>
        {levels.map(({ level, description }) => (
          <FormControlLabel
            key={level}
            control={<Checkbox checked={formData.trainingLevel === level} onChange={handleInputChange} name="trainingLevel" value={level} />}
            label={
              <div>
                <span className="font-semibold">{level}</span>
                <p className="text-sm">{description}</p>
              </div>
            }
            className="mb-2"
          />
        ))}
      </div>
    );
  }

  function renderActivitiesStep() {
    const activities = ["Running", "Cycling", "Swimming", "Weightlifting", "Yoga"];
    return (
      <div className="flex flex-col items-start">
        <label className="mb-4 text-2xl font-bold">Select Your Activities</label>
        {activities.map((activity) => (
          <FormControlLabel
            key={activity}
            control={
              <Checkbox
                checked={formData.activities.includes(activity)}
                onChange={handleArrayChange}
                name="activities"
                value={activity}
              />
            }
            label={activity}
            className="mb-2"
          />
        ))}
      </div>
    );
  }

  function renderProgressBar() {
    const completionPercentage = ((step + 1) / steps.length) * 100;

    return (
      <div className="relative flex items-center justify-center w-full">
        <CircularProgress
          variant="determinate"
          value={completionPercentage}
          className="absolute"
          size={50}
          thickness={5}
        />
        <span className="absolute text-sm font-bold">
          {Math.round(completionPercentage)}%
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-custom-image bg-center bg-cover w-full">
      <div className="max-w-lg mx-auto p-5 border rounded-lg shadow-lg bg-white h-fit w-70">
        <div className="mb-5">{steps[step].content}</div>
        <div className="flex justify-between p-5 gap-10">
          <Button
            onClick={handlePrev}
            variant="contained"
            color="secondary"
            disabled={step === 0}

          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            variant="contained"
            color="primary"
            disabled={step === steps.length - 1}
          >
            Next
          </Button>
        </div>
        <div className="mt-4 flex justify-center p-10">{renderProgressBar()}</div>
      </div>
    </div>
  );
};

export default Process;
