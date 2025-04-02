import "../../../../assetss/css/main.css"
import "../../../../assetss/css/bootstrap/css/bootstrap.min.css"
import "../../../../assetss/css/bootstrap-icons/bootstrap-icons.css"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const Transform = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqsLeft = [
    {
      id: "faq1",
      question: "How is Alignify different from traditional wireframing tools?",
      answer:
        "Alignify is specifically designed for data visualization and analytics workflows, offering specialized components and templates that traditional wireframing tools lack.",
    },
    {
      id: "faq2",
      question: "Can I collaborate with my team in real-time?",
      answer:
        "Yes, Alignify supports real-time collaboration, allowing team members to work together seamlessly on dashboard mockups.",
    },
    {
      id: "faq3",
      question: "How does Alignify help reduce iteration cycles?",
      answer:
        "By providing clear visual communication tools and templates, Alignify helps teams align on requirements early, reducing the need for multiple revision rounds.",
    },
  ];

  const faqsRight = [
    {
      id: "faq4",
      question: "Can I use Alignify as a freelancer working with clients?",
      answer:
        "Absolutely! Alignify is perfect for freelancers who want to create professional dashboard mockups and collaborate effectively with clients.",
    },
    {
      id: "faq5",
      question: "What kind of templates are available?",
      answer:
        "We offer a wide range of templates for different analytics use cases, including sales dashboards, marketing analytics, and operational metrics.",
    }
  ];
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.classList.toggle("mobile-nav-active", !menuOpen);
  };

  const handleToggle = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".navmenu") && !event.target.closest(".mobile-nav-toggle")) {
        setMenuOpen(false);
        document.body.classList.remove("mobile-nav-active");
      }
    };

    if (menuOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <>
      <header id="header" className="header d-flex align-items-center sticky-top">
        <div className="container-fluid container-xl position-relative d-flex align-items-center">
          <Link to="/" className="logo d-flex align-items-center me-auto">
            <img src="assets/imgs/logo.png" alt="Logo" />
          </Link>
          <nav id="navmenu" className="navmenu">
            <ul>
              <li><a href="#hero" className="active">Home</a></li>
              <li><a href="#features-section">Features</a></li>
              <li><a href="#faq-section">FAQ</a></li>
              <li><a href="#footer">Contact Us</a></li>
              <li><Link to="/auth/signin">Login</Link></li>
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list" onClick={toggleMenu} />
          </nav>
          <Link className="btn-getstarted sub__btn" to="/auth/signup">
            <img src="assets/imgs/mdi_beta.png" style={{ width: 24 }} alt="Join Beta" /> Join Beta
          </Link>
        </div>
      </header>
      <main className="main" style={{ background: "#11052b" }}>
        <section id="hero" className="hero section">
          <div className="container">
            <div className="row gy-4 justify-content-center">
              <div
                className="col-xxl-12 col-xl-8 col-lg-10 text-center"
                data-aos="fade-up"
              >
                <h1>
                  Bring your data <br />
                  product ideas to life
                </h1>
                <p>
                  Create professional dashboard wireframes using advanced visualizations and customizable templates. Perfect for both freelancers working with clients and organizations aligning multiple teams.
                </p>
                <div className="text-center">
                  <Link className="btn-getstarted sub__btn" to="/auth/signup">
                    {" "}
                    <img
                      src="assets/imgs/mdi_beta.png"
                      style={{ width: 24 }}
                    />{" "}
                    Join Beta
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="banner__thumb">
              <img
                src="assets/imgs/topimage.png"
                alt="image not found"
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </section>
        <section className="section" id="features-section">
          <div className="container section-title text-center" data-aos="fade-up">
            <h2>
              Why Choose <br /> Alignify?
            </h2>
            <p>Save time and resources by getting alignment right the first time</p>
          </div>
          <div className="container">
            <div className="row gy-4 mt-4">
              <div className="col-md-6 mb-4" >
                <div className="card p-5" style={{ background: '#1d1236' }}>
                  <div className="icon mb-4">
                    <img src="assets/imgs/icon1.png" />
                  </div>
                  <h4>Interactive Wireframes</h4>
                  <p>
                    Create dynamic dashboard mockups that bring your data stories to life, replacing traditional whiteboards with analytics-focused tools.
                  </p>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="card p-5" style={{ background: '#1d1236' }}>
                  <div className="icon mb-4">
                    <img src="assets/imgs/icon2.png" />
                  </div>
                  <h4>Real-time Collaboration</h4>
                  <p>
                    Enable analysts to focus on deep analysis while business teams easily communicate their desired outcomes.
                  </p>
                </div>
              </div>
              <div className="col-md-12 mb-4">
                <div className="card p-5" style={{ background: '#1d1236' }}>
                  <div className="row" >
                    <div className="col-lg-6" >
                      <div className="icon mb-4">
                        <img src="assets/imgs/icon3.png" />
                      </div>
                      <h4>Rapid Iteration</h4>
                      <p>
                        Eliminate endless feedback loops and reduce misunderstandings with clear visual communication.
                      </p>
                    </div>
                    <div className="col-lg-6">
                      <img
                        src="assets/imgs/image-code.png"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="row gy-4">
              <div className="col-xxl-12 col-xl-12 col-lg-12">
                <div className="text-center bgg-gray">
                  <h1 className="mb-4" style={{ fontSize: "35px" }}>
                    Ready to Transform Your Data <br />
                    Collaboration?
                  </h1>
                  <p>
                    Join teams who are saving countless hours and building stronger relationships through better <br />
                    data visualization alignment
                  </p>
                  <Link className="sub__btn" to="/auth/signup">
                    {" "}
                    <img
                      src="assets/imgs/mdi_beta.png"
                      style={{ width: 24 }}
                    />{" "}
                    Join the Beta
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section" id="faq-section">
          <div className="container section-title text-center" data-aos="fade-up">
            <div className="row gy-4 justify-content-center">
              <div
                className="col-xxl-12 col-xl-8 col-lg-10 text-center"
                data-aos="fade-up"
              >
                <h2>Frequently Asked Questions</h2>
                <p>
                  Everything you need to know about Alignify and how it can help your team
                </p>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="accordion" id="faqAccordionLeft">
                  {faqsLeft.map((faq) => (
                    <div
                      className="accordion-item"
                      key={faq.id}
                      style={{ background: "#1d1236", border: "none" }}
                    >
                      <h2 className="accordion-header">
                        <button
                          className={`accordion-button ${openFAQ === faq.id ? "" : "collapsed"
                            }`}
                          type="button"
                          onClick={() => handleToggle(faq.id)} style={{ background: "#342a4a", color: "white", border: "none", fontSize: "20px" }}
                        >
                          {faq.question}
                          <span />
                        </button>
                      </h2>
                      <div
                        id={faq.id}
                        className={`accordion-collapse  ${openFAQ === faq.id ? "show" : "collapse"
                          }`}
                      >
                        <p
                          style={{ color: "white", fontSize: "20px", padding: "10px" }}
                          className=""
                        >
                          {faq.answer}
                        </p>

                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-md-6">
                <div className="accordion" id="faqAccordionRight">
                  {faqsRight.map((faq) => (
                    <div
                      className="accordion-item"
                      key={faq.id}
                      style={{ background: "#1d1236", border: "none" }}
                    >
                      <h2 className="accordion-header">
                        <button
                          className={`accordion-button ${openFAQ === faq.id ? "" : "collapsed"
                            }`}
                          type="button"
                          onClick={() => handleToggle(faq.id)} style={{ background: "#342a4a", fontSize: "20px", color: "white", border: "none" }}
                        >
                          {faq.question} <span />
                        </button>
                      </h2>
                      <div
                        id={faq.id}
                        className={`accordion-collapse ${openFAQ === faq.id ? "show" : "collapse"
                          }`}
                      >
                        <div className="accordion-body" style={{ color: "white", padding: "10px" }}>{faq.answer}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer id="footer" className="footer pt-120" style={{ background: "#11052b" }}>
        <div className="container footer-top">
          <div className="row">
            <div className="col-lg-12">
              <h3 style={{ color: "white", fontSize: "22px" }}>Contact</h3>
              <div className="footer-contact pt-3" style={{ color: "white" }}>
                <p>Work inquires: work@vaultflow.com</p>
                <p>PR and speaking: press@vaultflow.com</p>
                <p>New business: newbusiness@vaultflow.com</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container copyright footer-top pb-3">
          <div className="row d-flex" style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <div className="footer-contact w-50 col-lg-6" style={{ color: "#666666" }}>
              <p className="pt-3" style={{ padding: "0px 0px 19px 0px" }}>© 2024 Alignify. All Rights Reserved.</p>
            </div>
            <div className="text-right w-50" style={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
              <img src="assets/imgs/logo.png" alt="image bnot found" />
            </div>
          </div>
        </div>
      </footer>
      {/* <a
        href="#"
        id="scroll-top"
        className="d-flex align-items-center justify-content-center"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        Toggle
        <i className="bi bi-arrow-up-short" />
      </a> */}

    </>

  );
};
