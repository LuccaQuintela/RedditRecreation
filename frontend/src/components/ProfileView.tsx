import { useNavigate } from "react-router-dom";

export default function ProfileView() {
  const navigate = useNavigate();
    const handleLogout = () => {
    localStorage.removeItem('authToken'); // remove JWT
    window.dispatchEvent(new Event('authChanged')); // optional: notify app of logout
    navigate(`/posts`);
  };

  return (
    <div>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}