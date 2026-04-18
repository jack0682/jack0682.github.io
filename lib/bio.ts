/**
 * Multilingual bio. Five languages sharing the same structure so the
 * toggle can swap them without layout shift. Each record carries a
 * native-script label (for the selector) plus the paragraphs that
 * make up the essay.
 *
 * Content is written in an expanded, technically grounded register:
 * identity → theoretical programme (SCC) → computational programme
 * (ONN + ORTSF) → unification goal + working methodology. Edit freely.
 */

export const BIO_LOCALES = ["en", "ko", "ja", "de", "zh"] as const;
export type BioLocale = (typeof BIO_LOCALES)[number];

export type BioContent = {
  /** Label shown in the language selector, in native script */
  label: string;
  /** BCP-47 language tag for the `lang` attribute */
  langTag: string;
  /** Page-level heading shown above the paragraphs */
  heading: string;
  /** Four-paragraph body */
  paragraphs: string[];
};

export const BIO: Record<BioLocale, BioContent> = {
  en: {
    label: "English",
    langTag: "en",
    heading: "About me",
    paragraphs: [
      "I'm Jaehong Oh, a robotics engineer and AI researcher whose work sits at the boundary between the mathematics of perception and the engineering of embodied systems. I'm currently a Research Intern on the Perception Team at ROBOTIS, contributing to end-to-end autonomous-driving perception pipelines, and a Mechanical Engineering undergraduate at Soongsil University in Seoul, active in the Intelligent Robotics Laboratory.",
      "My theoretical programme is Soft Cognitive Cohesion (SCC) — an axiomatic framework that treats existence as a gauge-invariant topological invariant of relational structure. Grounded in graph theory and gauge theory, SCC defines relations as edges carrying both scalar weights and group-valued transitions; identifies natural aggregates (\"fruits\") via spectral clustering; locates boundary singularities (\"doors\") at anomalous external contacts; and derives a gauge-invariant existence signature from the optimal gauge class, the door locus, and the residual energy. The three cohomological readouts — intrinsic, relative, and multi-scale persistent — are linked by a long exact sequence and are computable through finite-dimensional linear algebra.",
      "The computational half is Ontology Neural Networks (ONN) with ORTSF control — topology-preserving representations learned under projection-consensus operators and contextual constraints, coupled with Ontological Real-Time State Feedback for delay-robust control on top. The framework paper, accepted at Int. J. Topol. in 2026, together with follow-up empirical work, shows that strategic regimes can reach 99.75% of the theoretically predicted optimality bound, with counter-intuitive findings — minimal connectivity (k = 2), extreme surgery-decay precision (δ = 0.0005) — outperforming denser, coarser configurations. The same operators transfer naturally to transformer and graph-neural-network architectures, with measurable perplexity and convergence gains.",
      "Both threads converge on a single horizon: a cognitive-reasoning architecture for autonomous systems that carries explicit ontological structure through every layer — from raw perception, through learned latent representations, down to delay-robust embodied control. My workbench reflects this — I prototype on robot manipulators (Doosan M0609) and autonomous-navigation platforms (TurtleBot3 under ROS 2), prove what can be proven, and document the rest in this journal. The problems I find most worth pursuing are those where a clean topological or cohomological statement forces a concrete engineering consequence — and where the engineering, in turn, demands a new mathematical object.",
    ],
  },

  ko: {
    label: "한국어",
    langTag: "ko",
    heading: "자기소개",
    paragraphs: [
      "저는 오재홍입니다. 지각의 수학과 체현 시스템의 공학 사이의 경계에서 연구하는 로보틱스 엔지니어이자 AI 연구자입니다. 현재 ROBOTIS Perception 팀의 연구 인턴으로 엔드투엔드 자율주행 지각 파이프라인을 다루고 있으며, 숭실대학교 기계공학과 학부생으로 지능로봇 연구실(Intelligent Robotics Laboratory)에 속해 있습니다.",
      "제 이론적 연구 프로그램은 Soft Cognitive Cohesion (SCC)입니다. 관계 구조의 게이지-불변(gauge-invariant) 위상 불변량으로 \"존재\"를 다루는 공리적 프레임워크입니다. 그래프 이론과 게이지 이론에 뿌리를 두고, SCC는 관계를 스칼라 가중치와 군-값 전이를 함께 나르는 엣지로 정의하며, 자연 집합체(\"fruits\")를 스펙트럼 클러스터링으로 식별하고, 경계 특이점(\"doors\")을 이상적 외부 접촉 지점으로 정위합니다. 최적 게이지 클래스, door 위치, 잔여 에너지로부터 게이지-불변한 존재 서명(existence signature)을 유도하며, 세 가지 코호몰로지 판독 — 내재적, 상대적, 다중-스케일 지속적 — 이 긴 완전열(long exact sequence)로 연결되고, 유한 차원 선형대수로 계산 가능합니다.",
      "계산적 축은 Ontology Neural Networks (ONN)과 ORTSF 제어입니다. 투영-합의(projection-consensus) 연산자와 맥락 제약 하에 학습되는 위상-보존 표현에, 그 위에서 지연-강인한 제어를 수행하는 Ontological Real-Time State Feedback이 결합됩니다. 2026년 Int. J. Topol.에 게재 승인된 프레임워크 논문과 후속 실증 연구는, 전략적 구성이 이론적으로 예측된 최적성 한계의 99.75%에 도달함을 보였으며 — 최소 연결도(k = 2), 극도의 surgery-decay 정밀도(δ = 0.0005)라는 직관에 반하는 결과가 더 밀도 높은 대안을 능가합니다. 같은 연산자는 Transformer와 GNN 아키텍처로도 자연스럽게 이전되며, 퍼플렉시티와 수렴 속도에서 측정 가능한 이득을 보입니다.",
      "두 축은 하나의 지평으로 수렴합니다. 자율 시스템을 위한 인지-추론 아키텍처 — 원시 지각에서 학습된 잠재 표현을 거쳐 지연-강인 체현 제어까지 모든 층을 통해 명시적인 온톨로지 구조를 운반하는 — 가 그 목표입니다. 제 작업 환경도 이를 반영합니다. Doosan M0609 매니퓰레이터와 ROS 2 기반 TurtleBot3 자율주행 플랫폼에서 프로토타입을 만들고, 증명할 수 있는 것은 증명하고, 나머지는 이 저널에 기록합니다. 가장 관심 있는 문제는 깨끗한 위상적·코호몰로지적 명제가 구체적인 공학적 귀결을 강제하고, 반대로 공학이 새로운 수학적 대상을 요구하는 지점들입니다.",
    ],
  },

  ja: {
    label: "日本語",
    langTag: "ja",
    heading: "自己紹介",
    paragraphs: [
      "Jaehong Oh と申します。知覚の数学と身体化システム工学の境界で研究を行うロボティクス・エンジニアであり、AI 研究者です。現在は ROBOTIS の Perception チームにリサーチ・インターンとして所属し、エンド・ツー・エンドの自動運転知覚パイプラインに携わっています。同時にソウルの崇実大学校機械工学科の学部生として、知能ロボティクス研究室（Intelligent Robotics Laboratory）でも活動しています。",
      "理論的な研究プログラムは Soft Cognitive Cohesion (SCC) です。存在を関係構造のゲージ不変な位相不変量として扱う公理的枠組みです。グラフ理論とゲージ理論を基礎に、SCC は関係をスカラー重みと群値遷移の双方を担うエッジとして定義し、自然な集合体（\"fruits\"）をスペクトルクラスタリングで識別し、境界の特異点（\"doors\"）を外部接触の異常点として位置づけ、最適ゲージ類・door 座標・残余エネルギーからゲージ不変な存在シグネチャを導出します。内在的・相対的・多スケール永続的という三つのコホモロジー読み出しは長完全列で結ばれ、有限次元の線形代数により計算可能です。",
      "計算的な側は Ontology Neural Networks (ONN) と ORTSF 制御です。射影-合意作用素および文脈制約の下で学習される位相保存表現に、その上で遅延に頑健な制御を行う Ontological Real-Time State Feedback が結合されます。2026 年に Int. J. Topol. に採択されたフレームワーク論文と、その後の実証研究によれば、戦略的な構成は理論的に予測される最適性限界の 99.75 % に到達します — 最小連結度 (k = 2)、極端な surgery-decay 精度 (δ = 0.0005) といった直観に反する結果が、より密な代替構成を凌駕します。同じ作用素群は Transformer や GNN アーキテクチャへも自然に移植され、パープレキシティと収束速度に計測可能な利得をもたらします。",
      "二つの筋は単一の地平へ収束します。自律システムのための認知・推論アーキテクチャ — 生の知覚から、学習された潜在表現、そして遅延に頑健な身体化制御に至るまで、すべての層に明示的なオントロジー構造を運ぶもの — がその目標です。私の作業場もこれを反映しています。Doosan M0609 マニピュレーターと ROS 2 上の TurtleBot3 自律移動プラットフォームでプロトタイプを組み、証明できるものは証明し、残りはこのジャーナルに記録します。もっとも追求する価値のある問題は、清らかな位相的・コホモロジー的命題が具体的な工学的帰結を強い、逆に工学が新たな数学的対象を要求する、そのような場面です。",
    ],
  },

  de: {
    label: "Deutsch",
    langTag: "de",
    heading: "Über mich",
    paragraphs: [
      "Ich bin Jaehong Oh, Robotikingenieur und KI-Forscher, dessen Arbeit an der Grenze zwischen der Mathematik der Wahrnehmung und der Ingenieurskunst verkörperter Systeme liegt. Derzeit bin ich Forschungspraktikant im Perception-Team bei ROBOTIS, wo ich an End-to-End-Wahrnehmungspipelines für autonomes Fahren mitwirke, und studiere Maschinenbau im Bachelor an der Soongsil-Universität in Seoul, wo ich im Intelligent Robotics Laboratory tätig bin.",
      "Mein theoretisches Programm heißt Soft Cognitive Cohesion (SCC) — ein axiomatisches Rahmenwerk, das Existenz als eichinvariante topologische Invariante relationaler Struktur behandelt. Gegründet auf Graphentheorie und Eichtheorie, definiert SCC Relationen als Kanten, die sowohl skalare Gewichte als auch gruppenwertige Übergänge tragen, identifiziert natürliche Aggregate (\u201EFruits\u201C) mittels spektraler Clusterung, verortet Randsingularitäten (\u201EDoors\u201C) an anomalen äußeren Kontakten und leitet aus optimaler Eichklasse, Door-Lokus und Restenergie eine eichinvariante Existenzsignatur ab. Die drei kohomologischen Lesarten — intrinsisch, relativ, mehrskaliger persistent — sind durch eine lange exakte Folge verknüpft und mittels endlich-dimensionaler linearer Algebra berechenbar.",
      "Die rechnerische Hälfte ist Ontology Neural Networks (ONN) mit ORTSF-Regelung — topologieerhaltende Repräsentationen, trainiert unter Projektions-Konsens-Operatoren und kontextuellen Bedingungen, gekoppelt mit Ontological Real-Time State Feedback für eine verzögerungsrobuste Regelung darüber. Die 2026 im Int. J. Topol. angenommene Rahmenarbeit zeigt zusammen mit anschließenden empirischen Studien, dass strategische Konfigurationen 99,75 % der theoretisch vorhergesagten Optimalitätsgrenze erreichen — mit kontraintuitiven Befunden wie minimaler Konnektivität (k = 2) und extremer Surgery-Decay-Präzision (δ = 0,0005), die dichtere Varianten übertreffen. Dieselben Operatoren lassen sich natürlich auf Transformer- und GNN-Architekturen übertragen, mit messbaren Gewinnen bei Perplexität und Konvergenz.",
      "Beide Stränge konvergieren auf einem einzigen Horizont: einer kognitiven Schlussfolgerungsarchitektur für autonome Systeme, die explizite ontologische Struktur durch jede Schicht trägt — von der rohen Wahrnehmung über gelernte latente Repräsentationen bis hinunter zur verzögerungsrobusten verkörperten Regelung. Meine Werkbank spiegelt das wider: Ich baue Prototypen auf Robotermanipulatoren (Doosan M0609) und autonomen Navigationsplattformen (TurtleBot3 unter ROS 2), beweise, was sich beweisen lässt, und dokumentiere den Rest in diesem Journal. Am stärksten reizen mich Probleme, in denen eine saubere topologische oder kohomologische Aussage eine konkrete ingenieurtechnische Konsequenz erzwingt — und umgekehrt, in denen die Ingenieurarbeit ein neues mathematisches Objekt fordert.",
    ],
  },

  zh: {
    label: "中文",
    langTag: "zh-Hans",
    heading: "关于我",
    paragraphs: [
      "我是 Jaehong Oh，一名在感知数学与具身系统工程交界处工作的机器人工程师与人工智能研究者。目前担任 ROBOTIS 感知团队（Perception Team）的研究实习生，参与端到端的自动驾驶感知流水线开发，同时在首尔崇实大学攻读机械工程本科，任职于智能机器人研究室（Intelligent Robotics Laboratory）。",
      "我的理论研究计划是 Soft Cognitive Cohesion（SCC）——一套将存在视为关系结构的规范不变拓扑不变量的公理化框架。建立在图论与规范理论之上，SCC 将关系定义为同时承载标量权重与群值过渡的边；通过谱聚类识别自然聚合体（\"fruits\"）；将边界奇异点（\"doors\"）定位为外部接触的异常点；并从最优规范类、door 位置与残余能量中导出规范不变的存在签名（existence signature）。三种上同调读出——内在、相对、多尺度持久——通过一个长正合序列相连，并可由有限维线性代数计算。",
      "计算的一半是 Ontology Neural Networks（ONN）与 ORTSF 控制——在投影-共识（projection-consensus）算子与上下文约束下学习的拓扑保持表征，叠加以 Ontological Real-Time State Feedback 实现延迟鲁棒的控制。2026 年被《Int. J. Topol.》接收的框架论文及后续实证工作表明，策略性构型可达到理论预测最优性边界的 99.75% —— 最小连接性（k = 2）与极端 surgery-decay 精度（δ = 0.0005）等反直觉的发现，超越了更密集的替代方案。同一套算子可自然地迁移至 Transformer 与图神经网络架构，在困惑度与收敛速度上均获得可测量的增益。",
      "这两条主线指向同一个地平线：一个为自主系统而生的认知-推理架构——将显式的本体结构贯穿于每一层，从原始感知、到学习到的潜在表征、直至延迟鲁棒的具身控制。我的工作台反映了这一点：在机器人操作臂（Doosan M0609）和 ROS 2 下的 TurtleBot3 自主导航平台上做原型，能证明的就证明，其余则记录在这份研究日志里。我最感兴趣的问题是那些干净的拓扑或上同调命题会强制出具体工程后果的——反之亦然，是工程本身要求新的数学对象的。",
    ],
  },
};
