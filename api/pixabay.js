// Vercel 서버리스 함수: GET /api/pixabay?q=검색어&page=1
// 브라우저 대신 서버에서 Pixabay를 호출해서 API key가 화면 코드에 드러나지 않게 합니다.
// key는 Vercel 환경변수 PIXABAY_API_KEY 에서 읽습니다.
const PER_PAGE = 10;

module.exports = async (req, res) => {
  const key = process.env.PIXABAY_API_KEY;
  if (!key) {
    return res.status(500).json({ error: 'PIXABAY_API_KEY 환경변수가 설정되지 않았어요.' });
  }

  const q = String(req.query.q || '').trim().slice(0, 100);
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  if (!q) {
    return res.status(400).json({ error: '검색어를 입력하세요.' });
  }

  const url = new URL('https://pixabay.com/api/');
  url.search = new URLSearchParams({
    key,
    q,
    image_type: 'photo',
    safesearch: 'true',
    per_page: String(PER_PAGE),
    page: String(page),
  });

  try {
    const r = await fetch(url);
    if (!r.ok) {
      const msg = r.status === 400 ? 'key가 올바르지 않거나 마지막 묶음을 넘었어요.' : `Pixabay 요청 실패 (${r.status})`;
      return res.status(r.status).json({ error: msg });
    }
    const data = await r.json();
    // Pixabay 안내대로 같은 검색 결과는 하루 동안 Vercel이 저장해 두고 재사용
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=3600');
    return res.status(200).json({
      totalHits: data.totalHits,
      hits: data.hits.map(({ webformatURL, tags, user, pageURL }) => ({ webformatURL, tags, user, pageURL })),
    });
  } catch {
    return res.status(502).json({ error: 'Pixabay에 연결하지 못했어요.' });
  }
};
