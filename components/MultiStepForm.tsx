// "use client";

// import { useForm } from "react-hook-form";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// type FormValues = {
//   name: string;
//   careType: string;
//   zipCode: string;
// };

// type MatchResult = {
//   name: string;
//   typeOfCare: string[];
//   facilityZip: number;
// } | null;

// const stepVariants = {
//   initial: { opacity: 0, x: 100 },
//   animate: { opacity: 1, x: 0 },
//   exit: { opacity: 0, x: -100 },
// };

// export default function MultiStepForm() {
//   const [step, setStep] = useState(1);
//   const [result, setResult] = useState<{
//     match: MatchResult;
//     reason?: string;
//   } | null>(null);
//   const [loading, setLoading] = useState(false);
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//     reset,
//   } = useForm<FormValues>();

//   const careType = watch("careType");

//   const onSubmit = async (data: FormValues) => {
//     setLoading(true);
//     const res = await fetch("/api/match", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         name: data.name,
//         careType: data.careType,
//         zipCode: parseInt(data.zipCode),
//       }),
//     });
//     const responseData = await res.json();
//     setResult(responseData);
//     setLoading(false);
//     setStep(4); // Go to result step
//   };

//   const handleNext = () => setStep((prev) => prev + 1);

//   const startOver = () => {
//     reset();
//     setStep(1);
//     setResult(null);
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl mt-10">
//       <AnimatePresence mode="wait">
//         {step === 1 && (
//           <motion.div
//             key="step1"
//             variants={stepVariants}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             transition={{ duration: 0.4 }}
//             className="space-y-4"
//           >
//             <h2 className="text-xl font-semibold">Patient Name</h2>
//             <input
//               type="text"
//               {...register("name", {
//                 required: "Name is required",
//                 pattern: {
//                   value: /^[A-Za-z\s]+$/,
//                   message: "Name should only contain letters and spaces",
//                 },
//               })}
//               className="w-full border p-2 rounded"
//               placeholder="Enter patient name"
//             />
//             {errors.name && (
//               <p className="text-red-500">{errors.name.message}</p>
//             )}
//             <button
//               onClick={() => handleNext()}
//               disabled={!watch("name")}
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               Next
//             </button>
//           </motion.div>
//         )}

//         {step === 2 && (
//           <motion.div
//             key="step2"
//             variants={stepVariants}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             transition={{ duration: 0.4 }}
//             className="space-y-4"
//           >
//             <h2 className="text-xl font-semibold">Type of Care</h2>
//             <select
//               {...register("careType", { required: "Care type is required" })}
//               className="w-full border p-2 rounded"
//             >
//               <option value="">Select care type</option>
//               <option value="Stationary">Stationary</option>
//               <option value="Ambulatory">Ambulatory</option>
//               <option value="Day Care">Day Care</option>
//             </select>
//             {errors.careType && (
//               <p className="text-red-500">{errors.careType.message}</p>
//             )}
//             <button
//               onClick={() => {
//                 if (careType && careType !== "Day Care") {
//                   handleNext();
//                 } else {
//                   handleSubmit(onSubmit)(); // Skip zip code if Day Care
//                 }
//               }}
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               Next
//             </button>
//           </motion.div>
//         )}

//         {step === 3 && (
//           <motion.div
//             key="step3"
//             variants={stepVariants}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             transition={{ duration: 0.4 }}
//             className="space-y-4"
//           >
//             <h2 className="text-xl font-semibold">Zip Code</h2>
//             <input
//               type="number"
//               {...register("zipCode", {
//                 required: "Zip code is required",
//                 min: { value: 10000, message: "Invalid zip code" },
//                 pattern: {
//                   value: /^[0-9]{5}$/,
//                   message: "Zip code must be a 5-digit number",
//                 },
//               })}
//               className="w-full border p-2 rounded"
//               placeholder="Enter zip code"
//             />
//             {errors.zipCode && (
//               <p className="text-red-500">{errors.zipCode.message}</p>
//             )}
//             <button
//               onClick={handleSubmit(onSubmit)}
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//             >
//               Submit
//             </button>
//           </motion.div>
//         )}

//         {step === 4 && (
//           <motion.div
//             key="step4"
//             variants={stepVariants}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//             transition={{ duration: 0.4 }}
//             className="space-y-4"
//           >
//             <h2 className="text-xl font-semibold">🎉 Match Result</h2>
//             {loading ? (
//               <p>Loading...</p>
//             ) : result?.match ? (
//               <div className="p-4 border rounded bg-green-50 space-y-1">
//                 <p>
//                   <strong>Facility:</strong> {result.match.name}
//                 </p>
//                 <p>
//                   <strong>Care Types:</strong>{" "}
//                   {result.match.typeOfCare.join(", ")}
//                 </p>
//                 <p>
//                   <strong>Zip Code:</strong> {result.match.facilityZip}
//                 </p>
//               </div>
//             ) : (
//               <div className="p-4 border rounded bg-red-50">
//                 <p>No match found. {result?.reason}</p>
//               </div>
//             )}
//             <button
//               onClick={startOver}
//               className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mt-4"
//             >
//               Start Over
//             </button>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FormValues = {
  name: string;
  careType: string;
  zipCode: string;
};

type MatchResult = {
  name: string;
  typeOfCare: string[];
  facilityZip: number;
} | null;

const stepVariants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [result, setResult] = useState<{
    match: MatchResult;
    reason?: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const careType = watch("careType");

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    const res = await fetch("/api/match", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        careType: data.careType,
        zipCode: parseInt(data.zipCode),
      }),
    });
    //const responseData = await res.json();

    let responseData;
    try {
      responseData = await res.json();
    } catch (err) {
      console.error("Failed to parse JSON:", err);
      throw new Error("Something went wrong. Please try again.");
    }

    if (!res.ok) {
      console.error("API Error:", responseData);
      throw new Error(responseData?.message || "Server Error");
    }
    setResult(responseData);
    setLoading(false);
    setStep(4); // Go to result step
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrevious = () => setStep((prev) => prev - 1); // Decrease step to go backward

  const startOver = () => {
    reset();
    setStep(1);
    setResult(null);
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-xl mt-10">
      {/* Logo */}
      <div className="text-center mb-6">
        <img
          src="/CareMatesLogo.png"
          alt="CareMates"
          className="mx-auto h-12"
        />
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* <h2 className="text-1xl font-semibold">Patient Name</h2> */}
            <input
              type="text"
              {...register("name", {
                required: "Name is required",
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Name should only contain letters and spaces",
                },
              })}
              className="w-full border p-3 rounded-md text-lg"
              placeholder="Enter patient name"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
            <div className="flex justify-center">
              <button
                onClick={() => handleNext()}
                disabled={!watch("name")}
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 w-full sm:w-auto"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* <h2 className="text-2xl font-semibold">Type of Care</h2> */}
            <select
              {...register("careType", { required: "Care type is required" })}
              className="w-full border p-3 rounded-md text-lg"
            >
              <option value="">Select care type</option>
              <option value="Stationary">Stationary</option>
              <option value="Ambulatory">Ambulatory</option>
              <option value="Day Care">Day Care</option>
              <option value="Stationary & Ambulatory">
                Stationary & Ambulatory
              </option>
            </select>
            {errors.careType && (
              <p className="text-red-500">{errors.careType.message}</p>
            )}
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={handlePrevious} // Go back to previous step
                className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-600 w-full sm:w-auto"
              >
                Previous
              </button>
              <button
                onClick={() => {
                  if (careType && careType !== "Day Care") {
                    handleNext();
                  } else {
                    handleSubmit(onSubmit)(); // Skip zip code if Day Care
                  }
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* <h2 className="text-2xl font-semibold">Zip Code</h2> */}
            <input
              type="number"
              {...register("zipCode", {
                required: "Zip code is required",
                min: { value: 10000, message: "Invalid zip code" },
                pattern: {
                  value: /^[0-9]{5}$/,
                  message: "Zip code must be a 5-digit number",
                },
              })}
              className="w-full border p-3 rounded-md text-lg"
              placeholder="Enter zip code"
            />
            {errors.zipCode && (
              <p className="text-red-500">{errors.zipCode.message}</p>
            )}
            <div className="flex justify-between">
              <button
                onClick={handlePrevious} // Go back to previous step
                className="bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600"
              >
                Previous
              </button>
              <button
                onClick={handleSubmit(onSubmit)}
                className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold">🎉 Match Result</h2>
            {loading ? (
              <p>Loading...</p>
            ) : result?.match ? (
              <div className="p-4 border rounded bg-green-50 space-y-1">
                <p>
                  <strong>Facility:</strong> {result.match.name}
                </p>
                <p>
                  <strong>Care Types:</strong>{" "}
                  {result.match.typeOfCare.join(", ")}
                </p>
                <p>
                  <strong>Zip Code:</strong> {result.match.facilityZip}
                </p>
              </div>
            ) : (
              <div className="p-4 border rounded bg-red-50">
                <p>No match found. {result?.reason}</p>
              </div>
            )}
            <button
              onClick={startOver}
              className="flex justify-center bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 mt-4"
            >
              Start Over
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
