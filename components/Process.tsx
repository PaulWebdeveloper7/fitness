"use client";
import Image from "next/image";
import { useState } from "react";
import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


interface FormData {
  gender: string;
  goal: string;
  height: number;
  weight: number;
  goalWeight: number;
  trainingLevel: string;
  activities: string[];
}
interface Data {
  Option1: string;
  Option2: string;
  measure1: string;
  measure2: string;
}
const Process = () => {
  const DataForMeasure = [
    {
      Option1:'Feet' ,
      Option2 :'Inches',
      measure1:'cm',
      measure2:'feet'
    },
    {
      Option1:'Pound' ,
      Option2 :'Kilogram',
      measure1:'pound',
      measure2:'kg'
    },
    {
      Option1:'Pound' ,
      Option2 :'Kilogram',
      measure1:'pound',
      measure2:'kg'
    }

  ]
  const [step, setStep] = useState(0);
  const [Height, setHeight] = useState(false);
  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };
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
        <label className="mb-2 text-3xl font-extrabold">
          Choose Your Gender
        </label>
        <label htmlFor="gender">
          <div className=" flex flex-row gap-10 justify-center items-center">
            <div>
              <Image
                src={"/avatar.avif"}
                width={100}
                height={100}
                alt="Female"
                className="object-fit"
              />
              <div className=" flex gap-3">
                <input type="radio" name="gender" id="gender" />
                <h2>Female</h2>
              </div>
            </div>
            <div>
              <Image
                src={"/avatar2.avif"}
                width={100}
                height={100}
                alt="Male"
              />
              <div className=" flex gap-3">
                <input type="radio" name="gender" id="gender" />
                <h2>Male</h2>
              </div>
            </div>
            <div>
              <Image
                src={"/avatar3.avif"}
                width={100}
                height={100}
                alt="Other "
              />
              <div className=" flex gap-3">
                <input type="radio" name="gender" id="gender" />
                <h2>Other</h2>
              </div>
            </div>
          </div>
        </label>
      </div>
    );
  }

  function renderGoalStep() {
    return (
      <div className="flex flex-col gap-4">
        <label className="mb-2 font-extrabold text-5xl">Enter Your Goal</label>
        <label htmlFor="weight" className=" flex gap-2">
          <input type="checkbox" name="weight" id="weight" />
          <p>Lose weight</p>
        </label>
        <label htmlFor="fit" className=" flex gap-2">
          <input type="checkbox" name="fit" id="fit" />
          <p>Keep Fit</p>
        </label>
        <label htmlFor="Stronger" className="flex gap-2">
          <input type="checkbox" name="Stronger" id="Stronger" />
          <p>Get Stronger</p>
        </label>
        <label htmlFor="mass" className=" flex gap-2">
          <input type="checkbox" name="mass" id="mass" />
          <p>Gain Muscle mass</p>
        </label>
      </div>
    );
  }

  function renderHeightStep() {
    return (

       <div className="flex flex-col justify-center items-center">
       
        <label className="mb-2 text-3xl font-extrabold">Enter your Height</label>
        <ToggleButtonGroup
      color="secondary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      >
      <ToggleButton value="feet" onClick={()=>{setHeight(true)}}>Feet</ToggleButton>
      <ToggleButton value="cm" onClick={()=>{setHeight(false)}}>Inches</ToggleButton>
    </ToggleButtonGroup>
    { Height ?(
      <label htmlFor="" className="flex gap-2 justify-center items-center p-3">  
      <input
          type="number"
          name="height"
          value={formData.height}
          onChange={handleInputChange}
          className="border p-2 rounded"
          placeholder="Enter your height in feet"
          
          />
        <h3>Feet</h3>
        </label>
      ):(
        <label htmlFor="" className="flex gap-2 justify-center items-center p-3">
          <input
          type="number"
          name="height"
          value={formData.height}
          onChange={handleInputChange}
          className="border p-2 rounded"
          placeholder="Enter your height in cm"/>
          <h3>Inches</h3>
          </label>
        )}
      
      </div>  
    )}

  function renderWeightStep() {
    return (
      <div className="flex flex-col justify-center items-center">
       
        <label className="mb-2 text-3xl font-extrabold">Enter Your Weight</label>
        <ToggleButtonGroup
      color="secondary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      >
      <ToggleButton value="feet" onClick={()=>{setHeight(true)}}>Pound</ToggleButton>
      <ToggleButton value="cm" onClick={()=>{setHeight(false)}}>Kilogram</ToggleButton>
    </ToggleButtonGroup>
    { Height ?(
      <label htmlFor="" className="flex gap-2 justify-center items-center p-3">  
      <input
          type="number"
          name="height"
          value={formData.height}
          onChange={handleInputChange}
          className="border p-2 rounded"
          placeholder="Enter your height in feet"
          
          />
        <h3>Pound</h3>
        </label>
      ):(
        <label htmlFor="" className="flex gap-2 justify-center items-center p-3">
          <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleInputChange}
          className="border p-2 rounded"
          placeholder="Enter your weight in kg"/>
          <h3>kg</h3>
          </label>
        )}
      
      </div>  
    );
  }

  function renderGoalWeightStep() {
    return (
      <div className="flex flex-col justify-center items-center">
       
        <label className="mb-2 text-3xl font-extrabold">Enter Your Goal Weight</label>
        <ToggleButtonGroup
      color="secondary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      >
      <ToggleButton value="feet" onClick={()=>{setHeight(true)}}>Pound</ToggleButton>
      <ToggleButton value="cm" onClick={()=>{setHeight(false)}}>Kilogram</ToggleButton>
    </ToggleButtonGroup>
    { Height ?(
      <label htmlFor="" className="flex gap-2 justify-center items-center p-3">  
      <input
          type="number"
          name="height"
          value={formData.height}
          onChange={handleInputChange}
          className="border p-2 rounded"
          placeholder="Enter your height in feet"
          
          />
        <h3>Pound</h3>
        </label>
      ):(
        <label htmlFor="" className="flex gap-2 justify-center items-center p-3">
          <input
          type="number"
          name="weight"
          value={formData.goalWeight}
          onChange={handleInputChange}
          className="border p-2 rounded"
          placeholder="Enter your weight in kg"/>
          <h3>kg</h3>
          </label>
        )}
      
      </div>  
    );
  }

  function renderTrainingLevelStep() {
    return (
      <div className="flex flex-col gap-4">
      <label className="mb-2 font-extrabold text-5xl">Enter Your Goal</label>
      <label htmlFor="weight" className=" flex gap-2">
        <input type="checkbox" name="weight" id="weight" />
        <p>Beginner</p>
        <p>I want to start training</p>

      </label>
      <label htmlFor="fit" className=" flex gap-2">
        <input type="checkbox" name="fit" id="fit" />
        <p>Irregular Training</p>
        <p>I train 1-2 times a week</p>

      </label>
      <label htmlFor="Stronger" className="flex gap-2">
        <input type="checkbox" name="Stronger" id="Stronger" />
        <p>Medium</p>
        <p>I train 3-5 times a week</p>

      </label>
      <label htmlFor="mass" className=" flex gap-2">
        <input type="checkbox" name="mass" id="mass" />
        <p>Advanced</p>
        <p>I train more than 5 times a week</p>

      </label>
    </div>
    );
  }

  function renderActivitiesStep() {
    const activities = [
      "Running",
      "Cycling",
      "Swimming",
      "Weightlifting",
      "Yoga",
    ];
    return (
      <div className="flex flex-col justify-center items-center">
      <label className="mb-2 text-3xl font-extrabold">
        Choose Your Gender
      </label>
      <label htmlFor="gender">
        <div className=" flex flex-row gap-10 justify-center items-center">
          <div>
            <Image
              src={"/avatar.avif"}
              width={100}
              height={100}
              alt="Female"
              className="object-fit"
            />
            <div className=" flex gap-3">
              <input type="radio" name="gender" id="gender" />
              <h2>Female</h2>
            </div>
          </div>
          <div>
            <Image
              src={"/avatar2.avif"}
              width={100}
              height={100}
              alt="Male"
            />
            <div className=" flex gap-3">
              <input type="radio" name="gender" id="gender" />
              <h2>Male</h2>
            </div>
          </div>
          <div>
            <Image
              src={"/avatar3.avif"}
              width={100}
              height={100}
              alt="Other "
            />
            <div className=" flex gap-3">
              <input type="radio" name="gender" id="gender" />
              <h2>Other</h2>
            </div>
          </div>
        </div>
      </label>
    </div>
    );
  }

  function renderProgressCircle() {
    const completionPercentage = ((step + 1) / steps.length) * 100;

    return (
      <div className="relative flex items-center justify-center w-16 h-16">
        <svg className="absolute w-full h-full">
          <circle
            className="text-gray-300"
            strokeWidth="4"
            stroke="currentColor"
            fill="transparent"
            r="28"
            cx="32"
            cy="32"
          />
          <circle
            className="text-blue-600"
            strokeWidth="4"
            strokeDasharray="175"
            strokeDashoffset={175 - (completionPercentage / 100) * 175}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="28"
            cx="32"
            cy="32"
          />
        </svg>
        <span className="absolute text-lg font-bold text-blue-600">
          {Math.round(completionPercentage)}%
        </span>
      </div>
    );
  }

  return (
    <div className="max-w-lg  p-5 border rounded-lg shadow-lg  mt-12">
      <div className="mb-5">{steps[step].content}</div>
      <div className="flex justify-between">
        <button
          onClick={handlePrev}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          disabled={step === 0}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          disabled={step === steps.length - 1}
        >
          Next
        </button>
      </div>
      <div className="mt-5 flex justify-center">{renderProgressCircle()}</div>
    </div>
  );
};

export default Process;
