import { createContext, type ReactNode } from 'react';

// 1. Define the 'shape' of the data in our context
export interface UserContextType {
  username: string;
}

// 2. Create the context with a default value.
//    We'll set the real value in our App component.
export const UserContext = createContext<UserContextType | null>(null);

// 3. (Optional but good practice) Create a "Provider" component
//    This will wrap our app and provide the context value.
interface UserProviderProps {
  children: ReactNode; // 'children' is a special prop for any React components
}

export function UserProvider({ children }: UserProviderProps) {
  // We'll hard-code the user for this example.
  // This could come from state or an API call.
  const user = {
    username: 'FactoryManager01'
  };

  return (
    // 4. The .Provider component "broadcasts" the value
    //    to all components inside it.
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}