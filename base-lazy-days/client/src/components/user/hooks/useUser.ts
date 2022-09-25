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
  // [💡 GYU] updateUser 가 없는 경우 null 이반환되고,false 가 순화되어 제대로 동작하지 않음.
  // updateUser 에서 setQUeriesData 를 이용해 로그인이 성공하면 해당 함수를 수행하여 올바른 값을 캐시로 동작하게 함.
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
    querClient.removeQueries([queryKeys.appointments, queryKeys.user]); // 'user-appointments' 키와 관련된 쿼리 모두 제거
    // 사용자가 로그아웃하면 사용자 예약 쿼리도 수행안함.
  }

  return { user, updateUser, clearUser };
}
