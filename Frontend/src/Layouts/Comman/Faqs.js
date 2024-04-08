import React, { useState } from 'react';
import './FAQs.css'; // Import CSS file for animation styles
import { faqData } from './faqData';

const FAQs = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [snakePosition, setSnakePosition] = useState({ x: 0, y: 0 });

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleMouseMove = (e) => {
        setSnakePosition({ x: e.clientX + 20, y: e.clientY - 20 });
    };

    return (
        <div className="" onMouseMove={handleMouseMove}>


            <div className="content container-fluid">


                <div className='card-body'>


                    <div className="row">

                        <div className="col">

                            <img src="/assets/img/gif/FAQ.png" />

                        </div>

                        <div className="col">

                            {faqData.map((faq, index) => (
                                <div className="faq-item" key={index}>
                                    <div className={`question ${activeIndex === index ? 'active' : ''}`} onClick={() => toggleAccordion(index)}>
                                        <span className="question-text">{faq.question}</span>
                                        <span className="icon">{activeIndex === index ? '-' : '+'}</span>
                                    </div>
                                    <div className={`answer ${activeIndex === index ? 'show' : ''}`}>
                                        <p><b>{faq.answer}</b></p>
                                        <a href={faq.link}>Learn More</a>
                                    </div>
                                </div>
                            ))}

                        </div>



                    </div>

                </div>

            </div>

        </div>
    );
};

export default FAQs;
