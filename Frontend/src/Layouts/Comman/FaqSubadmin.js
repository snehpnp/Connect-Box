import React from "react";
import "./FAQs.css"; // Import CSS file for animation styles
import { faqData } from "./faqData";

const FaqSubadmin = () => {
  const user = JSON.parse(localStorage.getItem("user_details"));

  return (
    <div>
      {user.Role === "SUBADMIN" ? (
        <div>
          <section className="section hero">
            <div
              className="hero-inner"
              data-search-placeholder="Type your question here"
            >
              <h1>FAQ &amp; Help Centre</h1>
            </div>
          </section>

          <h3 style={{ color: "black", marginTop: "3rem", marginLeft: "2rem" }}>
            Frequently Asked Questions
          </h3>
          <div
            className="accordion"
            id="accordionExample"
            style={{ padding: "2rem" }}
          >
             <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                 How long does it take to open an account?
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <strong>This is the first item's accordion body.</strong> It
                  is shown by default, until the collapse plugin adds the
                  appropriate classNamees that we use to style each element.
                  These classNamees control the overall appearance, as well as
                  the showing and hiding via CSS transitions. You can modify any
                  of this with custom CSS or overriding our default variables.
                  It's also worth noting that just about any HTML can go within
                  the <code>.accordion-body</code>, though the transition does
                  limit overflow.
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                Does it cost me anything to open an account?
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <strong>This is the second item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classNamees that we use to style each element.
                  These classNamees control the overall appearance, as well as
                  the showing and hiding via CSS transitions. You can modify any
                  of this with custom CSS or overriding our default variables.
                  It's also worth noting that just about any HTML can go within
                  the <code>.accordion-body</code>, though the transition does
                  limit overflow.
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  What documents are required for opening an account?
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <strong>This is the third item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classNamees that we use to style each element.
                  These classNamees control the overall appearance, as well as
                  the showing and hiding via CSS transitions. You can modify any
                  of this with custom CSS or overriding our default variables.
                  It's also worth noting that just about any HTML can go within
                  the <code>.accordion-body</code>, though the transition does
                  limit overflow.
                </div>
              </div>
            </div>

         
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingFour">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#headingFour"
                  aria-expanded="false"
                  aria-controls="headingFour"
                >
                How do I place my orders?
                </button>
              </h2>
              <div
                id="headingFour"
                className="accordion-collapse collapse"
                aria-labelledby="headingFour"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <strong>This is the third item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classNamees that we use to style each element.
                  These classNamees control the overall appearance, as well as
                  the showing and hiding via CSS transitions. You can modify any
                  of this with custom CSS or overriding our default variables.
                  It's also worth noting that just about any HTML can go within
                  the <code>.accordion-body</code>, though the transition does
                  limit overflow.
                </div>
              </div>
            </div>


            <div className="accordion-item">
              <h2 className="accordion-header" id="headingFive">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#headingFive"
                  aria-expanded="false"
                  aria-controls="headingFive"
                >
                 What are the market timings?
                </button>
              </h2>
              <div
                id="headingFive"
                className="accordion-collapse collapse"
                aria-labelledby="headingFive"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <strong>This is the third item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classNamees that we use to style each element.
                  These classNamees control the overall appearance, as well as
                  the showing and hiding via CSS transitions. You can modify any
                  of this with custom CSS or overriding our default variables.
                  It's also worth noting that just about any HTML can go within
                  the <code>.accordion-body</code>, though the transition does
                  limit overflow.
                </div>
              </div>
            </div>


            <div className="accordion-item">
              <h2 className="accordion-header" id="headingSix">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#headingSix"
                  aria-expanded="false"
                  aria-controls="headingSix"
                >
                 What if I already have a Demat account with another Depository?
                </button>
              </h2>
              <div
                id="headingSix"
                className="accordion-collapse collapse"
                aria-labelledby="headingSix"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <strong>This is the third item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classNamees that we use to style each element.
                  These classNamees control the overall appearance, as well as
                  the showing and hiding via CSS transitions. You can modify any
                  of this with custom CSS or overriding our default variables.
                  It's also worth noting that just about any HTML can go within
                  the <code>.accordion-body</code>, though the transition does
                  limit overflow.
                </div>
              </div>
            </div>


            <div className="accordion-item">
              <h2 className="accordion-header" id="headingSeven">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#headingSeven"
                  aria-expanded="false"
                  aria-controls="headingSeven"
                >
                  How do I manage permissions for users within my Subadmin control?
                </button>
              </h2>
              <div
                id="headingSeven"
                className="accordion-collapse collapse"
                aria-labelledby="headingSeven"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <strong>This is the third item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classNamees that we use to style each element.
                  These classNamees control the overall appearance, as well as
                  the showing and hiding via CSS transitions. You can modify any
                  of this with custom CSS or overriding our default variables.
                  It's also worth noting that just about any HTML can go within
                  the <code>.accordion-body</code>, though the transition does
                  limit overflow.
                </div>
              </div>
            </div>


            <div className="accordion-item">
              <h2 className="accordion-header" id="headingEight">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#headingEight"
                  aria-expanded="false"
                  aria-controls="headingEight"
                >
                 Can Subadmins view activity logs or user activity within their scope?
                </button>
              </h2>
              <div
                id="headingEight"
                className="accordion-collapse collapse"
                aria-labelledby="headingEight"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <strong>This is the third item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classNamees that we use to style each element.
                  These classNamees control the overall appearance, as well as
                  the showing and hiding via CSS transitions. You can modify any
                  of this with custom CSS or overriding our default variables.
                  It's also worth noting that just about any HTML can go within
                  the <code>.accordion-body</code>, though the transition does
                  limit overflow.
                </div>
              </div>
            </div>


            <div className="accordion-item">
              <h2 className="accordion-header" id="headingNine">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#headingNine"
                  aria-expanded="false"
                  aria-controls="headingNine"
                >
                 Can Subadmins view activity logs or user activity within their scope?
                </button>
              </h2>
              <div
                id="headingNine"
                className="accordion-collapse collapse"
                aria-labelledby="headingNine"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <strong>This is the third item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classNamees that we use to style each element.
                  These classNamees control the overall appearance, as well as
                  the showing and hiding via CSS transitions. You can modify any
                  of this with custom CSS or overriding our default variables.
                  It's also worth noting that just about any HTML can go within
                  the <code>.accordion-body</code>, though the transition does
                  limit overflow.
                </div>
              </div>
            </div>

          
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTen">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#headingTen"
                  aria-expanded="false"
                  aria-controls="headingTen"
                >
                  Can Subadmins customize the platform interface or settings for their users?
                </button>
              </h2>
              <div
                id="headingTen"
                className="accordion-collapse collapse"
                aria-labelledby="headingTen"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <strong>This is the third item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classNamees that we use to style each element.
                  These classNamees control the overall appearance, as well as
                  the showing and hiding via CSS transitions. You can modify any
                  of this with custom CSS or overriding our default variables.
                  It's also worth noting that just about any HTML can go within
                  the <code>.accordion-body</code>, though the transition does
                  limit overflow.
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
