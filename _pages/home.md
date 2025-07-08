---
layout: splash
title: "Oh Jaehong | Cognitive Robotics Researcher"
permalink: /
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /assets/images/csa_hero.png
  actions:
    - label: "View Research"
      url: "/research/"
      class: "btn--light-outline btn--large"
    - label: "Download CV"
      url: "/assets/docs/cv.pdf"
      class: "btn--light-outline btn--large"
  caption: "*Building the future of human-robot collaboration*"

excerpt: >
  **Pioneering Cognitive Synergy Architecture (CSA) & Ontology Neural Network (ONN)**  
  <br/>Where semantic perception meets explainable intelligence — creating robots that don't just compute, but **comprehend, collaborate, and co-evolve** with humans.

intro:
  - excerpt: >
      **Oh Jaehong** is a cognitive robotics researcher at the forefront of human-centric AI,  
      developing frameworks where machines transcend mere automation to become **thinking partners**.

feature_row:
  - image_path: /assets/images/csa_thumb.png
    alt: "Cognitive Synergy Architecture"
    title: "Cognitive Synergy Architecture"
    url: "/csa/"
    btn_label: "Explore CSA"
    btn_class: "btn--primary btn--large"
    
  - image_path: /assets/images/onn_thumb.png
    alt: "Ontology Neural Network"
    title: "Ontology Neural Network"
    url: "/onn/"
    btn_label: "Discover ONN"
    btn_class: "btn--primary btn--large"
    
  - image_path: /assets/images/philosophy_thumb.png
    alt: "Research Philosophy"
    title: "Research Philosophy"
    url: "/about/"
    btn_label: "Read Manifesto"
    btn_class: "btn--info btn--large"

research_highlights:
  - title: "🎯 Current Research Focus"
    excerpt: >
      **Advanced Cognitive Control Systems**  
      <br/><br/>
      • **IMAGO α Development**: PPO-based adaptive control with natural language intent parsing  
      • **LOGOS Integration**: Real-time ontological validation with OWL 2 DL reasoning  
      • **Multi-Robot Synchronization**: Shared semantic memory across robotic teams  
      • **Real-World Deployment**: CSA implementation on Franka Emika Panda systems

  - title: "📊 Technical Achievements"
    excerpt: >
      **Demonstrated Performance Metrics**  
      <br/><br/>
      • **15Hz Real-time** semantic scene graph construction  
      • **94% Object Identity** persistence across temporal sequences  
      • **<5cm Localization** accuracy with ORB-SLAM2 integration  
      • **89% Goal Completion** rate with explainable decision traces

  - title: "🏆 Recognition & Impact"
    excerpt: >
      **Publications & Training**  
      <br/><br/>
      • **3 arXiv Publications** on cognitive robotics architectures  
      • **Doosan Robotics** Advanced AI Training Program (2025)  
      • **International Experience** — 6 months research in Germany  
      • **Open Source Contributions** — Active GitHub developer

publication_row:
  - title: "📚 Key Publications"
    excerpt: >
      **Foundational Research Papers**  
      <br/><br/>
      
      🔬 [**"Towards Cognitive Collaborative Robots: Semantic-Level Integration and Explainable Control for Human-Centric Cooperation"**](https://arxiv.org/abs/2505.03815)  
      *arXiv:2505.03815* — Comprehensive framework for human-robot collaboration  
      <br/><br/>
      
      🧠 [**"Cognitive Synergy Architecture: SEGO for Human-Centric Collaborative Robots"**](https://arxiv.org/abs/2506.13149)  
      *arXiv:2506.13149* — Semantic mapping and scene graph construction  
      <br/><br/>
      
      🌐 [**"Ontology Neural Network and ORTSF: A Framework for Topological Reasoning and Delay-Robust Control"**](https://arxiv.org/abs/2506.19277)  
      *arXiv:2506.19277* — Topological reasoning for robust cognitive control

contact_cta:
  - title: "🤝 Collaboration & Contact"
    excerpt: >
      **Open to Research Collaboration**  
      <br/><br/>
      Interested in cognitive robotics, explainable AI, or human-robot interaction?  
      Let's discuss how CSA and ONN can advance your research or industrial applications.  
      <br/><br/>
      📧 **Email**: [jaehongoh1554@gmail.com](mailto:jaehongoh1554@gmail.com)  
      🐱 **GitHub**: [jack0682](https://github.com/jack0682)  
      🎓 **Institution**: Soongsil University, Mechanical Engineering  
      🏢 **Training**: Doosan Robotics AI Program

---

{% include feature_row id="intro" type="left" %}

<div class="main-features-section">
  {% include feature_row %}
</div>

<div class="research-section">
  {% include feature_row id="research_highlights" %}
</div>

<div class="publications-section">
  {% include feature_row id="publication_row" type="left" %}
</div>

<div class="contact-section">
  {% include feature_row id="contact_cta" type="left" %}
</div>

<style>
/* Header title styling - make it bold and visible */
.page__hero--overlay .page__title {
  font-size: 2.4em;
  font-weight: 600 !important;
  margin-bottom: 0.3em;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.6);
  line-height: 1.2;
}

.page__hero--overlay .page__lead {
  font-size: 1.1em;
  line-height: 1.5;
  max-width: none;
  margin: 0 auto 2.5em;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

/* Layout improvements - add more spacing */
.main-features-section {
  padding: 60px 0;
  background-color: #ffffff;
}

.research-section {
  padding: 60px 0;
  background-color: #f8f9fa;
}

.publications-section {
  padding: 60px 0;
  background-color: #ffffff;
}

.contact-section {
  padding: 60px 0;
  background-color: #f8f9fa;
}

/* Feature row styling - cleaner card design */
.feature__wrapper {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2em;
}

.feature__item {
  margin-bottom: 2em;
  padding: 0 0.8em;
}

.feature__item .archive__item {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;
}

.feature__item .archive__item:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.12);
}

/* Image styling - uniform size */
.feature__item .archive__item-teaser {
  height: 200px;
  overflow: hidden;
  position: relative;
}

.feature__item .archive__item-teaser img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.feature__item .archive__item-teaser:hover img {
  transform: scale(1.05);
}

/* Title and button only in cards */
.feature__item .archive__item-body {
  padding: 1.5em 1.5em;
  text-align: center;
}

.feature__item .archive__item-title {
  font-size: 1.2em;
  margin-bottom: 1em;
  color: #2c3e50;
  font-weight: 600;
  line-height: 1.3;
}

.feature__item .archive__item-excerpt {
  display: none; /* Hide content excerpts for cleaner look */
}

/* Button styling */
.btn--large {
  padding: 8px 20px;
  font-size: 0.9em;
  font-weight: 500;
  text-transform: none;
  border-radius: 6px;
  transition: all 0.3s ease;
  border: none;
  text-decoration: none;
}

.btn--primary {
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
}

.btn--primary:hover {
  background: linear-gradient(135deg, #2980b9 0%, #1f639a 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(52, 152, 219, 0.3);
  color: white;
}

.btn--info {
  background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%);
  color: white;
}

.btn--info:hover {
  background: linear-gradient(135deg, #8e44ad 0%, #7d3c98 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(155, 89, 182, 0.3);
  color: white;
}

/* Left-aligned content sections */
.feature__item--left .archive__item-body {
  text-align: left;
  padding: 2em 1.5em;
}

.feature__item--left .archive__item-title {
  font-size: 1.6em;
  margin-bottom: 0.8em;
  color: #2c3e50;
  font-weight: 600;
}

.feature__item--left .archive__item-excerpt {
  display: block;
  font-size: 0.95em;
  line-height: 1.6;
  color: #5a6c7d;
  max-width: none;
}

/* Content wrapper for better spacing */
.feature__wrapper--left {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 3em;
}

/* Responsive design */
@media (max-width: 1024px) {
  .page__hero--overlay .page__title {
    font-size: 2.2em;
  }
  
  .feature__wrapper,
  .feature__wrapper--left {
    padding: 0 1.5em;
  }
  
  .main-features-section,
  .research-section,
  .publications-section,
  .contact-section {
    padding: 50px 0;
  }
}

@media (max-width: 768px) {
  .page__hero--overlay .page__title {
    font-size: 1.9em;
  }
  
  .page__hero--overlay .page__lead {
    font-size: 1em;
  }
  
  .feature__item .archive__item-teaser {
    height: 180px;
  }
  
  .feature__item .archive__item-body {
    padding: 1.2em 1.2em;
  }
  
  .feature__item .archive__item-title {
    font-size: 1.1em;
  }
  
  .feature__item--left .archive__item-title {
    font-size: 1.4em;
  }
  
  .btn--large {
    padding: 8px 16px;
    font-size: 0.85em;
  }
  
  .main-features-section,
  .research-section,
  .publications-section,
  .contact-section {
    padding: 40px 0;
  }
  
  .feature__wrapper,
  .feature__wrapper--left {
    padding: 0 1em;
  }
}

@media (max-width: 480px) {
  .page__hero--overlay .page__title {
    font-size: 1.8em;
  }
  
  .feature__item .archive__item-body {
    padding: 1.5em 1em;
  }
  
  .feature__item--left .archive__item-body {
    padding: 2em 1em;
  }
}

/* Remove center alignment for better flow */
.feature__item--center {
  text-align: left;
}

.feature__item--center .archive__item-body {
  text-align: left;
  max-width: none;
}

/* Ensure proper spacing between sections */
body {
  line-height: 1.7;
}

.wrapper {
  max-width: 1400px;
  padding: 0 2em;
}
</style>