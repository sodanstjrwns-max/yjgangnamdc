// ===== 관리자 대시보드 =====

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
    /* Modal */
    .admin-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(4px); z-index: 100; display: none; align-items: center; justify-content: center; }
    .admin-modal-overlay.show { display: flex; }
    .admin-modal { background: #fff; border-radius: 24px; max-width: 700px; width: 90%; max-height: 90vh; overflow-y: auto; padding: 32px; }
  </style>

  <!-- Admin Content (No hero, clean layout) -->
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
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8" id="adminStats">
        <div class="admin-card p-6 admin-stat">
          <div class="num" id="statInquiries">-</div>
          <div class="label">새 문의</div>
        </div>
        <div class="admin-card p-6 admin-stat">
          <div class="num" id="statBlog">-</div>
          <div class="label">블로그</div>
        </div>
        <div class="admin-card p-6 admin-stat">
          <div class="num" id="statBA">-</div>
          <div class="label">전후사례</div>
        </div>
        <div class="admin-card p-6 admin-stat">
          <div class="num" id="statNotices">-</div>
          <div class="label">공지사항</div>
        </div>
      </div>

      <!-- Tabs + Content -->
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Sidebar -->
        <div class="lg:w-56 flex-shrink-0">
          <div class="admin-card p-3 lg:admin-sidebar">
            <div class="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible" style="scrollbar-width:none;-ms-overflow-style:none;">
              <div class="admin-tab active" onclick="switchTab('inquiries')" data-tab="inquiries">
                <i class="fas fa-envelope text-xs"></i><span class="whitespace-nowrap">상담 문의</span><span class="badge" id="newInqBadge" style="display:none">0</span>
              </div>
              <div class="admin-tab" onclick="switchTab('blog')" data-tab="blog">
                <i class="fas fa-pen-fancy text-xs"></i><span class="whitespace-nowrap">블로그</span>
              </div>
              <div class="admin-tab" onclick="switchTab('beforeafter')" data-tab="beforeafter">
                <i class="fas fa-images text-xs"></i><span class="whitespace-nowrap">전후사례</span>
              </div>
              <div class="admin-tab" onclick="switchTab('notices')" data-tab="notices">
                <i class="fas fa-bullhorn text-xs"></i><span class="whitespace-nowrap">공지사항</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Content Area -->
        <div class="flex-1 min-w-0">

          <!-- ===== 상담 문의 패널 ===== -->
          <div class="admin-panel active" id="panel-inquiries">
            <div class="admin-card p-6">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-lg font-extrabold text-charcoal">상담 문의 관리</h2>
                <select class="admin-select" onchange="loadInquiries(this.value)" id="inqStatusFilter">
                  <option value="all">전체</option>
                  <option value="new">신규</option>
                  <option value="contacted">연락완료</option>
                  <option value="completed">처리완료</option>
                </select>
              </div>
              <div class="overflow-x-auto">
                <table class="admin-table">
                  <thead><tr>
                    <th>상태</th><th>성함</th><th>연락처</th><th>진료</th><th>메시지</th><th>접수일</th><th>관리</th>
                  </tr></thead>
                  <tbody id="inqTableBody">
                    <tr><td colspan="7" class="text-center text-gray-400 py-8">로딩 중...</td></tr>
                  </tbody>
                </table>
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
                <table class="admin-table">
                  <thead><tr>
                    <th>상태</th><th>제목</th><th>카테고리</th><th>조회</th><th>작성일</th><th>관리</th>
                  </tr></thead>
                  <tbody id="blogTableBody">
                    <tr><td colspan="6" class="text-center text-gray-400 py-8">로딩 중...</td></tr>
                  </tbody>
                </table>
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
                <table class="admin-table">
                  <thead><tr>
                    <th>상태</th><th>제목</th><th>카테고리</th><th>환자</th><th>조회</th><th>관리</th>
                  </tr></thead>
                  <tbody id="baTableBody">
                    <tr><td colspan="6" class="text-center text-gray-400 py-8">로딩 중...</td></tr>
                  </tbody>
                </table>
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
                <table class="admin-table">
                  <thead><tr>
                    <th>상태</th><th>제목</th><th>카테고리</th><th>고정</th><th>조회</th><th>관리</th>
                  </tr></thead>
                  <tbody id="noticeTableBody">
                    <tr><td colspan="6" class="text-center text-gray-400 py-8">로딩 중...</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>

  <!-- ===== Blog Modal ===== -->
  <div class="admin-modal-overlay" id="blogModal">
    <div class="admin-modal">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-xl font-extrabold text-charcoal" id="blogModalTitle">새 블로그 글 작성</h3>
        <button onclick="closeBlogModal()" class="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"><i class="fas fa-times text-gray-400"></i></button>
      </div>
      <form id="blogForm" onsubmit="return saveBlog(event)">
        <input type="hidden" id="blogEditSlug">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div><label class="text-xs font-bold text-gray-500 mb-1 block">Slug (URL)</label><input class="admin-input" id="blogSlug" placeholder="my-post-slug" required></div>
          <div><label class="text-xs font-bold text-gray-500 mb-1 block">카테고리</label>
            <select class="admin-select w-full" id="blogCategory">
              <option>임플란트</option><option>CEREC</option><option>교정</option><option>구강외과</option><option>일반</option>
            </select>
          </div>
        </div>
        <div class="mb-4"><label class="text-xs font-bold text-gray-500 mb-1 block">제목</label><input class="admin-input" id="blogTitle" placeholder="블로그 제목" required></div>
        <div class="mb-4"><label class="text-xs font-bold text-gray-500 mb-1 block">요약</label><input class="admin-input" id="blogSummary" placeholder="검색결과에 표시될 요약"></div>
        <div class="mb-4"><label class="text-xs font-bold text-gray-500 mb-1 block">태그 (쉼표 구분)</label><input class="admin-input" id="blogTags" placeholder="임플란트,치료,FAQ"></div>
        <div class="mb-4"><label class="text-xs font-bold text-gray-500 mb-1 block">작성자</label><input class="admin-input" id="blogAuthor" value="이태형 대표원장"></div>
        <div class="mb-6"><label class="text-xs font-bold text-gray-500 mb-1 block">내용 (HTML)</label><textarea class="admin-textarea" id="blogContent" placeholder="<h2>제목</h2><p>내용...</p>" required></textarea></div>
        <div class="flex gap-3"><button type="submit" class="admin-btn admin-btn-primary"><i class="fas fa-save text-xs"></i>저장</button><button type="button" onclick="closeBlogModal()" class="admin-btn admin-btn-secondary">취소</button></div>
      </form>
    </div>
  </div>

  <!-- ===== Before/After Modal ===== -->
  <div class="admin-modal-overlay" id="baModal">
    <div class="admin-modal">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-xl font-extrabold text-charcoal" id="baModalTitle">새 전후 사례 등록</h3>
        <button onclick="closeBAModal()" class="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"><i class="fas fa-times text-gray-400"></i></button>
      </div>
      <form id="baForm" onsubmit="return saveBA(event)">
        <input type="hidden" id="baEditSlug">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div><label class="text-xs font-bold text-gray-500 mb-1 block">Slug (URL)</label><input class="admin-input" id="baSlug" placeholder="implant-case-01" required></div>
          <div><label class="text-xs font-bold text-gray-500 mb-1 block">카테고리</label>
            <select class="admin-select w-full" id="baCategory">
              <option>임플란트</option><option>CEREC</option><option>교정</option><option>심미보철</option><option>구강외과</option>
            </select>
          </div>
        </div>
        <div class="mb-4"><label class="text-xs font-bold text-gray-500 mb-1 block">제목</label><input class="admin-input" id="baTitle" placeholder="사례 제목" required></div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div><label class="text-xs font-bold text-gray-500 mb-1 block">환자 정보</label><input class="admin-input" id="baPatient" placeholder="60대 남성"></div>
          <div><label class="text-xs font-bold text-gray-500 mb-1 block">치료 기간</label><input class="admin-input" id="baDuration" placeholder="약 3개월"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div><label class="text-xs font-bold text-gray-500 mb-1 block">Before 이미지 URL</label><input class="admin-input" id="baBefore" placeholder="https://..." required></div>
          <div><label class="text-xs font-bold text-gray-500 mb-1 block">After 이미지 URL</label><input class="admin-input" id="baAfter" placeholder="https://..." required></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div><label class="text-xs font-bold text-gray-500 mb-1 block">담당 의료진</label><input class="admin-input" id="baDoctor" value="이태형 대표원장"></div>
          <div><label class="text-xs font-bold text-gray-500 mb-1 block">태그 (쉼표)</label><input class="admin-input" id="baTags" placeholder="임플란트,CEREC"></div>
        </div>
        <div class="mb-6"><label class="text-xs font-bold text-gray-500 mb-1 block">치료 설명</label><textarea class="admin-textarea" id="baDesc" placeholder="치료 설명을 입력하세요..." required style="min-height:120px"></textarea></div>
        <div class="flex gap-3"><button type="submit" class="admin-btn admin-btn-primary"><i class="fas fa-save text-xs"></i>저장</button><button type="button" onclick="closeBAModal()" class="admin-btn admin-btn-secondary">취소</button></div>
      </form>
    </div>
  </div>

  <!-- ===== Notice Modal ===== -->
  <div class="admin-modal-overlay" id="noticeModal">
    <div class="admin-modal">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-xl font-extrabold text-charcoal" id="noticeModalTitle">새 공지사항 작성</h3>
        <button onclick="closeNoticeModal()" class="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"><i class="fas fa-times text-gray-400"></i></button>
      </div>
      <form id="noticeForm" onsubmit="return saveNotice(event)">
        <input type="hidden" id="noticeEditSlug">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div><label class="text-xs font-bold text-gray-500 mb-1 block">Slug (URL)</label><input class="admin-input" id="noticeSlug" placeholder="my-notice-slug" required></div>
          <div><label class="text-xs font-bold text-gray-500 mb-1 block">카테고리</label>
            <select class="admin-select w-full" id="noticeCategory">
              <option>공지</option><option>휴진</option><option>장비</option><option>이벤트</option>
            </select>
          </div>
        </div>
        <div class="mb-4"><label class="text-xs font-bold text-gray-500 mb-1 block">제목</label><input class="admin-input" id="noticeTitle" placeholder="공지 제목" required></div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div><label class="text-xs font-bold text-gray-500 mb-1 block">작성자</label><input class="admin-input" id="noticeAuthor" value="강남치과의원"></div>
          <div class="flex items-end">
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" id="noticePinned" class="w-5 h-5 rounded accent-teal-600">
              <span class="text-sm font-bold text-gray-600">상단 고정</span>
            </label>
          </div>
        </div>
        <div class="mb-6"><label class="text-xs font-bold text-gray-500 mb-1 block">내용 (HTML)</label><textarea class="admin-textarea" id="noticeContent" placeholder="<p>공지 내용을 입력하세요...</p>" required></textarea></div>
        <div class="flex gap-3"><button type="submit" class="admin-btn admin-btn-primary"><i class="fas fa-save text-xs"></i>저장</button><button type="button" onclick="closeNoticeModal()" class="admin-btn admin-btn-secondary">취소</button></div>
      </form>
    </div>
  </div>

  <!-- Toast -->
  <div class="toast toast-success" id="toastSuccess"><i class="fas fa-check-circle mr-2"></i><span id="toastSuccessMsg">저장되었습니다</span></div>
  <div class="toast toast-error" id="toastError"><i class="fas fa-exclamation-circle mr-2"></i><span id="toastErrorMsg">오류가 발생했습니다</span></div>

  <script>
    const ADMIN_KEY = localStorage.getItem('admin_key') || '';
    if (!ADMIN_KEY) { promptLogin(); }

    function promptLogin() {
      const key = prompt('관리자 인증키를 입력하세요:');
      if (key) {
        localStorage.setItem('admin_key', key);
        window.location.reload();
      } else {
        window.location.href = '/';
      }
    }
    function logoutAdmin() {
      localStorage.removeItem('admin_key');
      window.location.href = '/';
    }

    // ===== Tab switching =====
    function switchTab(tab) {
      document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
      document.querySelector('[data-tab="'+tab+'"]').classList.add('active');
      document.getElementById('panel-'+tab).classList.add('active');
    }

    // ===== Toast =====
    function showToast(type, msg) {
      const el = document.getElementById(type === 'success' ? 'toastSuccess' : 'toastError');
      const msgEl = document.getElementById(type === 'success' ? 'toastSuccessMsg' : 'toastErrorMsg');
      msgEl.textContent = msg;
      el.classList.add('show');
      setTimeout(() => el.classList.remove('show'), 3000);
    }

    // ===== API helper =====
    async function api(method, path, body) {
      const sep = path.includes('?') ? '&' : '?';
      const opts = { method, headers: { 'Content-Type': 'application/json' } };
      if (body) opts.body = JSON.stringify(body);
      const res = await fetch(path + sep + 'key=' + ADMIN_KEY, opts);
      return res.json();
    }

    // ===== 상담 문의 =====
    async function loadInquiries(status) {
      const data = await api('GET', '/api/inquiries' + (status && status !== 'all' ? '?status='+status : ''));
      if (!data.success) { showToast('error', '문의 목록을 불러올 수 없습니다.'); return; }
      document.getElementById('statInquiries').textContent = data.inquiries.filter(i => i.status === 'new').length;
      const newCount = data.inquiries.filter(i => i.status === 'new').length;
      const badge = document.getElementById('newInqBadge');
      if (newCount > 0) { badge.style.display = ''; badge.textContent = newCount; } else { badge.style.display = 'none'; }

      document.getElementById('inqTableBody').innerHTML = data.inquiries.length === 0
        ? '<tr><td colspan="7" class="text-center text-gray-400 py-8">문의가 없습니다</td></tr>'
        : data.inquiries.map(i => \`<tr>
          <td><span class="status-badge status-\${i.status}">\${i.status === 'new' ? '신규' : i.status === 'contacted' ? '연락완료' : '처리완료'}</span></td>
          <td class="font-bold">\${i.name}</td>
          <td>\${i.phone}</td>
          <td>\${i.treatment || '-'}</td>
          <td class="max-w-[200px] truncate">\${i.message || '-'}</td>
          <td class="text-gray-400 text-xs">\${i.created_at?.split('T')[0] || ''}</td>
          <td>
            <select class="admin-select !py-1 !px-2 !text-xs" onchange="updateInquiry(\${i.id}, this.value)">
              <option value="new" \${i.status==='new'?'selected':''}>신규</option>
              <option value="contacted" \${i.status==='contacted'?'selected':''}>연락완료</option>
              <option value="completed" \${i.status==='completed'?'selected':''}>처리완료</option>
            </select>
          </td>
        </tr>\`).join('');
    }

    async function updateInquiry(id, status) {
      const data = await api('PATCH', '/api/inquiries/' + id, { status });
      if (data.success) { showToast('success', '상태가 변경되었습니다.'); loadInquiries(document.getElementById('inqStatusFilter').value); }
      else { showToast('error', '변경 실패'); }
    }

    // ===== 블로그 =====
    async function loadBlog() {
      const data = await api('GET', '/api/admin/blog');
      if (!data.success) { showToast('error', '블로그 목록을 불러올 수 없습니다.'); return; }
      document.getElementById('statBlog').textContent = data.posts.length;
      document.getElementById('blogTableBody').innerHTML = data.posts.length === 0
        ? '<tr><td colspan="6" class="text-center text-gray-400 py-8">게시글이 없습니다</td></tr>'
        : data.posts.map(p => \`<tr>
          <td><span class="status-badge \${p.is_published ? 'status-completed' : 'status-new'}">\${p.is_published ? '공개' : '비공개'}</span></td>
          <td class="font-bold max-w-[250px] truncate"><a href="/blog/\${p.slug}" target="_blank" class="hover:text-teal-600">\${p.title}</a></td>
          <td>\${p.category}</td>
          <td>\${p.views}</td>
          <td class="text-gray-400 text-xs">\${p.published_at?.split('T')[0] || ''}</td>
          <td class="flex gap-1">
            <button onclick="editBlog('\${p.slug}')" class="admin-btn admin-btn-secondary !py-1 !px-3 !text-xs"><i class="fas fa-edit"></i></button>
            <button onclick="deleteBlog('\${p.slug}')" class="admin-btn admin-btn-danger !py-1 !px-3 !text-xs"><i class="fas fa-trash"></i></button>
          </td>
        </tr>\`).join('');
    }

    function openBlogModal(data) {
      document.getElementById('blogModalTitle').textContent = data ? '블로그 수정' : '새 블로그 글 작성';
      document.getElementById('blogEditSlug').value = data ? data.slug : '';
      document.getElementById('blogSlug').value = data ? data.slug : '';
      document.getElementById('blogSlug').readOnly = !!data;
      document.getElementById('blogTitle').value = data ? data.title : '';
      document.getElementById('blogCategory').value = data ? data.category : '일반';
      document.getElementById('blogSummary').value = data ? (data.summary || '') : '';
      document.getElementById('blogTags').value = data ? (data.tags || '') : '';
      document.getElementById('blogAuthor').value = data ? (data.author || '이태형 대표원장') : '이태형 대표원장';
      document.getElementById('blogContent').value = data ? data.content : '';
      document.getElementById('blogModal').classList.add('show');
    }
    function closeBlogModal() { document.getElementById('blogModal').classList.remove('show'); }

    async function editBlog(slug) {
      const data = await api('GET', '/api/admin/blog/' + slug);
      if (data.success) openBlogModal(data.post);
    }

    async function saveBlog(e) {
      e.preventDefault();
      const editSlug = document.getElementById('blogEditSlug').value;
      const body = {
        slug: document.getElementById('blogSlug').value,
        title: document.getElementById('blogTitle').value,
        category: document.getElementById('blogCategory').value,
        summary: document.getElementById('blogSummary').value,
        tags: document.getElementById('blogTags').value,
        author: document.getElementById('blogAuthor').value,
        content: document.getElementById('blogContent').value,
        is_published: 1
      };
      const data = editSlug
        ? await api('PUT', '/api/blog/' + editSlug, body)
        : await api('POST', '/api/blog', body);
      if (data.success) { showToast('success', editSlug ? '수정되었습니다.' : '작성되었습니다.'); closeBlogModal(); loadBlog(); }
      else { showToast('error', data.error || '저장 실패'); }
      return false;
    }

    async function deleteBlog(slug) {
      if (!confirm('정말 삭제하시겠습니까?')) return;
      const data = await api('DELETE', '/api/blog/' + slug);
      if (data.success) { showToast('success', '삭제되었습니다.'); loadBlog(); }
      else { showToast('error', '삭제 실패'); }
    }

    // ===== 전후사례 =====
    async function loadBA() {
      const data = await api('GET', '/api/admin/before-after');
      if (!data.success) { showToast('error', '전후사례 목록을 불러올 수 없습니다.'); return; }
      document.getElementById('statBA').textContent = data.cases.length;
      document.getElementById('baTableBody').innerHTML = data.cases.length === 0
        ? '<tr><td colspan="6" class="text-center text-gray-400 py-8">사례가 없습니다</td></tr>'
        : data.cases.map(c => \`<tr>
          <td><span class="status-badge \${c.is_published ? 'status-completed' : 'status-new'}">\${c.is_published ? '공개' : '비공개'}</span></td>
          <td class="font-bold max-w-[200px] truncate"><a href="/before-after/\${c.slug}" target="_blank" class="hover:text-teal-600">\${c.title}</a></td>
          <td>\${c.category}</td>
          <td>\${c.patient_info || '-'}</td>
          <td>\${c.views}</td>
          <td class="flex gap-1">
            <button onclick="editBA('\${c.slug}')" class="admin-btn admin-btn-secondary !py-1 !px-3 !text-xs"><i class="fas fa-edit"></i></button>
            <button onclick="deleteBA('\${c.slug}')" class="admin-btn admin-btn-danger !py-1 !px-3 !text-xs"><i class="fas fa-trash"></i></button>
          </td>
        </tr>\`).join('');
    }

    function openBAModal(data) {
      document.getElementById('baModalTitle').textContent = data ? '전후사례 수정' : '새 전후 사례 등록';
      document.getElementById('baEditSlug').value = data ? data.slug : '';
      document.getElementById('baSlug').value = data ? data.slug : '';
      document.getElementById('baSlug').readOnly = !!data;
      document.getElementById('baTitle').value = data ? data.title : '';
      document.getElementById('baCategory').value = data ? data.category : '임플란트';
      document.getElementById('baPatient').value = data ? (data.patient_info || '') : '';
      document.getElementById('baDuration').value = data ? (data.duration || '') : '';
      document.getElementById('baBefore').value = data ? data.before_image : '';
      document.getElementById('baAfter').value = data ? data.after_image : '';
      document.getElementById('baDoctor').value = data ? (data.doctor || '이태형 대표원장') : '이태형 대표원장';
      document.getElementById('baTags').value = data ? (data.tags || '') : '';
      document.getElementById('baDesc').value = data ? data.treatment_desc : '';
      document.getElementById('baModal').classList.add('show');
    }
    function closeBAModal() { document.getElementById('baModal').classList.remove('show'); }

    async function editBA(slug) {
      const data = await api('GET', '/api/admin/before-after/' + slug);
      if (data.success) openBAModal(data.case_data);
    }

    async function saveBA(e) {
      e.preventDefault();
      const editSlug = document.getElementById('baEditSlug').value;
      const body = {
        slug: document.getElementById('baSlug').value,
        title: document.getElementById('baTitle').value,
        category: document.getElementById('baCategory').value,
        patient_info: document.getElementById('baPatient').value,
        duration: document.getElementById('baDuration').value,
        before_image: document.getElementById('baBefore').value,
        after_image: document.getElementById('baAfter').value,
        doctor: document.getElementById('baDoctor').value,
        tags: document.getElementById('baTags').value,
        treatment_desc: document.getElementById('baDesc').value,
        is_published: 1
      };
      const data = editSlug
        ? await api('PUT', '/api/before-after/' + editSlug, body)
        : await api('POST', '/api/before-after', body);
      if (data.success) { showToast('success', editSlug ? '수정되었습니다.' : '등록되었습니다.'); closeBAModal(); loadBA(); }
      else { showToast('error', data.error || '저장 실패'); }
      return false;
    }

    async function deleteBA(slug) {
      if (!confirm('정말 삭제하시겠습니까?')) return;
      const data = await api('DELETE', '/api/before-after/' + slug);
      if (data.success) { showToast('success', '삭제되었습니다.'); loadBA(); }
      else { showToast('error', '삭제 실패'); }
    }

    // ===== 공지사항 =====
    async function loadNotices() {
      const data = await api('GET', '/api/admin/notices');
      if (!data.success) { showToast('error', '공지 목록을 불러올 수 없습니다.'); return; }
      document.getElementById('statNotices').textContent = data.notices.length;
      document.getElementById('noticeTableBody').innerHTML = data.notices.length === 0
        ? '<tr><td colspan="6" class="text-center text-gray-400 py-8">공지사항이 없습니다</td></tr>'
        : data.notices.map(n => \`<tr>
          <td><span class="status-badge \${n.is_published ? 'status-completed' : 'status-new'}">\${n.is_published ? '공개' : '비공개'}</span></td>
          <td class="font-bold max-w-[250px] truncate"><a href="/notices/\${n.slug}" target="_blank" class="hover:text-teal-600">\${n.title}</a></td>
          <td>\${n.category}</td>
          <td>\${n.is_pinned ? '<i class="fas fa-thumbtack text-red-400"></i>' : '-'}</td>
          <td>\${n.views}</td>
          <td class="flex gap-1">
            <button onclick="editNotice('\${n.slug}')" class="admin-btn admin-btn-secondary !py-1 !px-3 !text-xs"><i class="fas fa-edit"></i></button>
            <button onclick="deleteNotice('\${n.slug}')" class="admin-btn admin-btn-danger !py-1 !px-3 !text-xs"><i class="fas fa-trash"></i></button>
          </td>
        </tr>\`).join('');
    }

    function openNoticeModal(data) {
      document.getElementById('noticeModalTitle').textContent = data ? '공지사항 수정' : '새 공지사항 작성';
      document.getElementById('noticeEditSlug').value = data ? data.slug : '';
      document.getElementById('noticeSlug').value = data ? data.slug : '';
      document.getElementById('noticeSlug').readOnly = !!data;
      document.getElementById('noticeTitle').value = data ? data.title : '';
      document.getElementById('noticeCategory').value = data ? data.category : '공지';
      document.getElementById('noticeAuthor').value = data ? (data.author || '강남치과의원') : '강남치과의원';
      document.getElementById('noticePinned').checked = data ? !!data.is_pinned : false;
      document.getElementById('noticeContent').value = data ? data.content : '';
      document.getElementById('noticeModal').classList.add('show');
    }
    function closeNoticeModal() { document.getElementById('noticeModal').classList.remove('show'); }

    async function editNotice(slug) {
      const data = await api('GET', '/api/admin/notices/' + slug);
      if (data.success) openNoticeModal(data.notice);
    }

    async function saveNotice(e) {
      e.preventDefault();
      const editSlug = document.getElementById('noticeEditSlug').value;
      const body = {
        slug: document.getElementById('noticeSlug').value,
        title: document.getElementById('noticeTitle').value,
        category: document.getElementById('noticeCategory').value,
        author: document.getElementById('noticeAuthor').value,
        is_pinned: document.getElementById('noticePinned').checked ? 1 : 0,
        content: document.getElementById('noticeContent').value,
        is_published: 1
      };
      const data = editSlug
        ? await api('PUT', '/api/notices/' + editSlug, body)
        : await api('POST', '/api/notices', body);
      if (data.success) { showToast('success', editSlug ? '수정되었습니다.' : '작성되었습니다.'); closeNoticeModal(); loadNotices(); }
      else { showToast('error', data.error || '저장 실패'); }
      return false;
    }

    async function deleteNotice(slug) {
      if (!confirm('정말 삭제하시겠습니까?')) return;
      const data = await api('DELETE', '/api/notices/' + slug);
      if (data.success) { showToast('success', '삭제되었습니다.'); loadNotices(); }
      else { showToast('error', '삭제 실패'); }
    }

    // ===== Init =====
    document.addEventListener('DOMContentLoaded', () => {
      loadInquiries('all');
      loadBlog();
      loadBA();
      loadNotices();
    });
  </script>
  `;
}
