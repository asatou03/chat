const messageInput = document.getElementById("message-input");

const fetchAndRenderPosts = async () => {
  try {
    // サーバーサイドからデータを取得
    const response = await fetch('/');
    const data = await response.json();

    // サーバーサイドから取得したデータを元に番号つきのリストを構築
    const postsList = document.querySelector("ul");
    postsList.innerHTML = data.map((post, index) => `<li><strong>#${index + 1}</strong> ${escapeHTML(post.message)}</li>`).join("");
  } catch (error) {
    console.error("Error fetching and rendering posts:", error);
  }
};

setInterval(fetchAndRenderPosts, 5 * 1000);
