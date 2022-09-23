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

async function getUser(user: User | null): Promise<User | null> {
  if (!user) return null;
  const { data }: AxiosResponse<{ user: User }> = await axiosInstance.get(
    `/user/${user.id}`,
    {
      headers: getJWTHeader(user),
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
  // [💡 GYU] updateUser 가 없는 경우 null 이반환되고,false 가 순화되어 제대로 동작하지 않음.
  // updateUser 에서 setQUeriesData 를 이용해 로그인이 성공하면 해당 함수를 수행하여 올바른 값을 캐시로 동작하게 함.
  const { data: user } = useQuery(queryKeys.user, () => getUser(user));

  // meant to be called from useAuth
  function updateUser(newUser: User): void {
    querClient.setQueryData(queryKeys.user, newUser);
  }

  // meant to be called from useAuth
  function clearUser() {
    querClient.setQueryData(queryKeys.user, null);
  }

  return { user, updateUser, clearUser };
}
