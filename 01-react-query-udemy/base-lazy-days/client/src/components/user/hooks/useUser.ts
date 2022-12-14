import { AxiosResponse } from 'axios';
import { useQuery, useQueryClient } from 'react-query';

import type { User } from '../../../../../shared/types';
import { axiosInstance, getJWTHeader } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import {
  clearStoredUser,
  getStoredUser,
  setStoredUser,
} from '../../../user-storage';

async function getUser(
  user: User | null,
  signal: AbortSignal,
): Promise<User | null> {
  if (!user) return null;
  const { data }: AxiosResponse<{ user: User }> = await axiosInstance.get(
    `/user/${user.id}`,
    {
      headers: getJWTHeader(user),
      signal,
    },
  );
  return data.user;
}

interface UseUser {
  user: User | null;
  updateUser: (user: User) => void;
  clearUser: () => void;
}

export function useUser(): UseUser {
  const querClient = useQueryClient();
  // [π‘ GYU] updateUser κ° μλ κ²½μ° null μ΄λ°νλκ³ ,false κ° μνλμ΄ μ λλ‘ λμνμ§ μμ.
  // updateUser μμ setQUeriesData λ₯Ό μ΄μ©ν΄ λ‘κ·ΈμΈμ΄ μ±κ³΅νλ©΄ ν΄λΉ ν¨μλ₯Ό μννμ¬ μ¬λ°λ₯Έ κ°μ μΊμλ‘ λμνκ² ν¨.
  const { data: user } = useQuery(
    queryKeys.user,
    ({ signal }) => getUser(user, signal),
    {
      initialData: getStoredUser,
      onSuccess: (received: User | null) => {
        if (!received) {
          clearStoredUser();
        } else {
          setStoredUser(received);
        }
      },
    },
  );

  // meant to be called from useAuth
  function updateUser(newUser: User): void {
    // set user in state
    // setUser(newUser);

    // update user in localstorage
    setStoredUser(newUser);

    querClient.setQueryData(queryKeys.user, newUser);
  }

  // meant to be called from useAuth
  function clearUser() {
    querClient.setQueryData(queryKeys.user, null);
    querClient.removeQueries([queryKeys.appointments, queryKeys.user]); // 'user-appointments' ν€μ κ΄λ ¨λ μΏΌλ¦¬ λͺ¨λ μ κ±°
    // μ¬μ©μκ° λ‘κ·Έμμνλ©΄ μ¬μ©μ μμ½ μΏΌλ¦¬λ μνμν¨.
  }

  return { user, updateUser, clearUser };
}
