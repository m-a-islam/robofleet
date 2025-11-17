import { useContext } from 'react';
// 1. Import the UserContext we created
import { UserContext, type UserContextType } from './UserContext';

function Header() {
  // 2. Use the 'useContext' hook to get the current value
  const user = useContext(UserContext) as UserContextType;

  return (
    <header style={{ padding: '10px', background: '#eee' }}>
      <h1>Robot Factory</h1>
      {/* 3. We can use the data directly! No props needed. */}
      <div>Welcome, {user.username}</div>
    </header>
  );
}

export default Header;