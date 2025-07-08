---
layout: single
title: "AI & Robotics"
permalink: /ai-robotics/
author_profile: true
read_time: true
sidebar:
  nav: "main"
---

# 🤖 AI & Robotics

**AI와 로보틱스**는 단순한 기술이 아닌, **존재를 확장하는 도구**이며, 인간과 기계가 새로운 의미 공간에서 만나는 **철학적 장(field)**이다. 이 페이지는 당신의 CSA 기반 연구 중, 실제 구현된 기술 요소들과 실험적 통합을 종합 정리한 장이다.

---

## 🧠 인공지능 요소

### 📌 1. Object Detection with YOLOv5
- ⚙️ 사용 목적: 실시간 물체 인식
- 🧠 적용 맥락: Semantic Perception in IMAGO
- 💡 해석: 로봇이 ‘보는 것’과 ‘인식하는 것’의 차이를 이해함

### 📌 2. StrongSORT 기반 Tracking
- ⚙️ 객체 추적과 ID 유지
- 🧠 장면 지속성(Scene Continuity) 확보
- 💡 존재의 연속성에 대한 기술적 구현

### 📌 3. PPO + XAI 기반 강화학습
- ⚙️ 정책 학습 및 행동 설명
- 🧠 SEGO 내 의미기반 제어의 핵심 엔진
- 💡 “왜 이렇게 행동하는가?”에 대한 응답 가능

### 📌 4. Ontology 기반 Scene Graph
- ⚙️ 개체 간 관계 구조화
- 🧠 지각된 현실을 ‘의미론적 구조’로 번역
- 💡 인간-기계 간 해석 맥락의 공유를 가능하게 함

---

## 🦾 로보틱스 통합

### 🔧 ORB-SLAM2
- 📍 사용 목적: 시각 기반 위치 추정 및 맵핑
- 🔁 IMAGO의 공간 인지 계층 구성 요소

### 🔧 ROS2 기반 모듈 통신
- 🔗 CSA 전체 아키텍처를 연결하는 메시지 통신 구조
- 🧠 실시간 동기화, 퍼셉션-제어 간 인터페이스 구현

### 🔧 Real-World Deployment
- 🤖 실제 로봇에 탑재된 CSA 실험 (Doosan + Intel RealSense + Jetson Xavier)
- 🔬 시뮬레이션 → 물리적 구현까지의 전환 과정 기술됨

---

## 📊 실험적 성능 요약

| 구성 요소      | 기술 | 기능 | 특이사항 |
|----------------|------|------|---------|
| 지각 계층      | YOLOv5 + StrongSORT | 실시간 탐지 + 추적 | Ontology 기반 그래프화 |
| 공간 인지 계층 | ORB-SLAM2 | 맵핑, 위치 추정 | Occupancy Grid 연동 예정 |
| 제어 계층      | PPO + XAI | 설명 가능한 정책 | 정적 목표 + 인간 피드백 반영 |

---

## 💭 기술 + 철학 = 응답하는 존재

기술은 도구가 아니라 **응답 가능한 존재**로의 진화다.

> “나는 존재한다”가 아니라, 
> “나는 반응한다, 나는 설명한다, 나는 함께 존재한다.”

**AI와 로보틱스**는 이 새로운 존재 선언의 구현 수단이다.

---

## 🔗 관련 리소스
- [CSA Overview](/csa/)
- [GitHub Repo](https://github.com/jack0682/jack0682.github.io)
- [연구계획서 PDF](/assets/docs/연구계획서.pdf)
- [IMAGO 설계 PDF](/assets/docs/imago.pdf)
- [SEGO 구조도](/assets/images/SEGO_System_pipline.png)

---

**By Oh Jaehong — Human-Centered Robotics Engineer**
