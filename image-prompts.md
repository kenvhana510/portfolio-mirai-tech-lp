# 株式会社ミライテック 採用LP｜AI画像生成プロンプト一覧（Stage B）

**ステータス（2026-07-28）：全12枚の差し替え完了。** 実装後に「作業着へのロゴ・文字混入」「想定人物属性との不一致」が数件発生し、対応内容を各画像の項目に「実装メモ」として記録済み。次に着手すべきは、全12枚が揃った状態での色味・トーン統一監査。

全12枚を「同一工場で撮影された採用写真」として統一するため、共通スタイル定義（Style Anchor）を全プロンプトの土台にしています。各ツール（Midjourney／DALL-E／Stable Diffusion／Adobe Firefly等）にそのまま貼り付けて利用できるよう、英語で記述しています。

---

## 0. 共通スタイル定義（Style Anchor）※全プロンプト共通で使用

全12枚とも、以下のブロックを冒頭に必ず含めてください。トーン・光・服装・人物属性・撮影機材の統一により、「同じ工場で撮った写真」に見える一貫性を担保します。

```
Photorealistic corporate recruitment photography for a modern Japanese
automobile parts factory. Clean, well-organized manufacturing facility.
Staff wearing matching navy-blue and white factory uniforms. Young
Japanese workers, from early 20s to early 30s. Natural, candid,
non-exaggerated expressions — approachable and sincere, not overly
posed or advertisement-like. Bright, clean, soft natural light mixed
with factory overhead lighting, minimal shadows. Realistic industrial
equipment appropriate for automotive parts manufacturing. No visible
brand logos, no company names, no product branding, no readable text
or writing anywhere in the image. Shot on a professional DSLR camera,
50mm lens, f/2.8, natural shallow depth of field, editorial corporate
photography style, realistic color grading, no oversaturation, no
illustration or CGI look.
```

**日本語要約**：日本の近代的な自動車部品工場／清潔で整理された現場／紺×白の統一作業着／20代前半〜30代前半の日本人スタッフ／自然で誇張のない表情／明るく柔らかい自然光＋工場照明／写実的な業務用設備／実在ブランド・社名・文字表記なし／プロ機材で撮影したような自然な色味。

### 共通ネガティブプロンプト（対応ツールのみ）
```
text, logo, watermark, brand name, signage, illustration, cartoon,
anime, 3d render, CGI look, overly staged fake smile, exaggerated
advertisement look, cluttered or dirty factory, dark or gloomy
lighting, low resolution, blurry, oversaturated colors, distorted
hands, extra fingers, extra limbs
```

### 一貫性を高めるための運用Tips
- 可能なツールでは、1枚目生成後に得られた**seed値を固定**し、以降11枚も同じseedをベースに生成すると質感・色味が揃いやすくなります。
- Midjourneyの場合は`--ar`で下表のアスペクト比を指定し、`--style raw`または`--stylize`低めの値で広告的な誇張を抑制してください。
- 12枚は可能な限り**同じセッション・同じモデルバージョン**で生成すると統一感が出ます。

---

## 1〜12. 個別プロンプト一覧

### 優先度A（最優先／CV直結）

#### 画像1｜FVメインビジュアル　✅ 実装済み（images/fv-main.jpg / .webp）
- **用途**：FVセクション背景（最重要）
- **推奨サイズ**：2400×1600px以上　**アスペクト比**：3:2（`--ar 3:2`）
- **プロンプト（Style Anchor＋以下を追加）**：
```
A young Japanese factory worker in their mid-20s, wearing a matching
navy-blue and white uniform, handling a small automotive metal part
with both hands at a clean workstation. Medium shot from a slightly
angled front-side view (about 45 degrees), focused but relaxed facial
expression, soft catchlight in the eyes. Wide, bright factory
background with visible depth, softly blurred (shallow depth of
field). Horizontal composition, plenty of open negative space in the
left third of the frame for text overlay.
```

#### 画像2｜最終CTA背景　✅ 実装済み（images/final-cta.jpg / .webp）
- **用途**：最終CTAセクション背景
- **推奨サイズ**：2400×1200px　**アスペクト比**：2:1（`--ar 2:1`）
- **プロンプト**：
```
A group of three to four young Japanese factory staff (mixed gender,
20s to early 30s) standing side by side in a clean, bright factory
corridor or production floor, all wearing matching navy-blue and
white uniforms. Wide full-body shot, natural relaxed standing poses,
genuine warm smiles, looking toward camera or lightly engaged with
each other. Bright, airy lighting. Wide panoramic composition, ample
open negative space in the upper portion of the frame for text
overlay.
```

---

### 優先度B（信頼感・共感の形成）

#### 画像3｜社員インタビュー：田中さん　✅ 実装済み（images/voice-tanaka.jpg / .webp）
- **用途**：社員インタビュー顔写真（26歳男性・入社2年目という設定）
- **実装メモ**：提供画像は作業着胸元に「ミライテック」の文字が写り込んでいたため、600×600の正方形に頭部〜首元のみでタイトにクロップし、文字を画角外に排除して実装。
- **推奨サイズ**：600×600px　**アスペクト比**：1:1（`--ar 1:1`）
- **プロンプト**：
```
Portrait of a Japanese man in his late 20s, short neat hair, wearing
a navy-blue factory uniform with a white undershirt visible at the
collar, standing in front of a softly blurred bright factory
background. Head-and-shoulders bust shot, facing slightly off-center
toward camera, natural warm and approachable smile, sincere
expression. Square composition, soft even lighting, shallow depth of
field.
```

#### 画像4｜社員インタビュー：鈴木さん　✅ 実装済み（images/voice-suzuki.jpg / .webp）
- **用途**：社員インタビュー顔写真（24歳女性・入社1年目という設定）
- **実装メモ**：画像3と同様に、文字入り作業着ロゴを画角外に排除するタイトクロップで実装。
- **推奨サイズ**：600×600px　**アスペクト比**：1:1
- **プロンプト**：
```
Portrait of a Japanese woman in her early 20s, hair neatly tied back
for factory safety, wearing a navy-blue and white factory uniform,
standing in front of a softly blurred bright factory background.
Head-and-shoulders bust shot, facing slightly off-center toward
camera, bright cheerful natural smile, positive energetic expression.
Square composition, soft even lighting, shallow depth of field.
```

#### 画像5｜社員インタビュー：佐藤さん　✅ 実装済み（images/voice-sato.jpg / .webp）
- **用途（現行）**：社員インタビュー顔写真／**佐藤 真央さん（29歳・女性・現場リーダー）**
- **実装メモ**：提供された3枚（画像3〜5相当）は男性1名・女性2名だったため、当初の「佐藤さん＝31歳男性リーダー」の設定を、実際の写真（女性）に合わせて「佐藤 真央さん（29歳・女性）」に変更（index.html反映済み）。役職・入社年次・前職・コメント文はそのまま維持。画像3・4と同様、作業着ロゴが写らないタイトクロップで実装。
- **推奨サイズ**：600×600px　**アスペクト比**：1:1
- **プロンプト（下記は当初依頼時の内容。男性30代を想定していたが、実装では女性の写真を採用したため現状と一致しない。参考情報として保持）**：
```
Portrait of a Japanese man in his early 30s with a calm, confident
expression, wearing a navy-blue factory uniform, standing in front of
a softly blurred bright factory background. Head-and-shoulders bust
shot, facing camera directly, slight confident smile, reliable and
composed demeanor suggesting a team leader. Square composition, soft
even lighting, shallow depth of field.
```

#### 画像6｜職場環境：生産フロア　✅ 実装済み（images/workplace-floor.jpg / .webp）
- **用途**：職場環境ギャラリー
- **推奨サイズ**：1000×750px　**アスペクト比**：4:3
- **プロンプト**：
```
Wide-angle interior shot of a spacious, modern automotive-parts
production floor. Rows of clean industrial machinery and organized
workstations, polished light-colored epoxy floor, bright overhead LED
lighting combined with natural light from high windows. Strong sense
of depth with the production line receding into the background. A
few softly blurred workers in navy/white uniforms visible in the
middle distance for scale. Horizontal composition, orderly and
spacious feel, no clutter.
```

#### 画像7｜職場環境：休憩スペース　✅ 実装済み（images/workplace-break.jpg / .webp）
- **用途**：職場環境ギャラリー
- **実装メモ**：提供画像にはスタッフの写り込みがなかったが、休憩スペース自体の内容（テーブル・ソファ・自販機）は用途に合致しているためそのまま採用。
- **推奨サイズ**：1000×750px　**アスペクト比**：4:3
- **プロンプト**：
```
Bright, modern factory break room with simple tables, chairs, and a
plain unbranded vending machine, large windows letting in natural
light. Two to three young Japanese factory staff in navy/white
uniforms sitting together, relaxed and chatting naturally, holding
plain drink cups with no visible logos, candid mid-conversation
moment, genuine light smiles. Horizontal composition, warm and casual
atmosphere.
```

#### 画像8｜職場環境：更衣室　✅ 実装済み（images/workplace-locker.jpg / .webp）
- **用途**：職場環境ギャラリー
- **推奨サイズ**：1000×750px　**アスペクト比**：4:3
- **プロンプト**：
```
Clean, modern factory locker room with rows of simple metal or
laminate lockers in neutral gray or navy tones, no nameplates or
visible text, well-lit with bright ceiling lighting, polished floor.
Wide shot from a front-angled perspective showing the depth of the
room. Optionally one or two softly blurred figures in the background
for scale. Horizontal composition, tidy, hygienic, well-organized
impression.
```

---

### 優先度C（詳細理解の補強）

#### 画像9｜仕事内容：機械オペレーター　✅ 実装済み（images/job-operator.jpg / .webp）
- **用途**：仕事内容カード
- **推奨サイズ**：800×600px　**アスペクト比**：4:3
- **プロンプト**：
```
Close-to-medium shot of a young Japanese factory worker's hands
operating the control panel of an automotive-parts molding/processing
machine, viewed from a slightly elevated angle. The worker's face is
partially visible, calm and focused expression, wearing a navy
uniform and safety gloves. The machine is clean and modern, with
simple unbranded control buttons and a small blank/unreadable display
screen. Horizontal composition, bright industrial lighting, sense of
careful concentration without tension.
```

#### 画像10｜仕事内容：部品供給　✅ 実装済み（images/job-logistics.jpg / .webp）
- **用途**：仕事内容カード
- **推奨サイズ**：800×600px　**アスペクト比**：4:3
- **プロンプト**：
```
Full-body medium shot of a young Japanese factory worker pushing a
small industrial cart loaded with metal automotive parts in plain
gray bins (no labels), along a clean factory aisle. Worker wearing a
navy/white uniform, mid-stride with a sense of brisk, purposeful
movement. Bright, clean corridor background. Horizontal composition,
dynamic but controlled energy.
```

#### 画像11｜仕事内容：製品検査　✅ 実装済み（images/job-inspection.jpg / .webp）
- **用途**：仕事内容カード
- **推奨サイズ**：800×600px　**アスペクト比**：4:3
- **プロンプト**：
```
Close-up shot of a young Japanese factory worker's hands using a
caliper (vernier gauge) to measure the dimensions of a small metal
automotive part on a clean workbench. Partial view of the worker's
focused face softly blurred in the background. Bright, even lighting
emphasizing precision and cleanliness. Horizontal composition,
meticulous and careful atmosphere, no readable text on any tools or
parts.
```

#### 画像12｜仕事内容：品質確認　✅ 実装済み（images/job-quality.jpg / .webp）
- **用途**：仕事内容カード
- **推奨サイズ**：800×600px　**アスペクト比**：4:3
- **プロンプト**：
```
Medium bust shot of a young Japanese factory worker in a navy/white
uniform, holding a tablet or clipboard with a blank or intentionally
unreadable inspection sheet, recording quality-check results. Calm,
trustworthy, professional expression, standing near clean production
equipment softly blurred in the background. Horizontal 4:3 framing,
bright clean lighting, sense of reliability and precision.
```

---

## 差し替え時の受け入れチェックリスト（画像納品時に確認）

各画像を差し替える際、以下を満たしているか確認してください。

- [ ] 実在の企業ロゴ・社名・製品名・読める文字が写り込んでいない
- [ ] 服装が紺／白系の作業着で統一されている（他画像と色味が大きく乖離していない）
- [ ] 表情が自然で、過度に広告的・作り笑いになっていない
- [ ] 光の色温度・明るさが他画像と概ね揃っている（暖色すぎる／寒色すぎる画像が混在しない）
- [ ] 指定のアスペクト比に近い構図で、被写体が中央〜意図した位置に収まっている（トリミング前提でも主要被写体が四隅ギリギリでない）
- [ ] 手や指の破綻（AI生成特有の違和感）がない
