// ===== 관리자 대시보드 (리뉴얼) =====

export function adminPage(): string {
  return `
  <style>
    .admin-sidebar { min-height: calc(100vh - 80px); }
    .admin-tab { cursor: pointer; padding: 12px 20px; border-radius: 12px; font-size: 14px; font-weight: 600; color: #6B7280; transition: all 0.3s; display: flex; align-items: center; gap: 10px; }
    .admin-tab:hover { background: rgba(16,175,178,0.04); color: #10AFB2; }
    .admin-tab.active { background: linear-gradient(135deg, #4BC3C5, #10AFB2); color: #fff; }
    .admin-tab .badge { background: #EF4444; color: #fff; font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 100px; }
    .admin-panel { display: none; }
    .admin-panel.active { display: block; }
    .admin-table { width: 100%; border-collapse: collapse; }
    .admin-table th { background: #F3FBFB; color: #10AFB2; font-weight: 700; font-size: 11px; padding: 12px 16px; text-align: left; text-transform: uppercase; letter-spacing: 0.05em; }
    .admin-table td { padding: 12px 16px; border-bottom: 1px solid #F3F4F6; font-size: 13px; color: #374151; }
    .admin-table tr:hover td { background: #FAFBFC; }
    .admin-card { background: #fff; border: 1px solid rgba(0,0,0,0.06); border-radius: 20px; }
    .admin-stat { text-align: center; }
    .admin-stat .num { font-size: 2rem; font-weight: 800; background: linear-gradient(135deg, #10AFB2, #4BC3C5); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .admin-stat .label { font-size: 12px; color: #9CA3AF; margin-top: 4px; }
    .status-badge { padding: 4px 12px; border-radius: 100px; font-size: 11px; font-weight: 700; }
    .status-new { background: #FEF3C7; color: #D97706; }
    .status-contacted { background: #DBEAFE; color: #2563EB; }
    .status-completed { background: #D1FAE5; color: #059669; }
    .admin-input { width: 100%; padding: 10px 16px; border: 1px solid #E5E7EB; border-radius: 12px; font-size: 14px; outline: none; transition: border-color 0.3s; }
    .admin-input:focus { border-color: #10AFB2; box-shadow: 0 0 0 3px rgba(16,175,178,0.1); }
    .admin-textarea { width: 100%; padding: 12px 16px; border: 1px solid #E5E7EB; border-radius: 12px; font-size: 14px; outline: none; min-height: 200px; transition: border-color 0.3s; resize: vertical; }
    .admin-textarea:focus { border-color: #10AFB2; box-shadow: 0 0 0 3px rgba(16,175,178,0.1); }
    .admin-select { padding: 10px 16px; border: 1px solid #E5E7EB; border-radius: 12px; font-size: 14px; outline: none; background: #fff; }
    .admin-btn { display: inline-flex; align-items: center; gap: 6px; padding: 10px 24px; border-radius: 12px; font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.3s; border: none; }
    .admin-btn-primary { background: linear-gradient(135deg, #4BC3C5, #10AFB2); color: #fff; }
    .admin-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(16,175,178,0.3); }
    .admin-btn-danger { background: #FEE2E2; color: #DC2626; }
    .admin-btn-danger:hover { background: #FECACA; }
    .admin-btn-secondary { background: #F3F4F6; color: #374151; }
    .admin-btn-secondary:hover { background: #E5E7EB; }
    .toast { position: fixed; top: 20px; right: 20px; z-index: 9999; padding: 16px 24px; border-radius: 16px; font-size: 14px; font-weight: 600; transform: translateX(120%); transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
    .toast.show { transform: translateX(0); }
    .toast-success { background: #D1FAE5; color: #059669; border: 1px solid #A7F3D0; }
    .toast-error { background: #FEE2E2; color: #DC2626; border: 1px solid #FECACA; }
    .admin-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(4px); z-index: 100; display: none; align-items: center; justify-content: center; }
    .admin-modal-overlay.show { display: flex; }
    .admin-modal { background: #fff; border-radius: 24px; max-width: 800px; width: 95%; max-height: 90vh; overflow-y: auto; padding: 32px; }
    .img-upload-zone { border: 2px dashed #E5E7EB; border-radius: 16px; padding: 24px; text-align: center; cursor: pointer; transition: all 0.3s; position: relative; overflow: hidden; min-height: 120px; display: flex; flex-direction: column; align-items: center; justify-content: center; }
    .img-upload-zone:hover { border-color: #10AFB2; background: rgba(16,175,178,0.02); }
    .img-upload-zone.has-image { border-style: solid; border-color: #10AFB2; }
    .img-upload-zone img { max-height: 150px; border-radius: 12px; object-fit: cover; }
    .img-upload-zone .uploading { position: absolute; inset: 0; background: rgba(255,255,255,0.9); display: flex; align-items: center; justify-content: center; }
    .field-label { display: block; font-size: 12px; font-weight: 700; color: #6B7280; margin-bottom: 6px; }
    .field-label .req { color: #EF4444; }
  </style>

  <section class="pt-28 md:pt-36 pb-16 bg-gray-50 min-h-screen">
    <div class="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">

      <!-- Header -->
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 class="text-2xl md:text-3xl font-extrabold text-charcoal">관리자 대시보드</h1>
          <p class="text-gray-400 text-sm mt-1">강남치과의원 콘텐츠 관리</p>
        </div>
        <div class="flex items-center gap-3">
          <a href="/" class="admin-btn admin-btn-secondary"><i class="fas fa-arrow-left text-xs"></i>사이트로</a>
          <button onclick="logoutAdmin()" class="admin-btn admin-btn-danger"><i class="fas fa-sign-out-alt text-xs"></i>로그아웃</button>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8" id="adminStats">
        <div class="admin-card p-6 admin-stat"><div class="num" id="statInquiries">-</div><div class="label">새 문의</div></div>
        <div class="admin-card p-6 admin-stat"><div class="num" id="statBlog">-</div><div class="label">블로그</div></div>
        <div class="admin-card p-6 admin-stat"><div class="num" id="statBA">-</div><div class="label">전후사례</div></div>
        <div class="admin-card p-6 admin-stat"><div class="num" id="statNotices">-</div><div class="label">공지사항</div></div>
        <div class="admin-card p-6 admin-stat"><div class="num" id="statUsers">-</div><div class="label">회원</div></div>
      </div>

      <!-- Tabs + Content -->
      <div class="flex flex-col lg:flex-row gap-6">
        <div class="lg:w-56 flex-shrink-0">
          <div class="admin-card p-3 lg:admin-sidebar">
            <div class="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible" style="scrollbar-width:none;">
              <div class="admin-tab active" onclick="switchTab('inquiries')" data-tab="inquiries"><i class="fas fa-envelope text-xs"></i><span class="whitespace-nowrap">상담 문의</span><span class="badge" id="newInqBadge" style="display:none">0</span></div>
              <div class="admin-tab" onclick="switchTab('beforeafter')" data-tab="beforeafter"><i class="fas fa-images text-xs"></i><span class="whitespace-nowrap">전후사례</span></div>
              <div class="admin-tab" onclick="switchTab('blog')" data-tab="blog"><i class="fas fa-pen-fancy text-xs"></i><span class="whitespace-nowrap">블로그</span></div>
              <div class="admin-tab" onclick="switchTab('notices')" data-tab="notices"><i class="fas fa-bullhorn text-xs"></i><span class="whitespace-nowrap">공지사항</span></div>
              <div class="admin-tab" onclick="switchTab('users')" data-tab="users"><i class="fas fa-users text-xs"></i><span class="whitespace-nowrap">회원관리</span></div>
            </div>
          </div>
        </div>

        <div class="flex-1 min-w-0">

          <!-- ===== 상담 문의 패널 ===== -->
          <div class="admin-panel active" id="panel-inquiries">
            <div class="admin-card p-6">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-lg font-extrabold text-charcoal">상담 문의 관리</h2>
                <select class="admin-select" onchange="loadInquiries(this.value)" id="inqStatusFilter">
                  <option value="all">전체</option><option value="new">신규</option><option value="contacted">연락완료</option><option value="completed">처리완료</option>
                </select>
              </div>
              <div class="overflow-x-auto">
                <table class="admin-table"><thead><tr><th>상태</th><th>성함</th><th>연락처</th><th>진료</th><th>메시지</th><th>접수일</th><th>관리</th></tr></thead>
                <tbody id="inqTableBody"><tr><td colspan="7" class="text-center text-gray-400 py-8">로딩 중...</td></tr></tbody></table>
              </div>
            </div>
          </div>

          <!-- ===== 전후사례 패널 ===== -->
          <div class="admin-panel" id="panel-beforeafter">
            <div class="admin-card p-6">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-lg font-extrabold text-charcoal">치료 전후 사례 관리</h2>
                <button class="admin-btn admin-btn-primary" onclick="openBAModal()"><i class="fas fa-plus text-xs"></i>새 사례 등록</button>
              </div>
              <div class="overflow-x-auto">
                <table class="admin-table"><thead><tr><th>상태</th><th>제목</th><th>진료</th><th>담당</th><th>환자</th><th>조회</th><th>관리</th></tr></thead>
                <tbody id="baTableBody"><tr><td colspan="7" class="text-center text-gray-400 py-8">로딩 중...</td></tr></tbody></table>
              </div>
            </div>
          </div>

          <!-- ===== 블로그 패널 ===== -->
          <div class="admin-panel" id="panel-blog">
            <div class="admin-card p-6">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-lg font-extrabold text-charcoal">블로그 관리</h2>
                <button class="admin-btn admin-btn-primary" onclick="openBlogModal()"><i class="fas fa-plus text-xs"></i>새 글 작성</button>
              </div>
              <div class="overflow-x-auto">
                <table class="admin-table"><thead><tr><th>상태</th><th>썸네일</th><th>제목</th><th>카테고리</th><th>조회</th><th>작성일</th><th>관리</th></tr></thead>
                <tbody id="blogTableBody"><tr><td colspan="7" class="text-center text-gray-400 py-8">로딩 중...</td></tr></tbody></table>
              </div>
            </div>
          </div>

          <!-- ===== 공지사항 패널 ===== -->
          <div class="admin-panel" id="panel-notices">
            <div class="admin-card p-6">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-lg font-extrabold text-charcoal">공지사항 관리</h2>
                <button class="admin-btn admin-btn-primary" onclick="openNoticeModal()"><i class="fas fa-plus text-xs"></i>새 공지 작성</button>
              </div>
              <div class="overflow-x-auto">
                <table class="admin-table"><thead><tr><th>상태</th><th>제목</th><th>카테고리</th><th>고정</th><th>조회</th><th>관리</th></tr></thead>
                <tbody id="noticeTableBody"><tr><td colspan="6" class="text-center text-gray-400 py-8">로딩 중...</td></tr></tbody></table>
              </div>
            </div>
          </div>

          <!-- ===== 회원관리 패널 ===== -->
          <div class="admin-panel" id="panel-users">
            <div class="admin-card p-6">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-lg font-extrabold text-charcoal">회원 관리</h2>
                <span class="text-sm text-gray-400" id="usersTotalLabel">총 0명</span>
              </div>
              <div class="overflow-x-auto">
                <table class="admin-table"><thead><tr><th>이름</th><th>이메일</th><th>전화번호</th><th>상태</th><th>가입일</th></tr></thead>
                <tbody id="usersTableBody"><tr><td colspan="5" class="text-center text-gray-400 py-8">로딩 중...</td></tr></tbody></table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>

  <!-- ===== 전후사례 Modal ===== -->
  <div class="admin-modal-overlay" id="baModal">
    <div class="admin-modal">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-xl font-extrabold text-charcoal" id="baModalTitle">새 전후 사례 등록</h3>
        <button onclick="closeBAModal()" class="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"><i class="fas fa-times text-gray-400"></i></button>
      </div>
      <form id="baForm" onsubmit="return saveBA(event)">
        <input type="hidden" id="baEditSlug">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div><label class="field-label">Slug (URL) <span class="req">*</span></label><input class="admin-input" id="baSlug" placeholder="implant-case-01" required></div>
          <div><label class="field-label">제목 <span class="req">*</span></label><input class="admin-input" id="baTitle" placeholder="사례 제목" required></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="field-label">진료과목 <span class="req">*</span></label>
            <select class="admin-select w-full" id="baCategory">
              <option>임플란트</option><option>CEREC</option><option>교정</option><option>심미보철</option><option>구강외과</option><option>일반진료</option><option>소아치과</option>
            </select>
          </div>
          <div>
            <label class="field-label">담당 원장 <span class="req">*</span></label>
            <select class="admin-select w-full" id="baDoctor">
              <option value="이태형 대표원장">이태형 대표원장 (구강외과 전문의)</option>
              <option value="최민혜 원장">최민혜 원장 (구강외과 전문의)</option>
            </select>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div><label class="field-label">환자 정보</label><input class="admin-input" id="baPatient" placeholder="60대 남성"></div>
          <div><label class="field-label">치료 기간</label><input class="admin-input" id="baDuration" placeholder="약 3개월"></div>
        </div>

        <!-- 이미지 업로드 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="field-label">Before 이미지 <span class="req">*</span></label>
            <div class="img-upload-zone" id="baBeforeZone" onclick="document.getElementById('baBeforeFile').click()">
              <input type="file" id="baBeforeFile" accept="image/*" class="hidden" onchange="uploadImage(this, 'baBefore', 'baBeforeZone')">
              <div id="baBeforePreview"><i class="fas fa-cloud-upload-alt text-gray-300 text-2xl mb-2"></i><p class="text-gray-400 text-sm">클릭하여 이미지 업로드</p><p class="text-gray-300 text-xs">또는 아래 URL 직접 입력</p></div>
            </div>
            <input class="admin-input mt-2" id="baBefore" placeholder="https://... 또는 업로드" required>
          </div>
          <div>
            <label class="field-label">After 이미지 <span class="req">*</span></label>
            <div class="img-upload-zone" id="baAfterZone" onclick="document.getElementById('baAfterFile').click()">
              <input type="file" id="baAfterFile" accept="image/*" class="hidden" onchange="uploadImage(this, 'baAfter', 'baAfterZone')">
              <div id="baAfterPreview"><i class="fas fa-cloud-upload-alt text-gray-300 text-2xl mb-2"></i><p class="text-gray-400 text-sm">클릭하여 이미지 업로드</p><p class="text-gray-300 text-xs">또는 아래 URL 직접 입력</p></div>
            </div>
            <input class="admin-input mt-2" id="baAfter" placeholder="https://... 또는 업로드" required>
          </div>
        </div>

        <div class="mb-4"><label class="field-label">태그 (쉼표 구분)</label><input class="admin-input" id="baTags" placeholder="임플란트,전악,보철"></div>
        <div class="mb-6"><label class="field-label">치료 설명 <span class="req">*</span></label><textarea class="admin-textarea" id="baDesc" placeholder="치료 내용을 상세히 입력하세요..." required style="min-height:150px"></textarea></div>
        <div class="flex gap-3">
          <button type="submit" class="admin-btn admin-btn-primary"><i class="fas fa-save text-xs"></i>저장</button>
          <button type="button" onclick="closeBAModal()" class="admin-btn admin-btn-secondary">취소</button>
        </div>
      </form>
    </div>
  </div>

  <!-- ===== 블로그 Modal ===== -->
  <div class="admin-modal-overlay" id="blogModal">
    <div class="admin-modal">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-xl font-extrabold text-charcoal" id="blogModalTitle">새 블로그 글 작성</h3>
        <button onclick="closeBlogModal()" class="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"><i class="fas fa-times text-gray-400"></i></button>
      </div>
      <form id="blogForm" onsubmit="return saveBlog(event)">
        <input type="hidden" id="blogEditSlug">

        <!-- SEO 섹션 -->
        <div class="p-4 rounded-xl bg-blue-50 border border-blue-100 mb-5">
          <div class="flex items-center gap-2 mb-3"><i class="fas fa-search text-blue-500 text-xs"></i><span class="text-sm font-bold text-blue-700">SEO 설정</span></div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div><label class="field-label">Slug (URL) <span class="req">*</span></label><input class="admin-input" id="blogSlug" placeholder="my-post-slug" required></div>
            <div><label class="field-label">카테고리</label>
              <select class="admin-select w-full" id="blogCategory">
                <option>임플란트</option><option>CEREC</option><option>교정</option><option>구강외과</option><option>심미보철</option><option>일반진료</option><option>일반</option>
              </select>
            </div>
          </div>
          <div class="mt-3"><label class="field-label">검색 요약 (meta description)</label><input class="admin-input" id="blogSummary" placeholder="검색결과에 표시될 요약 (150자 내)"></div>
          <div class="mt-3"><label class="field-label">SEO 태그 (쉼표 구분)</label><input class="admin-input" id="blogTags" placeholder="임플란트,뼈이식,치료,FAQ"></div>
        </div>

        <div class="mb-4"><label class="field-label">제목 <span class="req">*</span></label><input class="admin-input" id="blogTitle" placeholder="블로그 제목" required></div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="field-label">작성자</label>
            <select class="admin-select w-full" id="blogAuthor">
              <option value="이태형 대표원장">이태형 대표원장</option>
              <option value="최민혜 원장">최민혜 원장</option>
              <option value="강남치과의원">강남치과의원</option>
            </select>
          </div>
          <div>
            <label class="field-label">썸네일 이미지</label>
            <div class="img-upload-zone" id="blogThumbZone" onclick="document.getElementById('blogThumbFile').click()" style="min-height:80px;padding:12px;">
              <input type="file" id="blogThumbFile" accept="image/*" class="hidden" onchange="uploadImage(this, 'blogThumbnail', 'blogThumbZone')">
              <div id="blogThumbPreview" class="flex items-center gap-2"><i class="fas fa-image text-gray-300"></i><span class="text-gray-400 text-xs">썸네일 업로드</span></div>
            </div>
            <input class="admin-input mt-1" id="blogThumbnail" placeholder="썸네일 URL (업로드 또는 직접 입력)">
          </div>
        </div>

        <!-- 본문 에디터 -->
        <div class="mb-2 flex items-center justify-between">
          <label class="field-label mb-0">본문 내용 (HTML) <span class="req">*</span></label>
          <div class="flex gap-1">
            <button type="button" onclick="insertTag('h2')" class="admin-btn admin-btn-secondary !py-1 !px-2 !text-[10px]">H2</button>
            <button type="button" onclick="insertTag('h3')" class="admin-btn admin-btn-secondary !py-1 !px-2 !text-[10px]">H3</button>
            <button type="button" onclick="insertTag('p')" class="admin-btn admin-btn-secondary !py-1 !px-2 !text-[10px]">P</button>
            <button type="button" onclick="insertTag('strong')" class="admin-btn admin-btn-secondary !py-1 !px-2 !text-[10px]">Bold</button>
            <button type="button" onclick="insertTag('ul')" class="admin-btn admin-btn-secondary !py-1 !px-2 !text-[10px]">UL</button>
            <button type="button" onclick="insertTag('blockquote')" class="admin-btn admin-btn-secondary !py-1 !px-2 !text-[10px]">Quote</button>
            <button type="button" onclick="insertBlogImage()" class="admin-btn admin-btn-primary !py-1 !px-2 !text-[10px]"><i class="fas fa-image"></i></button>
          </div>
        </div>
        <div class="mb-6"><textarea class="admin-textarea" id="blogContent" placeholder="<h2>제목</h2>&#10;<p>내용을 입력하세요...</p>" required style="min-height:300px;font-family:monospace;font-size:13px;"></textarea></div>

        <div class="flex gap-3">
          <button type="submit" class="admin-btn admin-btn-primary"><i class="fas fa-save text-xs"></i>저장</button>
          <button type="button" onclick="closeBlogModal()" class="admin-btn admin-btn-secondary">취소</button>
        </div>
      </form>
    </div>
  </div>

  <!-- ===== 공지사항 Modal ===== -->
  <div class="admin-modal-overlay" id="noticeModal">
    <div class="admin-modal">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-xl font-extrabold text-charcoal" id="noticeModalTitle">새 공지사항 작성</h3>
        <button onclick="closeNoticeModal()" class="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"><i class="fas fa-times text-gray-400"></i></button>
      </div>
      <form id="noticeForm" onsubmit="return saveNotice(event)">
        <input type="hidden" id="noticeEditSlug">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div><label class="field-label">Slug (URL) <span class="req">*</span></label><input class="admin-input" id="noticeSlug" placeholder="my-notice-slug" required></div>
          <div><label class="field-label">카테고리</label>
            <select class="admin-select w-full" id="noticeCategory">
              <option>공지</option><option>휴진안내</option><option>장비도입</option><option>이벤트</option>
            </select>
          </div>
        </div>
        <div class="mb-4"><label class="field-label">제목 <span class="req">*</span></label><input class="admin-input" id="noticeTitle" placeholder="공지 제목" required></div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div><label class="field-label">작성자</label><input class="admin-input" id="noticeAuthor" value="강남치과의원"></div>
          <div class="flex items-end">
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" id="noticePinned" class="w-5 h-5 rounded accent-teal-600">
              <span class="text-sm font-bold text-gray-600"><i class="fas fa-thumbtack text-red-400 mr-1"></i>상단 고정</span>
            </label>
          </div>
        </div>

        <!-- 본문 에디터 (블로그와 동일한 툴바) -->
        <div class="mb-2 flex items-center justify-between">
          <label class="field-label mb-0">내용 (HTML) <span class="req">*</span></label>
          <div class="flex gap-1">
            <button type="button" onclick="insertNoticeTag('h2')" class="admin-btn admin-btn-secondary !py-1 !px-2 !text-[10px]">H2</button>
            <button type="button" onclick="insertNoticeTag('h3')" class="admin-btn admin-btn-secondary !py-1 !px-2 !text-[10px]">H3</button>
            <button type="button" onclick="insertNoticeTag('p')" class="admin-btn admin-btn-secondary !py-1 !px-2 !text-[10px]">P</button>
            <button type="button" onclick="insertNoticeTag('strong')" class="admin-btn admin-btn-secondary !py-1 !px-2 !text-[10px]">Bold</button>
            <button type="button" onclick="insertNoticeTag('ul')" class="admin-btn admin-btn-secondary !py-1 !px-2 !text-[10px]">UL</button>
            <button type="button" onclick="insertNoticeTag('blockquote')" class="admin-btn admin-btn-secondary !py-1 !px-2 !text-[10px]">Quote</button>
            <button type="button" onclick="insertNoticeTag('table')" class="admin-btn admin-btn-secondary !py-1 !px-2 !text-[10px]">Table</button>
            <button type="button" onclick="insertNoticeImage()" class="admin-btn admin-btn-primary !py-1 !px-2 !text-[10px]"><i class="fas fa-image"></i> 이미지</button>
          </div>
        </div>
        <div class="mb-6"><textarea class="admin-textarea" id="noticeContent" placeholder="<h2>제목</h2>&#10;<p>공지 내용을 입력하세요...</p>&#10;&#10;💡 이미지 버튼으로 사진을 삽입할 수 있습니다." required style="min-height:300px;font-family:monospace;font-size:13px;"></textarea></div>

        <div class="flex gap-3">
          <button type="submit" class="admin-btn admin-btn-primary"><i class="fas fa-save text-xs"></i>저장</button>
          <button type="button" onclick="closeNoticeModal()" class="admin-btn admin-btn-secondary">취소</button>
        </div>
      </form>
    </div>
  </div>

  <!-- 이미지 업로드용 숨김 input -->
  <input type="file" id="blogImageUploadHidden" accept="image/*" class="hidden">
  <input type="file" id="noticeImageUploadHidden" accept="image/*" class="hidden">

  <!-- Toast -->
  <div class="toast toast-success" id="toastSuccess"><i class="fas fa-check-circle mr-2"></i><span id="toastSuccessMsg">저장되었습니다</span></div>
  <div class="toast toast-error" id="toastError"><i class="fas fa-exclamation-circle mr-2"></i><span id="toastErrorMsg">오류가 발생했습니다</span></div>

  <script>
    const ADMIN_KEY = localStorage.getItem('admin_key') || '';
    if (!ADMIN_KEY) { promptLogin(); }

    function promptLogin() {
      const key = prompt('관리자 인증키를 입력하세요:');
      if (key) { localStorage.setItem('admin_key', key); window.location.reload(); }
      else { window.location.href = '/'; }
    }
    function logoutAdmin() { localStorage.removeItem('admin_key'); window.location.href = '/'; }

    function switchTab(tab) {
      document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
      document.querySelector('[data-tab="'+tab+'"]').classList.add('active');
      document.getElementById('panel-'+tab).classList.add('active');
    }

    function showToast(type, msg) {
      const el = document.getElementById(type === 'success' ? 'toastSuccess' : 'toastError');
      const msgEl = document.getElementById(type === 'success' ? 'toastSuccessMsg' : 'toastErrorMsg');
      msgEl.textContent = msg; el.classList.add('show');
      setTimeout(() => el.classList.remove('show'), 3000);
    }

    async function api(method, path, body) {
      const sep = path.includes('?') ? '&' : '?';
      const opts = { method, headers: { 'Content-Type': 'application/json' } };
      if (body) opts.body = JSON.stringify(body);
      const res = await fetch(path + sep + 'key=' + ADMIN_KEY, opts);
      return res.json();
    }

    // ===== 이미지 업로드 =====
    async function uploadImage(input, targetId, zoneId) {
      const file = input.files[0];
      if (!file) return;
      const zone = document.getElementById(zoneId);
      zone.innerHTML = '<div class="uploading"><i class="fas fa-spinner fa-spin text-royal text-2xl"></i></div>';

      const formData = new FormData();
      formData.append('file', file);
      try {
        const sep = '/api/upload'.includes('?') ? '&' : '?';
        const res = await fetch('/api/upload?key=' + ADMIN_KEY, { method: 'POST', body: formData });
        const data = await res.json();
        if (data.success) {
          document.getElementById(targetId).value = data.url;
          zone.innerHTML = '<img src="' + data.url + '" alt="업로드됨">';
          zone.classList.add('has-image');
          showToast('success', '이미지 업로드 완료');
        } else {
          zone.innerHTML = '<p class="text-red-400 text-sm">' + (data.error || '업로드 실패') + '</p>';
          showToast('error', data.error || '업로드 실패');
        }
      } catch (e) {
        zone.innerHTML = '<p class="text-red-400 text-sm">업로드 오류</p>';
        showToast('error', '업로드 오류');
      }
    }

    // 블로그 본문 이미지 삽입
    function insertBlogImage() {
      const inp = document.getElementById('blogImageUploadHidden');
      inp.onchange = async function() {
        const file = this.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);
        try {
          const res = await fetch('/api/upload?key=' + ADMIN_KEY, { method: 'POST', body: formData });
          const data = await res.json();
          if (data.success) {
            const ta = document.getElementById('blogContent');
            const imgTag = '<img src="' + data.url + '" alt="' + (file.name || '') + '">';
            ta.value = ta.value + '\\n' + imgTag + '\\n';
            showToast('success', '이미지 삽입 완료');
          } else { showToast('error', data.error); }
        } catch { showToast('error', '이미지 업로드 오류'); }
        this.value = '';
      };
      inp.click();
    }

    // HTML 태그 삽입 헬퍼
    function insertTag(tag) {
      const ta = document.getElementById('blogContent');
      const start = ta.selectionStart, end = ta.selectionEnd;
      const sel = ta.value.substring(start, end) || '내용';
      let insert = '';
      if (tag === 'ul') insert = '<ul>\\n  <li>' + sel + '</li>\\n</ul>';
      else insert = '<' + tag + '>' + sel + '</' + tag + '>';
      ta.value = ta.value.substring(0, start) + insert + ta.value.substring(end);
      ta.focus();
    }

    // ===== Stats =====
    async function loadStats() {
      try {
        const data = await api('GET', '/api/admin/stats');
        if (data.success) {
          document.getElementById('statInquiries').textContent = data.inquiries;
          document.getElementById('statBlog').textContent = data.blog;
          document.getElementById('statBA').textContent = data.beforeAfter;
          document.getElementById('statNotices').textContent = data.notices;
          document.getElementById('statUsers').textContent = data.users;
        }
      } catch {}
    }

    // ===== 상담 문의 =====
    async function loadInquiries(status) {
      const data = await api('GET', '/api/inquiries' + (status && status !== 'all' ? '?status='+status : ''));
      if (!data.success) return;
      const newCount = data.inquiries.filter(i => i.status === 'new').length;
      const badge = document.getElementById('newInqBadge');
      if (newCount > 0) { badge.style.display = ''; badge.textContent = newCount; } else { badge.style.display = 'none'; }
      document.getElementById('inqTableBody').innerHTML = data.inquiries.length === 0
        ? '<tr><td colspan="7" class="text-center text-gray-400 py-8">문의가 없습니다</td></tr>'
        : data.inquiries.map(i => \`<tr>
          <td><span class="status-badge status-\${i.status}">\${i.status === 'new' ? '신규' : i.status === 'contacted' ? '연락완료' : '처리완료'}</span></td>
          <td class="font-bold">\${i.name}</td><td>\${i.phone}</td><td>\${i.treatment || '-'}</td>
          <td class="max-w-[200px] truncate">\${i.message || '-'}</td>
          <td class="text-gray-400 text-xs">\${i.created_at?.split('T')[0] || ''}</td>
          <td><select class="admin-select !py-1 !px-2 !text-xs" onchange="updateInquiry(\${i.id}, this.value)">
            <option value="new" \${i.status==='new'?'selected':''}>신규</option>
            <option value="contacted" \${i.status==='contacted'?'selected':''}>연락완료</option>
            <option value="completed" \${i.status==='completed'?'selected':''}>처리완료</option>
          </select></td></tr>\`).join('');
    }
    async function updateInquiry(id, status) {
      const data = await api('PATCH', '/api/inquiries/' + id, { status });
      if (data.success) { showToast('success', '상태 변경'); loadInquiries(document.getElementById('inqStatusFilter').value); loadStats(); }
    }

    // ===== 전후사례 =====
    async function loadBA() {
      const data = await api('GET', '/api/admin/before-after');
      if (!data.success) return;
      document.getElementById('baTableBody').innerHTML = data.cases.length === 0
        ? '<tr><td colspan="7" class="text-center text-gray-400 py-8">사례가 없습니다</td></tr>'
        : data.cases.map(c => \`<tr>
          <td><span class="status-badge \${c.is_published ? 'status-completed' : 'status-new'}">\${c.is_published ? '공개' : '비공개'}</span></td>
          <td class="font-bold max-w-[200px] truncate"><a href="/before-after/\${c.slug}" target="_blank" class="hover:text-teal-600">\${c.title}</a></td>
          <td>\${c.category}</td><td class="text-royal font-bold text-xs">\${c.doctor || '-'}</td>
          <td>\${c.patient_info || '-'}</td><td>\${c.views}</td>
          <td class="flex gap-1">
            <button onclick="editBA('\${c.slug}')" class="admin-btn admin-btn-secondary !py-1 !px-3 !text-xs"><i class="fas fa-edit"></i></button>
            <button onclick="deleteBA('\${c.slug}')" class="admin-btn admin-btn-danger !py-1 !px-3 !text-xs"><i class="fas fa-trash"></i></button>
          </td></tr>\`).join('');
    }
    function resetBAZone(zoneId, previewId) {
      const zone = document.getElementById(zoneId);
      zone.classList.remove('has-image');
      zone.innerHTML = '<input type="file" id="' + (zoneId === 'baBeforeZone' ? 'baBeforeFile' : 'baAfterFile') + '" accept="image/*" class="hidden" onchange="uploadImage(this, \\'' + (zoneId === 'baBeforeZone' ? 'baBefore' : 'baAfter') + '\\', \\'' + zoneId + '\\')"><div id="' + previewId + '"><i class="fas fa-cloud-upload-alt text-gray-300 text-2xl mb-2"></i><p class="text-gray-400 text-sm">클릭하여 이미지 업로드</p></div>';
      zone.onclick = function() { zone.querySelector('input[type=file]').click(); };
    }
    function openBAModal(data) {
      document.getElementById('baModalTitle').textContent = data ? '전후사례 수정' : '새 전후 사례 등록';
      document.getElementById('baEditSlug').value = data ? data.slug : '';
      document.getElementById('baSlug').value = data ? data.slug : ''; document.getElementById('baSlug').readOnly = !!data;
      document.getElementById('baTitle').value = data ? data.title : '';
      document.getElementById('baCategory').value = data ? data.category : '임플란트';
      document.getElementById('baDoctor').value = data ? (data.doctor || '이태형 대표원장') : '이태형 대표원장';
      document.getElementById('baPatient').value = data ? (data.patient_info || '') : '';
      document.getElementById('baDuration').value = data ? (data.duration || '') : '';
      document.getElementById('baBefore').value = data ? data.before_image : '';
      document.getElementById('baAfter').value = data ? data.after_image : '';
      document.getElementById('baTags').value = data ? (data.tags || '') : '';
      document.getElementById('baDesc').value = data ? data.treatment_desc : '';
      // 이미지 프리뷰
      if (data && data.before_image) {
        document.getElementById('baBeforeZone').innerHTML = '<img src="' + data.before_image + '" alt="Before">'; document.getElementById('baBeforeZone').classList.add('has-image');
      } else { resetBAZone('baBeforeZone', 'baBeforePreview'); }
      if (data && data.after_image) {
        document.getElementById('baAfterZone').innerHTML = '<img src="' + data.after_image + '" alt="After">'; document.getElementById('baAfterZone').classList.add('has-image');
      } else { resetBAZone('baAfterZone', 'baAfterPreview'); }
      document.getElementById('baModal').classList.add('show');
    }
    function closeBAModal() { document.getElementById('baModal').classList.remove('show'); }
    async function editBA(slug) { const data = await api('GET', '/api/admin/before-after/' + slug); if (data.success) openBAModal(data.case_data); }
    async function saveBA(e) {
      e.preventDefault();
      const editSlug = document.getElementById('baEditSlug').value;
      const body = { slug: document.getElementById('baSlug').value, title: document.getElementById('baTitle').value, category: document.getElementById('baCategory').value,
        patient_info: document.getElementById('baPatient').value, duration: document.getElementById('baDuration').value,
        before_image: document.getElementById('baBefore').value, after_image: document.getElementById('baAfter').value,
        doctor: document.getElementById('baDoctor').value, tags: document.getElementById('baTags').value,
        treatment_desc: document.getElementById('baDesc').value, is_published: 1 };
      const data = editSlug ? await api('PUT', '/api/before-after/' + editSlug, body) : await api('POST', '/api/before-after', body);
      if (data.success) { showToast('success', editSlug ? '수정 완료' : '등록 완료'); closeBAModal(); loadBA(); loadStats(); }
      else { showToast('error', data.error || '저장 실패'); }
      return false;
    }
    async function deleteBA(slug) { if (!confirm('정말 삭제?')) return; const d = await api('DELETE', '/api/before-after/' + slug); if (d.success) { showToast('success', '삭제 완료'); loadBA(); loadStats(); } }

    // ===== 블로그 =====
    async function loadBlog() {
      const data = await api('GET', '/api/admin/blog');
      if (!data.success) return;
      document.getElementById('blogTableBody').innerHTML = data.posts.length === 0
        ? '<tr><td colspan="7" class="text-center text-gray-400 py-8">게시글이 없습니다</td></tr>'
        : data.posts.map(p => \`<tr>
          <td><span class="status-badge \${p.is_published ? 'status-completed' : 'status-new'}">\${p.is_published ? '공개' : '비공개'}</span></td>
          <td>\${p.thumbnail ? '<img src="'+p.thumbnail+'" style="width:48px;height:36px;object-fit:cover;border-radius:8px;">' : '<div style="width:48px;height:36px;background:#f3f4f6;border-radius:8px;display:flex;align-items:center;justify-content:center;"><i class="fas fa-image text-gray-300 text-xs"></i></div>'}</td>
          <td class="font-bold max-w-[200px] truncate"><a href="/blog/\${p.slug}" target="_blank" class="hover:text-teal-600">\${p.title}</a></td>
          <td>\${p.category}</td><td>\${p.views}</td>
          <td class="text-gray-400 text-xs">\${p.published_at?.split('T')[0] || ''}</td>
          <td class="flex gap-1">
            <button onclick="editBlog('\${p.slug}')" class="admin-btn admin-btn-secondary !py-1 !px-3 !text-xs"><i class="fas fa-edit"></i></button>
            <button onclick="deleteBlog('\${p.slug}')" class="admin-btn admin-btn-danger !py-1 !px-3 !text-xs"><i class="fas fa-trash"></i></button>
          </td></tr>\`).join('');
    }
    function openBlogModal(data) {
      document.getElementById('blogModalTitle').textContent = data ? '블로그 수정' : '새 블로그 글 작성';
      document.getElementById('blogEditSlug').value = data ? data.slug : '';
      document.getElementById('blogSlug').value = data ? data.slug : ''; document.getElementById('blogSlug').readOnly = !!data;
      document.getElementById('blogTitle').value = data ? data.title : '';
      document.getElementById('blogCategory').value = data ? data.category : '일반';
      document.getElementById('blogSummary').value = data ? (data.summary || '') : '';
      document.getElementById('blogTags').value = data ? (data.tags || '') : '';
      document.getElementById('blogAuthor').value = data ? (data.author || '이태형 대표원장') : '이태형 대표원장';
      document.getElementById('blogThumbnail').value = data ? (data.thumbnail || '') : '';
      document.getElementById('blogContent').value = data ? data.content : '';
      if (data && data.thumbnail) {
        document.getElementById('blogThumbZone').innerHTML = '<img src="' + data.thumbnail + '" style="max-height:60px;">';
      } else {
        document.getElementById('blogThumbZone').innerHTML = '<input type="file" id="blogThumbFile" accept="image/*" class="hidden" onchange="uploadImage(this, \\'blogThumbnail\\', \\'blogThumbZone\\')"><div id="blogThumbPreview" class="flex items-center gap-2"><i class="fas fa-image text-gray-300"></i><span class="text-gray-400 text-xs">썸네일 업로드</span></div>';
        document.getElementById('blogThumbZone').onclick = function() { document.getElementById('blogThumbFile')?.click(); };
      }
      document.getElementById('blogModal').classList.add('show');
    }
    function closeBlogModal() { document.getElementById('blogModal').classList.remove('show'); }
    async function editBlog(slug) { const data = await api('GET', '/api/admin/blog/' + slug); if (data.success) openBlogModal(data.post); }
    async function saveBlog(e) {
      e.preventDefault();
      const editSlug = document.getElementById('blogEditSlug').value;
      const body = { slug: document.getElementById('blogSlug').value, title: document.getElementById('blogTitle').value, category: document.getElementById('blogCategory').value,
        summary: document.getElementById('blogSummary').value, tags: document.getElementById('blogTags').value,
        author: document.getElementById('blogAuthor').value, thumbnail: document.getElementById('blogThumbnail').value,
        content: document.getElementById('blogContent').value, is_published: 1 };
      const data = editSlug ? await api('PUT', '/api/blog/' + editSlug, body) : await api('POST', '/api/blog', body);
      if (data.success) { showToast('success', editSlug ? '수정 완료' : '작성 완료'); closeBlogModal(); loadBlog(); loadStats(); }
      else { showToast('error', data.error || '저장 실패'); }
      return false;
    }
    async function deleteBlog(slug) { if (!confirm('정말 삭제?')) return; const d = await api('DELETE', '/api/blog/' + slug); if (d.success) { showToast('success', '삭제 완료'); loadBlog(); loadStats(); } }

    // ===== 공지사항 =====
    // 공지사항 태그 삽입 헬퍼
    function insertNoticeTag(tag) {
      const ta = document.getElementById('noticeContent');
      const start = ta.selectionStart, end = ta.selectionEnd;
      const sel = ta.value.substring(start, end) || '내용';
      let insert = '';
      if (tag === 'ul') insert = '<ul>\\n  <li>' + sel + '</li>\\n</ul>';
      else if (tag === 'table') insert = '<table>\\n  <tr><th>항목</th><th>내용</th></tr>\\n  <tr><td>' + sel + '</td><td></td></tr>\\n</table>';
      else insert = '<' + tag + '>' + sel + '</' + tag + '>';
      ta.value = ta.value.substring(0, start) + insert + ta.value.substring(end);
      ta.focus();
    }

    // 공지사항 본문 이미지 삽입
    function insertNoticeImage() {
      const inp = document.getElementById('noticeImageUploadHidden');
      inp.onchange = async function() {
        const file = this.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);
        try {
          const res = await fetch('/api/upload?key=' + ADMIN_KEY, { method: 'POST', body: formData });
          const data = await res.json();
          if (data.success) {
            const ta = document.getElementById('noticeContent');
            const imgTag = '<img src="' + data.url + '" alt="' + (file.name || '공지 이미지') + '">';
            const pos = ta.selectionStart;
            ta.value = ta.value.substring(0, pos) + '\\n' + imgTag + '\\n' + ta.value.substring(pos);
            showToast('success', '이미지 삽입 완료');
          } else { showToast('error', data.error); }
        } catch { showToast('error', '이미지 업로드 오류'); }
        this.value = '';
      };
      inp.click();
    }

    async function loadNotices() {
      const data = await api('GET', '/api/admin/notices');
      if (!data.success) return;
      document.getElementById('noticeTableBody').innerHTML = data.notices.length === 0
        ? '<tr><td colspan="6" class="text-center text-gray-400 py-8">공지가 없습니다</td></tr>'
        : data.notices.map(n => \`<tr>
          <td><span class="status-badge \${n.is_published ? 'status-completed' : 'status-new'}">\${n.is_published ? '공개' : '비공개'}</span></td>
          <td class="font-bold max-w-[250px] truncate"><a href="/notices/\${n.slug}" target="_blank" class="hover:text-teal-600">\${n.title}</a></td>
          <td>\${n.category}</td><td>\${n.is_pinned ? '<i class="fas fa-thumbtack text-red-400"></i>' : '-'}</td><td>\${n.views}</td>
          <td class="flex gap-1">
            <button onclick="editNotice('\${n.slug}')" class="admin-btn admin-btn-secondary !py-1 !px-3 !text-xs"><i class="fas fa-edit"></i></button>
            <button onclick="deleteNotice('\${n.slug}')" class="admin-btn admin-btn-danger !py-1 !px-3 !text-xs"><i class="fas fa-trash"></i></button>
          </td></tr>\`).join('');
    }
    function openNoticeModal(data) {
      document.getElementById('noticeModalTitle').textContent = data ? '공지사항 수정' : '새 공지사항 작성';
      document.getElementById('noticeEditSlug').value = data ? data.slug : '';
      document.getElementById('noticeSlug').value = data ? data.slug : ''; document.getElementById('noticeSlug').readOnly = !!data;
      document.getElementById('noticeTitle').value = data ? data.title : '';
      document.getElementById('noticeCategory').value = data ? data.category : '공지';
      document.getElementById('noticeAuthor').value = data ? (data.author || '강남치과의원') : '강남치과의원';
      document.getElementById('noticePinned').checked = data ? !!data.is_pinned : false;
      document.getElementById('noticeContent').value = data ? data.content : '';
      document.getElementById('noticeModal').classList.add('show');
    }
    function closeNoticeModal() { document.getElementById('noticeModal').classList.remove('show'); }
    async function editNotice(slug) { const d = await api('GET', '/api/admin/notices/' + slug); if (d.success) openNoticeModal(d.notice); }
    async function saveNotice(e) {
      e.preventDefault();
      const editSlug = document.getElementById('noticeEditSlug').value;
      const body = { slug: document.getElementById('noticeSlug').value, title: document.getElementById('noticeTitle').value, category: document.getElementById('noticeCategory').value,
        author: document.getElementById('noticeAuthor').value, is_pinned: document.getElementById('noticePinned').checked ? 1 : 0,
        content: document.getElementById('noticeContent').value, is_published: 1 };
      const data = editSlug ? await api('PUT', '/api/notices/' + editSlug, body) : await api('POST', '/api/notices', body);
      if (data.success) { showToast('success', editSlug ? '수정 완료' : '작성 완료'); closeNoticeModal(); loadNotices(); loadStats(); }
      else { showToast('error', data.error || '저장 실패'); }
      return false;
    }
    async function deleteNotice(slug) { if (!confirm('정말 삭제?')) return; const d = await api('DELETE', '/api/notices/' + slug); if (d.success) { showToast('success', '삭제 완료'); loadNotices(); loadStats(); } }

    // ===== 회원관리 =====
    async function loadUsers() {
      const data = await api('GET', '/api/admin/users');
      if (!data.success) return;
      document.getElementById('usersTotalLabel').textContent = '총 ' + data.total + '명';
      document.getElementById('usersTableBody').innerHTML = data.users.length === 0
        ? '<tr><td colspan="5" class="text-center text-gray-400 py-8">회원이 없습니다</td></tr>'
        : data.users.map(u => \`<tr>
          <td class="font-bold">\${u.name}</td>
          <td>\${u.email}</td>
          <td>\${u.phone}</td>
          <td><span class="status-badge \${u.is_active ? 'status-completed' : 'status-new'}">\${u.is_active ? '활성' : '비활성'}</span></td>
          <td class="text-gray-400 text-xs">\${u.created_at?.split('T')[0] || ''}</td>
        </tr>\`).join('');
    }

    // ===== Init =====
    document.addEventListener('DOMContentLoaded', () => {
      loadStats();
      loadInquiries('all');
      loadBlog();
      loadBA();
      loadNotices();
      loadUsers();
    });
  </script>
  `;
}
