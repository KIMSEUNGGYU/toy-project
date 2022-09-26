import { UseMutateFunction, useMutation, useQueryClient } from 'react-query';

import { Appointment } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { useCustomToast } from '../../app/hooks/useCustomToast';

// for when server call is needed
async function removeAppointmentUser(appointment: Appointment): Promise<void> {
  const patchData = [{ op: 'remove', path: '/userId' }];
  await axiosInstance.patch(`/appointment/${appointment.id}`, {
    data: patchData,
  });
}

// TODO: update return type
export function useCancelAppointment(): UseMutateFunction<
  void, // 쿼리 함수?(removeAppointmentUser) 의 반환값
  unknown, // 오류 유형
  Appointment, // mutate 함수에 대한 인수는 Appointment 유형
  unknown // onMutate 컨텍스트는 unknown // 콘텍스트 없음, onMutate 함수 실행 X (??)
> {
  const toast = useCustomToast();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(removeAppointmentUser, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.appointments]);
      toast({
        title: 'You have canceld the appoinment!',
        status: 'warning',
      });
    },
  });

  return mutate;
}
