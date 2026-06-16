# Micro Hack 2 — ISV Workloads with the Extensibility Kit

**Workloads on Microsoft Fabric · One-day hands-on format**
*Morning: training & demos · Afternoon: hack · 09:00 – 17:30*

> ### Scenario · GreenGrid Analytics *(fictional ISV)*
>
> GreenGrid Analytics is an independent software vendor that sells
> energy-optimization software. Today its customers export data out of Fabric,
> run GreenGrid on the side, then import the results back — slow, brittle and
> hard to govern.
>
> **Your mission:** use the Fabric Extensibility Kit to ship GreenGrid as a native
> **Microsoft Fabric workload**. Customers should create and manage "Optimization
> Models" directly inside Fabric, working on data in OneLake, with compute that
> runs on Fabric capacity.

## At a glance

| | |
| --- | --- |
| **Audience** | Product and engineering teams at the ISV who will ship and maintain the workload. |
| **Approach** | Workload / code-driven — extend the Fabric platform via the Extensibility Kit. |
| **You will learn** | How workloads plug into Fabric (hub, item types, integration points) · The Extensibility Kit dev loop: SDK, manifest, run, publish · How to scaffold, integrate and package a custom workload. |
| **Prerequisites** | A developer laptop with Node.js and the Fabric Extensibility Kit SDK · Access to a Fabric tenant/workspace with developer mode enabled · Familiarity with TypeScript/React and REST APIs. |
| **You will leave with** | A custom workload running locally and packaged for publishing · A repeatable blueprint to bring your own product into Fabric. |

## Agenda

*One day, 09:00 – 17:30. The morning builds shared understanding through training
and live demos; the afternoon is a hands-on hack where teams build and demo.*

### Morning — Training & Demos

| Time | Session | What happens |
| ---- | ------- | ------------ |
| 09:00 – 09:30 | Welcome & the challenge | Meet GreenGrid Analytics and why ISVs ship as native Fabric workloads; how the day runs. |
| 09:30 – 10:15 | Fabric platform & extensibility | How workloads plug into Fabric: the workload hub, item types and integration points. |
| 10:15 – 10:30 | Break | — |
| 10:30 – 11:15 | Extensibility Kit deep dive | The SDK, workload manifest, frontend/backend, and the local development loop. |
| 11:15 – 12:00 | Live demo — scaffold a workload | Scaffold a workload, run it locally, and publish it to the workload hub. |
| 12:00 – 12:15 | Hack briefing | Per-team scenarios, team formation, success criteria for the afternoon. |
| 12:15 – 13:00 | Lunch | — |

### Afternoon — Hack

| Time | Session | What happens |
| ---- | ------- | ------------ |
| 13:00 – 13:30 | Kick-off & dev setup | Install the SDK, configure tokens, validate each team's local dev environment. |
| 13:30 – 15:30 | Hack sprint 1 — Scaffold & run | Scaffold the GreenGrid workload and an "Optimization Model" item type; read input data from OneLake and run locally. |
| 15:30 – 15:45 | Break | — |
| 15:45 – 16:45 | Hack sprint 2 — Integrate & package | Wire up authentication, tie compute to Fabric capacity, and package the workload for the hub. |
| 16:45 – 17:15 | Showcase & peer review | Each team demos its workload; coaches review architecture and readiness. |
| 17:15 – 17:30 | Wrap-up & next steps | Recap, capture the path to publish, and what it takes to bring your own product into Fabric. |

## Logistics & success criteria

**Roles**
- Lead facilitator — runs the agenda, keeps time, frames the scenario.
- Technical coaches — 1 per 2 – 3 teams, unblock during the hack.
- Platform specialist — on hand for workload and SDK questions.

**What participants should bring**
- A laptop that can sign in with their corporate identity.
- Local dev tools pre-installed where possible (Node.js + Extensibility Kit SDK).

**Prepare before the day**
- Fabric workspace(s) with capacity assigned and access granted.
- A starter repository and developer mode enabled for the Extensibility Kit.

**What "good" looks like at 17:30**
- Every team demos a working result, however small.
- Each team can describe its path to publishing a Fabric workload.
