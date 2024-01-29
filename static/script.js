const messageInput = document.getElementById("message-input");

const fetchAndRenderPosts = async () => {
  // サーバーサイドからデータを取得
  const response = await fetch('/');
  const data = await response.json();

  // 現在の発言を取得
  const currentPosts = Array.from(document.querySelectorAll("ul li")).map((li) => li.textContent.trim());

  // サーバーサイドから取得したデータと現在の発言が異なる場合にのみリロード
  if (JSON.stringify(data) !== JSON.stringify(currentPosts)) {
    window.location.reload();
  }
};

setInterval(fetchAndRenderPosts, 5 * 1000);
