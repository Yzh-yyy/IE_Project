import React, { useState } from 'react';
import { Button } from 'antd'; // Import Ant Design components
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './information.css'; // Import CSS file for styling
import StatisticsCards from './stat_cards';
import ChildObeseTrend from './child_obese_trend';
import DeathFactors from './death_factors';
import './bmi.css';
import map from "../assets/map.png";
import info1 from "../assets/info1.png";



const data = [
  { name: 'Underweight', value: 8.2 },
  { name: 'Normal weight', value: 66.9 },
  { name: 'Overweight', value: 16.7 },
  { name: 'Obesity', value: 8.2 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + (radius * Math.cos(-midAngle * Math.PI / 180)) * 1.4;
  const y = cy + (radius * Math.sin(-midAngle * Math.PI / 180)) * 1.4;

  return (
    <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(2)}%`}
    </text>
  );
};

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmiValue, setBMIValue] = useState(null);
  const [bmiCategory, setBMICategory] = useState('');

  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBMIValue(bmi);

      let category = '';
      if (bmi < 18.5) {
        category = 'underweight';
      } else if (bmi >= 18.5 && bmi < 25) {
        category = 'normal';
      } else if (bmi >= 25 && bmi < 30) {
        category = 'overweight';
      } else {
        category = 'obese';
      }
      setBMICategory(category);
    } else {
      setBMIValue('');
      setBMICategory('');
    }
  };

  return (
    <div className={`bmi-calculator-box ${bmiCategory}`}>
      <h2 className="sub-header" style={{ fontSize: "23px" }}>Calculate Your BMI</h2>
      <div className="input-container">
        <label htmlFor="height">Enter Your Height (cm):</label>
        <input
          type="number"
          placeholder="Enter your height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="input-field"
        />
      </div>
      <div className="input-container">
        <label htmlFor="weight">Enter Your Weight (kg):</label>
        <input
          type="number"
          placeholder="Enter your weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="input-field"
        />
      </div>
      <Button type="primary" onClick={calculateBMI} className="calculate-button">
        Calculate
      </Button>
      {bmiValue && (
        <div className="result_bmi">
          <p>
            Your BMI: <span className="bmi-value">{bmiValue}</span>
          </p>
          <p className="bmi-category">
            Result: You are <span className="bmi-message">{bmiCategory}</span> weight
          </p>
        </div>
      )}
    </div>
  );
};


const Info = () => (

  <div className='info-page pt-10'>

    <div className="pt-24 bg-gradient-to-r from-cyan-300 to-blue-900" >
      <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
          <h1 className="my-4 text-5xl font-bold leading-tight">
            Nurturing Today for a Bright Tomorrow!
          </h1>
          <p className="leading-normal text-2xl mb-8">
            Dive into our comprehensive guide on the critical importance of children's nutrition.
            Backed by statistics and detailed insights, explore why prioritizing proper nutrition for kids is fundamental for their current well-being and sets the stage for a healthier, brighter future.
          </p>
        </div>
        <div className="w-full md:w-3/5 py-6 text-center">
          <img className="w-full md:w-4/5 z-50" src={info1} alt="Family" />
        </div>
      </div>
    </div>

    <section className="bg-white border-b py-8s">
      <div className="container max-w-5xl mx-auto m-8">        
        <div className="w-full mb-4">
          <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
        </div>
        <div className="container max-w-5xl mx-auto m-8">
          <div className="grid md:grid-cols-1 gap-4">
            <div className="text-gray-600 text-lg">
              <h1 className="my-4 text-5xl font-bold leading-tight">
                Welcome to the Health Awareness Hub
              </h1>
              <p className="text-center mb-4">
              Begin your journey to health with the essential knowledge needed in our fast-paced world. Our platform offers up-to-date statistics and actionable insights for a healthier lifestyle. Remember, the numbers reflect our habits and the collective health of our society.
              <br/>
              <br/>
              Explore the data, understand the trends, and learn how even small choices, like reducing sugary drinks, can significantly improve our well-being. Let’s make informed decisions to foster healthier lives for ourselves and our communities.
              </p>
              <h3 className="w-full my-2 text-3xl font-bold leading-tight text-center text-gray-800">
                Explore to our key statistics
                <div class="w-4/5 border-t border-gray-500 my-10 mx-auto"></div>
                <StatisticsCards />
                <div class="w-4/5 border-t border-gray-500 my-10 mx-auto"></div>
              </h3>
            </div>
            </div>
          </div>
        </div>
    <h2 className="w-full my-2 text-4xl font-bold leading-tight text-center text-gray-800">
      Let's Dive into the Facts.
    </h2>
    <div className="pt-24 bg-white" >
      <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <div className="w-full md:w-3/5 py-6 text-center">
          <div style={{ marginTop: '5px', textAlign: 'center' }}>
          <ChildObeseTrend  />
          </div>
        </div>
        <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
          <h1 className="my-4 text-4xl font-bold leading-tight">
            Prevalence of Overweight Among Children and Adolescents by Country (1977-2016)
          </h1>
          <p className="leading-normal text-2xl mb-8">
            The graph shows the increasing trend in overweight prevalence among children and adolescents in various countries from 1977 to 2016. In 2003, the United States led with 37.4%, followed by New Zealand and Australia, while Japan had the lowest rate at 13.9%. The data highlights a significant public health concern, pointing to the need for targeted interventions to combat the rising rates of overweight youths globally.            <br />
          </p>
          </div>
      </div>
    </div>

    <div className="pt-24 bg-white" >
      <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
          <h1 className="my-4 text-5xl font-bold leading-tight">
            Weight status of Australian children aged 2-17 years
          </h1>
          <p className="leading-normal text-2xl mb-8">
            Hover over each segment to reveal detailed information about the prevalence of underweight, healthy weight, overweight, and obesity among children in Australia.
            <br />
            <br />
            Gain valuable insights into the current landscape of childhood weight status and use this data to inform decision-making and promote healthier lifestyles for children nationwide
          </p>
        </div>
        <div className="w-full md:w-3/5 py-6 text-center">
          <ResponsiveContainer width="100%" height={500}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={80} // Increased inner radius
                outerRadius={140} // Increased outer radius
                fill="#8884d8"
                dataKey="value"
                label={renderCustomizedLabel}
              >
                {
                  data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                }
              </Pie>
              <Tooltip />
              <Legend layout="vertical" align="center" verticalAlign="top" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>

    <div className="pt-24 bg-white" >
      <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <div className="w-full md:w-3/5 py-6 text-center">
          <div style={{ marginTop: '10px', textAlign: 'center' }}>
            <p className="text-left font-bold mb-4">
              Choose your option:
              <br/>
            </p>
              <DeathFactors />
          </div>
        </div>
        <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
          <h1 className="my-4 text-4xl font-bold leading-tight">
            Annual Risk Factors and Mortality Rates: 2008-2019
          </h1>
          <p className="leading-normal text-2xl mb-8">
            This chart illustrates annual trends from 2008 to 2019 in key risk factors that contribute to mortality, such as diets low in whole grains, fruits, and vegetables, obesity, and lack of physical activity.
          <br />
          <br />
            The data presents a compelling narrative: lifestyle choices and dietary habits are closely linked to health outcomes. Specifically, the analysis reveals a correlation between insufficient nutrition and sedentary lifestyles with elevated mortality rates. This information is pivotal for public health initiatives aiming to reduce premature deaths by promoting healthier diets and encouraging regular physical activity.
          </p>
          </div>
      </div>
    </div>

    <div className="pt-24 bg-white" >
      <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
          <h1 className="my-4 text-5xl font-bold leading-tight">
              In what zone are you?
            </h1>
            <p className="leading-normal text-2xl mb-8">
              Discover how childhood obesity rates vary across Australia with a map showcasing the percentage of obese children per state.
              <br />
              <br />
              By identifying areas with higher obesity rates, you can make better informed decisions about your children's lifestyle and healthcare, ensuring they receive the support and resources adequate to difficulties they face in their daily life.
            </p>
        </div>
        <div className="w-full md:w-3/5 py-6 text-center">
          <div style={{ marginTop: '10px', textAlign: 'center' }}>
            <div className="flex-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
              <img src={map} alt="Australia Obesity Map" style={{ width: '100%', maxWidth: '600px', height: 'auto' }} />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="pt-24 bg-gradient-to-r from-cyan-300 to-blue-900" >
      <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
          <h1 className="my-4 text-5xl font-bold leading-tight">
            Calculate Your BMI
          </h1>
          <p className="leading-normal text-2xl mb-8">

            Assessing your health status is a very important step in understanding your overall well-being.
            By calculating your Body Mass Index (BMI), you can gain valuable insights into whether your weight falls within a healthy range for your height.
            <br />
            <br />
            Regularly monitoring your child's BMI can serve as a proactive measure in maintaining optimal health and preventing potential health complications associated with weight-related issues.
          </p>
          <button className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
            Want to learn more?
          </button>
        </div>
        <div className="w-full md:w-3/5 py-6 text-center">
          <BMICalculator />
        </div>
      </div>
    </div>
  </section>
  </div>


);


export default Info;
