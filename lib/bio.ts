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

      "Three projects mark the progression. TurtleBot4 was a seven-person industrial safety monitoring system — real-time detection, 4D state estimation tracking from position through jerk, MQTT-coordinated robot fleet — 92.3% accuracy at 350ms end-to-end. Soma Cube applied reinforcement learning to robotic assembly: a Masked DQN with legal-action masking, converging from a 54% baseline to 96.1% success over 105,300 episodes. The structural insight was that collision avoidance has to be built into the action space — you can't fine a system out of a configuration it was never prevented from entering. ONN began as a topology-aware representation and control programme. Its later audit resolved the central higher-order claim to a scoped No-Go: under a complete-pairwise observation contract, the proposed cohomological readouts add no information beyond pairwise data. What survived is a modest direction-channel signal, a single-mode additive scalar contraction result (ρ + |K_c| < 1), and an analytical method for testing representational claims; coupled multimode and system-level certification remain open. Each project asked the same question in a different language.",

      "My current main theoretical programme is Unified Latent Representation (ULR): a study of what learned systems genuinely share, when representations are identical under typed gauges, how learning differs from inference for an observer, and when organization forms. Canon 24 reaches a disciplined negative result — no additional neural-specific ULR ontology is established in the current registry — while keeping the programme active as a framework for stronger tests. Soft Cognitive Cohesion and Ontology Neural Networks are preserved as historical predecessors: their surviving mathematics remains public, but their unresolved couplings are not carried forward as facts. The work now is to keep both structure and the boundaries of its evidence visible.",

      "Hardware and simulation are intervention surfaces for theory. An oscillation or failed grasp generates candidate explanations, not a diagnosis: topology, representation geometry, control-state error, routing, sensing, and optimization must be compared under typed contracts. I accept a structural explanation only when it beats declared control, state-space, predictive, causal, and routing baselines on held-out behavior. The goal is therefore to build instrumentation that types representations, interventions, physical ports, and outputs so every claim can be falsified. Theory and hardware still constrain each other; evidence decides which arrow survives.",
    ],
  },

  ko: {
    label: "한국어",
    langTag: "ko",
    heading: "자기소개",
    paragraphs: [
      "저는 로보틱스 소프트웨어 엔지니어이자 ROBOTIS 퍼셉션 팀 연구 인턴으로, 숭실대학교 기계공학부에 재학 중입니다. 제가 하는 일은 하드웨어와 구조적 물음 사이 어딘가에 자리하고 있으며, 저는 시스템이 무엇을 할 수 있는가만큼이나 무엇을 알 수 있는가를 끊임없이 생각합니다. 이 물음은 공학보다 먼저 찾아왔습니다. 자신이 실제로 생각하는 바를 끝까지 말하도록 강제하는 다른 종류의 집중된 작업을 통해서였습니다. 거기서 제가 부딪힌 질문은 이것이었습니다. 어떤 존재가 자기 자신을 완전히 관찰할 수 없을 때, 그럼에도 무엇이 지속되는가. 관찰자와 관찰 대상 사이의 간극은 결함이 아닙니다. 그림자가 빛의 실패가 아니라 그 사이에 단단한 무언가가 서 있다는 증거이듯, 그 간극은 구조의 특징 그 자체입니다.",

      "그 물음을 다듬어 온 과정이 세 개의 프로젝트로 나타납니다. TurtleBot4에서는 7인 팀으로 탐지와 4D 상태 추정을 통합한 산업 안전 모니터링 시스템을 설계하며, 92.3% 탐지 정확도와 350ms 응답 시간을 달성했습니다. 소마 큐브 조립 과제에서는 합법 행동 마스킹 기반 Masked DQN을 적용해 10만 5천 에피소드 끝에 성공률을 96.1%까지 끌어올렸으며, 핵심 통찰은 충돌 회피가 패널티가 아니라 구조 자체여야 한다는 것이었습니다. ONN은 위상 구조를 명시적으로 다루는 표현·제어 연구로 시작했습니다. 이후 감사에서 완전한 쌍별 관측 조건에서는 제안된 고차·코호몰로지 판독이 쌍별 데이터 이상의 정보를 더하지 못한다는 제한된 No-Go 경계가 확인됐습니다. 남은 것은 제한적인 방향 채널 신호, 단일 모드 가산형 스칼라 수축 결과(ρ + |K_c| < 1), 그리고 표현 주장을 분석적으로 검증하는 방법론입니다. 결합 다중 모드·시스템 수준 인증은 아직 미해결입니다. 세 프로젝트는 각각 다른 언어로 같은 물음을 묻는 과정이었습니다.",

      "현재의 메인 이론 연구는 통합 잠재 표현(ULR)입니다. 학습된 시스템들이 실제로 무엇을 공유하는지, 올바른 게이지 아래 두 표현이 언제 같은지, 관찰자에게 학습과 추론이 어떻게 구별되는지, 그리고 조직이 언제 형성되는지를 연구합니다. Canon 24의 결론은 현재 registry에서 추가적인 신경망 고유 ULR 존재론이 확립되지 않았다는 엄격한 음성 판정이지만, 더 강한 검증을 조정하는 연구 프로그램은 계속됩니다. SCC와 ONN은 역사적 선행 연구로 보존됩니다. 살아남은 수학은 공개하되, 확립되지 않은 결합은 사실로 이월하지 않습니다. 지금의 과제는 구조와 그 증거의 경계를 함께 보이게 하는 것입니다.",

      "하드웨어와 시뮬레이션은 이론을 개입으로 시험하는 표면입니다. 팔의 진동이나 파지 실패는 진단 그 자체가 아니라 후보 설명을 만듭니다. 위상, 표현 기하, 제어 상태 오차, 라우팅, 센싱, 최적화를 같은 typed contract 아래 비교해야 합니다. 구조적 설명은 선언한 제어·상태공간·예측·인과·라우팅 baseline보다 held-out 행동을 더 잘 설명할 때만 채택합니다. 그래서 목표는 모든 층에 존재론을 미리 새기는 것이 아니라, 표현·개입·물리 port·출력을 명시적으로 typing해 모든 주장을 반증 가능하게 만드는 계측 구조입니다. 이론과 하드웨어는 서로를 제약하지만, 어느 화살표가 살아남는지는 증거가 결정합니다.",
    ],
  },

  ja: {
    label: "日本語",
    langTag: "ja",
    heading: "自己紹介",
    paragraphs: [
      "私は、ハードウェアと構造的な問いの境界線に立つロボティクスソフトウェアエンジニアです。崇実大学校で機械工学を学びながら、ROBOTISのパーセプションチームで研究インターンとして働いています。私が問い続けているのは、システムが何をできるかではなく、何を知ることができるかという問いです。この問いは、エンジニアリングを始める以前、ある別の深く集中した実践の中で芽生えました――あるものが自分自身を完全には観察できないとき、何が持続するのか、という問いとして。観察者と被観察者の間に生じる裂け目は、欠陥ではなく構造的な性質だと思います。鏡が自分自身を完全には映せないように、その裂け目はシステムの本質に織り込まれているのです。",

      "三つのプロジェクトを通じて、私はその問いを異なる言語で繰り返し問いました。TurtleBot4では7人のチームで物体検出と4次元状態推定を統合し、92.3%の精度と350msの応答時間を実現しました。ソーマキューブ組み立てでは、Masked DQNと合法行動マスキングを組み合わせ、成功率を54%から96.1%へと引き上げました――衝突回避は構造そのものでなければならないと学びました。ONNは、トポロジーを明示的に扱う表現・制御研究として始まりました。その後の監査により、完全なペアワイズ観測という条件下では、提案した高次・コホモロジー読出しはペアワイズデータを超える情報を加えない、という限定的なNo-Go境界に到達しました。残ったのは、限定的な方向チャネル信号、単一モードの加法型スカラー収縮結果（ρ + |K_c| < 1）、そして表現上の主張を解析的に検証する方法論です。結合多モードおよびシステムレベルの証明は未解決です。三つのプロジェクトはそれぞれ異なる音域で、同じ問いを奏でていました。",

      "現在の主要な理論研究はUnified Latent Representation（ULR）です。学習系が実際に何を共有するのか、型付きゲージの下で表現がいつ同一なのか、観測者にとって学習と推論がどう区別されるのか、そして組織がいつ形成されるのかを問います。Canon 24は、現時点のレジストリでは追加のニューラル固有ULR存在論は確立されていない、という厳密な否定的結論に達しましたが、より強い検証を組織する研究プログラムは継続します。SCCとONNは歴史的先行研究として保存し、成立した数学は公開しつつ、未確立の接続を事実として引き継ぎません。構造と証拠の境界を同時に可視化することが現在の課題です。",

      "ハードウェアとシミュレーションは、理論を介入によって試す場です。アームの振動や把持の失敗は診断そのものではなく、候補となる説明を生みます。トポロジー、表現幾何、制御状態誤差、ルーティング、センシング、最適化を、型付けされた同一の契約の下で比較しなければなりません。構造的説明は、宣言済みの制御・状態空間・予測・因果・ルーティングのベースラインを保留データ上で上回るときだけ採用します。目標は全層に存在論を先に埋め込むことではなく、表現・介入・物理ポート・出力を明示的に型付けし、すべての主張を反証可能にする計測基盤を作ることです。理論とハードウェアは互いを制約しますが、どの矢印が残るかは証拠が決めます。",
    ],
  },

  de: {
    label: "Deutsch",
    langTag: "de",
    heading: "Über mich",
    paragraphs: [
      "Ich arbeite an der Schnittstelle von Hardware und strukturellen Fragen, die das Engineering allein nicht beantworten kann. Als Forschungspraktikant im ROBOTIS-Perception-Team und Maschinenbaustudent an der Soongsil Universität in Seoul frage ich mich ebenso intensiv, was Systeme wissen können, wie was sie tun können. Die eigentliche Frage kam früher — durch eine andere, konzentrierte Praxis, die mich zwang zu untersuchen, was zwischen dem Beobachter und dem Beobachteten liegt, wenn Selbstbeobachtung immer unvollständig ist. Was persistiert, wenn das Subjekt nie ganz bei sich ankommt? Diese Lücke ist kein Mangel, der zu beheben wäre — sie ist eine strukturelle Eigenschaft, so wie der Hohlraum im Inneren eines Rings nicht Leere ist, sondern genau das, was den Ring zu dem macht, was er ist.",

      "Drei Projekte stehen stellvertretend für diesen Versuch, jedes in einer anderen Notation. Im TurtleBot4-Projekt leitete ich ein Sieben-Personen-Team, das Echtzeiterkennung mit 4D-Zustandsschätzung kombinierte — eine Erkennungsgenauigkeit von 92,3% bei 350 Millisekunden Latenz. Im Soma-Cube-Projekt trainierte ich einen Masked DQN mit legalem Aktions-Masking über 105.300 Episoden — die Erfolgsrate stieg von 54% auf 96,1%, weil Kollisionsvermeidung strukturell eingebettet sein muss, nicht als nachträgliche Strafe. ONN begann als Forschungsprogramm für topologiebewusste Repräsentation und Regelung. Die spätere Prüfung führte die zentrale These auf eine klar begrenzte No-Go-Aussage zurück: Unter vollständiger paarweiser Beobachtung liefern die vorgeschlagenen höhergeordneten und kohomologischen Auslesungen keine zusätzliche Information gegenüber den Paardaten. Übrig bleiben ein begrenztes Richtungskanalsignal, ein additives skalares Kontraktionsergebnis für einen Einzelmodus (ρ + |K_c| < 1) und eine analytische Methode zur Prüfung von Repräsentationsbehauptungen. Eine Zertifizierung für gekoppelte Mehrmoden- und Systemebenen bleibt offen. Jedes dieser Projekte stellte dieselbe Frage in einer anderen Sprache.",

      "Mein aktuelles theoretisches Hauptprogramm ist Unified Latent Representation (ULR). Es untersucht, was gelernte Systeme tatsächlich teilen, wann Repräsentationen unter typisierten Eichungen identisch sind, wie sich Lernen und Inferenz für einen Beobachter unterscheiden und wann Organisation entsteht. Canon 24 kommt zu einem disziplinierten negativen Ergebnis: Im derzeitigen Register ist keine zusätzliche neuronalspezifische ULR-Ontologie etabliert. Das Programm bleibt jedoch als Rahmen für strengere Tests aktiv. SCC und ONN werden als historische Vorgänger bewahrt; ihre tragfähige Mathematik bleibt öffentlich, nicht etablierte Kopplungen werden aber nicht als Tatsachen übernommen. Heute gilt es, Struktur und Evidenzgrenzen zugleich sichtbar zu halten.",

      "Hardware und Simulation sind Interventionsflächen für die Theorie. Eine Oszillation oder ein fehlgeschlagener Griff liefert keine fertige Diagnose, sondern konkurrierende Erklärungen: Topologie, Repräsentationsgeometrie, Zustandsfehler der Regelung, Routing, Sensorik und Optimierung müssen unter typisierten Verträgen verglichen werden. Eine strukturelle Erklärung akzeptiere ich nur, wenn sie deklarierte Regelungs-, Zustandsraum-, Vorhersage-, Kausal- und Routing-Baselines bei zurückgehaltenem Verhalten übertrifft. Das Ziel ist daher nicht, jeder Schicht vorab eine Ontologie einzuschreiben, sondern eine Messarchitektur zu bauen, die Repräsentationen, Interventionen, physische Ports und Ausgaben typisiert und jede Behauptung falsifizierbar macht. Theorie und Hardware begrenzen einander; die Evidenz entscheidet, welcher Pfeil bestehen bleibt.",
    ],
  },

  zh: {
    label: "中文",
    langTag: "zh-Hans",
    heading: "关于我",
    paragraphs: [
      "我是一名机器人软件工程师，目前在首尔崇实大学攻读机械工程，同时担任ROBOTIS感知团队的研究实习生。我的工作处于硬件约束与工程学无法独自回答的结构性问题之间——不只是系统能做什么，更是系统能知道什么。这个问题在我写下第一行代码之前就已到来，通过一种截然不同的专注实践：那种无法依赖编译器或测试套件验证的工作，唯一的检验是你写下的东西是否真的说出了你所想。那个反复浮现的问题是：当某物无法完整地观察自身时，什么得以留存？如同琴弦间的寂静——不是空缺，而是让音乐成为音乐的结构。",

      "三个项目标记了这一探索的轨迹。TurtleBot4是七人团队共同完成的工业安全监控系统，结合实时检测与四维状态估计，实现了92.3%检测精度和350ms端到端响应。索玛立方体将强化学习应用于机器人装配：带合法动作掩码的Masked DQN，历经105,300回合训练，成功率从54%提升至96.1%——关键洞见是碰撞规避必须是结构性的，而不是事后加上的惩罚项。ONN起初是一项显式处理拓扑结构的表征与控制研究。后续审计把核心高阶主张收敛为一个有明确适用范围的No-Go边界：在完整成对观测条件下，所提出的高阶／上同调读出不会提供超出成对数据的信息。保留下来的是有限的方向通道信号、单模态加性标量收缩结果（ρ + |K_c| < 1），以及用解析方法检验表征主张的方法论；耦合多模态与系统级证书仍属开放问题。每个项目都用不同的语言问着同一个问题。",

      "我目前的主要理论研究是统一潜在表征（ULR）：研究学习系统真正共享什么、在类型化规范下表征何时同一、观察者如何区分学习与推理，以及组织何时形成。Canon 24给出了审慎的否定性结论：在当前登记范围内，尚未建立额外的神经网络特有ULR本体；但该计划仍作为组织更严格检验的框架继续推进。SCC与ONN作为历史前序研究保留；成立的数学继续公开，而未建立的耦合不会被当作事实继承。现在的任务是让结构与支撑它的证据边界同时保持可见。",

      "硬件与仿真是用干预检验理论的界面。机械臂振荡或抓取失败并不是现成的诊断，而是提出候选解释：拓扑、表征几何、控制状态误差、路由、感知与优化必须在类型化契约下相互比较。只有当一种结构性解释在留出行为上胜过预先声明的控制、状态空间、预测、因果与路由基线时，我才接受它。因此目标不是预先在每一层写入本体，而是建立一种测量架构，对表征、干预、物理端口与输出进行明确类型化，使每个主张都可被证伪。理论与硬件仍彼此约束；哪一支箭头能够保留，由证据决定。",
    ],
  },
};
