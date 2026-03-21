-- ===== 공지사항 테이블 =====
CREATE TABLE IF NOT EXISTS notices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT '공지',
  content TEXT NOT NULL,
  is_pinned INTEGER DEFAULT 0,
  is_published INTEGER DEFAULT 1,
  views INTEGER DEFAULT 0,
  author TEXT DEFAULT '강남치과의원',
  published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_notices_slug ON notices(slug);
CREATE INDEX IF NOT EXISTS idx_notices_published ON notices(is_published, is_pinned DESC, published_at DESC);
