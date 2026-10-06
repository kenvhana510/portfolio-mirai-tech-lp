# 株式会社ミライテック 採用LP｜v2リデザイン追加画像 プロンプト一覧

**作成日**：2026-10-06（ブランチ `redesign/v2`）
**目的**：v2リデザイン（Industrial / Energetic / Future-facing）で追加した背景・ギャラリー用画像の記録。ユーザーがより高品質なツールで再生成できるよう、各画像の「用途／配置場所／サイズ／プロンプト全文／生成状況」を残す。

- 生成ツール：`node C:/Users/unear/openai-image-generator/generate-image.js "PROMPT" out.png --project=mirai-tech-lp --purpose=<slug> --size=<WxH> --quality=medium`
- 元PNG：`images/_source/v2-<slug>.png`　配信用：`images/v2-<slug>.webp`（Pillow、長辺1600px以下、WEBP quality 82、全て300KB以下）
- 既存12枚（`image-prompts.md`）と同じ **Style Anchor** を全プロンプトの先頭に付けて統一。既存写真はすべてそのまま継続使用。

## 0. Style Anchor（既存 `image-prompts.md` と同一。全プロンプト共通で前置）

```
Photorealistic corporate recruitment photography for a modern Japanese
automobile parts factory. Clean, well-organized manufacturing facility.
Staff wearing matching navy-blue and white factory uniforms. Young
Japanese workers, from early 20s to early 30s. Natural, candid,
non-exaggerated expressions, approachable and sincere, not overly
posed or advertisement-like. Bright, clean, soft natural light mixed
with factory overhead lighting, minimal shadows. Realistic industrial
equipment appropriate for automotive parts manufacturing. No visible
brand logos, no company names, no product branding, no readable text
or writing anywhere in the image. Shot on a professional DSLR camera,
50mm lens, f/2.8, natural shallow depth of field, editorial corporate
photography style, realistic color grading, no oversaturation, no
illustration or CGI look.
```

## 1. 個別プロンプト（Style Anchor の後に続けて入力）

### v2-hero-floor　✅ 生成済み
- **用途／配置**：ヒーロー背景（Ken Burns＋光のスイープ）。`<section class="hero">`
- **サイズ**：1536×1024（3:2）、eager読み込み
```
Very wide establishing shot of a spacious automotive-parts production floor at golden hour. Rows of modern blue-and-grey CNC machining centers and automated equipment, immaculate light-grey epoxy floor with soft reflections, warm late-afternoon sunlight streaming in from tall windows on the right and mixing with cool overhead LED light. Strong one-point perspective with the main aisle receding to the far wall. Two softly blurred young workers in navy/white uniforms in the middle distance for scale. Lots of open floor and ceiling in the left third of the frame for text overlay. Cinematic, energetic, future-facing atmosphere.
```

### v2-worker-tablet　✅ 生成済み
- **用途／配置**：職場環境フォトグリッド「07 現場の様子」、募集要項の左カラム写真
- **サイズ**：1536×1024
```
Medium shot of a young Japanese man in his mid-20s wearing a navy-blue and white factory uniform, holding a tablet with a blank dark screen in both hands and smiling naturally toward slightly off camera, standing beside a modern blue CNC machine. Clean production floor softly blurred behind him, cool-blue machine light and warm window light. Subject positioned in the right half of the frame, open space on the left.
```

### v2-cnc-parts　✅ 生成済み
- **用途／配置**：成長STEPセクション背景（パララックス、低透明度）、フォトグリッド「02 精密加工」
- **サイズ**：1536×1024
```
Extreme close-up of freshly machined precision aluminum and steel automotive parts arranged on a clean brushed-stainless workbench next to a CNC machine. Sharp focus on the fine machined surfaces, chamfered edges and a vernier caliper resting beside the parts. No sparks, no coolant mess, perfectly clean. Cool blue reflected light with a warm highlight on the metal edges, shallow depth of field, dark blurred background.
```

### v2-mentor-review　✅ 生成済み
- **用途／配置**：「3つの理由」左カラム（PCではsticky、3:4トリミング）
- **サイズ**：1536×1024
```
Medium shot of two Japanese factory workers in matching navy-blue and white uniforms: a calm woman in her early 30s acting as mentor and a young man in his early 20s as a new employee, standing together at a clean workbench and reviewing a small machined metal part that she holds up between them. Both looking at the part, she is explaining with a gentle expression and he listens with interest. Bright, clean production floor softly blurred behind them, natural light from the side.
```

### v2-break-coffee　✅ 生成済み
- **用途／配置**：フォトグリッド「04 朝の休憩室」
- **サイズ**：1536×1024
```
Bright modern factory break room in the morning. A simple wooden table with two plain white coffee mugs, a small potted plant, warm sunlight streaming through large windows and casting soft stripes on the table. In the background, two young Japanese staff in navy/white uniforms, softly blurred, chatting on a grey sofa. Relaxed, warm, human atmosphere. No readable text anywhere.
```

### v2-exterior-van　✅ 生成済み
- **用途／配置**：フォトグリッド「06 工場外観」（横長タイル）
- **サイズ**：1536×1024
```
Exterior wide shot of a modern mid-sized Japanese factory building with clean white and dark-grey cladding, large glass entrance, and a neat parking area, under a clear blue sky in late afternoon. A plain white company van with no markings is parked near the entrance. A few trees and a tidy walkway in the foreground. Clean, well-maintained, trustworthy impression, suburban Aichi Japan industrial park setting.
```

### v2-tex-metal　✅ 生成済み
- **用途／配置**：職場環境セクション背景、「スタッフの1日」セクション背景（CSS background）
- **サイズ**：1536×1024
```
Abstract macro photograph of a brushed dark steel surface, fine horizontal brushing lines, subtle cool-blue and faint warm-amber reflections across the surface, deep navy to charcoal tones, no objects, no text, suitable as a dark website section background texture. Even, seamless-looking, low contrast.
```

### v2-tex-lightstreak　✅ 生成済み
- **用途／配置**：「数字で見る」セクション背景（パララックス）
- **サイズ**：1536×1024
```
Abstract long-exposure photograph of a single electric-blue light streak sweeping diagonally from lower left to upper right across a near-black deep-navy background, with a faint secondary amber light trail, soft bokeh particles, subtle lens flare, clean and modern, no objects, no text, suitable as a dark website hero background overlay.
```

### v2-worker-vertical　（生成状況は本ファイル末尾を参照）
- **用途／配置**：「よくある不安」左カラムのメイン写真（縦長、斜めクリップ）
- **サイズ**：1024×1536（2:3 縦）
```
Vertical three-quarter portrait of a young Japanese woman in her mid-20s in a navy-blue and white factory uniform, hair tied back, standing confidently in a bright modern production aisle with blue machinery softly blurred behind her, arms relaxed, slight natural smile looking at camera. Vertical composition, subject centered, cool-blue and warm window light mix.
```

## 2. 受け入れチェック（生成後に目視確認した項目）
- ロゴ・社名・読める文字の混入なし（9枚とも確認）
- 作業着が紺×白で既存12枚と一致
- 光の色温度：ゴールデンアワー寄りの暖色を含むが、青い機械・床の寒色と混ぜて既存写真と大きく乖離しない範囲
- 手指の破綻なし

## 3. 生成状況メモ
- 2026-10-06：9枚中、組織単位のAPIレート制限（gpt-image 5枚/分）により数回リトライ。最終的な生成状況は `images/v2-*.webp` の実在で判定すること（`v2-worker-vertical.webp` が無い場合は未生成。HTML側は該当 `<img>` の alt が表示されるだけでレイアウトは崩れない）。
