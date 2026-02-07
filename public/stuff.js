const { ScramjetController } = $scramjetLoadController();

const scramjet = new ScramjetController({
	files: {
		wasm: "/scram/scramjet.wasm.wasm",
		all: "/scram/scramjet.all.js",
		sync: "/scram/scramjet.sync.js",
	},
});

try {
  if (navigator.serviceWorker) {
    scramjet.init();
    navigator.serviceWorker.register("./sw.js");
  } else {
    console.warn("Service workers not supported");
  }
} catch (e) {
  console.error("Failed to initialize Scramjet:", e);
}

const connection = new BareMux.BareMuxConnection("/baremux/worker.js");
const wispUrl =
  (location.protocol === "https:" ? "wss" : "ws") +
  "://" +
  location.host +
  "/wisp/";

async function setTransport(transportsel) {
  switch (transportsel) {
    case "epoxy":
      await connection.setTransport("/epoxy/index.mjs", [{ wisp: wispUrl }]);
      break;
    case "libcurl":
      await connection.setTransport("/libcurl/index.mjs", [{ websocket: wispUrl }]);
      break;
    default:
      await connection.setTransport("/bareasmodule/index.mjs", [bareUrl]);
      break;
  }
}

function search(input) {
  let template = "https://www.google.com/search?q=%s";
  try {
    return new URL(input).toString();
  } catch (err) {}

  try {
    let url = new URL(`http://${input}`);
    if (url.hostname.includes(".")) return url.toString();
  } catch (err) {}

  return template.replace("%s", encodeURIComponent(input));
}

setTransport("epoxy");

// Tab Manager System
class TabManager {
  constructor() {
    this.tabs = [];
    this.activeTabId = null;
    this.tabCounter = 0;
  }

  createTab() {
    const tabId = this.tabCounter++;
    
    // Create iframe element
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.getElementById("iframeContainer").appendChild(iframe);

    const tab = {
      id: tabId,
      iframe: iframe,
      url: "",
      proxy: "uv",
      title: "New Tab"
    };

    this.tabs.push(tab);
    
    // Auto-activate first tab
    if (this.activeTabId === null) {
      this.activateTab(tabId);
    } else {
      this.renderTabs();
    }

    return tabId;
  }

  activateTab(tabId) {
    // Hide previous active tab
    if (this.activeTabId !== null) {
      const prevTab = this.tabs.find(t => t.id === this.activeTabId);
      if (prevTab) {
        prevTab.iframe.style.display = "none";
      }
    }

    // Show new active tab
    const tab = this.tabs.find(t => t.id === tabId);
    if (tab) {
      tab.iframe.style.display = "block";
      this.activeTabId = tabId;
      
      // Update address bar
      document.getElementById("url").value = tab.url;
      document.getElementById("proxysel").value = tab.proxy;
      
      this.renderTabs();
    }
  }

  closeTab(tabId) {
    const index = this.tabs.findIndex(t => t.id === tabId);
    if (index !== -1) {
      const tab = this.tabs[index];
      tab.iframe.remove();
      this.tabs.splice(index, 1);

      // If closed tab was active, activate another
      if (tabId === this.activeTabId) {
        if (this.tabs.length > 0) {
          // Activate the tab before the closed one, or the first one
          const newActiveId = this.tabs[Math.max(0, index - 1)].id;
          this.activateTab(newActiveId);
        } else {
          // Create a new tab if all are closed
          this.createTab();
        }
      } else {
        this.renderTabs();
      }
    }
  }

  updateActiveTab(url, proxy) {
    const tab = this.tabs.find(t => t.id === this.activeTabId);
    if (tab) {
      tab.url = url;
      tab.proxy = proxy;
      
      // Update title from URL
      if (url) {
        try {
          const urlObj = new URL(url);
          const title = urlObj.hostname || url.substring(0, 20);
          tab.title = title.length > 25 ? title.substring(0, 22) + "..." : title;
        } catch {
          tab.title = url.substring(0, 25);
        }
      }
      
      this.renderTabs();
    }
  }

  getActiveTab() {
    return this.tabs.find(t => t.id === this.activeTabId);
  }

  renderTabs() {
    const tabsContainer = document.getElementById("tabsContainer");
    tabsContainer.innerHTML = "";

    this.tabs.forEach(tab => {
      const tabElement = document.createElement("div");
      tabElement.className = `tab ${tab.id === this.activeTabId ? "active" : ""}`;
      
      const title = document.createElement("span");
      title.className = "tab-title";
      title.textContent = tab.title || "New Tab";
      
      const closeBtn = document.createElement("button");
      closeBtn.className = "tab-close";
      closeBtn.innerHTML = "✕";
      closeBtn.type = "button";
      closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.closeTab(tab.id);
      });

      tabElement.appendChild(title);
      tabElement.appendChild(closeBtn);
      
      tabElement.addEventListener("click", () => this.activateTab(tab.id));
      
      tabsContainer.appendChild(tabElement);
    });
  }
}

// Initialize tab manager
const tabManager = new TabManager();

// Create first tab
tabManager.createTab();

// New tab button
document.getElementById("newTabBtn").addEventListener("click", () => {
  tabManager.createTab();
});

// Form submission handler
document.getElementById("idk").addEventListener("submit", async (event) => {
  event.preventDefault();
  
  const urlInput = document.getElementById("url").value;
  const proxyType = document.getElementById("proxysel").value;
  
  let fixedurl = search(urlInput);
  let url;

  if (proxyType === "uv") {
    url = __uv$config.prefix + __uv$config.encodeUrl(fixedurl);
  } else {
    url = scramjet.encodeUrl(fixedurl);
  }

  const activeTab = tabManager.getActiveTab();
  if (activeTab) {
    activeTab.iframe.src = url;
    tabManager.updateActiveTab(fixedurl, proxyType);
  }
});

// Update address bar and proxy when user changes them manually
document.getElementById("url").addEventListener("change", () => {
  const activeTab = tabManager.getActiveTab();
  if (activeTab) {
    tabManager.updateActiveTab(document.getElementById("url").value, document.getElementById("proxysel").value);
  }
});

document.getElementById("proxysel").addEventListener("change", () => {
  const activeTab = tabManager.getActiveTab();
  if (activeTab) {
    tabManager.updateActiveTab(document.getElementById("url").value, document.getElementById("proxysel").value);
  }
});
