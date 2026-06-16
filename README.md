# FY27 Fabric Motion

This repo is the **Microsoft Fabric application motion** for FY27. It follows the
shared motion template: a README with the strategy, a one-slide executive
summary, supporting docs, build scripts, and the bundled slide generator.

---

## 🎯 What we want to do

Establish **Microsoft Fabric** as the platform for the next generation of business
applications across **EMEA**, through **two complementary go-to-market paths** that
converge into **one Microsoft program**.

| Path | Audience | Approach | KPI |
| ---- | -------- | -------- | --- |
| **Advisory** | System Integrators | Use Microsoft Fabric (Preview) — SIs build Business Apps | **Number of opportunities** (MSX / CRM), Stage 1 & 2 — vision **ACR** |
| **Workload** | ISV / SDC | Become Microsoft Fabric (GA) — ISV platform extension | **Number of workloads per ISV** — vision **Adoption** (1 workload / ISV) |

**Enablement vehicle:** ⚡ *Micro Hack — 1 day* (hands-on activation).

**Activation — EMEA ecosystem:** PwC · KPMG · EY · HVMC · Bain · BCG · McKinsey.

**Messaging**
- "Shape your business' future applications with Microsoft Fabric."
- "Build the next page of your business with Microsoft Fabric."

**The ask**
- Sponsorship — Ahmed + EPS.
- Funding secured.
- Contact PM lead on workloads.
- **ISV + Advisory → ONE Microsoft program.**

Full detail in [`docs/motion-brief.md`](docs/motion-brief.md).

---

## 🖼️ The one-slide summary

![FY27 Fabric Motion slide](deck/preview/Motion-Fabric-Apps.png)

The editable deck is in [`deck/Motion-Fabric-Apps.pptx`](deck/Motion-Fabric-Apps.pptx).
It is generated from a small JSON config ([`deck/motion-fabric.json`](deck/motion-fabric.json)),
so the slide is **reproducible** and **version-controlled** — change the config,
regenerate, and the slide stays consistent.

---

## 🛠️ Regenerate the slide

```bash
# macOS / Linux
./scripts/build.sh
```

```powershell
# Windows
./scripts/build.ps1
```

The scripts install the generator's dependencies, rebuild the `.pptx` from the
config, and (if LibreOffice is available) refresh the PNG preview.

---

## 🧭 Use this repo as a template for a new motion

1. **Create a new repo** from this one (or copy its structure).
2. **Edit the strategy** in this README and `docs/motion-brief.md`.
3. **Edit `deck/motion-fabric.json`** (rename it to your motion) with your content.
4. **Run `scripts/build.*`** and commit the `.pptx` + preview PNG.

```
FY27FabricMotion/
├── README.md                       # the motion: vision, paths, KPIs, ask
├── deck/
│   ├── motion-fabric.json          # slide content as data (edit this)
│   ├── Motion-Fabric-Apps.pptx     # generated slide (commit it)
│   └── preview/Motion-Fabric-Apps.png
├── docs/                           # markdown-only motion kit
│   ├── motion-brief.md
│   ├── app-motion-overview.md
│   ├── microhack-1-business-apps-solution.md
│   ├── microhack-1-business-apps-setup.md
│   ├── microhack-1-business-apps-workbook.md
│   ├── microhack-2-isv-workloads-setup.md
│   └── microhack-2-isv-workloads-workbook.md
├── src/
│   └── apprayfin/                  # Business Apps Rayfin solution package
├── scripts/
│   ├── build.sh                    # regenerate slide + preview (macOS/Linux)
│   └── build.ps1                   # regenerate slide + preview (Windows)
└── skill/pptxmotions/              # the generator (see collapsed section below)
```

**Naming convention for `docs/`:** lowercase `kebab-case`, markdown only.

For the Business Apps track implementation, start with:

- `src/apprayfin/README.md`
- `docs/microhack-1-business-apps-solution.md`

---

<details>
<summary>🧩 <b>How the slide is generated — the <code>pptxmotions</code> skill</b> (click to expand)</summary>

<br>

The deck is produced by **`pptxmotions`**, a small parametric generator bundled in
[`skill/pptxmotions/`](skill/pptxmotions). It turns the JSON config into a polished
Microsoft Fluent–styled slide, and is also a
[GitHub Copilot CLI](https://docs.github.com/copilot/how-tos/use-copilot-agents/use-copilot-cli)
skill so Copilot can build/update the slide for you on request.

### Regenerate the slide (standalone)

```bash
cd skill/pptxmotions
npm install                       # installs pptxgenjs
node motion.js ../../deck/motion-fabric.json ../../deck/Motion-Fabric-Apps.pptx
```

Render a PNG preview (requires LibreOffice):

```bash
soffice --headless --convert-to png --outdir ../../deck/preview ../../deck/Motion-Fabric-Apps.pptx
```

### Use it from Copilot CLI

Install the skill once, then just ask Copilot in natural language.

**macOS / Linux**
```bash
git clone https://github.com/fredgis/pptxskill.git ~/.copilot/skills/pptxmotions
cd ~/.copilot/skills/pptxmotions && npm install
```

**Windows (PowerShell)**
```powershell
git clone https://github.com/fredgis/pptxskill.git "$env:USERPROFILE\.copilot\skills\pptxmotions"
cd "$env:USERPROFILE\.copilot\skills\pptxmotions"; npm install
```

Restart Copilot CLI, run `/skills` to confirm **pptxmotions** is listed, then:

```text
Use the pptxmotions skill to update deck/motion-fabric.json and regenerate the slide.
```

The skill, its full config schema, and a fictional sample live in
[`skill/pptxmotions/README.md`](skill/pptxmotions/README.md). Upstream:
<https://github.com/fredgis/pptxskill>.

</details>

---

## License

The generator skill is MIT-licensed (see
[`skill/pptxmotions/LICENSE`](skill/pptxmotions/LICENSE)). Motion content in this
repo is internal material.