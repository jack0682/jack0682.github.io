import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ResearchStatusBanner } from "@/components/research/ResearchStatusBanner";
import { ulrHub } from "@/lib/content";
import { ULR_STATUS } from "@/lib/research-status";
import { ulrCanonLabel, ulrDocStatusLabel } from "@/lib/ulr-labels";

const ULR_HUB_DESCRIPTION =
  "학습된 시스템의 공유·동일성·역할·형성을 묻는 현재 메인 연구 ULR의 Motivation, Canon 24, 수학, 증거와 열린 문제를 정리합니다.";

export const metadata: Metadata = {
  alternates: { canonical: "/ulr/" },
  title: "ULR · Main Research Hub",
  description: ULR_HUB_DESCRIPTION,
  openGraph: {
    url: "/ulr/",
    locale: "ko_KR",
    images: [{ url: "/og/ulr/index.png", width: 1200, height: 630, alt: "Unified Latent Representation · Main research" }],
  },
  twitter: { card: "summary_large_image", images: ["/og/ulr/index.png"] },
};

const READING_ORDER = [
  ["현재 정본과 증거 경계", "/ulr/current-status/"],
  ["왜 ULR인가 — Motivation", "/ulr/motivation/"],
  ["현재 Canon 24 정본", "/ulr/canonical-state/"],
  ["SCC에서 ULR로의 전환", "/ulr/from-scc-to-ulr/"],
  ["Canon 2–24 변천", "/ulr/canon-evolution/"],
  ["전체 수학적 흐름", "/ulr/mathematical-flow/"],
  ["결론과 claim ledger", "/ulr/claim-ledger/"],
] as const;

export default function UlrHubPage() {
  return (
    <Container lang="ko" data-track="ulr">
      <PageHeader
        mark="Ω"
        eyebrow="Main research · ULR"
        title="Unified Latent Representation."
        lead={ULR_HUB_DESCRIPTION}
      />

      <div aria-hidden className="-mt-6 mb-14 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-subtle)]">
        <span className="h-px w-10 bg-[var(--color-accent)]" />
        <span>Sharing · Identity · Role · Formation</span>
      </div>

      <ResearchStatusBanner status={ULR_STATUS} className="-mt-6 mb-12" />

      <div className="mb-14 max-w-[46rem] border-l-2 border-[var(--color-accent)] py-3 pl-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">정본 해석</p>
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
          Canon 24의 결론은 ULR이라는 보편 실체를 발견했다는 뜻이 아닙니다.
          현재 registry에서 추가적인 neural-specific ontology가 필요하다는 증거가
          없다는 <strong className="font-medium text-[var(--color-ink)]">M8 · NO</strong> 판정입니다.
          음성 결과와 철회 이력도 연구의 정식 결과로 공개합니다.
        </p>
      </div>

      <section className="mb-16">
        <p className="sci-eyebrow text-xs text-[var(--color-accent)]">권장 읽기 순서</p>
        <ol className="mt-4 border-y border-[var(--color-rule)] divide-y divide-[var(--color-rule)]">
          {READING_ORDER.map(([label, href], index) => (
            <li key={href}>
              <Link href={href} className="group flex items-baseline gap-4 py-4 text-sm">
                <span className="font-mono text-[11px] text-[var(--color-subtle)]">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-[var(--color-ink)] group-hover:text-[var(--color-accent)]">{label}</span>
                <span aria-hidden className="ml-auto text-[var(--color-subtle)] group-hover:text-[var(--color-accent)]">→</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <DocSection title="현재 상태" description="정본 판정, 권위 순서, 지금 말할 수 있는 것과 말할 수 없는 것." docs={ulrHub.status} />
      <DocSection title="Motivation · 왜 ULR인가" description="창립 직관이 Sharing·Identity·Role·Formation의 검증 의무로 바뀌고, 자기교정과 음성 판정 뒤에도 남은 이유." docs={ulrHub.motivation} />
      <DocSection title="SCC → ULR" description="SCC를 삭제하지 않고 역사층으로 동결한 이유와 보존·중단·재해석의 경계." docs={ulrHub.migration} />
      <DocSection title="Canon과 변천" description="현재 canonical state와 Canon 2–24에서 채택·강등·철회된 주장들의 계보." docs={[...ulrHub.canonical, ...ulrHub.history]} />
      <DocSection title="수학적 흐름" description="observable typing에서 gauge, fiber, assembly, observer role, formation으로 이어지는 전체 논리 spine." docs={ulrHub.mathematics} />
      <DocSection title="실험·결론·ledger" description="M1–M8, empirical atoms, carrier 0/7, active claims와 철회된 composite를 한곳에서 추적합니다." docs={ulrHub.evidence} />
      <DocSection title="Post-canon frontier" description="Canon 24 이후의 작업 증거. 이 층은 명시적으로 비정본이며 Canon 25로 승격되지 않았습니다." docs={ulrHub.frontier} />
      <DocSection title="열린 문제와 재개 관문" description="어떤 결과가 나와야 ontology verdict를 다시 열 수 있는지 사전등록된 조건." docs={ulrHub.openProblems} />

      <div className="mt-20 flex flex-wrap gap-6 border-t border-[var(--color-rule)] pt-8 text-sm">
        <Link href="/research/ulr/" className="text-[var(--color-muted)] hover:text-[var(--color-ink)]">Track overview →</Link>
        <Link href="/scc/" className="text-[var(--color-muted)] hover:text-[var(--color-ink)]">SCC historical archive →</Link>
        <Link href="/onn/" className="text-[var(--color-muted)] hover:text-[var(--color-ink)]">ONN historical archive →</Link>
      </div>
    </Container>
  );
}

type UlrDoc = (typeof ulrHub.status)[number];

function DocSection({ title, description, docs }: { title: string; description: string; docs: UlrDoc[] }) {
  if (docs.length === 0) return null;
  return (
    <section className="mt-16 border-t border-[var(--color-rule)] pt-8">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-8">
        <h2 className="sci-eyebrow text-xs text-[var(--color-accent)]">{title}</h2>
        <p className="max-w-[38rem] text-sm leading-relaxed text-[var(--color-muted)]">{description}</p>
      </div>
      <ul className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
        {docs.map((doc) => (
          <li key={doc.slug}>
            <Link href={doc.permalink} className="group block py-6 sm:py-7">
              <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-subtle)] md:w-48 md:shrink-0">
                  {ulrDocStatusLabel(doc.status)} · {ulrCanonLabel(doc.canon, doc.kind)}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-xl leading-snug text-[var(--color-ink)] group-hover:text-[var(--color-accent)] sm:text-2xl">{doc.title}</h3>
                  {(doc.summary ?? doc.description) && <p className="mt-2 max-w-[46rem] text-sm leading-relaxed text-[var(--color-muted)]">{doc.summary ?? doc.description}</p>}
                </div>
                <span aria-hidden className="hidden text-[var(--color-subtle)] group-hover:text-[var(--color-accent)] md:inline">→</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
