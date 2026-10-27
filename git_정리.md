# 🛠️ 실습하며 막혔던 점 정리

## 1. 클로드가 만든 코드가 강사님 코드와 다르다
- AI는 같은 요청에도 매번 조금씩 다른 코드를 만든다.
- 코드 글자가 똑같은지보다 **똑같이 동작하는지**를 비교한다.
- 강사님 코드에 맞추려면 요청할 때 정해진 이름을 같이 알려준다.
  > "파일 이름은 `api/pixabay.js`, 환경변수 이름은 `PIXABAY_API_KEY`로 해줘"

## 2. API 발급: `PIXABAY_API_KEY`, `PIXABAY_API`
- 환경변수는 **이름이 한 글자만 달라도 못 읽는다.**
- Vercel에 등록한 이름과 코드가 읽는 이름이 똑같아야 한다.
- 이 프로젝트의 `api/pixabay.js`는 `PIXABAY_API_KEY`를 읽는다.
- Vercel에서 이름이나 값을 바꾼 뒤에는 꼭 **Redeploy**해야 적용된다.

## 3·6. GitHub를 잘 모르니까 꼬인다
- 처음 한 번 연결할 때의 순서(7~9번)만 기억하면 된다.
- 꼬였을 때는 현재 상태부터 확인한다.

```bash
git status
```

## 4. 현재 local 위치가 아닌 다른 위치에서 했다
- git 명령은 **지금 서 있는 폴더**에 적용된다.
- 명령을 치기 전에 위치부터 확인한다.

```bash
pwd
```

- 이 프로젝트라면 `/c/vibe/day2`가 나와야 한다. 다르면 이동한다.

```bash
cd /c/vibe/day2
```

## 5. 수정하고 저장하지 않았다
- 저장하지 않은 변경은 git도, 브라우저도 볼 수 없다.
- VS Code에서 탭 이름 옆에 **●**가 있으면 저장하지 않은 것이다. `Ctrl + S`로 저장한다.
- 메뉴의 **File → Auto Save**를 켜두면 자동으로 저장된다.

## 7. `git init`을 안 해서 `git add .`이 안 된다
- `fatal: not a git repository`가 나오면 아직 git 폴더가 아니라는 뜻이다.
- 프로젝트 폴더에서 **처음 한 번만** 실행한다.

```bash
git init
```

## 8. `git branch -m main`
- GitHub 안내문에서는 보통 대문자 `-M`을 쓴다.
- 기본 이름 `master`를 `main`으로 바꾸는 명령이다.

```bash
git branch -M main
```

## 9. `git add remote origin` → ❌ 순서가 틀렸다
- `remote`가 먼저 와야 한다.

```bash
git remote add origin https://github.com/jeongeunlee0/day2.git
```

- `remote origin already exists`가 나오면 이미 연결된 것이다. 주소만 바꾸려면 이렇게 한다.

```bash
git remote set-url origin https://github.com/jeongeunlee0/day2.git
```

- 연결이 잘 됐는지 확인한다.

```bash
git remote -v
```

## ✅ 처음 올릴 때 전체 순서

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/jeongeunlee0/day2.git
git push -u origin main
```

처음 한 번 이렇게 올린 뒤부터는 아래 세 줄만 반복하면 된다.

```bash
git add .
git commit -m "메시지"
git push
```
