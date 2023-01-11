import { Heading } from 'native-base';

function HeadingText({ text, fontSize, Weight, color }) {
  return (
    <Heading fontSize={fontSize} fontWeight={Weight} color={color}>
      {text}
    </Heading>
  );
}

export default HeadingText;
