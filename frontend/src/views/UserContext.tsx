import { createContext, ReactNode, useContext, useState } from 'react';

interface UserContextProps {
  userType: string;
  setUserType: (type: string) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userType, setUserType] = useState<string>(''); // schimbă tipul de date în funcție de necesități

  const contextValue = {
    userType,
    setUserType,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser trebuie să fie utilizat în cadrul UserProvider.');
  }
  return context;
};
