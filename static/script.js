const messageInput = document.getElementById("message-input");
const postsList = document.querySelector("ul");

const fetchAndRenderPosts = async () => {
  try {
    // サーバーサイドからデータを取得
    const response = await fetch('/');
    const data = await response.json();

    console.log("Received data from server:", data);

    // サーバーサイドから取得したデータを元に番号つきのリストを構築
    postsList.innerHTML = data.map((post, index) => `<li><strong>#${index + 1}</strong> ${escapeHTML(post.message)}</li>`).join("");
  } catch (error) {
    console.error("Error fetching and rendering posts:", error);
  }
};

// 配列の比較関数
const arraysEqual = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

setInterval(fetchAndRenderPosts, 5 * 1000);

// 初回のデータ取得と表示
fetchAndRenderPosts();
