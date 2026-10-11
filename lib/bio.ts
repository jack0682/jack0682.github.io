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
      "I'm Jaehong Oh, a robotics engineer, RX Product Owner at ROBOTIS AI, and independent researcher. I completed my B.S. in Mechanical Engineering at Soongsil University in August 2026. My professional work concerns industrial machine-tending automation, from problem definition and architecture to delivery and the evidence needed to judge an outcome.",

      "My public engineering work includes a merged contribution to ROBOTIS AntBot navigation and first-author joint research on constrained Soma Cube assembly. RobotTransformation is a separate personal project: a simulation source preview for authoring and inspecting heterogeneous robot workflows. Its October 2026 release has unresolved verification failures and is not qualified for physical deployment or available as an installable product.",

      "My main theoretical programme, Unified Latent Representation (ULR), asks what learned systems share, when representations count as identical, how an observer can distinguish learning from inference, and when organisation forms. Canon 24 still records no additional neural-specific ULR ontology in the declared registry. The October work sharpens a connected question: what does training form, how does it constrain responses, and what can observations identify? Mathematical identifiability and exact certificates are part of this inquiry; local calculations do not by themselves establish global uniqueness.",

      "A newer inquiry asks how a difference becomes relevant to a system, and when relevance becomes evaluation, without assuming purpose or experience at the outset. This remains an open conceptual question. Selection, functional relevance, regulation, and felt importance are not interchangeable, and successful behavior alone does not establish an internal process of understanding.",

      "I keep research history and changes in claim status visible. SCC and ONN remain historical programmes; the published ONN and ORTSF article is part of the record, while later audits narrow its claims. Across theory and engineering, I want an explanation to say what it predicts, what would refute it, and where the evidence stops.",
    ],
  },
};
