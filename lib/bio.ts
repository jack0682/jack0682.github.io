/** English-only biography content. */

export const BIO_LOCALES = ["en"] as const;
export type BioLocale = (typeof BIO_LOCALES)[number];

export type BioContent = {
  label: string;
  langTag: string;
  heading: string;
  paragraphs: string[];
};

export const BIO: Record<BioLocale, BioContent> = {
  en: {
    label: "English",
    langTag: "en",
    heading: "About me",
    paragraphs: [
      "I'm Jaehong Oh — a robotics software engineer and research intern on the ROBOTIS Perception Team, studying Mechanical Engineering at Soongsil University in Seoul. My work sits at the intersection of hardware and a question that engineering alone doesn't close: not just what systems can do, but what they can know — about their state, their environment, the gap between a model and what it models. That question came to me before I wrote a line of code, through sustained attention in a very different medium, where the only verification is whether what you wrote actually says what you think. The question that kept surfacing: what persists when something cannot fully observe itself? I haven't answered it, but it has organised almost everything I've built since. Like the hollow inside a ring — not empty space, but the structure that makes the ring what it is.",

      "Three projects mark the progression. TurtleBot4 was a seven-person industrial safety monitoring system — real-time detection, 4D state estimation tracking from position through jerk, MQTT-coordinated robot fleet — 92.3% accuracy at 350ms end-to-end. Soma Cube applied reinforcement learning to robotic assembly: a Masked DQN with legal-action masking, converging from a 54% baseline to 96.1% success over 105,300 episodes. The structural insight was that collision avoidance has to be built into the action space — you can't fine a system out of a configuration it was never prevented from entering. ONN began as a topology-aware representation and control programme. Its later audit resolved the central higher-order claim to a scoped No-Go: under a complete-pairwise observation contract, the proposed cohomological readouts add no information beyond pairwise data. What survived is a modest direction-channel signal, a single-mode additive scalar contraction result (ρ + |K_c| < 1), and an analytical method for testing representational claims; coupled multimode and system-level certification remain open. Each project asked the same question in a different language.",

      "My current main theoretical programme is Unified Latent Representation (ULR): a study of what learned systems genuinely share, when representations are identical under typed gauges, how learning differs from inference for an observer, and when organisation forms. Canon 24 reaches a disciplined negative result — no additional neural-specific ULR ontology is established in the current registry — while keeping the programme active as a framework for stronger tests. Soft Cognitive Cohesion and Ontology Neural Networks are preserved as historical predecessors: their surviving mathematics remains public, but their unresolved couplings are not carried forward as facts. The work now is to keep both structure and the boundaries of its evidence visible.",

      "Hardware and simulation are intervention surfaces for theory. An oscillation or failed grasp generates candidate explanations, not a diagnosis: topology, representation geometry, control-state error, routing, sensing, and optimisation must be compared under typed contracts. I accept a structural explanation only when it beats declared control, state-space, predictive, causal, and routing baselines on held-out behaviour. The goal is therefore to build instrumentation that types representations, interventions, physical ports, and outputs so every claim can be falsified. Theory and hardware still constrain each other; evidence decides which arrow survives.",
    ],
  },
};
