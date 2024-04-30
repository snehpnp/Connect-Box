import React, { useEffect, useState } from "react";
import "./FAQs.css"; // Import CSS file for animation styles
import { faqData } from "./faqData";


const FaqSubadmin = () => {
  const user = JSON.parse(localStorage.getItem("user_details"));

  const [activeIndex, setActiveIndex] = useState(null);
  const [snakePosition, setSnakePosition] = useState({ x: 0, y: 0 });


  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  const handleMouseMove = (e) => {
    setSnakePosition({ x: e.clientX + 20, y: e.clientY - 20 });
  };

  return (
    <div>
      {user.Role === "SUBADMIN" ? (
        <div className="" onMouseMove={handleMouseMove}>
        <div className="content container-fluid" data-aos="fade-left">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="fas fa-question-circle pe-2"></i>Frequently Asked
                Questions
              </h5>
            </div>
  
            <div className="card-body">
              <div className="row">
                <div className="col-sm-4">
                  <img src="/assets/img/gif/FAQ.png" className="faq-img" />
                </div>
  
                <div className="col-sm-8">
                  {faqData.map((faq, index) => (
                    <div className="faq-item" key={index}>
                      <div
                        className={`question ${
                          activeIndex === index ? "active" : ""
                        }`}
                        onClick={() => toggleAccordion(index)}
                      >
                        <span className="question-text">{faq.question}</span>
                        <span className="icon">
                          {activeIndex === index ? "-  " : "+"}
                        </span>
                      </div>
                      <div
                        className={`answer ${
                          activeIndex === index ? "show" : ""
                        }`}
                      >
                        <p>
                          <b>{faq.answer}</b>
                        </p>
                        <a href={faq.link}>Learn More</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default FaqSubadmin;
