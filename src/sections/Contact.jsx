import React, { useState } from "react";
import ParticlesBackground from "../components/ParticlesBackground";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import Astra from "../assets/Astra.png";

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    idea: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow only numbers for budget
    if (name === "budget" && value && !/^\d+$/.test(value)) return;

    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ["name", "email", "service", "idea"];

    requiredFields.forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = "Fill this field";
      }
    });

    // Email validation
    if (
      formData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email";
    }

    // Budget required if service is not "other"
    if (formData.service && formData.service !== "other" && !formData.budget) {
      newErrors.budget = "Fill this field";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("sending");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          reply_to: formData.email,
          service: formData.service,
          budget: formData.budget,
          idea: formData.idea,
        },
        PUBLIC_KEY
      );

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        service: "",
        budget: "",
        idea: "",
      });

      setTimeout(() => setStatus(""), 3000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
      setTimeout(() => setStatus(""), 3000);
    }
  };

  return (
    <section
      id="contact"
      className="w-full min-h-screen relative bg-black overflow-hidden text-white py-20 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10"
    >
      <ParticlesBackground />

      <div className="relative z-10 w-full flex flex-col md:flex-row items-center gap-10">
        {/* Left Image */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.img
            src={Astra}
            alt="Contact"
            className="w-72 md:w-140 rounded-2xl shadow-lg object-cover"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Right Form */}
        <motion.div
          className="w-full md:w-1/2 bg-white/5 p-8 rounded-2xl border border-white/10"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6">Let's Work Together</h2>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="mb-1 block">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className={`p-3 w-full rounded-md bg-white/10 border text-white focus:outline-none ${
                  errors.name ? "border-red-500" : "border-gray-500"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="mb-1 block">
                Your Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className={`p-3 w-full rounded-md bg-white/10 border text-white focus:outline-none ${
                  errors.email ? "border-red-500" : "border-gray-500"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>

            {/* Service */}
            <div>
              <label className="mb-1 block">
                Service Needed <span className="text-red-500">*</span>
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className={`p-3 w-full rounded-md bg-white/10 border text-white focus:outline-none ${
                  errors.service ? "border-red-500" : "border-gray-500"
                }`}
              >
                <option value="" disabled>
                  Something in mind?
                </option>
                <option value="Web Development" className="text-black">
                  Web Development
                </option>
                <option value="Mobile Application" className="text-black">
                  Mobile Application
                </option>
                <option value="other" className="text-black">
                  Others
                </option>
              </select>
              {errors.service && (
                <p className="text-red-500 text-xs">{errors.service}</p>
              )}
            </div>

            {/* Budget */}
            {formData.service && formData.service !== "other" && (
              <div>
                <label className="mb-1 block">
                  Budget <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="Your Budget"
                  className={`p-3 w-full rounded-md bg-white/10 border text-white focus:outline-none ${
                    errors.budget ? "border-red-500" : "border-gray-500"
                  }`}
                />
                {errors.budget && (
                  <p className="text-red-500 text-xs">{errors.budget}</p>
                )}
              </div>
            )}

            {/* Idea */}
            <div>
              <label className="mb-1 block">
                Explain Your Idea <span className="text-red-500">*</span>
              </label>
              <textarea
                name="idea"
                rows={5}
                value={formData.idea}
                onChange={handleChange}
                placeholder="Enter your idea"
                className={`p-3 w-full rounded-md bg-white/10 border text-white focus:outline-none ${
                  errors.idea ? "border-red-500" : "border-gray-500"
                }`}
              />
              {errors.idea && (
                <p className="text-red-500 text-xs">{errors.idea}</p>
              )}
            </div>

            {/* Status */}
            {status && (
              <p
                className={`text-sm ${
                  status === "success"
                    ? "text-green-400"
                    : status === "error"
                    ? "text-red-400"
                    : "text-yellow-400"
                }`}
              >
                {status === "sending"
                  ? "Sending..."
                  : status === "success"
                  ? "Message sent successfully ✅"
                  : "Something went wrong ❌"}
              </p>
            )}

            {/* Button */}
            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 py-3 rounded-md font-semibold"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
