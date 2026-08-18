-- C3 직답 구조: 모든 블로그 글 서두에 결론 직답 문단 삽입 (Patient Grader 감사 대응, 2026-08-18)
-- 이미 삽입된 경우 중복 방지: content가 'direct-answer'로 시작하지 않는 글만 대상

UPDATE blog_posts SET content = '<p class="direct-answer"><strong>결론부터 말씀드리면,</strong> 뼈가 부족해도 뼈이식을 하면 대부분 임플란트가 가능합니다. 비용은 단순 뼈이식 50만원, 복합 80만원이 임플란트(130만원)에 추가되며, 기간은 뼈가 자리잡는 4~6개월이 더 걸립니다. 아래에서 과정을 자세히 설명합니다.</p>' || content, updated_at = CURRENT_TIMESTAMP WHERE id = 1 AND content NOT LIKE '%direct-answer%';

UPDATE blog_posts SET content = '<p class="direct-answer"><strong>네, 대부분 하루에 끝납니다.</strong> 오전에 치아를 다듬고 구강스캐너로 촬영하면, 원내 CEREC 밀링머신이 세라믹 크라운을 약 15분 만에 깎아냅니다. 당일 오후 장착까지 완료 — 본뜨기도, 임시치아로 버티는 1~2주도 없습니다.</p>' || content, updated_at = CURRENT_TIMESTAMP WHERE id = 2 AND content NOT LIKE '%direct-answer%';

UPDATE blog_posts SET content = '<p class="direct-answer"><strong>결론부터 말씀드리면,</strong> 뼈가 부족해도 뼈이식(50만~80만원)이나 상악동(위턱 공간) 거상술(80만~150만원)로 대부분 임플란트가 가능합니다. 다른 치과에서 "뼈가 없어서 안 된다"는 말을 들으셨어도, 구강악안면외과 전문의 진단으로 가능한 경우가 많습니다.</p>' || content, updated_at = CURRENT_TIMESTAMP WHERE id = 4 AND content NOT LIKE '%direct-answer%';

UPDATE blog_posts SET content = '<p class="direct-answer"><strong>가장 큰 차이는 "보이느냐"입니다.</strong> 인비절라인은 투명한 마우스피스를 끼우는 방식이라 대화 거리에서 티가 거의 나지 않고, 식사와 양치 때는 빼면 됩니다. 브라켓 교정처럼 철사가 볼 안쪽을 찌르는 불편도 없습니다. 대신 하루 20~22시간 착용을 지켜야 효과가 납니다.</p>' || content, updated_at = CURRENT_TIMESTAMP WHERE id = 9 AND content NOT LIKE '%direct-answer%';

UPDATE blog_posts SET content = '<p class="direct-answer"><strong>가능합니다.</strong> 강남치과의원은 신경을 제거하는 발수부터 근관을 채우는 충전까지 하루에 진행하는 경우가 많습니다. 단, 염증이 심하거나 근관이 복잡한 치아는 안전을 위해 2회로 나눠 치료합니다. 판단 기준을 아래에서 설명합니다.</p>' || content, updated_at = CURRENT_TIMESTAMP WHERE id = 10 AND content NOT LIKE '%direct-answer%';

UPDATE blog_posts SET content = '<p class="direct-answer"><strong>CEREC(세렉)은 치아를 깎은 당일, 원내 밀링머신으로 세라믹 크라운을 만들어 바로 붙이는 시스템입니다.</strong> 끈적한 인상재로 본뜨는 과정이 없고, 임시치아로 지내는 1~2주도 없습니다. 강남치과의원은 CEREC 장비를 원내에 보유해 크라운·인레이를 당일 완성합니다.</p>' || content, updated_at = CURRENT_TIMESTAMP WHERE id = 11 AND content NOT LIKE '%direct-answer%';

UPDATE blog_posts SET content = '<p class="direct-answer"><strong>결론부터 말씀드리면,</strong> 스케일링은 1년에 1~2회 정기적으로, 잇몸치료는 칫솔질할 때 피가 나거나 잇몸이 붓는 증상이 있을 때 바로 받는 것이 좋습니다. 스케일링은 만 19세 이상 연 1회 건강보험이 적용되어 본인부담금 약 1만원대입니다.</p>' || content, updated_at = CURRENT_TIMESTAMP WHERE id = 12 AND content NOT LIKE '%direct-answer%';

UPDATE blog_posts SET content = '<p class="direct-answer"><strong>씹을 때마다 시큰하다면 치아 균열(크랙)일 가능성이 높습니다.</strong> 금이 간 치아는 그대로 두면 균열이 깊어져 신경치료, 심하면 발치까지 이어질 수 있습니다. 증상이 반복된다면 미루지 말고 검사를 받아보세요. 균열 위치에 따라 치료법이 달라집니다.</p>' || content, updated_at = CURRENT_TIMESTAMP WHERE id = 13 AND content NOT LIKE '%direct-answer%';

UPDATE blog_posts SET content = '<p class="direct-answer"><strong>인비절라인 퍼스트는 유치가 남아 있는 성장기 어린이(약 6~10세)를 위한 투명교정 장치입니다.</strong> 턱뼈가 자라는 시기에 치아가 나올 공간을 미리 만들어, 나중에 본교정이 필요 없거나 훨씬 짧아지게 하는 것이 목적입니다. 강남치과의원 비용은 400만원입니다.</p>' || content, updated_at = CURRENT_TIMESTAMP WHERE id = 14 AND content NOT LIKE '%direct-answer%';

UPDATE blog_posts SET content = '<p class="direct-answer"><strong>네, 있습니다.</strong> 치아 겉면(법랑질)에만 머문 초기 충치는 당장 갈아내지 않고 불소 도포와 정기 검진으로 지켜볼 수 있습니다. 충치라고 무조건 깎는 것이 아니라, 진행 단계에 따라 "치료할 충치"와 "관리할 충치"를 구분하는 것이 치아를 오래 쓰는 방법입니다.</p>' || content, updated_at = CURRENT_TIMESTAMP WHERE id = 15 AND content NOT LIKE '%direct-answer%';
