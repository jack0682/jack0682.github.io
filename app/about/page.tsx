import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Logo } from "@/components/media/Logo";

/** Uniform render height for every affiliation logo. */
const LOGO_H = 26;

export const metadata: Metadata = {
  title: "About",
  description:
    "About Jaehong Oh — robotics engineer, AI researcher, and mechanical engineer at Soongsil University, currently working on the unification of Soft Cognitive Cohesion and Ontology Neural Networks.",
};

function TimelineItem({
  when,
  heading,
  children,
}: {
  when: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <li className="relative">
      <span
        aria-hidden
        className="absolute -left-[calc(2rem+4px)] top-1.5 block h-2 w-2 bg-[var(--color-accent)] ring-4 ring-[var(--color-bg)]"
      />
      <time className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
        {when}
      </time>
      <h3 className="mt-2 font-display text-xl leading-snug text-[var(--color-ink)]">
        {heading}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
        {children}
      </p>
    </li>
  );
}

export default function AboutPage() {
  return (
    <Container width="prose">
      <PageHeader
        mark="α"
        eyebrow="About"
        title="Jaehong Oh."
        lead="Robotics engineer and AI researcher working at the boundary between the mathematics of perception and the engineering of embodied systems. Currently a Research Intern on the Perception Team at ROBOTIS, and a Mechanical Engineering undergraduate at Soongsil University, Seoul."
      />

      {/* ── affiliations strip ────────────────────────────── */}
      <div className="-mt-6 mb-14">
        <p
          aria-hidden
          className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-subtle)]"
        >
          Affiliations
        </p>
        <ul className="flex flex-wrap items-center gap-y-4">
          <li className="pr-6">
            <Logo
              src="/logos/soongsil.jpg"
              alt="Soongsil University"
              width={1000}
              height={133}
              renderHeight={LOGO_H}
            />
          </li>
          <li
            aria-hidden
            className="pr-6 font-mono text-[10px] text-[var(--color-subtle)]"
          >
            ·
          </li>
          <li className="pr-6">
            <Logo
              src="/logos/robotis_new.png"
              alt="ROBOTIS"
              width={1554}
              height={320}
              renderHeight={LOGO_H}
            />
          </li>
          <li
            aria-hidden
            className="pr-6 font-mono text-[10px] text-[var(--color-subtle)]"
          >
            ·
          </li>
          <li>
            <Logo
              src="/logos/doosan-robotics.svg"
              alt="Doosan Robotics"
              width={127}
              height={18}
              renderHeight={LOGO_H}
            />
          </li>
        </ul>

        {/* multilingual bio pointer */}
        <p className="mt-8 text-sm text-[var(--color-muted)]">
          Also available in other languages —{" "}
          <Link
            href="/bio/"
            className="group inline-flex items-center gap-1 border-b border-[var(--color-accent)]/40 text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            한국어 · 日本語 · Deutsch · 中文
            <span
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        </p>
      </div>

      {/* ── what I'm working on ───────────────────────────── */}
      <section className="border-t border-[var(--color-rule)] pt-10">
        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[var(--color-subtle)]">
          What I'm working on
        </p>
        <p className="text-lg leading-relaxed text-[var(--color-ink)]/90">
          The ultimate target of the work is a single{" "}
          <Link
            href="/notes/part-0/integrated-architecture/"
            className="text-[var(--color-accent)] underline decoration-[var(--color-accent)]/30 underline-offset-[3px] transition hover:decoration-[var(--color-accent)]"
          >
            cognitive-reasoning architecture
          </Link>{" "}
          that unifies Soft Cognitive Cohesion (SCC) and Ontology Neural
          Networks (ONN). The ONN + ORTSF framework paper — the first
          formal statement of the ONN half — was{" "}
          <Link
            href="/papers/onn-ortsf-2026/"
            className="text-[var(--color-accent)] underline decoration-[var(--color-accent)]/30 underline-offset-[3px] transition hover:decoration-[var(--color-accent)]"
          >
            accepted at <em>Int. J. Topol.</em>
          </Link>{" "}
          in April 2026. SCC is the thread I am currently most active on;
          its current state is tracked in the{" "}
          <Link
            href="/notes/part-0/scc-status-2026-04/"
            className="text-[var(--color-accent)] underline decoration-[var(--color-accent)]/30 underline-offset-[3px] transition hover:decoration-[var(--color-accent)]"
          >
            SCC status page
          </Link>
          .
        </p>
      </section>

      {/* ── education ─────────────────────────────────────── */}
      <section className="mt-16 border-t border-[var(--color-rule)] pt-10">
        <p className="mb-6 text-xs uppercase tracking-[0.22em] text-[var(--color-subtle)]">
          Education
        </p>
        <div className="grid grid-cols-1 items-baseline gap-x-6 gap-y-1 md:grid-cols-[8rem_1fr] md:gap-y-2">
          <time className="font-mono text-xs text-[var(--color-subtle)]">
            2019 – present
          </time>
          <div>
            <h3 className="font-display text-xl text-[var(--color-ink)]">
              Soongsil University · Seoul
            </h3>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              B.S. in Mechanical Engineering — focus on Robotics, AI/ML,
              and Control Systems. Active member of the Fluid Mechanics
              Laboratory and the Intelligent Robotics Laboratory.
            </p>
          </div>
        </div>
      </section>

      {/* ── research experience ───────────────────────────── */}
      <section className="mt-16 border-t border-[var(--color-rule)] pt-10">
        <p className="mb-8 text-xs uppercase tracking-[0.22em] text-[var(--color-subtle)]">
          Research experience
        </p>
        <ol className="relative ml-3 space-y-10 border-l border-[var(--color-rule)] pl-8">
          <TimelineItem
            when="2026 – present"
            heading="Research Intern · ROBOTIS (Perception Team)"
          >
            End-to-end autonomous-driving research. Developing and
            evaluating perception pipelines for autonomous navigation
            systems.
          </TimelineItem>
          <TimelineItem
            when="2024 – 2026"
            heading="Research Team Leader · Intelligent Robotics Lab, Soongsil"
          >
            Led a reinforcement-learning-based <em>Hidden Object Finding</em>{" "}
            project on a robot manipulator — novel algorithms for object
            discovery in occluded environments, integrating vision,
            tactile feedback, and predictive reasoning under PyTorch and
            ROS 2.
          </TimelineItem>
          <TimelineItem
            when="2022 – 2023"
            heading="Project Team Leader · Fluid Mechanics Lab, Soongsil"
          >
            Led a Janus-particle synthesis project for bio-pharmaceutical
            applications. Electrohydrodynamics (EHD) research with
            3D-printed Y-shaped microfluidic channels, combined with CFD
            simulation and experimental validation.
          </TimelineItem>
          <TimelineItem
            when="2022 – 2023"
            heading="Development Team Leader · Aviation Society Cheonggeumbi"
          >
            End-to-end development of a 4-axis autonomous flight drone —
            custom CAD frame (AutoCAD, SolidWorks), PID control, sensor
            fusion, and a cross-functional mechanical / electrical /
            software team.
          </TimelineItem>
        </ol>
      </section>

      {/* ── selected publications ─────────────────────────── */}
      <section className="mt-16 border-t border-[var(--color-rule)] pt-10">
        <div className="mb-6 flex items-baseline justify-between">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-subtle)]">
            Selected publications
          </p>
          <Link
            href="/papers/"
            className="text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)]"
          >
            All papers →
          </Link>
        </div>
        <ul className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
          <li className="py-5">
            <Link
              href="/papers/onn-ortsf-2026/"
              className="group block"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent)]">
                Accepted · <em>Int. J. Topol.</em> · 2026
              </p>
              <p className="mt-1.5 font-display text-lg leading-snug text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]">
                Ontology Neural Network and ORTSF: A Framework for
                Topological Reasoning and Delay-Robust Control
              </p>
            </Link>
          </li>
          <li className="py-5">
            <Link
              href="/papers/soma-cube-assembly-dqn/"
              className="group block"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent)]">
                Preprint · arXiv:2508.21272 · 2025
              </p>
              <p className="mt-1.5 font-display text-lg leading-snug text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]">
                Learning to Assemble the Soma Cube with Legal-Action
                Masked DQN and Safe ZYZ Regrasp on a Doosan M0609
              </p>
            </Link>
          </li>
          <li className="py-5">
            <Link
              href="/papers/cognitive-collaborative-robots/"
              className="group block"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent)]">
                Preprint · arXiv:2505.03815 · 2025
              </p>
              <p className="mt-1.5 font-display text-lg leading-snug text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]">
                Towards Cognitive Collaborative Robots: Semantic-Level
                Integration and Explainable Control for Human-Centric
                Cooperation
              </p>
            </Link>
          </li>
        </ul>
      </section>

      {/* ── other projects ────────────────────────────────── */}
      <section className="mt-16 border-t border-[var(--color-rule)] pt-10">
        <p className="mb-6 text-xs uppercase tracking-[0.22em] text-[var(--color-subtle)]">
          Other selected projects
        </p>
        <ul className="space-y-7">
          <li>
            <p className="font-display text-lg text-[var(--color-ink)]">
              Industrial Safety Monitoring System{" "}
              <span className="font-sans text-sm text-[var(--color-muted)]">
                · TurtleBot3 + YOLOv5 · 2024
              </span>
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">
              Autonomous patrol robot for real-time detection of helmets,
              safety vests, and protective eyewear. SLAM-based navigation
              with dynamic obstacle avoidance (LiDAR + RGB-D); ≥ 95 %
              detection accuracy; MQTT-based real-time alerting.
            </p>
          </li>
          <li>
            <p className="font-display text-lg text-[var(--color-ink)]">
              Precision Liquid Injection Control System{" "}
              <span className="font-sans text-sm text-[var(--color-muted)]">
                · Fluid Mechanics Lab · 2023
              </span>
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">
              High-precision concentration control for bio-pharmaceutical
              applications. Load-cell mass measurement with Extended Kalman
              Filter (0.1 g precision), ROS 2 multi-threaded sensor /
              control / UI pipeline, modified-Bernoulli feedback for 0.5 %
              accuracy in target concentration.
            </p>
          </li>
          <li>
            <p className="font-display text-lg text-[var(--color-ink)]">
              RL-based Soma Cube Assembly{" "}
              <span className="font-sans text-sm text-[var(--color-muted)]">
                · Doosan M0609 · 2024
              </span>
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">
              The hardware companion to the published Soma-cube paper —
              Legal-Action Masking (4,536 → 2,484 actions, 26 %
              efficiency), ZYZ singularity avoidance (54 % → 96.1 %
              success), 91 % sim-to-real transfer via Unity domain
              randomisation.
            </p>
          </li>
        </ul>
      </section>

      {/* ── technical skills ──────────────────────────────── */}
      <section className="mt-16 border-t border-[var(--color-rule)] pt-10">
        <p className="mb-6 text-xs uppercase tracking-[0.22em] text-[var(--color-subtle)]">
          Technical
        </p>
        <dl className="grid grid-cols-1 gap-x-6 gap-y-4 text-sm sm:grid-cols-[9rem_1fr] sm:gap-y-5">
          <dt className="font-medium text-[var(--color-ink)]">
            Robotics & control
          </dt>
          <dd className="text-[var(--color-muted)]">
            ROS 2 · robot manipulation · autonomous systems · SLAM · PID ·
            sensor fusion
          </dd>

          <dt className="font-medium text-[var(--color-ink)]">
            AI & ML
          </dt>
          <dd className="text-[var(--color-muted)]">
            PyTorch · TensorFlow · reinforcement learning · computer
            vision · YOLOv5 · deep learning
          </dd>

          <dt className="font-medium text-[var(--color-ink)]">
            Languages
          </dt>
          <dd className="text-[var(--color-muted)]">
            Python · C++ · MATLAB · Git · Linux
          </dd>

          <dt className="font-medium text-[var(--color-ink)]">
            CAD & mechanical
          </dt>
          <dd className="text-[var(--color-muted)]">
            AutoCAD · SolidWorks · Autodesk Inventor · 3D printing · CFD
          </dd>

          <dt className="font-medium text-[var(--color-ink)]">
            Tools
          </dt>
          <dd className="text-[var(--color-muted)]">
            Unity · MQTT · WebSocket · Docker · Intel RealSense · Arduino ·
            Raspberry Pi
          </dd>
        </dl>
      </section>

      {/* ── certifications ─────────────────────────────────── */}
      <section className="mt-16 border-t border-[var(--color-rule)] pt-10">
        <p className="mb-6 text-xs uppercase tracking-[0.22em] text-[var(--color-subtle)]">
          Certifications
        </p>
        <ul className="space-y-3 text-sm text-[var(--color-muted)]">
          <li>
            <span className="text-[var(--color-ink)]">
              CAT (Certified Associate in Technology) Level 1
            </span>{" "}
            — Korea Productivity Center, Aug 2024
          </li>
          <li>
            <span className="text-[var(--color-ink)]">
              Doosan Robotics Bootcamp
            </span>{" "}
            — Doosan Robotics, 2024
          </li>
        </ul>
      </section>

      {/* ── contact ───────────────────────────────────────── */}
      <section className="mt-16 border-t border-[var(--color-rule)] pt-10">
        <p className="mb-6 text-xs uppercase tracking-[0.22em] text-[var(--color-subtle)]">
          Contact
        </p>
        <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm sm:grid-cols-[6rem_1fr] sm:gap-y-2">
          <dt className="text-[var(--color-muted)]">Email</dt>
          <dd>
            <a
              href="mailto:jack0682@naver.com"
              className="font-mono text-[var(--color-ink)] hover:text-[var(--color-accent)]"
            >
              jack0682@naver.com
            </a>
          </dd>
          <dt className="text-[var(--color-muted)]">GitHub</dt>
          <dd>
            <a
              href="https://github.com/jack0682"
              className="font-mono text-[var(--color-ink)] hover:text-[var(--color-accent)]"
            >
              github.com/jack0682
            </a>
          </dd>
          <dt className="text-[var(--color-muted)]">Location</dt>
          <dd className="text-[var(--color-ink)]">Seoul, South Korea</dd>
        </dl>
      </section>
    </Container>
  );
}
