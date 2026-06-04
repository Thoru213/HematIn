---
title: HematIn
emoji: 🧾
colorFrom: green
colorTo: teal
sdk: gradio
sdk_version: 4.44.1
app_file: app.py
pinned: false
license: apache-2.0
---

# HematIn — Receipt Scanner

Pipeline:
1. Upload foto struk
2. EasyOCR mengekstrak teks
3. TF/Keras classifier mengkategorikan

**Output JSON:**
```json
{
  "status": "success",
  "extracted_text": "...",
  "classification": {
    "label": "makanan",
    "confidence": 0.9731,
    "all_probabilities": { ... }
  }
}
```
