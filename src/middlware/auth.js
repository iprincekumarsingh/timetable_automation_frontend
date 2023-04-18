export default function Authcheck() {
  if (Cookies.get("token") == undefined) {
    window.location.href = "/login";
  }
}
