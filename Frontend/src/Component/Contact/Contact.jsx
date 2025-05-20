import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [status, setStatus] = useState(null); // To show success or error message

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //   Handle from submission

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:7000/api/v2/contact", {
        method: "Post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
       console.log(response)
      
      const data = await response.json();
      console.log("Response JSON:", data); // Debugging line

      if (response.ok) {
        setStatus({
          type: "success",
          message: "message sent successfully",
        });

        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({
          type: "error",
          message: data.error || "something went wrong",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Faild to submit. Try again later",
      });
    }
    // Clear the message after 5 seconds
    setTimeout(() => setStatus(null), 5000);
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      {status && (
        <p className={status.type === "success" ? "success-msg" : "error-msg"}>
          {status.message}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
