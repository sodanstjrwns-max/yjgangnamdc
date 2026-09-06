-- ===== 비급여 수가표 (원장 편집 + 항목별 공개/비공개) =====
CREATE TABLE IF NOT EXISTS price_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT NOT NULL,
  category_icon TEXT NOT NULL DEFAULT 'fa-tooth',
  cat_order INTEGER NOT NULL DEFAULT 0,
  cat_insurance INTEGER NOT NULL DEFAULT 0,  -- 카테고리 단위 건강보험 표시(에메랄드 헤더)
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  price TEXT NOT NULL,
  item_insurance INTEGER NOT NULL DEFAULT 0, -- 항목 단위 건강보험 표시(체크 아이콘)
  is_published INTEGER NOT NULL DEFAULT 1,   -- 1=공개, 0=비공개 (기본 공개)
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_price_published ON price_items(is_published, cat_order, sort_order);
CREATE INDEX IF NOT EXISTS idx_price_category ON price_items(category);
