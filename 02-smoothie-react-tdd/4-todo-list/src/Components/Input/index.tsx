import Styled from 'styled-components';

interface Props {
  readonly placeholder?: string;
  readonly value?: string;
  readonly onChange?: (text: string) => void;
}

export const Input = ({ placeholder, value, onChange }: Props) => {
  return (
    <InputBox
      value={value}
      placeholder={placeholder}
      onChange={({ target }) => {
        if (typeof onChange === 'function') {
          onChange(target.value);
        }
      }}
    />
  );
};

const InputBox = Styled.input`
    flex: 1;
    font-size: 16px;
    padding: 10px 10px;
    border-radius: 8px;
    border: 1px solid #BDBDBD;
    outline: none;
`;
