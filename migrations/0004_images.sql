-- ===== 이미지 저장 테이블 =====
CREATE TABLE IF NOT EXISTS images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  filename TEXT NOT NULL,
  content_type TEXT NOT NULL,
  data TEXT NOT NULL,
  size INTEGER DEFAULT 0,
  uploaded_by TEXT DEFAULT 'admin',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_images_filename ON images(filename);
CREATE INDEX IF NOT EXISTS idx_images_created ON images(created_at DESC);
