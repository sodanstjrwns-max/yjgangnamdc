-- 치과 용어 사전 테이블
CREATE TABLE IF NOT EXISTS dictionary (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  term_ko TEXT NOT NULL,
  term_en TEXT,
  category TEXT NOT NULL,
  summary TEXT NOT NULL,
  description TEXT NOT NULL,
  related_treatment TEXT,
  related_terms TEXT,
  difficulty INTEGER DEFAULT 1,
  is_featured INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_dictionary_slug ON dictionary(slug);
CREATE INDEX IF NOT EXISTS idx_dictionary_category ON dictionary(category);
CREATE INDEX IF NOT EXISTS idx_dictionary_featured ON dictionary(is_featured);
CREATE INDEX IF NOT EXISTS idx_dictionary_term_ko ON dictionary(term_ko);
