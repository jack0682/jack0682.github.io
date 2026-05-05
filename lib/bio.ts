/**
 * Multilingual bio. Five languages sharing the same structure so the
 * toggle can swap them without layout shift. Each record carries a
 * native-script label (for the selector) plus the paragraphs that
 * make up the essay.
 *
 * Content: who I am → projects → theory → direction. Edit freely.
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
  /** Body paragraphs */
  paragraphs: string[];
};

export const BIO: Record<BioLocale, BioContent> = {
  en: {
    label: "English",
    langTag: "en",
    heading: "About me",
    paragraphs: [
      "I'm Jaehong Oh — a robotics software engineer and research intern on the ROBOTIS Perception Team, studying Mechanical Engineering at Soongsil University in Seoul. My work sits at the intersection of hardware and a question that engineering alone doesn't close: not just what systems can do, but what they can know — about their state, their environment, the gap between a model and what it models. That question came to me before I wrote a line of code, through sustained attention in a very different medium, where the only verification is whether what you wrote actually says what you think. The question that kept surfacing: what persists when something cannot fully observe itself? I haven't answered it, but it has organized almost everything I've built since. Like the hollow inside a ring — not empty space, but the structure that makes the ring what it is.",

      "Three projects mark the progression. TurtleBot4 was a seven-person industrial safety monitoring system — real-time detection, 4D state estimation tracking from position through jerk, MQTT-coordinated robot fleet — 92.3% accuracy at 350ms end-to-end. Soma Cube applied reinforcement learning to robotic assembly: a Masked DQN with legal-action masking, converging from a 54% baseline to 96.1% success over 105,300 episodes. The structural insight was that collision avoidance has to be built into the action space — you can't fine a system out of a configuration it was never prevented from entering. ONN is a topology-preserving network where the latent state carries explicit ontological structure, achieving 99.75% topology preservation across 3 million nodes and 14.7% perplexity improvement over Transformer baselines (arXiv 2506.19277). Each project asked the same question in a different language.",

      "The theoretical work — Soft Cognitive Cohesion and Ontology Neural Networks — grew from the engineering rather than alongside it. SCC formalizes what exists before the world is parsed into separately identified things: a soft cohesion field over a relational support space, from which existence emerges as a gauge-invariant topological invariant — not assumed, but derived. ONN makes this learnable: the latent state carries explicit ontological structure, and delay-robust feedback closes the loop on top of that topology. Most models encode structure the way memory encodes a dream — you know something was there, but the shape is gone. These frameworks try to keep the shape visible. The work was accepted at the International Journal of Topology in 2026.",

      "The direction I'm working toward runs on bidirectional arrows. Hardware failures are data about theory: an arm oscillating at a control boundary points to missing topology in the state space; a grasp failing in an unseen configuration reveals a gap in the relational geometry. When the theory sharpens, it generates specific hardware requirements in return — not tuning criteria, but structural specifications that change what you build. My goal is an architecture where ontological structure is explicit at every layer, from raw sensor input through learned latent representations to the control interface. The arrows run in both directions, and the most interesting problems live exactly at that crossing.",
    ],
  },

  ko: {
    label: "한국어",
    langTag: "ko",
    heading: "자기소개",
    paragraphs: [
      "저는 로보틱스 소프트웨어 엔지니어이자 ROBOTIS 퍼셉션 팀 연구 인턴으로, 숭실대학교 기계공학부에 재학 중입니다. 제가 하는 일은 하드웨어와 구조적 물음 사이 어딘가에 자리하고 있으며, 저는 시스템이 무엇을 할 수 있는가만큼이나 무엇을 알 수 있는가를 끊임없이 생각합니다. 이 물음은 공학보다 먼저 찾아왔습니다. 자신이 실제로 생각하는 바를 끝까지 말하도록 강제하는 다른 종류의 집중된 작업을 통해서였습니다. 거기서 제가 부딪힌 질문은 이것이었습니다. 어떤 존재가 자기 자신을 완전히 관찰할 수 없을 때, 그럼에도 무엇이 지속되는가. 관찰자와 관찰 대상 사이의 간극은 결함이 아닙니다. 그림자가 빛의 실패가 아니라 그 사이에 단단한 무언가가 서 있다는 증거이듯, 그 간극은 구조의 특징 그 자체입니다.",

      "그 물음을 다듬어 온 과정이 세 개의 프로젝트로 나타납니다. TurtleBot4에서는 7인 팀으로 탐지와 4D 상태 추정을 통합한 산업 안전 모니터링 시스템을 설계하며, 92.3% 탐지 정확도와 350ms 응답 시간을 달성했습니다. 소마 큐브 조립 과제에서는 합법 행동 마스킹 기반 Masked DQN을 적용해 10만 5천 에피소드 끝에 성공률을 96.1%까지 끌어올렸으며, 핵심 통찰은 충돌 회피가 패널티가 아니라 구조 자체여야 한다는 것이었습니다. ONN 연구에서는 위상 보존 손실 함수를 통해 300만 노드에서 99.75%의 위상 보존율, 트랜스포머 대비 14.7%의 퍼플렉시티 개선을 달성했습니다. 세 프로젝트는 각각 다른 언어로 같은 물음을 묻는 과정이었습니다.",

      "이 경험들은 두 개의 이론적 작업으로 수렴했습니다. SCC는 세계가 분리된 사물들로 파싱되기 전의 형성을 형식화합니다. 관계적 지지 공간 위에 연성 응집 장이 먼저 있으며, 존재는 이 장으로부터 게이지 불변 위상 불변량으로 도출됩니다. 가정이 아니라 도출입니다. ONN은 이 구조를 학습으로 연결하며, 잠재 상태에 명시적 존재론적 구조를 부여합니다. 대부분의 모델은 꿈을 기억하듯 구조를 인코딩합니다. 무언가가 거기 있었다는 것은 알지만, 그 형태는 이미 사라지고 없습니다. SCC와 ONN은 그 형태를 유지하려는 시도이며, 이 작업은 2026년 International Journal of Topology에 게재 승인을 받았습니다.",

      "하드웨어 실패는 이론의 데이터입니다. 제어 경계에서 진동하는 팔은 상태 공간에 빠진 위상이 있다는 신호이고, 낯선 구성에서 실패하는 파지는 관계적 기하가 불완전하다는 단서입니다. 역방향도 성립합니다. 이론이 날카로워지면 특정한 하드웨어 요구사항을 낳습니다. 자기 자신의 흐름을 관찰할 수 없는 강을 생각해 봅니다. 물은 자신이 어디로 가는지 알 필요가 없어도 그 형태를 유지합니다. 관찰자가 완전한 접근권을 갖지 못할 때에도 장은 지속됩니다. 저는 그 두 방향의 화살표가 동시에 흐르는 지점에서, 존재론적 구조가 모든 층에서 명시적인 아키텍처를 향해 작업하고 싶습니다.",
    ],
  },

  ja: {
    label: "日本語",
    langTag: "ja",
    heading: "自己紹介",
    paragraphs: [
      "私は、ハードウェアと構造的な問いの境界線に立つロボティクスソフトウェアエンジニアです。崇実大学校で機械工学を学びながら、ROBOTISのパーセプションチームで研究インターンとして働いています。私が問い続けているのは、システムが何をできるかではなく、何を知ることができるかという問いです。この問いは、エンジニアリングを始める以前、ある別の深く集中した実践の中で芽生えました――あるものが自分自身を完全には観察できないとき、何が持続するのか、という問いとして。観察者と被観察者の間に生じる裂け目は、欠陥ではなく構造的な性質だと思います。鏡が自分自身を完全には映せないように、その裂け目はシステムの本質に織り込まれているのです。",

      "三つのプロジェクトを通じて、私はその問いを異なる言語で繰り返し問いました。TurtleBot4では7人のチームで物体検出と4次元状態推定を統合し、92.3%の精度と350msの応答時間を実現しました。ソーマキューブ組み立てでは、Masked DQNと合法行動マスキングを組み合わせ、成功率を54%から96.1%へと引き上げました――衝突回避は構造そのものでなければならないと学びました。ONN研究ではトポロジー保存損失を設計し、300万ノードのグラフで99.75%のトポロジー保存とTransformerを14.7%上回るパープレキシティ改善を達成しました。三つのプロジェクトはそれぞれ異なる音域で、同じ問いを奏でていました。",

      "理論の側では、軟凝集場 u_t : X_t → [0,1] を基本的な実体として定式化し、存在をゲージ不変なトポロジカル不変量として導出しました――仮定するのではなく、導出するのです。四つのエネルギー項は概念的に独立しており、公理A3のもとでの閉包は安定化傾向を持ちますが、不動点収束を要求するものではありません。ONNの潜在状態は明示的なオントロジー構造を担い、ORTSFは遅延ロバストなフィードバックを提供します。ほとんどの学習システムは、その構造を重みの中に化石のように埋もれさせますが、SCCとONNは構造を可視のまま保とうとします。この理論的枠組みはInt. J. Topol. 2026に採択されました。",

      "ハードウェアの失敗は理論のデータになります。アームの振動は状態トポロジーの欠如を、失敗した把持は関係的幾何の不完全さを示しています。逆に、理論はハードウェアへの要求を与えます――A3は不動点収束を必要としないことを示し、ベッティ数の保存はセンサーがトポロジカル構造を再構成できなければならないことを意味します。壺の形を知ることなく、その内側でその形を保ち続ける水のように――場の持続は完全な自己知識に依存しないのです。私の目標は、オントロジー構造をあらゆる層で明示的に保つことです。二つの方向の矢印が流れ続けるその交点で、私は作業し続けます。",
    ],
  },

  de: {
    label: "Deutsch",
    langTag: "de",
    heading: "Über mich",
    paragraphs: [
      "Ich arbeite an der Schnittstelle von Hardware und strukturellen Fragen, die das Engineering allein nicht beantworten kann. Als Forschungspraktikant im ROBOTIS-Perception-Team und Maschinenbaustudent an der Soongsil Universität in Seoul frage ich mich ebenso intensiv, was Systeme wissen können, wie was sie tun können. Die eigentliche Frage kam früher — durch eine andere, konzentrierte Praxis, die mich zwang zu untersuchen, was zwischen dem Beobachter und dem Beobachteten liegt, wenn Selbstbeobachtung immer unvollständig ist. Was persistiert, wenn das Subjekt nie ganz bei sich ankommt? Diese Lücke ist kein Mangel, der zu beheben wäre — sie ist eine strukturelle Eigenschaft, so wie der Hohlraum im Inneren eines Rings nicht Leere ist, sondern genau das, was den Ring zu dem macht, was er ist.",

      "Drei Projekte stehen stellvertretend für diesen Versuch, jedes in einer anderen Notation. Im TurtleBot4-Projekt leitete ich ein Sieben-Personen-Team, das Echtzeiterkennung mit 4D-Zustandsschätzung kombinierte — eine Erkennungsgenauigkeit von 92,3% bei 350 Millisekunden Latenz. Im Soma-Cube-Projekt trainierte ich einen Masked DQN mit legalem Aktions-Masking über 105.300 Episoden — die Erfolgsrate stieg von 54% auf 96,1%, weil Kollisionsvermeidung strukturell eingebettet sein muss, nicht als nachträgliche Strafe. Im ONN-Projekt floss Forman-Ricci-Krümmung und persistente Homologie direkt in die Verlustfunktion — 99,75% Topologieerhaltung bei drei Millionen Knoten, 14,7% Perplexitätsverbesserung, arXiv 2506.19277. Jedes dieser Projekte stellte dieselbe Frage in einer anderen Sprache.",

      "Meine theoretische Arbeit versucht, diese Erfahrungen in Struktur zu übersetzen. SCC formalisiert prä-objektive Formation: ein weiches Kohäsionsfeld u_t: X_t → [0,1] über einem relationalen Trägerraum, in dem Existenz als eichinvariante topologische Invariante abgeleitet wird — nicht angenommen, sondern hergeleitet. Im ONN-Rahmen trägt der latente Zustand explizite ontologische Struktur; das ORTSF-Modul liefert verzögerungsrobustes Feedback. Die meisten Modelle codieren Struktur wie ein Foto eine Landschaft — scheinbar vollständig, aber das Tiefenprofil fehlt. SCC und ONN versuchen, das Tiefenprofil zu behalten. Die Ergebnisse erscheinen im Int. J. Topol. 2026.",

      "Was mich am meisten fesselt, ist, dass die Pfeile in beide Richtungen laufen. Hardware-Ausfälle sind Theoriedaten: wenn ein Arm oszilliert, fehlt Topologie im Zustandsraum; wenn ein Griff scheitert, ist die relationale Geometrie unvollständig. Umgekehrt gibt die Theorie Hardware-Anforderungen vor — nicht nur Tuning-Kriterien, sondern strukturelle Spezifikationen, die verändern, was man überhaupt baut. Wie ein Kompass, der nie exakt auf Nord zeigt, aber immer in die richtige Richtung — die Annäherung ist die Funktion, nicht der Fehler. Mein Ziel ist ein System, in dem ontologische Struktur auf jeder Schicht explizit sichtbar ist, und ich arbeite genau an dem Punkt, wo die beiden Pfeile aufeinandertreffen.",
    ],
  },

  zh: {
    label: "中文",
    langTag: "zh-Hans",
    heading: "关于我",
    paragraphs: [
      "我是一名机器人软件工程师，目前在首尔崇实大学攻读机械工程，同时担任ROBOTIS感知团队的研究实习生。我的工作处于硬件约束与工程学无法独自回答的结构性问题之间——不只是系统能做什么，更是系统能知道什么。这个问题在我写下第一行代码之前就已到来，通过一种截然不同的专注实践：那种无法依赖编译器或测试套件验证的工作，唯一的检验是你写下的东西是否真的说出了你所想。那个反复浮现的问题是：当某物无法完整地观察自身时，什么得以留存？如同琴弦间的寂静——不是空缺，而是让音乐成为音乐的结构。",

      "三个项目标记了这一探索的轨迹。TurtleBot4是七人团队共同完成的工业安全监控系统，结合实时检测与四维状态估计，实现了92.3%检测精度和350ms端到端响应。索玛立方体将强化学习应用于机器人装配：带合法动作掩码的Masked DQN，历经105,300回合训练，成功率从54%提升至96.1%——关键洞见是碰撞规避必须是结构性的，而不是事后加上的惩罚项。ONN是一个拓扑保持网络，通过Forman-Ricci曲率和持久同调损失函数，在300万节点上实现了99.75%的拓扑保持率，相对Transformer基线困惑度提升14.7%，预印本arXiv 2506.19277。每个项目都用不同的语言问着同一个问题。",

      "这些经验最终收束为两套理论框架。软内聚场理论SCC形式化了前客体形成：在世界被解析为独立事物之前，存在一个覆盖关系支撑空间的软内聚场，存在性从中被导出为规范不变的拓扑不变量——不是假设，而是导出。本体论神经网络ONN将这一结构引入学习体制：潜在状态携带显式本体结构，ORTSF算子族以延迟鲁棒反馈闭合控制环路。大多数模型将结构编码进权重，就像把骨架埋进泥里——SCC和ONN试图让骨架保持可见。这一工作于2026年被Int. J. Topol.接收。",

      "我前进的方向以双向箭头运作。硬件故障是关于理论的数据：在控制边界振荡的机械臂指向状态空间中缺失的拓扑；在未见配置中失败的抓取揭示关系几何的不完整。反方向同样成立：理论精进生成具体的硬件要求——不是调参标准，而是改变你构建什么的结构性规范。像一条不知道自己源头的河流——它不需要完整的自我认知也能保持形状。我正在构建的是本体结构在每一层都明确的架构，从原始传感器输入到控制接口。两个方向的箭头同时流动的交叉点，正是我想工作的地方。",
    ],
  },
};
