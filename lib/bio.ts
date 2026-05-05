/**
 * Multilingual bio. Five languages sharing the same structure so the
 * toggle can swap them without layout shift. Each record carries a
 * native-script label (for the selector) plus the paragraphs that
 * make up the essay.
 *
 * Content is written in a personal register: who I am → what I
 * actually build → the theory behind it → where I'm heading.
 * Edit freely.
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
      "I'm Jaehong Oh — a robotics software engineer who builds systems that keep working after the demo is over. I work as a Research Intern on the Perception Team at ROBOTIS, contributing to autonomous-driving perception pipelines, and I'm a Mechanical Engineering undergraduate at Soongsil University in Seoul.",
      "Most of my hands-on work lives at the intersection of hardware constraints and software architecture. When I integrated the Frontier mobile manipulator — AntBot swerve base, OMY F3M arm, pan-tilt head, each on a different port with different timing physics — I didn't force them into a single control loop. I separated them into independent namespaced controller_managers: the RCU-bridged base at 20 Hz, the Dynamixel arm stabilised at 100 Hz after measuring p99 SyncRead latency at 4 Mbps, the head on its own low-rate loop that doesn't penalise the arm. Sensor validation follows the same logic — four simultaneous RGB-D streams (RealSense D435i ×2, D405, ZED Mini) are measured by inter-frame tail latency and burst-drop patterns, not mean FPS, because that's what actually breaks dataset collection. My standing rule: make the problem observable, set a reproducible condition, then verify the fix before writing it down.",
      "Alongside this I develop two interlocking theoretical frameworks. Soft Cognitive Cohesion (SCC) derives existence as a gauge-invariant topological invariant of relational structure — formal scaffolding for a perception system that doesn't lose track of what it's looking at. Ontology Neural Networks (ONN) with ORTSF control turns that scaffolding into learned representations that stay topology-preserving and support delay-robust feedback. The framework paper was accepted at Int. J. Topol. in 2026. The theory isn't separate from the engineering — it's why the engineering is structured the way it is.",
      "What I'm building toward is a cognitive-reasoning architecture where ontological structure is explicit at every layer: from sensor input, through learned latent representations, down to the control interface that actually moves hardware. The problems worth solving are the ones where getting the topology right forces a better engineering decision — and where the hardware, in turn, reveals a gap in the theory.",
    ],
  },

  ko: {
    label: "한국어",
    langTag: "ko",
    heading: "자기소개",
    paragraphs: [
      "오재홍입니다. 데모가 끝난 뒤에도 계속 동작하는 시스템을 만드는 로보틱스 소프트웨어 엔지니어입니다. ROBOTIS Perception 팀 연구 인턴으로 자율주행 지각 파이프라인을 개발하고 있으며, 숭실대학교 기계공학과 학부생으로 지능로봇 연구실에 소속되어 있습니다.",
      "제가 실제로 하는 일의 대부분은 하드웨어 물리 제약과 소프트웨어 아키텍처가 만나는 지점에 있습니다. Frontier 모바일 매니퓰레이터를 통합할 때 — AntBot swerve base, OMY F3M arm, pan-tilt head, 각각 다른 포트와 다른 타이밍 특성을 가진 세 서브시스템 — 저는 이것들을 하나의 제어 루프에 억지로 밀어 넣지 않았습니다. 각각을 독립 네임스페이스의 controller_manager로 분리했습니다. RCU 경유 base는 20 Hz, 4 Mbps 환경에서 6축 SyncRead의 p99 지연을 실측한 뒤 Dynamixel arm을 100 Hz로 안정화했고, head는 arm 루프에 영향을 주지 않는 별도 저주기 루프로 분리했습니다. 센서 검증도 같은 방식입니다. 동시 구동 RGB-D 4대(RealSense D435i ×2, D405, ZED Mini)는 평균 FPS가 아니라 inter-frame tail latency와 burst-drop 패턴으로 측정합니다. 실제로 데이터셋 수집을 망가뜨리는 것은 그것이기 때문입니다. 저의 기본 원칙은 단순합니다. 문제를 관측 가능하게 만들고, 재현 가능한 조건을 설정하고, 수정 후 검증이 완료되어야 기록합니다.",
      "이와 함께 두 가지 이론 프레임워크를 개발하고 있습니다. Soft Cognitive Cohesion (SCC)은 관계 구조의 위상 불변량으로 존재를 유도하는 공리 체계로, 인지 시스템이 무엇을 보고 있는지 놓치지 않기 위한 형식적 토대입니다. Ontology Neural Networks (ONN)과 ORTSF 제어는 그 토대를 위상-보존 표현 학습과 지연-강인 피드백 제어로 구현합니다. 프레임워크 논문은 2026년 Int. J. Topol.에 게재 승인됐습니다. 이 이론은 공학과 별개가 아닙니다. 시스템을 지금과 같은 구조로 설계하는 이유가 바로 이 이론에서 나옵니다.",
      "제가 만들고자 하는 것은 온톨로지 구조가 모든 층에서 명시적으로 유지되는 인지-추론 아키텍처입니다. 센서 입력부터 학습된 잠재 표현을 거쳐, 실제로 하드웨어를 움직이는 제어 인터페이스까지. 가장 관심 있는 문제는 위상적 구조를 올바르게 잡으면 더 나은 공학적 결정이 강제되고, 반대로 하드웨어가 이론의 빈 곳을 드러내는 지점들입니다.",
    ],
  },

  ja: {
    label: "日本語",
    langTag: "ja",
    heading: "自己紹介",
    paragraphs: [
      "Jaehong Oh と申します。デモが終わった後も動き続けるシステムを作るロボティクス・ソフトウェアエンジニアです。ROBOTIS の Perception チームにリサーチ・インターンとして自律走行知覚パイプラインの開発に携わり、ソウルの崇実大学校機械工学科の学部生として知能ロボティクス研究室に所属しています。",
      "私が実際に取り組んでいる仕事の大半は、ハードウェアの物理的制約とソフトウェアアーキテクチャが交わる場所にあります。Frontier モバイルマニピュレーターを統合したとき — AntBot スワーブベース、OMY F3M アーム、パン・チルトヘッド、それぞれ異なるポートと異なるタイミング特性を持つ三つのサブシステム — 私はそれらを単一の制御ループに無理に押し込みませんでした。独立した名前空間付き controller_manager に分離したのです。RCU 経由のベースは 20 Hz、4 Mbps 環境で 6 軸 SyncRead の p99 遅延を実測したうえで Dynamixel アームを 100 Hz に安定化し、ヘッドはアームのループに影響しない別の低頻度ループに分離しました。センサー検証も同様です。同時稼働する RGB-D 4 台（RealSense D435i ×2、D405、ZED Mini）は平均 FPS ではなく、フレーム間テールレイテンシとバーストドロップパターンで評価します。それこそがデータセット収集を実際に壊す原因だからです。私の基本原則はシンプルです。問題を観測可能にし、再現可能な条件を設定し、修正後の検証が完了してから記録する。",
      "それと並行して、二つの理論フレームワークを開発しています。Soft Cognitive Cohesion (SCC) は関係構造の位相不変量として存在を導出する公理体系で、知覚システムが何を見ているかを見失わないための形式的な土台です。Ontology Neural Networks (ONN) と ORTSF 制御はその土台を、位相保存表現の学習と遅延鲁棒なフィードバック制御として実装します。フレームワーク論文は 2026 年に Int. J. Topol. に採択されました。理論は工学とは別物ではありません。システムを今のような構造で設計する理由が、この理論から来ています。",
      "私が作ろうとしているのは、オントロジー構造がすべての層で明示的に維持される認知・推論アーキテクチャです。センサー入力から、学習された潜在表現を経て、実際にハードウェアを動かす制御インターフェースまで。最も追求する価値のある問題は、トポロジーを正しく捉えることでより良い工学的決定が強制され、逆にハードウェアが理論の空白を露わにする — そのような交差点にある問題です。",
    ],
  },

  de: {
    label: "Deutsch",
    langTag: "de",
    heading: "Über mich",
    paragraphs: [
      "Ich bin Jaehong Oh — ein Robotik-Softwareingenieur, der Systeme baut, die noch funktionieren, wenn die Demo längst vorbei ist. Ich arbeite als Forschungspraktikant im Perception-Team bei ROBOTIS an Wahrnehmungspipelines für autonomes Fahren und studiere Maschinenbau im Bachelor an der Soongsil-Universität in Seoul.",
      "Der größte Teil meiner praktischen Arbeit liegt dort, wo Hardware-Physik und Software-Architektur aufeinandertreffen. Als ich den Frontier-Manipulator integrierte — AntBot-Swerve-Base, OMY-F3M-Arm, Pan-Tilt-Kopf, drei Subsysteme mit je eigenem Port und eigenen Timing-Eigenschaften — habe ich sie nicht in einen einzigen Regelkreis gezwungen. Ich trennte sie in unabhängige, namespaced controller_managers: die RCU-vermittelte Base bei 20 Hz, den Dynamixel-Arm nach Messung der p99-SyncRead-Latenz bei 4 Mbps auf 100 Hz stabilisiert, den Kopf in einem separaten Low-Rate-Loop, der den Arm nicht belastet. Sensorvalidierung folgt derselben Logik: Vier gleichzeitige RGB-D-Streams (RealSense D435i ×2, D405, ZED Mini) werden nicht nach mittlerer FPS bewertet, sondern nach Inter-Frame-Tail-Latenz und Burst-Drop-Mustern — denn das ist, was Datensatzaufzeichnungen tatsächlich kaputt macht. Mein Arbeitsprinzip ist einfach: Problem beobachtbar machen, reproduzierbare Bedingung setzen, Lösung verifizieren, dann dokumentieren.",
      "Parallel dazu entwickle ich zwei verzahnte theoretische Rahmenwerke. Soft Cognitive Cohesion (SCC) leitet Existenz als topologische Invariante relationaler Struktur ab — das formale Fundament dafür, dass ein Wahrnehmungssystem nicht verliert, was es gerade betrachtet. Ontology Neural Networks (ONN) mit ORTSF-Regelung setzt dieses Fundament als topologieerhaltende Repräsentationen und verzögerungsrobustes Zustandsfeedback um. Die Rahmenarbeit wurde 2026 im Int. J. Topol. angenommen. Die Theorie ist kein Anhängsel der Ingenieursarbeit — sie ist der Grund, warum das System so aufgebaut ist, wie es aufgebaut ist.",
      "Was ich anstrebe, ist eine kognitive Schlussfolgerungsarchitektur, in der ontologische Struktur in jeder Schicht explizit erhalten bleibt: vom Sensoreingang über gelernte latente Repräsentationen bis zur Regelungsschnittstelle, die Hardware tatsächlich bewegt. Die lohnendsten Probleme sind jene, bei denen die richtige topologische Struktur eine bessere ingenieurtechnische Entscheidung erzwingt — und wo die Hardware ihrerseits eine Lücke in der Theorie aufdeckt.",
    ],
  },

  zh: {
    label: "中文",
    langTag: "zh-Hans",
    heading: "关于我",
    paragraphs: [
      "我是 Jaehong Oh——一名构建演示结束后仍能持续运行的系统的机器人软件工程师。我在 ROBOTIS 感知团队担任研究实习生，参与自动驾驶感知流水线的开发，同时在首尔崇实大学攻读机械工程本科，任职于智能机器人研究室。",
      "我实际工作的大部分内容，都处于硬件物理约束与软件架构相交的地方。在集成 Frontier 移动机械臂时——AntBot 转向底盘、OMY F3M 机械臂、云台，三个子系统各有不同的端口和时序特性——我没有把它们强行塞入单一控制循环，而是将每个子系统分离为独立命名空间下的 controller_manager：经 RCU 中继的底盘维持 20 Hz，在 4 Mbps 总线上实测 6 轴 SyncRead p99 延迟后将机械臂稳定在 100 Hz，云台运行在不影响机械臂的独立低频循环中。传感器验证遵循同样的逻辑——四路同时运行的 RGB-D 流（RealSense D435i ×2、D405、ZED Mini）以帧间尾延迟和突发丢帧模式为指标，而非平均帧率，因为那才是实际破坏数据集采集的原因。我的基本原则很简单：让问题可观测，设定可复现的条件，验证修复后再记录。",
      "与此同时，我开发两个相互关联的理论框架。Soft Cognitive Cohesion（SCC）将存在导出为关系结构的拓扑不变量——这是确保感知系统不会迷失所观察对象的形式化基础。Ontology Neural Networks（ONN）与 ORTSF 控制将这一基础实现为拓扑保持的表征学习与延迟鲁棒的反馈控制。框架论文已于 2026 年被 Int. J. Topol. 接收。理论与工程并非相互独立——正是理论决定了系统为何以现有方式构建。",
      "我正在构建的，是一个在每一层都明确维持本体结构的认知推理架构：从传感器输入，经过学习到的潜在表征，直至实际驱动硬件的控制接口。最值得解决的问题，是那些正确的拓扑结构能强制产生更好工程决策的地方——以及硬件反过来揭示理论空白的地方。",
    ],
  },
};
