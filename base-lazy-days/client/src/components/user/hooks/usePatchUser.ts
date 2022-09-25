import jsonpatch from 'fast-json-patch';
import { UseMutateFunction, useMutation, useQueryClient } from 'react-query';
import { queryKeys } from 'react-query/constants';

import type { User } from '../../../../../shared/types';
import { axiosInstance, getJWTHeader } from '../../../axiosInstance';
import { useCustomToast } from '../../app/hooks/useCustomToast';
import { useUser } from './useUser';

// for when we need a server function
async function patchUserOnServer(
  newData: User | null,
  originalData: User | null,
): Promise<User | null> {
  if (!newData || !originalData) return null;
  // create a patch for the difference between newData and originalData
  const patch = jsonpatch.compare(originalData, newData);

  // send patched data to the server
  const { data } = await axiosInstance.patch(
    `/user/${originalData.id}`,
    { patch },
    {
      headers: getJWTHeader(originalData),
    },
  );
  return data.user;
}

// TODO: update type to UseMutateFunction type
export function usePatchUser(): UseMutateFunction<
  User,
  unknown,
  User,
  unknown
> {
  const { user, updateUser } = useUser();
  const toast = useCustomToast();
  const queryClient = useQueryClient();

  const { mutate: patchUser } = useMutation(
    (newUserData: User) => patchUserOnServer(newUserData, user),
    {
      // onMutate returns context that is passed to onError
      onMutate: async (newData: User | null) => {
        // cancel any outoging queries for user data, so old server data doesn't overwrte our optimistic update
        // 사용자 데이터를 대상으로 한 발신하는 쿼리 모두 취소 -> 오래된 서버 데이터는 낙관적 업데이트를 덮어쓰지 않음.
        queryClient.cancelQueries(queryKeys.user);

        // snapsho of previous user value
        // 기존 사용자 값의 스냅샷을 찍고
        const previousUserData: User = queryClient.getQueryData(queryKeys.user);

        // optimistically update the cache with new user value
        // 새로운 값으로 새키를 낙관적 업데이트 하고
        updateUser(newData);

        // return context object with snapshotted value
        // 이후 컨텍스트를 반환
        return { previousUserData };
      },
      // onError 에서 onMutate 에서 반환한 context 수신
      onError: (error, newData, context) => {
        // roll back cache to saved value
        // 에러가 있는 경우 저장된 값으로 캐시를 롤백
        if (context.previousUserData) {
          updateUser(context.previousUserData);
          toast({
            title: 'Update failed; restoring previous values',
            status: 'warning',
          });
        }
      },
      onSuccess: (userData: User | null) => {
        if (user) {
          toast({
            title: 'User updated!',
            status: 'success',
          });
        }
      },
      onSettled: () => {
        // 변이를 resolved 했을 때 성공 여부와 관계 없이 onSettled 콜백을 실행하는 것
        //
        // invalidate user query to make sure we're in sync with server data
        // 사용자에 대한 데이터를 무효화하여 서버에서 최신 데이터를 보여줄 수 있도록 설정
        queryClient.invalidateQueries(queryKeys.user); // 마지막으로 사용자 쿼리키를 무효홯기 위해 queryClient 사용
      },
    },
  );

  return patchUser;
}
