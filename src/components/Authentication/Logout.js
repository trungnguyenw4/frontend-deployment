import { useNavigate } from "react-router-dom";
import { useAuth } from "./authProvider";

const Logout = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken();

    localStorage.removeItem("token");
    localStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.clear();
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; ++i) {
        var myCookie = cookies[i];
        var pos = myCookie.indexOf("=");
        var name = pos > -1 ? myCookie.substr(0, pos) : myCookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    //browser.cookies.remove('token');
    //document.cookie = '<cookieName>=; Max-Age=0;secure';
    navigate("/", { replace: true });
    window.location.reload();
  };

  setTimeout(() => {
    handleLogout();
  }, 0 * 1000);

  return <>HomePage</>;
};

export default Logout;