/**
 * AuthorityForge app client — auth + API helpers.
 * Works on Vercel root; GH Pages API calls point to AF_CONFIG.apiBase.
 */
(function () {
  var cfg = window.AF_CONFIG || {};
  var API =
    cfg.apiBase ||
    (location.hostname.indexOf("github.io") !== -1
      ? "https://authorityforge-tau.vercel.app"
      : "");

  function token() {
    try {
      return localStorage.getItem("af_token") || "";
    } catch (e) {
      return "";
    }
  }

  function setToken(t) {
    try {
      if (t) localStorage.setItem("af_token", t);
      else localStorage.removeItem("af_token");
    } catch (e) {}
  }

  async function api(path, opts) {
    opts = opts || {};
    var headers = Object.assign(
      { "content-type": "application/json", accept: "application/json" },
      opts.headers || {}
    );
    var t = token();
    if (t) headers.authorization = "Bearer " + t;
    var res = await fetch(API + path, {
      method: opts.method || "GET",
      headers: headers,
      body: opts.body ? JSON.stringify(opts.body) : undefined,
      credentials: "include",
    });
    var data = {};
    try {
      data = await res.json();
    } catch (e) {
      data = { ok: false, error: "Invalid response" };
    }
    data._status = res.status;
    if (data.token) setToken(data.token);
    return data;
  }

  window.AF_APP = {
    apiBase: API,
    api: api,
    token: token,
    setToken: setToken,
    async me() {
      return api("/api/auth/me");
    },
    async signup(email, password, name) {
      return api("/api/auth/signup", {
        method: "POST",
        body: { email: email, password: password, name: name },
      });
    },
    async login(email, password) {
      return api("/api/auth/login", {
        method: "POST",
        body: { email: email, password: password },
      });
    },
    async logout() {
      setToken("");
      return api("/api/auth/logout", { method: "POST", body: {} });
    },
    async createProject(name) {
      return api("/api/app/projects", {
        method: "POST",
        body: { name: name },
      });
    },
    async toggleChecklist(projectId, itemId, done) {
      return api("/api/app/projects", {
        method: "POST",
        body: {
          action: "checklist",
          projectId: projectId,
          itemId: itemId,
          done: done,
        },
      });
    },
    async brief(topic) {
      return api("/api/app/brief", { method: "POST", body: { topic: topic } });
    },
    async admin() {
      return api("/api/app/admin");
    },
    requireAuth: async function (opts) {
      opts = opts || {};
      var m = await this.me();
      if (!m.ok) {
        location.href =
          (cfg.basePath || "") +
          "/app/login/?next=" +
          encodeURIComponent(location.pathname);
        return null;
      }
      if (opts.operator && m.user.role !== "operator") {
        location.href = (cfg.basePath || "") + "/app/dashboard/";
        return null;
      }
      return m;
    },
  };
})();
