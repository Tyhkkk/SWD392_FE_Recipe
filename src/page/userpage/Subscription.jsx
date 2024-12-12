// import React from "react";

const Subscription = () => {
  const plans = [
    {
      name: "Standard",
      features: [
        "Access to all standard recipes",
        "Monthly new recipe additions",
        "Cooking tips and tricks",
        "Email support",
      ],
      price: "99.000 VND / 3 months",
    },
    {
      name: "Standard +",
      features: [
        "Access to all standard recipes",
        "Monthly new recipe additions",
        "Cooking tips and tricks",
        "Email support",
        "Exclusive member recipes",
      ],
      price: "299.000 VND / 6 months",
    },
    {
      name: "Professional",
      features: [
        "All features of Standard +",
        "Access to premium recipes",
        "1-on-1 cooking workshops",
        "Exclusive video tutorials",
      ],
      price: "1.999.000 VND / 3 months",
    },
    {
      name: "Professional +",
      features: [
        "All features of Professional",
        "Dedicated recipe customization",
        "Advanced analytics and tracking",
        "Exclusive access to recipe creator tools",
      ],
      price: "4.999.000 VND / 6 months",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-green-300 to-pink-300 py-12 w-full">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Choose Your Subscription Plan
        </h1>
        <p className="text-lg text-center text-gray-600 mb-12">
          Select the perfect plan to elevate your cooking experience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 hover:scale-105 transition-transform duration-300"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{plan.name}</h2>
              <ul className="list-disc list-inside text-gray-600 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-800 mb-4">{plan.price}</p>
                <button className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
                  Choose
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition">
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
